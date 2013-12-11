/*global define */
define(function (require) {
   'use strict';
   var jquery = require("jquery");

   return {
       init: function () {
           jquery("#name").html("test");
       }
   };
});
