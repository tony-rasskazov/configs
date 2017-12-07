import qbs 1.0
import qbs.FileInfo
import qbs.ModUtils
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "Gui"

    property string uicName: "uic"

    FileTagger {
        patterns: ["*.ui"]
        fileTags: ["ui"]
    }

    Rule {
        inputs: ["ui"]

        Artifact {
            filePath: FileInfo.joinPaths(product.moduleProperty("Qt.core", "generatedHeadersDir"),
                                         'ui_' + input.completeBaseName + '.h')
            fileTags: ["hpp"]
        }

        prepare: {
            var cmd = new Command(ModUtils.moduleProperty(product, "binPath") + '/'
                                  + ModUtils.moduleProperty(product, "uicName"),
                                  [input.filePath, '-o', output.filePath])
            cmd.description = 'uic ' + input.fileName;
            cmd.highlight = 'codegen';
            return cmd;
        }
    }

    property string defaultQpaPlugin: ""
    staticLibsDebug: []
    staticLibsRelease: []
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: []
    linkerFlagsRelease: []
    frameworksDebug: []
    frameworksRelease: []
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Gui"
    libNameForLinkerRelease: "Qt5Gui"
    libFilePathDebug: ""
    libFilePathRelease: ""

    cpp.defines: ["QT_GUI_LIB"]
    cpp.includePaths: ["/home/tony/Qt/5.7/android_armv7/include", "/home/tony/Qt/5.7/android_armv7/include/QtGui"]
    cpp.libraryPaths: []

    Properties {
        condition: Qt.core.staticBuild && qbs.targetOS.contains("ios")
        cpp.frameworks: base.concat(["UIKit", "QuartzCore", "CoreText", "CoreGraphics",
                                     "Foundation", "CoreFoundation"])
    }
    cpp.frameworks: base
    
}

