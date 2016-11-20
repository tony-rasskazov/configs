import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Sensors"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtSensors"
    libNameForLinkerRelease: "QtSensors"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtSensors.framework/QtSensors"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtSensors.framework/QtSensors"
    cpp.defines: ["QT_SENSORS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtSensors.framework/Headers"]
    cpp.libraryPaths: []
    
}
