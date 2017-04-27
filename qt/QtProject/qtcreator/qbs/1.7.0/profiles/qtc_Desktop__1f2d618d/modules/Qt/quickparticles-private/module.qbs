import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QuickParticles"
    Depends { name: "Qt"; submodules: ["core-private", "gui-private", "qml-private", "quick-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworksRelease: ["QtQuick", "QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtQuickParticles"
    libNameForLinkerRelease: "QtQuickParticles"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtQuickParticles.framework/QtQuickParticles"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtQuickParticles.framework/QtQuickParticles"
    cpp.defines: ["QT_QUICKPARTICLES_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtQuickParticles.framework/Headers", "/Users/tony/Qt/5.7/clang_64/lib/QtQuickParticles.framework/Headers/5.7.1", "/Users/tony/Qt/5.7/clang_64/lib/QtQuickParticles.framework/Headers/5.7.1/QtQuickParticles"]
    cpp.libraryPaths: []
    
}
