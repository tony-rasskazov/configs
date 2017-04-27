import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "SerialBus"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtSerialPort"]
    frameworksRelease: ["QtNetwork", "QtCore", "DiskArbitration", "IOKit", "QtSerialPort"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtSerialBus"
    libNameForLinkerRelease: "QtSerialBus"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtSerialBus.framework/QtSerialBus"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtSerialBus.framework/QtSerialBus"
    cpp.defines: ["QT_SERIALBUS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtSerialBus.framework/Headers"]
    cpp.libraryPaths: []
    
}
