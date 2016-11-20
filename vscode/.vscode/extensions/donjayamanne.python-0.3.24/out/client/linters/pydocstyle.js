'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path = require('path');
var baseLinter = require('./baseLinter');
var utils_1 = require('./../common/utils');
var Linter = (function (_super) {
    __extends(Linter, _super);
    function Linter(outputChannel, workspaceRootPath) {
        _super.call(this, 'pydocstyle', outputChannel, workspaceRootPath);
    }
    Linter.prototype.isEnabled = function () {
        return this.pythonSettings.linting.pydocstyleEnabled;
    };
    Linter.prototype.runLinter = function (filePath, txtDocumentLines) {
        var _this = this;
        if (!this.pythonSettings.linting.pydocstyleEnabled) {
            return Promise.resolve([]);
        }
        var pydocStylePath = this.pythonSettings.linting.pydocStylePath;
        var pydocstyleArgs = Array.isArray(this.pythonSettings.linting.pydocstleArgs) ? this.pythonSettings.linting.pydocstleArgs : [];
        return new Promise(function (resolve) {
            _this.run(pydocStylePath, pydocstyleArgs.concat([filePath]), filePath, txtDocumentLines).then(function (messages) {
                // All messages in pep8 are treated as warnings for now
                messages.forEach(function (msg) {
                    msg.severity = baseLinter.LintMessageSeverity.Information;
                });
                resolve(messages);
            });
        });
    };
    Linter.prototype.run = function (commandLine, args, filePath, txtDocumentLines) {
        var _this = this;
        var outputChannel = this.outputChannel;
        var linterId = this.Id;
        return new Promise(function (resolve, reject) {
            var fileDir = path.dirname(filePath);
            utils_1.execPythonFile(commandLine, args, _this.workspaceRootPath, true).then(function (data) {
                outputChannel.append('#'.repeat(10) + 'Linting Output - ' + _this.Id + '#'.repeat(10) + '\n');
                outputChannel.append(data);
                var outputLines = data.split(/\r?\n/g);
                var diagnostics = [];
                var baseFileName = path.basename(filePath);
                // Remember, the first line of the response contains the file name and line number, the next line contains the error message
                // So we have two lines per message, hence we need to take lines in pairs
                var maxLines = _this.pythonSettings.linting.maxNumberOfProblems * 2;
                // First line is almost always empty
                var oldOutputLines = outputLines.filter(function (line) { return line.length > 0; });
                outputLines = [];
                for (var counter = 0; counter < oldOutputLines.length / 2; counter++) {
                    outputLines.push(oldOutputLines[2 * counter] + oldOutputLines[(2 * counter) + 1]);
                }
                outputLines = outputLines.filter(function (value, index) { return index < maxLines && value.indexOf(':') >= 0; }).map(function (line) { return line.substring(line.indexOf(':') + 1).trim(); });
                // Iterate through the lines (skipping the messages)
                // So, just iterate the response in pairs
                outputLines.forEach(function (line) {
                    try {
                        if (line.trim().length === 0) {
                            return;
                        }
                        var lineNumber = parseInt(line.substring(0, line.indexOf(' ')));
                        var part = line.substring(line.indexOf(':') + 1).trim();
                        var code = part.substring(0, part.indexOf(':')).trim();
                        var message = part.substring(part.indexOf(':') + 1).trim();
                        var sourceLine = txtDocumentLines[lineNumber - 1];
                        var trmmedSourceLine = sourceLine.trim();
                        var sourceStart = sourceLine.indexOf(trmmedSourceLine);
                        var endCol = sourceStart + trmmedSourceLine.length;
                        diagnostics.push({
                            code: code,
                            message: message,
                            column: sourceStart,
                            line: lineNumber,
                            type: '',
                            provider: _this.Id
                        });
                    }
                    catch (ex) {
                        // Hmm, need to handle this later
                        var y = '';
                    }
                });
                resolve(diagnostics);
            }, function (error) {
                _this.handleError(_this.Id, commandLine, error);
                resolve([]);
            });
        });
    };
    return Linter;
}(baseLinter.BaseLinter));
exports.Linter = Linter;
//# sourceMappingURL=pydocstyle.js.map