'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var child_process = require('child_process');
var vscode = require('vscode');
var path = require('path');
var settings = require('./../common/configSettings');
var logger = require('./../common/logger');
var telemetryHelper = require("../common/telemetry");
var utils_1 = require("../common/utils");
var IS_WINDOWS = /^win/.test(process.platform);
var proc;
var pythonSettings = settings.PythonSettings.getInstance();
var pythonVSCodeTypeMappings = new Map();
var mappings = {
    "none": vscode.CompletionItemKind.Value,
    "type": vscode.CompletionItemKind.Class,
    "tuple": vscode.CompletionItemKind.Class,
    "dict": vscode.CompletionItemKind.Class,
    "dictionary": vscode.CompletionItemKind.Class,
    "function": vscode.CompletionItemKind.Function,
    "lambda": vscode.CompletionItemKind.Function,
    "generator": vscode.CompletionItemKind.Function,
    "class": vscode.CompletionItemKind.Class,
    "instance": vscode.CompletionItemKind.Reference,
    "method": vscode.CompletionItemKind.Method,
    "builtin": vscode.CompletionItemKind.Class,
    "builtinfunction": vscode.CompletionItemKind.Function,
    "module": vscode.CompletionItemKind.Module,
    "file": vscode.CompletionItemKind.File,
    "xrange": vscode.CompletionItemKind.Class,
    "slice": vscode.CompletionItemKind.Class,
    "traceback": vscode.CompletionItemKind.Class,
    "frame": vscode.CompletionItemKind.Class,
    "buffer": vscode.CompletionItemKind.Class,
    "dictproxy": vscode.CompletionItemKind.Class,
    "funcdef": vscode.CompletionItemKind.Function,
    "property": vscode.CompletionItemKind.Property,
    "import": vscode.CompletionItemKind.Module,
    "keyword": vscode.CompletionItemKind.Keyword,
    "constant": vscode.CompletionItemKind.Variable,
    "variable": vscode.CompletionItemKind.Variable,
    "value": vscode.CompletionItemKind.Value,
    "param": vscode.CompletionItemKind.Variable,
    "statement": vscode.CompletionItemKind.Keyword
};
Object.keys(mappings).forEach(function (key) {
    pythonVSCodeTypeMappings.set(key, mappings[key]);
});
var pythonVSCodeSymbolMappings = new Map();
var symbolMappings = {
    "none": vscode.SymbolKind.Variable,
    "type": vscode.SymbolKind.Class,
    "tuple": vscode.SymbolKind.Class,
    "dict": vscode.SymbolKind.Class,
    "dictionary": vscode.SymbolKind.Class,
    "function": vscode.SymbolKind.Function,
    "lambda": vscode.SymbolKind.Function,
    "generator": vscode.SymbolKind.Function,
    "class": vscode.SymbolKind.Class,
    "instance": vscode.SymbolKind.Class,
    "method": vscode.SymbolKind.Method,
    "builtin": vscode.SymbolKind.Class,
    "builtinfunction": vscode.SymbolKind.Function,
    "module": vscode.SymbolKind.Module,
    "file": vscode.SymbolKind.File,
    "xrange": vscode.SymbolKind.Array,
    "slice": vscode.SymbolKind.Class,
    "traceback": vscode.SymbolKind.Class,
    "frame": vscode.SymbolKind.Class,
    "buffer": vscode.SymbolKind.Array,
    "dictproxy": vscode.SymbolKind.Class,
    "funcdef": vscode.SymbolKind.Function,
    "property": vscode.SymbolKind.Property,
    "import": vscode.SymbolKind.Module,
    "keyword": vscode.SymbolKind.Variable,
    "constant": vscode.SymbolKind.Constant,
    "variable": vscode.SymbolKind.Variable,
    "value": vscode.SymbolKind.Variable,
    "param": vscode.SymbolKind.Variable,
    "statement": vscode.SymbolKind.Variable,
    "boolean": vscode.SymbolKind.Boolean,
    "int": vscode.SymbolKind.Number,
    "longlean": vscode.SymbolKind.Number,
    "float": vscode.SymbolKind.Number,
    "complex": vscode.SymbolKind.Number,
    "string": vscode.SymbolKind.String,
    "unicode": vscode.SymbolKind.String,
    "list": vscode.SymbolKind.Array
};
Object.keys(symbolMappings).forEach(function (key) {
    pythonVSCodeSymbolMappings.set(key, symbolMappings[key]);
});
function getMappedVSCodeType(pythonType) {
    if (pythonVSCodeTypeMappings.has(pythonType)) {
        return pythonVSCodeTypeMappings.get(pythonType);
    }
    else {
        return vscode.CompletionItemKind.Keyword;
    }
}
function getMappedVSCodeSymbol(pythonType) {
    if (pythonVSCodeTypeMappings.has(pythonType)) {
        return pythonVSCodeSymbolMappings.get(pythonType);
    }
    else {
        return vscode.SymbolKind.Variable;
    }
}
(function (CommandType) {
    CommandType[CommandType["Arguments"] = 0] = "Arguments";
    CommandType[CommandType["Completions"] = 1] = "Completions";
    CommandType[CommandType["Usages"] = 2] = "Usages";
    CommandType[CommandType["Definitions"] = 3] = "Definitions";
    CommandType[CommandType["Symbols"] = 4] = "Symbols";
})(exports.CommandType || (exports.CommandType = {}));
var CommandType = exports.CommandType;
var commandNames = new Map();
commandNames.set(CommandType.Arguments, "arguments");
commandNames.set(CommandType.Completions, "completions");
commandNames.set(CommandType.Definitions, "definitions");
commandNames.set(CommandType.Usages, "usages");
commandNames.set(CommandType.Symbols, "names");
var JediProxy = (function (_super) {
    __extends(JediProxy, _super);
    function JediProxy(context) {
        _super.call(this, killProcess);
        this.cmdId = 0;
        context.subscriptions.push(this);
        initialize(context.asAbsolutePath("."));
    }
    JediProxy.prototype.getNextCommandId = function () {
        return this.cmdId++;
    };
    JediProxy.prototype.sendCommand = function (cmd) {
        return sendCommand(cmd);
    };
    return JediProxy;
}(vscode.Disposable));
exports.JediProxy = JediProxy;
// keep track of the directory so we can re-spawn the process
var pythonProcessCWD = "";
function initialize(dir) {
    pythonProcessCWD = dir;
    spawnProcess(path.join(dir, "pythonFiles"));
}
// Check if settings changes
var lastKnownPythonInterpreter = pythonSettings.pythonPath;
pythonSettings.on('change', onPythonSettingsChanged);
function onPythonSettingsChanged() {
    if (lastKnownPythonInterpreter === pythonSettings.pythonPath) {
        return;
    }
    killProcess();
    clearPendingRequests();
    initialize(pythonProcessCWD);
}
function clearPendingRequests() {
    commandQueue = [];
    commands.forEach(function (item) {
        item.resolve();
    });
    commands.clear();
}
var previousData = "";
var commands = new Map();
var commandQueue = [];
function killProcess() {
    try {
        if (proc) {
            proc.kill();
        }
    }
    catch (ex) { }
    proc = null;
}
function handleError(source, errorMessage) {
    logger.error(source + ' jediProxy', "Error (" + source + ") " + errorMessage);
}
function spawnProcess(dir) {
    try {
        var environmentVariables = { 'PYTHONUNBUFFERED': '1' };
        for (var setting in process.env) {
            if (!environmentVariables[setting]) {
                environmentVariables[setting] = process.env[setting];
            }
        }
        logger.log('child_process.spawn in jediProxy', 'Value of pythonSettings.pythonPath is :' + pythonSettings.pythonPath);
        proc = child_process.spawn(pythonSettings.pythonPath, ["completion.py"], {
            cwd: dir,
            env: environmentVariables
        });
    }
    catch (ex) {
        return handleError("spawnProcess", ex.message);
    }
    proc.stderr.on("data", function (data) {
        handleError("stderr", data);
    });
    proc.on("end", function (end) {
        logger.error('spawnProcess.end', "End - " + end);
    });
    proc.on("error", function (error) {
        handleError("error", error);
    });
    proc.stdout.on("data", function (data) {
        //Possible there was an exception in parsing the data returned
        //So append the data then parse it
        var dataStr = previousData = previousData + data + "";
        var responses;
        try {
            responses = dataStr.split(/\r?\n/g).filter(function (line) { return line.length > 0; }).map(function (resp) { return JSON.parse(resp); });
            previousData = "";
        }
        catch (ex) {
            // Possible we've only received part of the data, hence don't clear previousData
            // Don't log errors when we haven't received the entire response
            if (ex.message !== 'Unexpected end of input') {
                handleError("stdout", ex.message);
            }
            return;
        }
        responses.forEach(function (response) {
            if (response["argments"]) {
                var index = commandQueue.indexOf(cmd.id);
                commandQueue.splice(index, 1);
                return;
            }
            var responseId = response["id"];
            var cmd = commands.get(responseId);
            if (typeof cmd === "object" && cmd !== null) {
                commands.delete(responseId);
                var index = commandQueue.indexOf(cmd.id);
                commandQueue.splice(index, 1);
                if (cmd.delays) {
                    cmd.delays.stop();
                    telemetryHelper.sendTelemetryEvent(cmd.telemetryEvent, null, cmd.delays.toMeasures());
                }
                // Check if this command has expired
                if (cmd.token.isCancellationRequested) {
                    return;
                }
                switch (cmd.command) {
                    case CommandType.Completions: {
                        var results = response['results'];
                        if (results.length > 0) {
                            results.forEach(function (item) {
                                item.type = getMappedVSCodeType(item.type);
                                item.kind = getMappedVSCodeSymbol(item.type);
                            });
                            var completionResult = {
                                items: results,
                                requestId: cmd.id
                            };
                            cmd.resolve(completionResult);
                        }
                        break;
                    }
                    case CommandType.Definitions: {
                        var defs = response['results'];
                        if (defs.length > 0) {
                            var def = defs[0];
                            var defResult = {
                                requestId: cmd.id,
                                definition: {
                                    columnIndex: Number(def.column),
                                    fileName: def.fileName,
                                    lineIndex: Number(def.line),
                                    text: def.text,
                                    type: getMappedVSCodeType(def.type),
                                    kind: getMappedVSCodeSymbol(def.type)
                                }
                            };
                            cmd.resolve(defResult);
                        }
                        break;
                    }
                    case CommandType.Symbols: {
                        var defs = response['results'];
                        if (defs.length > 0) {
                            var defResults = {
                                requestId: cmd.id,
                                definitions: []
                            };
                            defResults.definitions = defs.map(function (def) {
                                return {
                                    columnIndex: def.column,
                                    fileName: def.fileName,
                                    lineIndex: def.line,
                                    text: def.text,
                                    type: getMappedVSCodeType(def.type),
                                    kind: getMappedVSCodeSymbol(def.type)
                                };
                            });
                            cmd.resolve(defResults);
                        }
                        break;
                    }
                    case CommandType.Usages: {
                        var defs = response['results'];
                        if (defs.length > 0) {
                            var refResult = {
                                requestId: cmd.id,
                                references: defs.map(function (item) {
                                    return {
                                        columnIndex: item.column,
                                        fileName: item.fileName,
                                        lineIndex: item.line - 1,
                                        moduleName: item.moduleName,
                                        name: item.name
                                    };
                                })
                            };
                            cmd.resolve(refResult);
                        }
                        break;
                    }
                    case CommandType.Arguments: {
                        var defs_1 = response["results"];
                        cmd.resolve({
                            requestId: cmd.id,
                            definitions: defs_1
                        });
                        break;
                    }
                }
            }
            //Ok, check if too many pending requets
            if (commandQueue.length > 10) {
                var items = commandQueue.splice(0, commandQueue.length - 10);
                items.forEach(function (id) {
                    if (commands.has(id)) {
                        commands.delete(id);
                    }
                });
            }
        });
    });
}
function sendCommand(cmd) {
    return new Promise(function (resolve, reject) {
        if (!proc) {
            return reject("Python proc not initialized");
        }
        var exexcutionCmd = cmd;
        var payload = createPayload(exexcutionCmd);
        exexcutionCmd.resolve = resolve;
        exexcutionCmd.reject = reject;
        exexcutionCmd.delays = new telemetryHelper.Delays();
        try {
            proc.stdin.write(JSON.stringify(payload) + "\n");
            commands.set(exexcutionCmd.id, exexcutionCmd);
            commandQueue.push(exexcutionCmd.id);
        }
        catch (ex) {
            //If 'This socket is closed.' that means process didn't start at all (at least not properly)
            if (ex.message === "This socket is closed.") {
                killProcess();
            }
            else {
                handleError("sendCommand", ex.message);
            }
            reject(ex.message);
        }
    });
}
function createPayload(cmd) {
    var payload = {
        id: cmd.id,
        prefix: "",
        lookup: commandNames.get(cmd.command),
        path: cmd.fileName,
        source: cmd.source,
        line: cmd.lineIndex,
        column: cmd.columnIndex,
        config: getConfig()
    };
    if (cmd.command === CommandType.Symbols) {
        delete payload.column;
        delete payload.line;
    }
    return payload;
}
var lastKnownPythonPath = null;
var additionalAutoCopletePaths = [];
function getPathFromPythonCommand(args) {
    return utils_1.execPythonFile(pythonSettings.pythonPath, args, vscode.workspace.rootPath).then(function (stdout) {
        if (stdout.length === 0) {
            return "";
        }
        var lines = stdout.split(/\r?\n/g).filter(function (line) { return line.length > 0; });
        return utils_1.validatePath(lines[0]);
    }).catch(function () {
        return "";
    });
}
vscode.workspace.onDidChangeConfiguration(onConfigChanged);
onConfigChanged();
function onConfigChanged() {
    // We're only interested in changes to the python path
    if (lastKnownPythonPath === pythonSettings.pythonPath) {
        return;
    }
    lastKnownPythonPath = pythonSettings.pythonPath;
    var filePaths = [
        // Sysprefix
        getPathFromPythonCommand(["-c", "import sys;print(sys.prefix)"]),
        // exeucutable path
        getPathFromPythonCommand(["-c", "import sys;print(sys.executable)"]),
        // Python specific site packages
        getPathFromPythonCommand(["-c", "from distutils.sysconfig import get_python_lib; print(get_python_lib())"]),
        // Python global site packages, as a fallback in case user hasn't installed them in custom environment
        getPathFromPythonCommand(["-m", "site", "--user-site"]),
    ];
    Promise.all(filePaths).then(function (paths) {
        // Last item return a path, we need only the folder
        if (paths[1].length > 0) {
            paths[1] = path.dirname(paths[1]);
        }
        // On windows we also need the libs path (second item will return c:\xxx\lib\site-packages)
        // This is returned by "from distutils.sysconfig import get_python_lib; print(get_python_lib())"
        if (IS_WINDOWS && paths[2].length > 0) {
            paths.splice(3, 0, path.join(paths[2], ".."));
        }
        additionalAutoCopletePaths = paths.filter(function (p) { return p.length > 0; });
    });
}
function getConfig() {
    // Add support for paths relative to workspace
    var extraPaths = pythonSettings.autoComplete.extraPaths.map(function (extraPath) {
        if (path.isAbsolute(extraPath)) {
            return extraPath;
        }
        return path.join(vscode.workspace.rootPath, extraPath);
    });
    // Always add workspace path into extra paths
    extraPaths.unshift(vscode.workspace.rootPath);
    var distinctExtraPaths = extraPaths.concat(additionalAutoCopletePaths).filter(function (value, index, self) { return self.indexOf(value) === index; });
    return {
        extraPaths: distinctExtraPaths,
        useSnippets: false,
        caseInsensitiveCompletion: true,
        showDescriptions: true,
        fuzzyMatcher: true
    };
}
var jediProxy_singleton = null;
var JediProxyHandler = (function () {
    function JediProxyHandler(context, defaultCallbackData, parseResponse, jediProxy) {
        if (jediProxy === void 0) { jediProxy = null; }
        if (jediProxy) {
            this.jediProxy = jediProxy;
        }
        else {
            if (pythonSettings.devOptions.indexOf("SINGLE_JEDI") >= 0) {
                if (jediProxy_singleton === null) {
                    jediProxy_singleton = new JediProxy(context);
                }
                this.jediProxy = jediProxy_singleton;
            }
            else {
                this.jediProxy = new JediProxy(context);
            }
        }
        this.defaultCallbackData = defaultCallbackData;
        this.parseResponse = parseResponse;
    }
    Object.defineProperty(JediProxyHandler.prototype, "JediProxy", {
        get: function () {
            return this.jediProxy;
        },
        enumerable: true,
        configurable: true
    });
    JediProxyHandler.prototype.sendCommand = function (cmd, resolve, token) {
        var _this = this;
        var executionCmd = cmd;
        executionCmd.id = executionCmd.id || this.jediProxy.getNextCommandId();
        if (this.cancellationTokenSource) {
            try {
                this.cancellationTokenSource.cancel();
            }
            catch (ex) { }
        }
        this.cancellationTokenSource = new vscode.CancellationTokenSource();
        executionCmd.token = this.cancellationTokenSource.token;
        this.jediProxy.sendCommand(executionCmd).then(function (data) { return _this.onResolved(data); }, function () { });
        this.lastCommandId = executionCmd.id;
        this.lastToken = token;
        this.promiseResolve = resolve;
    };
    JediProxyHandler.prototype.onResolved = function (data) {
        if (this.lastToken.isCancellationRequested || !data || data.requestId !== this.lastCommandId) {
            this.promiseResolve(this.defaultCallbackData);
        }
        if (data) {
            this.promiseResolve(this.parseResponse(data));
        }
        else {
            this.promiseResolve(this.defaultCallbackData);
        }
    };
    return JediProxyHandler;
}());
exports.JediProxyHandler = JediProxyHandler;
//# sourceMappingURL=jediProxy.js.map