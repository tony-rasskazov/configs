import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DLogic"
    Depends { name: "Qt"; submodules: ["core-private", "gui-private", "3dcore-private", "3dlogic"]}

    hasLibrary: false
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
    libNameForLinkerDebug: ""
    libNameForLinkerRelease: ""
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: []
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/Qt3DLogic.framework/Headers/5.7.0", "/Users/tony/Qt5.7.0/5.7/clang_64/lib/Qt3DLogic.framework/Headers/5.7.0/Qt3DLogic"]
    cpp.libraryPaths: []
    
}
