'use strict';
var vscode = require('vscode');
var commandsController_1 = require('./commandsController');
function activate(context) {
    var commandsController = new commandsController_1.CommandsController();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(commandsController.onChangeConfiguration, commandsController));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(commandsController.onChangeTextEditor, commandsController));
    context.subscriptions.push(commandsController);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map