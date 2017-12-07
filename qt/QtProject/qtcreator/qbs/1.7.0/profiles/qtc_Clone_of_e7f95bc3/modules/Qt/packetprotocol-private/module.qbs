import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "PacketProtocol"
    Depends { name: "Qt"; submodules: ["core-private", "qml-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5PacketProtocol"
    libNameForLinkerRelease: "Qt5PacketProtocol"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5PacketProtocol.a"
    cpp.defines: ["QT_PACKETPROTOCOL_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtPacketProtocol", "/home/tony/Qt/5.7/gcc_64/include/QtPacketProtocol/5.7.1", "/home/tony/Qt/5.7/gcc_64/include/QtPacketProtocol/5.7.1/QtPacketProtocol"]
    cpp.libraryPaths: ["/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib"]
    isStaticLibrary: true
}
