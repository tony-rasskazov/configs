import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Quick"
    Depends { name: "Qt"; submodules: ["quick"]}

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
    cpp.includePaths: ["/opt/compiler_platform/compiled/include/QtQuick/5.3.2", "/opt/compiler_platform/compiled/include/QtQuick/5.3.2/QtQuick"]
    cpp.libraryPaths: []
    
}
