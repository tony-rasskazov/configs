import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Location"
    Depends { name: "Qt"; submodules: ["core", "positioning", "gui", "quick"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtPositioning", "QtCore", "DiskArbitration", "IOKit", "QtQuick", "QtQml", "QtNetwork", "QtGui"]
    frameworksRelease: ["QtPositioning", "QtCore", "DiskArbitration", "IOKit", "QtQuick", "QtQml", "QtNetwork", "QtGui"]
    frameworkPathsDebug: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib", "/Users/tony/Qt5.7.0/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtLocation"
    libNameForLinkerRelease: "QtLocation"
    libFilePathDebug: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtLocation.framework/QtLocation"
    libFilePathRelease: "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtLocation.framework/QtLocation"
    cpp.defines: ["QT_LOCATION_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtLocation.framework/Headers"]
    cpp.libraryPaths: []
    
}
