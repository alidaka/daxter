(function() {
  "use strict";

  function daxter.boot() {
    new daxter.App(document.body).start();
  }

  daxter.App = class {
    constructor(root) {
      this._root = root;
    }

    function start() {
    }
  }

}());
