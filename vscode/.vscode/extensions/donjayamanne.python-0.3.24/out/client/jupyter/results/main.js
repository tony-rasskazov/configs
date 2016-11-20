"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var resultView_1 = require('./resultView');
var anser = require('anser');
var jupyterSchema = 'jupyter-result-viewer';
var previewUri = vscode.Uri.parse(jupyterSchema + '://authority/jupyter');
var previewWindow;
var Results = (function (_super) {
    __extends(Results, _super);
    function Results() {
        _super.call(this, function () { });
        this.disposables = [];
        this.resultProvider = new resultView_1.TextDocumentContentProvider();
        this.disposables.push(vscode.workspace.registerTextDocumentContentProvider(jupyterSchema, previewWindow));
    }
    Results.prototype.displayProgress = function () {
    };
    Results.prototype.clearResults = function () {
    };
    Results.prototype.appendResult = function () {
    };
    Results.prototype.dispose = function () {
        this.disposables.forEach(function (d) { return d.dispose(); });
    };
    return Results;
}(vscode.Disposable));
exports.Results = Results;
//# sourceMappingURL=main.js.map