(function () {
    window.GITHISTORY = {};
    var clipboard = null;
    function initializeClipboard() {
        $('a.clipboard-link').addClass('hidden');
        clipboard = new Clipboard('.btn.clipboard');
        clipboard.on('success', onCopied);
    }
    function onCopied(e) {
        e.clearSelection();
    }
    $(document).ready(function () {
        initializeClipboard();
        window.GITHISTORY.generateSVG();
        window.GITHISTORY.initializeDetailsView();
    });
})();
//# sourceMappingURL=proxy.js.map