'use strict';
var vscode = require('vscode');
var vscode_1 = require('vscode');
var constants = require('../../common/constants');
var testUtils_1 = require('../common/testUtils');
var TestFileCodeLensProvider = (function () {
    function TestFileCodeLensProvider() {
    }
    TestFileCodeLensProvider.prototype.provideCodeLenses = function (document, token) {
        var testItems = testUtils_1.getDiscoveredTests();
        if (!testItems || testItems.testFiles.length === 0 || testItems.testFunctions.length === 0) {
            return Promise.resolve([]);
        }
        var cancelTokenSrc = new vscode.CancellationTokenSource();
        token.onCancellationRequested(function () { cancelTokenSrc.cancel(); });
        // Strop trying to build the code lenses if unable to get a list of
        // symbols in this file afrer x time
        setTimeout(function () {
            if (!cancelTokenSrc.token.isCancellationRequested) {
                cancelTokenSrc.cancel();
            }
        }, constants.Delays.MaxUnitTestCodeLensDelay);
        return getCodeLenses(document.uri, token);
    };
    TestFileCodeLensProvider.prototype.resolveCodeLens = function (codeLens, token) {
        codeLens.command = { command: 'python.runtests', title: 'Test' };
        return Promise.resolve(codeLens);
    };
    return TestFileCodeLensProvider;
}());
exports.TestFileCodeLensProvider = TestFileCodeLensProvider;
function getCodeLenses(documentUri, token) {
    var tests = testUtils_1.getDiscoveredTests();
    if (!tests) {
        return null;
    }
    var file = tests.testFiles.find(function (file) { return file.fullPath === documentUri.fsPath; });
    if (!file) {
        return Promise.resolve([]);
    }
    var allFuncsAndSuites = getAllTestSuitesAndFunctionsPerFile(file);
    return vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', documentUri, token)
        .then(function (symbols) {
        return symbols.filter(function (symbol) {
            return symbol.kind === vscode.SymbolKind.Function ||
                symbol.kind === vscode.SymbolKind.Method ||
                symbol.kind === vscode.SymbolKind.Class;
        }).map(function (symbol) {
            // This is bloody crucial, if the start and end columns are the same
            // then vscode goes bonkers when ever you edit a line (start scrolling magically)
            var range = new vscode.Range(symbol.location.range.start, new vscode.Position(symbol.location.range.end.line, symbol.location.range.end.character + 1));
            return getCodeLens(documentUri.fsPath, allFuncsAndSuites, range, symbol.name, symbol.kind);
        }).filter(function (codeLens) { return codeLens !== null; });
    }, function (reason) {
        if (token.isCancellationRequested) {
            return [];
        }
        return Promise.reject(reason);
    });
}
// Move all of this rubbis into a separate file // too long
var testParametirizedFunction = /.*\[.*\]/g;
function getCodeLens(fileName, allFuncsAndSuites, range, symbolName, symbolKind) {
    switch (symbolKind) {
        case vscode.SymbolKind.Function:
        case vscode.SymbolKind.Method: {
            return getFunctionCodeLens(fileName, allFuncsAndSuites, symbolName, range);
        }
        case vscode.SymbolKind.Class: {
            var cls = allFuncsAndSuites.suites.find(function (cls) { return cls.name === symbolName; });
            if (!cls) {
                return null;
            }
            return new vscode_1.CodeLens(range, {
                title: constants.Text.CodeLensUnitTest,
                command: constants.Commands.Tests_Run,
                arguments: [{ testSuite: [cls] }]
            });
        }
    }
    return null;
}
function getFunctionCodeLens(filePath, functionsAndSuites, symbolName, range) {
    var fn = functionsAndSuites.functions.find(function (fn) { return fn.name === symbolName; });
    if (fn) {
        return new vscode_1.CodeLens(range, {
            title: constants.Text.CodeLensUnitTest,
            command: constants.Commands.Tests_Run,
            arguments: [{ testFunction: [fn] }]
        });
    }
    // Ok, possible we're dealing with parameterized unit tests
    // If we have [ in the name, then this is a parameterized function
    var functions = functionsAndSuites.functions.filter(function (fn) { return fn.name.startsWith(symbolName + '[') && fn.name.endsWith(']'); });
    if (functions.length === 0) {
        return null;
    }
    if (functions.length === 0) {
        return new vscode_1.CodeLens(range, {
            title: constants.Text.CodeLensUnitTest,
            command: constants.Commands.Tests_Run,
            arguments: [{ testFunction: functions }]
        });
    }
    // Find all flattened functions
    return new vscode_1.CodeLens(range, {
        title: constants.Text.CodeLensUnitTest + ' (Multiple)',
        command: constants.Commands.Tests_Picker_UI,
        arguments: [filePath, functions]
    });
}
function getAllTestSuitesAndFunctionsPerFile(testFile) {
    var all = { functions: testFile.functions, suites: [] };
    testFile.suites.forEach(function (suite) {
        all.suites.push(suite);
        var allChildItems = getAllTestSuitesAndFunctions(suite);
        (_a = all.functions).push.apply(_a, allChildItems.functions);
        (_b = all.suites).push.apply(_b, allChildItems.suites);
        var _a, _b;
    });
    return all;
}
function getAllTestSuitesAndFunctions(testSuite) {
    var all = { functions: [], suites: [] };
    testSuite.functions.forEach(function (fn) {
        all.functions.push(fn);
    });
    testSuite.suites.forEach(function (suite) {
        all.suites.push(suite);
        var allChildItems = getAllTestSuitesAndFunctions(suite);
        (_a = all.functions).push.apply(_a, allChildItems.functions);
        (_b = all.suites).push.apply(_b, allChildItems.suites);
        var _a, _b;
    });
    return all;
}
//# sourceMappingURL=testFiles.js.map