'use strict';
var vscode_1 = require('vscode');
var command_1 = require('./command');
/**
 * manage initialization of Commands
 */
var CommandsController = (function () {
    function CommandsController() {
        this.initCommands();
    }
    /**
     * refresh config
     */
    CommandsController.prototype.initCommands = function () {
        var _this = this;
        var config = vscode_1.workspace.getConfiguration('statusbar_command');
        this.disposeCommands();
        var configCommands = config.get('commands');
        this.commands = new Array();
        var document = null;
        if (vscode_1.window.activeTextEditor) {
            document = vscode_1.window.activeTextEditor.document.uri.toString();
        }
        configCommands.forEach(function (configEntry) {
            var command = new command_1.Command(configEntry);
            command.refresh(document);
            _this.commands.push(command);
        });
    };
    CommandsController.prototype.onChangeConfiguration = function () {
        this.initCommands();
    };
    CommandsController.prototype.onChangeTextEditor = function (textEditor) {
        if (textEditor) {
            var document_1 = textEditor.document.uri.toString();
            this.commands.forEach(function (command) { return command.refresh(document_1); });
        }
    };
    CommandsController.prototype.disposeCommands = function () {
        if (this.commands) {
            this.commands.forEach(function (command) { return command.dispose(); });
            this.commands = null;
        }
    };
    /**
     * remave statusbar buttons
     */
    CommandsController.prototype.dispose = function () {
        this.disposeCommands();
    };
    return CommandsController;
}());
exports.CommandsController = CommandsController;
//# sourceMappingURL=commandsController.js.map