"use strict";
var parser = require('../logParser');
var child_process_1 = require('child_process');
var os = require('os');
var historyUtils_1 = require('./historyUtils');
var LOG_ENTRY_SEPARATOR = '95E9659B-27DC-43C4-A717-D75969757EA5';
var STATS_SEPARATOR = parser.STATS_SEPARATOR;
var LOG_FORMAT = "--format=\"%n" + LOG_ENTRY_SEPARATOR + "%nrefs=%d%ncommit=%H%ncommitAbbrev=%h%ntree=%T%ntreeAbbrev=%t%nparents=%P%nparentsAbbrev=%p%nauthor=%an <%ae> %at%ncommitter=%cn <%ce> %ct%nsubject=%s%nbody=%b%n%nnotes=%N%n" + STATS_SEPARATOR + "%n\"";
function getHistory(rootDir, pageIndex, pageSize, branchName) {
    if (pageIndex === void 0) { pageIndex = 0; }
    if (pageSize === void 0) { pageSize = 100; }
    if (branchName === void 0) { branchName = 'master'; }
    var args = ['log', LOG_FORMAT, '--date-order', '--decorate=full', ("--skip=" + pageIndex * pageSize), ("--max-count=" + pageSize), branchName, '--numstat', '--'];
    args = ['log', LOG_FORMAT, '--date-order', '--decorate=full', ("--skip=" + pageIndex * pageSize), ("--max-count=" + pageSize), '--numstat', '--'];
    // This is how you can view the log across all branches
    // args = ['log', LOG_FORMAT, '--date-order', '--decorate=full', `--skip=${pageIndex * pageSize}`, `--max-count=${pageSize}`, '--all', '--']
    return historyUtils_1.getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var ls = child_process_1.spawn(gitExecutable, args, options);
            var error = '';
            var outputLines = [''];
            var entries = [];
            ls.stdout.setEncoding('utf8');
            ls.stdout.on('data', function (data) {
                // console.log(data);
                data.split(/\r?\n/g).forEach(function (line, index, lines) {
                    if (line === LOG_ENTRY_SEPARATOR) {
                        var entry = parser.parseLogEntry(outputLines);
                        if (entry) {
                            entries.push(entry);
                        }
                        outputLines = [''];
                    }
                    if (index === 0) {
                        if (data.startsWith(os.EOL)) {
                            outputLines.push(line);
                            return;
                        }
                        outputLines[outputLines.length - 1] += line;
                        if (lines.length > 1) {
                            outputLines.push('');
                        }
                        return;
                    }
                    if (index === lines.length - 1) {
                        outputLines[outputLines.length - 1] += line;
                        return;
                    }
                    outputLines[outputLines.length - 1] += line;
                    outputLines.push('');
                });
            });
            ls.stderr.setEncoding('utf8');
            ls.stderr.on('data', function (data) {
                error += data;
            });
            ls.on('exit', function (code) {
                if (error.length > 0) {
                    reject(error);
                    return;
                }
                resolve(entries);
            });
        });
    });
}
exports.getHistory = getHistory;
//# sourceMappingURL=gitHistory.js.map