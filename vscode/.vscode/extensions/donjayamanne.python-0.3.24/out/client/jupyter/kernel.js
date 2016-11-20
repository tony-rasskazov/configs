// http://jupyter-client.readthedocs.io/en/latest/messaging.html#to-do
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode = require('vscode');
var jmp = require('jmp');
var uuid = require('uuid');
var zmq = jmp.zmq;
var Kernel = (function (_super) {
    __extends(Kernel, _super);
    function Kernel(kernelSpec, language) {
        _super.call(this, function () { });
        this.kernelSpec = kernelSpec;
        this.language = language;
        this._onStatusChange = new vscode.EventEmitter();
        this.watchCallbacks = [];
    }
    Kernel.prototype.dispose = function () {
    };
    Object.defineProperty(Kernel.prototype, "onStatusChange", {
        get: function () {
            return this._onStatusChange.event;
        },
        enumerable: true,
        configurable: true
    });
    Kernel.prototype.raiseOnStatusChange = function (status) {
        this._onStatusChange.fire([this.kernelSpec, status]);
    };
    Kernel.prototype.addWatchCallback = function (watchCallback) {
        return this.watchCallbacks.push(watchCallback);
    };
    ;
    Kernel.prototype._callWatchCallbacks = function () {
        return this.watchCallbacks.forEach(function (watchCallback) {
            watchCallback();
        });
    };
    ;
    Kernel.prototype._parseIOMessage = function (message) {
        var result = this._parseDisplayIOMessage(message);
        if (result == null) {
            result = this._parseResultIOMessage(message);
        }
        if (result == null) {
            result = this._parseErrorIOMessage(message);
        }
        if (result == null) {
            result = this._parseStreamIOMessage(message);
        }
        return result;
    };
    ;
    Kernel.prototype._parseDisplayIOMessage = function (message) {
        if (message.header.msg_type === 'display_data') {
            return this._parseDataMime(message.content.data);
        }
        return null;
    };
    ;
    Kernel.prototype._parseResultIOMessage = function (message) {
        var msg_type = message.header.msg_type;
        if (msg_type === 'execute_result' || msg_type === 'pyout') {
            return this._parseDataMime(message.content.data);
        }
        return null;
    };
    ;
    Kernel.prototype._parseDataMime = function (data) {
        if (data == null) {
            return null;
        }
        var mime = this._getMimeType(data);
        if (mime == null) {
            return null;
        }
        var result;
        if (mime === 'text/plain') {
            result = {
                data: {
                    'text/plain': data[mime]
                },
                type: 'text',
                stream: 'pyout'
            };
            result.data['text/plain'] = result.data['text/plain'].trim();
        }
        else {
            result = {
                data: {},
                type: mime,
                stream: 'pyout'
            };
            result.data[mime] = data[mime];
        }
        return result;
    };
    ;
    Kernel.prototype._getMimeType = function (data) {
        var imageMimes = Object.getOwnPropertyNames(data).filter(function (mime) {
            return mime.startsWith('image/');
        });
        var mime;
        if (data.hasOwnProperty('text/html')) {
            mime = 'text/html';
        }
        else if (data.hasOwnProperty('image/svg+xml')) {
            mime = 'image/svg+xml';
        }
        else if (!(imageMimes.length === 0)) {
            mime = imageMimes[0];
        }
        else if (data.hasOwnProperty('text/markdown')) {
            mime = 'text/markdown';
        }
        else if (data.hasOwnProperty('application/pdf')) {
            mime = 'application/pdf';
        }
        else if (data.hasOwnProperty('text/latex')) {
            mime = 'text/latex';
        }
        else if (data.hasOwnProperty('application/javascript')) {
            mime = 'application/javascript';
        }
        else if (data.hasOwnProperty('application/json')) {
            mime = 'application/json';
        }
        else if (data.hasOwnProperty('text/plain')) {
            mime = 'text/plain';
        }
        return mime;
    };
    ;
    Kernel.prototype._parseErrorIOMessage = function (message) {
        var msg_type = message.header.msg_type;
        if (msg_type === 'error' || msg_type === 'pyerr') {
            return this._parseErrorMessage(message);
        }
        return null;
    };
    ;
    Kernel.prototype._parseErrorMessage = function (message) {
        var errorString;
        try {
            errorString = message.content.traceback.join('\n');
        }
        catch (err) {
            var ename = message.content.ename != null ? message.content.ename : '';
            var evalue = message.content.evalue != null ? message.content.evalue : '';
            errorString = ename + ': ' + evalue;
        }
        return {
            data: {
                'text/plain': errorString
            },
            type: 'text',
            stream: 'error'
        };
    };
    ;
    Kernel.prototype._parseStreamIOMessage = function (message) {
        var result;
        if (message.header.msg_type === 'stream') {
            result = {
                data: {
                    'text/plain': message.content.text != null ? message.content.text : message.content.data
                },
                type: 'text',
                stream: message.content.name
            };
        }
        else if (message.idents === 'stdout' || message.idents === 'stream.stdout' || message.content.name === 'stdout') {
            result = {
                data: {
                    'text/plain': message.content.text != null ? message.content.text : message.content.data
                },
                type: 'text',
                stream: 'stdout'
            };
        }
        else if (message.idents === 'stderr' || message.idents === 'stream.stderr' || message.content.name === 'stderr') {
            result = {
                data: {
                    'text/plain': message.content.text != null ? message.content.text : message.content.data
                },
                type: 'text',
                stream: 'stderr'
            };
        }
        if ((result != null ? result.data['text/plain'] : void 0) != null) {
            result.data['text/plain'] = result.data['text/plain'].trim();
        }
        return result;
    };
    ;
    return Kernel;
}(vscode.Disposable));
exports.Kernel = Kernel;
//# sourceMappingURL=kernel.js.map