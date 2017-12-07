import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Declarative"
    Depends { name: "Qt"; submodules: ["core", "gui", "script"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/gcc_64/lib/libQtScript.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtSvg.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtSql.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtGui.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtNetwork.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtDeclarative"
    libNameForLinkerRelease: "QtDeclarative"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/gcc_64/lib/libQtDeclarative.so.4.8.6"
    cpp.defines: {
        var result = ["QT_DECLARATIVE_LIB"];
        if (qmlDebugging)
            result.push("QT_DECLARATIVE_DEBUG");
        return result;
    }
    cpp.includePaths: ["/home/tony/Qt/4.8/gcc_64/include", "/home/tony/Qt/4.8/gcc_64/include/QtDeclarative"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/gcc_64/lib", "/home/tony/Qt/4.8/gcc_64/lib", "/usr/X11R6/lib"]
    property bool qmlDebugging: false
    property string qmlPath
    property string qmlImportsPath: ""
}
