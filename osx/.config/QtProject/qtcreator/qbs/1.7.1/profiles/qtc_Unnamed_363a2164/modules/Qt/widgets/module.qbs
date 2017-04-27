import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Widgets"
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
    libNameForLinkerDebug: "QtWidgets"
    libNameForLinkerRelease: "QtWidgets"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWidgets.framework/QtWidgets"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWidgets.framework/QtWidgets"
    cpp.defines: ["QT_WIDGETS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWidgets.framework/Headers"]
    cpp.libraryPaths: []
    
}
