"use strict";
// Solution for auto-formatting borrowed from the "go" language VSCode extension.
var vscode = require("vscode");
var yapfFormatter_1 = require("./../formatters/yapfFormatter");
var autoPep8Formatter_1 = require("./../formatters/autoPep8Formatter");
var telemetryHelper = require("../common/telemetry");
var telemetryContracts = require("../common/telemetryContracts");
function activateFormatOnSaveProvider(languageFilter, settings, outputChannel, workspaceRootPath) {
    var formatters = new Map();
    var pythonSettings = settings;
    var yapfFormatter = new yapfFormatter_1.YapfFormatter(outputChannel, settings, workspaceRootPath);
    var autoPep8 = new autoPep8Formatter_1.AutoPep8Formatter(outputChannel, settings, workspaceRootPath);
    formatters.set(yapfFormatter.Id, yapfFormatter);
    formatters.set(autoPep8.Id, autoPep8);
    // This is really ugly.  I'm not sure we can do better until
    // Code supports a pre-save event where we can do the formatting before
    // the file is written to disk.	
    var ignoreNextSave = new WeakSet();
    var subscription = vscode.workspace.onDidSaveTextDocument(function (document) {
        if (document.languageId !== languageFilter.language || ignoreNextSave.has(document)) {
            return;
        }
        var textEditor = vscode.window.activeTextEditor;
        if (pythonSettings.formatting.formatOnSave && textEditor.document === document) {
            var formatter_1 = formatters.get(pythonSettings.formatting.provider);
            var delays_1 = new telemetryHelper.Delays();
            formatter_1.formatDocument(document, null, null).then(function (edits) {
                if (edits.length === 0)
                    return false;
                return textEditor.edit(function (editBuilder) {
                    edits.forEach(function (edit) { return editBuilder.replace(edit.range, edit.newText); });
                });
            }).then(function (applied) {
                delays_1.stop();
                telemetryHelper.sendTelemetryEvent(telemetryContracts.IDE.Format, { Format_Provider: formatter_1.Id, Format_OnSave: "true" }, delays_1.toMeasures());
                ignoreNextSave.add(document);
                return applied ? document.save() : true;
            }).then(function () {
                ignoreNextSave.delete(document);
            }, function () {
                // Catch any errors and ignore so that we still trigger 
                // the file save.
            });
        }
    }, null, null);
    return subscription;
}
exports.activateFormatOnSaveProvider = activateFormatOnSaveProvider;
//# sourceMappingURL=formatOnSaveProvider.js.map