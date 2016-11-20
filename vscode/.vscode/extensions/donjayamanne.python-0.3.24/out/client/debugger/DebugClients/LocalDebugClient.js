"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LocalDebugServer_1 = require('../DebugServers/LocalDebugServer');
var vscode_debugadapter_1 = require('vscode-debugadapter');
var path = require('path');
var child_process = require('child_process');
var DebugClient_1 = require('./DebugClient');
var open_1 = require('../../common/open');
var fsExtra = require('fs-extra');
var tmp = require('tmp');
var prependFile = require('prepend-file');
var LineByLineReader = require('line-by-line');
var PTVS_FILES = ['visualstudio_ipython_repl.py', 'visualstudio_py_debugger.py',
    'visualstudio_py_launcher.py', 'visualstudio_py_repl.py', 'visualstudio_py_util.py'];
var VALID_DEBUG_OPTIONS = ['WaitOnAbnormalExit',
    'WaitOnNormalExit',
    'RedirectOutput',
    'DebugStdLib',
    'BreakOnSystemExitZero',
    'DjangoDebugging'];
var LocalDebugClient = (function (_super) {
    __extends(LocalDebugClient, _super);
    function LocalDebugClient(args, debugSession) {
        _super.call(this, args, debugSession);
        this.args = args;
    }
    LocalDebugClient.prototype.CreateDebugServer = function (pythonProcess) {
        this.pythonProcess = pythonProcess;
        this.debugServer = new LocalDebugServer_1.LocalDebugServer(this.debugSession, this.pythonProcess);
        return this.debugServer;
    };
    Object.defineProperty(LocalDebugClient.prototype, "DebugType", {
        get: function () {
            return DebugClient_1.DebugType.Local;
        },
        enumerable: true,
        configurable: true
    });
    LocalDebugClient.prototype.Stop = function () {
        if (this.debugServer) {
            this.debugServer.Stop();
            this.debugServer = null;
        }
        if (this.pyProc) {
            try {
                this.pyProc.send('EXIT');
            }
            catch (ex) { }
            try {
                this.pyProc.stdin.write('EXIT');
            }
            catch (ex) { }
            try {
                this.pyProc.disconnect();
            }
            catch (ex) { }
            this.pyProc = null;
        }
    };
    LocalDebugClient.prototype.getPTVSToolsFilePath = function () {
        var currentFileName = module.filename;
        var ptVSToolsPath = path.join(path.dirname(currentFileName), '..', '..', '..', '..', 'pythonFiles', 'PythonTools');
        return path.join(ptVSToolsPath, 'visualstudio_py_launcher.py');
    };
    LocalDebugClient.prototype.displayError = function (error) {
        var errorMsg = typeof error === 'string' ? error : ((error.message && error.message.length > 0) ? error.message : '');
        if (errorMsg.length > 0) {
            this.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(errorMsg, 'stderr'));
        }
    };
    LocalDebugClient.prototype.LaunchApplicationToDebug = function (dbgServer, processErrored) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileDir = path.dirname(_this.args.program);
            var processCwd = fileDir;
            if (typeof _this.args.cwd === 'string' && _this.args.cwd.length > 0) {
                processCwd = _this.args.cwd;
            }
            var fileNameWithoutPath = path.basename(_this.args.program);
            var pythonPath = 'python';
            if (typeof _this.args.pythonPath === 'string' && _this.args.pythonPath.trim().length > 0) {
                pythonPath = _this.args.pythonPath;
            }
            var environmentVariables = _this.args.env ? _this.args.env : {};
            var newEnvVars = {};
            if (environmentVariables) {
                for (var setting in environmentVariables) {
                    if (!newEnvVars[setting]) {
                        newEnvVars[setting] = environmentVariables[setting];
                        process.env[setting] = environmentVariables[setting];
                    }
                }
                for (var setting in process.env) {
                    if (!environmentVariables[setting]) {
                        environmentVariables[setting] = process.env[setting];
                    }
                }
            }
            if (!environmentVariables.hasOwnProperty('PYTHONIOENCODING')) {
                environmentVariables['PYTHONIOENCODING'] = 'UTF-8';
                newEnvVars['PYTHONIOENCODING'] = 'UTF-8';
                process.env['PYTHONIOENCODING'] = 'UTF-8';
            }
            var currentFileName = module.filename;
            var ptVSToolsFilePath = _this.getPTVSToolsFilePath();
            var launcherArgs = _this.buildLauncherArguments();
            var args = [ptVSToolsFilePath, processCwd, dbgServer.port.toString(), '34806ad9-833a-4524-8cd6-18ca4aa74f14'].concat(launcherArgs);
            if (_this.args.console === 'externalTerminal') {
                var isSudo = Array.isArray(_this.args.debugOptions) && _this.args.debugOptions.some(function (opt) { return opt === 'Sudo'; });
                open_1.open({ wait: false, app: [pythonPath].concat(args), cwd: processCwd, env: environmentVariables, sudo: isSudo }).then(function (proc) {
                    _this.pyProc = proc;
                    resolve();
                }, function (error) {
                    // TODO: This condition makes no sense (refactor)
                    if (!_this.debugServer && _this.debugServer.IsRunning) {
                        return;
                    }
                    reject(error);
                });
                return;
            }
            if (_this.args.console === 'integratedTerminal') {
                var isSudo = Array.isArray(_this.args.debugOptions) && _this.args.debugOptions.some(function (opt) { return opt === 'Sudo'; });
                var command = isSudo ? 'sudo' : pythonPath;
                var commandArgs = isSudo ? [pythonPath].concat(args) : args;
                var options = { cwd: processCwd, env: environmentVariables };
                var termArgs = {
                    kind: 'integrated',
                    title: 'Python Debug Console',
                    cwd: processCwd,
                    args: [command].concat(commandArgs),
                    env: newEnvVars
                };
                _this.debugSession.runInTerminalRequest(termArgs, 5000, function (response) {
                    if (response.success) {
                        resolve();
                    }
                    else {
                        reject(response);
                    }
                });
                return;
            }
            _this.pyProc = child_process.spawn(pythonPath, args, { cwd: processCwd, env: environmentVariables });
            _this.pyProc.on('error', function (error) {
                // TODO: This condition makes no sense (refactor)
                if (!_this.debugServer && _this.debugServer.IsRunning) {
                    return;
                }
                if (!_this.debugServer.IsRunning && typeof (error) === 'object' && error !== null) {
                    // return processErrored(error);
                    return reject(error);
                }
                _this.displayError(error);
            });
            _this.pyProc.stderr.setEncoding('utf8');
            _this.pyProc.stderr.on('data', function (error) {
                // We generally don't need to display the errors as stderr output is being captured by debugger
                // and it gets sent out to the debug client
                // Either way, we need some code in here so we read the stdout of the python process
                // Else it just keep building up (related to issue #203 and #52)
                if (_this.debugServer && !_this.debugServer.IsRunning) {
                    return reject(error);
                }
            });
            _this.pyProc.stdout.on('data', function (d) {
                // This is necessary so we read the stdout of the python process
                // Else it just keep building up (related to issue #203 and #52)
                var x = 0;
            });
            // Here we wait for the application to connect to the socket server
            // Only once connected do we know that the application has successfully launched
            // resolve();
            _this.debugServer.DebugClientConnected.then(resolve);
        });
    };
    LocalDebugClient.prototype.buildLauncherArguments = function () {
        var vsDebugOptions = 'WaitOnAbnormalExit,WaitOnNormalExit,RedirectOutput';
        if (Array.isArray(this.args.debugOptions)) {
            vsDebugOptions = this.args.debugOptions.filter(function (opt) { return VALID_DEBUG_OPTIONS.indexOf(opt) >= 0; }).join(',');
        }
        // If internal or external console, then don't re-direct the output
        if (this.args.externalConsole === true || this.args.console === 'integratedTerminal' || this.args.console === 'externalTermainal') {
            vsDebugOptions = vsDebugOptions.split(',').filter(function (opt) { return opt !== 'RedirectOutput'; }).join(',');
        }
        var programArgs = Array.isArray(this.args.args) && this.args.args.length > 0 ? this.args.args : [];
        return [vsDebugOptions, this.args.program].concat(programArgs);
        // Use this ability to debug unit tests or modules
        // Adding breakpoints programatically to the first executable line of the test program
        // return [vsDebugOptions, '-c', "import pytest;pytest.main(['/Users/donjayamanne/Desktop/Development/Python/Temp/MyEnvs/tests/test_another.py::Test_CheckMyApp::test_complex_check'])"].concat(programArgs);
    };
    return LocalDebugClient;
}(DebugClient_1.DebugClient));
exports.LocalDebugClient = LocalDebugClient;
//# sourceMappingURL=LocalDebugClient.js.map