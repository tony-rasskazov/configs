import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Gamepad"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Gui.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Gamepad"
    libNameForLinkerRelease: "Qt5Gamepad"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gamepad.so.5.7.1"
    cpp.defines: ["QT_GAMEPAD_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtGamepad"]
    cpp.libraryPaths: ["/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib"]
    
}
