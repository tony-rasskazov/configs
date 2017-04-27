import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Test"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core_debug.a", "z", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core.a", "z", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["Security", "UIKit", "CoreFoundation", "Foundation"]
    frameworksRelease: ["Security", "UIKit", "CoreFoundation", "Foundation"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Test_debug"
    libNameForLinkerRelease: "Qt5Test"
    libFilePathDebug: "/Users/tony/Qt/5.4/ios/lib/libQt5Test_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.4/ios/lib/libQt5Test.a"
    cpp.defines: ["QT_TESTLIB_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/ios/include", "/Users/tony/Qt/5.4/ios/include/QtTest"]
    cpp.libraryPaths: ["/Users/tony/Qt/5.4/ios/lib", "/Users/tony/Qt/5.4/ios/lib"]
    isStaticLibrary: true
}
