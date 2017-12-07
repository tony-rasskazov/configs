import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "QuickWidgets"
    Depends { name: "Qt"; submodules: ["core", "gui", "qml", "quick", "widgets"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/opt/compiler_platform/compiled/lib/libQt5Quick.so.5.3.2", "/opt/compiler_platform/compiled/lib/libQt5Qml.so.5.3.2", "/opt/compiler_platform/compiled/lib/libQt5Widgets.so.5.3.2", "/opt/compiler_platform/compiled/lib/libQt5Network.so.5.3.2", "/opt/compiler_platform/compiled/lib/libQt5Gui.so.5.3.2", "/opt/compiler_platform/compiled/lib/libQt5Core.so.5.3.2", "EGL", "GLESv2", "GLES_CM", "IMGegl", "srv_um", "usc", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5QuickWidgets"
    libNameForLinkerRelease: "Qt5QuickWidgets"
    libFilePathDebug: ""
    libFilePathRelease: "/opt/compiler_platform/compiled/lib/libQt5QuickWidgets.so.5.3.2"
    cpp.defines: ["QT_QUICKWIDGETS_LIB"]
    cpp.includePaths: ["/opt/compiler_platform/compiled/include", "/opt/compiler_platform/compiled/include/QtQuickWidgets"]
    cpp.libraryPaths: ["/home/user/work/12_trim/codeclear/external/qt-everywhere-opensource-src-5.3.2/qtbase/mkspecs/linux-TIarmv7-sgx-g++/../../../../Graphics_SDK_5_01_01_02/gfx_dbg_es8.x/", "/home/user/work/12_trim/codeclear/external/compiled/lib", "/home/user/work/12_trim/codeclear/external/compiled/lib"]
    
}
