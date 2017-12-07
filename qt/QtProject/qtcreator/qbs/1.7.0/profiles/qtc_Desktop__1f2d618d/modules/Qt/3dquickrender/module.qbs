import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DQuickRender"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "3dcore", "3drender", "3dquick"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["Qt3DRender", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtConcurrent", "Qt3DQuick", "QtQuick", "QtQml", "QtNetwork"]
    frameworksRelease: ["Qt3DRender", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtConcurrent", "Qt3DQuick", "QtQuick", "QtQml", "QtNetwork"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt3DQuickRender"
    libNameForLinkerRelease: "Qt3DQuickRender"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickRender.framework/Qt3DQuickRender"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickRender.framework/Qt3DQuickRender"
    cpp.defines: ["QT_3DQUICKRENDER_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickRender.framework/Headers"]
    cpp.libraryPaths: []
    
}
