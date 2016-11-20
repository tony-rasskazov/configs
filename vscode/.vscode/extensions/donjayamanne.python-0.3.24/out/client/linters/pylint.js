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
        _super.call(this, 'pylint', outputChannel, workspaceRootPath);
    }
    Linter.prototype.parseMessagesSeverity = function (category) {
        if (this.pythonSettings.linting.pylintCategorySeverity[category]) {
            var severityName = this.pythonSettings.linting.pylintCategorySeverity[category];
            switch (severityName) {
                case 'Error':
                    return baseLinter.LintMessageSeverity.Error;
                case 'Hint':
                    return baseLinter.LintMessageSeverity.Hint;
                case 'Information':
                    return baseLinter.LintMessageSeverity.Information;
                case 'Warning':
                    return baseLinter.LintMessageSeverity.Warning;
                default: {
                    if (baseLinter.LintMessageSeverity[severityName]) {
                        return baseLinter.LintMessageSeverity[severityName];
                    }
                }
            }
        }
        return baseLinter.LintMessageSeverity.Information;
    };
    Linter.prototype.isEnabled = function () {
        return this.pythonSettings.linting.pylintEnabled;
    };
    Linter.prototype.runLinter = function (filePath, txtDocumentLines) {
        var _this = this;
        if (!this.pythonSettings.linting.pylintEnabled) {
            return Promise.resolve([]);
        }
        var pylintPath = this.pythonSettings.linting.pylintPath;
        var pylintArgs = Array.isArray(this.pythonSettings.linting.pylintArgs) ? this.pythonSettings.linting.pylintArgs : [];
        return new Promise(function (resolve, reject) {
            _this.run(pylintPath, pylintArgs.concat(['--msg-template=\'{line},{column},{category},{msg_id}:{msg}\'', '--reports=n', '--output-format=text', filePath]), filePath, txtDocumentLines, _this.workspaceRootPath).then(function (messages) {
                messages.forEach(function (msg) {
                    msg.severity = _this.parseMessagesSeverity(msg.type);
                });
                resolve(messages);
            }, reject);
        });
    };
    return Linter;
}(baseLinter.BaseLinter));
exports.Linter = Linter;
//# sourceMappingURL=pylint.js.map