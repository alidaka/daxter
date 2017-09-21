(function() {
  "use strict";

  daxter.HomeController = class extends daxter.Controller {
    constructor(clock, weather) {
      super();
      this._clock = clock;
      this._weather = weather;
    };

    appendTo(container) {
      this._root = this.createDom();
      container.appendChild(this._root);
    };

    createDom() {
      var dom = document.createElement("div");
      dom.className = "dashboard";

      var left = document.createElement("div");
      left.className = "container";
      left.style["flex-direction"] = "column";

      var clockDom = this._clock.createDom();
      clockDom.style["flex"] = 1;
      left.appendChild(clockDom);

      var weatherDom = this._weather.createDom();
      weatherDom.style["flex"] = 1;
      left.appendChild(weatherDom);

      dom.appendChild(left);

      var right = document.createElement("div");
      right.className = "container";

      right.appendChild(this._createBuses());
      dom.appendChild(right);

      return dom;
    };

    // TODO: these should be their own models :(
    _createBuses(svg, x, y, width, height) {
      var dom = document.createElement("div");
      dom.className = "item";

      dom.innerHTML = "bus";
      return dom;
    };
  };
})();
