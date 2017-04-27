import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Svg"
    Depends { name: "Qt"; submodules: ["core", "gui", "widgets"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtSvg"
    libNameForLinkerRelease: "QtSvg"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtSvg.framework/QtSvg"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtSvg.framework/QtSvg"
    cpp.defines: ["QT_SVG_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtSvg.framework/Headers"]
    cpp.libraryPaths: []
    
}
