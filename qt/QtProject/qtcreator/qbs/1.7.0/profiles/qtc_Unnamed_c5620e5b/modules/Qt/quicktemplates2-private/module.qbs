import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QuickTemplates2"
    Depends { name: "Qt"; submodules: ["core", "gui", "quick"]}

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
    libNameForLinkerDebug: "Qt5QuickTemplates2"
    libNameForLinkerRelease: "Qt5QuickTemplates2"
    libFilePathDebug: ""
    libFilePathRelease: ""
    cpp.defines: ["QT_QUICKTEMPLATES2_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/android_armv7/include", "/home/tony/Qt/5.7/android_armv7/include/QtQuickTemplates2", "/home/tony/Qt/5.7/android_armv7/include/QtQuickTemplates2/5.7.1", "/home/tony/Qt/5.7/android_armv7/include/QtQuickTemplates2/5.7.1/QtQuickTemplates2"]
    cpp.libraryPaths: []
    
}
