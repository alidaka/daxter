(function() {
  "use strict";

  daxter.HomeController = class extends daxter.Controller {
    constructor(clock, weather, bus) {
      super();
      this._clock = clock;
      this._weather = weather;
      this._bus = bus;
    };

    appendTo(container) {
      this._root = this.createDom();
      container.appendChild(this._root);
    };

    createDom() {
      var dom = document.createElement("div");
      dom.className = "dashboard";

      // left
      var left = document.createElement("div");
      left.className = "container";
      left.style["flex-direction"] = "column";

      var clockDom = this._clock.createDom();
      clockDom.style["flex"] = 1;
      left.appendChild(clockDom);

      var weatherDom = this._weather.createDom();
      weatherDom.style["flex"] = 2;
      left.appendChild(weatherDom);

      dom.appendChild(left);

      // right
      var right = document.createElement("div");
      right.className = "container";

      var busDom = this._bus.createDom();
      right.appendChild(busDom);

      dom.appendChild(right);

      return dom;
    };
  };
})();
