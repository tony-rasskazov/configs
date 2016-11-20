"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var kernel_1 = require('./kernel');
var WSKernel = (function (_super) {
    __extends(WSKernel, _super);
    function WSKernel(kernelSpec, language, session) {
        _super.call(this, kernelSpec, language);
        this.session = session;
        this.session.statusChanged.connect(this.statusChangeHandler.bind(this));
        this.statusChangeHandler();
    }
    WSKernel.prototype.interrupt = function () {
        return this.session.kernel.interrupt();
    };
    ;
    WSKernel.prototype.shutdown = function () {
        return this.session.kernel.shutdown();
    };
    ;
    WSKernel.prototype.restart = function () {
        return this.session.kernel.restart();
    };
    ;
    WSKernel.prototype.statusChangeHandler = function () {
        this.raiseOnStatusChange(this.session.status);
    };
    ;
    WSKernel.prototype._execute = function (code, onResults, callWatches) {
        var _this = this;
        var future = this.session.kernel.execute({
            code: code
        });
        future.onIOPub = function (message) {
            if (callWatches && message.header.msg_type === 'status' && message.content.execution_state === 'idle') {
                _this._callWatchCallbacks();
            }
            if (onResults != null) {
                console.log('WSKernel: _execute:', message);
                var result = _this._parseIOMessage(message);
                if (result != null) {
                    return onResults(result);
                }
            }
        };
        future.onReply = function (message) {
            if (message.content.status === 'error') {
                return;
            }
            var result = {
                data: 'ok',
                type: 'text',
                stream: 'status'
            };
            return typeof onResults === 'function' ? onResults(result) : void 0;
        };
        return future.onStdin = function (message) {
            if (message.header.msg_type !== 'input_request') {
                return;
            }
            var prompt = message.content.prompt;
            vscode.window.showInputBox({ prompt: prompt }).then(function (reply) {
                _this.session.kernel.sendInputReply({ value: reply });
            });
        };
    };
    ;
    WSKernel.prototype.execute = function (code, onResults) {
        return this._execute(code, onResults, true);
    };
    ;
    WSKernel.prototype.executeWatch = function (code, onResults) {
        return this._execute(code, onResults, false);
    };
    ;
    WSKernel.prototype.complete = function (code, onResults) {
        return this.session.kernel.complete({
            code: code,
            cursor_pos: code.length
        }).then(function (message) {
            return typeof onResults === 'function' ? onResults(message.content) : void 0;
        });
    };
    ;
    WSKernel.prototype.inspect = function (code, cursor_pos, onResults) {
        return this.session.kernel.inspect({
            code: code,
            cursor_pos: cursor_pos,
            detail_level: 0
        }).then(function (message) {
            return typeof onResults === 'function' ? onResults({
                data: message.content.data,
                found: message.content.found
            }) : void 0;
        });
    };
    ;
    WSKernel.prototype.promptRename = function () {
        var _this = this;
        vscode.window.showInputBox({ prompt: 'Name your current session', value: this.session.path }).then(function (reply) {
            _this.session.rename(reply);
        });
    };
    ;
    WSKernel.prototype.dispose = function () {
        console.log('WSKernel: destroying jupyter-js-services Session');
        this.session.dispose();
        _super.prototype.dispose.call(this);
    };
    ;
    return WSKernel;
}(kernel_1.Kernel));
exports.WSKernel = WSKernel;
//# sourceMappingURL=ws-kernel.1.js.map