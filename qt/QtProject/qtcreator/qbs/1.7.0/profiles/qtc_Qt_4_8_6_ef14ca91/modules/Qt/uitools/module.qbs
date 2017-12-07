import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "UiTools"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/gcc_64/lib/libQtXml.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtGui.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtUiTools"
    libNameForLinkerRelease: "QtUiTools"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/gcc_64/lib/libQtUiTools.a"
    cpp.defines: ["QT_UITOOLS_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/gcc_64/include", "/home/tony/Qt/4.8/gcc_64/include/QtUiTools"]
    cpp.libraryPaths: ["/home/tony/Workspace/build/qt-everywhere-opensource-src-4.8.6_x64/lib", "/home/tony/Workspace/build/qt-everywhere-opensource-src-4.8.6_x64/lib", "/usr/X11R6/lib"]
    
}
