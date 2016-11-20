'use strict';
var vscode = require('vscode');
var proxy = require('./jediProxy');
var telemetryContracts = require("../common/telemetryContracts");
var PythonHoverProvider = (function () {
    function PythonHoverProvider(context) {
        this.jediProxyHandler = new proxy.JediProxyHandler(context, null, PythonHoverProvider.parseData);
    }
    PythonHoverProvider.parseData = function (data) {
        if (data && data.items.length > 0) {
            var definition = data.items[0];
            var txt = definition.description || definition.text;
            return new vscode.Hover({ language: "python", value: txt });
        }
        return null;
    };
    PythonHoverProvider.prototype.provideHover = function (document, position, token) {
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
            if (range == undefined || range.isEmpty) {
                return resolve();
            }
            var columnIndex = range.end.character;
            var cmd = {
                telemetryEvent: telemetryContracts.IDE.HoverDefinition,
                command: proxy.CommandType.Completions,
                fileName: filename,
                columnIndex: columnIndex,
                lineIndex: position.line,
                source: source
            };
            _this.jediProxyHandler.sendCommand(cmd, resolve, token);
        });
    };
    return PythonHoverProvider;
}());
exports.PythonHoverProvider = PythonHoverProvider;
//# sourceMappingURL=hoverProvider.js.map