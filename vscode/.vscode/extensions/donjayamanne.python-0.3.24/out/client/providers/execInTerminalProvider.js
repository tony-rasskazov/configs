'use strict';
var vscode = require('vscode');
var settings = require('../common/configSettings');
var constants_1 = require('../common/constants');
function activateExecInTerminalProvider() {
    vscode.commands.registerCommand(constants_1.Commands.Exec_In_Terminal, execInTerminal);
    vscode.commands.registerCommand(constants_1.Commands.Exec_Selection_In_Terminal, execSelectionInTerminal);
}
exports.activateExecInTerminalProvider = activateExecInTerminalProvider;
function execInTerminal(fileUri) {
    var currentPythonPath = settings.PythonSettings.getInstance().pythonPath;
    var filePath;
    if (fileUri === undefined) {
        var activeEditor = vscode.window.activeTextEditor;
        if (activeEditor !== undefined) {
            if (!activeEditor.document.isUntitled) {
                if (activeEditor.document.languageId === 'python') {
                    filePath = activeEditor.document.fileName;
                }
                else {
                    vscode.window.showErrorMessage('The active file is not a Python source file');
                    return;
                }
            }
            else {
                vscode.window.showErrorMessage('The active file needs to be saved before it can be run');
                return;
            }
        }
        else {
            vscode.window.showErrorMessage('No open file to run in terminal');
            return;
        }
    }
    else {
        filePath = fileUri.fsPath;
    }
    if (filePath.indexOf(' ') > 0) {
        filePath = "\"" + filePath + "\"";
    }
    var terminal = vscode.window.createTerminal("Python");
    terminal.sendText(currentPythonPath + " " + filePath);
}
function execSelectionInTerminal() {
    var currentPythonPath = settings.PythonSettings.getInstance().pythonPath;
    var activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }
    var selection = vscode.window.activeTextEditor.selection;
    if (selection.isEmpty) {
        return;
    }
    var code = vscode.window.activeTextEditor.document.getText(new vscode.Range(selection.start, selection.end));
    var terminal = vscode.window.createTerminal("Python");
    terminal.sendText(currentPythonPath + " -c \"" + code + "\"");
}
//# sourceMappingURL=execInTerminalProvider.js.map