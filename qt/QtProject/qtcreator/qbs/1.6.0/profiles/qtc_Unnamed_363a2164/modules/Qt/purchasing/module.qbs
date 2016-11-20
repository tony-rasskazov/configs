import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Purchasing"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["StoreKit", "Foundation", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["StoreKit", "Foundation", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtPurchasing"
    libNameForLinkerRelease: "QtPurchasing"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtPurchasing.framework/QtPurchasing"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtPurchasing.framework/QtPurchasing"
    cpp.defines: ["QT_PURCHASING_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtPurchasing.framework/Headers"]
    cpp.libraryPaths: []
    
}
