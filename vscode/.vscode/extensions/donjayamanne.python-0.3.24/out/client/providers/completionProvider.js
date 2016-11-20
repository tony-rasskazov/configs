'use strict';
var vscode = require('vscode');
var proxy = require('./jediProxy');
var telemetryContracts = require("../common/telemetryContracts");
var PythonCompletionItemProvider = (function () {
    function PythonCompletionItemProvider(context) {
        this.jediProxyHandler = new proxy.JediProxyHandler(context, [], PythonCompletionItemProvider.parseData);
    }
    PythonCompletionItemProvider.parseData = function (data) {
        if (data && data.items.length > 0) {
            return data.items.map(function (item) {
                var completionItem = new vscode.CompletionItem(item.text);
                completionItem.documentation = item.description;
                // ensure the built in memebers are at the bottom
                completionItem.sortText = (completionItem.label.startsWith("__") ? "z" : (completionItem.label.startsWith("_") ? "y" : "__")) + completionItem.label;
                return completionItem;
            });
        }
        return [];
    };
    PythonCompletionItemProvider.prototype.provideCompletionItems = function (document, position, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var filename = document.fileName;
            if (document.lineAt(position.line).text.match(/^\s*\/\//)) {
                return resolve([]);
            }
            if (position.character <= 0) {
                return resolve([]);
            }
            var txt = document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 1), position));
            var type = proxy.CommandType.Completions;
            var columnIndex = position.character;
            var source = document.getText();
            var cmd = {
                telemetryEvent: telemetryContracts.IDE.Completion,
                command: type,
                fileName: filename,
                columnIndex: columnIndex,
                lineIndex: position.line,
                source: source
            };
            _this.jediProxyHandler.sendCommand(cmd, resolve, token);
        });
    };
    return PythonCompletionItemProvider;
}());
exports.PythonCompletionItemProvider = PythonCompletionItemProvider;
//# sourceMappingURL=completionProvider.js.map