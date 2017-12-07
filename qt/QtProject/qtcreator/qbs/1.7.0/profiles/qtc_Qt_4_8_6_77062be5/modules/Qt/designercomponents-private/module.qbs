import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "DesignerComponents"
    Depends { name: "Qt"; submodules: ["core", "gui-private", "designer-private"]}

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
    libNameForLinkerDebug: "QtDesignerComponents"
    libNameForLinkerRelease: "QtDesignerComponents"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_DESIGNERCOMPONENTS-PRIVATE_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtDesignerComponents"]
    cpp.libraryPaths: []
    
}
