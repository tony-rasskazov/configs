import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "AndroidExtras"
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
    libNameForLinkerDebug: "Qt5AndroidExtras"
    libNameForLinkerRelease: "Qt5AndroidExtras"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_ANDROIDEXTRAS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/android_armv7/include", "/home/tony/Qt/5.7/android_armv7/include/QtAndroidExtras"]
    cpp.libraryPaths: []
    
}
