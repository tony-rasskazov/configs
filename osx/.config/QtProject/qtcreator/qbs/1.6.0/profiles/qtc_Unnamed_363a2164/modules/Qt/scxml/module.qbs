import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Scxml"
    Depends { name: "Qt"; submodules: ["core", "qml"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtScxml"
    libNameForLinkerRelease: "QtScxml"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtScxml.framework/QtScxml"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtScxml.framework/QtScxml"
    cpp.defines: ["QT_SCXML_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtScxml.framework/Headers"]
    cpp.libraryPaths: []
    
}
