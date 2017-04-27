import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Bluetooth"
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
    libNameForLinkerDebug: "QtBluetooth"
    libNameForLinkerRelease: "QtBluetooth"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtBluetooth.framework/QtBluetooth"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtBluetooth.framework/QtBluetooth"
    cpp.defines: ["QT_BLUETOOTH_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtBluetooth.framework/Headers"]
    cpp.libraryPaths: []
    
}
