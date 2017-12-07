import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DQuickExtras"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "3dcore", "3dinput", "3dquick", "3drender", "3dlogic"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["Qt3DInput", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "Qt3DQuick", "QtQuick", "QtQml", "QtNetwork", "Qt3DRender", "QtConcurrent", "Qt3DLogic"]
    frameworksRelease: ["Qt3DInput", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "Qt3DQuick", "QtQuick", "QtQml", "QtNetwork", "Qt3DRender", "QtConcurrent", "Qt3DLogic"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt3DQuickExtras"
    libNameForLinkerRelease: "Qt3DQuickExtras"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickExtras.framework/Qt3DQuickExtras"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickExtras.framework/Qt3DQuickExtras"
    cpp.defines: ["QT_3DQUICKEXTRAS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickExtras.framework/Headers"]
    cpp.libraryPaths: []
    
}
