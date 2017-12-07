import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebEngineWidgets"
    Depends { name: "Qt"; submodules: ["core", "gui", "webenginecore", "widgets", "network", "quick"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWebEngineCore", "QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWebChannel", "QtWidgets"]
    frameworksRelease: ["QtWebEngineCore", "QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWebChannel", "QtWidgets"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtWebEngineWidgets"
    libNameForLinkerRelease: "QtWebEngineWidgets"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtWebEngineWidgets.framework/QtWebEngineWidgets"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtWebEngineWidgets.framework/QtWebEngineWidgets"
    cpp.defines: ["QT_WEBENGINEWIDGETS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtWebEngineWidgets.framework/Headers"]
    cpp.libraryPaths: []
    
}
