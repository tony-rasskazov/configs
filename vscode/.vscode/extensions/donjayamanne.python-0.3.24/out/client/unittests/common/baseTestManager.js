"use strict";
// import {TestFolder, TestsToRun, Tests, TestFile, TestSuite, TestFunction, TestStatus, FlattenedTestFunction, FlattenedTestSuite, CANCELLATION_REASON} from './contracts';
var contracts_1 = require('./contracts');
var vscode = require('vscode');
var testUtils_1 = require('./testUtils');
var telemetryHelper = require('../../common/telemetry');
var telemetryContracts = require('../../common/telemetryContracts');
var BaseTestManager = (function () {
    function BaseTestManager(testProvider, rootDirectory, outputChannel) {
        this.testProvider = testProvider;
        this.rootDirectory = rootDirectory;
        this.outputChannel = outputChannel;
        this._status = contracts_1.TestStatus.Unknown;
        this._status = contracts_1.TestStatus.Unknown;
    }
    Object.defineProperty(BaseTestManager.prototype, "cancellationToken", {
        get: function () {
            return this.cancellationTokenSource && this.cancellationTokenSource.token;
        },
        enumerable: true,
        configurable: true
    });
    BaseTestManager.prototype.dispose = function () {
    };
    Object.defineProperty(BaseTestManager.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    BaseTestManager.prototype.stop = function () {
        if (this.cancellationTokenSource) {
            this.cancellationTokenSource.cancel();
        }
    };
    BaseTestManager.prototype.reset = function () {
        this._status = contracts_1.TestStatus.Unknown;
        this.tests = null;
    };
    BaseTestManager.prototype.resetTestResults = function () {
        if (!this.tests) {
            return;
        }
        testUtils_1.resetTestResults(this.tests);
    };
    BaseTestManager.prototype.createCancellationToken = function () {
        this.disposeCancellationToken();
        this.cancellationTokenSource = new vscode.CancellationTokenSource();
    };
    BaseTestManager.prototype.disposeCancellationToken = function () {
        if (this.cancellationTokenSource) {
            this.cancellationTokenSource.dispose();
        }
        this.cancellationTokenSource = null;
    };
    BaseTestManager.prototype.discoverTests = function (ignoreCache, quietMode) {
        var _this = this;
        if (ignoreCache === void 0) { ignoreCache = false; }
        if (quietMode === void 0) { quietMode = false; }
        if (this.discoverTestsPromise) {
            return this.discoverTestsPromise;
        }
        if (!ignoreCache && this.tests && this.tests.testFunctions.length > 0) {
            this._status = contracts_1.TestStatus.Idle;
            return Promise.resolve(this.tests);
        }
        var delays = new telemetryHelper.Delays();
        this._status = contracts_1.TestStatus.Discovering;
        this.cancellationTokenSource = new vscode.CancellationTokenSource();
        this.createCancellationToken();
        return this.discoverTestsPromise = this.discoverTestsImpl(ignoreCache)
            .then(function (tests) {
            _this.tests = tests;
            _this._status = contracts_1.TestStatus.Idle;
            _this.resetTestResults();
            _this.discoverTestsPromise = null;
            // have errors in Discovering
            var haveErrorsInDiscovering = false;
            tests.testFiles.forEach(function (file) {
                if (file.errorsWhenDiscovering && file.errorsWhenDiscovering.length > 0) {
                    haveErrorsInDiscovering = true;
                    _this.outputChannel.append('_'.repeat(10));
                    _this.outputChannel.append("There was an error in identifying unit tests in " + file.nameToRun);
                    _this.outputChannel.appendLine('_'.repeat(10));
                    _this.outputChannel.appendLine(file.errorsWhenDiscovering);
                }
            });
            if (haveErrorsInDiscovering && !quietMode) {
                testUtils_1.displayTestErrorMessage('There were some errors in disovering unit tests');
            }
            testUtils_1.storeDiscoveredTests(tests);
            _this.disposeCancellationToken();
            delays.stop();
            telemetryHelper.sendTelemetryEvent(telemetryContracts.UnitTests.Discover, {
                Test_Provider: _this.testProvider
            }, delays.toMeasures());
            return tests;
        }).catch(function (reason) {
            _this.tests = null;
            _this.discoverTestsPromise = null;
            if (_this.cancellationToken && _this.cancellationToken.isCancellationRequested) {
                reason = contracts_1.CANCELLATION_REASON;
                _this._status = contracts_1.TestStatus.Idle;
            }
            else {
                _this._status = contracts_1.TestStatus.Error;
                _this.outputChannel.appendLine('Test Disovery failed: ');
                _this.outputChannel.appendLine('' + reason);
            }
            testUtils_1.storeDiscoveredTests(null);
            _this.disposeCancellationToken();
            delays.stop();
            telemetryHelper.sendTelemetryEvent(telemetryContracts.UnitTests.Discover, {
                Test_Provider: _this.testProvider
            }, delays.toMeasures());
            return Promise.reject(reason);
        });
    };
    BaseTestManager.prototype.runTest = function (args) {
        var _this = this;
        var runFailedTests = false;
        var testsToRun = null;
        var moreInfo = {
            Test_Provider: this.testProvider,
            Run_Failed_Tests: 'false',
            Run_Specific_File: 'false',
            Run_Specific_Class: 'false',
            Run_Specific_Function: 'false'
        };
        if (typeof args === 'boolean') {
            runFailedTests = args === true;
            moreInfo.Run_Failed_Tests = runFailedTests + '';
        }
        if (typeof args === 'object' && args !== null) {
            testsToRun = args;
            if (Array.isArray(testsToRun.testFile) && testsToRun.testFile.length > 0) {
                moreInfo.Run_Specific_File = 'true';
            }
            if (Array.isArray(testsToRun.testSuite) && testsToRun.testSuite.length > 0) {
                moreInfo.Run_Specific_Class = 'true';
            }
            if (Array.isArray(testsToRun.testFunction) && testsToRun.testFunction.length > 0) {
                moreInfo.Run_Specific_Function = 'true';
            }
        }
        if (runFailedTests === false && testsToRun === null) {
            this.resetTestResults();
        }
        var delays = new telemetryHelper.Delays();
        this._status = contracts_1.TestStatus.Running;
        this.createCancellationToken();
        // If running failed tests, then don't clear the previously build UnitTests
        // If we do so, then we end up re-discovering the unit tests and clearing previously cached list of failed tests
        // Similarly, if running a specific test or test file, don't clear the cache (possible tests have some state information retained)
        var clearDiscoveredTestCache = runFailedTests || moreInfo.Run_Specific_File || moreInfo.Run_Specific_Class || moreInfo.Run_Specific_Function ? false : true;
        return this.discoverTests(clearDiscoveredTestCache, true)
            .catch(function (reason) {
            if (_this.cancellationToken && _this.cancellationToken.isCancellationRequested) {
                return Promise.reject(reason);
            }
            testUtils_1.displayTestErrorMessage('Errors in discovering tests, continuing with tests');
            return {
                rootTestFolders: [], testFiles: [], testFolders: [], testFunctions: [], testSuits: [],
                summary: { errors: 0, failures: 0, passed: 0, skipped: 0 }
            };
        })
            .then(function (tests) {
            return _this.runTestImpl(tests, testsToRun, runFailedTests);
        }).then(function () {
            _this._status = contracts_1.TestStatus.Idle;
            _this.disposeCancellationToken();
            delays.stop();
            telemetryHelper.sendTelemetryEvent(telemetryContracts.UnitTests.Run, moreInfo, delays.toMeasures());
            return _this.tests;
        }).catch(function (reason) {
            if (_this.cancellationToken && _this.cancellationToken.isCancellationRequested) {
                reason = contracts_1.CANCELLATION_REASON;
                _this._status = contracts_1.TestStatus.Idle;
            }
            else {
                _this._status = contracts_1.TestStatus.Error;
            }
            _this.disposeCancellationToken();
            delays.stop();
            telemetryHelper.sendTelemetryEvent(telemetryContracts.UnitTests.Run, moreInfo, delays.toMeasures());
            return Promise.reject(reason);
        });
    };
    return BaseTestManager;
}());
exports.BaseTestManager = BaseTestManager;
//# sourceMappingURL=baseTestManager.js.map