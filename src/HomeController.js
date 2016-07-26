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

      svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "#cef")
        .attr("fill-opacity", "0.2");

      var now = new Date();
      this._addClock(svg, 0, 0, width/2, height/2, now);

      return dom;
    };

    _addClock(svg, x, y, width, height, date) {
      var radius = Math.min(width, height) / 2;
      var arc = d3.arc()
        .innerRadius(radius * .95)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(2 * Math.PI);

      svg.append("path")
        .attr("d", arc)
        .attr("fill", "red")
        .attr("transform", `translate(${width/2}, ${height/2})`);

      var displayTime = date.toLocaleTimeString('en-US', {hour12: false});
      var displayDate = dateFormat(date, "ddd mmm dd")
      var text = svg.append("text")
        .attr("alignment-baseline", "central")
        .attr("transform", `translate(${width/2}, ${height/2})`);
      text.append("tspan").text(displayTime).attr("x", -30).attr("y", "-10px");
      text.append("tspan").text(displayDate).attr("x", -30).attr("y", "10px");
    }
  };

})();
