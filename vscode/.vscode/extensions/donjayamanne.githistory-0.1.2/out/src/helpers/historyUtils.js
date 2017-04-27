"use strict";
var vscode = require('vscode');
var parser = require('../logParser');
var fs = require('fs');
var path = require('path');
var child_process_1 = require('child_process');
function getGitPath() {
    return new Promise(function (resolve, reject) {
        var gitPath = vscode.workspace.getConfiguration('git').get('path');
        if (typeof gitPath === "string" && gitPath.length > 0) {
            resolve(gitPath);
        }
        if (process.platform !== 'win32') {
            // Default: search in PATH environment variable
            resolve('git');
        }
        else {
            // in Git for Windows, the recommendation is not to put git into the PATH.
            // Instead, there is an entry in the Registry.
            var regQueryInstallPath_1 = function (location, view) {
                return new Promise(function (resolve, reject) {
                    var callback = function (error, stdout, stderr) {
                        if (error && error.code !== 0) {
                            error.stdout = stdout.toString();
                            error.stderr = stderr.toString();
                            reject(error);
                            return;
                        }
                        var installPath = stdout.toString().match(/InstallPath\s+REG_SZ\s+([^\r\n]+)\s*\r?\n/i)[1];
                        if (installPath) {
                            resolve(installPath + '\\bin\\git');
                        }
                        else {
                            reject();
                        }
                    };
                    var viewArg = '';
                    switch (view) {
                        case '64':
                            viewArg = '/reg:64';
                            break;
                        case '32':
                            viewArg = '/reg:64';
                            break;
                        default: break;
                    }
                    child_process_1.exec('reg query ' + location + ' ' + viewArg, callback);
                });
            };
            var queryChained_1 = function (locations) {
                return new Promise(function (resolve, reject) {
                    if (locations.length === 0) {
                        reject('None of the known git Registry keys were found');
                        return;
                    }
                    var location = locations[0];
                    regQueryInstallPath_1(location.key, location.view).then(function (location) { return resolve(location); }, function (error) { return queryChained_1(locations.slice(1)).then(function (location) { return resolve(location); }, function (error) { return reject(error); }); });
                });
            };
            queryChained_1([
                { 'key': 'HKCU\\SOFTWARE\\GitForWindows', 'view': null },
                { 'key': 'HKLM\\SOFTWARE\\GitForWindows', 'view': null },
                { 'key': 'HKCU\\SOFTWARE\\GitForWindows', 'view': '64' },
                { 'key': 'HKLM\\SOFTWARE\\GitForWindows', 'view': '64' },
                { 'key': 'HKCU\\SOFTWARE\\GitForWindows', 'view': '32' },
                { 'key': 'HKLM\\SOFTWARE\\GitForWindows', 'view': '32' }]).
                then(function (path) { return resolve(path); }, 
            // fallback: PATH
            function (error) { return resolve('git'); });
        }
    });
}
exports.getGitPath = getGitPath;
function getGitRepositoryPath(fileName) {
    return getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: path.dirname(fileName) };
            //git rev-parse --git-dir
            var ls = child_process_1.spawn(gitExecutable, ['rev-parse', '--show-toplevel'], options);
            var log = "";
            var error = "";
            ls.stdout.on('data', function (data) {
                log += data + "\n";
            });
            ls.stderr.on('data', function (data) {
                error += data;
            });
            ls.on('exit', function (code) {
                if (error.length > 0) {
                    reject(error);
                    return;
                }
                var repositoryPath = log.trim();
                if (!path.isAbsolute(repositoryPath))
                    repositoryPath = path.join(path.dirname(fileName), repositoryPath);
                resolve(repositoryPath);
            });
        });
    });
}
exports.getGitRepositoryPath = getGitRepositoryPath;
function getFileHistory(rootDir, relativeFilePath) {
    return getLog(rootDir, relativeFilePath, ['--max-count=50', '--decorate=full', '--date=default', '--pretty=fuller', '--parents', '--numstat', '--topo-order', '--raw', '--follow', relativeFilePath]);
}
exports.getFileHistory = getFileHistory;
function getFileHistoryBefore(rootDir, relativeFilePath, sha1, isoStrictDateTime) {
    return getLog(rootDir, relativeFilePath, ["--max-count=10", '--decorate=full', '--date=default', '--pretty=fuller', '--all', '--parents', '--numstat', '--topo-order', '--raw', '--follow', ("--before='" + isoStrictDateTime + "'"), relativeFilePath]);
}
exports.getFileHistoryBefore = getFileHistoryBefore;
function getLineHistory(rootDir, relativeFilePath, lineNumber) {
    var lineArgs = "-L" + lineNumber + "," + lineNumber + ":" + relativeFilePath.replace(/\\/g, '/');
    return getLog(rootDir, relativeFilePath, [lineArgs, '--max-count=50', '--decorate=full', '--date=default', '--pretty=fuller', '--numstat', '--topo-order', '--raw']);
}
exports.getLineHistory = getLineHistory;
function getLog(rootDir, relativeFilePath, args) {
    return getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var ls = child_process_1.spawn(gitExecutable, ['log'].concat(args), options);
            var log = "";
            var error = "";
            ls.stdout.on('data', function (data) {
                log += data + "\n";
            });
            ls.stderr.on('data', function (data) {
                error += data;
            });
            ls.on('exit', function (code) {
                if (error.length > 0) {
                    reject(error);
                    return;
                }
                var parsedLog = parser.parseLogContents(log);
                resolve(parsedLog);
            });
        });
    });
}
function writeFile(rootDir, commitSha1, sourceFilePath, targetFile) {
    return getGitPath().then(function (gitExecutable) { return new Promise(function (resolve, reject) {
        var options = { cwd: rootDir };
        var objectId = (commitSha1 + ":") + sourceFilePath.replace(/\\/g, '/');
        var ls = child_process_1.spawn(gitExecutable, ['show', objectId], options);
        var error = "";
        ls.stdout.on('data', function (data) {
            fs.appendFileSync(targetFile, data);
        });
        ls.stderr.on('data', function (data) {
            error += data;
        });
        ls.on('exit', function (code) {
            if (error.length > 0) {
                reject(error);
                return;
            }
            resolve(targetFile);
        });
    }); });
}
exports.writeFile = writeFile;
//# sourceMappingURL=historyUtils.js.map