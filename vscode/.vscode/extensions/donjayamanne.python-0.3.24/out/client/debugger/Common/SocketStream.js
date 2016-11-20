"use strict";
var uint64be = require("uint64be");
var SocketStream = (function () {
    function SocketStream(socket, buffer) {
        this.bytesRead = 0;
        this.hasInsufficientDataForReading = false;
        this.buffer = buffer;
        this.socket = socket;
    }
    SocketStream.prototype.WriteInt32 = function (num) {
        this.WriteInt64(num);
    };
    SocketStream.prototype.WriteInt64 = function (num) {
        var buffer = uint64be.encode(num);
        this.socket.write(buffer);
    };
    SocketStream.prototype.WriteString = function (value) {
        var stringBuffer = new Buffer(value, "utf-8");
        this.WriteInt32(stringBuffer.length);
        if (stringBuffer.length > 0) {
            this.socket.write(stringBuffer);
        }
    };
    SocketStream.prototype.Write = function (buffer) {
        this.socket.write(buffer);
    };
    Object.defineProperty(SocketStream.prototype, "Buffer", {
        get: function () {
            return this.buffer;
        },
        enumerable: true,
        configurable: true
    });
    SocketStream.prototype.BeginTransaction = function () {
        this.isInTransaction = true;
        this.bytesRead = 0;
        this.ClearErrors();
    };
    SocketStream.prototype.EndTransaction = function () {
        this.isInTransaction = true;
        this.buffer = this.buffer.slice(this.bytesRead);
        this.bytesRead = 0;
        this.ClearErrors();
    };
    SocketStream.prototype.RollBackTransaction = function () {
        this.isInTransaction = false;
        this.bytesRead = 0;
        this.ClearErrors();
    };
    SocketStream.prototype.ClearErrors = function () {
        this.hasInsufficientDataForReading = false;
    };
    Object.defineProperty(SocketStream.prototype, "HasInsufficientDataForReading", {
        get: function () {
            return this.hasInsufficientDataForReading;
        },
        enumerable: true,
        configurable: true
    });
    SocketStream.prototype.toString = function () {
        return this.buffer.toString();
    };
    Object.defineProperty(SocketStream.prototype, "Length", {
        get: function () {
            return this.buffer.length;
        },
        enumerable: true,
        configurable: true
    });
    SocketStream.prototype.Append = function (additionalData) {
        if (this.buffer.length === 0) {
            this.buffer = additionalData;
            return;
        }
        var newBuffer = new Buffer(this.buffer.length + additionalData.length);
        this.buffer.copy(newBuffer);
        additionalData.copy(newBuffer, this.buffer.length);
        this.buffer = newBuffer;
    };
    SocketStream.prototype.isSufficientDataAvailable = function (length) {
        if (this.buffer.length < (this.bytesRead + length)) {
            this.hasInsufficientDataForReading = true;
        }
        return !this.hasInsufficientDataForReading;
    };
    SocketStream.prototype.ReadByte = function () {
        if (!this.isSufficientDataAvailable(1)) {
            return null;
        }
        var value = this.buffer.slice(this.bytesRead, this.bytesRead + 1)[0];
        if (this.isInTransaction) {
            this.bytesRead++;
        }
        else {
            this.buffer = this.buffer.slice(1);
        }
        return value;
    };
    SocketStream.prototype.ReadString = function () {
        var byteRead = this.ReadByte();
        if (this.HasInsufficientDataForReading) {
            return null;
        }
        if (byteRead < 0) {
            throw new Error("IOException() - Socket.ReadString failed to read string type;");
        }
        var type = new Buffer([byteRead]).toString();
        var isUnicode = false;
        switch (type) {
            case "N":
                return null;
            case "U":
                isUnicode = true;
                break;
            case "A": {
                isUnicode = false;
                break;
            }
            default: {
                throw new Error("IOException(); Socket.ReadString failed to parse unknown string type " + type);
            }
        }
        var len = this.ReadInt32();
        if (this.HasInsufficientDataForReading) {
            return null;
        }
        if (!this.isSufficientDataAvailable(len)) {
            return null;
        }
        var stringBuffer = this.buffer.slice(this.bytesRead, this.bytesRead + len);
        if (this.isInTransaction) {
            this.bytesRead = this.bytesRead + len;
        }
        else {
            this.buffer = this.buffer.slice(len);
        }
        var resp = isUnicode ? stringBuffer.toString("utf-8") : stringBuffer.toString();
        return resp;
    };
    SocketStream.prototype.ReadInt32 = function () {
        return this.ReadInt64();
    };
    SocketStream.prototype.ReadInt64 = function () {
        if (!this.isSufficientDataAvailable(8)) {
            return null;
        }
        var buf = this.buffer.slice(this.bytesRead, this.bytesRead + 8);
        if (this.isInTransaction) {
            this.bytesRead = this.bytesRead + 8;
        }
        else {
            this.buffer = this.buffer.slice(8);
        }
        var returnValue = uint64be.decode(buf);
        return returnValue;
    };
    SocketStream.prototype.ReadAsciiString = function (length) {
        if (!this.isSufficientDataAvailable(length)) {
            return null;
        }
        var stringBuffer = this.buffer.slice(this.bytesRead, this.bytesRead + length);
        if (this.isInTransaction) {
            this.bytesRead = this.bytesRead + length;
        }
        else {
            this.buffer = this.buffer.slice(length);
        }
        return stringBuffer.toString("ascii");
    };
    return SocketStream;
}());
exports.SocketStream = SocketStream;
//# sourceMappingURL=SocketStream.js.map