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
      this._addTitle(weather, dom);
      this._addChart(weather, dom);
    };

    _iconFor(summary) {
      var icon = document.createElement("span");
      icon.classList.add("fa");
      icon.classList.add("fa-arrows-alt");
      icon.classList.add("fa-1");
      return icon;
    }

    _spacer() {
      var spacer = document.createElement("div");
      spacer.className = "item";
      return spacer;
    }

    _addTitle(weather, dom) {
      var titleRow = document.createElement("div");
      titleRow.className = "container";
      titleRow.appendChild(this._spacer());

      var forecastHours = 4;
      var current = document.createElement("div");
      current.className = "container";
      current.style["flex-direction"] = "column";
      current.style["vertical-margin"] = 0;
        var currentTop = document.createElement("div");
        currentTop.className = "container";
          var currentTemp = document.createElement("div");
          currentTemp.innerHTML = Math.trunc(weather.currentTemp) + "°";
          currentTemp.className = ".item";
          currentTop.appendChild(currentTemp);
          var currentIcon = this._iconFor(weather);
          currentIcon.classList.add(".item");
          currentTop.appendChild(currentIcon);
        current.appendChild(currentTop);
        var currentText = document.createElement("div");
        currentText.innerHTML = weather.currentSummary;
        current.appendChild(currentText);
      current.style["flex"] = 1 + forecastHours;
      titleRow.appendChild(current);
      titleRow.appendChild(this._spacer());

      for (var i = 0; i < forecastHours; i++) {
        var daily = document.createElement("div");
        daily.innerHTML = Math.trunc(weather.hourly[i].temperature) + "°<br/>" + weather.hourly[i].icon;
        daily.className = "container";
        daily.classList.add("mini");
        titleRow.appendChild(daily);
        titleRow.appendChild(this._spacer());
      }

      dom.appendChild(titleRow);

      var filler = document.createElement("div");
      filler.style["flex"] = 2;
      dom.appendChild(filler);
    }

    _addChart(weather, dom) {
      var data = weather.hourly.map(function(hour) {
        return { t: hour.time * 1000, y: hour.temperature };
      }).slice(0, 16);

      var high = weather.high;
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
