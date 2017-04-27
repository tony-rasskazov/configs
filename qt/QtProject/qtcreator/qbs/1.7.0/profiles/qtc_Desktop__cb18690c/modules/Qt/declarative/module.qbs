import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Declarative"
    Depends { name: "Qt"; submodules: ["core", "gui", "widgets", "script"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtScript", "QtSql", "QtXmlPatterns", "QtNetwork"]
    frameworksRelease: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit", "QtScript", "QtSql", "QtXmlPatterns", "QtNetwork"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib", "/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtDeclarative"
    libNameForLinkerRelease: "QtDeclarative"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtDeclarative.framework/QtDeclarative"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtDeclarative.framework/QtDeclarative"
    cpp.defines: {
        var result = ["QT_DECLARATIVE_LIB"];
        if (qmlDebugging)
            result.push("QT_DECLARATIVE_DEBUG");
        return result;
    }
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtDeclarative.framework/Headers"]
    cpp.libraryPaths: []
    property bool qmlDebugging: false
    property string qmlPath
    property string qmlImportsPath: ""
}
