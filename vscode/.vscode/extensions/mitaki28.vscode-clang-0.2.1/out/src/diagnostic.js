"use strict";
var vscode = require('vscode');
var path = require('path');
var clang = require('./clang');
var execution = require('./execution');
exports.diagnosticRe = /^\<stdin\>:(\d+):(\d+):(?:((?:\{.+?\})+):)? ((?:fatal )?error|warning): (.*?)$/;
function str2diagserv(str) {
    switch (str) {
        case 'fatal error': return vscode.DiagnosticSeverity.Error;
        case 'error': return vscode.DiagnosticSeverity.Error;
        case 'warning': return vscode.DiagnosticSeverity.Warning;
        default: return vscode.DiagnosticSeverity.Information;
    }
}
function delay(token) {
    return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
            resolve();
        }, clang.getConf('diagnostic.delay'));
        token.onCancellationRequested(function () {
            clearTimeout(timer);
            reject();
        });
    });
}
function registerDiagnosticProvider(selector, provider, name) {
    var collection = vscode.languages.createDiagnosticCollection(name);
    var cancellers = new Map();
    var subsctiptions = [];
    vscode.workspace.onDidChangeTextDocument(function (change) {
        if (!vscode.languages.match(selector, change.document))
            return;
        var uri = change.document.uri;
        var uriStr = uri.toString();
        if (cancellers.has(uriStr)) {
            cancellers.get(uriStr).dispose();
        }
        cancellers.set(uriStr, new vscode.CancellationTokenSource);
        delay(cancellers.get(uriStr).token).then(function () {
            cancellers.get(uriStr).dispose();
            cancellers.set(uriStr, new vscode.CancellationTokenSource);
            return provider.provideDiagnostic(change.document, cancellers.get(uriStr).token);
        }).then(function (diagnostics) {
            cancellers.get(uriStr).dispose();
            cancellers.delete(uriStr);
            collection.set(uri, diagnostics);
        }, function (_) { });
    }, null, subsctiptions);
    return {
        dispose: function () {
            collection.dispose();
            for (var _i = 0, _a = Array.from(cancellers.values()); _i < _a.length; _i++) {
                var canceller = _a[_i];
                canceller.dispose();
            }
            (_b = vscode.Disposable).from.apply(_b, subsctiptions).dispose();
            var _b;
        }
    };
}
exports.registerDiagnosticProvider = registerDiagnosticProvider;
function parseRanges(s) {
    var p = 0;
    var parseDigit = function () {
        var ans = 0;
        while (s[p].match(/[0-9]/)) {
            ans = 10 * ans + parseInt(s[p++], 10);
        }
        return ans;
    };
    var result = [];
    while (s[p] == '{') {
        s[p++]; // s[p] == '{'
        var ans = 0;
        var sline = parseDigit();
        s[p++]; // s[p] == ':'
        var schar = parseDigit();
        s[p++]; // s[p] == '-'
        var eline = parseDigit();
        s[p++]; // s[p] == ':'
        var echar = parseDigit();
        s[p++]; // s[p] == '}'
        result.push(new vscode.Range(sline, schar, eline, echar));
    }
    return result;
}
var ClangDiagnosticProvider = (function () {
    function ClangDiagnosticProvider() {
    }
    ClangDiagnosticProvider.prototype.provideDiagnostic = function (document, token) {
        var _this = this;
        return this.fetchDiagnostic(document, token)
            .then(function (data) {
            return _this.parseDiagnostic(data);
        }, function (e) {
            if (e.errorCode === execution.ErrorCode.BufferLimitExceed) {
                vscode.window.showWarningMessage('Diagnostic was interpreted due to rack of buffer size. ' +
                    'The buffer size can be increased using `clang.diagnostic.maxBuffer`. ');
            }
            return '';
        });
    };
    ClangDiagnosticProvider.prototype.fetchDiagnostic = function (document, token) {
        var _a = clang.check(document.languageId), cmd = _a[0], args = _a[1];
        return execution.processString(cmd, args, {
            cwd: path.dirname(document.uri.fsPath),
            maxBuffer: clang.getConf('diagnostic.maxBuffer')
        }, token, document.getText()).then(function (result) { return result.stderr.toString(); });
    };
    ClangDiagnosticProvider.prototype.parseDiagnostic = function (data) {
        var result = [];
        data.split(/\r\n|\r|\n/).forEach(function (line) {
            var matched = line.match(exports.diagnosticRe);
            if (!matched)
                return;
            var range;
            if (matched[3] == null) {
                var line_1 = parseInt(matched[1], 10);
                var char = parseInt(matched[2], 10);
                range = new vscode.Range(line_1 - 1, char - 1, line_1 - 1, char - 1);
            }
            else {
                var ranges = parseRanges(matched[3]);
                range = new vscode.Range(ranges[0].start.line - 1, ranges[0].start.character - 1, ranges[ranges.length - 1].end.line - 1, ranges[ranges.length - 1].end.character - 1);
            }
            var msg = matched[5];
            var type = str2diagserv(matched[4]);
            result.push(new vscode.Diagnostic(range, msg, type));
        });
        return result;
    };
    return ClangDiagnosticProvider;
}());
exports.ClangDiagnosticProvider = ClangDiagnosticProvider;
//# sourceMappingURL=diagnostic.js.map