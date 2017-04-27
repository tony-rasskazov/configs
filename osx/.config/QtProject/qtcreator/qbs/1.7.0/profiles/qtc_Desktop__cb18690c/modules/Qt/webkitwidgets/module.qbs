import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebKitWidgets"
    Depends { name: "Qt"; submodules: ["core", "gui", "widgets", "network", "webkit"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtWebKit", "QtNetwork"]
    frameworksRelease: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtWebKit", "QtNetwork"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtWebKitWidgets"
    libNameForLinkerRelease: "QtWebKitWidgets"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtWebKitWidgets.framework/QtWebKitWidgets"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtWebKitWidgets.framework/QtWebKitWidgets"
    cpp.defines: ["QT_WEBKITWIDGETS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtWebKitWidgets.framework/Headers"]
    cpp.libraryPaths: []
    
}
