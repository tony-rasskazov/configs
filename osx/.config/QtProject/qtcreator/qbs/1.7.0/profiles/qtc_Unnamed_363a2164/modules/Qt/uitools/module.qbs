import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "UiTools"
    Depends { name: "Qt"; submodules: ["core", "gui", "widgets"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "OpenGL", "AGL"]
    frameworksRelease: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "OpenGL", "AGL"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt5UiTools_debug"
    libNameForLinkerRelease: "Qt5UiTools"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/libQt5UiTools_debug.a"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/libQt5UiTools.a"
    cpp.defines: ["QT_UITOOLS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/include", "/Users/tony/Qt5.7.0/5.7/clang_64/include/QtUiTools"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
