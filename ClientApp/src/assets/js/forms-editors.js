/**
 * Form Editors
 */

"use strict";
var snowEditor = null;
//var snowEditorSendOffer = null;

(function () {
  // Snow Theme
  // --------------------------------------------------------------------
  snowEditor = new Quill("#snow-editor", {
    bounds: "#snow-editor",
    modules: {
      formula: true,
      toolbar: "#snow-toolbar",
    },
    theme: "snow",
  });
})();
