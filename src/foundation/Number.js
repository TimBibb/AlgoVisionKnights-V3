import * as d3 from "d3";

class Number {
  constructor(ref, id, x, y, text, fill, visibility, fontSize = "4em") {
    this.text = text;
    this.attr = {
      id: id,
      x: x,
      y: y,
      "text-anchor": "middle",
      visibility: visibility,
      "dominant-baseline": "middle",
      "font-size": fontSize,
      "font-weight": "bold",
    };
    this.style = {
      fill: fill,
    };
    d3.select(ref.current)
      .select("svg")
      .append("text")
      .attr("id", this.attr.id)
      .attr("x", this.attr.x)
      .attr("y", this.attr.y)
      .attr("text-anchor", this.attr["text-anchor"])
      .attr("visibility", this.attr.visibility)
      .attr("dominant-baseline", this.attr["dominant-baseline"])
      .attr("font-size", this.attr["font-size"])
      .attr("font-weight", this.attr["font-weight"])
      .style("fill", this.style.fill)
      .text(this.text);
  }
}

export default Number;
