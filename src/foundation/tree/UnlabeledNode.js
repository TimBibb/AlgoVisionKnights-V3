import * as d3 from "d3";

class UnlabeledNode {
  constructor(ref, id, cx, cy, visibility) {
    this.attr = {
      id: id,
      cx: cx,
      cy: cy,
      r: "3.75%",
      stroke: "gray",
      "stroke-width": 7,
      fill: "#1b203d",
      visibility: visibility,
    };

    d3.select(ref.current)
      .select("svg")
      .append("circle")
      .attr("id", this.attr.id)
      .attr("cx", this.attr.cx)
      .attr("cy", this.attr.cy)
      .attr("r", this.attr.r)
      .attr("stroke", this.attr.stroke)
      .attr("stroke-width", this.attr["stroke-width"])
      .attr("fill", this.attr.fill)
      .attr("visibility", this.attr.visibility);
  }
}

export default UnlabeledNode;
