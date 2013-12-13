/*global require, mocha */
require.config({
    baseUrl: '../src/js',

    paths: {
        use: '../../lib/use/use.min',
        templates: '../templates',
        jquery: "http:///cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min",
        backbone: "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.9-amdjs/backbone-min",
        bootstrap: "http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min",
        i18next: "http://cdnjs.cloudflare.com/ajax/libs/i18next/1.6.3/i18next.amd-1.6.3",
        handlebars: "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.runtime",
        loDash: 'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.0.0/lodash.min',
        text: 'http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min',
        chai: '../../node_modules/chai/chai'
    },

    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        mocha: {
            exports: 'mocha'
        },
        bootstrap: ['jquery'],
        "codemirror/codemirror": {
            exports: 'CodeMirror'
        }
    },

    use: {
        jquery: {
            attach: 'jQuery'
        },
        underscore: {
            attach: 'underscore'
        },
        backbone: {
            deps: ['use!underscore', 'jquery'],
            attach: 'Backbone'
        }
    }
});

require(['chai'], function (chai) {
    "use strict";
    var should = chai.should();

    mocha.setup({ ui: 'bdd' });

    require([], function () {
        mocha.run(should);
    });
});

