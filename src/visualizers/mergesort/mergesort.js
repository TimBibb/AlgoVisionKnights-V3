import React from "react";
import "./mergesort.css";
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";
import { useEffect } from "react";
import { svg } from "d3";

class EmptyStep {
	forward(svg) {
		
	}

	fastForward(svg) {

	}

	backward(svg) {

	}
}

class SliceStep{
	constructor(id1, id2){
		this.id1 = id1;
		this.id2 = id2;

		//id1 is the left side of the array
		//id2 is the complete array
	}

	forward(svg) {
		this.changeLocation(svg);
	}
 
	changeLocation(svg){
		let newArraySize = this.id1.length; 
	
		for(let i = 0; i < newArraySize; i++){ 
			svg.select("#" + this.id2[i]).select("rect")
				.attr("width", 50) 
				.attr("height", 50); 
		}
	}

}

class ConvergeStep{
	constructor(id1, id2){
		this.id1 = id1;
		this.id2 = id2;

		//id1 is the left side of the array
		//id2 is the complete array
	}
	
	forward(svg) {
		this.converge(svg);
	}

	converge(svg){
		let newArraySize = this.id1.length;
	
		for(let i = 0; i < newArraySize; i++){
			svg.select("#" + this.id2[i]).select("rect")
				.attr("width", 100)
				.attr("height", 100);
		}
	}
}

class MoveStep{
	constructor(id){
		this.id = id;
	}

	forward(svg) {
		
	}

	/*translate(){
		return 
	}

	move(svg){
		svg.selectAll("rect").enter().append("rect")
		.attr("transform", translate)
		.attr("width", 20)
		.attr("height", 20)
	}*/
}

class FirstColor{
	constructor(id1, ids){
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg){
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "gray");

		svg.selectAll(".qTxt").attr("visibility", "hidden");

		if (this.id1 !== this.id2) {
			svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		}
	}
}

class ColorLowStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");

		// Change prevColor of old bar to whatever it's colored now
		svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color1);
		
		// Fill previous bar with whatever it was before blue (if blue)
		if (color1 === "rgb(100, 143, 255)") {
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		}

		svg.select("#lowTxt" + this.id1).attr("visibility", "hidden");
		svg.select("#lowTxt2_" + this.id1).attr("visibility", "hidden");
		svg.select("#arrowpath" + this.id1).attr("visibility", (prev1 !== "gray") ? "visible" : "hidden");

		svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);

		// As long as the new bar isn't sorted
		if (color2 !== "rgb(26, 202, 30)") {
			svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#648FFF");
			svg.select("#arrowpath" + this.id2).attr("visibility", "visible");

			if (color2 !== "gray")
			{
				svg.select("#lowTxt2_" + this.id2).attr("visibility", "visible");
			}
			else
			{
				svg.select("#lowTxt" + this.id2).attr("visibility", "visible");
			}
		}
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		// var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		// var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		// var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");
		// var prev2 = svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor");
		
		// svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		// svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color1);

		// svg.select("#" + this.ids[this.id2]).select("rect").style("fill", prev2);
		// svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);
	}
}

class MergeStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		// console.log(svg.select("#" + this.ids[this.id2]))
		if (svg.select("#" + this.ids[this.id1]).select("rect")[0] == null ||
			svg.select("#" + this.ids[this.id2]).select("rect")[0] == null) {
			return
		}
		var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");
		
		// Change prevColor of new bar to whatever it's colored now
		svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);

		// Fill previous bar with whatever it was before red (if red)
		if (color1 === "rgb(239, 63, 136)") {
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		}

		svg.select("#highTxt" + this.id1).attr("visibility", "hidden");
		svg.select("#highTxt2_" + this.id1).attr("visibility", "hidden");
		svg.select("#arrowpath" + this.id1).attr("visibility", (prev1 !== "gray") ? "visible" : "hidden");

		// As long as the new bar isn't sorted
		if (color2 !== "rgb(26, 202, 30)") {
			svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#EF3F88");
			svg.select("#arrowpath" + this.id2).attr("visibility", "visible");

			if (color2 !== "gray")
			{
				svg.select("#highTxt2_" + this.id2).attr("visibility", "visible");
			}
			else
			{
				svg.select("#highTxt" + this.id2).attr("visibility", "visible");
			}
		}
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		// var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		// var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		// var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");
		// var prev2 = svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor");
		
		// svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		// svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color1);

		// svg.select("#" + this.ids[this.id2]).select("rect").style("fill", prev2);
		// svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);
	}
}

