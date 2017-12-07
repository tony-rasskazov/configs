import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Quick"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gui.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Quick"
    libNameForLinkerRelease: "Qt5Quick"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5Quick.so.5.7.1"
    cpp.defines: {
        var result = ["QT_QUICK_LIB"];
        if (qmlDebugging)
            result.push("QT_QML_DEBUG");
        return result;
    }
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtQuick"]
    cpp.libraryPaths: ["/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib"]
    property bool qmlDebugging: false
    property string qmlPath
    property string qmlImportsPath: ""
}
