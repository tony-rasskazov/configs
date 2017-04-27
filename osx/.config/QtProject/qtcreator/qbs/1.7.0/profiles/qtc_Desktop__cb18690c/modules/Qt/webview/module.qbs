import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebView"
    Depends { name: "Qt"; submodules: ["core", "gui", "webengine", "quick", "qml"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWebEngine", "QtQuick", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtQml", "QtNetwork"]
    frameworksRelease: ["QtWebEngine", "QtQuick", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtQml", "QtNetwork"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtWebView"
    libNameForLinkerRelease: "QtWebView"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtWebView.framework/QtWebView"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtWebView.framework/QtWebView"
    cpp.defines: ["QT_WEBVIEW_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtWebView.framework/Headers"]
    cpp.libraryPaths: []
    
}
