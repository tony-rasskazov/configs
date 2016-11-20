"use strict";
var fs = require('fs');
var xml2js = require('xml2js');
var contracts_1 = require('./contracts');
(function (PassCalculationFormulae) {
    PassCalculationFormulae[PassCalculationFormulae["pytest"] = 0] = "pytest";
    PassCalculationFormulae[PassCalculationFormulae["nosetests"] = 1] = "nosetests";
})(exports.PassCalculationFormulae || (exports.PassCalculationFormulae = {}));
var PassCalculationFormulae = exports.PassCalculationFormulae;
function getSafeInt(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var num = parseInt(value);
    if (isNaN(num)) {
        return defaultValue;
    }
    return num;
}
function updateResultsFromXmlLogFile(tests, outputXmlFile, passCalculationFormulae) {
    return new Promise(function (resolve, reject) {
        fs.readFile(outputXmlFile, 'utf8', function (err, data) {
            if (err) {
                return reject(err);
            }
            xml2js.parseString(data, function (err, result) {
                if (err) {
                    return reject(err);
                }
                var testSuiteResult = result.testsuite;
                tests.summary.errors = getSafeInt(testSuiteResult.$.errors);
                tests.summary.failures = getSafeInt(testSuiteResult.$.failures);
                tests.summary.skipped = getSafeInt(testSuiteResult.$.skips ? testSuiteResult.$.skips : testSuiteResult.$.skip);
                var testCount = getSafeInt(testSuiteResult.$.tests);
                switch (passCalculationFormulae) {
                    case PassCalculationFormulae.pytest: {
                        tests.summary.passed = testCount - tests.summary.failures - tests.summary.skipped - tests.summary.errors;
                        break;
                    }
                    case PassCalculationFormulae.nosetests: {
                        tests.summary.passed = testCount - tests.summary.failures - tests.summary.skipped - tests.summary.errors;
                        break;
                    }
                    default: {
                        throw new Error("Unknown Test Pass Calculation");
                    }
                }
                if (!Array.isArray(testSuiteResult.testcase)) {
                    return resolve();
                }
                testSuiteResult.testcase.forEach(function (testcase) {
                    var xmlClassName = testcase.$.classname.replace(/\(\)/g, '').replace(/\.\./g, '.').replace(/\.\./g, '.').replace(/\.+$/, '');
                    var result = tests.testFunctions.find(function (fn) { return fn.xmlClassName === xmlClassName && fn.testFunction.name === testcase.$.name; });
                    if (!result) {
                        // Possible we're dealing with nosetests, where the file name isn't returned to us
                        // When dealing with nose tests
                        // It is possible to have a test file named x in two separate test sub directories and have same functions/classes
                        // And unforutnately xunit log doesn't ouput the filename
                        // result = tests.testFunctions.find(fn => fn.testFunction.name === testcase.$.name &&
                        //     fn.parentTestSuite && fn.parentTestSuite.name === testcase.$.classname);
                        // Look for failed file test
                        var fileTest = testcase.$.file && tests.testFiles.find(function (file) { return file.nameToRun === testcase.$.file; });
                        if (fileTest && testcase.error) {
                            fileTest.status = contracts_1.TestStatus.Error;
                            fileTest.passed = false;
                            fileTest.message = testcase.error[0].$.message;
                            fileTest.traceback = testcase.error[0]._;
                        }
                        return;
                    }
                    result.testFunction.line = getSafeInt(testcase.$.line, null);
                    result.testFunction.time = parseFloat(testcase.$.time);
                    result.testFunction.passed = true;
                    result.testFunction.status = contracts_1.TestStatus.Pass;
                    if (testcase.failure) {
                        result.testFunction.status = contracts_1.TestStatus.Fail;
                        result.testFunction.passed = false;
                        result.testFunction.message = testcase.failure[0].$.message;
                        result.testFunction.traceback = testcase.failure[0]._;
                    }
                    if (testcase.error) {
                        result.testFunction.status = contracts_1.TestStatus.Error;
                        result.testFunction.passed = false;
                        result.testFunction.message = testcase.error[0].$.message;
                        result.testFunction.traceback = testcase.error[0]._;
                    }
                    if (testcase.skipped) {
                        result.testFunction.status = contracts_1.TestStatus.Skipped;
                        result.testFunction.passed = null;
                        result.testFunction.message = testcase.skipped[0].$.message;
                        result.testFunction.traceback = '';
                    }
                });
                resolve();
            });
        });
    });
}
exports.updateResultsFromXmlLogFile = updateResultsFromXmlLogFile;
//# sourceMappingURL=xUnitParser.js.map