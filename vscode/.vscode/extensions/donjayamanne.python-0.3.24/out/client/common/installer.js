"use strict";
(function (product) {
    product[product["pytest"] = 0] = "pytest";
    product[product["nosetest"] = 1] = "nosetest";
    product[product["pylint"] = 2] = "pylint";
    product[product["flake8"] = 3] = "flake8";
    product[product["pep8"] = 4] = "pep8";
    product[product["prospector"] = 5] = "prospector";
    product[product["pydocstyle"] = 6] = "pydocstyle";
    product[product["yapf"] = 7] = "yapf";
    product[product["autopep8"] = 8] = "autopep8";
})(exports.product || (exports.product = {}));
var product = exports.product;
var productInstallScripts = new Map();
function promptToInstall(prod) {
}
exports.promptToInstall = promptToInstall;
//# sourceMappingURL=installer.js.map