import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Qml"
    Depends { name: "Qt"; submodules: ["core", "network"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtQml"
    libNameForLinkerRelease: "QtQml"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtQml.framework/QtQml"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtQml.framework/QtQml"
    cpp.defines: ["QT_QML_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtQml.framework/Headers"]
    cpp.libraryPaths: []
    
}
