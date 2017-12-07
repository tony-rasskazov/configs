import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "UiTools"
    Depends { name: "Qt"; submodules: ["core"]}

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
    libNameForLinkerDebug: "QtUiTools"
    libNameForLinkerRelease: "QtUiTools"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_UITOOLS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtUiTools"]
    cpp.libraryPaths: []
    
}
