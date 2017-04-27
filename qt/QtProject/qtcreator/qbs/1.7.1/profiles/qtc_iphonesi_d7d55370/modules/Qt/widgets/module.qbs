import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Widgets"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: true
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Gui_debug.a", "qtharfbuzzng_debug", "/Users/tony/Qt/5.4/ios/lib/libQt5Core_debug.a", "z", "m"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.4/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.4/ios/lib/libQt5Gui.a", "qtharfbuzzng", "/Users/tony/Qt/5.4/ios/lib/libQt5Core.a", "z", "m"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.4/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["UIKit", "CoreFoundation", "Foundation", "CoreText", "CoreGraphics", "OpenGLES", "OpenGLES"]
    frameworksRelease: ["UIKit", "CoreFoundation", "Foundation", "CoreText", "CoreGraphics", "OpenGLES", "OpenGLES"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Widgets_debug"
    libNameForLinkerRelease: "Qt5Widgets"
    libFilePathDebug: "/Users/tony/Qt/5.4/ios/lib/libQt5Widgets_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.4/ios/lib/libQt5Widgets.a"
    cpp.defines: ["QT_WIDGETS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/ios/include", "/Users/tony/Qt/5.4/ios/include/QtWidgets"]
    cpp.libraryPaths: ["/Users/tony/Qt/5.4/ios/lib", "/Users/tony/Qt/5.4/ios/lib"]
    isStaticLibrary: true
}
