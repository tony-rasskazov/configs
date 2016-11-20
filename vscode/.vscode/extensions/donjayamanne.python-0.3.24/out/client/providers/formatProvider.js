'use strict';
var yapfFormatter_1 = require('./../formatters/yapfFormatter');
var autoPep8Formatter_1 = require('./../formatters/autoPep8Formatter');
var telemetryHelper = require('../common/telemetry');
var telemetryContracts = require('../common/telemetryContracts');
var PythonFormattingEditProvider = (function () {
    function PythonFormattingEditProvider(context, outputChannel, settings, workspaceRootPath) {
        this.settings = settings;
        this.formatters = new Map();
        var yapfFormatter = new yapfFormatter_1.YapfFormatter(outputChannel, settings, workspaceRootPath);
        var autoPep8 = new autoPep8Formatter_1.AutoPep8Formatter(outputChannel, settings, workspaceRootPath);
        this.formatters.set(yapfFormatter.Id, yapfFormatter);
        this.formatters.set(autoPep8.Id, autoPep8);
    }
    PythonFormattingEditProvider.prototype.provideDocumentFormattingEdits = function (document, options, token) {
        return this.provideDocumentRangeFormattingEdits(document, null, options, token);
    };
    PythonFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits = function (document, range, options, token) {
        var formatter = this.formatters.get(this.settings.formatting.provider);
        var delays = new telemetryHelper.Delays();
        return formatter.formatDocument(document, options, token, range).then(function (edits) {
            delays.stop();
            telemetryHelper.sendTelemetryEvent(telemetryContracts.IDE.Format, { Format_Provider: formatter.Id }, delays.toMeasures());
            return edits;
        });
    };
    return PythonFormattingEditProvider;
}());
exports.PythonFormattingEditProvider = PythonFormattingEditProvider;
//# sourceMappingURL=formatProvider.js.map