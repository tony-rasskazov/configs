import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "XmlPatterns"
    Depends { name: "Qt"; submodules: ["core", "network"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5XmlPatterns"
    libNameForLinkerRelease: "Qt5XmlPatterns"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5XmlPatterns.so.5.7.1"
    cpp.defines: ["QT_XMLPATTERNS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtXmlPatterns"]
    cpp.libraryPaths: ["/home/tony/Qt/5.7/gcc_64/lib"]
    
}
