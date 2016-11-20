import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebChannel"
    Depends { name: "Qt"; submodules: ["core", "qml"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtQml", "QtNetwork", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.7/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.7/clang_64/lib"]
    libNameForLinkerDebug: "QtWebChannel"
    libNameForLinkerRelease: "QtWebChannel"
    libFilePathDebug: "/Users/tony/Qt/5.7/clang_64/lib/QtWebChannel.framework/QtWebChannel"
    libFilePathRelease: "/Users/tony/Qt/5.7/clang_64/lib/QtWebChannel.framework/QtWebChannel"
    cpp.defines: ["QT_WEBCHANNEL_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/clang_64/lib/QtWebChannel.framework/Headers"]
    cpp.libraryPaths: []
    
}
