"use strict";
var utils_1 = require('./../../common/utils');
var vscode_1 = require('vscode');
var utils_2 = require('../../common/utils');
var terminal = null;
function run(file, args, cwd, token, outChannel) {
    return utils_1.execPythonFile(file, args, cwd, true, function (data) { return outChannel.append(data); }, token);
    // Bug, we cannot resolve this
    // Resolving here means that tests have completed
    // We need a way to determine that the tests have completed succefully.. hmm
    // We could use a hack, such as generating a textfile at the end of the command and monitoring.. hack hack hack
    // Or we could generate a shell script file and embed all of the hacks in here... hack hack hack...
    // return runTestInTerminal(file, args, cwd);
}
exports.run = run;
function runTestInTerminal(file, args, cwd) {
    return utils_2.getPythonInterpreterDirectory().then(function (pyPath) {
        var commands = [];
        if (utils_2.IS_WINDOWS) {
            commands.push("set PATH=%PATH%;" + pyPath);
        }
        else {
            commands.push("export PATH=$PATH:" + pyPath);
        }
        if (cwd !== vscode_1.workspace.rootPath) {
            commands.push("cd " + cwd);
        }
        commands.push(file + " " + args.join(' '));
        terminal = vscode_1.window.createTerminal("Python Test Log");
        return new Promise(function (resolve) {
            setTimeout(function () {
                terminal.show();
                terminal.sendText(commands.join(' && '));
                // Bug, we cannot resolve this
                // Resolving here means that tests have completed
                // We need a way to determine that the tests have completed succefully.. hmm
                resolve();
            }, 1000);
        });
    });
}
//# sourceMappingURL=runner.js.map