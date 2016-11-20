"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode_debugadapter_1 = require("vscode-debugadapter");
var net = require("net");
var BaseDebugServer_1 = require("./BaseDebugServer");
var LocalDebugServer = (function (_super) {
    __extends(LocalDebugServer, _super);
    function LocalDebugServer(debugSession, pythonProcess) {
        _super.call(this, debugSession, pythonProcess);
        this.debugSocketServer = null;
    }
    LocalDebugServer.prototype.Stop = function () {
        if (this.debugSocketServer === null)
            return;
        try {
            this.debugSocketServer.close();
        }
        catch (ex) { }
        this.debugSocketServer = null;
    };
    LocalDebugServer.prototype.Start = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var that = _this;
            var connectedResolve = _this.debugClientConnected.resolve;
            var connected = false;
            _this.debugSocketServer = net.createServer(function (c) {
                // "connection" listener
                c.on("data", function (buffer) {
                    if (connectedResolve) {
                        // The debug client has connected to the debug server
                        connectedResolve(true);
                        connectedResolve = null;
                    }
                    if (!connected) {
                        connected = that.pythonProcess.Connect(buffer, c, false);
                    }
                    else {
                        that.pythonProcess.HandleIncomingData(buffer);
                        that.isRunning = true;
                    }
                });
                c.on("close", function (d) {
                    that.emit("detach", d);
                });
                c.on("timeout", function (d) {
                    var msg = "Debugger client timedout, " + d;
                    that.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(msg + "\n", "stderr"));
                });
            });
            _this.debugSocketServer.on("error", function (ex) {
                var exMessage = JSON.stringify(ex);
                var msg = "";
                if (ex.code === "EADDRINUSE") {
                    msg = "The port used for debugging is in use, please try again or try restarting Visual Studio Code, Error = " + exMessage;
                }
                else {
                    if (connected) {
                        return;
                    }
                    msg = "There was an error in starting the debug server. Error = " + exMessage;
                }
                that.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(msg + "\n", "stderr"));
                reject(msg);
            });
            _this.debugSocketServer.listen(0, function () {
                var server = that.debugSocketServer.address();
                resolve({ port: server.port });
            });
        });
    };
    return LocalDebugServer;
}(BaseDebugServer_1.BaseDebugServer));
exports.LocalDebugServer = LocalDebugServer;
//# sourceMappingURL=LocalDebugServer.js.map