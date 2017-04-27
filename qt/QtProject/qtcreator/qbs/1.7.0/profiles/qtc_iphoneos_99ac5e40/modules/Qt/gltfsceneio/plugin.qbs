import qbs 1.0
import '../QtPlugin.qbs' as QtPlugin

QtPlugin {
    qtModuleName: "gltfsceneio"
    Depends { name: "Qt"; submodules: []}

    className: "GLTFSceneIOPlugin"
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DExtras_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DRender_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5OpenGLExtensions_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DInput_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DLogic_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DCore_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Gamepad_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Gui_debug.a", "qtpng_debug", "qtharfbuzzng_debug", "/Users/tony/Qt/5.7/ios/lib/libQt5Network_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Concurrent_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core_debug.a", "z", "qtpcre_debug", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DExtras.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DRender.a", "/Users/tony/Qt/5.7/ios/lib/libQt5OpenGLExtensions.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DInput.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DLogic.a", "/Users/tony/Qt/5.7/ios/lib/libQt53DCore.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Gamepad.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Gui.a", "qtpng", "qtharfbuzzng", "/Users/tony/Qt/5.7/ios/lib/libQt5Network.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Concurrent.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core.a", "z", "qtpcre", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation", "CoreText", "CoreGraphics", "OpenGLES", "Security", "SystemConfiguration"]
    frameworksRelease: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation", "CoreText", "CoreGraphics", "OpenGLES", "Security", "SystemConfiguration"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "gltfsceneio_debug"
    libNameForLinkerRelease: "gltfsceneio"
    libFilePathDebug: "/Users/tony/Qt/5.7/ios/plugins/sceneparsers/libgltfsceneio_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.7/ios/plugins/sceneparsers/libgltfsceneio.a"
    cpp.libraryPaths: ["/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib"]
    isStaticLibrary: true
}
