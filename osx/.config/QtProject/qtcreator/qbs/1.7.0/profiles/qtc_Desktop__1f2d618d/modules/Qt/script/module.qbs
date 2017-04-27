import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Script"
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
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtScript"
    libNameForLinkerRelease: "QtScript"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtScript.framework/QtScript"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtScript.framework/QtScript"
    cpp.defines: ["QT_SCRIPT_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtScript.framework/Headers"]
    cpp.libraryPaths: []
    
}
