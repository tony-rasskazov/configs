// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "autopep" is now active!'); 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
        //var exec = require('child_process').exec;
        var filename = vscode.window.activeTextEditor.document.fileName;
		vscode.window.showInformationMessage("autopep8 start");
        var exec = require('child_process').exec;
        var out = null;
        
        exec('autopep8 ' + filename, function(error, stdout, stderr){
            if(stdout){
                var editor = vscode.window.activeTextEditor, 
                    document = editor.document,
                    startPos = new vscode.Position(0, 0),
                    endPos = new vscode.Position(document.lineCount - 1, 10000),
                    selection = new vscode.Selection(startPos, endPos);
                editor.edit(edit => {
                    edit.replace(selection, stdout.toString());
                });
            }
            if(stderr){
                vscode.window.showErrorMessage(stderr.toString());
            }
            if(error != null){
                vscode.window.showErrorMessage(error.toString());
            }
        });        
	});
	
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;