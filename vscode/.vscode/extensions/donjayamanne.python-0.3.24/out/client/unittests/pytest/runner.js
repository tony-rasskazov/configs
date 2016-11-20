/// <reference path="../../../../typings/globals/xml2js/index.d.ts" />
'use strict';
var helpers_1 = require('../../common/helpers');
var testUtils_1 = require('../common/testUtils');
var xUnitParser_1 = require('../common/xUnitParser');
var runner_1 = require('../common/runner');
var configSettings_1 = require('../../common/configSettings');
var pythonSettings = configSettings_1.PythonSettings.getInstance();
function runTest(rootDirectory, tests, args, testsToRun, token, outChannel) {
    var testPaths = [];
    if (testsToRun && testsToRun.testFolder) {
        testPaths = testPaths.concat(testsToRun.testFolder.map(function (f) { return f.nameToRun; }));
    }
    if (testsToRun && testsToRun.testFile) {
        testPaths = testPaths.concat(testsToRun.testFile.map(function (f) { return f.nameToRun; }));
    }
    if (testsToRun && testsToRun.testSuite) {
        testPaths = testPaths.concat(testsToRun.testSuite.map(function (f) { return f.nameToRun; }));
    }
    if (testsToRun && testsToRun.testFunction) {
        testPaths = testPaths.concat(testsToRun.testFunction.map(function (f) { return f.nameToRun; }));
    }
    var xmlLogFile = '';
    var xmlLogFileCleanup = null;
    return helpers_1.createTemporaryFile('.xml').then(function (xmlLogResult) {
        xmlLogFile = xmlLogResult.filePath;
        xmlLogFileCleanup = xmlLogResult.cleanupCallback;
        var testArgs = args.concat([("--junitxml=" + xmlLogFile)]).concat(testPaths);
        return runner_1.run(pythonSettings.unitTest.pyTestPath, testArgs, rootDirectory, token, outChannel);
    }).then(function () {
        return updateResultsFromLogFiles(tests, xmlLogFile);
    }).then(function (result) {
        xmlLogFileCleanup();
        return result;
    }).catch(function (reason) {
        xmlLogFileCleanup();
        return Promise.reject(reason);
    });
}
exports.runTest = runTest;
function updateResultsFromLogFiles(tests, outputXmlFile) {
    return xUnitParser_1.updateResultsFromXmlLogFile(tests, outputXmlFile, xUnitParser_1.PassCalculationFormulae.pytest).then(function () {
        testUtils_1.updateResults(tests);
        return tests;
    });
}
exports.updateResultsFromLogFiles = updateResultsFromLogFiles;
//# sourceMappingURL=runner.js.map