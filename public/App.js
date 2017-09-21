(function() {
  "use strict";

  window.daxter = {};

  daxter.boot = function(root) {
    var clock = new daxter.ClockController(new Date());
    var weather = new daxter.WeatherController();
    var bus = new daxter.BusController();

    daxter._controller = new daxter.HomeController(clock, weather, bus);
    daxter._controller.appendTo(root);
  };
}());
