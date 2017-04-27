import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "SerialPort"
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
    libNameForLinkerDebug: "QtSerialPort"
    libNameForLinkerRelease: "QtSerialPort"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtSerialPort.framework/QtSerialPort"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtSerialPort.framework/QtSerialPort"
    cpp.defines: ["QT_SERIALPORT_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtSerialPort.framework/Headers"]
    cpp.libraryPaths: []
    
}
