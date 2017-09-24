(function() {
  "use strict";

  daxter.HomeController = class extends daxter.Controller {
    constructor(clock, weather, bus) {
      super();
      this._clock = clock;
      this._weather = weather;
      this._bus = bus;
    };

    createDom() {
      var layout = this._createLayout();

      var clockDom = this._clock.createDom();
      clockDom.style["flex"] = 1;
      layout.left.appendChild(clockDom);

      var weatherDom = this._weather.createDom();
      weatherDom.style["flex"] = 2;
      layout.left.appendChild(weatherDom);

      var busDom = this._bus.createDom();
      layout.right.appendChild(busDom);

      return layout.dom;
    };

    _createLayout() {
      var dom = document.createElement("div");
      dom.className = "dashboard";

      var left = document.createElement("div");
      left.className = "container";
      left.style["flex-direction"] = "column";
      dom.appendChild(left);

      var right = document.createElement("div");
      right.className = "container";
      dom.appendChild(right);

      var overlay = this._createOverlay(dom);
      dom.appendChild(overlay);

      return {dom: dom, left: left, right: right};
    };

    _createOverlay(dom) {
      var overlay = document.createElement("div");
      overlay.className = "overlay";

      var fullscreenButton = document.createElement("span");
      fullscreenButton.classList.add("fa");
      fullscreenButton.classList.add("fa-arrows-alt");
      fullscreenButton.classList.add("fa-1");

      var that = this;
      fullscreenButton.onclick = function() {
        that._toggleFullscreen(dom);
      };

      overlay.appendChild(fullscreenButton);

      return overlay;
    };

    _toggleFullscreen(dom) {
      var isFullscreen = document.isFullscreen || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen;
      if (isFullscreen) {
        this._exitFullscreen();
      } else {
        this._enterFullscreen(dom);
      }
    };

    _enterFullscreen(dom) {
      if (dom.requestFullscreen) {
        dom.requestFullscreen();
      } else if (dom.msRequestFullscreen) {
        dom.msRequestFullscreen();
      } else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
      } else if (dom.webkitRequestFullscreen) {
        dom.webkitRequestFullscreen();
      }
    };

    _exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    };
  };
})();
