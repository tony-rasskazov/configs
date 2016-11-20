'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseDebugServer_1 = require('./BaseDebugServer');
var NonDebugServer = (function (_super) {
    __extends(NonDebugServer, _super);
    function NonDebugServer(debugSession, pythonProcess) {
        _super.call(this, debugSession, pythonProcess);
    }
    NonDebugServer.prototype.Stop = function () {
    };
    NonDebugServer.prototype.Start = function () {
        return Promise.resolve({ port: NaN, host: null });
    };
    return NonDebugServer;
}(BaseDebugServer_1.BaseDebugServer));
exports.NonDebugServer = NonDebugServer;
//# sourceMappingURL=NonDebugServer.js.map