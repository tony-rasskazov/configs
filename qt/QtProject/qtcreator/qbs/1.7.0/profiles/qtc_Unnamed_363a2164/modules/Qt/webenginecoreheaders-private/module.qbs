import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "WebEngineCore"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: false
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
    libNameForLinkerDebug: ""
    libNameForLinkerRelease: ""
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_WEBENGINECOREHEADERS_LIB"]
    cpp.includePaths: ["/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebEngineCore.framework/Headers", "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebEngineCore.framework/Headers/5.7.0", "/Users/tony/Qt5.7.0/5.7/clang_64/lib/QtWebEngineCore.framework/Headers/5.7.0/QtWebEngineCore"]
    cpp.libraryPaths: []
    
}
