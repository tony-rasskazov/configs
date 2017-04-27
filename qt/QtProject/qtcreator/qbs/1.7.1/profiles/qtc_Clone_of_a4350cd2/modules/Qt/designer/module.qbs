import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Designer"
    Depends { name: "Qt"; submodules: ["core", "gui", "widgets", "xml", "uiplugin"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtXml"]
    frameworksRelease: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtXml"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib", "/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtDesigner"
    libNameForLinkerRelease: "QtDesigner"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtDesigner.framework/QtDesigner"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtDesigner.framework/QtDesigner"
    cpp.defines: ["QT_DESIGNER_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtDesigner.framework/Headers"]
    cpp.libraryPaths: []
    
}
