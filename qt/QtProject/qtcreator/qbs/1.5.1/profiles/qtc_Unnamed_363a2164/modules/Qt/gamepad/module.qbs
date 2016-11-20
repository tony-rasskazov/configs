import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Gamepad"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtGamepad"
    libNameForLinkerRelease: "QtGamepad"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtGamepad.framework/QtGamepad"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtGamepad.framework/QtGamepad"
    cpp.defines: ["QT_GAMEPAD_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtGamepad.framework/Headers"]
    cpp.libraryPaths: []
    
}
