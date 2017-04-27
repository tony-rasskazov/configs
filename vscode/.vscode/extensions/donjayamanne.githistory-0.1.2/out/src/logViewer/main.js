'use strict';
var vscode = require('vscode');
var htmlGenerator = require('./htmlGenerator');
var gitHist = require('../helpers/gitHistory');
var path = require('path');
var gitHistorySchema = 'git-history-viewer';
var PAGE_SIZE = 500;
var previewUri = vscode.Uri.parse(gitHistorySchema + '://authority/git-history');
var historyRetrieved;
var pageIndex = 0;
var pageSize = PAGE_SIZE;
var canGoPrevious = false;
var canGoNext = true;
var TextDocumentContentProvider = (function () {
    function TextDocumentContentProvider() {
        this._onDidChange = new vscode.EventEmitter();
    }
    TextDocumentContentProvider.prototype.provideTextDocumentContent = function (uri, token) {
        var _this = this;
        return gitHist.getHistory(vscode.workspace.rootPath, pageIndex, pageSize)
            .then(function (entries) {
            canGoPrevious = pageIndex > 0;
            canGoNext = entries.length === pageSize;
            _this.entries = entries;
            var html = _this.generateHistoryView();
            return html;
        }).catch(function (error) {
            return _this.generateErrorView(error);
        });
    };
    Object.defineProperty(TextDocumentContentProvider.prototype, "onDidChange", {
        get: function () {
            return this._onDidChange.event;
        },
        enumerable: true,
        configurable: true
    });
    TextDocumentContentProvider.prototype.update = function (uri) {
        this._onDidChange.fire(uri);
    };
    TextDocumentContentProvider.prototype.getStyleSheetPath = function (resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', 'resources', resourceName)).toString();
    };
    TextDocumentContentProvider.prototype.getScriptFilePath = function (resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', 'src', 'browser', resourceName)).toString();
    };
    TextDocumentContentProvider.prototype.getNodeModulesPath = function (resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', 'node_modules', resourceName)).toString();
    };
    TextDocumentContentProvider.prototype.generateErrorView = function (error) {
        return "\n            <head>\n                <link rel=\"stylesheet\" href=\"" + this.getNodeModulesPath(path.join('normalize.css', 'normalize.css')) + "\" >\n                <link rel=\"stylesheet\" href=\"" + this.getStyleSheetPath(path.join('octicons', 'font', 'octicons.css')) + "\" >\n                <link rel=\"stylesheet\" href=\"" + this.getStyleSheetPath('animate.min.css') + "\" >\n                <link rel=\"stylesheet\" href=\"" + this.getStyleSheetPath('main.css') + "\" >\n            </head>\n            <body>\n                " + htmlGenerator.generateErrorView(error) + "\n            </body>\n        ";
    };
    TextDocumentContentProvider.prototype.generateHistoryView = function () {
        var innerHtml = htmlGenerator.generateHistoryHtmlView(this.entries, canGoPrevious, canGoNext);
        return "\n            <head>\n                <link rel=\"stylesheet\" href=\"" + this.getNodeModulesPath(path.join('normalize.css', 'normalize.css')) + "\" >\n                <link rel=\"stylesheet\" href=\"" + this.getStyleSheetPath(path.join('octicons', 'font', 'octicons.css')) + "\" >\n                <link rel=\"stylesheet\" href=\"" + this.getStyleSheetPath('animate.min.css') + "\" >\n                <link rel=\"stylesheet\" href=\"" + this.getStyleSheetPath('hint.min.css') + "\" >\n                <link rel=\"stylesheet\" href=\"" + this.getStyleSheetPath('main.css') + "\" >\n                <script src=\"" + this.getNodeModulesPath(path.join('jquery', 'dist', 'jquery.min.js')) + "\"></script>\n                <script src=\"" + this.getNodeModulesPath(path.join('clipboard', 'dist', 'clipboard.min.js')) + "\"></script>\n                <script src=\"" + this.getScriptFilePath('proxy.js') + "\"></script>\n                <script src=\"" + this.getScriptFilePath('svgGenerator.js') + "\"></script>\n                <script src=\"" + this.getScriptFilePath('detailsView.js') + "\"></script>\n            </head>\n\n            <body>\n                " + innerHtml + "\n            </body>\n        ";
    };
    return TextDocumentContentProvider;
}());
function activate(context, outputChannel) {
    var provider = new TextDocumentContentProvider();
    var registration = vscode.workspace.registerTextDocumentContentProvider(gitHistorySchema, provider);
    var disposable = vscode.commands.registerCommand('git.viewHistory', function () {
        // Unique name everytime, so that we always refresh the history log
        // Untill we add a refresh button to the view
        historyRetrieved = false;
        pageIndex = 0;
        canGoPrevious = false;
        canGoNext = true;
        previewUri = vscode.Uri.parse(gitHistorySchema + '://authority/git-history?x=' + new Date().getTime().toString());
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.One, 'Git History (git log)').then(function (success) {
        }, function (reason) {
            vscode.window.showErrorMessage(reason);
        });
    });
    context.subscriptions.push(disposable, registration);
    disposable = vscode.commands.registerCommand('git.copyText', function (sha) {
        vscode.window.showInformationMessage(sha);
    });
    disposable = vscode.commands.registerCommand('git.logNavigate', function (direction) {
        pageIndex = pageIndex + (direction === 'next' ? 1 : -1);
        provider.update(previewUri);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=main.js.map