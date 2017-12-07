import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "OpenGL"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/gcc_64/lib/libQtGui.so.4.8.6", "/home/tony/Qt/4.8/gcc_64/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtOpenGL"
    libNameForLinkerRelease: "QtOpenGL"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/gcc_64/lib/libQtOpenGL.so.4.8.6"
    cpp.defines: ["QT_OPENGL_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/gcc_64/include", "/home/tony/Qt/4.8/gcc_64/include/QtOpenGL"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/gcc_64/lib", "/usr/X11R6/lib", "/home/tony/Qt/4.8/gcc_64/lib", "/usr/X11R6/lib"]
    
}
