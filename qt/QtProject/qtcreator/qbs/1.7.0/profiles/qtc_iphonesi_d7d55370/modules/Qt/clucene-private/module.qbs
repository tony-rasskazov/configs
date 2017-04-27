import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "CLucene"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core_debug.a", "z", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core.a", "z", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["UIKit", "CoreFoundation", "Foundation"]
    frameworksRelease: ["UIKit", "CoreFoundation", "Foundation"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5CLucene_debug"
    libNameForLinkerRelease: "Qt5CLucene"
    libFilePathDebug: "/Users/tony/Qt/5.4/ios/lib/libQt5CLucene_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.4/ios/lib/libQt5CLucene.a"
    cpp.defines: ["QT_CLUCENE_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/ios/include", "/Users/tony/Qt/5.4/ios/include/QtCLucene", "/Users/tony/Qt/5.4/ios/include/QtCLucene/5.4.2", "/Users/tony/Qt/5.4/ios/include/QtCLucene/5.4.2/QtCLucene"]
    cpp.libraryPaths: ["/Users/tony/Qt/5.4/ios/lib", "/Users/tony/Qt/5.4/ios/lib"]
    isStaticLibrary: true
}
