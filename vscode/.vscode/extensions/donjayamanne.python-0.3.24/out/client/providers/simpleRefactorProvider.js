'use strict';
var vscode = require('vscode');
var proxy_1 = require('../refactor/proxy');
var editor_1 = require('../common/editor');
var configSettings_1 = require('../common/configSettings');
function activateSimplePythonRefactorProvider(context, outputChannel) {
    var disposable = vscode.commands.registerCommand('python.refactorExtractVariable', function () {
        extractVariable(context.extensionPath, vscode.window.activeTextEditor, vscode.window.activeTextEditor.selection, outputChannel).catch(function () { });
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('python.refactorExtractMethod', function () {
        extractMethod(context.extensionPath, vscode.window.activeTextEditor, vscode.window.activeTextEditor.selection, outputChannel).catch(function () { });
    });
    context.subscriptions.push(disposable);
}
exports.activateSimplePythonRefactorProvider = activateSimplePythonRefactorProvider;
// Exported for unit testing
function extractVariable(extensionDir, textEditor, range, outputChannel, workspaceRoot, pythonSettings) {
    if (workspaceRoot === void 0) { workspaceRoot = vscode.workspace.rootPath; }
    if (pythonSettings === void 0) { pythonSettings = configSettings_1.PythonSettings.getInstance(); }
    var newName = 'newvariable' + new Date().getMilliseconds().toString();
    var proxy = new proxy_1.RefactorProxy(extensionDir, pythonSettings, workspaceRoot);
    var rename = proxy.extractVariable(textEditor.document, newName, textEditor.document.uri.fsPath, range).then(function (response) {
        return response.results[0].diff;
    });
    return extractName(extensionDir, textEditor, range, newName, rename, outputChannel);
}
exports.extractVariable = extractVariable;
// Exported for unit testing
function extractMethod(extensionDir, textEditor, range, outputChannel, workspaceRoot, pythonSettings) {
    if (workspaceRoot === void 0) { workspaceRoot = vscode.workspace.rootPath; }
    if (pythonSettings === void 0) { pythonSettings = configSettings_1.PythonSettings.getInstance(); }
    var newName = 'newmethod' + new Date().getMilliseconds().toString();
    var proxy = new proxy_1.RefactorProxy(extensionDir, pythonSettings, workspaceRoot);
    var rename = proxy.extractMethod(textEditor.document, newName, textEditor.document.uri.fsPath, range).then(function (response) {
        return response.results[0].diff;
    });
    return extractName(extensionDir, textEditor, range, newName, rename, outputChannel);
}
exports.extractMethod = extractMethod;
function extractName(extensionDir, textEditor, range, newName, renameResponse, outputChannel) {
    var changeStartsAtLine = -1;
    return renameResponse.then(function (diff) {
        if (diff.length === 0) {
            return [];
        }
        var edits = editor_1.getTextEditsFromPatch(textEditor.document.getText(), diff);
        return edits;
    }).then(function (edits) {
        return textEditor.edit(function (editBuilder) {
            edits.forEach(function (edit) {
                if (changeStartsAtLine === -1 || changeStartsAtLine > edit.range.start.line) {
                    changeStartsAtLine = edit.range.start.line;
                }
                editBuilder.replace(edit.range, edit.newText);
            });
        });
    }).then(function (done) {
        if (done && changeStartsAtLine >= 0) {
            var newWordPosition = void 0;
            for (var lineNumber = changeStartsAtLine; lineNumber < textEditor.document.lineCount; lineNumber++) {
                var line = textEditor.document.lineAt(lineNumber);
                var indexOfWord = line.text.indexOf(newName);
                if (indexOfWord >= 0) {
                    newWordPosition = new vscode.Position(line.range.start.line, indexOfWord);
                    break;
                }
            }
            if (newWordPosition) {
                textEditor.selections = [new vscode.Selection(newWordPosition, new vscode.Position(newWordPosition.line, newWordPosition.character + newName.length))];
                textEditor.revealRange(new vscode.Range(textEditor.selection.start, textEditor.selection.end), vscode.TextEditorRevealType.Default);
            }
            return newWordPosition;
        }
        return null;
    }).then(function (newWordPosition) {
        if (newWordPosition) {
            // Now that we have selected the new variable, lets invoke the rename command
            vscode.commands.executeCommand('editor.action.rename');
        }
    }).catch(function (error) {
        var errorMessage = error + '';
        if (typeof error === 'string') {
            errorMessage = error;
        }
        if (typeof error === 'object' && error.message) {
            errorMessage = error.message;
        }
        outputChannel.appendLine('#'.repeat(10) + 'Refactor Output' + '#'.repeat(10));
        outputChannel.appendLine('Error in refactoring:\n' + errorMessage);
        vscode.window.showErrorMessage("Cannot perform refactoring using selected element(s). (" + errorMessage + ")");
        return Promise.reject(error);
    });
}
//# sourceMappingURL=simpleRefactorProvider.js.map