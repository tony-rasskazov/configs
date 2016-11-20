"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RemoteDebugServer_1 = require("../DebugServers/RemoteDebugServer");
var DebugClient_1 = require("./DebugClient");
var RemoteDebugClient = (function (_super) {
    __extends(RemoteDebugClient, _super);
    function RemoteDebugClient(args, debugSession) {
        _super.call(this, args, debugSession);
        this.args = args;
    }
    RemoteDebugClient.prototype.CreateDebugServer = function (pythonProcess) {
        this.pythonProcess = pythonProcess;
        this.debugServer = new RemoteDebugServer_1.RemoteDebugServer(this.debugSession, this.pythonProcess, this.args);
        return this.debugServer;
    };
    Object.defineProperty(RemoteDebugClient.prototype, "DebugType", {
        get: function () {
            return DebugClient_1.DebugType.Remote;
        },
        enumerable: true,
        configurable: true
    });
    RemoteDebugClient.prototype.Stop = function () {
        if (this.pythonProcess) {
            this.pythonProcess.Detach();
        }
        if (this.debugServer) {
            this.debugServer.Stop();
            this.debugServer = null;
        }
    };
    return RemoteDebugClient;
}(DebugClient_1.DebugClient));
exports.RemoteDebugClient = RemoteDebugClient;
//# sourceMappingURL=RemoteDebugClient.js.map