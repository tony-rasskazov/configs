'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseLinter = require('./baseLinter');
var Linter = (function (_super) {
    __extends(Linter, _super);
    function Linter(outputChannel, workspaceRootPath) {
        _super.call(this, 'pep8', outputChannel, workspaceRootPath);
    }
    Linter.prototype.isEnabled = function () {
        return this.pythonSettings.linting.pep8Enabled;
    };
    Linter.prototype.runLinter = function (filePath, txtDocumentLines) {
        var _this = this;
        if (!this.pythonSettings.linting.pep8Enabled) {
            return Promise.resolve([]);
        }
        var pep8Path = this.pythonSettings.linting.pep8Path;
        var pep8Args = Array.isArray(this.pythonSettings.linting.pep8Args) ? this.pythonSettings.linting.pep8Args : [];
        return new Promise(function (resolve) {
            _this.run(pep8Path, pep8Args.concat(['--format=%(row)d,%(col)d,%(code)s,%(code)s:%(text)s', filePath]), filePath, txtDocumentLines, _this.workspaceRootPath).then(function (messages) {
                // All messages in pep8 are treated as warnings for now
                messages.forEach(function (msg) {
                    msg.severity = baseLinter.LintMessageSeverity.Information;
                });
                resolve(messages);
            });
        });
    };
    return Linter;
}(baseLinter.BaseLinter));
exports.Linter = Linter;
//# sourceMappingURL=pep8Linter.js.map