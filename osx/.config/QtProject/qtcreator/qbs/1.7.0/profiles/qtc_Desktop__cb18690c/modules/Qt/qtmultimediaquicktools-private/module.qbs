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
    frameworksDebug: ["QtQuick", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtQml", "QtNetwork", "QtMultimedia"]
    frameworksRelease: ["QtQuick", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtQml", "QtNetwork", "QtMultimedia"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtMultimediaQuick_p"
    libNameForLinkerRelease: "QtMultimediaQuick_p"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtMultimediaQuick_p.framework/QtMultimediaQuick_p"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtMultimediaQuick_p.framework/QtMultimediaQuick_p"
    cpp.defines: ["QT_QTMULTIMEDIAQUICKTOOLS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtMultimediaQuick_p.framework/Headers/5.4.2", "/Users/tony/Qt/5.4/clang_64/lib/QtMultimediaQuick_p.framework/Headers/5.4.2/QtMultimediaQuick_p"]
    cpp.libraryPaths: []
    
}
