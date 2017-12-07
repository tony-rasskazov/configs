import qbs 1.0
import '../QtModule.qbs' as QtModule

QtModule {
    qtModuleName: "phonon"
    Depends { name: "Qt"; submodules: ['core'] }
    cpp.defines: ["QT_PHONON_LIB"]
    cpp.includePaths: ["/home/tony/Qt/4.8/arm/include", "/home/tony/Qt/4.8/arm/include/Phonon"]
}
