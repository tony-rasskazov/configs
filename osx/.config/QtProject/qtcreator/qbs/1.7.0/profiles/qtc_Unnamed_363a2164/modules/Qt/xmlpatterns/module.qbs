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
    frameworksDebug: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtXmlPatterns"
    libNameForLinkerRelease: "QtXmlPatterns"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtXmlPatterns.framework/QtXmlPatterns"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtXmlPatterns.framework/QtXmlPatterns"
    cpp.defines: ["QT_XMLPATTERNS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtXmlPatterns.framework/Headers"]
    cpp.libraryPaths: []
    
}
