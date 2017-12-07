import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QuickParticles"
    Depends { name: "Qt"; submodules: ["core-private", "gui-private", "qml-private", "quick-private"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Quick.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gui.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5QuickParticles"
    libNameForLinkerRelease: "Qt5QuickParticles"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5QuickParticles.so.5.7.1"
    cpp.defines: ["QT_QUICKPARTICLES_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtQuickParticles", "/home/tony/Qt/5.7/gcc_64/include/QtQuickParticles/5.7.1", "/home/tony/Qt/5.7/gcc_64/include/QtQuickParticles/5.7.1/QtQuickParticles"]
    cpp.libraryPaths: ["/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib"]
    
}
