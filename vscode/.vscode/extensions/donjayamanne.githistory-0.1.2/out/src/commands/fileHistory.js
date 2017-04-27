"use strict";
var vscode = require("vscode");
var historyUtil = require('../helpers/historyUtils');
var path = require('path');
var tmp = require('tmp');
//TODO:Clean up this mess
var outChannel;
var tmpFileCleanup = new Map();
function activate(outputChannel) {
    outChannel = outputChannel;
}
exports.activate = activate;
vscode.workspace.onDidCloseTextDocument(function (textDocument) {
    if (!textDocument || tmpFileCleanup.has(textDocument.fileName)) {
        return;
    }
    try {
        tmpFileCleanup.get(textDocument.fileName)();
    }
    catch (ex) {
    }
    tmpFileCleanup.delete(textDocument.fileName);
});
vscode.commands.registerCommand('git.viewFileCommitDetails', function (sha1, relativeFilePath, isoStrictDateTime) {
    var fileName = path.join(vscode.workspace.rootPath, relativeFilePath);
    var gitRepositoryPath = vscode.workspace.rootPath;
    historyUtil.getFileHistoryBefore(gitRepositoryPath, relativeFilePath, sha1, isoStrictDateTime).then(function (data) {
        var historyItem = data.find(function (data) { return data.sha1 === sha1; });
        var previousItems = data.filter(function (data) { return data.sha1 !== sha1; });
        historyItem.previousSha1 = previousItems.length === 0 ? '' : previousItems[0].sha1;
        var item = {
            label: '',
            description: '',
            data: historyItem,
            isLast: historyItem.previousSha1.length === 0
        };
        onItemSelected(item, fileName, relativeFilePath);
    }, function (ex) {
        vscode.window.showErrorMessage("There was an error in retrieving the file history. (" + (ex.message ? ex.message : ex + '') + ")");
    });
});
function run(fileName) {
    historyUtil.getGitRepositoryPath(fileName).then(function (gitRepositoryPath) {
        var relativeFilePath = path.relative(gitRepositoryPath, fileName);
        historyUtil.getFileHistory(gitRepositoryPath, relativeFilePath).then(displayHistory, genericErrorHandler);
        function displayHistory(log) {
            if (log.length === 0) {
                vscode.window.showInformationMessage("There are no history items for this item '" + relativeFilePath + "'.");
                return;
            }
            var itemPickList = log.map(function (item) {
                var dateTime = new Date(Date.parse(item.author_date)).toLocaleString();
                var label = vscode.workspace.getConfiguration('gitHistory').get('displayLabel'), description = vscode.workspace.getConfiguration('gitHistory').get('displayDescription');
                label = label.replace('${date}', dateTime).replace('${name}', item.author_name)
                    .replace('${email}', item.author_email).replace('${message}', item.message);
                description = description.replace('${date}', dateTime).replace('${name}', item.author_name)
                    .replace('${email}', item.author_email).replace('${message}', item.message);
                return { label: label, description: description, data: item };
            });
            itemPickList.forEach(function (item, index) {
                if (index === (itemPickList.length - 1)) {
                    item.isLast = true;
                }
                else {
                    item.data.previousSha1 = log[index + 1].sha1;
                }
            });
            vscode.window.showQuickPick(itemPickList, { placeHolder: "", matchOnDescription: true }).then(function (item) {
                if (!item) {
                    return;
                }
                onItemSelected(item, fileName, relativeFilePath);
            });
        }
    }).then(function () { }, function (error) { return genericErrorHandler(error); });
    ;
}
exports.run = run;
function onItemSelected(item, fileName, relativeFilePath) {
    var itemPickList = [];
    itemPickList.push({ label: "View Change Log", description: "Author, committer and message" });
    itemPickList.push({ label: "View File Contents", description: "" });
    itemPickList.push({ label: "Compare against workspace file", description: "" });
    if (!item.isLast) {
        itemPickList.push({ label: "Compare against previous version", description: "" });
    }
    vscode.window.showQuickPick(itemPickList, { placeHolder: item.label, matchOnDescription: true }).then(function (cmd) {
        if (!cmd) {
            return;
        }
        var data = item.data;
        if (cmd.label === itemPickList[0].label) {
            viewLog(data);
            return;
        }
        if (cmd.label === itemPickList[1].label) {
            viewFile(data, relativeFilePath);
            return;
        }
        if (cmd.label === itemPickList[2].label) {
            launchFileCompareWithLocal(data, fileName, relativeFilePath);
            return;
        }
        if (itemPickList.length > 3 && cmd.label === itemPickList[3].label) {
            launchFileCompareWithPrevious(data, relativeFilePath);
            return;
        }
    });
}
function viewFile(details, relativeFilePath) {
    displayFile(details.sha1, relativeFilePath).then(function () { }, genericErrorHandler);
}
function viewLog(details) {
    var authorDate = new Date(Date.parse(details.author_date)).toLocaleString();
    var committerDate = new Date(Date.parse(details.commit_date)).toLocaleString();
    var log = ("sha1 : " + details.sha1 + "\n") +
        ("Author : " + details.author_name + " <" + details.author_email + ">\n") +
        ("Author Date : " + authorDate + "\n") +
        ("Committer Name : " + details.committer_name + " <" + details.committer_email + ">\n") +
        ("Commit Date : " + committerDate + "\n") +
        ("Message : " + details.message);
    outChannel.append(log);
    outChannel.show();
}
function launchFileCompareWithLocal(details, fileName, relativeFilePath) {
    compareFileWithLocalCopy(details.sha1, fileName, relativeFilePath).then(function () { }, genericErrorHandler);
}
function launchFileCompareWithPrevious(details, relativeFilePath) {
    Promise.all([getFile(details.previousSha1, relativeFilePath), getFile(details.sha1, relativeFilePath)]).then(function (files) {
        return vscode.commands.executeCommand("vscode.diff", vscode.Uri.file(files[0]), vscode.Uri.file(files[1]));
    }).catch(genericErrorHandler);
}
function genericErrorHandler(error) {
    if (error.code && error.syscall && error.code === 'ENOENT' && error.syscall === 'spawn git') {
        vscode.window.showErrorMessage("Cannot find the git installation");
    }
    else {
        outChannel.appendLine(error);
        outChannel.show();
        vscode.window.showErrorMessage("There was an error, please view details in output log");
    }
}
function getFile(commitSha1, localFilePath) {
    var rootDir = vscode.workspace.rootPath;
    return new Promise(function (resolve, reject) {
        var ext = path.extname(localFilePath);
        tmp.file({ postfix: ext }, function _tempFileCreated(err, tmpFilePath, fd, cleanupCallback) {
            if (err) {
                reject(err);
                return;
            }
            historyUtil.writeFile(rootDir, commitSha1, localFilePath, tmpFilePath).then(function () {
                tmpFileCleanup.set(tmpFilePath, cleanupCallback);
                resolve(tmpFilePath);
            }, reject);
        });
    });
}
function displayFile(commitSha1, localFilePath) {
    return new Promise(function (resolve, reject) {
        getFile(commitSha1, localFilePath).then(function (tmpFilePath) {
            vscode.workspace.openTextDocument(tmpFilePath).then(function (d) {
                vscode.window.showTextDocument(d);
                resolve(tmpFilePath);
            });
        }, reject);
    });
}
function compareFileWithLocalCopy(commitSha1, localFilePath, relativeFilePath) {
    return getFile(commitSha1, relativeFilePath).then(function (tmpFilePath) {
        return vscode.commands.executeCommand("vscode.diff", vscode.Uri.file(tmpFilePath), vscode.Uri.file(localFilePath));
    });
}
//# sourceMappingURL=fileHistory.js.map