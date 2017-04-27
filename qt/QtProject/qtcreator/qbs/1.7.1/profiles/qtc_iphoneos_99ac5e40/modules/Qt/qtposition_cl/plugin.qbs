import qbs 1.0
import '../QtPlugin.qbs' as QtPlugin

QtPlugin {
    qtModuleName: "qtposition_cl"
    Depends { name: "Qt"; submodules: []}

    className: "QGeoPositionInfoSourceFactoryCL"
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Positioning_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core_debug.a", "z", "qtpcre_debug", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Positioning.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core.a", "z", "qtpcre", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["CoreFoundation", "CoreLocation", "MobileCoreServices", "Foundation", "UIKit"]
    frameworksRelease: ["CoreFoundation", "CoreLocation", "MobileCoreServices", "Foundation", "UIKit"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "qtposition_cl_debug"
    libNameForLinkerRelease: "qtposition_cl"
    libFilePathDebug: "/Users/tony/Qt/5.7/ios/plugins/position/libqtposition_cl_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.7/ios/plugins/position/libqtposition_cl.a"
    cpp.libraryPaths: ["/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib"]
    isStaticLibrary: true
}
