"use strict";
var vscode = require('vscode');
var child_process = require('child_process');
var clang = require('./clang');
var ConfigurationTester = (function () {
    function ConfigurationTester() {
        this.processes = new Map();
    }
    ConfigurationTester.prototype.test = function (language) {
        var _this = this;
        var _a = clang.version(language), cmd = _a[0], args = _a[1];
        var proc = child_process.execFile(cmd, args, function (error, stdout, stderr) {
            if (error) {
                if (error.code == 'ENOENT') {
                    vscode.window.showErrorMessage('Please install [clang](http://clang.llvm.org/) or check configuration `clang.executable`');
                }
                else {
                    vscode.window.showErrorMessage('Please check your configurations');
                }
                vscode.window.showErrorMessage(stderr.toString());
            }
            _this.processes.delete(proc.pid);
        });
        this.processes.set(proc.pid, proc);
    };
    ConfigurationTester.prototype.dispose = function () {
        for (var _i = 0, _a = Array.from(this.processes.values()); _i < _a.length; _i++) {
            var proc = _a[_i];
            proc.kill();
        }
    };
    return ConfigurationTester;
}());
exports.ConfigurationTester = ConfigurationTester;
var ConfigurationViewer = (function () {
    function ConfigurationViewer() {
        this.chan = vscode.window.createOutputChannel('Clang Configuration');
    }
    ConfigurationViewer.prototype.show = function (document) {
        var _a = clang.command(document.languageId), command = _a[0], args = _a[1];
        this.chan.show();
        this.chan.clear();
        var buf = [];
        buf.push("Executable: " + command);
        args.forEach(function (arg, i) {
            buf.push("Option " + i + ": " + arg);
        });
        this.chan.appendLine(buf.join('\n'));
    };
    ConfigurationViewer.prototype.dispose = function () {
        this.chan.dispose();
    };
    return ConfigurationViewer;
}());
exports.ConfigurationViewer = ConfigurationViewer;
//# sourceMappingURL=configuration.js.map