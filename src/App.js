(function() {
  "use strict";

  window.daxter = {};

  daxter.App = class {
    constructor(root) {
      this._root = root;
      this._controller = new daxter.HomeController(this._root);
      this._controller.appendTo(this._root);
    }

    start() {
    }
  }

  daxter.boot = function() {
    new daxter.App(document.body).start();
  };

}());
