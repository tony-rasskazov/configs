"use strict";
var path = require("path");
var fs = require("fs");
var child_process = require("child_process");
var editor_1 = require("../common/editor");
var PythonImportSortProvider = (function () {
    function PythonImportSortProvider() {
    }
    PythonImportSortProvider.prototype.sortImports = function (extensionDir, document) {
        if (document.lineCount === 1) {
            return Promise.resolve([]);
        }
        return new Promise(function (resolve, reject) {
            // isort does have the ability to read from the process input stream and return the formatted code out of the output stream
            // However they don't support returning the diff of the formatted text when reading data from the input stream
            // Yes getting text formatted that way avoids having to create a temporary file, however the diffing will have
            // to be done here in node (extension), i.e. extension cpu, i.e. les responsive solution
            var importScript = path.join(extensionDir, "pythonFiles", "sortImports.py");
            var tmpFileCreated = document.isDirty;
            var filePromise = tmpFileCreated ? editor_1.getTempFileWithDocumentContents(document) : Promise.resolve(document.fileName);
            filePromise.then(function (filePath) {
                child_process.exec("python \"" + importScript + "\" \"" + filePath + "\" --diff", function (error, stdout, stderr) {
                    if (tmpFileCreated) {
                        fs.unlink(filePath);
                    }
                    if (error || (stderr && stderr.length > 0)) {
                        return reject(error ? error : stderr);
                    }
                    var formattedText = stdout;
                    var edits = editor_1.getTextEditsFromPatch(document.getText(), stdout);
                    resolve(edits);
                });
            }).catch(reject);
        });
    };
    return PythonImportSortProvider;
}());
exports.PythonImportSortProvider = PythonImportSortProvider;
//# sourceMappingURL=importSortProvider.js.map