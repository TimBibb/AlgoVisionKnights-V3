import * as d3 from "d3";
import UndirectedEdge from "./UndirectedEdge";
import Number from "../Number";

class WeightedUndirectedEdge extends UndirectedEdge {
  constructor(ref, lineId, circleId, textId, x1p, y1p, x2p, y2p, weight) {
    let x1 = parseInt(x1p.substring(0, x1p.length - 1));
    let y1 = parseInt(y1p.substring(0, y1p.length - 1));
    let x2 = parseInt(x2p.substring(0, x2p.length - 1));
    let y2 = parseInt(y2p.substring(0, y2p.length - 1));

    super(ref, lineId, x1p, y1p, x2p, y2p);
    this.line = {
      attr: this.attr,
      style: this.style,
    };
    delete this.attr;
    delete this.style;
    let xm = (x1 + x2) / 2;
    let ym = (y1 + y2) / 2;

    this.circle = {
      attr: {
        id: circleId,
        cx: xm + "%",
        cy: ym + "%",
        r: "3.75%",
        fill: "#1b203d",
      },
    };

    d3.select(ref.current)
      .select("svg")
      .append("circle")
      .attr("id", this.circle.attr.id)
      .attr("cx", this.circle.attr.cx)
      .attr("cy", this.circle.attr.cy)
      .attr("r", this.circle.attr.r)
      .attr("fill", this.circle.attr.fill);
    this.text = new Number(ref, textId, xm + "%", ym + "%", weight, "gray", "visible", "3em");
  }
}

export default WeightedUndirectedEdge;