class ColorPivotStep {
	constructor(id1, ids) {
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg) {
		var color = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");

		svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color);
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#FFCE36");
		svg.select("#pivTxt" + this.id1).attr("visibility", "visible");
		svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		 var prevColor = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");

		 svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prevColor);
		 svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", "gray");
	}
}

class PartitionStep {
	constructor(id1, id2, ids, stepTime) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
		this.stepTime = stepTime;
	}

	/*for (int i = 0; i < left; i++) {
		var barx = select("#"+i).select("rect").attr("x") - 20;
		var textx = select("#"+i).select("text").attr("x") - 20;
	
		select("#"+i).select("rect").attr("x", barx);
		select("#"+i).select("text").attr("x", text);
	}
	
	for (int i = right; right < ids.length; i++) {
		var barx = select("#"+i).select("rect").attr("x") + 20;
		var textx = select("#"+i).select("text").attr("x") + 20;
	
		select("#"+i).select("rect").attr("x", barx);
		select("#"+i).select("text").attr("x", text);
	}*/

	forward(svg) {
        for (var i = 0; i <= this.id1; i++) {
            var newxbar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("x")) - 20;
            var newxtxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("x")) - 20;

            svg.select("#" + this.ids[i]).select("rect").attr("x", newxbar);
            svg.select("#" + this.ids[i]).select("text").attr("x", newxtxt);
        }

		for(var i = this.id2; i < this.ids.length; i++){
			var newxbar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("x")) + 20;
            var newxtxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("x")) + 20;

            svg.select("#" + this.ids[i]).select("rect").attr("x", newxbar);
            svg.select("#" + this.ids[i]).select("text").attr("x", newxtxt);
		}
	}

	fastForward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) - 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}

	backward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) + 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) + 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}
}

class UnpartitionStep{
	constructor(id1, id2, ids, stepTime) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
		this.stepTime = stepTime;
	}

    forward(svg) {
        if (this.id2 !== this.ids.length - 1) {
            svg.select("#divisor").attr("visibility", "visible");
            svg.select("#sortTxt").attr("visibility", "visible");
        }

        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) + 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) + 100;
            svg.select("#" + this.ids[i]).select("rect").transition().duration(this.stepTime).attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").transition().duration(this.stepTime).attr("y", newytxt);
        }
	}

	fastForward(svg) {
        if (this.id2 !== this.ids.length - 1) {
            svg.select("#divisor").attr("visibility", "visible");
            svg.select("#sortTxt").attr("visibility", "visible");
        }

        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) + 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) + 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}

	backward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) - 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}
}

class SortedStep {
	constructor(id1, ids, stepTime) {
		this.id1 = id1;
		this.ids = ids;
		this.stepTime = stepTime;
	}

	forward(svg) {

        svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".ptrTxt").attr("visibility", "hidden");

		var prev = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");

        svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#1ACA1E");
		svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", prev);

		for (var i = 0; i < this.ids.length; i++) {
			if (i === this.id1)
				continue;

			var color = svg.select("#" + this.ids[i]).select("rect").style("fill");

			if (color !== "rgb(26, 202, 30)") {
				svg.select("#" + this.ids[i]).select("rect").attr("prevColor", color);
				svg.select("#" + this.ids[i]).select("rect").style("fill", "gray");
			}
		}
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
         svg.selectAll(".arrowpath").attr("visibility", "hidden");
		 svg.selectAll(".insertTxt").attr("visibility", "hidden");

         for (var i = 0; i < this.ids.length; i++) {
		 	var color = svg.select("#" + this.ids[i]).select("rect").attr("prevColor");

		 	svg.select("#" + this.ids[i]).select("rect").style("fill", color);
		 }
	}
}

class SwapStep {
	constructor(id1, id2, ids, stepTime) {
		this.id1 = id1;
		this.id2 = id2;
		this.ids = ids;
		this.stepTime = stepTime;
	}

