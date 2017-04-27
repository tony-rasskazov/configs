import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Quick"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworksRelease: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtGui"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtQuick"
    libNameForLinkerRelease: "QtQuick"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtQuick.framework/QtQuick"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtQuick.framework/QtQuick"
    cpp.defines: {
        var result = ["QT_QUICK_LIB"];
        if (qmlDebugging)
            result.push("QT_QML_DEBUG");
        return result;
    }
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtQuick.framework/Headers"]
    cpp.libraryPaths: []
    property bool qmlDebugging: false
    property string qmlPath
    property string qmlImportsPath: ""
}
