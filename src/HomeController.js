(function() {
  "use strict";

  daxter.HomeController = class {
    appendTo(container, width, height) {
      this._root = this.createDom(width, height);
      container.appendChild(this._root);
    }

    createDom(width, height) {
      var dom = document.createElement("div");
      dom.className = "dashboard";
      dom.style.width = width;
      dom.style.height = height;

      var svg = d3.select(dom).append("svg")
        .attr("width", width)
        .attr("height", height);

      this._addBackground(svg);

      var now = new Date();
      this._addClock(svg, 0, 0, width/2, height/2, now);

      this._addWeather(svg, 0, height/2, width/2, height/2);

      this._addBuses(svg, width/2, 0, width/2, height);

      return dom;
    };

    _addBackground(svg) {
      svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "#cef")
        .attr("fill-opacity", "0.2");
    }

    _addClock(svg, x, y, width, height, date) {
      this.__debug_highlight_region(svg, x, y, width, height);

      var text = svg.append("text")
        .attr("alignment-baseline", "central")
        .attr("transform", `translate(${width/2}, ${height/2})`);

      var displayTime = date.toLocaleTimeString('en-US', {hour12: false});
      text.append("tspan").text(displayTime).attr("x", -30).attr("y", "-10px");

      var displayDate = dateFormat(date, "ddd mmm dd")
      text.append("tspan").text(displayDate).attr("x", -30).attr("y", "10px");
    }

    _addWeather(svg, x, y, width, height) {
      this.__debug_highlight_region(svg, x, y, width, height);
    }

    _addBuses(svg, x, y, width, height) {
      this.__debug_highlight_region(svg, x, y, width, height);
    }

    __debug_highlight_region(svg, x, y, width, height) {
      var radius = Math.min(width, height) / 2;
      var arc = d3.arc()
        .innerRadius(radius * .95)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(2 * Math.PI);

      var color = '#'+Math.floor(Math.random()*0xffffff).toString(16); // lol
      svg.append("ellipse")
        .attr("cx", x + width/2)
        .attr("cy", y + height/2)
        .attr("rx", width/2)
        .attr("ry", height/2)
        .attr("fill", color);

      svg.append("path")
        .attr("d", arc)
        .attr("fill", "black")
        .attr("transform", `translate(${x+width/2}, ${y+height/2})`);
    }

  };
})();
