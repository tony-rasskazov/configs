import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "MultimediaWidgets"
    Depends { name: "Qt"; submodules: ["core", "gui", "multimedia", "widgets"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtMultimedia", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWidgets"]
    frameworksRelease: ["QtMultimedia", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui", "QtWidgets"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtMultimediaWidgets"
    libNameForLinkerRelease: "QtMultimediaWidgets"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtMultimediaWidgets.framework/QtMultimediaWidgets"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtMultimediaWidgets.framework/QtMultimediaWidgets"
    cpp.defines: ["QT_MULTIMEDIAWIDGETS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtMultimediaWidgets.framework/Headers"]
    cpp.libraryPaths: []
    
}
