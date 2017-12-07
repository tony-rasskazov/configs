import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Core"
    Depends { name: "Qt"; submodules: ["core"]}

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
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include/QtCore/5.7.1", "/home/tony/Qt/5.7/gcc_64/include/QtCore/5.7.1/QtCore"]
    cpp.libraryPaths: []
    
}
