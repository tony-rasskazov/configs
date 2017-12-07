import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "XmlPatterns"
    Depends { name: "Qt"; submodules: ["core", "network"]}

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
    libNameForLinkerDebug: "QtXmlPatterns"
    libNameForLinkerRelease: "QtXmlPatterns"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_XMLPATTERNS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtXmlPatterns"]
    cpp.libraryPaths: []
    
}
