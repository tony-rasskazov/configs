import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "MacExtras"
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
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtMacExtras"
    libNameForLinkerRelease: "QtMacExtras"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtMacExtras.framework/QtMacExtras"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtMacExtras.framework/QtMacExtras"
    cpp.defines: ["QT_MACEXTRAS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtMacExtras.framework/Headers"]
    cpp.libraryPaths: []
    
}
