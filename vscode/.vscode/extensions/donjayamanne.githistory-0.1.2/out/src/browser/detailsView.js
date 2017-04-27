"use strict";
(function () {
    var logEntries;
    var $logView;
    var $detailsView;
    var $fileListTemplate;
    window.GITHISTORY.initializeDetailsView = function () {
        $logView = $('#log-view');
        $detailsView = $('#details-view');
        $fileListTemplate = $('.diff-row', $detailsView);
        logEntries = JSON.parse(document.querySelectorAll('div.json.entries')[0].innerHTML, dateReviver);
        addEventHandlers();
    };
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    // Used to deserialise dates to dates instead of strings (default behaviour)
    function dateReviver(key, value) {
        var dateTest = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
        if (typeof value === 'string' && dateTest.exec(value)) {
            return new Date(value);
        }
        return value;
    }
    ;
    function addEventHandlers() {
        $('.commit-subject-link', $logView).addClass('hidden');
        // delegate the events
        $logView
            .on('click', '.commit-subject', function (evt) {
            var entryIndex = evt.target.getAttribute('data-entry-index');
            displayDetails(logEntries[parseInt(entryIndex)], event.target);
        })
            .on('click', '.commit-hash', function (evt) {
            var entryIndex = evt.target.getAttribute('data-entry-index');
            displayDetails(logEntries[parseInt(entryIndex)], event.target);
        });
        $detailsView
            .on('click', '.close-btn', hideDetails);
    }
    var detailsViewShown = false;
    function displayDetails(entry, eventTarget) {
        var $logEntry = $(eventTarget).closest('.log-entry');
        // mark this log entry as selected
        $('.log-entry', $logView).removeClass('active');
        $logEntry.addClass('active');
        if (!detailsViewShown) {
            $logView.addClass('with-details');
            $logView.animate({
                scrollTop: $logEntry.offset().top - $logView.offset().top + $logView.scrollTop()
            });
            $detailsView.removeClass('hidden');
        }
        $('.commit-subject', $detailsView).html(entry.subject);
        $('.commit-author .name', $detailsView)
            .attr('aria-label', entry.author.email)
            .html(entry.author.name);
        $('.commit-author .timestamp', $detailsView)
            .html(' on ' + entry.author.localisedDate);
        $('.commit-body', $detailsView)
            .html(entry.body);
        $('.commit-notes', $detailsView).html(entry.notes);
        var $files = $('.committed-files', $detailsView);
        $files.html('');
        entry.fileStats.forEach(function (stat) {
            var $fileItem = $fileListTemplate.clone(false);
            var additions = stat.additions, deletions = stat.deletions;
            var totalDiffs = additions + deletions;
            if (totalDiffs > 5) {
                additions = Math.ceil(5 * additions / totalDiffs);
                deletions = 5 - additions;
            }
            /* show the original number of changes in the title and count */
            $('.diff-stats', $fileItem).attr('aria-label', "added " + stat.additions + " & deleted " + stat.deletions);
            $('.diff-count', $fileItem).html(totalDiffs.toString());
            /* colour the blocks in addition:deletion ratio */
            $('.diff-block', $fileItem).each(function (index, el) {
                var $el = $(el);
                if (index < additions) {
                    $el.addClass('added');
                }
                else if (index < totalDiffs) {
                    $el.addClass('deleted');
                }
            });
            $('.file-name', $fileItem).html(stat.path);
            var uri = encodeURI('command:git.viewFileCommitDetails?' + JSON.stringify([entry.sha1.full, stat.path, entry.committer.date.toISOString()]));
            $('a.file-name', $fileItem).attr('href', uri);
            $files.append($fileItem);
        });
    }
    function hideDetails() {
        detailsViewShown = false;
        $detailsView.addClass('hidden');
        $logView.removeClass('with-details');
    }
})();
//# sourceMappingURL=detailsView.js.map