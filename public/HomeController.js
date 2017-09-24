(function() {
  "use strict";

  daxter.HomeController = class extends daxter.Controller {
    constructor(clock, weather, bus) {
      super();
      this._clock = clock;
      this._weather = weather;
      this._bus = bus;
    };

    createDom() {
      var layout = this._createLayout();

      var clockDom = this._clock.createDom();
      clockDom.style["flex"] = 1;
      layout.left.appendChild(clockDom);

      var weatherDom = this._weather.createDom();
      weatherDom.style["flex"] = 2;
      layout.left.appendChild(weatherDom);

      var busDom = this._bus.createDom();
      layout.right.appendChild(busDom);

      return layout.dom;
    };

    _createLayout() {
      var dom = document.createElement("div");
      dom.className = "dashboard";

      var left = document.createElement("div");
      left.className = "container";
      left.style["flex-direction"] = "column";
      dom.appendChild(left);

      var right = document.createElement("div");
      right.className = "container";
      dom.appendChild(right);

      return {dom: dom, left: left, right: right};
    };
  };
})();
