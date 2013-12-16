/*global define, console */
define(function (require) {
    'use strict';
    var jquery = require("jquery"),
        // handlebars = require("handlebars"),
        screenTemplate = require("templates/screen"),
        lodash = require("lodash"),
        html;

    function fillHTML(nodeId, content) {
        jquery(nodeId).empty().append(content);
    }

    function fillScreen() {
        var castleTopPotisions = [30, 30, 30, 30],
            content = lodash.map(castleTopPotisions, function (index) {
                return {style: 'top: ' + index + 'px'};
            });
        html = screenTemplate({castles: content});
        fillHTML("#content", html);
    }

    return {
        init: function () {
            fillScreen();
        }
    };
});
