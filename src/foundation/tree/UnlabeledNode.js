import * as d3 from "d3";

class UnlabeledNode {
  constructor(ref, id, cx, cy, visibility, level) {
    this.attr = {
      id: id,
      cx: cx,
      cy: cy,
      r: "3.75%",
      stroke: "gray",
      "stroke-width": 7,
      fill: "#1b203d",
      visibility: visibility,
      level: level != null ? level : false
    };

    d3.select(ref.current)
      .select("svg g")
      .append("circle")
      .attr("id", this.attr.id)
      .attr("cx", this.attr.cx)
      .attr("cy", this.attr.cy)
      .attr("r", this.attr.r)
      .attr("stroke", this.attr.stroke)
      .attr("stroke-width", this.attr["stroke-width"])
      .attr("fill", this.attr.fill)
      .attr("visibility", this.attr.visibility)
      .classed("level1", this.attr.level)
  }
}

export default UnlabeledNode;
