import React from "react";
import "./selectionsort.css";
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";

class EmptyStep {
	forward(svg) {
		
	}

	fastForward(svg) {

	}

	backward(svg) {

	}
}

class UncolorStep {
	constructor(id1, ids) {
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg) {
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "gray");
		svg.selectAll(".qTxt").attr("visibility", "hidden");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
		svg.selectAll(".qTxt").attr("visibility", "hidden");
		svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
	}
}

class SortedStep {
	constructor(id1, ids) {
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg) {
		var barWidth = 70;
		var barOffset = 30;
		var height = 700;
		var sorty = 50;
		var sortx = parseInt(svg.select("#" + this.ids[this.id1]).select("rect").attr("x"));

		if (this.id1 === 0) {

			svg.append("line")
				.style("stroke", "white")
				.style("stroke-width", 7)
				.attr("x1", barWidth + (barOffset / 2) + 65)
				.attr("y1", 0)
				.attr("x2", barWidth + (barOffset / 2) + 65)
				.attr("y2", height - 75)
				.attr("id", "divisor");

			svg.append("text").text("Sorted")
				.attr("y", sorty)
				.attr("x", sortx)
				.attr("id", "sortTxt")
				.style("text-anchor", "middle")
				.style("font-family", "Merriweather")
				.attr("font-weight", "bold")
				.style("font-size", "32px")
				.style("fill", "white");
		}
		else if (this.id1 === this.ids.length - 1) {
			svg.select("#divisor").attr("visibility", "hidden");
			svg.select("#sortTxt").attr("visibility", "hidden");

			svg.selectAll(".arrowpath").attr("visibility", "hidden");
			svg.selectAll(".smallestTxt").attr("visibility", "hidden");
		}
		else {
			var newDivx = parseInt(svg.select("#divisor").attr("x1")) + barWidth + barOffset;
			var newSortx = parseInt(svg.select("#sortTxt").attr("x")) + ((barWidth + barOffset) / 2);

			svg.select("#divisor")
					.attr("x1", newDivx)
					.attr("x2", newDivx);

			svg.select("#sortTxt").attr("x", newSortx);
		}

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#1ACA1E");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		var barWidth = 70;
		var barOffset = 30;

		if (this.id1 === 0) {
			svg.select("#divisor").remove();
			svg.select("#sortTxt").remove();
		}
		else if (this.id1 === this.ids.length - 1) {
			svg.select("#divisor").attr("visibility", "visible");
			svg.select("#sortTxt").attr("visibility", "visible");
		}
		else {
			var newDivx = parseInt(svg.select("#divisor").attr("x1")) - (barWidth + barOffset);
			var newSortx = parseInt(svg.select("#sortTxt").attr("x")) - ((barWidth + barOffset) / 2);

			svg.select("#divisor")
					.attr("x1", newDivx)
					.attr("x2", newDivx);

			svg.select("#sortTxt").attr("x", newSortx);
		}

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
		svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
		svg.select("#smallestTxt" + this.id1).attr("visibility", "visible");
	}
}

class ColorSwapStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
		this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "gray");
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#EF3F88");

		svg.selectAll(".qTxt").attr("visibility", "hidden");
        svg.selectAll("#qTxt" + this.id2).attr("visibility", "visible");
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

class SmallestSwapStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
		this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".smallestTxt").attr("visibility", "hidden");
		svg.selectAll(".qTxt").attr("visibility", "hidden");

		svg.select("#arrowpath" + this.id2).attr("visibility", "visible");
		svg.select("#smallestTxt" + this.id2).attr("visibility", "visible");

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "gray");
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#EF3F88");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".smallestTxt").attr("visibility", "hidden");
		svg.selectAll(".qTxt").attr("visibility", "hidden");

		if (this.id1 !== this.id2) {
			svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
			svg.select("#smallestTxt" + this.id1).attr("visibility", "visible");
			svg.selectAll("#qTxt" + this.id2).attr("visibility", "visible");
			svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#EF3F88");
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
		}
		else {
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "grey");
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

		svg
			.select("#" + this.ids[this.id1])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar1);

		svg
			.select("#" + this.ids[this.id1])
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt1);

		svg
			.select("#" + this.ids[this.id2])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar2)

		svg
			.select("#" + this.ids[this.id2])
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

		svg
			.select("#" + this.ids[this.id1])
			.select("rect")
				.attr("x", newxbar1);

		svg
			.select("#" + this.ids[this.id1])
			.select("text")
				.attr("x", newxtxt1);

		svg
			.select("#" + this.ids[this.id2])
			.select("rect")
				.attr("x", newxbar2)

		svg
			.select("#" + this.ids[this.id2])
			.select("text")
				.attr("x", newxtxt2);

		var bar1 = svg.select("#" + this.ids[this.id1]);

			bar1.attr("id", null);

		var bar2 = svg.select("#" + this.ids[this.id2]);

			bar2.attr("id", null);

			bar1.attr("id", this.ids[this.id2]);
			bar2.attr("id", this.ids[this.id1]);
	}

	forward(svg) {
		this.runSwap(svg);

		svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".smallestTxt").attr("visibility", "hidden");

		svg.select("#arrowpath" + this.id2).attr("visibility", "visible");
		svg.select("#smallestTxt" + this.id2).attr("visibility", "visible");
	}

	fastForward(svg) {
		this.fastSwap(svg);

		svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".smallestTxt").attr("visibility", "hidden");

		svg.select("#arrowpath" + this.id2).attr("visibility", "visible");
		svg.select("#smallestTxt" + this.id2).attr("visibility", "visible");
	}

	backward(svg) {
		this.fastSwap(svg);

		svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".smallestTxt").attr("visibility", "hidden");

		svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
		svg.select("#smallestTxt" + this.id1).attr("visibility", "visible");
	}
}

