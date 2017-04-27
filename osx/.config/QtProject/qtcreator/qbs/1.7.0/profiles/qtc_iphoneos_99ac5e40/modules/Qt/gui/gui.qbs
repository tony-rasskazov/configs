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

    property string defaultQpaPlugin: "qios"
    staticLibsDebug: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport_debug.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core_debug.a", "z", "qtpcre_debug", "m", "qtpng_debug", "qtharfbuzzng_debug", "z"]
    staticLibsRelease: ["z", "m", "/Users/tony/Qt/5.7/ios/lib/libQt5PlatformSupport.a", "/Users/tony/Qt/5.7/ios/lib/libQt5Core.a", "z", "qtpcre", "m", "qtpng", "qtharfbuzzng", "z"]
    dynamicLibsDebug: []
    dynamicLibsRelease: []
    linkerFlagsDebug: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios_debug.a"]
    linkerFlagsRelease: ["-force_load", "/Users/tony/Qt/5.7/ios/plugins/platforms/libqios.a"]
    frameworksDebug: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation", "Foundation", "CoreText", "CoreGraphics", "OpenGLES"]
    frameworksRelease: ["MobileCoreServices", "Foundation", "UIKit", "CoreFoundation", "Foundation", "CoreText", "CoreGraphics", "OpenGLES"]
    frameworkPathsDebug: []
    frameworkPathsRelease: []
    libNameForLinkerDebug: "Qt5Gui_debug"
    libNameForLinkerRelease: "Qt5Gui"
    libFilePathDebug: "/Users/tony/Qt/5.7/ios/lib/libQt5Gui_debug.a"
    libFilePathRelease: "/Users/tony/Qt/5.7/ios/lib/libQt5Gui.a"

    cpp.defines: ["QT_GUI_LIB"]
    cpp.includePaths: ["/Users/tony/Qt/5.7/ios/include", "/Users/tony/Qt/5.7/ios/include/QtGui"]
    cpp.libraryPaths: ["/Users/tony/Qt/5.7/ios/lib", "/Users/tony/Qt/5.7/ios/lib"]

    Properties {
        condition: Qt.core.staticBuild && qbs.targetOS.contains("ios")
        cpp.frameworks: base.concat(["UIKit", "QuartzCore", "CoreText", "CoreGraphics",
                                     "Foundation", "CoreFoundation"])
    }
    cpp.frameworks: base
    isStaticLibrary: true
}

