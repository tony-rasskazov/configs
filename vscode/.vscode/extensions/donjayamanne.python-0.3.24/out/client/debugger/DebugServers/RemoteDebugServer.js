"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode_debugadapter_1 = require("vscode-debugadapter");
var net = require("net");
var BaseDebugServer_1 = require("./BaseDebugServer");
var SocketStream_1 = require("../Common/SocketStream");
var DebuggerProtocolVersion = 6; // must be kept in sync with PTVSDBG_VER in attach_server.py
var DebuggerSignature = "PTVSDBG";
var Accepted = "ACPT";
var Rejected = "RJCT";
var DebuggerSignatureBytes = new Buffer(DebuggerSignature, "ascii");
var InfoCommandBytes = new Buffer("INFO", "ascii");
var AttachCommandBytes = new Buffer("ATCH", "ascii");
var ReplCommandBytes = new Buffer("REPL", "ascii");
var RemoteDebugServer = (function (_super) {
    __extends(RemoteDebugServer, _super);
    function RemoteDebugServer(debugSession, pythonProcess, args) {
        _super.call(this, debugSession, pythonProcess);
        this.socket = null;
        this.stream = null;
        this.args = args;
    }
    RemoteDebugServer.prototype.Stop = function () {
        if (this.socket === null)
            return;
        try {
            this.socket.end();
        }
        catch (ex) { }
        this.socket = null;
    };
    RemoteDebugServer.prototype.Start = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var that = _this;
            var connected = false;
            var secretWrittenToDebugProgram = false;
            var secretConfirmedByDebugProgram = false;
            var infoBytesWritten = false;
            var versionRead = false;
            var commandBytesWritten = false;
            var languageVersionRead = false;
            var portNumber = _this.args.port;
            var debugCommandsAccepted = false;
            var options = { port: portNumber };
            if (typeof _this.args.host === "string" && _this.args.host.length > 0) {
                options.host = _this.args.host;
            }
            _this.socket = net.connect(options, function () {
                resolve(options);
            });
            _this.socket.on("end", function (ex) {
                var msg = "Debugger client disconneced, ex";
                that.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(msg + "\n", "stderr"));
            });
            _this.socket.on("data", function (buffer) {
                if (connected) {
                    that.pythonProcess.HandleIncomingData(buffer);
                    return;
                }
                if (that.stream === null) {
                    that.stream = new SocketStream_1.SocketStream(that.socket, buffer);
                }
                else {
                    if (!connected) {
                        if (that.stream.Length === 0) {
                            that.stream = new SocketStream_1.SocketStream(that.socket, buffer);
                        }
                        else {
                            that.stream.Append(buffer);
                        }
                    }
                }
                if (!secretWrittenToDebugProgram) {
                    that.stream.BeginTransaction();
                    var sig = that.stream.ReadAsciiString(DebuggerSignature.length);
                    if (that.stream.HasInsufficientDataForReading) {
                        that.stream.RollBackTransaction();
                        return;
                    }
                    if (sig !== DebuggerSignature) {
                        throw new Error("ConnErrorMessages.RemoteUnsupportedServer");
                    }
                    var ver = that.stream.ReadInt64();
                    if (that.stream.HasInsufficientDataForReading) {
                        that.stream.RollBackTransaction();
                        return;
                    }
                    // If we are talking the same protocol but different version, reply with signature + version before bailing out
                    // so that ptvsd has a chance to gracefully close the socket on its side. 
                    that.stream.EndTransaction();
                    that.stream.Write(DebuggerSignatureBytes);
                    that.stream.WriteInt64(DebuggerProtocolVersion);
                    if (ver !== DebuggerProtocolVersion) {
                        throw new Error("ConnErrorMessages.RemoteUnsupportedServer");
                    }
                    that.stream.WriteString(that.args.secret || "");
                    secretWrittenToDebugProgram = true;
                    that.stream.EndTransaction();
                    var secretResp = that.stream.ReadAsciiString(Accepted.length);
                    if (that.stream.HasInsufficientDataForReading) {
                        that.stream.RollBackTransaction();
                        return;
                    }
                    if (secretResp !== Accepted) {
                        throw new Error("ConnErrorMessages.RemoteSecretMismatch");
                    }
                    secretConfirmedByDebugProgram = true;
                    that.stream.EndTransaction();
                }
                if (!secretConfirmedByDebugProgram) {
                    var secretResp = that.stream.ReadAsciiString(Accepted.length);
                    if (that.stream.HasInsufficientDataForReading) {
                        that.stream.RollBackTransaction();
                        return;
                    }
                    if (secretResp !== Accepted) {
                        throw new Error("ConnErrorMessages.RemoteSecretMismatch");
                    }
                    secretConfirmedByDebugProgram = true;
                    that.stream.EndTransaction();
                }
                if (!commandBytesWritten) {
                    that.stream.Write(AttachCommandBytes);
                    var debugOptions = "WaitOnAbnormalExit, WaitOnNormalExit, RedirectOutput";
                    that.stream.WriteString(debugOptions);
                    commandBytesWritten = true;
                }
                if (commandBytesWritten && !debugCommandsAccepted) {
                    var attachResp = that.stream.ReadAsciiString(Accepted.length);
                    if (that.stream.HasInsufficientDataForReading) {
                        that.stream.RollBackTransaction();
                        return;
                    }
                    if (attachResp !== Accepted) {
                        throw new Error("ConnErrorMessages.RemoteAttachRejected");
                    }
                    debugCommandsAccepted = true;
                    that.stream.EndTransaction();
                }
                if (debugCommandsAccepted && !languageVersionRead) {
                    that.stream.EndTransaction();
                    var pid = that.stream.ReadInt32();
                    var langMajor = that.stream.ReadInt32();
                    var langMinor = that.stream.ReadInt32();
                    var langMicro = that.stream.ReadInt32();
                    var langVer = ((langMajor << 8) | langMinor);
                    if (that.stream.HasInsufficientDataForReading) {
                        that.stream.RollBackTransaction();
                        return;
                    }
                    that.stream.EndTransaction();
                    languageVersionRead = true;
                }
                if (languageVersionRead) {
                    if (connected) {
                        that.pythonProcess.HandleIncomingData(buffer);
                    }
                    else {
                        that.pythonProcess.Connect(that.stream.Buffer, _this.socket, true);
                        connected = true;
                    }
                }
            });
            _this.socket.on("close", function (d) {
                var msg = "Debugger client closed, " + d;
                that.emit("detach", d);
            });
            _this.socket.on("timeout", function (d) {
                var msg = "Debugger client timedout, " + d;
                that.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(msg + "\n", "stderr"));
            });
            _this.socket.on("error", function (ex) {
                if (connected) {
                    return;
                }
                var exMessage = JSON.stringify(ex);
                var msg = "There was an error in starting the debug server. Error = " + exMessage;
                that.debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(msg + "\n", "stderr"));
                reject(msg);
            });
        });
    };
    return RemoteDebugServer;
}(BaseDebugServer_1.BaseDebugServer));
exports.RemoteDebugServer = RemoteDebugServer;
//# sourceMappingURL=RemoteDebugServer.js.map