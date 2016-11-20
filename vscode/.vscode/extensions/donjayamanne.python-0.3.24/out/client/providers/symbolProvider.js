'use strict';
var vscode = require('vscode');
var proxy = require('./jediProxy');
var telemetryContracts = require("../common/telemetryContracts");
var PythonSymbolProvider = (function () {
    function PythonSymbolProvider(context, jediProxy) {
        if (jediProxy === void 0) { jediProxy = null; }
        this.jediProxyHandler = new proxy.JediProxyHandler(context, [], PythonSymbolProvider.parseData, jediProxy);
    }
    PythonSymbolProvider.parseData = function (data) {
        if (data) {
            var symbols = data.definitions.map(function (sym) {
                var symbol = sym.kind;
                var range = new vscode.Range(sym.lineIndex, sym.columnIndex, sym.lineIndex, sym.columnIndex);
                return new vscode.SymbolInformation(sym.text, symbol, range, vscode.Uri.file(sym.fileName));
            });
            return symbols;
        }
        return;
    };
    PythonSymbolProvider.prototype.provideDocumentSymbols = function (document, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var filename = document.fileName;
            var source = document.getText();
            var cmd = {
                telemetryEvent: telemetryContracts.IDE.Symbol,
                command: proxy.CommandType.Symbols,
                fileName: filename,
                columnIndex: 0,
                lineIndex: 0,
                source: source
            };
            _this.jediProxyHandler.sendCommand(cmd, resolve, token);
        });
    };
    return PythonSymbolProvider;
}());
exports.PythonSymbolProvider = PythonSymbolProvider;
//# sourceMappingURL=symbolProvider.js.map