require.config({
    baseUrl: "src/js",
    paths: {
        templates: "../templates",
        jquery: [
            "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min",
            "../lib/jquery/jquery"
        ],
        handlebars: [
            "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min",
            "../lib/handlebars/handlebars"
        ],
        lodash: [
            "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.1.0/lodash.min",
            "../lib/lodash/lodash.compat"
        ]
    },
    shim: {
        jquery: {
            exports: "jQuery"
        },
        handlebars: {
            // The reason to use 'exports' is if not, requirejs won't define a module for this plugin.
            // "exports" is used to identify the global that the non AMD module introduces.
            // It says: "Once loaded, use the global 'Handlebars' (which is used as value of exports )
            // as the module value". When requiring to use handlebars in some module and names it as "hhhh",
            // then requirejs will reference "Handlebars" to this local variable "hhhh".

            // And also this value should not be set as any name. It should fit to the variable name defined in
            // handlebars. So if you change this "Handlebars" to other names like "H", it will be error.

            //But jquery, loDash don't need this exports, because they have already call define() to declare the module
            exports: "Handlebars"
        },
        templates: {
            deps: ['handlebars']
        }
    }
});

require(["index"], function (index) {
    "use strict";
    index.init();
});
