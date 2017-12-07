import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "3DQuickExtras"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "3dcore", "3dinput", "3dquick", "3drender", "3dlogic"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt53DInput.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt53DQuick.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt53DRender.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt53DLogic.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt53DCore.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gamepad.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Quick.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Gui.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Concurrent.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt53DQuickExtras"
    libNameForLinkerRelease: "Qt53DQuickExtras"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt53DQuickExtras.so.5.7.1"
    cpp.defines: ["QT_3DQUICKEXTRAS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/Qt3DQuickExtras"]
    cpp.libraryPaths: ["/usr/lib64", "/home/tony/Qt/5.7/gcc_64/lib", "/home/tony/Qt/5.7/gcc_64/lib"]
    
}
