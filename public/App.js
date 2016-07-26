(function() {
  "use strict";

  window.daxter = {};

  daxter.App = class {
    constructor(root, margin) {
      this._root = root;
      this._root.style.margin = `${margin}px`;

      var fudge = 2 * margin;
      var width = this._root.clientWidth - fudge;
      var height = this._root.clientHeight - fudge;

      this._controller = new daxter.HomeController();
      this._controller.appendTo(this._root, width, height);
    }

    start() {
    }
  }

  daxter.boot = function() {
    // TODO: this sucks but I can't figure out how to lift it into CSS without depending on render-time values(?)
    var margin = 20;
    new daxter.App(document.body, margin).start();
  };

}());
