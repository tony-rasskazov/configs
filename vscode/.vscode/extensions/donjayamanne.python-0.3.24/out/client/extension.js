'use strict';
var vscode = require('vscode');
var completionProvider_1 = require('./providers/completionProvider');
var hoverProvider_1 = require('./providers/hoverProvider');
var definitionProvider_1 = require('./providers/definitionProvider');
var referenceProvider_1 = require('./providers/referenceProvider');
var renameProvider_1 = require('./providers/renameProvider');
var formatProvider_1 = require('./providers/formatProvider');
var sortImports = require('./sortImports');
var lintProvider_1 = require('./providers/lintProvider');
var symbolProvider_1 = require('./providers/symbolProvider');
var signatureProvider_1 = require('./providers/signatureProvider');
var formatOnSaveProvider_1 = require('./providers/formatOnSaveProvider');
var settings = require('./common/configSettings');
var telemetryHelper = require('./common/telemetry');
var telemetryContracts = require('./common/telemetryContracts');
var codeActionProvider_1 = require('./providers/codeActionProvider');
var simpleRefactorProvider_1 = require('./providers/simpleRefactorProvider');
var setInterpreterProvider_1 = require('./providers/setInterpreterProvider');
var execInTerminalProvider_1 = require('./providers/execInTerminalProvider');
var tests = require('./unittests/main');
var PYTHON = { language: 'python', scheme: 'file' };
var pythonOutputChannel;
var unitTestOutChannel;
var formatOutChannel;
var lintingOutChannel;
function activate(context) {
    var rootDir = context.asAbsolutePath('.');
    var pythonSettings = settings.PythonSettings.getInstance();
    telemetryHelper.sendTelemetryEvent(telemetryContracts.EVENT_LOAD, {
        CodeComplete_Has_ExtraPaths: pythonSettings.autoComplete.extraPaths.length > 0 ? 'true' : 'false',
        Format_Has_Custom_Python_Path: pythonSettings.pythonPath.length !== 'python'.length ? 'true' : 'false'
    });
    lintingOutChannel = vscode.window.createOutputChannel(pythonSettings.linting.outputWindow);
    formatOutChannel = lintingOutChannel;
    if (pythonSettings.linting.outputWindow !== pythonSettings.formatting.outputWindow) {
        formatOutChannel = vscode.window.createOutputChannel(pythonSettings.formatting.outputWindow);
        formatOutChannel.clear();
    }
    if (pythonSettings.linting.outputWindow !== pythonSettings.unitTest.outputWindow) {
        unitTestOutChannel = vscode.window.createOutputChannel(pythonSettings.unitTest.outputWindow);
        unitTestOutChannel.clear();
    }
    sortImports.activate(context, formatOutChannel);
    setInterpreterProvider_1.activateSetInterpreterProvider();
    execInTerminalProvider_1.activateExecInTerminalProvider();
    simpleRefactorProvider_1.activateSimplePythonRefactorProvider(context, formatOutChannel);
    context.subscriptions.push(formatOnSaveProvider_1.activateFormatOnSaveProvider(PYTHON, pythonSettings, formatOutChannel, vscode.workspace.rootPath));
    // Enable indentAction
    vscode.languages.setLanguageConfiguration(PYTHON.language, {
        onEnterRules: [
            {
                beforeText: /^\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\s*$/,
                action: { indentAction: vscode.IndentAction.Indent }
            }
        ]
    });
    var renameProvider = new renameProvider_1.PythonRenameProvider(context);
    context.subscriptions.push(vscode.languages.registerRenameProvider(PYTHON, renameProvider));
    context.subscriptions.push(vscode.languages.registerHoverProvider(PYTHON, new hoverProvider_1.PythonHoverProvider(context)));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(PYTHON, new definitionProvider_1.PythonDefinitionProvider(context)));
    context.subscriptions.push(vscode.languages.registerReferenceProvider(PYTHON, new referenceProvider_1.PythonReferenceProvider(context)));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(PYTHON, new completionProvider_1.PythonCompletionItemProvider(context), '.'));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(PYTHON, new symbolProvider_1.PythonSymbolProvider(context, renameProvider.JediProxy)));
    if (pythonSettings.devOptions.indexOf('DISABLE_SIGNATURE') === -1) {
        context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(PYTHON, new signatureProvider_1.PythonSignatureProvider(context, renameProvider.JediProxy), '(', ','));
    }
    var formatProvider = new formatProvider_1.PythonFormattingEditProvider(context, formatOutChannel, pythonSettings, vscode.workspace.rootPath);
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(PYTHON, formatProvider));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(PYTHON, formatProvider));
    context.subscriptions.push(new lintProvider_1.LintProvider(context, lintingOutChannel, vscode.workspace.rootPath));
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider(PYTHON, new codeActionProvider_1.PythonCodeActionsProvider(context)));
    tests.activate(context, unitTestOutChannel);
    // Possible this extension loads before the others, so lets wait for 5 seconds
    setTimeout(disableOtherDocumentSymbolsProvider, 5000);
}
exports.activate = activate;
function disableOtherDocumentSymbolsProvider() {
    var symbolsExt = vscode.extensions.getExtension('donjayamanne.language-symbols');
    if (symbolsExt && symbolsExt.isActive) {
        symbolsExt.exports.disableDocumentSymbolProvider(PYTHON);
    }
}
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map