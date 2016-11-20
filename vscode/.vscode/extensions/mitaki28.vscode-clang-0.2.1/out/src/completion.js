"use strict";
var vscode = require('vscode');
var path = require('path');
var clang = require('./clang');
var execution = require('./execution');
exports.completionRe = /^COMPLETION: (.*?)(?: : (.*))?$/;
exports.descriptionRe = /^(.*?)(?: : (.*))?$/;
exports.returnTypeRe = /\[#([^#]+)#\]/ig;
exports.argumentTypeRe = /\<#([^#]+)#\>/ig;
exports.optionalArgumentLeftRe = /\{#(,? ?.+?)(?=#\}|\{#)/ig;
exports.optionalArgumentRightRe = /#\}/ig;
var DELIMITERS = '~`!@#$%^&*()-+={}[]|\\\'";:/?<>,. \t\n';
function isDelimiter(c) {
    return DELIMITERS.indexOf(c) != -1;
}
function findPreviousDelimiter(document, position) {
    var line = position.line;
    var char = position.character;
    var s = document.getText(new vscode.Range(line, 0, line, char));
    while (char > 0 && !isDelimiter(s[char - 1]))
        char--;
    return new vscode.Position(line, char);
}
var ClangCompletionItemProvider = (function () {
    function ClangCompletionItemProvider() {
    }
    ClangCompletionItemProvider.prototype.provideCompletionItems = function (document, position, token) {
        var _this = this;
        return this.fetchCompletionItems(document, position, token)
            .then(function (data) {
            return _this.parseCompletionItems(data);
        }, function (e) {
            if (e.errorCode === execution.ErrorCode.BufferLimitExceed) {
                vscode.window.showWarningMessage('Completion was interpreted due to rack of buffer size. ' +
                    'The buffer size can be increased using `clang.completion.maxBuffer`. ');
            }
            return [];
        });
    };
    ClangCompletionItemProvider.prototype.fetchCompletionItems = function (document, position, token) {
        // Currently, Clang does NOT complete token partially 
        // So we find a previous delimiter and start complete from there.
        var delPos = findPreviousDelimiter(document, position);
        var _a = clang.complete(document.languageId, delPos.line + 1, delPos.character + 1), cmd = _a[0], args = _a[1];
        return execution.processString(cmd, args, {
            cwd: path.dirname(document.uri.fsPath),
            maxBuffer: clang.getConf('completion.maxBuffer')
        }, token, document.getText()).then(function (result) { return result.stdout.toString(); });
    };
    ClangCompletionItemProvider.prototype.parseCompletionItem = function (line) {
        var matched = line.match(exports.completionRe);
        if (matched == null)
            return;
        var _line = matched[0], symbol = matched[1], description = matched[2];
        var item = new vscode.CompletionItem(symbol);
        if (description == null) {
            item.detail = symbol;
            item.kind = vscode.CompletionItemKind.Class;
            return item;
        }
        var _a = description.match(exports.descriptionRe), _description = _a[0], signature = _a[1], comment = _a[2];
        if (comment != null) {
            item.documentation = comment;
        }
        var hasValue = false;
        signature = signature.replace(exports.returnTypeRe, function (match, arg) {
            hasValue = true;
            return arg + ' ';
        });
        signature = signature.replace(exports.argumentTypeRe, function (match, arg) {
            return arg;
        });
        signature = signature.replace(exports.optionalArgumentLeftRe, function (match, arg) {
            return arg + '=?';
        });
        signature = signature.replace(exports.optionalArgumentRightRe, function (match, arg) {
            return '';
        });
        item.detail = signature;
        if (signature.indexOf('(') != -1) {
            item.kind = vscode.CompletionItemKind.Function;
        }
        else if (hasValue) {
            item.kind = vscode.CompletionItemKind.Variable;
        }
        else {
            item.kind = vscode.CompletionItemKind.Class;
        }
        return item;
    };
    ClangCompletionItemProvider.prototype.parseCompletionItems = function (data) {
        var _this = this;
        var result = [];
        data.split(/\r\n|\r|\n/).forEach(function (line) {
            var item = _this.parseCompletionItem(line);
            if (item instanceof vscode.CompletionItem) {
                result.push(item);
            }
        });
        return result;
    };
    return ClangCompletionItemProvider;
}());
exports.ClangCompletionItemProvider = ClangCompletionItemProvider;
//# sourceMappingURL=completion.js.map