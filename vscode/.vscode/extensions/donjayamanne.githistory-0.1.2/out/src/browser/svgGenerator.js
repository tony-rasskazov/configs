"use strict";
(function () {
    var COLORS = ['#ffab1d', '#fd8c25', '#f36e4a', '#fc6148', '#d75ab6', '#b25ade', '#6575ff', '#7b77e9', '#4ea8ec', '#00d0f5', '#4eb94e', '#51af23', '#8b9f1c', '#d0b02f', '#d0853a', '#a4a4a4',
        '#ffc51f', '#fe982c', '#fd7854', '#ff705f', '#e467c3', '#bd65e9', '#7183ff', '#8985f7', '#55b6ff', '#10dcff', '#51cd51', '#5cba2e', '#9eb22f', '#debe3d', '#e19344', '#b8b8b8',
        '#ffd03b', '#ffae38', '#ff8a6a', '#ff7e7e', '#ef72ce', '#c56df1', '#8091ff', '#918dff', '#69caff', '#3ee1ff', '#72da72', '#71cf43', '#abbf3c', '#e6c645', '#eda04e', '#c5c5c5',
        '#ffd84c', '#ffb946', '#ff987c', '#ff8f8f', '#fb7eda', '#ce76fa', '#90a0ff', '#9c98ff', '#74cbff', '#64e7ff', '#7ce47c', '#85e357', '#b8cc49', '#edcd4c', '#f9ad58', '#d0d0d0',
        '#ffe651', '#ffbf51', '#ffa48b', '#ff9d9e', '#ff8de1', '#d583ff', '#97a9ff', '#a7a4ff', '#82d3ff', '#76eaff', '#85ed85', '#8deb5f', '#c2d653', '#f5d862', '#fcb75c', '#d7d7d7',
        '#fff456', '#ffc66d', '#ffb39e', '#ffabad', '#ff9de5', '#da90ff', '#9fb2ff', '#b2afff', '#8ddaff', '#8bedff', '#99f299', '#97f569', '#cde153', '#fbe276', '#ffc160', '#e1e1e1',
        '#fff970', '#ffd587', '#ffc2b2', '#ffb9bd', '#ffa5e7', '#de9cff', '#afbeff', '#bbb8ff', '#9fd4ff', '#9aefff', '#b3f7b3', '#a0fe72', '#dbef6c', '#fcee98', '#ffca69', '#eaeaea',
        '#763700', '#9f241e', '#982c0e', '#a81300', '#80035f', '#650d90', '#082fca', '#3531a3', '#1d4892', '#006f84', '#036b03', '#236600', '#445200', '#544509', '#702408', '#343434',
        '#9a5000', '#b33a20', '#b02f0f', '#c8210a', '#950f74', '#7b23a7', '#263dd4', '#4642b4', '#1d5cac', '#00849c', '#0e760e', '#287800', '#495600', '#6c5809', '#8d3a13', '#4e4e4e',
        '#c36806', '#c85120', '#bf3624', '#df2512', '#aa2288', '#933bbf', '#444cde', '#5753c5', '#1d71c6', '#0099bf', '#188018', '#2e8c00', '#607100', '#907609', '#ab511f', '#686868',
        '#e47b07', '#e36920', '#d34e2a', '#ec3b24', '#ba3d99', '#9d45c9', '#4f5aec', '#615dcf', '#3286cf', '#00abca', '#279227', '#3a980c', '#6c7f00', '#ab8b0a', '#b56427', '#757575',
        '#ff911a', '#fc8120', '#e7623e', '#fa5236', '#ca4da9', '#a74fd3', '#5a68ff', '#6d69db', '#489bd9', '#00bcde', '#36a436', '#47a519', '#798d0a', '#c1a120', '#bf7730', '#8e8e8e'];
    /*
        Cubic bezier
        <svg height="1500" width="1500" fill='yellow'>
        <path fill="none" stroke="red" stroke-width="3" d="M0,300 C0,150 300,150 300,0"></path>
        <path fill="none" stroke="red" stroke-width="3" d="M0,300 C0,450 300,450 300,600"></path>
        </svg>
    */
    var svg;
    var content;
    var branches = [];
    var branchColor = 0;
    window.GITHISTORY.generateSVG = function () {
        svg = document.getElementById('log-view').children[0];
        content = document.getElementById('log-view').children[1];
        var items = JSON.parse(document.querySelectorAll('div.json.entries')[0].innerHTML, dateReviver);
        svg.setAttribute('height', $(content).outerHeight().toString());
        svg.setAttribute('width', $(content).outerWidth().toString());
        if (items.length === 0) {
            return;
        }
        var $logEntry = $('.log-entry').filter(':first');
        var height = $logEntry.outerHeight() + parseFloat($logEntry.css('marginTop'));
        drawGitGraph(0, height, items);
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
    function drawGitGraph(startAt, logEntryHeight, entries) {
        if (logEntryHeight === void 0) { logEntryHeight = 60.8; }
        // Draw the graph
        var currentY = (0 + 0.5) * logEntryHeight;
        var topMostY = (0 + 0.5) * logEntryHeight;
        var maxLeft = 0;
        var lastXOffset = 12;
        var maxXOffset = 12;
        if (startAt === 0) {
            branchColor = 0;
        }
        for (var i = 0; i < startAt; i++) {
            content.children[i].className = 'hidden';
        }
        // Use this for new orphaned branches
        var circlesToAppend = [];
        var fictionalBranches = [];
        // let fictionalBranch2;
        var tabbedOnce = false;
        var fictionalBranchesUsed = false;
        var branched = false;
        for (var i = startAt; i < content.children.length; ++i) {
            if (i >= entries.length) {
                break;
            }
            var entry = entries[i];
            var entryElement = content.children[i];
            if (!entry) {
                break;
            }
            var index = 0;
            entryElement.branchesOnLeft = branches.length;
            // Find branches to join
            var childCount = 0;
            var xOffset = 12;
            var removedBranches = 0;
            var branchFound = i === startAt ? true : false;
            var padParentCount = 0;
            for (var j_1 = 0; j_1 < branches.length;) {
                var branch = branches[j_1];
                if (branch.sha1 === entry.sha1.full) {
                    branchFound = true;
                    if (childCount === 0) {
                        // Replace the branch
                        branch.path.setAttribute('d', branch.path.cmds + currentY);
                        if (entry.parents.length === 0) {
                            branches.splice(j_1, 1);
                            branched = true;
                        }
                        else {
                            branch.sha1 = entry.parents[0].full;
                        }
                        index = j_1;
                        ++j_1;
                    }
                    else {
                        // Join the branch
                        var x = (index + 1) * xOffset;
                        branch.path.setAttribute('d', branch.path.cmds + (currentY - logEntryHeight / 2) + ' L ' + x + ' ' + currentY);
                        branches.splice(j_1, 1);
                        branched = true;
                        ++removedBranches;
                    }
                    ++childCount;
                }
                else {
                    if (removedBranches !== 0) {
                        var x = (j_1 + 1) * xOffset;
                        branch.path.setAttribute('d', branch.path.cmds + (currentY - logEntryHeight / 2) + ' L ' + x + ' ' + currentY);
                    }
                    ++j_1;
                }
            }
            // Add new branches
            var xFromFictionalBranch = 0;
            var j = 0;
            for (j = 0; j < entry.parents.length; ++j) {
                var parent_1 = entry.parents[j];
                var x = (index + j + 1) * xOffset;
                if (j !== 0 || branches.length === 0) {
                    var svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    ++branchColor;
                    if (branchColor === COLORS.length) {
                        branchColor = 0;
                    }
                    svgPath.setAttribute('style', 'stroke:' + COLORS[branchColor]);
                    var origX = (index + 1) * xOffset;
                    svgPath.cmds = 'M ' + origX + ' ' + currentY + ' L ' + x + ' ' + (currentY + logEntryHeight / 2) + ' L ' + x + ' ';
                    svg.appendChild(svgPath);
                    var obj = {
                        sha1: parent_1.full,
                        path: svgPath,
                        wasFictional: false
                    };
                    if (fictionalBranches.length === 0 || !fictionalBranchesUsed) {
                        // Re-set the fictional branches if they haven't been used
                        // In case we have a merge as the very first step,
                        // Why? If we have a merge as the first step, then the fictional branch will have to move to the right
                        // due to the second parent which will take another index
                        if (!fictionalBranchesUsed) {
                            fictionalBranches = [];
                        }
                        // Generate at least 10 fictional branches, so we can lay them out neatly
                        for (var counter = 1; counter < 11; counter++) {
                            var newOrigX = (index + 1 + counter) * xOffset;
                            var fictionalBranch = 'M ' + newOrigX + ' ' + currentY + ' L ' + newOrigX + ' ' + topMostY + ' L ' + newOrigX + ' ';
                            fictionalBranches.push({ path: fictionalBranch, x: newOrigX });
                        }
                    }
                    branchFound = true;
                    branches.splice(index + j, 0, obj);
                }
                if (!branchFound && i > 0) {
                    index = branches.length;
                    var svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    ++branchColor;
                    if (branchColor === COLORS.length) {
                        branchColor = 0;
                    }
                    svgPath.setAttribute('style', 'stroke:' + COLORS[branchColor]);
                    fictionalBranchesUsed = true;
                    var fictionalBranch = fictionalBranches.splice(0, 1)[0];
                    xFromFictionalBranch = fictionalBranch.x;
                    svgPath.cmds = fictionalBranch.path;
                    svg.appendChild(svgPath);
                    var obj = {
                        sha1: parent_1.full,
                        path: svgPath,
                        wasFictional: true
                    };
                    branches.splice(index + j, 0, obj);
                    // We need to padd all parent log entries to take this into account
                    padParentCount += 1;
                }
                // Incremental updates for debugging
                for (var i_1 = 0; i_1 < branches.length; ++i_1) {
                    var branch = branches[i_1];
                    branch.path.setAttribute('d', branch.path.cmds + currentY);
                }
            }
            // What does this do?
            var tabBranch = false;
            for (j = index + j; j < branches.length; ++j) {
                tabBranch = true;
                var branch = branches[j];
                var x = (j + 1) * xOffset;
                branch.path.cmds += (currentY - logEntryHeight / 2) + ' L ' + x + ' ' + currentY + ' L ' + x + ' ';
            }
            tabBranch = tabBranch ? tabBranch : (entry.parents.length > 1 || branched);
            if (tabBranch && fictionalBranches.length > 0) {
                for (var counter = 0; counter < fictionalBranches.length; counter++) {
                    var x = (j + 1 + counter) * xOffset;
                    var fictionalBranch = fictionalBranches[counter];
                    if (tabbedOnce) {
                        fictionalBranch.path += (currentY - logEntryHeight / 2) + ' L ' + x + ' ' + (currentY) + ' L ' + x + ' ';
                    }
                    else {
                        if (currentY <= logEntryHeight) {
                            fictionalBranch.path += currentY + ' L ' + x + ' ' + logEntryHeight + ' L ' + x + ' ';
                        }
                        else {
                            fictionalBranch.path += currentY + ' L ' + x + ' ' + (currentY + logEntryHeight / 2) + ' L ' + x + ' ';
                        }
                    }
                    fictionalBranch.x = x;
                }
                tabbedOnce = true;
            }
            var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            var cx = ((branchFound || i === 0 ? index : branches.length - 1) + 1) * xOffset;
            if (xFromFictionalBranch > 0) {
                cx = xFromFictionalBranch;
            }
            svgCircle.setAttribute('cx', cx.toString());
            svgCircle.setAttribute('cy', currentY.toString());
            svgCircle.setAttribute('r', '4');
            circlesToAppend.push(svgCircle);
            entryElement.branchesOnLeft = Math.max(entryElement.branchesOnLeft, branches.length);
            maxLeft = Math.max(maxLeft, entryElement.branchesOnLeft);
            currentY += logEntryHeight;
            lastXOffset = xOffset;
            if (maxXOffset < xOffset) {
                maxXOffset = xOffset;
            }
            if (padParentCount > 0) {
                for (var parentElemtnCounter = startAt; parentElemtnCounter <= i; parentElemtnCounter++) {
                    if (parentElemtnCounter >= entries.length) {
                        break;
                    }
                    var el = content.children[parentElemtnCounter];
                    el.branchesOnLeft += padParentCount;
                }
            }
        }
        for (var i = startAt; i < content.children.length; ++i) {
            var element = content.children[i];
            if (i >= entries.length) {
                break;
            }
            var minLeft = Math.min(maxLeft, 3);
            var left = element ? Math.max(minLeft, element.branchesOnLeft) : minLeft;
            element.setAttribute('style', element.getAttribute('style') + ';padding-left:' + (left + 1) * lastXOffset + 'px');
        }
        branches.forEach(function (branch) {
            branch.path.setAttribute('d', branch.path.cmds + currentY);
        });
        circlesToAppend.forEach(svg.appendChild.bind(svg));
    }
})();
//# sourceMappingURL=svgGenerator.js.map