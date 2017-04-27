import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "ScriptTools"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtScriptTools"
    libNameForLinkerRelease: "QtScriptTools"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtScriptTools.framework/QtScriptTools"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtScriptTools.framework/QtScriptTools"
    cpp.defines: ["QT_SCRIPTTOOLS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtScriptTools.framework/Headers"]
    cpp.libraryPaths: []
    
}
