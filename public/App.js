(function() {
  "use strict";

  window.daxter = {};

  daxter.boot = function(root) {
    var clock = new daxter.ClockController(new Date());
    daxter._controller = new daxter.HomeController(clock);
    daxter._controller.appendTo(root);
  };
}());
