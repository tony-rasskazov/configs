import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebView"
    Depends { name: "Qt"; submodules: []}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworksRelease: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtWebView"
    libNameForLinkerRelease: "QtWebView"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebView.framework/QtWebView"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebView.framework/QtWebView"
    cpp.defines: ["QT_WEBVIEW_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebView.framework/Headers"]
    cpp.libraryPaths: []
    
}
