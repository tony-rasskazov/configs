import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "PlatformSupport"
    Depends { name: "Qt"; submodules: ["core-private", "gui-private"]}

    hasLibrary: true
    staticLibsDebug: ["z"]
    staticLibsRelease: ["z"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtGui", "QtCore", "DiskArbitration", "IOKit", "Cocoa", "OpenGL", "ApplicationServices", "AGL"]
    frameworksRelease: ["QtGui", "QtCore", "DiskArbitration", "IOKit", "Cocoa", "OpenGL", "ApplicationServices", "AGL"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "Qt5PlatformSupport_debug"
    libNameForLinkerRelease: "Qt5PlatformSupport"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/libQt5PlatformSupport_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/libQt5PlatformSupport.a"
    cpp.defines: ["QT_PLATFORMSUPPORT_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/include", "/Users/tony/Qt/5.4/clang_64/include/QtPlatformSupport", "/Users/tony/Qt/5.4/clang_64/include/QtPlatformSupport/5.4.2", "/Users/tony/Qt/5.4/clang_64/include/QtPlatformSupport/5.4.2/QtPlatformSupport"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
