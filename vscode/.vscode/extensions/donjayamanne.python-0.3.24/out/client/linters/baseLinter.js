'use strict';
var utils_1 = require('./../common/utils');
var settings = require('./../common/configSettings');
var helpers_1 = require('../common/helpers');
var NamedRegexp = null;
var REGEX = '(?<line>\\d+),(?<column>\\d+),(?<type>\\w+),(?<code>\\w\\d+):(?<message>.*)\\r?(\\n|$)';
(function (LintMessageSeverity) {
    LintMessageSeverity[LintMessageSeverity["Hint"] = 0] = "Hint";
    LintMessageSeverity[LintMessageSeverity["Error"] = 1] = "Error";
    LintMessageSeverity[LintMessageSeverity["Warning"] = 2] = "Warning";
    LintMessageSeverity[LintMessageSeverity["Information"] = 3] = "Information";
})(exports.LintMessageSeverity || (exports.LintMessageSeverity = {}));
var LintMessageSeverity = exports.LintMessageSeverity;
function matchNamedRegEx(data, regex) {
    if (NamedRegexp === null) {
        NamedRegexp = require('named-js-regexp');
    }
    var compiledRegexp = NamedRegexp(regex, 'g');
    var rawMatch = compiledRegexp.exec(data);
    if (rawMatch !== null) {
        return rawMatch.groups();
    }
    return null;
}
exports.matchNamedRegEx = matchNamedRegEx;
var BaseLinter = (function () {
    function BaseLinter(id, outputChannel, workspaceRootPath) {
        this.outputChannel = outputChannel;
        this.workspaceRootPath = workspaceRootPath;
        this.Id = id;
        this.pythonSettings = settings.PythonSettings.getInstance();
    }
    BaseLinter.prototype.run = function (command, args, filePath, txtDocumentLines, cwd, regEx) {
        var _this = this;
        if (regEx === void 0) { regEx = REGEX; }
        var outputChannel = this.outputChannel;
        var linterId = this.Id;
        return new Promise(function (resolve, reject) {
            utils_1.execPythonFile(command, args, cwd, true).then(function (data) {
                outputChannel.append('#'.repeat(10) + 'Linting Output - ' + _this.Id + '#'.repeat(10) + '\n');
                outputChannel.append(data);
                var outputLines = data.split(/\r?\n/g);
                var diagnostics = [];
                outputLines.filter(function (value, index) { return index <= _this.pythonSettings.linting.maxNumberOfProblems; }).forEach(function (line) {
                    var match = matchNamedRegEx(line, regEx);
                    if (match == null) {
                        return;
                    }
                    try {
                        match.line = Number(match.line);
                        match.column = Number(match.column);
                        var sourceLine = txtDocumentLines[match.line - 1];
                        var sourceStart = sourceLine.substring(match.column - 1);
                        var endCol = txtDocumentLines[match.line - 1].length;
                        // try to get the first word from the startig position
                        var possibleProblemWords = sourceStart.match(/\w+/g);
                        var possibleWord = void 0;
                        if (possibleProblemWords != null && possibleProblemWords.length > 0 && sourceStart.startsWith(possibleProblemWords[0])) {
                            possibleWord = possibleProblemWords[0];
                        }
                        diagnostics.push({
                            code: match.code,
                            message: match.message,
                            column: match.column,
                            line: match.line,
                            possibleWord: possibleWord,
                            type: match.type,
                            provider: _this.Id
                        });
                    }
                    catch (ex) {
                        // Hmm, need to handle this later
                        // TODO:
                        var y = '';
                    }
                });
                resolve(diagnostics);
            }).catch(function (error) {
                _this.handleError(_this.Id, command, error);
                resolve([]);
            });
        });
    };
    BaseLinter.prototype.handleError = function (expectedFileName, fileName, error) {
        var customError = "Linting with " + this.Id + " failed.";
        if (helpers_1.isNotInstalledError(error)) {
            // Check if we have some custom arguments such as "pylint --load-plugins pylint_django"
            // Such settings are no longer supported
            var stuffAfterFileName = fileName.substring(fileName.toUpperCase().lastIndexOf(expectedFileName) + expectedFileName.length);
            // Ok if we have a space after the file name, this means we have some arguments defined and this isn't supported
            if (stuffAfterFileName.trim().indexOf(' ') > 0) {
                customError = ("Linting failed, custom arguments in the 'python.linting." + this.Id + "Path' is not supported.\n") +
                    ("Custom arguments to the linters can be defined in 'python.linting." + this.Id + "Args' setting of settings.json.\n") +
                    'For further details, please see https://github.com/DonJayamanne/pythonVSCode/wiki/Troubleshooting-Linting#2-linting-with-xxx-failed-';
            }
            else {
                customError += "\nYou could either install the '" + this.Id + "' linter or turn it off in setings.json via \"python.linting." + this.Id + "Enabled = false\".";
            }
        }
        this.outputChannel.appendLine("\n" + customError + "\n" + (error + ''));
    };
    return BaseLinter;
}());
exports.BaseLinter = BaseLinter;
//# sourceMappingURL=baseLinter.js.map