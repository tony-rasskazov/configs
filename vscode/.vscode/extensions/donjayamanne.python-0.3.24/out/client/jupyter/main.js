"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var kernel_manager_1 = require('./kernel-manager');
var vscode = require('vscode');
var resultView_1 = require('./resultView');
var main_1 = require('./display/main');
var kernelStatus_1 = require('./display/kernelStatus');
var constants_1 = require('../common/constants');
var anser = require('anser');
var jupyterSchema = 'jupyter-result-viewer';
var previewUri = vscode.Uri.parse(jupyterSchema + '://authority/jupyter');
var previewWindow;
var display;
function activate() {
    previewWindow = new resultView_1.TextDocumentContentProvider();
    var disposables = [];
    disposables.push(vscode.workspace.registerTextDocumentContentProvider(jupyterSchema, previewWindow));
    display = new main_1.JupyterDisplay();
    disposables.push(display);
    return disposables;
}
exports.activate = activate;
var displayed = false;
function showResults(result, data) {
    previewWindow.setText(result, data);
    // Dirty hack to support instances when document has been closed
    if (displayed) {
        previewWindow.update();
    }
    displayed = true;
    return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'Results')
        .then(function () {
        if (displayed) {
            previewWindow.update();
        }
    }, function (reason) {
        vscode.window.showErrorMessage(reason);
    });
}
var Jupyter = (function (_super) {
    __extends(Jupyter, _super);
    function Jupyter() {
        _super.call(this, function () { });
        this.kernel = null;
        this.disposables = [];
    }
    Jupyter.prototype.activate = function (state) {
        (_a = this.disposables).push.apply(_a, activate());
        this.kernelManager = new kernel_manager_1.KernelManagerImpl();
        this.disposables.push(this.kernelManager);
        this.disposables.push(vscode.window.onDidChangeActiveTextEditor(this.onEditorChanged.bind(this)));
        this.status = new kernelStatus_1.KernelStatus();
        this.disposables.push(this.status);
        var _a;
    };
    Jupyter.prototype.dispose = function () {
        this.disposables.forEach(function (d) { return d.dispose(); });
    };
    Jupyter.prototype.onEditorChanged = function (editor) {
        if (!editor || !editor.document) {
            return;
        }
        var kernel = this.kernelManager.getRunningKernelFor(editor.document.languageId);
        if (this.kernel !== kernel) {
            return this.onKernelChanged(kernel);
        }
    };
    Jupyter.prototype.onKernelChanged = function (kernel) {
        var _this = this;
        if (this.onKernalStatusChangeHandler) {
            this.onKernalStatusChangeHandler.dispose();
            this.onKernalStatusChangeHandler = null;
        }
        if (kernel) {
            this.onKernalStatusChangeHandler = kernel.onStatusChange(function (statusInfo) {
                _this.status.setKernelStatus(statusInfo[1]);
            });
        }
        this.kernel = kernel;
        this.status.setActiveKernel(this.kernel ? this.kernel.kernelSpec : null);
    };
    Jupyter.prototype.executeCode = function (code, language) {
        var _this = this;
        if (this.kernel && this.kernel.kernelSpec.language === language) {
            return this.executeAndDisplay(this.kernel, code);
        }
        return this.kernelManager.startKernelFor(language)
            .then(function (kernel) {
            _this.onKernelChanged(kernel);
            return _this.executeAndDisplay(kernel, code);
        });
    };
    Jupyter.prototype.executeAndDisplay = function (kernel, code) {
        return this.executeCodeInKernel(kernel, code).then(function (result) {
            if (result[0].length === 0) {
                return;
            }
            return showResults(result[0], result[1]);
        });
    };
    Jupyter.prototype.executeCodeInKernel = function (kernel, code) {
        return new Promise(function (resolve, reject) {
            var htmlResponse = '';
            var responses = [];
            return kernel.execute(code, function (result) {
                if ((result.type === 'text' && result.stream === 'stdout' && typeof result.data['text/plain'] === 'string') ||
                    (result.type === 'text' && result.stream === 'pyout' && typeof result.data['text/plain'] === 'string') ||
                    (result.type === 'text' && result.stream === 'error' && typeof result.data['text/plain'] === 'string')) {
                    var htmlText = anser.ansiToHtml(anser.escapeForHtml(result.data['text/plain']));
                    htmlResponse = htmlResponse + ("<p><pre>" + htmlText + "</pre></p>");
                    responses.push(result.data);
                    if (result.stream === 'error') {
                        return resolve([htmlResponse, responses]);
                    }
                }
                if (result.type === 'text/html' && result.stream === 'pyout' && typeof result.data['text/html'] === 'string') {
                    htmlResponse = htmlResponse + result.data['text/html'];
                    result.data['text/html'] = result.data['text/html'].replace(/<\/script>/g, '</scripts>');
                    responses.push(result.data);
                }
                if (result.type === 'application/javascript' && result.stream === 'pyout' && typeof result.data['application/javascript'] === 'string') {
                    responses.push(result.data);
                    htmlResponse = htmlResponse + ("<script type=\"text/javascript\">" + result.data['application/javascript'] + "</script>");
                }
                if (result.type.startsWith('image/') && result.stream === 'pyout' && typeof result.data[result.type] === 'string') {
                    responses.push(result.data);
                    htmlResponse = htmlResponse + ("<div style=\"background-color:white;display:inline-block;\"><img src=\"data:" + result.type + ";base64," + result.data[result.type] + "\" /></div><div></div>");
                }
                if (result.data === 'ok' && result.stream === 'status' && result.type === 'text') {
                    resolve([htmlResponse, responses]);
                }
            });
        });
    };
    Jupyter.prototype.executeSelection = function () {
        var activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor || !activeEditor.document) {
            return;
        }
        var code = activeEditor.document.getText(vscode.window.activeTextEditor.selection);
        this.executeCode(code, activeEditor.document.languageId);
    };
    Jupyter.prototype.registerKernelCommands = function () {
        var _this = this;
        this.disposables.push(vscode.commands.registerCommand(constants_1.Commands.Jupyter.Kernel.Kernel_Interrupt, function () {
            _this.kernel.interrupt();
        }));
        this.disposables.push(vscode.commands.registerCommand(constants_1.Commands.Jupyter.Kernel.Kernel_Restart, function () {
            _this.kernelManager.restartRunningKernelFor(_this.kernel.kernelSpec.language).then(function (kernel) {
                _this.onKernelChanged(kernel);
            });
        }));
        this.disposables.push(vscode.commands.registerCommand(constants_1.Commands.Jupyter.Kernel.Kernel_Interrupt, function () {
            _this.kernel.shutdown();
            _this.onKernelChanged();
        }));
    };
    return Jupyter;
}(vscode.Disposable));
exports.Jupyter = Jupyter;
;
//# sourceMappingURL=main.js.map