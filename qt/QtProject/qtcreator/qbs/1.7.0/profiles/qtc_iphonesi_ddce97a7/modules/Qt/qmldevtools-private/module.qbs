import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QmlDevTools"
    Depends { name: "Qt"; submodules: ["bootstrap-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport.a"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios.a"]
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5QmlDevTools_debug"
    libNameForLinkerRelease: "Qt5QmlDevTools"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_QMLDEVTOOLS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/ios/include", "/Users/tony/Qt/5.7/ios/include/QtQmlDevTools", "/Users/tony/Qt/5.7/ios/include/QtQmlDevTools/5.7.1", "/Users/tony/Qt/5.7/ios/include/QtQmlDevTools/5.7.1/QtQmlDevTools"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
