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

      this._get("/weather", this._updateWeather, dom);
      return dom;
    };

    _updateWeather(weather, dom) {
      var title = document.createElement("div");
      title.innerHTML = weather.todayHigh + "° high<br/>" + weather.summary + " today";
      title.className = "item";
      title.style["flex"] = 1;
      dom.appendChild(title);

      var filler = document.createElement("div");
      title.className = "item";
      filler.style["flex"] = 2;
      dom.appendChild(filler);

      var data = weather.hourly.map(function(hour) {
        return { t: hour.time * 1000, y: hour.temperature };
      }).slice(0, 16);

      var config = {
        type: "line",
        data: {
          datasets: [{
            label: false,
            backgroundColor: "rgba(255, 255, 255, .25)",
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
              type: "time",
              display: true,
              scaleLabel: {
                display: true
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true
              },
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
