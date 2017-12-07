import qbs 1.0
import qbs.FileInfo
import "../QtModule.qbs" as QtModule

QtModule {
    qtModuleName: "Scxml"

    property string qscxmlcName: "qscxmlc"
    property string className
    property string namespace

    Rule {
        inputs: ["qt.scxml.compilable"]

        Artifact {
            filePath: FileInfo.joinPaths(product.moduleProperty("Qt.core", "generatedHeadersDir"),
                                         input.baseName + ".h")
            fileTags: ["hpp", "unmocable"]
        }
        Artifact {
            filePath: input.baseName + ".cpp"
            fileTags: ["cpp"]
        }

        prepare: {
            var compilerName = product.moduleProperty("Qt.scxml", "qscxmlcName");
            var compilerPath = FileInfo.joinPaths(input.moduleProperty("Qt.core", "binPath"),
                                                  compilerName);
            var args = ["--header", outputs["hpp"][0].filePath,
                        "--impl", outputs["cpp"][0].filePath];
            var cxx98 = input.moduleProperty("cpp", "cxxLanguageVersion") === "c++98";
            if (cxx98)
                args.push("-no-c++11");
            var className = input.moduleProperty("Qt.scxml", "className");
            if (className)
                args.push("--classname", className);
            var namespace = input.moduleProperty("Qt.scxml", "namespace");
            if (namespace)
                args.push("--namespace", namespace);
            args.push(input.filePath);
            var cmd = new Command(compilerPath, args);
            cmd.description = "compiling " + input.fileName;
            cmd.highlight = "codegen";
            return [cmd];
        }
    }

    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: ["/home/tony/Qt/5.7/gcc_64/lib/libQt5Qml.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Network.so.5.7.1", "/home/tony/Qt/5.7/gcc_64/lib/libQt5Core.so.5.7.1", "pthread"]
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Scxml"
    libNameForLinkerRelease: "Qt5Scxml"
    libFilePathDebug: ""
    libFilePathRelease: "/home/tony/Qt/5.7/gcc_64/lib/libQt5Scxml.so.5.7.1"

    cpp.defines: ["QT_SCXML_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/gcc_64/include", "/home/tony/Qt/5.7/gcc_64/include/QtScxml"]
    cpp.libraryPaths: ["/home/tony/Qt/5.7/gcc_64/lib"]

    
}
