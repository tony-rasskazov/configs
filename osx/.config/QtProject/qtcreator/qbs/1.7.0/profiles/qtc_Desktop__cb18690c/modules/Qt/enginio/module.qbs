import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Enginio"
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
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "Enginio"
    libNameForLinkerRelease: "Enginio"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/Enginio.framework/Enginio"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/Enginio.framework/Enginio"
    cpp.defines: ["QT_ENGINIO_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/Enginio.framework/Headers"]
    cpp.libraryPaths: []
    
}
