import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DInput"
    Depends { name: "Qt"; submodules: ["core-private", "3dcore-private", "3dinput"]}

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
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DInput.framework/Headers/5.7.0", "/Users/tony/Qt/5.7/clang_64/lib/Qt3DInput.framework/Headers/5.7.0/Qt3DInput"]
    cpp.libraryPaths: []
    
}
