import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "XmlPatterns"
    Depends { name: "Qt"; submodules: ["core", "network"]}

    hasLibrary: true
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Network_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core_debug.a", "z", "qtpcre_debug", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Network.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core.a", "z", "qtpcre", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation", "Security", "SystemConfiguration"]
    frameworksRelease: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation", "Security", "SystemConfiguration"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5XmlPatterns_debug"
    libNameForLinkerRelease: "Qt5XmlPatterns"
    libFilePathDebug: "/Users/tony/Qt/5.7/ios/lib/libQt5XmlPatterns_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.7/ios/lib/libQt5XmlPatterns.a"
    cpp.defines: ["QT_XMLPATTERNS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/ios/include", "/Users/tony/Qt/5.7/ios/include/QtXmlPatterns"]
    cpp.libraryPaths: ["/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib"]
    isStaticLibrary: true
}
