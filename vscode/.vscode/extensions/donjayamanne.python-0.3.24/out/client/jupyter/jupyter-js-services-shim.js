// jupyter-js-services apparently require overriding globals, as explained in its
// README: https://github.com/jupyter/jupyter-js-services
// Otherwise, any requests it sends are blocked due to CORS issues
// 
// This file exists to
// a) Make sure globals are only ever overridden once
// b) In the future, try to make the global overrides optional if gateways are
//    not used, or have been pre-configured to avoid CORS issues
"use strict";
var ws = require('ws');
var xhr = require('xmlhttprequest');
var requirejs = require('requirejs');
global.requirejs = requirejs;
global.XMLHttpRequest = xhr.XMLHttpRequest;
global.WebSocket = ws;
exports.services = require('jupyter-js-services');
//# sourceMappingURL=jupyter-js-services-shim.js.map