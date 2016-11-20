'use strict';
var vscode = require('vscode');
var PythonCodeActionsProvider = (function () {
    function PythonCodeActionsProvider(context) {
    }
    PythonCodeActionsProvider.prototype.provideCodeActions = function (document, range, context, token) {
        return new Promise(function (resolve, reject) {
            var commands = [
                {
                    command: 'python.sortImports',
                    title: 'Sort Imports'
                }
            ];
            if (vscode.window.activeTextEditor.document === document && !vscode.window.activeTextEditor.selection.isEmpty) {
                var wordRange = document.getWordRangeAtPosition(range.start);
                // If no word has been selected by the user, then don't display rename
                // If something has been selected, then ensure we have selected a word (i.e. end and start matches the word range) 
                var selectionIsEmpty = range.isEmpty;
                if (wordRange && !wordRange.isEmpty && wordRange.isEqual(vscode.window.activeTextEditor.selection)) {
                    var word = document.getText(wordRange).trim();
                    if (word.length > 0) {
                        commands.push({ command: 'editor.action.rename', title: 'Rename Symbol' });
                    }
                }
            }
            if (!range.isEmpty) {
                var word = document.getText(range).trim();
                if (word.trim().length > 0) {
                    commands.push({ command: 'python.refactorExtractVariable', title: 'Extract Variable', arguments: [range] });
                    commands.push({ command: 'python.refactorExtractMethod', title: 'Extract Method', arguments: [range] });
                }
            }
            resolve(commands);
        });
    };
    return PythonCodeActionsProvider;
}());
exports.PythonCodeActionsProvider = PythonCodeActionsProvider;
//# sourceMappingURL=codeActionProvider.js.map