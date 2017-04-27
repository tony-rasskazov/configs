import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "OpenGL"
    Depends { name: "Qt"; submodules: ["core", "gui", "widgets"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtWidgets", "QtGui", "QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtOpenGL"
    libNameForLinkerRelease: "QtOpenGL"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtOpenGL.framework/QtOpenGL"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtOpenGL.framework/QtOpenGL"
    cpp.defines: ["QT_OPENGL_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtOpenGL.framework/Headers"]
    cpp.libraryPaths: []
    
}
