/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
var vscode_languageserver_1 = require('vscode-languageserver');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
// Create a connection for the server. The connection uses
// stdin / stdout for message passing
var connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
// Create a simple text document manager. The text document manager
// supports full document sync only
var documents = new vscode_languageserver_1.TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// After the server has started the client sends an initilize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilites.
var workspaceRoot;
var flake8Binary;
connection.onInitialize(function (params) {
    workspaceRoot = params.rootPath;
    flake8Binary = findFlake8();
    return {
        capabilities: {
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind,
            // Tell the client that the server support code complete
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});
function findFlake8() {
    for (var _i = 0, _a = process.env.PATH.split(path.delimiter); _i < _a.length; _i++) {
        var flake8Path = _a[_i];
        var foundPath = [flake8Path, 'flake8'].join(path.sep);
        console.log('Checking', foundPath);
        var stat = void 0;
        try {
            stat = fs.statSync(foundPath);
        }
        catch (error) {
            continue;
        }
        console.log('File exists', foundPath, stat.isFile());
        if (stat.isFile() && stat.mode & fs.X_OK) {
            console.log('Spawning', foundPath);
            var dataBuffer = child_process.execFileSync(foundPath, ['--version']);
            var data = dataBuffer.toString();
            var match = data.match(/^\d+.\d+.\d+/);
            if (match) {
                console.log("Found flake8 on " + foundPath + " version " + match[0]);
                return foundPath;
            }
        }
    }
}
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(function (change) {
    3;
    validateTextDocument(change.document.uri);
});
// hold the maxNumberOfProblems setting
var maxNumberOfProblems;
// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration(function (change) {
    var settings = change.settings;
    maxNumberOfProblems = settings.languageServerExample.maxNumberOfProblems || 100;
    // Revalidate any open text documents
    documents.all().forEach(function (textDocument) { return validateTextDocument(textDocument.uri); });
});
function validateTextDocument(uri) {
    var diagnostics = [];
    var regex = /:(\d+):(\d+): (\w+) (.*)/gm;
    var problems = 0;
    var pythonFile = uri.replace('file://', '');
    console.log("Testing file " + pythonFile + " with " + flake8Binary);
    child_process.execFile(flake8Binary, [pythonFile], { cwd: workspaceRoot }, function (error, stdoutBuffer, stderr) {
        var stdout = stdoutBuffer.toString();
        if (regex.test(stdout)) {
            var match = regex.exec(stdout);
            while (match && problems < maxNumberOfProblems) {
                var line = parseInt(match[1]);
                var column = parseInt(match[2]);
                problems++;
                diagnostics.push({
                    range: {
                        start: { line: line - 1, character: column },
                        end: { line: line - 1, character: column + 1 },
                    },
                    code: match[3],
                    message: match[3] + ": " + match[4]
                });
                match = regex.exec(stdout);
            }
            // Send the computed diagnostics to VSCode.
            connection.sendDiagnostics({ uri: uri, diagnostics: diagnostics });
            return;
        }
    });
}
/*
connection.onDidChangeWatchedFiles((change) => {
    // Monitored files have change in VSCode
    connection.console.log('We recevied an file change event');
});

connection.onDidOpenTextDocument((params) => {
    // A text document got opened in VSCode.
    // params.uri uniquely identifies the document. For documents store on disk this is a file URI.
    // params.text the initial full content of the document.
    connection.console.log(`${params.uri} opened.`);
});

connection.onDidChangeTextDocument((params) => {
    // The content of a text document did change in VSCode.
    // params.uri uniquely identifies the document.
    // params.contentChanges describe the content changes to the document.
    connection.console.log(`${params.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});

connection.onDidCloseTextDocument((params) => {
    // A text document got closed in VSCode.
    // params.uri uniquely identifies the document.
    connection.console.log(`${params.uri} closed.`);
});
*/
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map