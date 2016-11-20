"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var path = require('path');
var fs = require('fs');
var jsbeautify = require('js-beautify');
var mkdirp = require('mkdirp');
function format(document, range) {
    if (range === null) {
        var start = new vscode.Position(0, 0);
        var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        range = new vscode.Range(start, end);
    }
    var result = [];
    var content = document.getText(range);
    var formatted = beatify(content, document.languageId);
    if (formatted) {
        result.push(new vscode.TextEdit(range, formatted));
    }
    return result;
}
exports.format = format;
;
function getRootPath() {
    return vscode.workspace.rootPath || '.';
}
function beatify(documentContent, languageId) {
    var global = path.join(__dirname, 'formatter.json');
    var local = path.join(getRootPath(), '.vscode', 'formatter.json');
    var beatiFunc = null;
    switch (languageId) {
        case 'scss':
            languageId = 'css';
        case 'css':
            beatiFunc = jsbeautify.css;
            break;
        case 'json':
            languageId = 'javascript';
        case 'javascript':
            beatiFunc = jsbeautify.js;
            break;
        case 'html':
            beatiFunc = jsbeautify.html;
            break;
        default:
            showMesage('Sorry, this language is not supported. Only support Javascript, CSS and HTML.');
            break;
    }
    if (!beatiFunc)
        return;
    var beutifyOptions;
    try {
        beutifyOptions = require(local)[languageId];
    }
    catch (error) {
        try {
            beutifyOptions = require(global)[languageId];
        }
        catch (error) {
            beutifyOptions = {};
        }
    }
    return beatiFunc(documentContent, beutifyOptions);
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var docType = ['css', 'scss', 'javascript', 'html', 'json'];
    for (var i = 0, l = docType.length; i < l; i++) {
        registerDocType(docType[i]);
    }
    var formatter = new Formatter();
    context.subscriptions.push(vscode.commands.registerCommand('Lonefy.formatting', function () {
        formatter.beautify();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('Lonefy.formatterConfig', function () {
        formatter.openConfig(path.join(getRootPath(), '.vscode', 'formatter.json'), function () {
            showMesage('[Local]  After editing the file, remember to Restart VScode');
        }, function () {
            var fileName = path.join(__dirname, 'formatter.json');
            formatter.openConfig(fileName, function () {
                showMesage('[Golbal]  After editing the file, remember to Restart VScode');
            }, function () {
                showMesage('Not found file: ' + fileName);
            });
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('Lonefy.formatterCreateLocalConfig', function () {
        formatter.generateLocalConfig();
    }));
    vscode.workspace.onDidSaveTextDocument(formatter.onSave);
    function registerDocType(type) {
        context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(type, {
            provideDocumentFormattingEdits: function (document, options, token) {
                return formatter.registerBeautify(null);
            }
        }));
        context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
            provideDocumentRangeFormattingEdits: function (document, range, options, token) {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                return formatter.registerBeautify(new vscode.Range(start, end));
            }
        }));
    }
}
exports.activate = activate;
var Formatter = (function () {
    function Formatter() {
    }
    Formatter.prototype.beautify = function () {
        // Create as needed
        var window = vscode.window;
        var range;
        // Get the current text editor
        var activeEditor = window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        var document = activeEditor.document;
        if (range === null) {
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }
        var result = [];
        var content = document.getText(range);
        var formatted = beatify(content, document.languageId);
        if (formatted) {
            return activeEditor.edit(function (editor) {
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                range = new vscode.Range(start, end);
                return editor.replace(range, formatted);
            });
        }
    };
    Formatter.prototype.registerBeautify = function (range) {
        // Create as needed
        var window = vscode.window;
        // Get the current text editor
        var editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
        var document = editor.document;
        return format(document, range);
    };
    Formatter.prototype.generateLocalConfig = function () {
        var local = path.join(getRootPath(), '.vscode', 'formatter.json');
        var content = fs.readFileSync(path.join(__dirname, 'formatter.json')).toString('utf8');
        mkdirp.sync(path.dirname(local));
        fs.stat(local, function (err, stat) {
            if (err == null) {
                showMesage('Local config file existed: ' + local);
            }
            else if (err.code == 'ENOENT') {
                fs.writeFile(local, content, function (e) {
                    showMesage('Generate local config file: ' + local);
                });
            }
            else {
                showMesage('Some other error: ' + err.code);
            }
        });
    };
    Formatter.prototype.openConfig = function (filename, succ, fail) {
        vscode.workspace.openTextDocument(filename).then(function (textDocument) {
            if (!textDocument) {
                showMesage('Can not open file!');
                return;
            }
            vscode.window.showTextDocument(textDocument).then(function (editor) {
                if (!editor) {
                    showMesage('Can not show document!');
                    return;
                }
                !!succ && succ();
            }, function () {
                showMesage('Can not Show file: ' + filename);
                return;
            });
        }, function () {
            !!fail && fail();
            return;
        });
    };
    Formatter.prototype.onSave = function (document) {
        var docType = ['css', 'scss', 'javascript', 'html', 'json'];
        var global = path.join(__dirname, 'formatter.json');
        var local = path.join(getRootPath(), '.vscode', 'formatter.json');
        var onSave;
        try {
            onSave = require(local).onSave;
        }
        catch (error) {
            try {
                onSave = require(global).onSave;
            }
            catch (error) {
                onSave = true;
            }
        }
        if (!onSave) {
            return;
        }
        if (docType.indexOf(document.languageId) == -1) {
            return;
        }
        if (document.beautifyLock) {
            delete document.beautifyLock;
            return;
        }
        // Get the current text editor
        var activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        var start = new vscode.Position(0, 0);
        var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        var range = new vscode.Range(start, end);
        var result = [];
        var content = document.getText(range);
        var formatted = beatify(content, document.languageId);
        if (formatted) {
            return activeEditor.edit(function (editor) {
                console.log(editor.replace);
                var start = new vscode.Position(0, 0);
                var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                range = new vscode.Range(start, end);
                document.save();
                document.beautifyLock = true;
                return editor.replace(range, formatted);
            });
        }
    };
    return Formatter;
}());
function showMesage(msg) {
    vscode.window.showInformationMessage(msg);
}
//# sourceMappingURL=extension.js.map