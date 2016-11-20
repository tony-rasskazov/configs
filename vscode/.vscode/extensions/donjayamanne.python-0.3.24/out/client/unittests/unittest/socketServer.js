'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var net = require('net');
var fs = require('fs');
var os = require('os');
var helpers_1 = require('../../common/helpers');
var events_1 = require('events');
var MaxConnections = 100;
function getIPType() {
    var networkInterfaces = os.networkInterfaces();
    var IPType = '';
    if (networkInterfaces && Array.isArray(networkInterfaces) && networkInterfaces.length > 0) {
        // getting the family of first network interface available
        IPType = networkInterfaces[Object.keys(networkInterfaces)[0]][0].family;
    }
    return IPType;
}
var Server = (function (_super) {
    __extends(Server, _super);
    function Server() {
        _super.call(this);
        this.sockets = [];
        this.ipcBuffer = '';
        this.path = (getIPType() == 'IPv6') ? '::1' : '127.0.0.1';
    }
    Object.defineProperty(Server.prototype, "clientsConnected", {
        get: function () {
            return this.sockets.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.dispose = function () {
        this.stop();
    };
    Server.prototype.stop = function () {
        if (this.server) {
            this.server.close();
            this.server = null;
        }
    };
    Server.prototype.start = function () {
        var _this = this;
        this.startedDef = helpers_1.createDeferred();
        fs.unlink(this.path, function () {
            _this.server = net.createServer(_this.connectionListener.bind(_this));
            _this.server.maxConnections = MaxConnections;
            _this.server.on('error', function (err) {
                if (_this.startedDef) {
                    _this.startedDef.reject(err);
                    _this.startedDef = null;
                }
                _this.emit('error', err);
            });
            _this.log('starting server as', 'TCP');
            _this.server.listen(0, _this.path, function (socket) {
                _this.startedDef.resolve(_this.server.address().port);
                _this.startedDef = null;
                _this.emit('start', socket);
            });
        });
        return this.startedDef.promise;
    };
    Server.prototype.connectionListener = function (socket) {
        var _this = this;
        this.sockets.push(socket);
        socket.setEncoding('utf8');
        this.log('## socket connection to server detected ##');
        socket.on('close', this.onCloseSocket.bind(this));
        socket.on('error', function (err) {
            _this.log('server socket error', err);
            _this.emit('error', err);
        });
        socket.on('data', function (data) {
            var sock = socket;
            // Assume we have just one client socket connection
            var dataStr = _this.ipcBuffer += data;
            while (true) {
                var startIndex = dataStr.indexOf('{');
                if (startIndex === -1) {
                    return;
                }
                var lengthOfMessage = parseInt(dataStr.slice(dataStr.indexOf(':') + 1, dataStr.indexOf('{')).trim());
                if (dataStr.length < startIndex + lengthOfMessage) {
                    return;
                }
                var message = JSON.parse(dataStr.substring(startIndex, lengthOfMessage + startIndex));
                dataStr = _this.ipcBuffer = dataStr.substring(startIndex + lengthOfMessage);
                _this.emit(message.event, message.body, sock);
            }
        });
        this.emit('connect', socket);
    };
    Server.prototype.log = function (message) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.emit.apply(this, ['log', message].concat(data));
    };
    Server.prototype.onCloseSocket = function () {
        for (var i = 0, count = this.sockets.length; i < count; i++) {
            var socket = this.sockets[i];
            var destroyedSocketId = false;
            if (socket && socket.readable) {
                continue;
            }
            if (socket.id) {
                destroyedSocketId = socket.id;
            }
            this.log('socket disconnected', destroyedSocketId.toString());
            if (socket && socket.destroy) {
                socket.destroy();
            }
            this.sockets.splice(i, 1);
            this.emit('socket.disconnected', socket, destroyedSocketId);
            return;
        }
    };
    return Server;
}(events_1.EventEmitter));
exports.Server = Server;
//# sourceMappingURL=socketServer.js.map