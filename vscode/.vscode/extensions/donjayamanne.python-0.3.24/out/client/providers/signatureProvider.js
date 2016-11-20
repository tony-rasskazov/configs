"use strict";
var vscode_1 = require("vscode");
var proxy = require("./jediProxy");
var telemetryContracts = require("../common/telemetryContracts");
var DOCSTRING_PARAM_PATTERNS = [
    "\\s*:type\\s*PARAMNAME:\\s*([^\\n, ]+)",
    "\\s*:param\\s*(\\w?)\\s*PARAMNAME:[^\\n]+",
    "\\s*@type\\s*PARAMNAME:\\s*([^\\n, ]+)" // Epydoc
];
/**
 * Extrct the documentation for parameters from a given docstring
 *
 * @param {string} paramName Name of the parameter
 * @param {string} docString The docstring for the function
 * @returns {string} Docstring for the parameter
 */
function extractParamDocString(paramName, docString) {
    var paramDocString = "";
    // In docstring the '*' is escaped with a backslash
    paramName = paramName.replace(new RegExp("\\*", "g"), "\\\\\\*");
    DOCSTRING_PARAM_PATTERNS.forEach(function (pattern) {
        if (paramDocString.length > 0) {
            return;
        }
        pattern = pattern.replace("PARAMNAME", paramName);
        var regExp = new RegExp(pattern);
        var matches = regExp.exec(docString);
        if (matches && matches.length > 0) {
            paramDocString = matches[0];
            if (paramDocString.indexOf(":") >= 0) {
                paramDocString = paramDocString.substring(paramDocString.indexOf(":") + 1);
            }
            if (paramDocString.indexOf(":") >= 0) {
                paramDocString = paramDocString.substring(paramDocString.indexOf(":") + 1);
            }
        }
    });
    return paramDocString.trim();
}
var PythonSignatureProvider = (function () {
    function PythonSignatureProvider(context, jediProxy) {
        if (jediProxy === void 0) { jediProxy = null; }
        this.jediProxyHandler = new proxy.JediProxyHandler(context, null, PythonSignatureProvider.parseData, jediProxy);
    }
    PythonSignatureProvider.parseData = function (data) {
        if (data && Array.isArray(data.definitions) && data.definitions.length > 0) {
            var signature_1 = new vscode_1.SignatureHelp();
            signature_1.activeSignature = 0;
            data.definitions.forEach(function (def) {
                signature_1.activeParameter = def.paramindex;
                // Don't display the documentation, as vs code doesn't format the docmentation
                // i.e. line feeds are not respected, long content is stripped
                var sig = {
                    // documentation: def.docstring,
                    label: def.docstring,
                    parameters: []
                };
                sig.parameters = def.params.map(function (arg) {
                    if (arg.docstring.length === 0) {
                        arg.docstring = extractParamDocString(arg.name, def.docstring);
                    }
                    return {
                        documentation: arg.docstring.length > 0 ? arg.docstring : arg.description,
                        label: arg.description.length > 0 ? arg.description : arg.name
                    };
                });
                signature_1.signatures.push(sig);
            });
            return signature_1;
        }
        return new vscode_1.SignatureHelp();
    };
    PythonSignatureProvider.prototype.provideSignatureHelp = function (document, position, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cmd = {
                telemetryEvent: telemetryContracts.IDE.Symbol,
                command: proxy.CommandType.Arguments,
                fileName: document.fileName,
                columnIndex: position.character,
                lineIndex: position.line,
                source: document.getText()
            };
            _this.jediProxyHandler.sendCommand(cmd, resolve, token);
        });
    };
    return PythonSignatureProvider;
}());
exports.PythonSignatureProvider = PythonSignatureProvider;
//# sourceMappingURL=signatureProvider.js.map