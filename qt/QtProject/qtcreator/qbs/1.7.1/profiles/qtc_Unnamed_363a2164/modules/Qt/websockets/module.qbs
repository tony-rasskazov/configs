import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebSockets"
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
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtWebSockets"
    libNameForLinkerRelease: "QtWebSockets"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebSockets.framework/QtWebSockets"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebSockets.framework/QtWebSockets"
    cpp.defines: ["QT_WEBSOCKETS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebSockets.framework/Headers"]
    cpp.libraryPaths: []
    
}
