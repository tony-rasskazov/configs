import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Nfc"
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
    libNameForLinkerDebug: "QtNfc"
    libNameForLinkerRelease: "QtNfc"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtNfc.framework/QtNfc"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtNfc.framework/QtNfc"
    cpp.defines: ["QT_NFC_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtNfc.framework/Headers"]
    cpp.libraryPaths: []
    
}
