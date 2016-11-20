'use strict';
var vscode = require('vscode');
var path = require('path');
var TextDocumentContentProvider = (function () {
    function TextDocumentContentProvider() {
        this._onDidChange = new vscode.EventEmitter();
        this.htmlResponse = '';
    }
    TextDocumentContentProvider.prototype.provideTextDocumentContent = function (uri, token) {
        this.lastUri = uri;
        return Promise.resolve(this.generateResultsView());
    };
    Object.defineProperty(TextDocumentContentProvider.prototype, "onDidChange", {
        get: function () {
            return this._onDidChange.event;
        },
        enumerable: true,
        configurable: true
    });
    TextDocumentContentProvider.prototype.setText = function (result) {
        this.htmlResponse = result;
    };
    TextDocumentContentProvider.prototype.update = function () {
        this._onDidChange.fire(this.lastUri);
    };
    TextDocumentContentProvider.prototype.getStyleSheetPath = function (resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', '..', 'resources', resourceName)).toString();
    };
    TextDocumentContentProvider.prototype.getScriptFilePath = function (resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', '..', 'out', 'client', 'jupyter', resourceName)).toString();
    };
    TextDocumentContentProvider.prototype.getNodeModulesPath = function (resourceName) {
        return vscode.Uri.file(path.join(__dirname, '..', '..', '..', '..', 'node_modules', resourceName)).toString();
    };
    TextDocumentContentProvider.prototype.generateErrorView = function (error) {
        return "<head></head><body>" + error + "</body>";
    };
    TextDocumentContentProvider.prototype.generateResultsView = function () {
        var innerHtml = this.htmlResponse;
        var customScripts = '';
        var html = "\n                <head>\n                </head>\n                <body>\n                    " + innerHtml + "\n                <div style=\"display:none\">\n                    <script type=\"text/javascript\">\n                    function testClick(){\n                        document.getElementById('xx').innerHTML = 'one';\n                    }\n                    </script>\n                    <button onclick=\"testClick(); return false;\">Test</button>\n                    <div id=\"xx\">wow</div>\n                    <div class=\"script\">" + this.getNodeModulesPath(path.join('jquery', 'dist', 'jquery.min.js')) + "</div>\n                    " + customScripts + "\n                </div>\n                </body>\n            ";
        // fs.writeFileSync('/Users/donjayamanne/.vscode-insiders/extensions/pythonVSCode/results.html', html);
        return html;
    };
    return TextDocumentContentProvider;
}());
exports.TextDocumentContentProvider = TextDocumentContentProvider;
//# sourceMappingURL=resultView.js.map