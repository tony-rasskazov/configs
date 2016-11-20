"use strict";
var contracts_1 = require('./contracts');
var vscode = require('vscode');
var path = require('path');
var constants = require('../../common/constants');
var discoveredTests;
function displayTestErrorMessage(message) {
    vscode.window.showErrorMessage(message, constants.Button_Text_Tests_View_Output).then(function (action) {
        if (action === constants.Button_Text_Tests_View_Output) {
            vscode.commands.executeCommand(constants.Commands.Tests_ViewOutput);
        }
    });
}
exports.displayTestErrorMessage = displayTestErrorMessage;
function getDiscoveredTests() {
    return discoveredTests;
}
exports.getDiscoveredTests = getDiscoveredTests;
function storeDiscoveredTests(tests) {
    discoveredTests = tests;
}
exports.storeDiscoveredTests = storeDiscoveredTests;
function resolveValueAsTestToRun(name, rootDirectory) {
    // TODO: We need a better way to match (currently we have raw name, name, xmlname, etc = which one do we
    // use to identify a file given the full file name, similary for a folder and function
    // Perhaps something like a parser or methods like TestFunction.fromString()... something)
    var tests = getDiscoveredTests();
    if (!tests) {
        return null;
    }
    var absolutePath = path.isAbsolute(name) ? name : path.resolve(rootDirectory, name);
    var testFolders = tests.testFolders.filter(function (folder) { return folder.nameToRun === name || folder.name === name || folder.name === absolutePath; });
    if (testFolders.length > 0) {
        return { testFolder: testFolders };
    }
    ;
    var testFiles = tests.testFiles.filter(function (file) { return file.nameToRun === name || file.name === name || file.fullPath === absolutePath; });
    if (testFiles.length > 0) {
        return { testFile: testFiles };
    }
    ;
    var testFns = tests.testFunctions.filter(function (fn) { return fn.testFunction.nameToRun === name || fn.testFunction.name === name; }).map(function (fn) { return fn.testFunction; });
    if (testFns.length > 0) {
        return { testFunction: testFns };
    }
    ;
    // Just return this as a test file
    return { testFile: [{ name: name, nameToRun: name, functions: [], suites: [], xmlName: name, fullPath: '', time: 0 }] };
}
exports.resolveValueAsTestToRun = resolveValueAsTestToRun;
function extractBetweenDelimiters(content, startDelimiter, endDelimiter) {
    content = content.substring(content.indexOf(startDelimiter) + startDelimiter.length);
    return content.substring(0, content.lastIndexOf(endDelimiter));
}
exports.extractBetweenDelimiters = extractBetweenDelimiters;
function convertFileToPackage(filePath) {
    var lastIndex = filePath.lastIndexOf('.');
    return filePath.substring(0, lastIndex).replace(/\//g, '.').replace(/\\/g, '.');
}
exports.convertFileToPackage = convertFileToPackage;
function updateResults(tests) {
    tests.testFiles.forEach(updateResultsUpstream);
    tests.testFolders.forEach(updateFolderResultsUpstream);
}
exports.updateResults = updateResults;
function updateFolderResultsUpstream(testFolder) {
    var totalTime = 0;
    var allFilesPassed = true;
    var allFilesRan = true;
    testFolder.testFiles.forEach(function (fl) {
        if (allFilesPassed && typeof fl.passed === 'boolean') {
            if (!fl.passed) {
                allFilesPassed = false;
            }
        }
        else {
            allFilesRan = false;
        }
        testFolder.functionsFailed += fl.functionsFailed;
        testFolder.functionsPassed += fl.functionsPassed;
    });
    var allFoldersPassed = true;
    var allFoldersRan = true;
    testFolder.folders.forEach(function (folder) {
        updateFolderResultsUpstream(folder);
        if (allFoldersPassed && typeof folder.passed === 'boolean') {
            if (!folder.passed) {
                allFoldersPassed = false;
            }
        }
        else {
            allFoldersRan = false;
        }
        testFolder.functionsFailed += folder.functionsFailed;
        testFolder.functionsPassed += folder.functionsPassed;
    });
    if (allFilesRan && allFoldersRan) {
        testFolder.passed = allFilesPassed && allFoldersPassed;
        testFolder.status = testFolder.passed ? contracts_1.TestStatus.Idle : contracts_1.TestStatus.Fail;
    }
    else {
        testFolder.passed = null;
        testFolder.status = contracts_1.TestStatus.Unknown;
    }
}
exports.updateFolderResultsUpstream = updateFolderResultsUpstream;
function updateResultsUpstream(test) {
    var totalTime = 0;
    var allFunctionsPassed = true;
    var allFunctionsRan = true;
    test.functions.forEach(function (fn) {
        totalTime += fn.time;
        if (typeof fn.passed === 'boolean') {
            if (fn.passed) {
                test.functionsPassed += 1;
            }
            else {
                test.functionsFailed += 1;
                allFunctionsPassed = false;
            }
        }
        else {
            allFunctionsRan = false;
        }
    });
    var allSuitesPassed = true;
    var allSuitesRan = true;
    test.suites.forEach(function (suite) {
        updateResultsUpstream(suite);
        totalTime += suite.time;
        if (allSuitesRan && typeof suite.passed === 'boolean') {
            if (!suite.passed) {
                allSuitesPassed = false;
            }
        }
        else {
            allSuitesRan = false;
        }
        test.functionsFailed += suite.functionsFailed;
        test.functionsPassed += suite.functionsPassed;
    });
    test.time = totalTime;
    if (allSuitesRan && allFunctionsRan) {
        test.passed = allFunctionsPassed && allSuitesPassed;
        test.status = test.passed ? contracts_1.TestStatus.Idle : contracts_1.TestStatus.Error;
    }
    else {
        test.passed = null;
        test.status = contracts_1.TestStatus.Unknown;
    }
}
exports.updateResultsUpstream = updateResultsUpstream;
function placeTestFilesInFolders(tests) {
    // First get all the unique folders
    var folders = [];
    tests.testFiles.forEach(function (file) {
        var dir = path.dirname(file.name);
        if (folders.indexOf(dir) === -1) {
            folders.push(dir);
        }
    });
    tests.testFolders = [];
    var folderMap = new Map();
    folders.sort();
    folders.forEach(function (dir) {
        dir.split(path.sep).reduce(function (parentPath, currentName, index, values) {
            var newPath = currentName;
            var parentFolder;
            if (parentPath.length > 0) {
                parentFolder = folderMap.get(parentPath);
                newPath = path.join(parentPath, currentName);
            }
            if (!folderMap.has(newPath)) {
                var testFolder_1 = { name: newPath, testFiles: [], folders: [], nameToRun: newPath, time: 0 };
                folderMap.set(newPath, testFolder_1);
                if (parentFolder) {
                    parentFolder.folders.push(testFolder_1);
                }
                else {
                    tests.rootTestFolders.push(testFolder_1);
                }
                tests.testFiles.filter(function (fl) { return path.dirname(fl.name) === newPath; }).forEach(function (testFile) {
                    testFolder_1.testFiles.push(testFile);
                });
                tests.testFolders.push(testFolder_1);
            }
            return newPath;
        }, '');
    });
}
exports.placeTestFilesInFolders = placeTestFilesInFolders;
function flattenTestFiles(testFiles) {
    var fns = [];
    var suites = [];
    testFiles.forEach(function (testFile) {
        // sample test_three (file name without extension and all / replaced with ., meaning this is the package)
        var packageName = convertFileToPackage(testFile.name);
        testFile.functions.forEach(function (fn) {
            fns.push({ testFunction: fn, xmlClassName: packageName, parentTestFile: testFile });
        });
        testFile.suites.forEach(function (suite) {
            suites.push({ parentTestFile: testFile, testSuite: suite, xmlClassName: suite.xmlName });
            flattenTestSuites(fns, suites, testFile, suite);
        });
    });
    var tests = {
        testFiles: testFiles,
        testFunctions: fns, testSuits: suites,
        testFolders: [],
        rootTestFolders: [],
        summary: { passed: 0, failures: 0, errors: 0, skipped: 0 }
    };
    placeTestFilesInFolders(tests);
    return tests;
}
exports.flattenTestFiles = flattenTestFiles;
function flattenTestSuites(flattenedFns, flattenedSuites, testFile, testSuite) {
    testSuite.functions.forEach(function (fn) {
        flattenedFns.push({ testFunction: fn, xmlClassName: testSuite.xmlName, parentTestFile: testFile, parentTestSuite: testSuite });
    });
    // We may have child classes
    testSuite.suites.forEach(function (suite) {
        flattenedSuites.push({ parentTestFile: testFile, testSuite: suite, xmlClassName: suite.xmlName });
        flattenTestSuites(flattenedFns, flattenedSuites, testFile, suite);
    });
}
exports.flattenTestSuites = flattenTestSuites;
function resetTestResults(tests) {
    tests.testFolders.forEach(function (f) {
        f.functionsDidNotRun = 0;
        f.functionsFailed = 0;
        f.functionsPassed = 0;
        f.passed = null;
        f.status = contracts_1.TestStatus.Unknown;
    });
    tests.testFunctions.forEach(function (fn) {
        fn.testFunction.passed = null;
        fn.testFunction.time = 0;
        fn.testFunction.message = '';
        fn.testFunction.traceback = '';
        fn.testFunction.status = contracts_1.TestStatus.Unknown;
        fn.testFunction.functionsFailed = 0;
        fn.testFunction.functionsPassed = 0;
        fn.testFunction.functionsDidNotRun = 0;
    });
    tests.testSuits.forEach(function (suite) {
        suite.testSuite.passed = null;
        suite.testSuite.time = 0;
        suite.testSuite.status = contracts_1.TestStatus.Unknown;
        suite.testSuite.functionsFailed = 0;
        suite.testSuite.functionsPassed = 0;
        suite.testSuite.functionsDidNotRun = 0;
    });
    tests.testFiles.forEach(function (testFile) {
        testFile.passed = null;
        testFile.time = 0;
        testFile.status = contracts_1.TestStatus.Unknown;
        testFile.functionsFailed = 0;
        testFile.functionsPassed = 0;
        testFile.functionsDidNotRun = 0;
    });
}
exports.resetTestResults = resetTestResults;
//# sourceMappingURL=testUtils.js.map