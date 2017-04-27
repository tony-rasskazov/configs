import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QuickWidgets"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "quick", "widgets"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWidgets"]
    frameworksRelease: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWidgets"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtQuickWidgets"
    libNameForLinkerRelease: "QtQuickWidgets"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtQuickWidgets.framework/QtQuickWidgets"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtQuickWidgets.framework/QtQuickWidgets"
    cpp.defines: ["QT_QUICKWIDGETS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtQuickWidgets.framework/Headers"]
    cpp.libraryPaths: []
    
}
