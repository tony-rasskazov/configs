import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DCore"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt3DCore"
    libNameForLinkerRelease: "Qt3DCore"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DCore.framework/Qt3DCore"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DCore.framework/Qt3DCore"
    cpp.defines: ["QT_3DCORE_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DCore.framework/Headers"]
    cpp.libraryPaths: []
    
}
