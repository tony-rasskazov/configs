"use strict";
var vscode_1 = require('vscode');
var Command = (function () {
    function Command(config) {
        var alignment = vscode_1.StatusBarAlignment.Left;
        if (config.alignment === 'right') {
            alignment = vscode_1.StatusBarAlignment.Right;
        }
        this.button = vscode_1.window.createStatusBarItem(alignment, config.priority);
        this.button.command = config.command;
        this.button.text = config.text;
        this.button.tooltip = config.tooltip;
        this.button.color = config.color;
        if (config.include) {
            this.include = new RegExp(config.include);
        }
        if (config.exclude) {
            this.exclude = new RegExp(config.exclude);
        }
    }
    Command.prototype.refresh = function (document) {
        var visible = true;
        if (this.include) {
            console.log(this.include.source);
            visible = document && this.include.test(document);
        }
        if (this.exclude) {
            visible = document && !this.exclude.test(document);
        }
        if (visible) {
            this.button.show();
        }
        else {
            this.button.hide();
        }
    };
    Command.prototype.dispose = function () {
        if (this.button !== null) {
            this.button.dispose();
            this.button = null;
        }
    };
    return Command;
}());
exports.Command = Command;
//# sourceMappingURL=command.js.map