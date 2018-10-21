(function() {
  "use strict";

  window.daxter = {};

  daxter.boot = function(root) {
    const now = new Date();
    var clock = new daxter.ClockController(now);
    var weather = new daxter.WeatherController();
    var bus = new daxter.BusController(now);

    daxter._controller = new daxter.HomeController(clock, weather, bus);
    var dom = daxter._controller.createDom();
    root.appendChild(dom);
  };
}());
