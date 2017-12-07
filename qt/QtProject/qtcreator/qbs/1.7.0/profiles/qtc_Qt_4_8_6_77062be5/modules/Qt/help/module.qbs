import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Help"
    Depends { name: "Qt"; submodules: ["core", "network", "sql"]}

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
    libNameForLinkerDebug: "QtHelp"
    libNameForLinkerRelease: "QtHelp"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_HELP_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtHelp"]
    cpp.libraryPaths: []
    
}
