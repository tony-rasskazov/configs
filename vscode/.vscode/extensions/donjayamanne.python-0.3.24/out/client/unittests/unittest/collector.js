'use strict';
var utils_1 = require('./../../common/utils');
var contracts_1 = require('../common/contracts');
var testUtils_1 = require('../common/testUtils');
var path = require('path');
var configSettings_1 = require('../../common/configSettings');
var pythonSettings = configSettings_1.PythonSettings.getInstance();
function discoverTests(rootDirectory, args, token) {
    var startDirectory = '.';
    var pattern = 'test*.py';
    var indexOfStartDir = args.findIndex(function (arg) { return arg.indexOf('-s') === 0; });
    if (indexOfStartDir > 0) {
        var startDir = args[indexOfStartDir].trim();
        if (startDir.trim() === '-s' && args.length >= indexOfStartDir) {
            // Assume the next items is the directory
            startDirectory = args[indexOfStartDir + 1];
        }
        else {
            startDirectory = startDir.substring(2).trim();
            if (startDirectory.startsWith('=')) {
                startDirectory = startDirectory.substring(1);
            }
        }
    }
    var indexOfPattern = args.findIndex(function (arg) { return arg.indexOf('-p') === 0; });
    if (indexOfPattern > 0) {
        var patternValue = args[indexOfPattern].trim();
        if (patternValue.trim() === '-s' && args.length >= indexOfPattern) {
            // Assume the next items is the directory
            pattern = args[indexOfPattern + 1];
        }
        else {
            pattern = patternValue.substring(2).trim();
            if (pattern.startsWith('=')) {
                pattern = pattern.substring(1);
            }
        }
    }
    var pythonScript = "import unittest\nloader = unittest.TestLoader()\nsuites = loader.discover(\"" + startDirectory + "\", pattern=\"" + pattern + "\")\nprint(\"start\")\nfor suite in suites._tests:\n    for cls in suite._tests:\n        for m in cls._tests:\n            print(m.id())";
    var startedCollecting = false;
    var testItems = [];
    function processOutput(output) {
        output.split(/\r?\n/g).forEach(function (line, index, lines) {
            if (token && token.isCancellationRequested) {
                return;
            }
            if (!startedCollecting) {
                if (line === 'start') {
                    startedCollecting = true;
                }
                return;
            }
            line = line.trim();
            if (line.length === 0) {
                return;
            }
            testItems.push(line);
        });
    }
    args = [];
    return utils_1.execPythonFile(pythonSettings.pythonPath, args.concat(['-c', pythonScript]), rootDirectory, true, processOutput, token)
        .then(function () {
        if (token && token.isCancellationRequested) {
            return Promise.reject('cancelled');
        }
        return parseTestIds(rootDirectory, testItems);
    });
}
exports.discoverTests = discoverTests;
function parseTestIds(rootDirectory, testIds) {
    var testFiles = [];
    testIds.forEach(function (testId) {
        addTestId(rootDirectory, testId, testFiles);
    });
    return testUtils_1.flattenTestFiles(testFiles);
}
function addTestId(rootDirectory, testId, testFiles) {
    var testIdParts = testId.split('.');
    // We must have a file, class and function name
    if (testIdParts.length <= 2) {
        return null;
    }
    var paths = testIdParts.slice(0, testIdParts.length - 2);
    var filePath = path.join.apply(path, [rootDirectory].concat(paths)) + '.py';
    var functionName = testIdParts.pop();
    var className = testIdParts.pop();
    // Check if we already have this test file
    var testFile = testFiles.find(function (test) { return test.fullPath === filePath; });
    if (!testFile) {
        testFile = {
            name: path.basename(filePath),
            fullPath: filePath,
            functions: [],
            suites: [],
            nameToRun: paths.join('.'),
            xmlName: '',
            status: contracts_1.TestStatus.Idle,
            time: 0
        };
        testFiles.push(testFile);
    }
    // Check if we already have this test file
    var classNameToRun = testIdParts.slice(0, testIdParts.length - 1).join('.');
    var testSuite = testFile.suites.find(function (cls) { return cls.nameToRun === classNameToRun; });
    if (!testSuite) {
        testSuite = {
            name: className,
            functions: [],
            suites: [],
            isUnitTest: true,
            isInstance: false,
            nameToRun: classNameToRun,
            xmlName: '',
            status: contracts_1.TestStatus.Idle,
            time: 0
        };
        testFile.suites.push(testSuite);
    }
    var testFunction = {
        name: functionName,
        nameToRun: testId,
        status: contracts_1.TestStatus.Idle,
        time: 0
    };
    testSuite.functions.push(testFunction);
}
//# sourceMappingURL=collector.js.map