"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode_debugadapter_1 = require("vscode-debugadapter");
var TelemetryEvent = (function (_super) {
    __extends(TelemetryEvent, _super);
    function TelemetryEvent(output, data) {
        _super.call(this, output, "telemetry");
        if (data) {
            this.body.data = data;
        }
    }
    return TelemetryEvent;
}(vscode_debugadapter_1.OutputEvent));
exports.TelemetryEvent = TelemetryEvent;
exports.DjangoApp = "DJANGO";
(function (DebugFlags) {
    DebugFlags[DebugFlags["None"] = 0] = "None";
    DebugFlags[DebugFlags["IgnoreCommandBursts"] = 1] = "IgnoreCommandBursts";
})(exports.DebugFlags || (exports.DebugFlags = {}));
var DebugFlags = exports.DebugFlags;
var DebugOptions = (function () {
    function DebugOptions() {
    }
    Object.defineProperty(DebugOptions, "WaitOnAbnormalExit", {
        get: function () { return "WaitOnAbnormalExit"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugOptions, "WaitOnNormalExit", {
        get: function () { return "WaitOnNormalExit"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugOptions, "RedirectOutput", {
        get: function () { return "RedirectOutput"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugOptions, "DjangoDebugging", {
        get: function () { return "DjangoDebugging"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugOptions, "DebugStdLib", {
        get: function () { return "DebugStdLib"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugOptions, "BreakOnSystemExitZero", {
        get: function () { return "BreakOnSystemExitZero"; },
        enumerable: true,
        configurable: true
    });
    return DebugOptions;
}());
exports.DebugOptions = DebugOptions;
(function (FrameKind) {
    FrameKind[FrameKind["None"] = 0] = "None";
    FrameKind[FrameKind["Python"] = 1] = "Python";
    FrameKind[FrameKind["Django"] = 2] = "Django";
})(exports.FrameKind || (exports.FrameKind = {}));
var FrameKind = exports.FrameKind;
;
(function (enum_EXCEPTION_STATE) {
    enum_EXCEPTION_STATE[enum_EXCEPTION_STATE["BREAK_MODE_NEVER"] = 0] = "BREAK_MODE_NEVER";
    enum_EXCEPTION_STATE[enum_EXCEPTION_STATE["BREAK_MODE_ALWAYS"] = 1] = "BREAK_MODE_ALWAYS";
    enum_EXCEPTION_STATE[enum_EXCEPTION_STATE["BREAK_MODE_UNHANDLED"] = 32] = "BREAK_MODE_UNHANDLED";
})(exports.enum_EXCEPTION_STATE || (exports.enum_EXCEPTION_STATE = {}));
var enum_EXCEPTION_STATE = exports.enum_EXCEPTION_STATE;
(function (PythonLanguageVersion) {
    PythonLanguageVersion[PythonLanguageVersion["Is2"] = 0] = "Is2";
    PythonLanguageVersion[PythonLanguageVersion["Is3"] = 1] = "Is3";
})(exports.PythonLanguageVersion || (exports.PythonLanguageVersion = {}));
var PythonLanguageVersion = exports.PythonLanguageVersion;
(function (PythonEvaluationResultReprKind) {
    PythonEvaluationResultReprKind[PythonEvaluationResultReprKind["Normal"] = 0] = "Normal";
    PythonEvaluationResultReprKind[PythonEvaluationResultReprKind["Raw"] = 1] = "Raw";
    PythonEvaluationResultReprKind[PythonEvaluationResultReprKind["RawLen"] = 2] = "RawLen";
})(exports.PythonEvaluationResultReprKind || (exports.PythonEvaluationResultReprKind = {}));
var PythonEvaluationResultReprKind = exports.PythonEvaluationResultReprKind;
(function (PythonEvaluationResultFlags) {
    PythonEvaluationResultFlags[PythonEvaluationResultFlags["None"] = 0] = "None";
    PythonEvaluationResultFlags[PythonEvaluationResultFlags["Expandable"] = 1] = "Expandable";
    PythonEvaluationResultFlags[PythonEvaluationResultFlags["MethodCall"] = 2] = "MethodCall";
    PythonEvaluationResultFlags[PythonEvaluationResultFlags["SideEffects"] = 4] = "SideEffects";
    PythonEvaluationResultFlags[PythonEvaluationResultFlags["Raw"] = 8] = "Raw";
    PythonEvaluationResultFlags[PythonEvaluationResultFlags["HasRawRepr"] = 16] = "HasRawRepr";
})(exports.PythonEvaluationResultFlags || (exports.PythonEvaluationResultFlags = {}));
var PythonEvaluationResultFlags = exports.PythonEvaluationResultFlags;
// Must be in sync with BREAKPOINT_CONDITION_* constants in visualstudio_py_debugger.py.
(function (PythonBreakpointConditionKind) {
    PythonBreakpointConditionKind[PythonBreakpointConditionKind["Always"] = 0] = "Always";
    PythonBreakpointConditionKind[PythonBreakpointConditionKind["WhenTrue"] = 1] = "WhenTrue";
    PythonBreakpointConditionKind[PythonBreakpointConditionKind["WhenChanged"] = 2] = "WhenChanged";
})(exports.PythonBreakpointConditionKind || (exports.PythonBreakpointConditionKind = {}));
var PythonBreakpointConditionKind = exports.PythonBreakpointConditionKind;
// Must be in sync with BREAKPOINT_PASS_COUNT_* constants in visualstudio_py_debugger.py.
(function (PythonBreakpointPassCountKind) {
    PythonBreakpointPassCountKind[PythonBreakpointPassCountKind["Always"] = 0] = "Always";
    PythonBreakpointPassCountKind[PythonBreakpointPassCountKind["Every"] = 1] = "Every";
    PythonBreakpointPassCountKind[PythonBreakpointPassCountKind["WhenEqual"] = 2] = "WhenEqual";
    PythonBreakpointPassCountKind[PythonBreakpointPassCountKind["WhenEqualOrGreater"] = 3] = "WhenEqualOrGreater";
})(exports.PythonBreakpointPassCountKind || (exports.PythonBreakpointPassCountKind = {}));
var PythonBreakpointPassCountKind = exports.PythonBreakpointPassCountKind;
//# sourceMappingURL=Contracts.js.map