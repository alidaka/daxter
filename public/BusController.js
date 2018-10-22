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
        dom.appendChild(this._bus(buses.buses[i]));
      };
    };

    _bus(bus) {
      var time = dateFormat(bus.time, "HH:MM:ss");
      var delta = dateFormat(new Date(bus.time) - this._date, "M");

      var dom = document.createElement("div");
      dom.className = "bus";

      var name = document.createElement("div");
      name.className = 'item';
      name.innerHTML = bus.name;
      dom.appendChild(name);

      var status = document.createElement("div");
      status.className = 'item';
      status.innerHTML = bus.status;
      dom.appendChild(status);

      var deltaDom = document.createElement("div");
      deltaDom.className = 'item';
      deltaDom.innerHTML = delta;
      dom.appendChild(deltaDom);

      return dom;
    };
  };
})();
