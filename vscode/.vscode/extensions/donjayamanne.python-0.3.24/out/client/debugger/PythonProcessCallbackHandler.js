"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Contracts_1 = require("./Common/Contracts");
var Contracts_2 = require("./Common/Contracts");
var utils = require("./Common/Utils");
var events_1 = require("events");
var ProxyCommands_1 = require("./ProxyCommands");
var TryParser_1 = require("./Common/TryParser");
var path = require("path");
var PythonProcessCallbackHandler = (function (_super) {
    __extends(PythonProcessCallbackHandler, _super);
    function PythonProcessCallbackHandler(process, stream, idDispenser) {
        _super.call(this);
        this.process = process;
        this.stream = stream;
        this.idDispenser = idDispenser;
    }
    PythonProcessCallbackHandler.prototype.HandleIncomingData = function () {
        if (this.stream.Length === 0) {
            return;
        }
        this.stream.BeginTransaction();
        var cmd = this.stream.ReadAsciiString(4);
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        switch (cmd) {
            case "MODL":
                this.HandleModuleLoad();
                break;
            case "LOAD":
                this.HandleProcessLoad();
                break;
            case "STPD":
                this.HandleStepDone();
                break;
            case "NEWT":
                this.HandleThreadCreate();
                break;
            case "EXTT":
                this.HandleThreadExit();
                break;
            case "THRF":
                this.HandleThreadFrameList();
                break;
            case "OUTP":
                this.HandleDebuggerOutput();
                break;
            case "BRKS":
                this.HandleBreakPointSet();
                break;
            case "BRKF":
                this.HandleBreakPointFailed();
                break;
            case "BRKH":
                this.HandleBreakPointHit();
                break;
            case "DETC":
                this.HandleDetach();
                break; // detach, report process exit
            case "LAST":
                this.HandleLast();
                break;
            case "CHLD":
                this.HandleEnumChildren();
                break;
            case "REQH":
                this.HandleRequestHandlers();
                break;
            case "EXCP":
                this.HandleException();
                break;
            case "EXCR":
                this.HandleExecutionResult();
                break;
            case "EXCE":
                this.HandleExecutionException();
                break;
            case "ASBR":
                this.HandleAsyncBreak();
                break;
            default: {
                this.emit("error", "Unhandled command '" + cmd + "'");
            }
        }
        if (this.stream.HasInsufficientDataForReading) {
            // Most possibly due to insufficient data
            this.stream.RollBackTransaction();
            return;
        }
        this.stream.EndTransaction();
        if (this.stream.Length > 0) {
            this.HandleIncomingData();
        }
    };
    Object.defineProperty(PythonProcessCallbackHandler.prototype, "LanguageVersion", {
        get: function () {
            return Contracts_2.PythonLanguageVersion.Is2;
        },
        enumerable: true,
        configurable: true
    });
    PythonProcessCallbackHandler.prototype.HandleDetach = function () {
        this.emit("detach");
    };
    PythonProcessCallbackHandler.prototype.HandleLast = function () {
        this.stream.Write(ProxyCommands_1.Commands.LastAckCommandBytes);
        this.emit("last");
    };
    PythonProcessCallbackHandler.prototype.HandleModuleLoad = function () {
        var moduleId = this.stream.ReadInt32();
        var filename = this.stream.ReadString();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        if (filename != null) {
            this.emit("moduleLoaded", utils.CreatePythonModule(moduleId, filename));
        }
    };
    PythonProcessCallbackHandler.prototype.HandleDebuggerOutput = function () {
        var threadId = this.stream.ReadInt64();
        var output = this.stream.ReadString();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var pyThread;
        if (this.process.Threads.has(threadId)) {
            pyThread = this.process.Threads.get(threadId);
        }
        this.emit("output", pyThread, output);
    };
    PythonProcessCallbackHandler.prototype.HandleThreadCreate = function () {
        var threadId = this.stream.ReadInt64();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var pyThread = utils.CreatePythonThread(threadId, this._createdFirstThread, this.process);
        this._createdFirstThread = true;
        this.process.Threads.set(threadId, pyThread);
        this.emit("threadCreated", pyThread);
    };
    PythonProcessCallbackHandler.prototype.HandleThreadExit = function () {
        var threadId = this.stream.ReadInt64();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var thread;
        if (this.process.Threads.has(threadId)) {
            thread = this.process.Threads.get(threadId);
            this.emit("threadExited", thread);
        }
    };
    PythonProcessCallbackHandler.prototype.HandleProcessLoad = function () {
        var threadId = this.stream.ReadInt64();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var pyThread;
        if (this.process.Threads.has(threadId)) {
            pyThread = this.process.Threads.get(threadId);
        }
        this.emit("processLoaded", pyThread);
    };
    PythonProcessCallbackHandler.prototype.HandleStepDone = function () {
        var threadId = this.stream.ReadInt64();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var pyThread;
        if (this.process.Threads.has(threadId)) {
            pyThread = this.process.Threads.get(threadId);
        }
        this.emit("stepCompleted", pyThread);
    };
    PythonProcessCallbackHandler.prototype.HandleAsyncBreak = function () {
        var threadId = this.stream.ReadInt64();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var pyThread;
        if (this.process.Threads.has(threadId)) {
            pyThread = this.process.Threads.get(threadId);
        }
        this.emit("asyncBreakCompleted", pyThread);
    };
    PythonProcessCallbackHandler.prototype.HandleBreakPointFailed = function () {
        var id = this.stream.ReadInt32();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        this.emit("breakpointNotSet", id);
    };
    PythonProcessCallbackHandler.prototype.HandleBreakPointSet = function () {
        var id = this.stream.ReadInt32();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        this.emit("breakpointSet", id);
    };
    PythonProcessCallbackHandler.prototype.HandleBreakPointHit = function () {
        var breakId = this.stream.ReadInt32();
        var threadId = this.stream.ReadInt64();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var pyThread;
        if (this.process.Threads.has(threadId)) {
            pyThread = this.process.Threads.get(threadId);
        }
        this.emit("breakpointHit", pyThread, breakId);
    };
    PythonProcessCallbackHandler.prototype.HandleRequestHandlers = function () {
        var _this = this;
        var filename = this.stream.ReadString();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var fullyQualifiedFileName = filename;
        if (!path.isAbsolute(fullyQualifiedFileName)) {
            fullyQualifiedFileName = path.join(this.process.ProgramDirectory, filename);
        }
        this.GetHandledExceptionRanges(fullyQualifiedFileName).then(function (statements) {
            _this.stream.Write(ProxyCommands_1.Commands.SetExceptionHandlerInfoCommandBytes);
            _this.stream.WriteString(filename);
            _this.stream.WriteInt32(statements.length);
            statements.forEach(function (statement) {
                _this.stream.WriteInt32(statement.startLine);
                _this.stream.WriteInt32(statement.endLine);
                statement.expressions.forEach(function (expr) {
                    _this.stream.WriteString(expr);
                });
                _this.stream.WriteString("-");
            });
        });
    };
    PythonProcessCallbackHandler.prototype.GetHandledExceptionRanges = function (fileName) {
        return TryParser_1.ExtractTryStatements(fileName).then(function (statements) {
            var exceptionRanges = [];
            statements.forEach(function (statement) {
                var expressions = [];
                if (statement.Exceptions.length === 0 || statement.Exceptions.indexOf("*") >= 0) {
                    expressions = ["*"];
                }
                else {
                    statement.Exceptions.forEach(function (ex) {
                        if (expressions.indexOf(ex) === -1) {
                            expressions.push(ex);
                        }
                    });
                }
                exceptionRanges.push({
                    endLine: statement.EndLineNumber,
                    startLine: statement.StartLineNumber,
                    expressions: expressions
                });
            });
            return exceptionRanges;
        });
    };
    PythonProcessCallbackHandler.prototype.HandleException = function () {
        var typeName = this.stream.ReadString();
        var threadId = this.stream.ReadInt64();
        var breakType = this.stream.ReadInt32();
        var desc = this.stream.ReadString();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        if (typeName != null && desc != null) {
            var ex = {
                TypeName: typeName,
                Description: desc
            };
            var pyThread = void 0;
            if (this.process.Threads.has(threadId)) {
                pyThread = this.process.Threads.get(threadId);
            }
            this.emit("exceptionRaised", pyThread, ex, breakType === 1 /* BREAK_TYPE_UNHANLDED */);
        }
        this._stoppedForException = true;
    };
    PythonProcessCallbackHandler.prototype.HandleExecutionException = function () {
        var execId = this.stream.ReadInt32();
        var exceptionText = this.stream.ReadString();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var cmd = null;
        if (this.process.PendingExecuteCommands.has(execId)) {
            cmd = this.process.PendingExecuteCommands.get(execId);
            if (this.process.PendingExecuteCommands.has(execId)) {
                this.process.PendingExecuteCommands.delete(execId);
            }
            cmd.PromiseReject(exceptionText);
        }
        this.process.ProcessPendingExecuteCommands();
        this.idDispenser.Free(execId);
    };
    PythonProcessCallbackHandler.prototype.HandleExecutionResult = function () {
        var execId = this.stream.ReadInt32();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var cmd = null;
        if (this.process.PendingExecuteCommands.has(execId)) {
            cmd = this.process.PendingExecuteCommands.get(execId);
        }
        if (cmd === null) {
            // Passing null for parameters other than stream is okay as long
            // as we drop the result.
            this.ReadPythonObject(null, null, null);
            if (this.stream.HasInsufficientDataForReading) {
                return;
            }
        }
        else {
            var evalResult = this.ReadPythonObject(cmd.Text, null, cmd.Frame);
            if (this.stream.HasInsufficientDataForReading) {
                return;
            }
            cmd.PromiseResolve(evalResult);
        }
        if (cmd != null) {
            if (this.process.PendingExecuteCommands.has(execId)) {
                this.process.PendingExecuteCommands.delete(execId);
            }
        }
        this.process.ProcessPendingExecuteCommands();
        this.idDispenser.Free(execId);
    };
    PythonProcessCallbackHandler.prototype.HandleEnumChildren = function () {
        var execId = this.stream.ReadInt32();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var cmd = null;
        if (this.process.PendingChildEnumCommands.has(execId)) {
            cmd = this.process.PendingChildEnumCommands.get(execId);
        }
        var childrenCount = this.stream.ReadInt32();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var children = [];
        for (var childCount = 0; childCount < childrenCount; childCount++) {
            var childName = this.stream.ReadString();
            var childExpr = this.stream.ReadString();
            if (this.stream.HasInsufficientDataForReading) {
                return;
            }
            var obj = this.ReadPythonObject(childExpr, childName, cmd === null ? null : cmd.Frame);
            if (this.stream.HasInsufficientDataForReading) {
                return;
            }
            children.push(obj);
        }
        if (cmd != null) {
            cmd.PromiseResolve(children);
            if (this.process.PendingChildEnumCommands.has(execId)) {
                this.process.PendingChildEnumCommands.delete(execId);
            }
        }
        this.idDispenser.Free(execId);
    };
    PythonProcessCallbackHandler.prototype.HandleThreadFrameList = function () {
        var frames = [];
        var threadId = this.stream.ReadInt64();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        var pyThread;
        if (this.process.Threads.has(threadId)) {
            pyThread = this.process.Threads.get(threadId);
        }
        var threadName = this.stream.ReadString();
        var frameCount = this.stream.ReadInt32();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        for (var i = 0; i < frameCount; i++) {
            var startLine = this.stream.ReadInt32();
            var endLine = this.stream.ReadInt32();
            var lineNo = this.stream.ReadInt32();
            var frameName = this.stream.ReadString();
            var filename = this.stream.ReadString();
            var argCount = this.stream.ReadInt32();
            var frameKind = this.stream.ReadInt32();
            if (this.stream.HasInsufficientDataForReading) {
                return;
            }
            var frame = null;
            if (pyThread != null) {
                switch (frameKind) {
                    case Contracts_1.FrameKind.Django: {
                        var sourceFile = this.stream.ReadString();
                        var sourceLine = this.stream.ReadInt32();
                        if (this.stream.HasInsufficientDataForReading) {
                            return;
                        }
                        var djangoFrame = {
                            EndLine: endLine, FileName: filename,
                            FrameId: i, FunctionName: frameName,
                            Kind: frameKind, LineNo: lineNo,
                            Locals: [], Parameters: [],
                            Thread: pyThread, SourceFile: sourceFile,
                            SourceLine: sourceLine, StartLine: startLine
                        };
                        frame = djangoFrame;
                        break;
                    }
                    default: {
                        frame = {
                            EndLine: endLine, FileName: filename,
                            FrameId: i, FunctionName: frameName,
                            Kind: frameKind, LineNo: lineNo,
                            Locals: [], Parameters: [],
                            Thread: pyThread, StartLine: startLine
                        };
                        break;
                    }
                }
            }
            var varCount = this.stream.ReadInt32();
            if (this.stream.HasInsufficientDataForReading) {
                return;
            }
            var variables = [];
            for (var j = 0; j < varCount; j++) {
                var name = this.stream.ReadString();
                if (this.stream.HasInsufficientDataForReading) {
                    return;
                }
                if (frame != null) {
                    var variableObj = this.ReadPythonObject(name, name, frame);
                    if (this.stream.HasInsufficientDataForReading) {
                        return;
                    }
                    variables.push(variableObj);
                }
            }
            if (frame != null) {
                frame.Parameters = variables.splice(0, argCount);
                frame.Locals = variables;
                frames.push(frame);
            }
        }
        if (pyThread != null) {
            pyThread.Frames = frames;
            if (typeof threadName === "string" && threadName.length > 0) {
                pyThread.Name = threadName;
            }
        }
    };
    PythonProcessCallbackHandler.prototype.ReadPythonObject = function (expr, childName, frame) {
        var objRepr = this.stream.ReadString();
        var hexRepr = this.stream.ReadString();
        var typeName = this.stream.ReadString();
        var length = this.stream.ReadInt64();
        var flags = this.stream.ReadInt32();
        if (this.stream.HasInsufficientDataForReading) {
            return;
        }
        if ((flags & Contracts_2.PythonEvaluationResultFlags.Raw) === 0 && ((typeName === "unicode" && this.LanguageVersion === Contracts_2.PythonLanguageVersion.Is2)
            || (typeName === "str" && this.LanguageVersion === Contracts_2.PythonLanguageVersion.Is3))) {
            objRepr = utils.FixupEscapedUnicodeChars(objRepr);
        }
        if (typeName === "bool") {
            hexRepr = null;
        }
        var pythonEvaluationResult = {
            ChildName: childName,
            Process: this.process,
            IsExpandable: (flags & Contracts_2.PythonEvaluationResultFlags.Expandable) > 0,
            Flags: flags,
            StringRepr: objRepr,
            HexRepr: hexRepr,
            TypeName: typeName,
            Expression: expr,
            Length: length,
            Frame: frame
        };
        return pythonEvaluationResult;
    };
    return PythonProcessCallbackHandler;
}(events_1.EventEmitter));
exports.PythonProcessCallbackHandler = PythonProcessCallbackHandler;
//# sourceMappingURL=PythonProcessCallbackHandler.js.map