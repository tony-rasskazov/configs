'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var systemVariables_1 = require('./systemVariables');
var events_1 = require('events');
var path = require('path');
var systemVariables = new systemVariables_1.SystemVariables();
var PythonSettings = (function (_super) {
    __extends(PythonSettings, _super);
    function PythonSettings() {
        var _this = this;
        _super.call(this);
        if (PythonSettings.pythonSettings) {
            throw new Error('Singleton class, Use getInstance method');
        }
        vscode.workspace.onDidChangeConfiguration(function () {
            _this.initializeSettings();
        });
        this.initializeSettings();
    }
    PythonSettings.getInstance = function () {
        return PythonSettings.pythonSettings;
    };
    PythonSettings.prototype.initializeSettings = function () {
        var pythonSettings = vscode.workspace.getConfiguration('python');
        this.pythonPath = systemVariables.resolveAny(pythonSettings.get('pythonPath'));
        this.pythonPath = getAbsolutePath(this.pythonPath, vscode.workspace.rootPath);
        this.devOptions = systemVariables.resolveAny(pythonSettings.get('devOptions'));
        this.devOptions = Array.isArray(this.devOptions) ? this.devOptions : [];
        var lintingSettings = systemVariables.resolveAny(pythonSettings.get('linting'));
        if (this.linting) {
            Object.assign(this.linting, lintingSettings);
        }
        else {
            this.linting = lintingSettings;
        }
        this.linting.pylintPath = getAbsolutePath(this.linting.pylintPath, vscode.workspace.rootPath);
        this.linting.flake8Path = getAbsolutePath(this.linting.flake8Path, vscode.workspace.rootPath);
        this.linting.pep8Path = getAbsolutePath(this.linting.pep8Path, vscode.workspace.rootPath);
        this.linting.prospectorPath = getAbsolutePath(this.linting.prospectorPath, vscode.workspace.rootPath);
        this.linting.pydocStylePath = getAbsolutePath(this.linting.pydocStylePath, vscode.workspace.rootPath);
        var formattingSettings = systemVariables.resolveAny(pythonSettings.get('formatting'));
        if (this.formatting) {
            Object.assign(this.formatting, formattingSettings);
        }
        else {
            this.formatting = formattingSettings;
        }
        this.formatting.autopep8Path = getAbsolutePath(this.formatting.autopep8Path, vscode.workspace.rootPath);
        this.formatting.yapfPath = getAbsolutePath(this.formatting.yapfPath, vscode.workspace.rootPath);
        var autoCompleteSettings = systemVariables.resolveAny(pythonSettings.get('autoComplete'));
        if (this.autoComplete) {
            Object.assign(this.autoComplete, autoCompleteSettings);
        }
        else {
            this.autoComplete = autoCompleteSettings;
        }
        var unitTestSettings = systemVariables.resolveAny(pythonSettings.get('unitTest'));
        if (this.unitTest) {
            Object.assign(this.unitTest, unitTestSettings);
        }
        else {
            this.unitTest = unitTestSettings;
        }
        this.emit('change');
        this.unitTest.pyTestPath = getAbsolutePath(this.unitTest.pyTestPath, vscode.workspace.rootPath);
        this.unitTest.nosetestPath = getAbsolutePath(this.unitTest.nosetestPath, vscode.workspace.rootPath);
        // Resolve any variables found in the test arguments
        this.unitTest.nosetestArgs = this.unitTest.nosetestArgs.map(function (arg) { return systemVariables.resolveAny(arg); });
        this.unitTest.pyTestArgs = this.unitTest.pyTestArgs.map(function (arg) { return systemVariables.resolveAny(arg); });
        this.unitTest.unittestArgs = this.unitTest.unittestArgs.map(function (arg) { return systemVariables.resolveAny(arg); });
    };
    PythonSettings.pythonSettings = new PythonSettings();
    return PythonSettings;
}(events_1.EventEmitter));
exports.PythonSettings = PythonSettings;
function getAbsolutePath(pathToCheck, rootDir) {
    if (pathToCheck.indexOf(path.sep) === -1) {
        return pathToCheck;
    }
    return path.isAbsolute(pathToCheck) ? pathToCheck : path.resolve(rootDir, pathToCheck);
}
//# sourceMappingURL=configSettings.js.map