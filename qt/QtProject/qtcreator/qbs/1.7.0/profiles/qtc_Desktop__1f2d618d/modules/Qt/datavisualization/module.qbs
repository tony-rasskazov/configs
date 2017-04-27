import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "DataVisualization"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtDataVisualization"
    libNameForLinkerRelease: "QtDataVisualization"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtDataVisualization.framework/QtDataVisualization"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtDataVisualization.framework/QtDataVisualization"
    cpp.defines: ["QT_DATAVISUALIZATION_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtDataVisualization.framework/Headers"]
    cpp.libraryPaths: []
    
}
