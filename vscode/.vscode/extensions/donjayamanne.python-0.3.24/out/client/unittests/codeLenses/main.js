"use strict";
var vscode = require('vscode');
var constants = require('../../common/constants');
var testFiles_1 = require('./testFiles');
function activateCodeLenses() {
    var disposables = [];
    disposables.push(vscode.languages.registerCodeLensProvider(constants.PythonLanguage, new testFiles_1.TestFileCodeLensProvider()));
    return {
        dispose: function () {
            disposables.forEach(function (d) { return d.dispose(); });
        }
    };
}
exports.activateCodeLenses = activateCodeLenses;
//# sourceMappingURL=main.js.map