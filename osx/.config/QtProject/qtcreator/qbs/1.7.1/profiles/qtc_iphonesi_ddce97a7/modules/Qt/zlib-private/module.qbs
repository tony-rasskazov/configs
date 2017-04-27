import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Zlib"
    Depends { name: "Qt"; submodules: []}

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
    cpp.defines: ["QT_ZLIB_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/ios/include", "/Users/tony/Qt/5.7/ios/include/QtZlib", "/Users/tony/Qt/5.7/ios/include/QtZlib/5.7.1", "/Users/tony/Qt/5.7/ios/include/QtZlib/5.7.1/QtZlib"]
    cpp.libraryPaths: []
    isStaticLibrary: true
}
