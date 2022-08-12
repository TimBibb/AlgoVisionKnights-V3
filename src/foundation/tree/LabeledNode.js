import UnlabeledNode from "./UnlabeledNode";
import Number from "../Number";

class LabeledNode {
  constructor(ref, circleId, textId, cx, cy, text, visibility, textColor) {
    this.circle = new UnlabeledNode(ref, circleId, cx, cy, visibility);
    this.text = new Number(ref, textId, cx, cy, text, textColor, visibility);
  }
}

export default LabeledNode;
