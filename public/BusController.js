(function() {
  "use strict";

  daxter.BusController = class extends daxter.Controller {
    constructor() {
      super();
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
        var busDom = document.createElement("div");
        busDom.className = "container";
        busDom.innerHTML = `${bus.status} ${bus.time} ${bus.delta}`;
        dom.appendChild(busDom);
      };
    };
  };
})();
