/// <reference path="../../../../typings/globals/xml2js/index.d.ts" />
'use strict';
var path = require('path');
var contracts_1 = require('../common/contracts');
var testUtils_1 = require('../common/testUtils');
var runner_1 = require('../common/runner');
var socketServer_1 = require('./socketServer');
var configSettings_1 = require('../../common/configSettings');
var settings = configSettings_1.PythonSettings.getInstance();
var outcomeMapping = new Map();
outcomeMapping.set('passed', { status: contracts_1.TestStatus.Pass, summaryProperty: 'passed' });
outcomeMapping.set('failed', { status: contracts_1.TestStatus.Fail, summaryProperty: 'failures' });
outcomeMapping.set('error', { status: contracts_1.TestStatus.Error, summaryProperty: 'errors' });
outcomeMapping.set('skipped', { status: contracts_1.TestStatus.Skipped, summaryProperty: 'skipped' });
function runTest(rootDirectory, tests, args, testsToRun, token, outChannel) {
    tests.summary.errors = 0;
    tests.summary.failures = 0;
    tests.summary.passed = 0;
    tests.summary.skipped = 0;
    var testLauncherFile = path.join(__dirname, '..', '..', '..', '..', 'pythonFiles', 'PythonTools', 'visualstudio_py_testlauncher.py');
    var server = new socketServer_1.Server();
    server.on('error', function (message) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        console.log(message + " " + data.join(' '));
    });
    server.on('log', function (message) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
    });
    server.on('connect', function (data) {
    });
    server.on('start', function (data) {
    });
    server.on('result', function (data) {
        var test = tests.testFunctions.find(function (t) { return t.testFunction.nameToRun === data.test; });
        if (test) {
            var statusDetails = outcomeMapping.get(data.outcome);
            test.testFunction.status = statusDetails.status;
            test.testFunction.message = data.message;
            test.testFunction.traceback = data.traceback;
            tests.summary[statusDetails.summaryProperty] += 1;
        }
    });
    server.on('socket.disconnected', function (data) {
    });
    return server.start().then(function (port) {
        var testPaths = getIdsOfTestsToRun(tests, testsToRun);
        for (var counter = 0; counter < testPaths.length; counter++) {
            testPaths[counter] = '-t' + testPaths[counter].trim();
        }
        var testArgs = buildTestArgs(args);
        testArgs = [testLauncherFile].concat(testArgs).concat("--result-port=" + port).concat(testPaths);
        return runner_1.run(settings.pythonPath, testArgs, rootDirectory, token, outChannel);
    }).then(function () {
        testUtils_1.updateResults(tests);
        return tests;
    });
}
exports.runTest = runTest;
function buildTestArgs(args) {
    var startDirectory = '.';
    var pattern = 'test*.py';
    var indexOfStartDir = args.findIndex(function (arg) { return arg.indexOf('-s') === 0 || arg.indexOf('--start-directory') === 0; });
    if (indexOfStartDir >= 0) {
        var startDir = args[indexOfStartDir].trim();
        if ((startDir.trim() === '-s' || startDir.trim() === '--start-directory') && args.length >= indexOfStartDir) {
            // Assume the next items is the directory
            startDirectory = args[indexOfStartDir + 1];
        }
        else {
            var lenToStartFrom = startDir.startsWith('-s') ? '-s'.length : '--start-directory'.length;
            startDirectory = startDir.substring(lenToStartFrom).trim();
            if (startDirectory.startsWith('=')) {
                startDirectory = startDirectory.substring(1);
            }
        }
    }
    var indexOfPattern = args.findIndex(function (arg) { return arg.indexOf('-p') === 0 || arg.indexOf('--pattern') === 0; });
    if (indexOfPattern >= 0) {
        var patternValue = args[indexOfPattern].trim();
        if ((patternValue.trim() === '-p' || patternValue.trim() === '--pattern') && args.length >= indexOfPattern) {
            // Assume the next items is the directory
            pattern = args[indexOfPattern + 1];
        }
        else {
            var lenToStartFrom = patternValue.startsWith('-p') ? '-p'.length : '--pattern'.length;
            pattern = patternValue.substring(lenToStartFrom).trim();
            if (pattern.startsWith('=')) {
                pattern = pattern.substring(1);
            }
        }
    }
    var failFast = args.some(function (arg) { return arg.trim() === '-f' || arg.trim() === '--failfast'; });
    var verbosity = args.some(function (arg) { return arg.trim().indexOf('-v') === 0; }) ? 2 : 1;
    var testArgs = [("--us=" + startDirectory), ("--up=" + pattern), ("--uvInt=" + verbosity)];
    if (failFast) {
        testArgs.push('--uf');
    }
    return testArgs;
}
function getIdsOfTestsToRun(tests, testsToRun) {
    var testIds = [];
    if (testsToRun && testsToRun.testFolder) {
        // Get test ids of files in these folders
        testsToRun.testFolder.map(function (folder) {
            tests.testFiles.forEach(function (f) {
                if (f.fullPath.startsWith(folder.name)) {
                    testIds.push(f.nameToRun);
                }
            });
        });
    }
    if (testsToRun && testsToRun.testFile) {
        testIds.push.apply(testIds, testsToRun.testFile.map(function (f) { return f.nameToRun; }));
    }
    if (testsToRun && testsToRun.testSuite) {
        testIds.push.apply(testIds, testsToRun.testSuite.map(function (f) { return f.nameToRun; }));
    }
    if (testsToRun && testsToRun.testFunction) {
        testIds.push.apply(testIds, testsToRun.testFunction.map(function (f) { return f.nameToRun; }));
    }
    return testIds;
}
//# sourceMappingURL=runner.js.map