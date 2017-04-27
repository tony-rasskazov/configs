import qbs 1.0
import '../QtPlugin.qbs' as QtPlugin

QtPlugin {
    qtModuleName: "qtposition_geoclue"
    Depends { name: "Qt"; submodules: []}

    className: "QGeoPositionInfoSourceFactoryGeoclue"
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Positioning_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5DBus_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core_debug.a", "z", "qtpcre_debug", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Positioning.a", "/Users/tony/Qt/5.7/ios/lib/libQt5DBus.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core.a", "z", "qtpcre", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation"]
    frameworksRelease: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "qtposition_geoclue_debug"
    libNameForLinkerRelease: "qtposition_geoclue"
    libFilePathDebug: "/Users/tony/Qt/5.7/ios/plugins/position/libqtposition_geoclue_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.7/ios/plugins/position/libqtposition_geoclue.a"
    cpp.libraryPaths: ["/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib"]
    isStaticLibrary: true
}
