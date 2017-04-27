import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Xml"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtXml"
    libNameForLinkerRelease: "QtXml"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtXml.framework/QtXml"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtXml.framework/QtXml"
    cpp.defines: ["QT_XML_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtXml.framework/Headers"]
    cpp.libraryPaths: []
    
}
