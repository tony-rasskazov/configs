"use strict";
var vscode = require('vscode');
var variable = require('./variable');
var deprecatedMap = new Map(new Array(['diagnostic.delay', 'diagnosticDelay'], ['diagnostic.enable', 'enableDiagnostic'], ['completion.enable', 'enableCompletion']));
function getConf(name) {
    var conf = vscode.workspace.getConfiguration('clang');
    if (deprecatedMap.has(name)) {
        var depName = deprecatedMap.get(name);
        var value_1 = conf.get(depName);
        if (value_1 != null) {
            vscode.window.showWarningMessage("clang." + depName + " is deprecated. Please use " + name + " instead.");
            return value_1;
        }
    }
    var value = conf.get(name);
    if (value == null) {
        vscode.window.showErrorMessage("Error: invalid configuration " + name);
    }
    return value;
}
exports.getConf = getConf;
function command(language) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    var cmd = variable.resolve(getConf('executable'));
    var args = [];
    if (language === 'cpp') {
        args.push('-x', 'c++');
        args.push.apply(args, getConf('cxxflags').map(variable.resolve));
    }
    else if (language === 'c') {
        args.push('-x', 'c');
        args.push.apply(args, getConf('cflags').map(variable.resolve));
    }
    else if (language === 'objective-c') {
        args.push('-x', 'objective-c');
        args.push.apply(args, getConf('objcflags').map(variable.resolve));
    }
    args.push.apply(args, options);
    return [cmd, args];
}
exports.command = command;
function complete(language, line, char) {
    var args = [];
    args.push('-fsyntax-only');
    args.push('-fparse-all-comments');
    if (getConf('completion.completeMacros')) {
        args.push('-Xclang', '-code-completion-macros');
    }
    args.push('-Xclang', '-code-completion-brief-comments');
    args.push('-Xclang', "-code-completion-at=<stdin>:" + line + ":" + char);
    args.push('-');
    return command.apply(void 0, [language].concat(args));
}
exports.complete = complete;
function check(language) {
    return command(language, '-fsyntax-only', '-fno-caret-diagnostics', '-fdiagnostics-print-source-range-info', '-fno-color-diagnostics', '-');
}
exports.check = check;
function version(language) {
    return command(language, "--version");
}
exports.version = version;
//# sourceMappingURL=clang.js.map