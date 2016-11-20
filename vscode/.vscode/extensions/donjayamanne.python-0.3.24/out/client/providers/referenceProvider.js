'use strict';
var vscode = require('vscode');
var proxy = require('./jediProxy');
var telemetryContracts = require("../common/telemetryContracts");
var PythonReferenceProvider = (function () {
    function PythonReferenceProvider(context) {
        this.jediProxyHandler = new proxy.JediProxyHandler(context, [], PythonReferenceProvider.parseData);
    }
    PythonReferenceProvider.parseData = function (data) {
        if (data && data.references.length > 0) {
            var references = data.references.map(function (ref) {
                var definitionResource = vscode.Uri.file(ref.fileName);
                var range = new vscode.Range(ref.lineIndex, ref.columnIndex, ref.lineIndex, ref.columnIndex);
                return new vscode.Location(definitionResource, range);
            });
            return references;
        }
        return [];
    };
    PythonReferenceProvider.prototype.provideReferences = function (document, position, context, token) {
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
                telemetryEvent: telemetryContracts.IDE.Reference,
                command: proxy.CommandType.Usages,
                fileName: filename,
                columnIndex: columnIndex,
                lineIndex: position.line,
                source: source
            };
            var definition = null;
            _this.jediProxyHandler.sendCommand(cmd, resolve, token);
        });
    };
    return PythonReferenceProvider;
}());
exports.PythonReferenceProvider = PythonReferenceProvider;
//# sourceMappingURL=referenceProvider.js.map