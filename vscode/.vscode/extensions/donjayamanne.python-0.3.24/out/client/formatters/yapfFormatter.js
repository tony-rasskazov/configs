'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseFormatter_1 = require('./baseFormatter');
var YapfFormatter = (function (_super) {
    __extends(YapfFormatter, _super);
    function YapfFormatter(outputChannel, pythonSettings, workspaceRootPath) {
        _super.call(this, 'yapf', outputChannel, pythonSettings, workspaceRootPath);
        this.outputChannel = outputChannel;
        this.pythonSettings = pythonSettings;
        this.workspaceRootPath = workspaceRootPath;
    }
    YapfFormatter.prototype.formatDocument = function (document, options, token, range) {
        var yapfPath = this.pythonSettings.formatting.yapfPath;
        var yapfArgs = Array.isArray(this.pythonSettings.formatting.yapfArgs) ? this.pythonSettings.formatting.yapfArgs : [];
        yapfArgs = yapfArgs.concat(['--diff']);
        if (range && !range.isEmpty) {
            yapfArgs = yapfArgs.concat(['--lines', ((range.start.line + 1) + "-" + (range.end.line + 1))]);
        }
        return _super.prototype.provideDocumentFormattingEdits.call(this, document, options, token, yapfPath, yapfArgs);
    };
    return YapfFormatter;
}(baseFormatter_1.BaseFormatter));
exports.YapfFormatter = YapfFormatter;
//# sourceMappingURL=yapfFormatter.js.map