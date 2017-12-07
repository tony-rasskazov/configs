import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Xml"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/arm/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtXml"
    libNameForLinkerRelease: "QtXml"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/arm/lib/libQtXml.so.4.8.6"
    cpp.defines: ["QT_XML_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtXml"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/arm_gcc2008q3-s/lib", "/home/tony/Qt/4.8/arm_gcc2008q3-s/lib"]
    
}
