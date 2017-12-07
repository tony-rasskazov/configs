import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "PlatformSupport"
    Depends { name: "Qt"; submodules: ["core-private", "gui-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5PlatformSupport"
    libNameForLinkerRelease: "Qt5PlatformSupport"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_PLATFORMSUPPORT_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/android_armv7/include", "/home/tony/Qt/5.7/android_armv7/include/QtPlatformSupport", "/home/tony/Qt/5.7/android_armv7/include/QtPlatformSupport/5.7.1", "/home/tony/Qt/5.7/android_armv7/include/QtPlatformSupport/5.7.1/QtPlatformSupport"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
