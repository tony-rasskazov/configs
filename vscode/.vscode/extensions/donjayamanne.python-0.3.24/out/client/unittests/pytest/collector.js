'use strict';
var utils_1 = require('./../../common/utils');
var os = require('os');
var testUtils_1 = require('../common/testUtils');
var path = require('path');
var configSettings_1 = require('../../common/configSettings');
var pythonSettings = configSettings_1.PythonSettings.getInstance();
var argsToExcludeForDiscovery = ['--lf', '--last-failed', '--markers', '-x',
    '--exitfirst', '--maxfail', '--fixtures', '--funcargs', '-pdb', '--capture',
    '-s', ' --runxfail', ' --ff', '--failed-first', '--cache-show', '--cache-clear',
    '-v', '--verbose', '-q', '-quiet', '-r ', '--report', '--tb', '--color',
    '--durations', '--pastebin', '--junit-xml=path', '--junit-prefix',
    '--result-log', '--version', '-h', '--help', '--debug'];
var settingsInArgsToExcludeForDiscovery = ['--maxfail', '--capture',
    '-r ', '--report', '--tb', '--color', '--durations', '--pastebin',
    '--junit-xml=path', '--junit-prefix', '--result-log'];
function discoverTests(rootDirectory, args, token, ignoreCache) {
    var logOutputLines = [''];
    var testFiles = [];
    var parentNodes = [];
    var collectionCountReported = false;
    var errorLine = /==*( *)ERRORS( *)=*/;
    var errorFileLine = /__*( *)ERROR collecting (.*)/;
    var lastLineWithErrors = /==*.*/;
    var haveErrors = false;
    // Remove unwanted arguments
    args = args.filter(function (arg) {
        if (argsToExcludeForDiscovery.indexOf(arg.trim()) !== -1) {
            return false;
        }
        if (settingsInArgsToExcludeForDiscovery.some(function (setting) { return setting.indexOf(arg.trim()) === 0; })) {
            return false;
        }
        return true;
    });
    if (ignoreCache && args.indexOf('--cache-clear') === -1) {
        args.push('--cache-clear');
    }
    function processOutput(output) {
        output.split(/\r?\n/g).forEach(function (line, index, lines) {
            if (token && token.isCancellationRequested) {
                return;
            }
            if (line.trim().startsWith('<Module \'')) {
                // process the previous lines
                parsePyTestModuleCollectionResult(rootDirectory, logOutputLines, testFiles, parentNodes);
                logOutputLines = [''];
            }
            if (errorLine.test(line)) {
                haveErrors = true;
                logOutputLines = [''];
                return;
            }
            if (errorFileLine.test(line)) {
                haveErrors = true;
                if (logOutputLines.length !== 1 && logOutputLines[0].length !== 0) {
                    parsePyTestModuleCollectionError(rootDirectory, logOutputLines, testFiles, parentNodes);
                    logOutputLines = [''];
                }
            }
            if (lastLineWithErrors.test(line) && haveErrors) {
                parsePyTestModuleCollectionError(rootDirectory, logOutputLines, testFiles, parentNodes);
                logOutputLines = [''];
            }
            if (index === 0) {
                if (output.startsWith(os.EOL) || lines.length > 1) {
                    logOutputLines[logOutputLines.length - 1] += line;
                    logOutputLines.push('');
                    return;
                }
                logOutputLines[logOutputLines.length - 1] += line;
                return;
            }
            if (index === lines.length - 1) {
                logOutputLines[logOutputLines.length - 1] += line;
                return;
            }
            logOutputLines[logOutputLines.length - 1] += line;
            logOutputLines.push('');
            return;
        });
    }
    return utils_1.execPythonFile(pythonSettings.unitTest.pyTestPath, args.concat(['--collect-only']), rootDirectory, false, processOutput, token)
        .then(function () {
        if (token && token.isCancellationRequested) {
            return Promise.reject('cancelled');
        }
        // process the last entry
        parsePyTestModuleCollectionResult(rootDirectory, logOutputLines, testFiles, parentNodes);
        return testUtils_1.flattenTestFiles(testFiles);
    });
}
exports.discoverTests = discoverTests;
var DELIMITER = '\'';
var DEFAULT_CLASS_INDENT = 2;
function parsePyTestModuleCollectionError(rootDirectory, lines, testFiles, parentNodes) {
    lines = lines.filter(function (line) { return line.trim().length > 0; });
    if (lines.length <= 1) {
        return;
    }
    var errorFileLine = lines[0];
    var fileName = errorFileLine.substring(errorFileLine.indexOf('ERROR collecting') + 'ERROR collecting'.length).trim();
    fileName = fileName.substr(0, fileName.lastIndexOf(' '));
    var currentPackage = testUtils_1.convertFileToPackage(fileName);
    var fullyQualifiedName = path.isAbsolute(fileName) ? fileName : path.resolve(rootDirectory, fileName);
    var testFile = {
        functions: [], suites: [], name: fileName, fullPath: fullyQualifiedName,
        nameToRun: fileName, xmlName: currentPackage, time: 0, errorsWhenDiscovering: lines.join('\n')
    };
    testFiles.push(testFile);
    parentNodes.push({ indent: 0, item: testFile });
    return;
}
function parsePyTestModuleCollectionResult(rootDirectory, lines, testFiles, parentNodes) {
    var currentPackage = '';
    lines.forEach(function (line) {
        var trimmedLine = line.trim();
        var name = testUtils_1.extractBetweenDelimiters(trimmedLine, DELIMITER, DELIMITER);
        var indent = line.indexOf('<');
        if (trimmedLine.startsWith('<Module \'')) {
            currentPackage = testUtils_1.convertFileToPackage(name);
            var fullyQualifiedName = path.isAbsolute(name) ? name : path.resolve(rootDirectory, name);
            var testFile = {
                functions: [], suites: [], name: name, fullPath: fullyQualifiedName,
                nameToRun: name, xmlName: currentPackage, time: 0
            };
            testFiles.push(testFile);
            parentNodes.push({ indent: indent, item: testFile });
            return;
        }
        var parentNode = findParentOfCurrentItem(indent, parentNodes);
        if (trimmedLine.startsWith('<Class \'') || trimmedLine.startsWith('<UnitTestCase \'')) {
            var isUnitTest = trimmedLine.startsWith('<UnitTestCase \'');
            var rawName = parentNode.item.nameToRun + ("::" + name);
            var xmlName = parentNode.item.xmlName + ("." + name);
            var testSuite = { name: name, nameToRun: rawName, functions: [], suites: [], isUnitTest: isUnitTest, isInstance: false, xmlName: xmlName, time: 0 };
            parentNode.item.suites.push(testSuite);
            parentNodes.push({ indent: indent, item: testSuite });
            return;
        }
        if (trimmedLine.startsWith('<Instance \'')) {
            var suite_1 = parentNode.item;
            // suite.rawName = suite.rawName + '::()';
            // suite.xmlName = suite.xmlName + '.()';
            suite_1.isInstance = true;
            return;
        }
        if (trimmedLine.startsWith('<TestCaseFunction \'') || trimmedLine.startsWith('<Function \'')) {
            var rawName = parentNode.item.nameToRun + '::' + name;
            var fn = { name: name, nameToRun: rawName, time: 0 };
            parentNode.item.functions.push(fn);
            return;
        }
    });
}
function findParentOfCurrentItem(indentOfCurrentItem, parentNodes) {
    while (parentNodes.length > 0) {
        var parentNode = parentNodes[parentNodes.length - 1];
        if (parentNode.indent < indentOfCurrentItem) {
            return parentNode;
        }
        parentNodes.pop();
        continue;
    }
    return null;
}
/* Sample output from py.test --collect-only
<Module 'test_another.py'>
  <Class 'Test_CheckMyApp'>
    <Instance '()'>
      <Function 'test_simple_check'>
      <Function 'test_complex_check'>
<Module 'test_one.py'>
  <UnitTestCase 'Test_test1'>
    <TestCaseFunction 'test_A'>
    <TestCaseFunction 'test_B'>
<Module 'test_two.py'>
  <UnitTestCase 'Test_test1'>
    <TestCaseFunction 'test_A2'>
    <TestCaseFunction 'test_B2'>
<Module 'testPasswords/test_Pwd.py'>
  <UnitTestCase 'Test_Pwd'>
    <TestCaseFunction 'test_APwd'>
    <TestCaseFunction 'test_BPwd'>
<Module 'testPasswords/test_multi.py'>
  <Class 'Test_CheckMyApp'>
    <Instance '()'>
      <Function 'test_simple_check'>
      <Function 'test_complex_check'>
      <Class 'Test_NestedClassA'>
        <Instance '()'>
          <Function 'test_nested_class_methodB'>
          <Class 'Test_nested_classB_Of_A'>
            <Instance '()'>
              <Function 'test_d'>
  <Function 'test_username'>
  <Function 'test_parametrized_username[one]'>
  <Function 'test_parametrized_username[two]'>
  <Function 'test_parametrized_username[three]'>
*/
//# sourceMappingURL=collector.js.map