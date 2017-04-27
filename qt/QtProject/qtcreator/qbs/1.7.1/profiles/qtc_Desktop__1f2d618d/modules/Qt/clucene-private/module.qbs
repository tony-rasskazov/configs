import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "CLucene"
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
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtCLucene"
    libNameForLinkerRelease: "QtCLucene"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtCLucene.framework/QtCLucene"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtCLucene.framework/QtCLucene"
    cpp.defines: ["QT_CLUCENE_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtCLucene.framework/Headers", "/Users/tony/Qt/5.7/clang_64/lib/QtCLucene.framework/Headers/5.7.1", "/Users/tony/Qt/5.7/clang_64/lib/QtCLucene.framework/Headers/5.7.1/QtCLucene"]
    cpp.libraryPaths: []
    
}
