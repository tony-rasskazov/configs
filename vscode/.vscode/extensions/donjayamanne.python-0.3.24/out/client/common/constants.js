"use strict";
exports.PythonLanguage = { language: 'python', scheme: 'file' };
var Commands;
(function (Commands) {
    Commands.Set_Interpreter = 'python.setInterpreter';
    Commands.Exec_In_Terminal = 'python.execInTerminal';
    Commands.Exec_Selection_In_Terminal = 'python.execSelectionInTerminal';
    Commands.Tests_View_UI = 'python.viewTestUI';
    Commands.Tests_Picker_UI = 'python.selectTestToRun';
    Commands.Tests_Discover = 'python.discoverTests';
    Commands.Tests_Run_Failed = 'python.runFailedTests';
    Commands.Sort_Imports = 'python.sortImports';
    Commands.Tests_Run = 'python.runtests';
    Commands.Tests_Ask_To_Stop_Test = 'python.askToStopUnitTests';
    Commands.Tests_Ask_To_Stop_Discovery = 'python.askToStopUnitTestDiscovery';
    Commands.Tests_Stop = 'python.stopUnitTests';
    Commands.Tests_ViewOutput = 'python.viewTestOutput';
    Commands.Tests_Select_And_Run_Method = 'python.selectAndRunTestMethod';
    Commands.Refactor_Extract_Variable = 'python.refactorExtractVariable';
    Commands.Refaactor_Extract_Method = 'python.refactorExtractMethod';
})(Commands = exports.Commands || (exports.Commands = {}));
var Octicons;
(function (Octicons) {
    Octicons.Test_Pass = '$(check)';
    Octicons.Test_Fail = '$(alert)';
    Octicons.Test_Error = '$(x)';
    Octicons.Test_Skip = '$(circle-slash)';
})(Octicons = exports.Octicons || (exports.Octicons = {}));
exports.Button_Text_Tests_View_Output = 'View Output';
var Text;
(function (Text) {
    Text.CodeLensUnitTest = 'Test';
})(Text = exports.Text || (exports.Text = {}));
var Delays;
(function (Delays) {
    // Max time to wait before aborting the generation of code lenses for unit tests
    Delays.MaxUnitTestCodeLensDelay = 5000;
})(Delays = exports.Delays || (exports.Delays = {}));
//# sourceMappingURL=constants.js.map