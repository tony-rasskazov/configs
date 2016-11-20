"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NonDebugServer_1 = require("../DebugServers/NonDebugServer");
var vscode_debugadapter_1 = require("vscode-debugadapter");
var path = require("path");
var child_process = require("child_process");
var DebugClient_1 = require("./DebugClient");
var open_1 = require("../../common/open");
var fsExtra = require("fs-extra");
var tmp = require("tmp");
var prependFile = require("prepend-file");
var LineByLineReader = require("line-by-line");
var NonDebugClient = (function (_super) {
    __extends(NonDebugClient, _super);
    function NonDebugClient(args, debugSession) {
        _super.call(this, args, debugSession);
        this.args = args;
    }
    NonDebugClient.prototype.CreateDebugServer = function (pythonProcess) {
        return new NonDebugServer_1.NonDebugServer(this.debugSession, pythonProcess);
    };
    Object.defineProperty(NonDebugClient.prototype, "DebugType", {
        get: function () {
            return DebugClient_1.DebugType.RunLocal;
        },
        enumerable: true,
        configurable: true
    });
    NonDebugClient.prototype.Stop = function () {
        if (this.debugServer) {
            this.debugServer.Stop();
            this.debugServer = null;
        }
        if (this.pyProc) {
            try {
                this.pyProc.kill();
            }
            catch (ex) { }
            this.pyProc = null;
        }
    };
    NonDebugClient.prototype.LaunchApplicationToDebug = function (dbgServer, processErrored) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileDir = path.dirname(_this.args.program);
            var processCwd = fileDir;
            if (typeof _this.args.cwd === "string" && _this.args.cwd.length > 0) {
                processCwd = _this.args.cwd;
            }
            var fileNameWithoutPath = path.basename(_this.args.program);
            var pythonPath = "python";
            if (typeof _this.args.pythonPath === "string" && _this.args.pythonPath.trim().length > 0) {
                pythonPath = _this.args.pythonPath;
            }
            var environmentVariables = _this.args.env ? _this.args.env : {};
            var newEnvVars = {};
            if (environmentVariables) {
                for (var setting in environmentVariables) {
                    if (!newEnvVars[setting]) {
                        newEnvVars[setting] = environmentVariables[setting];
                    }
                }
                for (var setting in process.env) {
                    if (!environmentVariables[setting]) {
                        environmentVariables[setting] = process.env[setting];
                    }
                }
            }
            if (!environmentVariables.hasOwnProperty("PYTHONIOENCODING")) {
                environmentVariables["PYTHONIOENCODING"] = "UTF-8";
                newEnvVars["PYTHONIOENCODING"] = "UTF-8";
            }
            var currentFileName = module.filename;
            var launcherArgs = _this.buildLauncherArguments();
            var args = launcherArgs;
            if (_this.args.console === 'externalTerminal') {
                open_1.open({ wait: false, app: [pythonPath].concat(args), cwd: processCwd, env: environmentVariables }).then(function (proc) {
                    _this.pyProc = proc;
                    _this.pyProc.on('exit', function () {
                        _this.pyProc = null;
                        _this.emit('exit');
                    });
                    resolve();
                }, function (error) {
                    if (reject) {
                        reject(error);
                        reject = null;
                    }
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
                    title: "Python Debug Console",
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
            _this.pyProc.on("error", function (error) {
                _this.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(error, "stderr"));
            });
            _this.pyProc.stderr.setEncoding("utf8");
            _this.pyProc.stdout.setEncoding("utf8");
            _this.pyProc.stderr.on("data", function (error) {
                _this.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(error, "stderr"));
            });
            _this.pyProc.stdout.on("data", function (d) {
                _this.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(d, "stdout"));
            });
            _this.pyProc.on('exit', function () {
                _this.pyProc = null;
                _this.emit('exit');
            });
            resolve();
        });
    };
    NonDebugClient.prototype.buildLauncherArguments = function () {
        var programArgs = Array.isArray(this.args.args) && this.args.args.length > 0 ? this.args.args : [];
        return [this.args.program].concat(programArgs);
    };
    return NonDebugClient;
}(DebugClient_1.DebugClient));
exports.NonDebugClient = NonDebugClient;
//# sourceMappingURL=NonDebugClient.js.map