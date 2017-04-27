import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Sql"
    Depends { name: "Qt"; submodules: ["core"]}

    hasLibrary: true
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: ["QtCore", "DiskArbitration", "IOKit"]
    frameworksRelease: ["QtCore", "DiskArbitration", "IOKit"]
    frameworkPathsDebug: ["/Users/tony/Qt/5.4/clang_64/lib"]
    frameworkPathsRelease: ["/Users/tony/Qt/5.4/clang_64/lib"]
    libNameForLinkerDebug: "QtSql"
    libNameForLinkerRelease: "QtSql"
    libFilePathDebug: "/Users/tony/Qt/5.4/clang_64/lib/QtSql.framework/QtSql"
    libFilePathRelease: "/Users/tony/Qt/5.4/clang_64/lib/QtSql.framework/QtSql"
    cpp.defines: ["QT_SQL_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.4/clang_64/lib/QtSql.framework/Headers"]
    cpp.libraryPaths: []
    
}
