import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Multimedia"
    Depends { name: "Qt"; submodules: ["core", "network", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworksRelease: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtMultimedia"
    libNameForLinkerRelease: "QtMultimedia"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtMultimedia.framework/QtMultimedia"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtMultimedia.framework/QtMultimedia"
    cpp.defines: ["QT_MULTIMEDIA_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtMultimedia.framework/Headers"]
    cpp.libraryPaths: []
    
}
