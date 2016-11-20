"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var constants_1 = require('../../common/constants');
var KernelStatus = (function (_super) {
    __extends(KernelStatus, _super);
    function KernelStatus() {
        var _this = this;
        _super.call(this, function () { });
        this.disposables = [];
        this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.statusBar.command = 'jupyter:proxyKernelOptionsCmd';
        this.disposables.push(this.statusBar);
        this.disposables.push(vscode.commands.registerCommand('jupyter:proxyKernelOptionsCmd', function () {
            vscode.commands.executeCommand(constants_1.Commands.Jupyter.Kernel_Options, _this.activeKernalDetails);
        }));
    }
    KernelStatus.prototype.setActiveKernel = function (kernelspec) {
        if (!kernelspec) {
            return this.statusBar.hide();
        }
        this.activeKernalDetails = kernelspec;
        this.statusBar.text = "$(flame)" + this.activeKernalDetails.display_name + " Kernel";
        this.statusBar.tooltip = kernelspec.display_name + " Kernel for " + kernelspec.language + "\nClick for options";
        this.statusBar.show();
    };
    KernelStatus.prototype.setKernelStatus = function (status) {
        this.statusBar.text = "$(flame)" + this.activeKernalDetails.display_name + " Kernel (" + status + ")";
    };
    KernelStatus.prototype.dispose = function () {
        this.disposables.forEach(function (d) { return d.dispose(); });
    };
    return KernelStatus;
}(vscode.Disposable));
exports.KernelStatus = KernelStatus;
//# sourceMappingURL=kernelStatus.js.map