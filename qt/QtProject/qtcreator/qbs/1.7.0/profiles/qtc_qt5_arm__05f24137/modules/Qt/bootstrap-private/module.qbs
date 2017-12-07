import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Bootstrap"
    Depends { name: "Qt"; submodules: []}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: ["pthread"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Bootstrap"
    libNameForLinkerRelease: "Qt5Bootstrap"
    libFilePathDebug: ""
    libFilePathRelease: "/opt/compiler_platform/compiled/lib/libQt5Bootstrap.a"
    cpp.defines: ["QT_BOOTSTRAP_LIB", "QT_BOOTSTRAPPED", "QT_LITE_UNICODE", "QT_NO_CAST_TO_ASCII", "QT_NO_CODECS", "QT_NO_DATASTREAM", "QT_NO_LIBRARY", "QT_NO_QOBJECT", "QT_NO_SYSTEMLOCALE", "QT_NO_THREAD", "QT_NO_UNICODETABLES", "QT_NO_USING_NAMESPACE", "QT_NO_DEPRECATED", "QT_NO_TRANSLATION", "QT_QMAKE_LOCATION=\\\"/home/user/work/12_trim/codeclear/external/qt-everywhere-opensource-src-5.3.2/qtbase/bin/qmake\\\""]
    cpp.includePaths: ["/opt/compiler_platform/compiled/include", "/opt/compiler_platform/compiled/include/QtCore", "/opt/compiler_platform/compiled/include/QtXml", "/opt/compiler_platform/compiled/include/QtCore/5.3.2", "/opt/compiler_platform/compiled/include/QtCore/5.3.2/QtCore", "/opt/compiler_platform/compiled/include/QtXml/5.3.2", "/opt/compiler_platform/compiled/include/QtXml/5.3.2/QtXml"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
