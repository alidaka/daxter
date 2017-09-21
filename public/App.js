(function() {
  "use strict";

  window.daxter = {};

  daxter.boot = function(root) {
    var clock = new daxter.ClockController(new Date());
    var weather = new daxter.WeatherController();

    daxter._controller = new daxter.HomeController(clock, weather);
    daxter._controller.appendTo(root);
  };
}());
