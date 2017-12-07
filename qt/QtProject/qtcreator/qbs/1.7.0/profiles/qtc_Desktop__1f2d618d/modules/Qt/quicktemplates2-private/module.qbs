import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QuickTemplates2"
    Depends { name: "Qt"; submodules: ["core", "gui", "quick"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworksRelease: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtQuickTemplates2"
    libNameForLinkerRelease: "QtQuickTemplates2"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtQuickTemplates2.framework/QtQuickTemplates2"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtQuickTemplates2.framework/QtQuickTemplates2"
    cpp.defines: ["QT_QUICKTEMPLATES2_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtQuickTemplates2.framework/Headers", "/Users/tony/Qt/5.7/clang_64/lib/QtQuickTemplates2.framework/Headers/5.7.0", "/Users/tony/Qt/5.7/clang_64/lib/QtQuickTemplates2.framework/Headers/5.7.0/QtQuickTemplates2"]
    cpp.libraryPaths: []
    
}
