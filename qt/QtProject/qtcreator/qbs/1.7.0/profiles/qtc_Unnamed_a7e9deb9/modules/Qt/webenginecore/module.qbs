import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebEngineCore"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "quick", "webchannel", "positioning"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Quick.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gui.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gui.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread", "/home/tony/Qt/5.7/gcc_64/lib/libQt5WebChannel.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Positioning.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5WebEngineCore"
    libNameForLinkerRelease: "Qt5WebEngineCore"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5WebEngineCore.so.5.7.1"
    cpp.defines: ["QT_WEBENGINECORE_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtWebEngineCore"]
    cpp.libraryPaths: ["/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib", "/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib", "/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib"]
    
}
