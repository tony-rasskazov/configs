"use strict";
var vscode = require('vscode');
var clang = require('./clang');
var configuration = require("./configuration");
var diagnostic = require('./diagnostic');
var completion = require('./completion');
var CLANG_MODE = [
    { language: 'cpp', scheme: 'file' },
    { language: 'c', scheme: 'file' },
    { language: 'objective-c', scheme: 'file' }
];
var ResidentExtension = (function () {
    function ResidentExtension() {
        this.extensions = new Map();
        this.update();
    }
    ResidentExtension.prototype._updateProvider = function (enable, name, create) {
        if (this.extensions.has(name)) {
            this.extensions.get(name).dispose();
            this.extensions.delete(name);
        }
        if (enable) {
            this.extensions.set(name, create());
        }
    };
    ResidentExtension.prototype.update = function () {
        this._updateProvider(clang.getConf('completion.enable'), 'completion', function () {
            var triggers = clang.getConf('completion.triggerChars');
            var filteredTriggers = [];
            for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
                var t = triggers_1[_i];
                if (typeof t === 'string' && t.length === 1) {
                    filteredTriggers.push(t);
                }
                else {
                    vscode.window.showErrorMessage("length of trigger character must be 1. " + t + " is ignored.");
                }
            }
            return (_a = vscode.languages).registerCompletionItemProvider.apply(_a, [CLANG_MODE, new completion.ClangCompletionItemProvider()].concat(filteredTriggers));
            var _a;
        });
        this._updateProvider(clang.getConf('diagnostic.enable'), 'diagnostic', function () { return diagnostic.registerDiagnosticProvider(CLANG_MODE, new diagnostic.ClangDiagnosticProvider, 'clang'); });
    };
    ResidentExtension.prototype.dispose = function () {
        for (var _i = 0, _a = Array.from(this.extensions.values()); _i < _a.length; _i++) {
            var disposable = _a[_i];
            disposable.dispose();
        }
    };
    return ResidentExtension;
}());
function activate(context) {
    var confViewer = new configuration.ConfigurationViewer;
    context.subscriptions.push(confViewer);
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('clang.showExecConf', function (editor, edit) {
        if (!vscode.languages.match(CLANG_MODE, editor.document)) {
            vscode.window.showErrorMessage("Current language is not C, C++ or Objective-C");
            return;
        }
        confViewer.show(editor.document);
    }));
    var confTester = new configuration.ConfigurationTester;
    context.subscriptions.push(confTester);
    var subscriptions = [];
    vscode.window.onDidChangeActiveTextEditor(function (editor) {
        if (!editor || !vscode.languages.match(CLANG_MODE, editor.document))
            return;
        confTester.test(editor.document.languageId);
    }, null, subscriptions);
    var residentExtension = new ResidentExtension();
    context.subscriptions.push(residentExtension);
    vscode.workspace.onDidChangeConfiguration(function () {
        residentExtension.update();
    }, null, subscriptions);
    context.subscriptions.push((_a = vscode.Disposable).from.apply(_a, subscriptions));
    var _a;
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map