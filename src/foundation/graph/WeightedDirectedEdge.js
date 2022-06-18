import WeightedUndirectedEdge from "./WeightedUndirectedEdge";
import UndirectedEdge from "./UndirectedEdge";
import getEdgeWings from "./GetEdgeWings";

class WeightedDirectedEdge extends WeightedUndirectedEdge {
  constructor(ref, lineId, circleId, textId, wing1Id, wing2Id, x1p, y1p, x2p, y2p, weight) {
    super(ref, lineId, circleId, textId, x1p, y1p, x2p, y2p, weight);
    let x1 = parseFloat(x1p.substring(0, x1p.length - 1));
    let y1 = parseFloat(y1p.substring(0, y1p.length - 1));
    let x2 = parseFloat(x2p.substring(0, x2p.length - 1));
    let y2 = parseFloat(y2p.substring(0, y2p.length - 1));

    let [x, y, wing1x, wing1y, wing2x, wing2y] = getEdgeWings(x1, y1, x2, y2);

    this.wing1 = new UndirectedEdge(
      ref,
      wing1Id,
      wing1x + "%",
      wing1y + "%",
      x + "%",
      y + "%",
      "visible"
    );
    this.wing2 = new UndirectedEdge(
      ref,
      wing2Id,
      wing2x + "%",
      wing2y + "%",
      x + "%",
      y + "%",
      "visible"
    );
  }
}

export default WeightedDirectedEdge;