	runSwap(svg) {

		if (this.id1 === this.id2) {
			return;
		}

		var newxbar1 = svg.select("#" + this.ids[this.id2]).select("rect").attr("x");
		var newxbar2 = svg.select("#" + this.ids[this.id1]).select("rect").attr("x");

		var newxtxt1 = svg.select("#" + this.ids[this.id2]).select("text").attr("x");
		var newxtxt2 = svg.select("#" + this.ids[this.id1]).select("text").attr("x");

		console.log("SWAPPING.");

		svg.select("#" + this.ids[this.id1])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar1);

		svg.select("#" + this.ids[this.id1])
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt1);

		svg.select("#" + this.ids[this.id2])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar2);

		svg.select("#" + this.ids[this.id2])
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt2);

		var bar1 = svg.select("#" + this.ids[this.id1]);

			bar1.attr("id", null);

		var bar2 = svg.select("#" + this.ids[this.id2]);

			bar2.attr("id", null);

			bar1.attr("id", this.ids[this.id2]);
			bar2.attr("id", this.ids[this.id1]);

		var newColor2 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var newColor1 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", newColor1);
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", newColor2);
	}

	fastSwap(svg) {

		if (this.id1 === this.id2) {
			return;
		}

		var newxbar1 = svg.select("#" + this.ids[this.id2]).select("rect").attr("x");
		var newxbar2 = svg.select("#" + this.ids[this.id1]).select("rect").attr("x");

		var newxtxt1 = svg.select("#" + this.ids[this.id2]).select("text").attr("x");
		var newxtxt2 = svg.select("#" + this.ids[this.id1]).select("text").attr("x");

		console.log("SWAPPING.");

		svg.select("#" + this.ids[this.id1])
			.select("rect")
				.attr("x", newxbar1);

		svg.select("#" + this.ids[this.id1])
			.select("text")
				.attr("x", newxtxt1);

		svg.select("#" + this.ids[this.id2])
			.select("rect")
				.attr("x", newxbar2);

		svg.select("#" + this.ids[this.id2])
			.select("text")
				.attr("x", newxtxt2);

		var bar1 = svg.select("#" + this.ids[this.id1]);

			bar1.attr("id", null);

		var bar2 = svg.select("#" + this.ids[this.id2]);

			bar2.attr("id", null);

			bar1.attr("id", this.ids[this.id2]);
			bar2.attr("id", this.ids[this.id1]);

		var newColor2 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var newColor1 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", newColor1);
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", newColor2);
	}

	forward(svg) {
		this.runSwap(svg);
	}

	fastForward(svg) {
		this.fastSwap(svg);
	}

	backward(svg) {
		this.fastSwap(svg);
	}
}
export default class MergeSort extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			arr: [],
			size: 10,
			steps: [],
			ids: [],
			messages: [],
			running: false,
			stepId: 0,
			stepTime: 300,
			waitTime: (9 * 2000) / 8
		};

		this.ref = React.createRef();

		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
	}

	printArray(arr, size) {
		for (let i = 0; i < size; i++)
		{
			// console.log(arr[i]);
		}
	}

	//sliceStep - cuts the array in half at designated location (working)
	//convergeStep - brings the cut arrays back together (not tested)
	//moveStep - not implemented
	//FirstColor - lights up the first element in the array (working)
	//ColorLowStep - changes colors of selected elements (not tested)
	//MergeStep - brings arrays back together (not tested)
	//ColorPivotStep
	//PartitionStep - split (not tested)
	//UnpartitionStep - bring together (not tested)
	//SortedStep
	//SwapStep


	sort(arr, ids, stepTime) {
		let steps = [];
		let messages = [];
		
		[steps, messages] = this.sortRecursive(arr, ids, steps, messages, stepTime);

		this.setState({steps: steps, messages: messages})
	}

	sortRecursive(arr, ids, steps, messages, stepTime) {
		const half = arr.length / 2;
		
		console.log(ids);

		// console.log(arr.length);
		// console.log("Running Sort");

		if (steps.length == 0) {
			messages.push("<h1>Beginning Merge Sort!</h1>");
			steps.push(new EmptyStep());
	
			messages.push("<h1>Beginning Merge Sort!</h1>");
			steps.push(new FirstColor(0, ids));
		}

		//console.log("Pushed First Color Step");
	
		// Base case or terminating case
		if(arr.length < 2){
			steps.push(new EmptyStep());
			messages.push("<h1>Array Too Small. Merge Sort Cannot Continue.</h1>");
			// console.log("Terminated");
			//console.log(arr);
			return arr; 
		}
		
		const left = arr.splice(0, half);
		console.log(left);
		console.log(arr);

		messages.push("<h1>Slicing Array</h1>");
		// console.log("Slicing " + left + " from " + arr);
		steps.push(new PartitionStep(left.length-1, left.length, ids, stepTime));
	
		messages.push("<h1>Performing Merge Sort</h1>");
		steps.push(new EmptyStep())

		// this.setState({ steps: steps });
		// this.setState({ messages: messages });

		console.log(steps);

		this.merge(this.sortRecursive(left, ids, steps, messages),this.sortRecursive(arr, ids, steps, messages), steps, messages);
		return [steps, messages]
	}

	merge(left, right, steps, messages) {
		let arr = [];
		// let steps = [];
		// let messages = [];
		// Break out of loop if any one of the array gets empty
	
		messages.push("<h1>Comparing Sizes of Left and Right Array</h1>");
		steps.push(new EmptyStep())
		while (left.length && right.length) {
			// Pick the smaller among the smallest element of left and right sub arrays 
			if (left[0] < right[0]) {
				messages.push("<h1>Left Array is Smaller than Right</h1>");
				steps.push(new EmptyStep())

				arr.push(left.shift());
			} else {
				messages.push("<h1>Left Array is Larger or Equal to the Right</h1>");
				steps.push(new EmptyStep())

				arr.push(right.shift()); 
			}
		}
		
		// this.setState({ steps: steps });
		// this.setState({ messages: messages });

		// Concatenating the leftover elements
		// (in case we didn't go through the entire left or right array)
		steps.push(new MergeStep(left, right, arr));
		messages.push("Merging the Arrays");
		// console.log(arr);
		// return [ ...arr, ...left, ...right ];
	}

	dataInit() {
		var arr = [];

		// fills arr with random numbers [15, 70]
		for (let i = 0; i < this.state.size; i++)
		{
			arr[i] = 15 + Math.floor(Math.random() * 56);
		}

		console.log("Unsorted");
		this.printArray(arr, this.state.size);

		this.setState({arr: arr});
	}

	initialize() {
		const barWidth = 100;
		const barOffset = 1;
		const height = 100;

		let yScale = d3.scaleLinear()
			.domain([0, d3.max(this.state.arr)])
			.range([0, height]);

		var svg = d3.select(this.ref.current)
			.append("svg")
				.attr("width", (this.state.size * (barWidth + barOffset)) + 100)
				.attr("height", height + 250);

		var bars = svg.selectAll(".bar")
					.data(this.state.arr)
					.enter().append("g")
					.attr("class", "bar")
					.attr("id", function (_, i) {
						return "g" + i;
					});
		
		bars.append("rect")
				.attr("width", barWidth)
				.attr("height", height)
				.attr("x", (_, i) => {
					return (i * (barWidth + barOffset)) + 65;
				})
				.attr("y", height)
				.attr("stroke", "rgb(255,255,255)")
				.attr("stroke-width", "2")
				.style("fill", "gray");

		bars.append("text")
				.text((d) => {
					return d;
				})
				.attr("y", (height + 100) - 15)
				.attr("x", (_, i) => {
					return i * (barWidth + barOffset) + (barWidth / 2) + 65;
				})
				.style("text-anchor", "middle")
				.style("font-size", "28px")
				.style("fill", "white");

		bars.append("defs")
			.append("marker")
				.attr("id", "arrow")
				.attr("viewBox", [0, 0, 50, 50])
				.attr("refX", 25)
				.attr("refY", 25)
				.attr("markerWidth", 50)
				.attr("markerHeight", 50)
				.attr("orient", "auto-start-reverse")
			.append("path")
				.attr("d", d3.line()([[0, 0], [0, 50], [50, 25]]))
				.attr("fill", "white");

		bars.append("path")
			.attr("d", (_, i) => {
				return d3.line()([[i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 85], [i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 35]]);
			})
			.attr("stroke-width", 1)
			.attr("stroke", "white")
			.attr("marker-end", "url(#arrow)")
			.attr("fill", "white")
			.attr("class", "arrowpath")
			.attr("id", (_, i) => {
				return "arrowpath" + i;
			})
			.attr("visibility", "hidden");

		bars.append("text").text("Low")
			.attr("y", height + 115)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "lowTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		bars.append("text").text("Low")
			.attr("y", height + 145)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "lowTxt2_" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

        bars.append("text").text("High")
			.attr("y", height + 115)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "highTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		bars.append("text").text("High")
			.attr("y", height + 145)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "highTxt2_" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

        bars.append("text").text("Pivot")
			.attr("y", height + 115)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "pivTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		var ids = [];

		for (let i = 0; i < this.state.size; i++)
		{
			//may need to remove g 
			ids.push("g" + i);
		}

		this.setState({ids: ids});

		svg.attr("visibility", "hidden");

		return svg;
	}

	turnOffRunning() {
		this.setState({running: false});
	}

	forward() {
		console.log("FORWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId === this.state.steps.length) return;
		
		this.state.steps[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg"));
		console.log(this.state.steps[this.state.stepId]);
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});

		d3.timeout(this.turnOffRunning, this.state.waitTime);
	}

	backward() {
		console.log("BACKWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId - 1 < 0) return;

		var stepId = this.state.stepId - 1;

		// Easy backward functions so just run that
		if (this.state.steps[stepId] instanceof EmptyStep || this.state.steps[stepId] instanceof PartitionStep ||
			this.state.steps[stepId] instanceof UnpartitionStep || this.state.steps[stepId] instanceof SwapStep) {
				console.log(this.state.steps[stepId]);
				this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
		}
		else { // Or make a new svg and run steps up until step before
			d3.select(this.ref.current).select("svg").remove();

			var svg = this.initialize();

			for (var i = 0; i < stepId; i++) {
				this.state.steps[i].fastForward(svg);
				console.log(this.state.steps[i]);
			}

			svg.attr("visibility", "visible");
		}

		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Merge Sort!</h1>" : this.state.messages[stepId - 1];
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.state.waitTime);
	}

	run() {
		if (!this.state.running) return;
		if (this.state.stepId === this.state.steps.length) {
			this.setState({running: false});
			return;
		}
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});
		d3.timeout(this.run, this.state.waitTime);
	}

	play() {
		console.log("PLAY CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
		this.run(d3.select(this.ref.current).select("svg"));
	}

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() {
		console.log("RESTART CLICKED");

		var svg = d3.select(this.ref.current).select("svg");
		console.log(svg);

        svg.remove();
		console.log("Removed og");

        document.getElementById("message").innerHTML = "<h1>Welcome to Merge Sort!</h1>";

		console.log("Reset state");
		this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
	}

	componentDidMount() {
		this.dataInit();
	}

	componentDidUpdate(prevProps, prevState) {
			var svg = d3.select(this.ref.current).select("svg");

		// Data array changed in dataInit -> Make visual
		if (this.state.arr.length > prevState.arr.length) {
			svg = this.initialize();
			svg.attr("visibility", "visible");
		}
		// IDs array changed in initialize -> sort copy of array to get steps and messages
		else if (this.state.ids.length > prevState.ids.length) {
			console.log("We initialized. Time to sort.");
			this.sort([...this.state.arr], this.state.ids, this.state.stepTime);
			console.log("ran visualizer");
		}
		// Running changed
		else if (this.state.running !== prevState.running)
		{
			this.run(svg);
			console.log("We ran");
		}
		// For reset
        else if (this.state.steps.length !== prevState.steps.length && this.state.steps.length === 0) {
			console.log("We're restarting");
			svg = this.initialize();
			console.log("Made it out");
			svg.attr("visibility", "visible");
			console.log("All good");
		}
	}

	render() {
		return (
			<div>
				<div class="center-screen" id="banner">
					<button class="button" onClick={this.play}>Play</button>
					<button class="button" onClick={this.pause}>Pause</button>
					<button class="button" onClick={this.restart}>Restart</button>
					<button class="button" onClick={this.backward}>Step Backward</button>
					<button class="button" onClick={this.forward}>Step Forward</button>
				</div>
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Merge Sort!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}