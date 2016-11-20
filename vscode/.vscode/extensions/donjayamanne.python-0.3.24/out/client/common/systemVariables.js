"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Types = require('./types');
var vscode = require('vscode');
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.log = function (message) {
    };
    Parser.prototype.is = function (value, func, wrongTypeState, wrongTypeMessage, undefinedState, undefinedMessage) {
        if (Types.isUndefined(value)) {
            return false;
        }
        if (!func(value)) {
            return false;
        }
        return true;
    };
    Parser.merge = function (destination, source, overwrite) {
        var _this = this;
        Object.keys(source).forEach(function (key) {
            var destValue = destination[key];
            var sourceValue = source[key];
            if (Types.isUndefined(sourceValue)) {
                return;
            }
            if (Types.isUndefined(destValue)) {
                destination[key] = sourceValue;
            }
            else {
                if (overwrite) {
                    if (Types.isObject(destValue) && Types.isObject(sourceValue)) {
                        _this.merge(destValue, sourceValue, overwrite);
                    }
                    else {
                        destination[key] = sourceValue;
                    }
                }
            }
        });
    };
    return Parser;
}());
exports.Parser = Parser;
var AbstractSystemVariables = (function () {
    function AbstractSystemVariables() {
    }
    AbstractSystemVariables.prototype.resolve = function (value) {
        if (Types.isString(value)) {
            return this.__resolveString(value);
        }
        else if (Types.isArray(value)) {
            return this.__resolveArray(value);
        }
        else if (Types.isObject(value)) {
            return this.__resolveLiteral(value);
        }
        return value;
    };
    AbstractSystemVariables.prototype.resolveAny = function (value) {
        if (Types.isString(value)) {
            return this.__resolveString(value);
        }
        else if (Types.isArray(value)) {
            return this.__resolveAnyArray(value);
        }
        else if (Types.isObject(value)) {
            return this.__resolveAnyLiteral(value);
        }
        return value;
    };
    AbstractSystemVariables.prototype.__resolveString = function (value) {
        var _this = this;
        var regexp = /\$\{(.*?)\}/g;
        return value.replace(regexp, function (match, name) {
            var newValue = _this[name];
            if (Types.isString(newValue)) {
                return newValue;
            }
            else {
                return match && match.indexOf('env.') > 0 ? '' : match;
            }
        });
    };
    AbstractSystemVariables.prototype.__resolveLiteral = function (values) {
        var _this = this;
        var result = Object.create(null);
        Object.keys(values).forEach(function (key) {
            var value = values[key];
            result[key] = _this.resolve(value);
        });
        return result;
    };
    AbstractSystemVariables.prototype.__resolveAnyLiteral = function (values) {
        var _this = this;
        var result = Object.create(null);
        Object.keys(values).forEach(function (key) {
            var value = values[key];
            result[key] = _this.resolveAny(value);
        });
        return result;
    };
    AbstractSystemVariables.prototype.__resolveArray = function (value) {
        var _this = this;
        return value.map(function (s) { return _this.__resolveString(s); });
    };
    AbstractSystemVariables.prototype.__resolveAnyArray = function (value) {
        var _this = this;
        return value.map(function (s) { return _this.resolveAny(s); });
    };
    return AbstractSystemVariables;
}());
exports.AbstractSystemVariables = AbstractSystemVariables;
var SystemVariables = (function (_super) {
    __extends(SystemVariables, _super);
    function SystemVariables() {
        var _this = this;
        _super.call(this);
        this._workspaceRoot = vscode.workspace.rootPath;
        Object.keys(process.env).forEach(function (key) {
            _this[("env." + key)] = process.env[key];
        });
    }
    Object.defineProperty(SystemVariables.prototype, "cwd", {
        get: function () {
            return this.workspaceRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SystemVariables.prototype, "workspaceRoot", {
        get: function () {
            return this._workspaceRoot;
        },
        enumerable: true,
        configurable: true
    });
    return SystemVariables;
}(AbstractSystemVariables));
exports.SystemVariables = SystemVariables;
//# sourceMappingURL=systemVariables.js.map