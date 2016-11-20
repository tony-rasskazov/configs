"use strict";
var child_process = require('child_process');
var path = require("path");
var fs = require("fs");
var vscode = require("vscode");
var settings = require("./../common/configSettings");
var utils = require("./../common/utils");
var ncp = require("copy-paste");
// where to find the Python binary within a conda env
var CONDA_RELATIVE_PY_PATH = utils.IS_WINDOWS ? ['python'] : ['bin', 'python'];
var REPLACE_PYTHONPATH_REGEXP = /("python\.pythonPath"\s*:\s*)"(.*)"/g;
var CHECK_PYTHON_INTERPRETER_REGEXP = utils.IS_WINDOWS ? /^python(\d+(.\d+)?)?\.exe$/ : /^python(\d+(.\d+)?)?$/;
function isPythonInterpreter(filePath) {
    return CHECK_PYTHON_INTERPRETER_REGEXP.test(filePath);
}
function getSearchPaths() {
    if (utils.IS_WINDOWS) {
        return [
            'C:\\Python2.7',
            'C:\\Python27',
            'C:\\Python3.4',
            'C:\\Python34',
            'C:\\Python3.5',
            'C:\\Python35',
            'C:\\Python35-32',
            'C:\\Program Files (x86)\\Python 2.7',
            'C:\\Program Files (x86)\\Python 3.4',
            'C:\\Program Files (x86)\\Python 3.5',
            'C:\\Program Files (x64)\\Python 2.7',
            'C:\\Program Files (x64)\\Python 3.4',
            'C:\\Program Files (x64)\\Python 3.5',
            'C:\\Program Files\\Python 2.7',
            'C:\\Program Files\\Python 3.4',
            'C:\\Program Files\\Python 3.5'
        ];
    }
    else {
        return ['/usr/local/bin', '/usr/bin', '/bin', '/usr/sbin', '/sbin'];
    }
}
function workspaceSettingsPath() {
    return path.join(vscode.workspace.rootPath, '.vscode', 'settings.json');
}
function openWorkspaceSettings() {
    return vscode.commands.executeCommand('workbench.action.openWorkspaceSettings');
}
function replaceContentsOfFile(doc, newContent) {
    var lastLine = doc.lineAt(doc.lineCount - 2);
    var start = new vscode.Position(0, 0);
    var end = new vscode.Position(doc.lineCount - 1, lastLine.text.length);
    var textEdit = vscode.TextEdit.replace(new vscode.Range(start, end), newContent);
    var workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.set(doc.uri, [textEdit]);
    return vscode.workspace.applyEdit(workspaceEdit).then(function () { return doc.save(); });
}
function activateSetInterpreterProvider() {
    vscode.commands.registerCommand("python.setInterpreter", setInterpreter);
}
exports.activateSetInterpreterProvider = activateSetInterpreterProvider;
function lookForInterpretersInPath(pathToCheck) {
    return new Promise(function (resolve) {
        // Now look for Interpreters in this directory
        fs.readdir(pathToCheck, function (err, subDirs) {
            if (err) {
                return resolve([]);
            }
            var interpreters = subDirs
                .filter(function (subDir) { return CHECK_PYTHON_INTERPRETER_REGEXP.test(subDir); })
                .map(function (subDir) { return path.join(pathToCheck, subDir); });
            resolve(interpreters);
        });
    });
}
function lookForInterpretersInVirtualEnvs(pathToCheck) {
    return new Promise(function (resolve) {
        // Now look for Interpreters in this directory
        fs.readdir(pathToCheck, function (err, subDirs) {
            if (err) {
                return resolve([]);
            }
            var envsInterpreters = [];
            var promises = subDirs.map(function (subDir) {
                subDir = path.join(pathToCheck, subDir);
                var interpreterFolder = utils.IS_WINDOWS ? path.join(subDir, 'scripts') : path.join(subDir, 'bin');
                return lookForInterpretersInPath(interpreterFolder);
            });
            Promise.all(promises).then(function (pathsWithInterpreters) {
                pathsWithInterpreters.forEach(function (interpreters) {
                    interpreters.map(function (interpter) {
                        envsInterpreters.push({
                            label: path.basename(interpter), path: interpter, type: ''
                        });
                    });
                });
                resolve(envsInterpreters);
            });
        });
    });
}
function suggestionsFromKnownPaths() {
    return new Promise(function (resolve) {
        var validPaths = getSearchPaths().map(function (p) {
            return utils.validatePath(p).then(function (validatedPath) {
                if (validatedPath.length === 0) {
                    return Promise.resolve([]);
                }
                return lookForInterpretersInPath(validatedPath);
            });
        });
        Promise.all(validPaths).then(function (listOfInterpreters) {
            var suggestions = [];
            listOfInterpreters.forEach(function (interpreters) {
                interpreters.filter(function (interpter) { return interpter.length > 0; }).map(function (interpter) {
                    suggestions.push({
                        label: path.basename(interpter), path: interpter, type: ''
                    });
                });
            });
            resolve(suggestions);
        });
    });
}
function suggestionsFromConda() {
    return new Promise(function (resolve, reject) {
        // interrogate conda (if it's on the path) to find all environments
        child_process.execFile('conda', ['info', '--json'], function (error, stdout, stderr) {
            try {
                var info = JSON.parse(stdout);
                // envs reported as e.g.: /Users/bob/miniconda3/envs/someEnv
                var envs = info['envs'];
                // The root of the conda environment is itself a Python interpreter
                envs.push(info["default_prefix"]);
                var suggestions = envs.map(function (env) { return ({
                    label: path.basename(env),
                    path: path.join.apply(path, [env].concat(CONDA_RELATIVE_PY_PATH)),
                    type: 'conda',
                }); });
                resolve(suggestions);
            }
            catch (e) {
                // Failed because either:
                //   1. conda is not installed
                //   2. `conda info --json` has changed signature
                //   3. output of `conda info --json` has changed in structure
                // In all cases, we can't offer conda pythonPath suggestions.
                return resolve([]);
            }
        });
    });
}
function suggestionToQuickPickItem(suggestion) {
    var detail = suggestion.path;
    if (suggestion.path.startsWith(vscode.workspace.rootPath)) {
        detail = path.relative(vscode.workspace.rootPath, suggestion.path);
    }
    detail = utils.IS_WINDOWS ? detail.replace(/\\/g, "/") : detail;
    return {
        label: suggestion.label,
        description: suggestion.type,
        detail: detail,
        path: utils.IS_WINDOWS ? suggestion.path.replace(/\\/g, "/") : suggestion.path
    };
}
function suggestPythonPaths() {
    // For now we only interrogate conda for suggestions.
    var condaSuggestions = suggestionsFromConda();
    var knownPathSuggestions = suggestionsFromKnownPaths();
    var virtualEnvSuggestions = lookForInterpretersInVirtualEnvs(vscode.workspace.rootPath);
    // Here we could also look for virtualenvs/default install locations...
    return Promise.all([condaSuggestions, knownPathSuggestions, virtualEnvSuggestions]).then(function (suggestions) {
        var quickPicks = [];
        suggestions.forEach(function (list) {
            quickPicks.push.apply(quickPicks, list.map(suggestionToQuickPickItem));
        });
        return quickPicks;
    });
}
function setPythonPath(pythonPath, created) {
    if (created === void 0) { created = false; }
    var settingsFile = workspaceSettingsPath();
    utils.validatePath(settingsFile)
        .then(function (validatedPath) {
        if (validatedPath.length === 0 && created === true) {
            // Something went wrong
            return Promise.reject('Unable to create/open the Workspace Settings file');
        }
        if (validatedPath.length === 0 && !created) {
            return new Promise(function (resolve, reject) {
                vscode.commands.executeCommand('workbench.action.openWorkspaceSettings').then(function () { return resolve(null); }, reject);
            });
        }
        return vscode.workspace.openTextDocument(settingsFile);
    })
        .then(function (doc) {
        var settingsText = doc ? doc.getText() : '';
        if (settingsText.search(REPLACE_PYTHONPATH_REGEXP) === -1) {
            // Can't find the setting to replace - will just have to offer a copy button and instruct them to edit themselves.
            openWorkspaceSettings().then(function () {
                var copyMsg = "Copy to Clipboard";
                var newEntry = "\"python.pythonPath\": \"" + pythonPath + "\"";
                vscode.window.showInformationMessage("Please add an entry: " + newEntry, copyMsg)
                    .then(function (item) {
                    if (item === copyMsg) {
                        ncp.copy(newEntry);
                    }
                });
            });
        }
        else {
            // Great, the user already has a setting stated that we can relibly replace!
            var newSettingsText = settingsText.replace(REPLACE_PYTHONPATH_REGEXP, "$1\"" + pythonPath + "\"");
            replaceContentsOfFile(doc, newSettingsText).then(function () {
                vscode.window.setStatusBarMessage("Workspace Interpreter set to " + pythonPath, 1000);
                // As the file is saved the following should be the same as each other but they
                // aren't - some form of race condition?
                // const currentPythonPath = settings.PythonSettings.getInstance().pythonPath;
                // console.log(currentPythonPath);
                // console.log(pythonPath);
            });
        }
    }).catch(function (reason) {
        vscode.window.showErrorMessage('Failed to set the interpreter. ' + reason);
    });
}
function presentQuickPickOfSuggestedPythonPaths() {
    var currentPythonPath = settings.PythonSettings.getInstance().pythonPath;
    var quickPickOptions = {
        matchOnDetail: true,
        matchOnDescription: false,
        placeHolder: "current: " + currentPythonPath
    };
    suggestPythonPaths().then(function (suggestions) {
        vscode.window.showQuickPick(suggestions, quickPickOptions).then(function (value) {
            if (value !== undefined) {
                setPythonPath(value.path);
            }
        });
    });
}
function setInterpreter() {
    // For now the user has to manually edit the workspace settings to change the
    // pythonPath -> First check they have .vscode/settings.json
    var settingsPath;
    try {
        settingsPath = workspaceSettingsPath();
    }
    catch (e) {
        // We aren't even in a workspace
        vscode.window.showErrorMessage("The interpreter can only be set within a workspace (open a folder)");
        return;
    }
    presentQuickPickOfSuggestedPythonPaths();
}
//# sourceMappingURL=setInterpreterProvider.js.map