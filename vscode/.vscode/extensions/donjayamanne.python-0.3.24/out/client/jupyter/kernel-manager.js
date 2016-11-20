"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/spawnteract.d.ts" />
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var ws_kernel_1 = require('./ws-kernel');
var zmq_kernel_1 = require('./zmq-kernel');
var spawnteract_1 = require('spawnteract');
var constants_1 = require('../common/constants');
var KernelManagerImpl = (function (_super) {
    __extends(KernelManagerImpl, _super);
    function KernelManagerImpl() {
        _super.call(this, function () { });
        this.disposables = [];
        this._runningKernels = new Map();
        this._kernelSpecs = this.getKernelSpecsFromSettings();
        this.registerCommands();
    }
    KernelManagerImpl.prototype.registerCommands = function () {
        this.disposables.push(vscode.commands.registerCommand(constants_1.Commands.Jupyter.Get_All_KernelSpecs_For_Language, this.getAllKernelSpecsFor.bind(this)));
    };
    KernelManagerImpl.prototype.dispose = function () {
        this._runningKernels.forEach(function (kernel) {
            kernel.dispose();
        });
        this._runningKernels.clear();
    };
    KernelManagerImpl.prototype.setRunningKernelFor = function (language, kernel) {
        kernel.kernelSpec.language = language;
        this._runningKernels.set(language, kernel);
        return kernel;
    };
    KernelManagerImpl.prototype.destroyRunningKernelFor = function (language) {
        if (!this._runningKernels.has(language)) {
            return;
        }
        var kernel = this._runningKernels.get(language);
        this._runningKernels.delete(language);
        if (kernel != null) {
            kernel.dispose();
        }
    };
    KernelManagerImpl.prototype.restartRunningKernelFor = function (language) {
        var kernel = this._runningKernels.get(language);
        if (kernel instanceof ws_kernel_1.WSKernel) {
            return new Promise(function (resolve, reject) {
                kernel.restart().then(function () {
                    resolve(kernel);
                }, reject);
            });
        }
        if (kernel instanceof zmq_kernel_1.ZMQKernel && kernel.kernelProcess) {
            var kernelSpec = kernel.kernelSpec;
            this.destroyRunningKernelFor(language);
            return this.startKernel(kernelSpec, language);
        }
        console.log('KernelManager: restartRunningKernelFor: ignored', kernel);
        vscode.window.showWarningMessage('Cannot restart this kernel');
        return Promise.resolve(kernel);
    };
    KernelManagerImpl.prototype.startKernelFor = function (language) {
        var _this = this;
        try {
            var rootDirectory = path.dirname(vscode.window.activeTextEditor.document.fileName);
            var connectionFile = path.join(rootDirectory, 'jupyter', 'connection.json');
            var connectionString = fs.readFileSync(connectionFile, 'utf8');
            var connection = JSON.parse(connectionString);
            return this.startExistingKernel(language, connection, connectionFile);
        }
        catch (_error) {
            var e = _error;
            if (e.code !== 'ENOENT') {
                console.log('KernelManager: Cannot start existing kernel:\n', e);
            }
        }
        return this.getKernelSpecFor(language).then(function (kernelSpec) {
            if (kernelSpec == null) {
                var message = "No kernel for language '" + language + "' found";
                var description = 'Check that the language for this file is set in VS Code and that you have a Jupyter kernel installed for it.';
                vscode.window.showErrorMessage(description);
                return;
            }
            return _this.startKernel(kernelSpec, language);
        }).catch(function () {
            var message = "No kernel for language '" + language + "' found";
            var description = 'Check that the language for this file is set in VS Code and that you have a Jupyter kernel installed for it.';
            vscode.window.showErrorMessage(description);
            return null;
        });
    };
    KernelManagerImpl.prototype.startExistingKernel = function (language, connection, connectionFile) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('KernelManager: startExistingKernel: Assuming', language);
            var kernelSpec = {
                display_name: 'Existing Kernel',
                language: language,
                argv: [],
                env: {}
            };
            var kernel = new zmq_kernel_1.ZMQKernel(kernelSpec, language, connection, connectionFile);
            _this.setRunningKernelFor(language, kernel);
            _this._executeStartupCode(kernel);
            resolve(kernel);
        });
    };
    KernelManagerImpl.prototype.startKernel = function (kernelSpec, language) {
        var _this = this;
        console.log('KernelManager: startKernelFor:', language);
        var projectPath = path.dirname(vscode.window.activeTextEditor.document.fileName);
        var spawnOptions = {
            cwd: projectPath
        };
        return spawnteract_1.launchSpec(kernelSpec, spawnOptions).then(function (result) {
            var kernel = new zmq_kernel_1.ZMQKernel(kernelSpec, language, result.config, result.connectionFile, result.spawn);
            _this.setRunningKernelFor(language, kernel);
            _this._executeStartupCode(kernel);
            return Promise.resolve(kernel);
        }, function (error) {
            return Promise.reject(error);
        });
    };
    KernelManagerImpl.prototype._executeStartupCode = function (kernel) {
        var displayName = kernel.kernelSpec.display_name;
        // startupCode = Config.getJson('startupCode')[displayName];
        var startupCode = {}[displayName];
        if (startupCode != null) {
            console.log('KernelManager: Executing startup code:', startupCode);
            startupCode = startupCode + ' \n';
            return kernel.execute(startupCode, function () { });
        }
    };
    KernelManagerImpl.prototype.getAllRunningKernels = function () {
        return this._runningKernels;
    };
    KernelManagerImpl.prototype.getRunningKernelFor = function (language) {
        return this._runningKernels.has(language) ? this._runningKernels.get(language) : null;
    };
    KernelManagerImpl.prototype.getAllKernelSpecs = function () {
        var _this = this;
        if (Object.keys(this._kernelSpecs).length === 0) {
            return this.updateKernelSpecs().then(function () {
                return Object.keys(_this._kernelSpecs).map(function (key) { return _this._kernelSpecs[key].spec; });
            });
        }
        else {
            var result = Object.keys(this._kernelSpecs).map(function (key) { return _this._kernelSpecs[key].spec; });
            return Promise.resolve(result);
        }
    };
    KernelManagerImpl.prototype.getAllKernelSpecsFor = function (language) {
        var _this = this;
        if (language != null) {
            return this.getAllKernelSpecs().then(function (kernelSpecs) {
                return kernelSpecs.filter(function (spec) {
                    return _this.kernelSpecProvidesLanguage(spec, language);
                });
            });
        }
        else {
            return Promise.resolve([]);
        }
    };
    KernelManagerImpl.prototype.getKernelSpecFor = function (language) {
        if (language == null) {
            return Promise.resolve(null);
        }
        return this.getAllKernelSpecsFor(language).then(function (kernelSpecs) {
            if (kernelSpecs.length <= 1) {
                return kernelSpecs[0];
            }
            else {
                // if (this.kernelPicker == null) {
                throw new Error('Oops');
            }
            // return this.kernelPicker.toggle();
        });
    };
    KernelManagerImpl.prototype.kernelSpecProvidesLanguage = function (kernelSpec, language) {
        var kernelLanguage = kernelSpec.language;
        var mappedLanguage = {}[kernelLanguage];
        if (mappedLanguage) {
            return mappedLanguage === language;
        }
        return kernelLanguage.toLowerCase() === language;
    };
    KernelManagerImpl.prototype.getKernelSpecsFromSettings = function () {
        var settings = {};
        return settings;
    };
    KernelManagerImpl.prototype.mergeKernelSpecs = function (kernelSpecs) {
        for (var key in kernelSpecs) {
            this._kernelSpecs[key] = kernelSpecs[key];
        }
        // return _.assign(this._kernelSpecs, kernelSpecs);
    };
    KernelManagerImpl.prototype.updateKernelSpecs = function () {
        var _this = this;
        this._kernelSpecs = this.getKernelSpecsFromSettings();
        return this.getKernelSpecsFromJupyter().then(function (kernelSpecsFromJupyter) {
            _this.mergeKernelSpecs(kernelSpecsFromJupyter);
            if (Object.keys(_this._kernelSpecs).length === 0) {
                var message = 'No kernel specs found';
                var options = {
                    description: 'Use kernelSpec option in VS Code or update IPython/Jupyter to a version that supports: `jupyter kernelspec list --json` or `ipython kernelspec list --json`',
                    dismissable: true
                };
                vscode.window.showErrorMessage(message + ', ' + options.description);
            }
            else {
                var message = 'VS Code Kernels updated:';
                var details = Object.keys(_this._kernelSpecs).map(function (key) { return _this._kernelSpecs[key].spec.display_name; }).join('\n');
            }
            return _this._kernelSpecs;
        }).catch(function () {
            if (Object.keys(_this._kernelSpecs).length === 0) {
                var message = 'No kernel specs found';
                var options = {
                    description: 'Use kernelSpec option in VS Code or update IPython/Jupyter to a version that supports: `jupyter kernelspec list --json` or `ipython kernelspec list --json`',
                    dismissable: true
                };
                vscode.window.showErrorMessage(message + ', ' + options.description);
            }
            else {
                var message = 'VS Code Kernels updated:';
                var details = Object.keys(_this._kernelSpecs).map(function (key) { return _this._kernelSpecs[key].spec.display_name; }).join('\n');
            }
            return _this._kernelSpecs;
        });
    };
    KernelManagerImpl.prototype.getKernelSpecsFromJupyter = function () {
        var _this = this;
        var jupyter = 'jupyter kernelspec list --json --log-level=CRITICAL';
        var ipython = 'ipython kernelspec list --json --log-level=CRITICAL';
        return this.getKernelSpecsFrom(jupyter).catch(function (jupyterError) {
            return _this.getKernelSpecsFrom(ipython);
        });
    };
    KernelManagerImpl.prototype.getKernelSpecsFrom = function (command) {
        var options = {
            killSignal: 'SIGINT'
        };
        return new Promise(function (resolve, reject) {
            return child_process.exec(command, options, function (err, stdout, stderr) {
                if (err) {
                    return reject(err);
                }
                try {
                    var kernelSpecs = JSON.parse(stdout).kernelspecs;
                    resolve(kernelSpecs);
                }
                catch (err) {
                    console.log('Could not parse kernelspecs:', err);
                    return reject(err);
                }
            });
        });
    };
    return KernelManagerImpl;
}(vscode.Disposable));
exports.KernelManagerImpl = KernelManagerImpl;
//# sourceMappingURL=kernel-manager.js.map