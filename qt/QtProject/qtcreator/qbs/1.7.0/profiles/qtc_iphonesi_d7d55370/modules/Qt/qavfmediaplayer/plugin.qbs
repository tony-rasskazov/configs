import qbs 1.0
import '../QtPlugin.qbs' as QtPlugin

QtPlugin {
    qtModuleName: "qavfmediaplayer"
    Depends { name: "Qt"; submodules: []}

    className: "AVFMediaPlayerServicePlugin"
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5MultimediaWidgets_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5OpenGL_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Multimedia_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Widgets_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Gui_debug.a", "qtharfbuzzng_debug", "/Users/tony/Qt/5.4/ios/lib/libQt5Network_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core_debug.a", "z", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.4/ios/lib/libQt5MultimediaWidgets.a", "/Users/tony/Qt/5.4/ios/lib/libQt5OpenGL.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Multimedia.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Widgets.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Gui.a", "qtharfbuzzng", "/Users/tony/Qt/5.4/ios/lib/libQt5Network.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Core.a", "z", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["AVFoundation", "CoreMedia", "UIKit", "CoreFoundation", "Foundation", "Security", "SystemConfiguration", "CoreText", "CoreGraphics", "OpenGLES"]
    frameworksRelease: ["AVFoundation", "CoreMedia", "UIKit", "CoreFoundation", "Foundation", "Security", "SystemConfiguration", "CoreText", "CoreGraphics", "OpenGLES"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "qavfmediaplayer_debug"
    libNameForLinkerRelease: "qavfmediaplayer"
    libFilePathDebug: "/Users/tony/Qt/5.4/ios/plugins/mediaservice/libqavfmediaplayer_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.4/ios/plugins/mediaservice/libqavfmediaplayer.a"
    cpp.libraryPaths: ["/Users/tony/Qt/5.4/ios/lib", "/Users/tony/Qt/5.4/ios/lib", "/Users/tony/Qt/5.4/ios/lib", "/Users/tony/Qt/5.4/ios/lib"]
    isStaticLibrary: true
}
