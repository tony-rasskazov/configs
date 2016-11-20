'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var configSettings_1 = require('../../common/configSettings');
var contracts_1 = require('../common/contracts');
var runner_1 = require('./runner');
var collector_1 = require('./collector');
var baseTestManager_1 = require('../common/baseTestManager');
var settings = configSettings_1.PythonSettings.getInstance();
var TestManager = (function (_super) {
    __extends(TestManager, _super);
    function TestManager(rootDirectory, outputChannel) {
        _super.call(this, 'pytest', rootDirectory, outputChannel);
    }
    TestManager.prototype.discoverTestsImpl = function (ignoreCache) {
        var args = settings.unitTest.unittestArgs.slice(0);
        return collector_1.discoverTests(this.rootDirectory, args, this.cancellationToken);
    };
    TestManager.prototype.runTestImpl = function (tests, testsToRun, runFailedTests) {
        var args = settings.unitTest.unittestArgs.slice(0);
        if (runFailedTests === true) {
            testsToRun = { testFile: [], testFolder: [], testSuite: [], testFunction: [] };
            testsToRun.testFunction = tests.testFunctions.filter(function (fn) {
                return fn.testFunction.status === contracts_1.TestStatus.Error || fn.testFunction.status === contracts_1.TestStatus.Fail;
            }).map(function (fn) { return fn.testFunction; });
        }
        return runner_1.runTest(this.rootDirectory, tests, args, testsToRun, this.cancellationToken, this.outputChannel);
    };
    return TestManager;
}(baseTestManager_1.BaseTestManager));
exports.TestManager = TestManager;
//# sourceMappingURL=main.js.map