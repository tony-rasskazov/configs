"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('fs');
var kernel_1 = require('./kernel');
var vscode = require('vscode');
var jmp = require('jmp');
var uuid = require('uuid');
var zmq = jmp.zmq;
var ZMQKernel = (function (_super) {
    __extends(ZMQKernel, _super);
    function ZMQKernel(kernelSpec, language, connection, connectionFile, kernelProcess) {
        _super.call(this, kernelSpec, language);
        this.connection = connection;
        this.connectionFile = connectionFile;
        this.kernelProcess = kernelProcess;
        var getKernelNotificationsRegExp;
        this.executionCallbacks = new Map();
        this._connect();
        if (this.kernelProcess != null) {
            console.log('ZMQKernel: @kernelProcess:', this.kernelProcess);
            getKernelNotificationsRegExp = function () {
                try {
                    var pattern = '(?!)';
                    var flags = 'im';
                    return new RegExp(pattern, flags);
                }
                catch (_error) {
                    return null;
                }
            };
            this.kernelProcess.stdout.on('data', function (data) {
                data = data.toString();
                console.log('ZMQKernel: stdout:', data);
                var regexp = getKernelNotificationsRegExp();
                if (regexp != null ? regexp.test(data) : null) {
                    return vscode.window.showInformationMessage(data);
                }
            });
            this.kernelProcess.stderr.on('data', function (data) {
                data = data.toString();
                console.log('ZMQKernel: stderr:', data);
                var regexp = getKernelNotificationsRegExp();
                if (regexp !== null ? regexp.test(data) : null) {
                    return vscode.window.showErrorMessage(data);
                }
            });
        }
        else {
            console.log('ZMQKernel: connectionFile:', this.connectionFile);
            vscode.window.showInformationMessage('Using an existing kernel connection');
        }
    }
    ZMQKernel.prototype._connect = function () {
        var scheme = this.connection.signature_scheme.slice('hmac-'.length);
        var key = this.connection.key;
        this.shellSocket = new jmp.Socket('dealer', scheme, key);
        this.controlSocket = new jmp.Socket('dealer', scheme, key);
        this.stdinSocket = new jmp.Socket('dealer', scheme, key);
        this.ioSocket = new jmp.Socket('sub', scheme, key);
        var id = uuid.v4();
        this.shellSocket.identity = 'dealer' + id;
        this.controlSocket.identity = 'control' + id;
        this.stdinSocket.identity = 'dealer' + id;
        this.ioSocket.identity = 'sub' + id;
        var address = this.connection.transport + '://' + this.connection.ip + ':';
        this.shellSocket.connect(address + this.connection.shell_port);
        this.controlSocket.connect(address + this.connection.control_port);
        this.ioSocket.connect(address + this.connection.iopub_port);
        this.ioSocket.subscribe('');
        this.stdinSocket.connect(address + this.connection.stdin_port);
        // Details of shell, iopub, stdin can be found here (read and understand before messaing around)
        // http://jupyter-client.readthedocs.io/en/latest/messaging.html#introduction
        this.shellSocket.on('message', this.onShellMessage.bind(this));
        this.ioSocket.on('message', this.onIOMessage.bind(this));
        this.stdinSocket.on('message', this.onStdinMessage.bind(this));
        this.shellSocket.on('connect', function () {
            return console.log('shellSocket connected');
        });
        this.controlSocket.on('connect', function () {
            return console.log('controlSocket connected');
        });
        this.ioSocket.on('connect', function () {
            return console.log('ioSocket connected');
        });
        this.stdinSocket.on('connect', function () {
            return console.log('stdinSocket connected');
        });
        try {
            this.shellSocket.monitor();
            this.controlSocket.monitor();
            this.ioSocket.monitor();
            return this.stdinSocket.monitor();
        }
        catch (_error) {
            return console.error('Kernel:', _error);
        }
    };
    ;
    ZMQKernel.prototype.interrupt = function () {
        if (this.kernelProcess != null) {
            console.log('ZMQKernel: sending SIGINT');
            return this.kernelProcess.kill('SIGINT');
        }
        else {
            console.log('ZMQKernel: cannot interrupt an existing kernel');
            return vscode.window.showWarningMessage('Cannot interrupt this kernel');
        }
    };
    ;
    ZMQKernel.prototype._kill = function () {
        if (this.kernelProcess != null) {
            console.log('ZMQKernel: sending SIGKILL');
            return this.kernelProcess.kill('SIGKILL');
        }
        else {
            console.log('ZMQKernel: cannot kill an existing kernel');
            return vscode.window.showWarningMessage('Cannot kill this kernel');
        }
    };
    ;
    ZMQKernel.prototype.shutdown = function (restart) {
        if (restart == null) {
            restart = false;
        }
        var requestId = 'shutdown_' + uuid.v4();
        var message = this._createMessage('shutdown_request', requestId);
        message.content = {
            restart: restart
        };
        return this.shellSocket.send(new jmp.Message(message));
    };
    ;
    ZMQKernel.prototype._execute = function (code, requestId, onResults) {
        var message = this._createMessage('execute_request', requestId);
        message.content = {
            code: code,
            silent: false,
            store_history: true,
            user_expressions: {},
            allow_stdin: true
        };
        this.executionCallbacks.set(requestId, onResults);
        return this.shellSocket.send(new jmp.Message(message));
    };
    ;
    ZMQKernel.prototype.execute = function (code, onResults) {
        console.log('Kernel.execute:', code);
        var requestId = 'execute_' + uuid.v4();
        return this._execute(code, requestId, onResults);
    };
    ;
    ZMQKernel.prototype.executeWatch = function (code, onResults) {
        console.log('Kernel.executeWatch:', code);
        var requestId = 'watch_' + uuid.v4();
        return this._execute(code, requestId, onResults);
    };
    ;
    ZMQKernel.prototype.complete = function (code, onResults) {
        console.log('Kernel.complete:', code);
        var requestId = 'complete_' + uuid.v4();
        var message = this._createMessage('complete_request', requestId);
        message.content = {
            code: code,
            text: code,
            line: code,
            cursor_pos: code.length
        };
        this.executionCallbacks.set(requestId, onResults);
        return this.shellSocket.send(new jmp.Message(message));
    };
    ;
    ZMQKernel.prototype.inspect = function (code, cursor_pos, onResults) {
        console.log('Kernel.inspect:', code, cursor_pos);
        var requestId = 'inspect_' + uuid.v4();
        var message = this._createMessage('inspect_request', requestId);
        message.content = {
            code: code,
            cursor_pos: cursor_pos,
            detail_level: 0
        };
        this.executionCallbacks.set(requestId, onResults);
        return this.shellSocket.send(new jmp.Message(message));
    };
    ;
    ZMQKernel.prototype.inputReply = function (input) {
        var requestId = 'input_reply_' + uuid.v4();
        var message = this._createMessage('input_reply', requestId);
        message.content = {
            value: input
        };
        return this.stdinSocket.send(new jmp.Message(message));
    };
    ;
    ZMQKernel.prototype.onShellMessage = function (message) {
        var callback;
        console.log('shell message:', message);
        if (!this._isValidMessage(message)) {
            return;
        }
        var msg_id = message.parent_header.msg_id;
        if (msg_id != null && this.executionCallbacks.has(msg_id)) {
            callback = this.executionCallbacks.get(msg_id);
        }
        if (!callback) {
            return;
        }
        var status = message.content.status;
        if (status === 'error') {
            return;
        }
        if (status === 'ok') {
            var msg_type = message.header.msg_type;
            if (msg_type === 'execution_reply') {
                return callback({
                    data: 'ok',
                    type: 'text',
                    stream: 'status'
                });
            }
            else if (msg_type === 'complete_reply') {
                return callback(message.content);
            }
            else if (msg_type === 'inspect_reply') {
                return callback({
                    data: message.content.data,
                    found: message.content.found
                });
            }
            else {
                return callback({
                    data: 'ok',
                    type: 'text',
                    stream: 'status'
                });
            }
        }
    };
    ;
    ZMQKernel.prototype.onStdinMessage = function (message) {
        var _this = this;
        console.log('stdin message:', message);
        if (!this._isValidMessage(message)) {
            return;
        }
        var msg_type = message.header.msg_type;
        if (msg_type === 'input_request') {
            vscode.window.showInputBox({ prompt: message.content.prompt }).then(function (value) {
                _this.inputReply(value);
            });
        }
    };
    ;
    ZMQKernel.prototype.onIOMessage = function (message) {
        var callback;
        var msg_id;
        console.log('IO message:', message);
        if (!this._isValidMessage(message)) {
            return;
        }
        var msg_type = message.header.msg_type;
        if (msg_type === 'status') {
            var status_1 = message.content.execution_state;
            this.raiseOnStatusChange(status_1);
            msg_id = message.parent_header !== null ? message.parent_header.msg_id : null;
            if (status_1 === 'idle' && (msg_id !== null ? msg_id.startsWith('execute') : null)) {
                this._callWatchCallbacks();
            }
        }
        msg_id = message.parent_header.msg_id;
        if (msg_id != null && this.executionCallbacks.has(msg_id)) {
            callback = this.executionCallbacks.get(msg_id);
        }
        if (callback == null) {
            return;
        }
        var result = this._parseIOMessage(message);
        if (result != null) {
            return callback(result);
        }
    };
    ;
    ZMQKernel.prototype._isValidMessage = function (message) {
        if (message == null) {
            console.log('Invalid message: null');
            return false;
        }
        if (message.content == null) {
            console.log('Invalid message: Missing content');
            return false;
        }
        if (message.content.execution_state === 'starting') {
            console.log('Dropped starting status IO message');
            return false;
        }
        if (message.parent_header == null) {
            console.log('Invalid message: Missing parent_header');
            return false;
        }
        if (message.parent_header.msg_id == null) {
            console.log('Invalid message: Missing parent_header.msg_id');
            return false;
        }
        if (message.parent_header.msg_type == null) {
            console.log('Invalid message: Missing parent_header.msg_type');
            return false;
        }
        if (message.header == null) {
            console.log('Invalid message: Missing header');
            return false;
        }
        if (message.header.msg_id == null) {
            console.log('Invalid message: Missing header.msg_id');
            return false;
        }
        if (message.header.msg_type == null) {
            console.log('Invalid message: Missing header.msg_type');
            return false;
        }
        return true;
    };
    ;
    ZMQKernel.prototype.dispose = function () {
        console.log('ZMQKernel: destroy:', this);
        this.shutdown();
        if (this.kernelProcess != null) {
            this._kill();
            fs.unlink(this.connectionFile);
        }
        this.shellSocket.close();
        this.controlSocket.close();
        this.ioSocket.close();
        this.stdinSocket.close();
        _super.prototype.dispose.call(this);
    };
    ;
    ZMQKernel.prototype._getUsername = function () {
        return process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
    };
    ;
    ZMQKernel.prototype._createMessage = function (msg_type, msg_id) {
        if (msg_id == null) {
            msg_id = uuid.v4();
        }
        var message = {
            header: {
                username: this._getUsername(),
                session: '00000000-0000-0000-0000-000000000000',
                msg_type: msg_type,
                msg_id: msg_id,
                date: new Date(),
                version: '5.0'
            },
            metadata: {},
            parent_header: {},
            content: {}
        };
        return message;
    };
    ;
    return ZMQKernel;
}(kernel_1.Kernel));
exports.ZMQKernel = ZMQKernel;
//# sourceMappingURL=zmq-kernel.js.map