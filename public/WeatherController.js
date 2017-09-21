(function() {
  "use strict";

  daxter.WeatherController = class extends daxter.Controller {
    constructor(date) {
      super();
      this._date = date;
    };

    createDom() {
      var dom = document.createElement("div");
      dom.className = "item";

      this._get("/weather", this._updateWeather, dom);
      return dom;
    };

    _updateWeather(weather, dom) {
      dom.innerHTML = weather.todayHigh + "° high<br/>" + weather.summary + " today";
    };
  };
})();
