import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "DesignerComponents"
    Depends { name: "Qt"; submodules: ["core", "gui-private", "widgets-private", "designer-private", "xml"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtDesigner", "QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtXml"]
    frameworksRelease: ["QtDesigner", "QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtXml"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtDesignerComponents"
    libNameForLinkerRelease: "QtDesignerComponents"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtDesignerComponents.framework/QtDesignerComponents"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtDesignerComponents.framework/QtDesignerComponents"
    cpp.defines: ["QT_DESIGNERCOMPONENTS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtDesignerComponents.framework/Headers", "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtDesignerComponents.framework/Headers/5.7.0", "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtDesignerComponents.framework/Headers/5.7.0/QtDesignerComponents"]
    cpp.libraryPaths: []
    
}
