'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var linter = require('../linters/baseLinter');
var prospector = require('./../linters/prospector');
var pylint = require('./../linters/pylint');
var pep8 = require('./../linters/pep8Linter');
var flake8 = require('./../linters/flake8');
var pydocstyle = require('./../linters/pydocstyle');
var settings = require('../common/configSettings');
var telemetryHelper = require('../common/telemetry');
var telemetryContracts = require('../common/telemetryContracts');
var lintSeverityToVSSeverity = new Map();
lintSeverityToVSSeverity.set(linter.LintMessageSeverity.Error, vscode.DiagnosticSeverity.Error);
lintSeverityToVSSeverity.set(linter.LintMessageSeverity.Hint, vscode.DiagnosticSeverity.Hint);
lintSeverityToVSSeverity.set(linter.LintMessageSeverity.Information, vscode.DiagnosticSeverity.Information);
lintSeverityToVSSeverity.set(linter.LintMessageSeverity.Warning, vscode.DiagnosticSeverity.Warning);
function createDiagnostics(message, txtDocumentLines) {
    var sourceLine = txtDocumentLines[message.line - 1];
    var sourceStart = sourceLine.substring(message.column - 1);
    var endCol = txtDocumentLines[message.line - 1].length;
    // try to get the first word from the startig position
    if (message.possibleWord === 'string' && message.possibleWord.length > 0) {
        endCol = message.column + message.possibleWord.length;
    }
    var range = new vscode.Range(new vscode.Position(message.line - 1, message.column), new vscode.Position(message.line - 1, endCol));
    var severity = lintSeverityToVSSeverity.get(message.severity);
    var diagnostic = new vscode.Diagnostic(range, message.code + ':' + message.message, severity);
    diagnostic.code = message.code;
    diagnostic.source = message.provider;
    return diagnostic;
}
var LintProvider = (function (_super) {
    __extends(LintProvider, _super);
    function LintProvider(context, outputChannel, workspaceRootPath) {
        _super.call(this, function () { });
        this.workspaceRootPath = workspaceRootPath;
        this.linters = [];
        this.pendingLintings = new Map();
        this.outputChannel = outputChannel;
        this.context = context;
        this.settings = settings.PythonSettings.getInstance();
        this.initialize();
    }
    LintProvider.prototype.initialize = function () {
        var _this = this;
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('python');
        var disposables = [];
        this.linters.push(new prospector.Linter(this.outputChannel, this.workspaceRootPath));
        this.linters.push(new pylint.Linter(this.outputChannel, this.workspaceRootPath));
        this.linters.push(new pep8.Linter(this.outputChannel, this.workspaceRootPath));
        this.linters.push(new flake8.Linter(this.outputChannel, this.workspaceRootPath));
        this.linters.push(new pydocstyle.Linter(this.outputChannel, this.workspaceRootPath));
        var disposable = vscode.workspace.onDidSaveTextDocument(function (e) {
            if (e.languageId !== 'python' || !_this.settings.linting.enabled || !_this.settings.linting.lintOnSave) {
                return;
            }
            _this.lintDocument(e.uri, e.getText().split(/\r?\n/g), 100);
        });
        this.context.subscriptions.push(disposable);
    };
    LintProvider.prototype.lintDocument = function (documentUri, documentLines, delay) {
        var _this = this;
        // Since this is a hack, lets wait for 2 seconds before linting
        // Give user to continue typing before we waste CPU time
        if (this.lastTimeout) {
            clearTimeout(this.lastTimeout);
            this.lastTimeout = 0;
        }
        this.lastTimeout = setTimeout(function () {
            _this.onLintDocument(documentUri, documentLines);
        }, delay);
    };
    LintProvider.prototype.onLintDocument = function (documentUri, documentLines) {
        var _this = this;
        if (this.pendingLintings.has(documentUri.fsPath)) {
            this.pendingLintings.get(documentUri.fsPath).cancel();
            this.pendingLintings.delete(documentUri.fsPath);
        }
        var cancelToken = new vscode.CancellationTokenSource();
        cancelToken.token.onCancellationRequested(function () {
            if (_this.pendingLintings.has(documentUri.fsPath)) {
                _this.pendingLintings.delete(documentUri.fsPath);
            }
        });
        this.pendingLintings.set(documentUri.fsPath, cancelToken);
        this.outputChannel.clear();
        var promises = this.linters.map(function (linter) {
            if (!linter.isEnabled()) {
                return Promise.resolve([]);
            }
            var delays = new telemetryHelper.Delays();
            return linter.runLinter(documentUri.fsPath, documentLines).then(function (results) {
                delays.stop();
                telemetryHelper.sendTelemetryEvent(telemetryContracts.IDE.Lint, { Lint_Provider: linter.Id }, delays.toMeasures());
                return results;
            });
        });
        // linters will resolve asynchronously - keep a track of all 
        // diagnostics reported as them come in
        var diagnostics = [];
        promises.forEach(function (p) {
            p.then(function (msgs) {
                if (cancelToken.token.isCancellationRequested) {
                    return;
                }
                // Build the message and suffix the message with the name of the linter used
                msgs.forEach(function (d) {
                    diagnostics.push(createDiagnostics(d, documentLines));
                });
                // Limit the number of messages to the max value
                diagnostics = diagnostics.filter(function (value, index) { return index <= _this.settings.linting.maxNumberOfProblems; });
                // set all diagnostics found in this pass, as this method always clears existing diagnostics.
                _this.diagnosticCollection.set(documentUri, diagnostics);
            });
        });
    };
    return LintProvider;
}(vscode.Disposable));
exports.LintProvider = LintProvider;
//# sourceMappingURL=lintProvider.js.map