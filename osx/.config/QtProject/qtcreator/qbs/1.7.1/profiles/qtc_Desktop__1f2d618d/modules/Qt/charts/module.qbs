import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Charts"
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
    libNameForLinkerDebug: "QtCharts"
    libNameForLinkerRelease: "QtCharts"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtCharts.framework/QtCharts"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtCharts.framework/QtCharts"
    cpp.defines: ["QT_CHARTS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtCharts.framework/Headers"]
    cpp.libraryPaths: []
    
}
