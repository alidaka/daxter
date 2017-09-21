(function() {
  "use strict";

  daxter.BusController = class extends daxter.Controller {
    constructor() {
      super();
    };

    createDom() {
      var dom = document.createElement("div");
      dom.className = "item";

      dom.innerHTML = "bus";
      return dom;
    };
  };
})();
