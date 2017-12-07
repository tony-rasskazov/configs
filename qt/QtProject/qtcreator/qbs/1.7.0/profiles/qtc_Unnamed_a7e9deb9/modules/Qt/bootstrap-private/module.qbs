import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Bootstrap"
    Depends { name: "Qt"; submodules: []}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: ["pthread", "z"]
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
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5Bootstrap.a"
    cpp.defines: ["QT_BOOTSTRAP_LIB", "QT_BOOTSTRAPPED", "QT_LITE_UNICODE", "QT_NO_CAST_TO_ASCII", "QT_NO_CODECS", "QT_NO_DATASTREAM", "QT_NO_LIBRARY", "QT_NO_QOBJECT", "QT_NO_SYSTEMLOCALE", "QT_NO_THREAD", "QT_NO_UNICODETABLES", "QT_NO_USING_NAMESPACE", "QT_NO_DEPRECATED", "QT_NO_TRANSLATION"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtCore", "/home/tony/Qt/5.7/gcc_64/include/QtCore/5.7.1", "/home/tony/Qt/5.7/gcc_64/include/QtCore/5.7.1/QtCore", "/home/tony/Qt/5.7/gcc_64/include/QtXml", "/home/tony/Qt/5.7/gcc_64/include/QtXml/5.7.1", "/home/tony/Qt/5.7/gcc_64/include/QtXml/5.7.1/QtXml"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
