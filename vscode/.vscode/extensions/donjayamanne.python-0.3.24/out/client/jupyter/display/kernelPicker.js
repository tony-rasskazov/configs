"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var constants_1 = require('../../common/constants');
var KernelPicker = (function (_super) {
    __extends(KernelPicker, _super);
    function KernelPicker() {
        _super.call(this, function () { });
        this.disposables = [];
        this.registerCommands();
    }
    KernelPicker.prototype.dispose = function () {
        this.disposables.forEach(function (d) { return d.dispose(); });
    };
    KernelPicker.prototype.registerCommands = function () {
        this.disposables.push(vscode.commands.registerCommand(constants_1.Commands.Jupyter.Select_Kernel, this.selectkernel.bind(this)));
    };
    KernelPicker.prototype.selectkernel = function (language) {
        var _this = this;
        return new Promise(function (resolve) {
            var command = language ? constants_1.Commands.Jupyter.Get_All_KernelSpecs_For_Language : constants_1.Commands.Jupyter.Get_All_KernelSpecs;
            vscode.commands.executeCommand(command, language).then(function (kernelSpecs) {
                if (kernelSpecs.length === 0) {
                    return resolve();
                }
                _this.displayKernelPicker(kernelSpecs).then(resolve);
            });
        });
    };
    KernelPicker.prototype.displayKernelPicker = function (kernelspecs) {
        var items = kernelspecs.map(function (spec) {
            return {
                label: spec.display_name,
                description: spec.language,
                kernelspec: spec
            };
        });
        return new Promise(function (resolve) {
            vscode.window.showQuickPick(items, { placeHolder: 'Select a Kernel' }).then(function (item) {
                if (item) {
                    resolve(item.kernelspec);
                }
                else {
                    resolve();
                }
            });
        });
    };
    return KernelPicker;
}(vscode.Disposable));
exports.KernelPicker = KernelPicker;
//# sourceMappingURL=kernelPicker.js.map