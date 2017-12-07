import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Sql"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/4.8/arm/lib/libQtCore.so.4.8.6", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "QtSql"
    libNameForLinkerRelease: "QtSql"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/4.8/arm/lib/libQtSql.so.4.8.6"
    cpp.defines: ["QT_SQL_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/QtSql"]
    cpp.libraryPaths: ["/home/tony/Qt/4.8/arm_gcc2008q3-s/lib", "/home/tony/Qt/4.8/arm_gcc2008q3-s/lib"]
    
}
