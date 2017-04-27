import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DInput"
    Depends { name: "Qt"; submodules: ["core", "gui", "3dcore", "gamepad"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork", "QtGamepad"]
    frameworksRelease: ["Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork", "QtGamepad"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt3DInput"
    libNameForLinkerRelease: "Qt3DInput"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DInput.framework/Qt3DInput"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DInput.framework/Qt3DInput"
    cpp.defines: ["QT_3DINPUT_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DInput.framework/Headers"]
    cpp.libraryPaths: []
    
}
