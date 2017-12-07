import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "ScriptTools"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5ScriptTools"
    libNameForLinkerRelease: "Qt5ScriptTools"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5ScriptTools.so.5.7.1"
    cpp.defines: ["QT_SCRIPTTOOLS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtScriptTools"]
    cpp.libraryPaths: ["/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib"]
    
}
