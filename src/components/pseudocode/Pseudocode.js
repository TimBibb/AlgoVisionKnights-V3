import React from 'react';
import { map } from './PseudocodeMap';
import * as d3 from "d3";
import Line from "../../foundation/pseudocode/Line";
import './Pseudocode.css';

class HighlightLineStep {
	// pass in the line number you want to highlight
	// pass in the lines array
	// it will unhighlight every line except the specific line you want to highlight
	constructor(lineNum, lines) {
		this.lineNum = lineNum
		//  lines array that holds every line
		this.lines = lines
	}

	forward() {
		// var count = 0;
		// for (var line in this.lines) {
		// 	pseudocodeSvg.select("#line" + count).attr("visibility", "hidden");
		// }
        if (d3.select("#pseudoSvg").empty()) return;
        console.log("this.lines = " + this.lines)
		for (let i = 0; i < this.lines.length; i++) {
			d3.select("#pseudoSvg").select("#line" + i).attr("visibility", "hidden");
		}
		d3.select("#pseudoSvg").select("#line" + this.lineNum).attr("visibility", "visible");
	}

	fastForward() {
		this.forward();
	}
}

class Pseudocode extends React.Component {
    constructor (props) {
        super(props)
        console.log("props" + props);
        this.state = {
            svg: {}
        }
        this.algorithm = props.algorithm
        this.getLines = this.getLines.bind(this);
    }

    getLines(algorithm) {
        if (map[algorithm]) {
            // this.props.setPseudoValues({
            //     code: map[algorithm]
            // })
            this.props.handleCodeChange(
             map[algorithm]
            )
            // this.setState({code: map[algorithm]});
            return map[algorithm]
        } else {
            console.log("No algorithm with name " + algorithm);
        }
    }

    // pushHighlightLineStep(line) {
    //     if (line >= 0 && line < this.props.lines.length) {
            
    //     }
    //     this.props.setPseudoValues({
    //         steps: {...new HighlightLineStep(line, this.state.svg)}
    //     })
    //     this.state.steps.push(new HighlightLineStep(line, this.state.svg))
    // }

    componentDidMount() {
        let code = this.getLines(this.algorithm)
        let pseudocodeSvg = d3.select("#pseudocodeDiv")
			.append("svg")
			.attr("width", "100%")
			.attr("height", 500)
			.attr("id", "pseudoSvg");

        this.setState({svg: pseudocodeSvg})
        let lines = []
        for (let line in code) {
            lines.push(new Line(code[line], line, pseudocodeSvg));
            
            // this.props.setLines([...this.props.lines, new Line(code[line], line, pseudocodeSvg)])
            // this.props.setPseudoValues({
            //     lines: [...this.props.pseudoValues.lines, new Line(code[line], line, pseudocodeSvg)],
            //     code: [1,2,3]
            // })
            console.log(this.props.lines)
            // this.state.lines.push(new Line(code[line], line, pseudocodeSvg));
        }

        pseudocodeSvg.attr("height", lines.length*30 + 15)
        console.log("lines height", lines.length*30)
        this.setState({svg: pseudocodeSvg})

        this.props.handleLinesChange(
            lines
        )
    }

    componentDidUpdate() {
        console.log(this.props);
    }

    render() {
        return <div id="pseudocodeDiv" class="right-screen"></div>
    }
}

export {HighlightLineStep, Pseudocode}