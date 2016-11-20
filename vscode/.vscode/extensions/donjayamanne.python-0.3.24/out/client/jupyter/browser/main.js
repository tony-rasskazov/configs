/// <reference path="typings/index.d.ts" />
"use strict";
var transformime = require('transformime');
var MarkdownTransform = require('transformime-marked');
var transform = transformime.createTransform([MarkdownTransform]);
window.initializeResults = function () {
    var data = window.JUPYTER_DATA;
    data.forEach(function (data) {
        if (typeof data['text/html'] === 'string') {
            data['text/html'] = data['text/html'].replace(/<\/scripts>/g, '</script>');
        }
        transform(data).then(function (result) {
            // If dealing with images add them inside a div with white background
            if (Object.keys(data).some(function (key) { return key.startsWith('image/'); })) {
                var div = document.createElement('div');
                div.style.backgroundColor = 'white';
                div.style.display = 'inline-block';
                div.appendChild(result.el);
                document.body.appendChild(div);
            }
            else {
                document.body.appendChild(result.el);
            }
        });
    });
};
//# sourceMappingURL=main.js.map