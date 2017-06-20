(function() {
  "use strict";

  window.daxter = {};

  daxter.boot = function(root) {
    daxter._controller = new daxter.HomeController();
    daxter._controller.appendTo(root);
  };
}());
