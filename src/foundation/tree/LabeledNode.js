import UnlabeledNode from "./UnlabeledNode";
import Number from "../Number";

class LabeledNode {
  constructor(ref, circleId, textId, cx, cy, text, visibility, textColor, level) {
    this.circleId = circleId;
    this.textId = textId;
    this.circle = new UnlabeledNode(ref, circleId, cx, cy, visibility, level);
    this.text = new Number(ref, textId, cx, cy, text, textColor, visibility, level);
  }
}

export default LabeledNode;
