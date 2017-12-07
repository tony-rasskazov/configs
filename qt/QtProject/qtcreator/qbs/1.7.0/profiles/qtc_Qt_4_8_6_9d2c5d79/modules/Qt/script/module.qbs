import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Script"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/gcc_64/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtScript"
    libNameForLinkerRelease: "QtScript"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/gcc_64/lib/libQtScript.so.4.8.6"
    cpp.defines: ["QT_SCRIPT_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/gcc_64/include", "/home/tony/Qt/4.8/gcc_64/include/QtScript"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/gcc_64/lib", "/home/tony/Qt/4.8/gcc_64/lib"]
    
}
