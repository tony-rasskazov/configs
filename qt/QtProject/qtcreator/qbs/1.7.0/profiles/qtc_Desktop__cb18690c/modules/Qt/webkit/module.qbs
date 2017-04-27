import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebKit"
    Depends { name: "Qt"; submodules: ["core", "gui", "network"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork"]
    frameworksRelease: ["QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtWebKit"
    libNameForLinkerRelease: "QtWebKit"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtWebKit.framework/QtWebKit"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtWebKit.framework/QtWebKit"
    cpp.defines: ["QT_WEBKIT_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtWebKit.framework/Headers"]
    cpp.libraryPaths: []
    
}
