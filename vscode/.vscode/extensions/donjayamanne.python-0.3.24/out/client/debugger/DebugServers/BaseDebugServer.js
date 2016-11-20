"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require("events");
var helpers_1 = require('../../common/helpers');
var BaseDebugServer = (function (_super) {
    __extends(BaseDebugServer, _super);
    function BaseDebugServer(debugSession, pythonProcess) {
        _super.call(this);
        this.debugSession = debugSession;
        this.pythonProcess = pythonProcess;
        this.debugClientConnected = helpers_1.createDeferred();
    }
    Object.defineProperty(BaseDebugServer.prototype, "IsRunning", {
        get: function () {
            return this.isRunning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDebugServer.prototype, "DebugClientConnected", {
        get: function () {
            return this.debugClientConnected.promise;
        },
        enumerable: true,
        configurable: true
    });
    return BaseDebugServer;
}(events_1.EventEmitter));
exports.BaseDebugServer = BaseDebugServer;
//# sourceMappingURL=BaseDebugServer.js.map