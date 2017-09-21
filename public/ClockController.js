(function() {
  "use strict";

  daxter.ClockController = class extends daxter.Controller {
    constructor(date) {
      super();
      this._date = date;
    };

    createDom() {
      var dom = document.createElement("div");
      dom.className = "item";

      var displayTime = dateFormat(this._date, "HH:MM:ss");
      var displayDate = dateFormat(this._date, "ddd mmm dd");
      dom.innerHTML = displayTime + "<br/>" + displayDate;

      return dom;
    };
  };
})();
