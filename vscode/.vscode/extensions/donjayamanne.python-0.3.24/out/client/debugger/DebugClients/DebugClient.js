"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('events');
(function (DebugType) {
    DebugType[DebugType["Local"] = 0] = "Local";
    DebugType[DebugType["Remote"] = 1] = "Remote";
    DebugType[DebugType["RunLocal"] = 2] = "RunLocal";
})(exports.DebugType || (exports.DebugType = {}));
var DebugType = exports.DebugType;
var DebugClient = (function (_super) {
    __extends(DebugClient, _super);
    function DebugClient(args, debugSession) {
        _super.call(this);
        this.debugSession = debugSession;
    }
    Object.defineProperty(DebugClient.prototype, "DebugType", {
        get: function () {
            return DebugType.Local;
        },
        enumerable: true,
        configurable: true
    });
    DebugClient.prototype.Stop = function () {
    };
    DebugClient.prototype.LaunchApplicationToDebug = function (dbgServer, processErrored) {
        return Promise.resolve();
    };
    return DebugClient;
}(events_1.EventEmitter));
exports.DebugClient = DebugClient;
//# sourceMappingURL=DebugClient.js.map