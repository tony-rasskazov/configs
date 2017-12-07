import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "XcbQpa"
    Depends { name: "Qt"; submodules: ["core", "gui", "core-private", "gui-private", "platformsupport-private", "dbus"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["X11-xcb", "Xi", "SM", "ICE", "dbus-1", "xcb", "xcb-static", "/home/tony/Qt/5.7/gcc_64/lib/libQt5PlatformSupport.a", "dl", "gthread-2.0", "rt", "glib-2.0", "Xrender", "Xext", "X11", "m", "fontconfig", "freetype", "EGL", "GL", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gui.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5DBus.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: ["-pthread"]
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5XcbQpa"
    libNameForLinkerRelease: "Qt5XcbQpa"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5XcbQpa.so.5.7.1"
    cpp.defines: ["QT_XCB_QPA_LIB_LIB"]
    cpp.includePaths: []
    cpp.libraryPaths: ["/usr/lib64", "/lib64", "/home/tony/Qt/5.7/gcc_64/lib"]
    
}
