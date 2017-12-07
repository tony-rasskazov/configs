import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Designer"
    Depends { name: "Qt"; submodules: ["core", "gui", "xml"]}

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
    libNameForLinkerDebug: "QtDesigner"
    libNameForLinkerRelease: "QtDesigner"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_DESIGNER_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtDesigner"]
    cpp.libraryPaths: []
    
}
