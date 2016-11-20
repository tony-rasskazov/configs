'use strict';
var vscode = require('vscode');
var proxy = require('./jediProxy');
var telemetryContracts = require("../common/telemetryContracts");
var PythonDefinitionProvider = (function () {
    function PythonDefinitionProvider(context) {
        this.jediProxyHandler = new proxy.JediProxyHandler(context, null, PythonDefinitionProvider.parseData);
    }
    PythonDefinitionProvider.parseData = function (data) {
        if (data) {
            var definitionResource = vscode.Uri.file(data.definition.fileName);
            var range = new vscode.Range(data.definition.lineIndex, data.definition.columnIndex, data.definition.lineIndex, data.definition.columnIndex);
            return new vscode.Location(definitionResource, range);
        }
        return null;
    };
    PythonDefinitionProvider.prototype.provideDefinition = function (document, position, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var filename = document.fileName;
            if (document.lineAt(position.line).text.match(/^\s*\/\//)) {
                return resolve();
            }
            if (position.character <= 0) {
                return resolve();
            }
            var source = document.getText();
            var range = document.getWordRangeAtPosition(position);
            var columnIndex = range.isEmpty ? position.character : range.end.character;
            var cmd = {
                telemetryEvent: telemetryContracts.IDE.Definition,
                command: proxy.CommandType.Definitions,
                fileName: filename,
                columnIndex: columnIndex,
                lineIndex: position.line,
                source: source
            };
            _this.jediProxyHandler.sendCommand(cmd, resolve, token);
        });
    };
    return PythonDefinitionProvider;
}());
exports.PythonDefinitionProvider = PythonDefinitionProvider;
//# sourceMappingURL=definitionProvider.js.map