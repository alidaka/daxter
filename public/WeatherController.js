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
      dom.style["flex-direction"] = "column";

      this._get("/weather", this._updateWeather.bind(this), dom);
      return dom;
    };

    _updateWeather(weather, dom) {
      var title = document.createElement("div");
      title.innerHTML = Math.trunc(weather.current) + "°<br/>" + weather.summary + " today";
      title.className = "item";
      title.style["flex"] = 1;
      dom.appendChild(title);

      var filler = document.createElement("div");
      filler.style["flex"] = 2;
      dom.appendChild(filler);

      this._attachChart(weather, dom);
    };

    _attachChart(weather, dom) {
      var data = weather.hourly.map(function(hour) {
        return { t: hour.time * 1000, y: hour.temperature };
      }).slice(0, 16);

      var high = weather.todayHigh;
      var blue = 255 * (1 - (Math.max(0, high - 40) / 40));
      var red = 255 * (Math.max(0, high - 40) / 40);
      var backgroundColor = "rgba(" + Math.trunc(red) + ", 0, " + Math.trunc(blue) + ", .5)";

      var config = {
        type: "line",
        data: {
          datasets: [{
            label: false,
            backgroundColor: backgroundColor,
            data: data,
            fill: "origin"
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: "time"
            }],
            yAxes: [{
              ticks: {
                suggestedMin: 40,
                suggestedMax: 80
              }
            }]
          }
        }
      };

      var chartDom = document.createElement("canvas");
      chartDom.className = "graph";
      new Chart(chartDom, config);

      dom.appendChild(chartDom);
    };
  };
})();
