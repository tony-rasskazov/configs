import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DQuickRender"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "3dcore", "3drender", "3dquick"]}

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
    libNameForLinkerDebug: "Qt53DQuickRender"
    libNameForLinkerRelease: "Qt53DQuickRender"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_3DQUICKRENDER_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/android_armv7/include", "/home/tony/Qt/5.7/android_armv7/include/Qt3DQuickRender"]
    cpp.libraryPaths: []
    
}
