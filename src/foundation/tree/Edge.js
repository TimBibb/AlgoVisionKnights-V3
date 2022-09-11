import * as d3 from "d3";

class UndirectedEdge {
  constructor(ref, id, x1, y1, x2, y2, visibility) {
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.visibility = visibility;

    this.style = {
      stroke: "gray",
      "stroke-width": 5,
    };

    d3.select(ref.current)
      .select("svg g")
      .append("line")
      .attr("id", this.id)
      .attr("x1", this.x1)
      .attr("y1", this.y1)
      .attr("x2", this.x2)
      .attr("y2", this.y2)
      .attr("visibility", this.visibility)
      .style("stroke", this.style.stroke)
      .style("stroke-width", this.style["stroke-width"]);
  }
}

export default UndirectedEdge;
