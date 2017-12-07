import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QmlDevTools"
    Depends { name: "Qt"; submodules: ["bootstrap-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: ["/opt/compiler_platform/compiled/lib/libQt5Bootstrap.a", "pthread"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5QmlDevTools"
    libNameForLinkerRelease: "Qt5QmlDevTools"
    libFilePathDebug: ""
    libFilePathRelease: "/opt/compiler_platform/compiled/lib/libQt5QmlDevTools.a"
    cpp.defines: ["QT_QMLDEVTOOLS_LIB"]
    cpp.includePaths: ["/opt/compiler_platform/compiled/include", "/opt/compiler_platform/compiled/include/QtQml", "/opt/compiler_platform/compiled/include/QtQml/5.3.2", "/opt/compiler_platform/compiled/include/QtQml/5.3.2/QtQml"]
    cpp.libraryPaths: ["/home/user/work/12_trim/codeclear/external/compiled/lib"]
    isStaticLibrary: true
}
