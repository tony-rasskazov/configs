import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Network"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtNetwork"
    libNameForLinkerRelease: "QtNetwork"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtNetwork.framework/QtNetwork"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtNetwork.framework/QtNetwork"
    cpp.defines: ["QT_NETWORK_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtNetwork.framework/Headers"]
    cpp.libraryPaths: []
    
}
