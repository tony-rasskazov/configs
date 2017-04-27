import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "PlatformSupport"
    Depends { name: "Qt"; submodules: ["core-private", "gui-private"]}

    hasLibrary: true
    staticLibsDebug: ["qtfreetype_debug", "z"]
    staticLibsRelease: ["qtfreetype", "z"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtGui", "QtCore", "DiskArbitration", "IOKit", "QtDBus", "AppKit", "OpenGL", "ApplicationServices", "AGL"]
    frameworksRelease: ["QtGui", "QtCore", "DiskArbitration", "IOKit", "QtDBus", "AppKit", "OpenGL", "ApplicationServices", "AGL"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt5PlatformSupport_debug"
    libNameForLinkerRelease: "Qt5PlatformSupport"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/libQt5PlatformSupport_debug.a"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/libQt5PlatformSupport.a"
    cpp.defines: ["QT_PLATFORMSUPPORT_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/include", "/Users/tony/Qt5.7.0/5.7/clang_64/include/QtPlatformSupport", "/Users/tony/Qt5.7.0/5.7/clang_64/include/QtPlatformSupport/5.7.0", "/Users/tony/Qt5.7.0/5.7/clang_64/include/QtPlatformSupport/5.7.0/QtPlatformSupport"]
    cpp.libraryPaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    isStaticLibrary: true
}
