"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var kernelPicker_1 = require('./kernelPicker');
var constants_1 = require('../../common/constants');
var JupyterDisplay = (function (_super) {
    __extends(JupyterDisplay, _super);
    function JupyterDisplay() {
        _super.call(this, function () { });
        this.disposables = [];
        this.disposables.push(new kernelPicker_1.KernelPicker());
        this.disposables.push(vscode.commands.registerCommand(constants_1.Commands.Jupyter.Kernel_Options, this.showKernelOptions.bind(this)));
    }
    JupyterDisplay.prototype.dispose = function () {
        this.disposables.forEach(function (d) { return d.dispose(); });
    };
    JupyterDisplay.prototype.showKernelOptions = function (selectedKernel) {
        var description = '';
        if (selectedKernel.display_name.toLowerCase().indexOf(selectedKernel.language.toLowerCase()) === -1) {
            description = selectedKernel.language;
        }
        var options = [
            {
                label: "Interrupt " + selectedKernel.display_name + " Kernel",
                description: description,
                command: constants_1.Commands.Jupyter.Kernel.Kernel_Interrupt,
                args: [selectedKernel]
            },
            {
                label: "Restart " + selectedKernel.display_name + " Kernel",
                description: description,
                command: constants_1.Commands.Jupyter.Kernel.Kernel_Restart,
                args: [selectedKernel]
            },
            {
                label: "Shut Down " + selectedKernel.display_name + " Kernel",
                description: description,
                command: constants_1.Commands.Jupyter.Kernel.Kernel_Shut_Down,
                args: [selectedKernel]
            },
            {
                label: " ",
                description: ' ',
                command: '',
                args: []
            },
            {
                label: "Select another " + selectedKernel.language + " Kernel",
                description: " ",
                command: constants_1.Commands.Jupyter.Select_Kernel,
                args: [selectedKernel.language]
            }
        ];
        vscode.window.showQuickPick(options).then(function (option) {
            if (!option || !option.command || option.command.length === 0) {
                return;
            }
            (_a = vscode.commands).executeCommand.apply(_a, [option.command].concat(option.args));
            var _a;
        });
    };
    return JupyterDisplay;
}(vscode.Disposable));
exports.JupyterDisplay = JupyterDisplay;
//# sourceMappingURL=main.js.map