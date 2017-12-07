import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Declarative"
    Depends { name: "Qt"; submodules: ["core", "gui", "script"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/arm/lib/libQtScript.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtSvg.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtSql.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtGui.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtNetwork.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtDeclarative"
    libNameForLinkerRelease: "QtDeclarative"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/arm/lib/libQtDeclarative.so.4.8.6"
    cpp.defines: {
        var result = ["QT_DECLARATIVE_LIB"];
        if (qmlDebugging)
            result.push("QT_DECLARATIVE_DEBUG");
        return result;
    }
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtDeclarative"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/arm/lib", "/home/tony/Qt/4.8/arm/lib"]
    property bool qmlDebugging: false
    property string qmlPath
    property string qmlImportsPath: ""
}
