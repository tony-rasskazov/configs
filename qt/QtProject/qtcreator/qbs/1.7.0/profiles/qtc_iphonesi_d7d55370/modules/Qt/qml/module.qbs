import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Qml"
    Depends { name: "Qt"; submodules: ["core", "network"]}

    hasLibrary: true
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Network_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core_debug.a", "z", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Network.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core.a", "z", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["UIKit", "CoreFoundation", "Foundation", "Security", "SystemConfiguration"]
    frameworksRelease: ["UIKit", "CoreFoundation", "Foundation", "Security", "SystemConfiguration"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Qml_debug"
    libNameForLinkerRelease: "Qt5Qml"
    libFilePathDebug: "/Users/tony/Qt/5.4/ios/lib/libQt5Qml_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.4/ios/lib/libQt5Qml.a"
    cpp.defines: ["QT_QML_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/ios/include", "/Users/tony/Qt/5.4/ios/include/QtQml"]
    cpp.libraryPaths: ["/Users/tony/Qt/5.4/ios/lib", "/Users/tony/Qt/5.4/ios/lib"]
    isStaticLibrary: true
}
