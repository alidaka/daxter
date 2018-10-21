(function() {
  "use strict";

  daxter.BusController = class extends daxter.Controller {
    constructor(date) {
      super();
      this._date = date;
    };

    createDom() {
      var dom = document.createElement("div");
      dom.className = "item";
      dom.classList.add("buses");

      this._get("/buses", this._updateBuses.bind(this), dom);
      return dom;
    };

    _updateBuses(buses, dom) {
      for (var i = 0; i < buses.buses.length; i++) {
        var bus = buses.buses[i];
        var time = dateFormat(bus.time, "HH:MM:ss");
        var delta = dateFormat(new Date(bus.time) - this._date, "M");

        var busDom = document.createElement("div");
        busDom.className = "item";
        busDom.innerHTML = `${bus.name} | ${bus.status} | ${delta}m`;
        dom.appendChild(busDom);
      };
    };
  };
})();
