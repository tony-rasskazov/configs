import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Gamepad"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

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
    libNameForLinkerDebug: "Qt5Gamepad"
    libNameForLinkerRelease: "Qt5Gamepad"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_GAMEPAD_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/android_armv7/include", "/home/tony/Qt/5.7/android_armv7/include/QtGamepad"]
    cpp.libraryPaths: []
    
}
