"use strict";
var tmp = require('tmp');
function isNotInstalledError(error) {
    return typeof (error) === 'object' && error !== null && (error.code === 'ENOENT' || error.code === 127);
}
exports.isNotInstalledError = isNotInstalledError;
function createDeferred() {
    var resolve;
    var reject;
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });
    return {
        resolve: resolve, reject: reject, promise: promise
    };
}
exports.createDeferred = createDeferred;
function createTemporaryFile(extension, temporaryDirectory) {
    var options = { postfix: extension };
    if (temporaryDirectory) {
        options.dir = temporaryDirectory;
    }
    return new Promise(function (resolve, reject) {
        tmp.file(options, function _tempFileCreated(err, tmpFile, fd, cleanupCallback) {
            if (err) {
                return reject(err);
            }
            resolve({ filePath: tmpFile, cleanupCallback: cleanupCallback });
        });
    });
}
exports.createTemporaryFile = createTemporaryFile;
//# sourceMappingURL=helpers.js.map