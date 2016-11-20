'use strict';
var vscode = require('vscode');
var proxy = require('./jediProxy');
var telemetryContracts = require("../common/telemetryContracts");
var _oldName = "";
var _newName = "";
var PythonRenameProvider = (function () {
    function PythonRenameProvider(context) {
        this.jediProxyHandler = new proxy.JediProxyHandler(context, null, PythonRenameProvider.parseData);
    }
    Object.defineProperty(PythonRenameProvider.prototype, "JediProxy", {
        get: function () {
            return this.jediProxyHandler.JediProxy;
        },
        enumerable: true,
        configurable: true
    });
    PythonRenameProvider.parseData = function (data) {
        if (data && data.references.length > 0) {
            var references = data.references.filter(function (ref) {
                var relPath = vscode.workspace.asRelativePath(ref.fileName);
                return !relPath.startsWith("..");
            });
            var workSpaceEdit = new vscode.WorkspaceEdit();
            references.forEach(function (ref) {
                var uri = vscode.Uri.file(ref.fileName);
                var range = new vscode.Range(ref.lineIndex, ref.columnIndex, ref.lineIndex, ref.columnIndex + _oldName.length);
                workSpaceEdit.replace(uri, range, _newName);
            });
            return workSpaceEdit;
        }
        return;
    };
    PythonRenameProvider.prototype.provideRenameEdits = function (document, position, newName, token) {
        var _this = this;
        return vscode.workspace.saveAll(false).then(function () {
            return _this.doRename(document, position, newName, token);
        });
    };
    PythonRenameProvider.prototype.doRename = function (document, position, newName, token) {
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
            if (range == undefined || range == null || range.isEmpty) {
                return resolve();
            }
            _oldName = document.getText(range);
            _newName = newName;
            if (_oldName === newName) {
                return resolve();
            }
            var columnIndex = range.isEmpty ? position.character : range.end.character;
            var cmd = {
                telemetryEvent: telemetryContracts.IDE.Rename,
                command: proxy.CommandType.Usages,
                fileName: filename,
                columnIndex: columnIndex,
                lineIndex: position.line,
                source: source
            };
            _this.jediProxyHandler.sendCommand(cmd, resolve, token);
        });
    };
    return PythonRenameProvider;
}());
exports.PythonRenameProvider = PythonRenameProvider;
//# sourceMappingURL=renameProvider.js.map