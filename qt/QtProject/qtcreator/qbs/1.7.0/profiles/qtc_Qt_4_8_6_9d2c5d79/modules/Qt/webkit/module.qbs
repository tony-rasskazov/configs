import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebKit"
    Depends { name: "Qt"; submodules: ["core", "gui", "network"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtWebKit"
    libNameForLinkerRelease: "QtWebKit"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_WEBKIT_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/gcc_64/include", "/home/tony/Qt/4.8/gcc_64/include/QtWebKit"]
    cpp.libraryPaths: []
    
}
