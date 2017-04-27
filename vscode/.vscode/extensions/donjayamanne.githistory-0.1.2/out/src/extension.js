"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var history = require('./commands/fileHistory');
var lineHistory = require('./commands/lineHistory');
var viewer = require('./logViewer/main');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var outChannel = vscode.window.createOutputChannel('Git');
    history.activate(outChannel);
    var disposable = vscode.commands.registerCommand('git.viewFileHistory', function (fileUri) {
        outChannel.clear();
        var fileName = '';
        if (fileUri && fileUri.fsPath) {
            fileName = fileUri.fsPath;
        }
        else {
            if (!vscode.window.activeTextEditor || !vscode.window.activeTextEditor.document) {
                return;
            }
            fileName = vscode.window.activeTextEditor.document.fileName;
        }
        history.run(fileName);
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerTextEditorCommand('git.viewLineHistory', function () {
        outChannel.clear();
        lineHistory.run(outChannel);
    });
    context.subscriptions.push(disposable);
    viewer.activate(context, outChannel);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map