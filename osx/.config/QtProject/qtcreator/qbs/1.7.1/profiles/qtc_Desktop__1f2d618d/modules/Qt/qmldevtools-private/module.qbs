import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QmlDevTools"
    Depends { name: "Qt"; submodules: ["core-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: ["QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: []
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt5QmlDevTools_debug"
    libNameForLinkerRelease: "Qt5QmlDevTools"
    libFilePathDebug: ""
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/libQt5QmlDevTools.a"
    cpp.defines: ["QT_QMLDEVTOOLS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/include", "/Users/tony/Qt/5.7/clang_64/include/QtQmlDevTools", "/Users/tony/Qt/5.7/clang_64/include/QtQmlDevTools/5.7.1", "/Users/tony/Qt/5.7/clang_64/include/QtQmlDevTools/5.7.1/QtQmlDevTools"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
