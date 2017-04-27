import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DLogic"
    Depends { name: "Qt"; submodules: ["core", "gui", "3dcore"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt3DLogic"
    libNameForLinkerRelease: "Qt3DLogic"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DLogic.framework/Qt3DLogic"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DLogic.framework/Qt3DLogic"
    cpp.defines: ["QT_3DLOGIC_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DLogic.framework/Headers"]
    cpp.libraryPaths: []
    
}
