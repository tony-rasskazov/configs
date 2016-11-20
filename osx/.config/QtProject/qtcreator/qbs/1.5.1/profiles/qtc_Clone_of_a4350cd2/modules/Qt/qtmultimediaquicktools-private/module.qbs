import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "MultimediaQuick_p"
    Depends { name: "Qt"; submodules: ["core", "quick", "multimedia-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtMultimedia", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtQuick", "QtQml"]
    frameworksRelease: ["QtMultimedia", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtQuick", "QtQml"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtMultimediaQuick_p"
    libNameForLinkerRelease: "QtMultimediaQuick_p"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtMultimediaQuick_p.framework/QtMultimediaQuick_p"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtMultimediaQuick_p.framework/QtMultimediaQuick_p"
    cpp.defines: ["QT_QTMULTIMEDIAQUICKTOOLS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtMultimediaQuick_p.framework/Headers", "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtMultimediaQuick_p.framework/Headers/5.7.0", "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtMultimediaQuick_p.framework/Headers/5.7.0/QtMultimediaQuick_p"]
    cpp.libraryPaths: []
    
}
