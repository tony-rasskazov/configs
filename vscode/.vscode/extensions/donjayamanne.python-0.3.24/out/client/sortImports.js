'use strict';
var vscode = require('vscode');
var sortProvider = require('./providers/importSortProvider');
var telemetryHelper = require('./common/telemetry');
var telemetryContracts = require('./common/telemetryContracts');
var os = require('os');
function activate(context, outChannel) {
    var rootDir = context.asAbsolutePath('.');
    var disposable = vscode.commands.registerCommand('python.sortImports', function () {
        var activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor || activeEditor.document.languageId !== 'python') {
            vscode.window.showErrorMessage('Please open a Python source file to sort the imports.');
            return;
        }
        if (activeEditor.document.lineCount <= 1) {
            return;
        }
        var delays = new telemetryHelper.Delays();
        // Hack, if the document doesn't contain an empty line at the end, then add it
        // Else the library strips off the last line
        var lastLine = activeEditor.document.lineAt(activeEditor.document.lineCount - 1);
        var emptyLineAdded = Promise.resolve(true);
        if (lastLine.text.trim().length > 0) {
            emptyLineAdded = new Promise(function (resolve, reject) {
                activeEditor.edit(function (builder) {
                    builder.insert(lastLine.range.end, os.EOL);
                }).then(resolve, reject);
            });
        }
        emptyLineAdded.then(function () {
            return new sortProvider.PythonImportSortProvider().sortImports(rootDir, activeEditor.document);
        }).then(function (changes) {
            if (changes.length === 0) {
                return;
            }
            return activeEditor.edit(function (builder) {
                changes.forEach(function (change) { return builder.replace(change.range, change.newText); });
            });
        }).then(function () {
            delays.stop();
            telemetryHelper.sendTelemetryEvent(telemetryContracts.Commands.SortImports, null, delays.toMeasures());
        }).catch(function (error) {
            var message = typeof error === 'string' ? error : (error.message ? error.message : error);
            outChannel.appendLine(error);
            outChannel.show();
            vscode.window.showErrorMessage(message);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=sortImports.js.map