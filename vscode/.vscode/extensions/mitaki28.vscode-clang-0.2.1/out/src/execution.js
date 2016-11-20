"use strict";
var child_process = require('child_process');
(function (ErrorCode) {
    ErrorCode[ErrorCode["Cancel"] = 0] = "Cancel";
    ErrorCode[ErrorCode["BufferLimitExceed"] = 1] = "BufferLimitExceed";
})(exports.ErrorCode || (exports.ErrorCode = {}));
var ErrorCode = exports.ErrorCode;
function processString(cmd, args, opt, token, input) {
    return new Promise(function (resolve, reject) {
        var proc = child_process.execFile(cmd, args, opt, function (error, stdout, stderr) {
            if (error != null && error.message === 'stdout maxBuffer exceeded.') {
                reject({
                    errorCode: ErrorCode.BufferLimitExceed,
                    result: { error: error, stdout: stdout, stderr: stderr }
                });
            }
            else {
                resolve({ error: error, stdout: stdout, stderr: stderr });
            }
        });
        proc.stdin.end(input);
        token.onCancellationRequested(function () {
            process.nextTick(function () { return proc.kill(); });
            reject({
                errorCode: ErrorCode.Cancel
            });
        });
    });
}
exports.processString = processString;
//# sourceMappingURL=execution.js.map