import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "ScriptTools"
    Depends { name: "Qt"; submodules: ["core", "script", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/arm/lib/libQtScript.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtGui.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtNetwork.so.4.8.6", "/home/tony/Qt/4.8/arm/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtScriptTools"
    libNameForLinkerRelease: "QtScriptTools"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/arm/lib/libQtScriptTools.so.4.8.6"
    cpp.defines: ["QT_SCRIPTTOLS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtScriptTools"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/arm/lib", "/home/tony/Qt/4.8/arm/lib"]
    
}
