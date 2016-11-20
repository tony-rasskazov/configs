'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseLinter = require('./baseLinter');
var utils_1 = require('./../common/utils');
var Linter = (function (_super) {
    __extends(Linter, _super);
    function Linter(outputChannel, workspaceRootPath) {
        _super.call(this, 'prospector', outputChannel, workspaceRootPath);
    }
    Linter.prototype.isEnabled = function () {
        return this.pythonSettings.linting.prospectorEnabled;
    };
    Linter.prototype.runLinter = function (filePath, txtDocumentLines) {
        var _this = this;
        if (!this.pythonSettings.linting.prospectorEnabled) {
            return Promise.resolve([]);
        }
        var prospectorPath = this.pythonSettings.linting.prospectorPath;
        var outputChannel = this.outputChannel;
        var linterId = this.Id;
        var prospectorArgs = Array.isArray(this.pythonSettings.linting.prospectorArgs) ? this.pythonSettings.linting.prospectorArgs : [];
        return new Promise(function (resolve, reject) {
            utils_1.execPythonFile(prospectorPath, prospectorArgs.concat(['--absolute-paths', '--output-format=json', filePath]), _this.workspaceRootPath, false).then(function (data) {
                var parsedData;
                try {
                    parsedData = JSON.parse(data);
                }
                catch (ex) {
                    outputChannel.append('#'.repeat(10) + 'Linting Output - ' + _this.Id + '#'.repeat(10) + '\n');
                    outputChannel.append(data);
                    return resolve([]);
                }
                var diagnostics = [];
                parsedData.messages.filter(function (value, index) { return index <= _this.pythonSettings.linting.maxNumberOfProblems; }).forEach(function (msg) {
                    var sourceLine = txtDocumentLines[msg.location.line - 1];
                    var sourceStart = sourceLine.substring(msg.location.character);
                    var endCol = txtDocumentLines[msg.location.line - 1].length;
                    // try to get the first word from the starting position
                    var possibleProblemWords = sourceStart.match(/\w+/g);
                    var possibleWord;
                    if (possibleProblemWords != null && possibleProblemWords.length > 0 && sourceStart.startsWith(possibleProblemWords[0])) {
                        possibleWord = possibleProblemWords[0];
                    }
                    diagnostics.push({
                        code: msg.code,
                        message: msg.message,
                        column: msg.location.character,
                        line: msg.location.line,
                        possibleWord: possibleWord,
                        type: msg.code,
                        provider: _this.Id + " - " + msg.source
                    });
                });
                resolve(diagnostics);
            }).catch(function (error) {
                _this.handleError(_this.Id, prospectorPath, error);
                resolve([]);
            });
        });
    };
    return Linter;
}(baseLinter.BaseLinter));
exports.Linter = Linter;
//# sourceMappingURL=prospector.js.map