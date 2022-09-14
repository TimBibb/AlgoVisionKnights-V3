import * as d3 from "d3";

class UndirectedEdge {
  constructor(ref, id, x1, y1, x2, y2, visibility) {
    this.attr = {
      id: id,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      visibility: visibility,
    };
    this.style = {
      stroke: "gray",
      "stroke-width": 5,
    };

    d3.select(ref.current)
      .select("svg")
      .append("line")
      .attr("id", this.attr.id)
      .attr("x1", this.attr.x1)
      .attr("y1", this.attr.y1)
      .attr("x2", this.attr.x2)
      .attr("y2", this.attr.y2)
      .attr("visibility", this.attr.visibility)
      .style("stroke", this.style.stroke)
      .style("stroke-width", this.style["stroke-width"]);
  }
}

export default UndirectedEdge;
