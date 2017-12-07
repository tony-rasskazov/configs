import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Help"
    Depends { name: "Qt"; submodules: ["core", "network", "sql"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/gcc_64/lib/libQtSql.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtGui.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtNetwork.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtHelp"
    libNameForLinkerRelease: "QtHelp"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/gcc_64/lib/libQtHelp.so.4.8.6"
    cpp.defines: ["QT_HELP_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/gcc_64/include", "/home/tony/Qt/4.8/gcc_64/include/QtHelp"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/gcc_64/lib", "/home/tony/Qt/4.8/gcc_64/lib", "/usr/X11R6/lib"]
    
}
