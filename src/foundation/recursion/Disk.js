import * as d3 from "d3";

class Disk {
  constructor(ref, rectId, textId, cxp, cyp, wdp, htp, color, text) {
    let cx = parseFloat(cxp.substring(0, cxp.length - 1));
    let cy = parseFloat(cyp.substring(0, cyp.length - 1));
    let wd = parseFloat(wdp.substring(0, wdp.length - 1));
    let ht = parseFloat(htp.substring(0, htp.length - 1));

    let x = cx - wd / 2.0;
    let y = cy - ht / 2.0;

    this.rect = {
      attr: {
        id: rectId,
        x: x + "%",
        y: y + "%",
        rx: "1%",
        ry: "1.5%",
        width: wdp,
        height: htp,
      },
      style: {
        fill: color,
        stroke: color,
        "fill-opacity": 1,
        "stroke-opacity": 1,
      },
    };

    this.text = {
      text: text,
      attr: {
        id: textId,
        x: cxp,
        y: cyp,
        "text-anchor": "middle",
        visibility: "visible",
        "dominant-baseline": "middle",
        "font-size": "2.5em",
        "font-weight": "bold",
      },
      style: {
        fill: "white",
        stroke: "black",
      },
    };

    d3.select(ref.current)
      .select("svg")
      .append("rect")
      .attr("id", this.rect.attr.id)
      .attr("x", this.rect.attr.x)
      .attr("y", this.rect.attr.y)
      .attr("rx", this.rect.attr.rx)
      .attr("ry", this.rect.attr.ry)
      .attr("width", this.rect.attr.width)
      .attr("height", this.rect.attr.height)
      .style("fill", this.rect.style.fill)
      .style("stroke", this.rect.style.stroke)
      .style("fill-opacity", this.rect.style["fill-opacity"])
      .style("stroke-opacity", this.rect.style["stroke-opacity"]);

    d3.select(ref.current)
      .select("svg")
      .append("text")
      .attr("id", this.text.attr.id)
      .attr("x", this.text.attr.x)
      .attr("y", this.text.attr.y)
      .attr("text-anchor", this.text.attr["text-anchor"])
      .attr("visibility", this.text.attr.visibility)
      .attr("dominant-baseline", this.text.attr["dominant-baseline"])
      .attr("font-size", this.text.attr["font-size"])
      .attr("font-weight", this.text.attr["font-weight"])
      .style("fill", this.text.style.fill)
      .style("stroke", this.text.style.stroke)
      .text(this.text.text);
  }
}

export default Disk;
