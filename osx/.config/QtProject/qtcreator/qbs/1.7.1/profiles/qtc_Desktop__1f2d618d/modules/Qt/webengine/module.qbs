import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebEngine"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "quick", "webenginecore"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWebEngineCore", "QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWebChannel", "QtPositioning"]
    frameworksRelease: ["QtWebEngineCore", "QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWebChannel", "QtPositioning"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtWebEngine"
    libNameForLinkerRelease: "QtWebEngine"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtWebEngine.framework/QtWebEngine"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtWebEngine.framework/QtWebEngine"
    cpp.defines: ["QT_WEBENGINE_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtWebEngine.framework/Headers"]
    cpp.libraryPaths: []
    
}
