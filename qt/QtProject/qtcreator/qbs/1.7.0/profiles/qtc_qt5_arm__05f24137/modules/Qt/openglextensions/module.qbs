import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "OpenGLExtensions"
    Depends { name: "Qt"; submodules: ["core", "gui"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: ["/opt/compiler_platform/compiled/lib/libQt5Gui.so.5.3.2", "/opt/compiler_platform/compiled/lib/libQt5Core.so.5.3.2", "EGL", "GLESv2", "GLES_CM", "IMGegl", "srv_um", "usc", "pthread", "EGL", "GLESv2", "GLES_CM", "IMGegl", "srv_um", "usc"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5OpenGLExtensions"
    libNameForLinkerRelease: "Qt5OpenGLExtensions"
    libFilePathDebug: ""
    libFilePathRelease: "/opt/compiler_platform/compiled/lib/libQt5OpenGLExtensions.a"
    cpp.defines: ["QT_OPENGLEXTENSIONS_LIB"]
    cpp.includePaths: ["/opt/compiler_platform/compiled/include", "/opt/compiler_platform/compiled/include/QtOpenGLExtensions"]
    cpp.libraryPaths: ["/home/user/work/12_trim/codeclear/external/qt-everywhere-opensource-src-5.3.2/qtbase/mkspecs/linux-TIarmv7-sgx-g++/../../../../Graphics_SDK_5_01_01_02/gfx_dbg_es8.x/", "/home/user/work/12_trim/codeclear/external/compiled/lib"]
    isStaticLibrary: true
}
