import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "PacketProtocol"
    Depends { name: "Qt"; submodules: ["core-private", "qml-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt5PacketProtocol_debug"
    libNameForLinkerRelease: "Qt5PacketProtocol"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/libQt5PacketProtocol_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/libQt5PacketProtocol.a"
    cpp.defines: ["QT_PACKETPROTOCOL_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/include", "/Users/tony/Qt/5.7/clang_64/include/QtPacketProtocol", "/Users/tony/Qt/5.7/clang_64/include/QtPacketProtocol/5.7.1", "/Users/tony/Qt/5.7/clang_64/include/QtPacketProtocol/5.7.1/QtPacketProtocol"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
