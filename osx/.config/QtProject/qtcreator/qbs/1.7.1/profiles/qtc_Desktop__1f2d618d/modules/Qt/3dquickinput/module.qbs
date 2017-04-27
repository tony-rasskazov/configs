import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DQuickInput"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "3dcore", "3dinput", "3dquick"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["Qt3DInput", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork", "QtGamepad", "Qt3DQuick", "QtQuick", "QtQml"]
    frameworksRelease: ["Qt3DInput", "Qt3DCore", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtNetwork", "QtGamepad", "Qt3DQuick", "QtQuick", "QtQml"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "Qt3DQuickInput"
    libNameForLinkerRelease: "Qt3DQuickInput"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickInput.framework/Qt3DQuickInput"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickInput.framework/Qt3DQuickInput"
    cpp.defines: ["QT_3DQUICKINPUT_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/Qt3DQuickInput.framework/Headers"]
    cpp.libraryPaths: []
    
}
