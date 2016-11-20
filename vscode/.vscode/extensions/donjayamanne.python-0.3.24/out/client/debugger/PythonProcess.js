"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require("events");
var ProxyCommands_1 = require("./ProxyCommands");
var utils = require("./Common/Utils");
var PythonProcessCallbackHandler_1 = require("./PythonProcessCallbackHandler");
var SocketStream_1 = require("./Common/SocketStream");
var PythonProcess = (function (_super) {
    __extends(PythonProcess, _super);
    function PythonProcess(id, guid, programDirectory) {
        _super.call(this);
        this.stream = null;
        this.breakpointCommands = [];
        this.id = id;
        this.guid = guid;
        this._threads = new Map();
        this._idDispenser = new utils.IdDispenser();
        this.PendingChildEnumCommands = new Map();
        this.PendingExecuteCommands = new Map();
        this.programDirectory = programDirectory;
        this.executeCommandsQueue = [];
    }
    Object.defineProperty(PythonProcess.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PythonProcess.prototype, "Guid", {
        get: function () {
            return this.guid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PythonProcess.prototype, "HasExited", {
        get: function () {
            return this.hasExited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PythonProcess.prototype, "MainThread", {
        get: function () {
            return this._mainThread;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PythonProcess.prototype, "LastExecutedThread", {
        get: function () {
            return this._lastExecutedThread;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PythonProcess.prototype, "Threads", {
        get: function () {
            return this._threads;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PythonProcess.prototype, "ProgramDirectory", {
        get: function () {
            return this.programDirectory;
        },
        enumerable: true,
        configurable: true
    });
    PythonProcess.prototype.Kill = function () {
        if (!this.isRemoteProcess && this.pid && typeof this.pid === "number") {
            try {
                var kill = require("tree-kill");
                kill(this.pid);
                this.pid = null;
            }
            catch (ex) { }
        }
    };
    PythonProcess.prototype.Terminate = function () {
        this.stream.Write(ProxyCommands_1.Commands.ExitCommandBytes);
    };
    PythonProcess.prototype.Detach = function () {
        this.stream.Write(ProxyCommands_1.Commands.DetachCommandBytes);
    };
    PythonProcess.prototype.Connect = function (buffer, socket, isRemoteProcess) {
        var _this = this;
        if (isRemoteProcess === void 0) { isRemoteProcess = false; }
        this.isRemoteProcess = isRemoteProcess;
        if (this.stream === null) {
            this.stream = new SocketStream_1.SocketStream(socket, buffer);
        }
        else {
            this.stream.Append(buffer);
        }
        if (!isRemoteProcess) {
            if (!this.guidRead) {
                this.stream.BeginTransaction();
                var guid = this.stream.ReadString();
                if (this.stream.HasInsufficientDataForReading) {
                    this.stream.RollBackTransaction();
                    return false;
                }
                this.guidRead = true;
                this.stream.EndTransaction();
            }
            if (!this.statusRead) {
                this.stream.BeginTransaction();
                var result = this.stream.ReadInt32();
                if (this.stream.HasInsufficientDataForReading) {
                    this.stream.RollBackTransaction();
                    return false;
                }
                this.statusRead = true;
                this.stream.EndTransaction();
            }
            if (!this.pidRead) {
                this.stream.BeginTransaction();
                this.pid = this.stream.ReadInt32();
                if (this.stream.HasInsufficientDataForReading) {
                    this.stream.RollBackTransaction();
                    return false;
                }
                this.pidRead = true;
                this.stream.EndTransaction();
            }
        }
        this.callbackHandler = new PythonProcessCallbackHandler_1.PythonProcessCallbackHandler(this, this.stream, this._idDispenser);
        this.callbackHandler.on("detach", function () { return _this.emit("detach"); });
        this.callbackHandler.on("last", function () { return _this.emit("last"); });
        this.callbackHandler.on("moduleLoaded", function (arg) { return _this.emit("moduleLoaded", arg); });
        this.callbackHandler.on("asyncBreakCompleted", function (arg) { return _this.emit("asyncBreakCompleted", arg); });
        this.callbackHandler.on("threadCreated", function (arg) { return _this.emit("threadCreated", arg); });
        this.callbackHandler.on("threadExited", function (arg) { return _this.emit("threadExited", arg); });
        this.callbackHandler.on("stepCompleted", function (arg) { return _this.onPythonStepCompleted(arg); });
        this.callbackHandler.on("breakpointSet", function (arg) { return _this.onBreakpointSet(arg, true); });
        this.callbackHandler.on("breakpointNotSet", function (arg) { return _this.onBreakpointSet(arg, false); });
        this.callbackHandler.on("output", function (pyThread, output) { return _this.emit("output", pyThread, output); });
        this.callbackHandler.on("exceptionRaised", function (pyThread, ex, brkType) {
            _this._lastExecutedThread = pyThread;
            _this.emit("exceptionRaised", pyThread, ex, brkType);
        });
        this.callbackHandler.on("breakpointHit", function (pyThread, breakpointId) { return _this.onBreakpointHit(pyThread, breakpointId); });
        this.callbackHandler.on("processLoaded", function (arg) {
            _this._mainThread = arg;
            _this._lastExecutedThread = _this._mainThread;
            _this.emit("processLoaded", arg);
        });
        this.callbackHandler.HandleIncomingData();
        return true;
    };
    PythonProcess.prototype.HandleIncomingData = function (buffer) {
        this.stream.Append(buffer);
        if (!this.isRemoteProcess) {
            if (!this.guidRead) {
                this.stream.RollBackTransaction();
                var guid = this.stream.ReadString();
                if (this.stream.HasInsufficientDataForReading) {
                    return;
                }
                this.guidRead = true;
                this.stream.EndTransaction();
            }
            if (!this.statusRead) {
                this.stream.BeginTransaction();
                var result = this.stream.ReadInt32();
                if (this.stream.HasInsufficientDataForReading) {
                    this.stream.RollBackTransaction();
                    return;
                }
                this.statusRead = true;
                this.stream.EndTransaction();
            }
            if (!this.pidRead) {
                this.stream.BeginTransaction();
                this.pid = this.stream.ReadInt32();
                if (this.stream.HasInsufficientDataForReading) {
                    this.stream.RollBackTransaction();
                    return;
                }
                this.pidRead = true;
                this.stream.EndTransaction();
            }
        }
        this.callbackHandler.HandleIncomingData();
    };
    // #region Step Commands
    PythonProcess.prototype.onPythonStepCompleted = function (pyThread) {
        this._lastExecutedThread = pyThread;
        this.emit("stepCompleted", pyThread);
    };
    PythonProcess.prototype.sendStepCommand = function (threadId, command) {
        this.stream.Write(command);
        this.stream.WriteInt64(threadId);
    };
    PythonProcess.prototype.SendExceptionInfo = function (defaultBreakOnMode, breakOn) {
        var _this = this;
        this.stream.Write(ProxyCommands_1.Commands.SetExceptionInfoCommandBytes);
        this.stream.WriteInt32(defaultBreakOnMode);
        if (breakOn === null || breakOn === undefined) {
            this.stream.WriteInt32(0);
        }
        else {
            this.stream.WriteInt32(breakOn.size);
            breakOn.forEach(function (value, key) {
                _this.stream.WriteInt32(value);
                _this.stream.WriteString(key);
            });
        }
    };
    PythonProcess.prototype.SendStepOver = function (threadId) {
        return this.sendStepCommand(threadId, ProxyCommands_1.Commands.StepOverCommandBytes);
    };
    PythonProcess.prototype.SendStepOut = function (threadId) {
        return this.sendStepCommand(threadId, ProxyCommands_1.Commands.StepOutCommandBytes);
    };
    PythonProcess.prototype.SendStepInto = function (threadId) {
        return this.sendStepCommand(threadId, ProxyCommands_1.Commands.StepIntoCommandBytes);
    };
    // #endregion    
    PythonProcess.prototype.onBreakpointHit = function (pyThread, breakpointId) {
        this._lastExecutedThread = pyThread;
        this.emit("breakpointHit", pyThread, breakpointId);
    };
    PythonProcess.prototype.onBreakpointSet = function (breakpointId, success) {
        // Find the last breakpoint command associated with this breakpoint
        var index = this.breakpointCommands.findIndex(function (cmd) { return cmd.Id === breakpointId; });
        if (index === -1) {
            // Hmm this is not possible, log this exception and carry on
            this.emit("error", "command.breakpoint.hit", "Uknown Breakpoit Id " + breakpointId);
            return;
        }
        var cmd = this.breakpointCommands.splice(index, 1)[0];
        if (success) {
            cmd.PromiseResolve();
        }
        else {
            cmd.PromiseReject();
        }
    };
    PythonProcess.prototype.DisableBreakPoint = function (breakpoint) {
        if (breakpoint.IsDjangoBreakpoint) {
            this.stream.Write(ProxyCommands_1.Commands.RemoveDjangoBreakPointCommandBytes);
        }
        else {
            this.stream.Write(ProxyCommands_1.Commands.RemoveBreakPointCommandBytes);
        }
        this.stream.WriteInt32(breakpoint.LineNo);
        this.stream.WriteInt32(breakpoint.Id);
        if (breakpoint.IsDjangoBreakpoint) {
            this.stream.WriteString(breakpoint.Filename);
        }
    };
    PythonProcess.prototype.BindBreakpoint = function (brkpoint) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var bkCmd = {
                Id: brkpoint.Id,
                PromiseResolve: resolve,
                PromiseReject: reject
            };
            _this.breakpointCommands.push(bkCmd);
            if (brkpoint.IsDjangoBreakpoint) {
                _this.stream.Write(ProxyCommands_1.Commands.AddDjangoBreakPointCommandBytes);
            }
            else {
                _this.stream.Write(ProxyCommands_1.Commands.SetBreakPointCommandBytes);
            }
            _this.stream.WriteInt32(brkpoint.Id);
            _this.stream.WriteInt32(brkpoint.LineNo);
            _this.stream.WriteString(brkpoint.Filename);
            if (!brkpoint.IsDjangoBreakpoint) {
                _this.SendCondition(brkpoint);
                _this.SendPassCount(brkpoint);
            }
        });
    };
    PythonProcess.prototype.SendCondition = function (breakpoint) {
        this.stream.WriteInt32(breakpoint.ConditionKind);
        this.stream.WriteString(breakpoint.Condition || "");
    };
    PythonProcess.prototype.SendPassCount = function (breakpoint) {
        // DebugWriteCommand("Send BP pass count");
        this.stream.WriteInt32(breakpoint.PassCountKind);
        this.stream.WriteInt32(breakpoint.PassCount);
    };
    PythonProcess.prototype.SendResumeThread = function (threadId) {
        return this.sendStepCommand(threadId, ProxyCommands_1.Commands.ResumeThreadCommandBytes);
    };
    PythonProcess.prototype.SendContinue = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.stream.Write(ProxyCommands_1.Commands.ResumeAllCommandBytes);
            resolve();
        });
    };
    PythonProcess.prototype.AutoResumeThread = function (threadId) {
    };
    PythonProcess.prototype.SendClearStepping = function (threadId) {
    };
    PythonProcess.prototype.Break = function () {
        this.stream.Write(ProxyCommands_1.Commands.BreakAllCommandBytes);
    };
    PythonProcess.prototype.ExecuteText = function (text, reprKind, stackFrame) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var executeId = _this._idDispenser.Allocate();
            var cmd = {
                Id: executeId,
                Text: text,
                Frame: stackFrame,
                PromiseResolve: resolve,
                PromiseReject: reject,
                ReprKind: reprKind
            };
            _this.executeCommandsQueue.push(cmd);
            _this.ProcessPendingExecuteCommands();
        });
    };
    PythonProcess.prototype.ProcessPendingExecuteCommands = function () {
        if (this.executeCommandsQueue.length === 0 || this.PendingExecuteCommands.size > 0) {
            return;
        }
        var cmd = this.executeCommandsQueue.shift();
        this.PendingExecuteCommands.set(cmd.Id, cmd);
        this.stream.Write(ProxyCommands_1.Commands.ExecuteTextCommandBytes);
        this.stream.WriteString(cmd.Text);
        this.stream.WriteInt64(cmd.Frame.Thread.Id);
        this.stream.WriteInt32(cmd.Frame.FrameId);
        this.stream.WriteInt32(cmd.Id);
        this.stream.WriteInt32(cmd.Frame.Kind);
        this.stream.WriteInt32(cmd.ReprKind);
    };
    PythonProcess.prototype.EnumChildren = function (text, stackFrame, timeout) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var executeId = _this._idDispenser.Allocate();
            if (typeof (executeId) !== "number") {
                var y = "";
            }
            var cmd = {
                Id: executeId,
                Frame: stackFrame,
                PromiseResolve: resolve,
                PromiseReject: reject
            };
            _this.PendingChildEnumCommands.set(executeId, cmd);
            setTimeout(function () {
                if (_this.PendingChildEnumCommands.has(executeId)) {
                    _this.PendingChildEnumCommands.delete(executeId);
                }
                var seconds = timeout / 1000;
                reject("Enumerating children for " + text + " timed out after " + seconds + " seconds.");
            }, timeout);
            _this.stream.Write(ProxyCommands_1.Commands.GetChildrenCommandBytes);
            _this.stream.WriteString(text);
            _this.stream.WriteInt64(stackFrame.Thread.Id);
            _this.stream.WriteInt32(stackFrame.FrameId);
            _this.stream.WriteInt32(executeId);
            _this.stream.WriteInt32(stackFrame.Kind);
        });
    };
    PythonProcess.prototype.SetLineNumber = function (pythonStackFrame, lineNo) {
    };
    return PythonProcess;
}(events_1.EventEmitter));
exports.PythonProcess = PythonProcess;
//# sourceMappingURL=PythonProcess.js.map