export default class SelectionSort extends React.Component {
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
			waitTime: 2000
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
			console.log(arr[i]);
		}
	}

	sort(arr, ids, size, stepTime)
	{
		var smallest;
		var i, j;
		var steps = [];
		var messages = [];

		messages.push("<h1>Beginning Selection Sort!</h1>");
		steps.push(new EmptyStep());

		for (i = 0; i < size-1; i++)
		{
			steps.push(new SmallestSwapStep(i, i, ids));
			smallest = i;

			messages.push("<h1>" + arr[smallest] + " is the current smallest.</h1>");

			for (j = i+1; j < size; j++)
			{
				steps.push(new ColorSwapStep(j, j, ids));
				messages.push("<h1>Move Search forward and check the next element.</h1>");

				if(arr[j] < arr[smallest])
				{
					steps.push(new EmptyStep());
					messages.push("<h1>" + arr[j] + " < " + arr[smallest] + "</h1>");

					steps.push(new SmallestSwapStep(smallest, j, ids));
					messages.push("<h1>" + arr[j] + " is the new smallest element.</h1>");

					smallest = j;
					messages.push("<h1>" + arr[smallest] + " is the new smallest element.</h1>");
					steps.push(new EmptyStep());
				}
				else
				{
					messages.push("<h1>" + arr[j] + " > " + arr[smallest] + "</h1>");
					steps.push(new EmptyStep());
					messages.push("<h1>Keep our current smallest.</h1>");
					steps.push(new UncolorStep(j, ids));
				}

			}

			messages.push("<h1>Reached the end of the array.</h1>");
			steps.push(new EmptyStep());

			messages.push("<h1>" + arr[smallest] + " is the smallest element.</h1>");
			steps.push(new EmptyStep());
			
			steps.push(new SwapStep(smallest, i, ids, stepTime));
			[arr[smallest], arr[i]] = [arr[i], arr[smallest]];
						
			messages.push("<h1>Swap our smallest element into index " + i + ".</h1>");

			// steps.push(new UncolorSmallestStep(smallest, ids));
			// messages.push("<h1>Index " + i + " has been sorted.</h1>");

			steps.push(new SortedStep(i, ids));
			messages.push("<h1>Index " + i + " has been sorted.</h1>");
		}

		steps.push(new SmallestSwapStep(i, i, ids));
		messages.push("<h1>There is only one index left so it is sorted.</h1>");

		steps.push(new SortedStep(i, ids));
		messages.push("<h1>There is only one index left so it is sorted.</h1>");

		messages.push("<h1>Finished Selection Sort!</h1>");
		steps.push(new EmptyStep());

		this.setState({steps: steps});
		this.setState({messages: messages});

		console.log(steps);
		console.log(messages);
	}

	dataInit(size) {
		var arr = [];

		// fills arr with random numbers [15, 70]
		for (let i = 0; i < size; i++)
		{
			arr[i] = 15 + Math.floor(Math.random() * 56);
		}

		this.setState({arr: arr});
	}

	initialize(arr, size, ref) {
		const barWidth = 70;
		const barOffset = 30;
		const height = 450;

		let yScale = d3.scaleLinear()
			.domain([0, d3.max(arr)])
			.range([0, height]);

		var svg = d3.select(ref)
			.append("svg")
				.attr("width", (size * (barWidth + barOffset)) + 100)
				.attr("height", height + 250);

		var bars = svg.selectAll(".bar")
					.data(arr)
					.enter().append("g")
					.attr("class", "bar")
					.attr("id", function (_, i) {
						return "g" + i;
					});
		
		bars.append("rect")
				.attr("width", barWidth)
				.attr("height", (d) => {
					return yScale(d);
				})
				.attr("x", (_, i) => {
					return (i * (barWidth + barOffset)) + 65;
				})
				.attr("y", (d) => {
					return (height + 100) - yScale(d);
				})
				.style("fill", "gray");

		bars.append("text")
				.text((d) => {
					console.log("BAR " + d);
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
				return d3.line()([[i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 185], [i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 135]]);
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

		bars.append("text").text("Smallest")
			.attr("y", height + 215)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "smallestTxt")
			.attr("id", (_, i) => {
				return "smallestTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		bars.append("text").text("?")
			.attr("y", height + 150)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "qTxt")
			.attr("id", (_, i) => {
				return "qTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "32px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		var ids = [];

		for (let i = 0; i < size; i++)
		{
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

		this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
		console.log(this.state.steps[stepId]);
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Selection Sort!</h1>" : this.state.messages[stepId - 1];
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
		this.run();
	}

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() {
		console.log("RESTART CLICKED");
        
        d3.select(this.ref.current).select("svg").remove();
		document.getElementById("message").innerHTML = "<h1>Welcome to Selection Sort!</h1>";

		this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
	}

	componentDidMount() {
		this.dataInit(this.state.size);
	}

	componentDidUpdate(prevProps, prevState) {
		// Component mounted and unsorted array created -> Initialize visualizer
		if (this.state.arr.length > prevState.arr.length) {
			console.log("Unsorted");
			this.printArray(this.state.arr, this.state.size);
			this.initialize(this.state.arr, this.state.size, this.ref.current);
		}
		// Visualizer initialized -> Sort copy of array and get steps
		else if (this.state.ids.length > prevState.ids.length) {
			d3.select(this.ref.current).select("svg").attr("visibility", "visible");
			this.sort([...this.state.arr], this.state.ids, this.state.size, this.state.stepTime);
		}
		// Part of restart -> Reinitialize with original array
        else if (this.state.steps.length !== prevState.steps.length && this.state.steps.length === 0) {
			console.log("Steps changed");
			var svg = this.initialize(this.state.arr, this.state.size, this.ref.current);
			svg.attr("visibility", "visible");
		}
		else if (this.state.running !== prevState.running && this.state.running === true)
		{
			this.run();
			console.log("We ran");
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
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Selection Sort!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}