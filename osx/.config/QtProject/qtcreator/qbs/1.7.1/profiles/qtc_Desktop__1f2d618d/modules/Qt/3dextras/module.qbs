import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DExtras"
    Depends { name: "Qt"; submodules: ["core", "gui", "3dcore", "3drender", "3dinput", "3dlogic"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["Qt3DRender", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork", "QtConcurrent", "Qt3DInput", "QtGamepad", "Qt3DLogic"]
    frameworksRelease: ["Qt3DRender", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork", "QtConcurrent", "Qt3DInput", "QtGamepad", "Qt3DLogic"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt3DExtras"
    libNameForLinkerRelease: "Qt3DExtras"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DExtras.framework/Qt3DExtras"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DExtras.framework/Qt3DExtras"
    cpp.defines: ["QT_3DEXTRAS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DExtras.framework/Headers"]
    cpp.libraryPaths: []
    
}
