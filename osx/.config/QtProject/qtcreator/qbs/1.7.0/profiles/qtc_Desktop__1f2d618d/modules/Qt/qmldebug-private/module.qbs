import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QmlDebug"
    Depends { name: "Qt"; submodules: ["core-private", "network", "packetprotocol-private", "qml-private"]}

    hasLibrary: true
    staticLibsDebug: ["/Users/tony/Qt/5.7/clang_64/lib/libQt5PacketProtocol_debug.a"]
    staticLibsRelease: ["/Users/tony/Qt/5.7/clang_64/lib/libQt5PacketProtocol.a"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt5QmlDebug_debug"
    libNameForLinkerRelease: "Qt5QmlDebug"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/libQt5QmlDebug_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/libQt5QmlDebug.a"
    cpp.defines: ["QT_QMLDEBUG_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/include", "/Users/tony/Qt/5.7/clang_64/include/QtQmlDebug", "/Users/tony/Qt/5.7/clang_64/include/QtQmlDebug/5.7.1", "/Users/tony/Qt/5.7/clang_64/include/QtQmlDebug/5.7.1/QtQmlDebug"]
    cpp.libraryPaths: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    isStaticLibrary: true
}
