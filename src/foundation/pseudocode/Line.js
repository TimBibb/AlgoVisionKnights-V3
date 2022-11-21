import * as d3 from "d3";

class Line {
  constructor(text, lineNumber, pseudocodeSvg) {
    pseudocodeSvg
        .append("rect")
        .attr("id", "line" + lineNumber)
        .attr("x", 15)
        .attr("y", (30 * lineNumber) + 15)
        .attr("width", 370)
        .attr("height", 25)
        .attr("visibility", "hidden")
        .attr("fill", localStorage.getItem('accentColor'))
        .attr("rx", 5)

    pseudocodeSvg
        .append("text")
        .attr("id", "text"+lineNumber)
        .attr("x", 20)
        .attr("y", (30 * lineNumber) + 32)
        .attr("width", 370)
        .attr("height", 25)
        .attr("visibility", "visible")
        .text(text)
  }
}

export default Line;
