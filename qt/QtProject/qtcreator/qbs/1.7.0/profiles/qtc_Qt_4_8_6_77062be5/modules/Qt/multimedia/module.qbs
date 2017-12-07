import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Multimedia"
    Depends { name: "Qt"; submodules: ["core", "gui", "network"]}

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
    libNameForLinkerDebug: "QtMultimedia"
    libNameForLinkerRelease: "QtMultimedia"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_MULTIMEDIA_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtMultimedia"]
    cpp.libraryPaths: []
    
}
