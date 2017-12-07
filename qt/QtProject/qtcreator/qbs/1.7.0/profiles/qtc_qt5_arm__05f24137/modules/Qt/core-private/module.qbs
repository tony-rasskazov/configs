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
    cpp.includePaths: ["/opt/compiler_platform/compiled/include/QtCore/5.3.2", "/opt/compiler_platform/compiled/include/QtCore/5.3.2/QtCore"]
    cpp.libraryPaths: []
    
}
