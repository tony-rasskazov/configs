"use strict";
var vscode_1 = require('vscode');
var vscode = require('vscode');
var contracts_1 = require('../common/contracts');
var testUtils_1 = require('../common/testUtils');
var constants = require('../../common/constants');
var path = require('path');
var TestDisplay = (function () {
    function TestDisplay() {
    }
    TestDisplay.prototype.displayStopTestUI = function (message) {
        vscode_1.window.showQuickPick([message]).then(function (item) {
            if (item === message) {
                vscode.commands.executeCommand(constants.Commands.Tests_Stop);
            }
        });
    };
    TestDisplay.prototype.displayTestUI = function (rootDirectory) {
        var tests = testUtils_1.getDiscoveredTests();
        vscode_1.window.showQuickPick(buildItems(rootDirectory, tests), { matchOnDescription: true, matchOnDetail: true }).then(onItemSelected);
    };
    TestDisplay.prototype.selectTestFunction = function (rootDirectory, tests) {
        return new Promise(function (resolve, reject) {
            vscode_1.window.showQuickPick(buildItemsForFunctions(rootDirectory, tests.testFunctions), { matchOnDescription: true, matchOnDetail: true })
                .then(function (item) {
                if (item && item.fn) {
                    return resolve(item.fn);
                }
                return reject();
            }, reject);
        });
    };
    TestDisplay.prototype.displayFunctionTestPickerUI = function (rootDirectory, fileName, testFunctions) {
        var tests = testUtils_1.getDiscoveredTests();
        if (!tests) {
            return;
        }
        var testFile = tests.testFiles.find(function (file) { return file.name === fileName || file.fullPath === fileName; });
        if (!testFile) {
            return;
        }
        var flattenedFunctions = tests.testFunctions.filter(function (fn) {
            return fn.parentTestFile.name === testFile.name &&
                testFunctions.some(function (testFunc) { return testFunc.nameToRun === fn.testFunction.nameToRun; });
        });
        vscode_1.window.showQuickPick(buildItemsForFunctions(rootDirectory, flattenedFunctions), { matchOnDescription: true, matchOnDetail: true }).then(onItemSelected);
    };
    return TestDisplay;
}());
exports.TestDisplay = TestDisplay;
var Type;
(function (Type) {
    Type[Type["RunAll"] = 0] = "RunAll";
    Type[Type["ReDiscover"] = 1] = "ReDiscover";
    Type[Type["RunFailed"] = 2] = "RunFailed";
    Type[Type["RunFolder"] = 3] = "RunFolder";
    Type[Type["RunFile"] = 4] = "RunFile";
    Type[Type["RunClass"] = 5] = "RunClass";
    Type[Type["RunMethod"] = 6] = "RunMethod";
    Type[Type["ViewTestOutput"] = 7] = "ViewTestOutput";
    Type[Type["Null"] = 8] = "Null";
    Type[Type["SelectAndRunMethod"] = 9] = "SelectAndRunMethod";
})(Type || (Type = {}));
var statusIconMapping = new Map();
statusIconMapping.set(contracts_1.TestStatus.Pass, constants.Octicons.Test_Pass);
statusIconMapping.set(contracts_1.TestStatus.Fail, constants.Octicons.Test_Fail);
statusIconMapping.set(contracts_1.TestStatus.Error, constants.Octicons.Test_Error);
statusIconMapping.set(contracts_1.TestStatus.Skipped, constants.Octicons.Test_Skip);
function getSummary(tests) {
    if (!tests || !tests.summary) {
        return '';
    }
    var statusText = [];
    if (tests.summary.passed > 0) {
        statusText.push(constants.Octicons.Test_Pass + " " + tests.summary.passed + " Passed");
    }
    if (tests.summary.failures > 0) {
        statusText.push(constants.Octicons.Test_Fail + " " + tests.summary.failures + " Failed");
    }
    if (tests.summary.errors > 0) {
        var plural = tests.summary.errors === 1 ? '' : 's';
        statusText.push((constants.Octicons.Test_Error + " " + tests.summary.errors + " Error") + plural);
    }
    if (tests.summary.skipped > 0) {
        statusText.push(constants.Octicons.Test_Skip + " " + tests.summary.skipped + " Skipped");
    }
    return statusText.join(', ').trim();
}
function buildItems(rootDirectory, tests) {
    var items = [];
    items.push({ description: '', label: 'Run All Unit Tests', type: Type.RunAll });
    items.push({ description: '', label: 'Run Unit Test Method ...', type: Type.SelectAndRunMethod });
    var summary = getSummary(tests);
    items.push({ description: '', label: 'View Unit Test Output', type: Type.ViewTestOutput, detail: summary });
    if (tests && tests.summary.failures > 0) {
        items.push({ description: '', label: 'Run Failed Tests', type: Type.RunFailed, detail: constants.Octicons.Test_Fail + " " + tests.summary.failures + " Failed" });
    }
    return items;
}
var statusSortPrefix = {};
statusSortPrefix[contracts_1.TestStatus.Error] = '1';
statusSortPrefix[contracts_1.TestStatus.Fail] = '2';
statusSortPrefix[contracts_1.TestStatus.Skipped] = '3';
statusSortPrefix[contracts_1.TestStatus.Pass] = '4';
function buildItemsForFunctions(rootDirectory, tests, sortBasedOnResults, displayStatusIcons) {
    if (sortBasedOnResults === void 0) { sortBasedOnResults = false; }
    if (displayStatusIcons === void 0) { displayStatusIcons = false; }
    var functionItems = [];
    tests.forEach(function (fn) {
        var classPrefix = fn.parentTestSuite ? fn.parentTestSuite.name + '.' : '';
        var icon = '';
        if (displayStatusIcons && statusIconMapping.has(fn.testFunction.status)) {
            icon = statusIconMapping.get(fn.testFunction.status) + " ";
        }
        functionItems.push({
            description: '',
            detail: path.relative(rootDirectory, fn.parentTestFile.fullPath),
            label: icon + fn.testFunction.name,
            type: Type.RunMethod,
            fn: fn
        });
    });
    functionItems.sort(function (a, b) {
        var sortAPrefix = '5-';
        var sortBPrefix = '5-';
        if (sortBasedOnResults) {
            sortAPrefix = statusSortPrefix[a.fn.testFunction.status] ? statusSortPrefix[a.fn.testFunction.status] : sortAPrefix;
            sortBPrefix = statusSortPrefix[b.fn.testFunction.status] ? statusSortPrefix[b.fn.testFunction.status] : sortBPrefix;
        }
        if (sortAPrefix + a.detail + a.label < sortBPrefix + b.detail + b.label) {
            return -1;
        }
        if (sortAPrefix + a.detail + a.label > sortBPrefix + b.detail + b.label) {
            return 1;
        }
        return 0;
    });
    return functionItems;
}
function onItemSelected(selection) {
    if (!selection || typeof selection.type !== 'number') {
        return;
    }
    var cmd = '';
    var args = [];
    switch (selection.type) {
        case Type.Null: {
            return;
        }
        case Type.RunAll: {
            cmd = constants.Commands.Tests_Run;
            break;
        }
        case Type.ReDiscover: {
            cmd = constants.Commands.Tests_Discover;
            break;
        }
        case Type.ViewTestOutput: {
            cmd = constants.Commands.Tests_ViewOutput;
            break;
        }
        case Type.RunFailed: {
            cmd = constants.Commands.Tests_Run_Failed;
            break;
        }
        case Type.SelectAndRunMethod: {
            cmd = constants.Commands.Tests_Select_And_Run_Method;
            break;
        }
        case Type.RunMethod: {
            cmd = constants.Commands.Tests_Run;
            args.push(selection.fn);
            break;
        }
    }
    (_a = vscode.commands).executeCommand.apply(_a, [cmd].concat(args));
    var _a;
}
//# sourceMappingURL=picker.js.map