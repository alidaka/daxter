(function() {
  "use strict";

  daxter.HomeController = class {
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

      left.appendChild(this._createClock(new Date()));
      left.appendChild(this._createWeather());
      dom.appendChild(left);

      var right = document.createElement("div");
      right.className = "container";

      right.appendChild(this._createBuses());
      dom.appendChild(right);

      return dom;
    };

    // TODO: these should be their own models :(
    _createClock(date) {
      var dom = document.createElement("div");
      dom.className = "item";

      var displayTime = dateFormat(date, "HH:MM:ss");
      var displayDate = dateFormat(date, "ddd mmm dd");
      dom.innerHTML = displayTime + "<br/>" + displayDate;

      return dom;
    };

    // TODO: these should be their own models :(
    _createWeather() {
      var dom = document.createElement("div");
      dom.className = "item";
      dom.style["flex"] = 2;

      this._get("/weather", this._updateWeather, dom);
      return dom;
    };

    _updateWeather(weather, dom) {
      dom.innerHTML = weather.todayHigh + "' high<br/>" + weather.summary + " today";
    };

    _get(uri, callback, param) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(JSON.parse(xhr.responseText), param);
        }
      };
      xhr.open("GET", uri, true);
      xhr.send(null);
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
