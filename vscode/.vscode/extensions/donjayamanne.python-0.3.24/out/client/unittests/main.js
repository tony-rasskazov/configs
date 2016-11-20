'use strict';
var vscode = require('vscode');
var contracts_1 = require('./common/contracts');
var nosetests = require('./nosetest/main');
var pytest = require('./pytest/main');
var unittest = require('./unittest/main');
var testUtils_1 = require('./common/testUtils');
var configSettings_1 = require('../common/configSettings');
var main_1 = require('./display/main');
var picker_1 = require('./display/picker');
var constants = require('../common/constants');
var main_2 = require('./codeLenses/main');
var settings = configSettings_1.PythonSettings.getInstance();
var testManager;
var pyTestManager;
var unittestManager;
var nosetestManager;
var testResultDisplay;
var testDisplay;
var outChannel;
var lastRanTests = null;
function activate(context, outputChannel) {
    context.subscriptions.push({ dispose: dispose });
    outChannel = outputChannel;
    var disposables = registerCommands();
    (_a = context.subscriptions).push.apply(_a, disposables);
    // Ignore the exceptions returned
    // This function is invoked via a command which will be invoked else where in the extension
    discoverTests(true, true).catch(function () {
        // Ignore the errors
        var x = '';
    });
    settings.addListener('change', onConfigChanged);
    context.subscriptions.push(main_2.activateCodeLenses());
    var _a;
}
exports.activate = activate;
function dispose() {
    if (pyTestManager) {
        pyTestManager.dispose();
    }
    if (nosetestManager) {
        nosetestManager.dispose();
    }
    if (unittestManager) {
        unittestManager.dispose();
    }
}
function registerCommands() {
    var disposables = [];
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Discover, function (quiteMode) {
        // Ignore the exceptions returned
        // This command will be invoked else where in the extension
        discoverTests(true, quiteMode).catch(function () { return null; });
    }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Run_Failed, function () { return runTestsImpl(true); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Run, function (testId) { return runTestsImpl(testId); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_View_UI, function () { return displayUI(); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Picker_UI, function (file, testFunctions) { return displayPickerUI(file, testFunctions); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Stop, function () { return stopTests(); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_ViewOutput, function () { return outChannel.show(); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Ask_To_Stop_Discovery, function () { return displayStopUI('Stop discovering tests'); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Ask_To_Stop_Test, function () { return displayStopUI('Stop running tests'); }));
    disposables.push(vscode.commands.registerCommand(constants.Commands.Tests_Select_And_Run_Method, function () { return selectAndRunTestMethod(); }));
    return disposables;
}
function displayUI() {
    var testManager = getTestRunner();
    if (!testManager) {
        return displayTestFrameworkError();
    }
    testDisplay = testDisplay ? testDisplay : new picker_1.TestDisplay();
    testDisplay.displayTestUI(vscode.workspace.rootPath);
}
function displayPickerUI(file, testFunctions) {
    var testManager = getTestRunner();
    if (!testManager) {
        return displayTestFrameworkError();
    }
    testDisplay = testDisplay ? testDisplay : new picker_1.TestDisplay();
    testDisplay.displayFunctionTestPickerUI(vscode.workspace.rootPath, file, testFunctions);
}
function selectAndRunTestMethod() {
    var testManager = getTestRunner();
    if (!testManager) {
        return displayTestFrameworkError();
    }
    testManager.discoverTests(true, true).then(function () {
        var tests = testUtils_1.getDiscoveredTests();
        testDisplay = testDisplay ? testDisplay : new picker_1.TestDisplay();
        testDisplay.selectTestFunction(vscode.workspace.rootPath, tests).then(function (testFn) {
            runTestsImpl(testFn);
        }).catch(function () { });
    });
}
function displayStopUI(message) {
    var testManager = getTestRunner();
    if (!testManager) {
        return displayTestFrameworkError();
    }
    testDisplay = testDisplay ? testDisplay : new picker_1.TestDisplay();
    testDisplay.displayStopTestUI(message);
}
var uniTestSettingsString = JSON.stringify(settings.unitTest);
function onConfigChanged() {
    // Possible that a test framework has been enabled or some settings have changed
    // Meaning we need to re-load the discovered tests (as something could have changed)
    var newSettings = JSON.stringify(settings.unitTest);
    if (uniTestSettingsString === newSettings) {
        return;
    }
    uniTestSettingsString = newSettings;
    if (!settings.unitTest.nosetestsEnabled && !settings.unitTest.pyTestEnabled && !settings.unitTest.unittestEnabled) {
        if (testResultDisplay) {
            testResultDisplay.enabled = false;
        }
        if (testManager) {
            testManager.stop();
            testManager = null;
        }
        if (pyTestManager) {
            pyTestManager.dispose();
            pyTestManager = null;
        }
        if (nosetestManager) {
            nosetestManager.dispose();
            nosetestManager = null;
        }
        if (unittestManager) {
            unittestManager.dispose();
            unittestManager = null;
        }
        return;
    }
    if (testResultDisplay) {
        testResultDisplay.enabled = true;
    }
    // No need to display errors
    discoverTests(true, true);
}
function displayTestFrameworkError() {
    if (settings.unitTest.pyTestEnabled && settings.unitTest.nosetestsEnabled && settings.unitTest.unittestEnabled) {
        vscode.window.showErrorMessage("Enable only one of the test frameworks (nosetest or pytest), not both.");
    }
    else {
        vscode.window.showInformationMessage('Please enable one of the test frameworks (unittest, pytest or nosetest)');
    }
    return null;
}
function getTestRunner() {
    var rootDirectory = vscode.workspace.rootPath;
    if (settings.unitTest.nosetestsEnabled) {
        return nosetestManager = nosetestManager ? nosetestManager : new nosetests.TestManager(rootDirectory, outChannel);
    }
    else if (settings.unitTest.pyTestEnabled) {
        return pyTestManager = pyTestManager ? pyTestManager : new pytest.TestManager(rootDirectory, outChannel);
    }
    else if (settings.unitTest.unittestEnabled) {
        return unittestManager = unittestManager ? unittestManager : new unittest.TestManager(rootDirectory, outChannel);
    }
    return null;
}
function stopTests() {
    var testManager = getTestRunner();
    if (testManager) {
        testManager.stop();
    }
}
function discoverTests(ignoreCache, quietMode) {
    if (quietMode === void 0) { quietMode = false; }
    var testManager = getTestRunner();
    if (!testManager) {
        if (!quietMode) {
            displayTestFrameworkError();
        }
        return Promise.resolve(null);
    }
    if (testManager && (testManager.status !== contracts_1.TestStatus.Discovering && testManager.status !== contracts_1.TestStatus.Running)) {
        testResultDisplay = testResultDisplay ? testResultDisplay : new main_1.TestResultDisplay(outChannel);
        return testResultDisplay.DisplayDiscoverStatus(testManager.discoverTests(ignoreCache, quietMode), quietMode);
    }
    else {
        return Promise.resolve(null);
    }
}
function isTestsToRun(arg) {
    if (arg && arg.testFunction && Array.isArray(arg.testFunction)) {
        return true;
    }
    if (arg && arg.testSuite && Array.isArray(arg.testSuite)) {
        return true;
    }
    if (arg && arg.testFile && Array.isArray(arg.testFile)) {
        return true;
    }
    return false;
}
function isUri(arg) {
    return arg && arg.fsPath && typeof arg.fsPath === 'string';
}
function isFlattenedTestFunction(arg) {
    return arg && arg.testFunction && typeof arg.xmlClassName === 'string' &&
        arg.parentTestFile && typeof arg.testFunction.name === 'string';
}
function identifyTestType(rootDirectory, arg) {
    if (typeof arg === 'boolean') {
        return arg === true;
    }
    if (isTestsToRun(arg)) {
        return arg;
    }
    if (isFlattenedTestFunction(arg)) {
        return { testFunction: [arg.testFunction] };
    }
    if (isUri(arg)) {
        return testUtils_1.resolveValueAsTestToRun(arg.fsPath, rootDirectory);
    }
    return null;
}
function runTestsImpl(arg) {
    var testManager = getTestRunner();
    if (!testManager) {
        return displayTestFrameworkError();
    }
    // lastRanTests = testsToRun;
    var runInfo = identifyTestType(vscode.workspace.rootPath, arg);
    testResultDisplay = testResultDisplay ? testResultDisplay : new main_1.TestResultDisplay(outChannel);
    var runPromise = testManager.runTest(runInfo).catch(function (reason) {
        if (reason !== contracts_1.CANCELLATION_REASON) {
            outChannel.appendLine('Error: ' + reason);
        }
        return Promise.reject(reason);
    });
    testResultDisplay.DisplayProgressStatus(runPromise);
}
//# sourceMappingURL=main.js.map