"use strict";
var vscode_1 = require('vscode');
var dmp = require('diff-match-patch');
var os_1 = require('os');
var fs = require('fs');
var path = require('path');
var tmp = require('tmp');
// Code borrowed from goFormat.ts (Go Extension for VS Code)
var EDIT_DELETE = 0;
var EDIT_INSERT = 1;
var EDIT_REPLACE = 2;
var NEW_LINE_LENGTH = os_1.EOL.length;
var Patch = (function () {
    function Patch() {
    }
    return Patch;
}());
var Edit = (function () {
    function Edit(action, start) {
        this.action = action;
        this.start = start;
        this.text = '';
    }
    Edit.prototype.apply = function () {
        switch (this.action) {
            case EDIT_INSERT:
                return vscode_1.TextEdit.insert(this.start, this.text);
            case EDIT_DELETE:
                return vscode_1.TextEdit.delete(new vscode_1.Range(this.start, this.end));
            case EDIT_REPLACE:
                return vscode_1.TextEdit.replace(new vscode_1.Range(this.start, this.end), this.text);
        }
    };
    return Edit;
}());
function getTextEditsFromPatch(before, patch) {
    if (patch.startsWith('---')) {
        // Strip the first two lines
        patch = patch.substring(patch.indexOf('@@'));
    }
    if (patch.length === 0) {
        return [];
    }
    // Remove the text added by unified_diff
    // # Work around missing newline (http://bugs.python.org/issue2142).
    patch = patch.replace(/\\ No newline at end of file[\r\n]/, '');
    var d = new dmp.diff_match_patch();
    var patches = patch_fromText.call(d, patch);
    if (!Array.isArray(patches) || patches.length === 0) {
        throw new Error('Unable to parse Patch string');
    }
    var textEdits = [];
    // Add line feeds
    // & build the text edits    
    patches.forEach(function (patch) {
        patch.diffs.forEach(function (diff) {
            diff[1] += os_1.EOL;
        });
        textEdits = textEdits.concat(getTextEditsInternal(before, patch.diffs, patch.start1));
    });
    return textEdits;
}
exports.getTextEditsFromPatch = getTextEditsFromPatch;
function getTextEdits(before, after) {
    var d = new dmp.diff_match_patch();
    var diffs = d.diff_main(before, after);
    return getTextEditsInternal(before, diffs);
}
exports.getTextEdits = getTextEdits;
function getTextEditsInternal(before, diffs, startLine) {
    if (startLine === void 0) { startLine = 0; }
    var line = startLine;
    var character = 0;
    if (line > 0) {
        var beforeLines = before.split(/\r?\n/g);
        beforeLines.filter(function (l, i) { return i < line; }).forEach(function (l) { return character += l.length + NEW_LINE_LENGTH; });
    }
    var edits = [];
    var edit = null;
    for (var i = 0; i < diffs.length; i++) {
        var start = new vscode_1.Position(line, character);
        // Compute the line/character after the diff is applied.
        for (var curr = 0; curr < diffs[i][1].length; curr++) {
            if (diffs[i][1][curr] !== '\n') {
                character++;
            }
            else {
                character = 0;
                line++;
            }
        }
        switch (diffs[i][0]) {
            case dmp.DIFF_DELETE:
                if (edit == null) {
                    edit = new Edit(EDIT_DELETE, start);
                }
                else if (edit.action !== EDIT_DELETE) {
                    throw new Error('cannot format due to an internal error.');
                }
                edit.end = new vscode_1.Position(line, character);
                break;
            case dmp.DIFF_INSERT:
                if (edit == null) {
                    edit = new Edit(EDIT_INSERT, start);
                }
                else if (edit.action === EDIT_DELETE) {
                    edit.action = EDIT_REPLACE;
                }
                // insert and replace edits are all relative to the original state
                // of the document, so inserts should reset the current line/character
                // position to the start.		
                line = start.line;
                character = start.character;
                edit.text += diffs[i][1];
                break;
            case dmp.DIFF_EQUAL:
                if (edit != null) {
                    edits.push(edit.apply());
                    edit = null;
                }
                break;
        }
    }
    if (edit != null) {
        edits.push(edit.apply());
    }
    return edits;
}
function getTempFileWithDocumentContents(document) {
    return new Promise(function (resolve, reject) {
        var ext = path.extname(document.uri.fsPath);
        var tmp = require('tmp');
        tmp.file({ postfix: ext }, function (err, tmpFilePath, fd) {
            if (err) {
                return reject(err);
            }
            fs.writeFile(tmpFilePath, document.getText(), function (ex) {
                if (ex) {
                    return reject("Failed to create a temporary file, " + ex.message);
                }
                resolve(tmpFilePath);
            });
        });
    });
}
exports.getTempFileWithDocumentContents = getTempFileWithDocumentContents;
/**
 * Parse a textual representation of patches and return a list of Patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
 * @throws {!Error} If invalid input.
 */
function patch_fromText(textline) {
    var patches = [];
    if (!textline) {
        return patches;
    }
    // Start Modification by Don Jayamanne 24/06/2016 Support for CRLF
    var text = textline.split(/[\r\n]/);
    // End Modification
    var textPointer = 0;
    var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
    while (textPointer < text.length) {
        var m = text[textPointer].match(patchHeader);
        if (!m) {
            throw new Error('Invalid patch string: ' + text[textPointer]);
        }
        var patch = new dmp.diff_match_patch.patch_obj();
        patches.push(patch);
        patch.start1 = parseInt(m[1], 10);
        if (m[2] === '') {
            patch.start1--;
            patch.length1 = 1;
        }
        else if (m[2] == '0') {
            patch.length1 = 0;
        }
        else {
            patch.start1--;
            patch.length1 = parseInt(m[2], 10);
        }
        patch.start2 = parseInt(m[3], 10);
        if (m[4] === '') {
            patch.start2--;
            patch.length2 = 1;
        }
        else if (m[4] == '0') {
            patch.length2 = 0;
        }
        else {
            patch.start2--;
            patch.length2 = parseInt(m[4], 10);
        }
        textPointer++;
        while (textPointer < text.length) {
            var sign = text[textPointer].charAt(0);
            try {
                //var line = decodeURI(text[textPointer].substring(1));
                // For some reason the patch generated by python files don't encode any characters
                // And this patch module (code from Google) is expecting the text to be encoded!!
                // Temporary solution, disable decoding
                // Issue #188
                var line = text[textPointer].substring(1);
            }
            catch (ex) {
                // Malformed URI sequence.
                throw new Error('Illegal escape in patch_fromText: ' + line);
            }
            if (sign == '-') {
                // Deletion.
                patch.diffs.push([dmp.DIFF_DELETE, line]);
            }
            else if (sign == '+') {
                // Insertion.
                patch.diffs.push([dmp.DIFF_INSERT, line]);
            }
            else if (sign == ' ') {
                // Minor equality.
                patch.diffs.push([dmp.DIFF_EQUAL, line]);
            }
            else if (sign == '@') {
                // Start of next patch.
                break;
            }
            else if (sign === '') {
            }
            else {
                // WTF?
                throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
            }
            textPointer++;
        }
    }
    return patches;
}
//# sourceMappingURL=editor.js.map