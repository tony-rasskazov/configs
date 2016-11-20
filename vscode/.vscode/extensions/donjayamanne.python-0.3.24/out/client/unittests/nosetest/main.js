'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var configSettings_1 = require('../../common/configSettings');
var collector_1 = require('./collector');
var baseTestManager_1 = require('../common/baseTestManager');
var runner_1 = require('./runner');
var settings = configSettings_1.PythonSettings.getInstance();
var TestManager = (function (_super) {
    __extends(TestManager, _super);
    function TestManager(rootDirectory, outputChannel) {
        _super.call(this, 'nosetest', rootDirectory, outputChannel);
    }
    TestManager.prototype.discoverTestsImpl = function (ignoreCache) {
        var args = settings.unitTest.pyTestArgs.slice(0);
        return collector_1.discoverTests(this.rootDirectory, args, this.cancellationToken);
    };
    TestManager.prototype.runTestImpl = function (tests, testsToRun, runFailedTests) {
        var args = settings.unitTest.pyTestArgs.slice(0);
        if (runFailedTests === true && args.indexOf('--failed') === -1) {
            args.push('--failed');
        }
        return runner_1.runTest(this.rootDirectory, tests, args, testsToRun, this.cancellationToken, this.outputChannel);
    };
    return TestManager;
}(baseTestManager_1.BaseTestManager));
exports.TestManager = TestManager;
//# sourceMappingURL=main.js.map