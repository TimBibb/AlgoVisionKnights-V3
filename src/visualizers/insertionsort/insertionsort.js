import React from "react";
import "./insertionsort.css";
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

class PartitionStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) - 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}

	fastForward(svg) {
		this.forward(svg);
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

class UnpartitionStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
	}

    forward(svg) {
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

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
        svg.select("#divisor").attr("visibility", "hidden");
        svg.select("#sortTxt").attr("visibility", "hidden");

        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) - 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}
}

class PartSortedStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
		this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		var barWidth = 70;
		var barOffset = 30;
        var height = 700;
		var sorty = 150;
		var sortx = parseInt(svg.select("#" + this.ids[this.id1]).select("rect").attr("x"));

		if (this.id2 === 0) {
            svg.append("line")
				.style("stroke", "white")
				.style("stroke-width", 7)
				.attr("x1", barWidth + (barOffset / 2) + 65)
				.attr("y1", 100)
				.attr("x2", barWidth + (barOffset / 2) + 65)
				.attr("y2", height + 50)
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
		}

        svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".insertTxt").attr("visibility", "hidden");

        for (var i = this.id1; i <= this.id2; i++)
		    svg.select("#" + this.ids[i]).select("rect").style("fill", "#1ACA1E");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		if (this.id2 === 0) {
            svg.select("#divisor").remove();
			svg.select("#sortTxt").remove();
		}

		for (var i = this.id1 + 1; i < this.id2; i++) {
			svg.select("#" + this.ids[i]).select("rect").style("fill", "grey");
		}

		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#EF3F88");

		if (this.id1 === 0) {
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "grey");
		}
	}
}

class SortedStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
		this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		var barWidth = 70;
		var barOffset = 30;
        var height = 700;
		var sorty = 70;
		var sortx = parseInt(svg.select("#" + this.ids[this.id1]).select("rect").attr("x"));

		if (this.id2 === 0) {
            svg.append("line")
				.style("stroke", "white")
				.style("stroke-width", 7)
				.attr("x1", barWidth + (barOffset / 2) + 65)
				.attr("y1", 25)
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
		}
		else {
			console.log("AFTER " + this.id2);
			var newDivx = parseInt(svg.select("#" + this.ids[this.id2]).select("rect").attr("x")) + barWidth + (barOffset / 2);
			var newSortx = (parseInt(svg.select("#" + this.ids[this.id2]).select("rect").attr("x")) + barOffset) / 2;

			svg.select("#divisor")
				.attr("x1", newDivx)
				.attr("x2", newDivx);

			svg.select("#sortTxt").attr("x", newSortx);
		}

        svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".insertTxt").attr("visibility", "hidden");

        for (var i = this.id1; i <= this.id2; i++)
		    svg.select("#" + this.ids[i]).select("rect").style("fill", "#1ACA1E");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		var barOffset = 30;

		if (this.id2 === 0) {
            svg.select("#divisor").remove();
			svg.select("#sortTxt").remove();
		}
		else {
			console.log("BEFORE " + this.id2);
			var newDivx = parseInt(svg.select("#" + this.ids[this.id2]).select("rect").attr("x")) - (barOffset / 2);
			var newSortx = (parseInt(svg.select("#" + this.ids[this.id2]).select("rect").attr("x")) - barOffset) / 2;

			if (this.id2 === 1) {
				newSortx = parseInt(svg.select("#" + this.ids[0]).select("rect").attr("x"));
			}

			svg.select("#divisor")
				.attr("x1", newDivx)
				.attr("x2", newDivx);

			svg.select("#sortTxt").attr("x", newSortx);
		}

        svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".insertTxt").attr("visibility", "hidden");

        if (this.id2 !== 0) {
            svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
		    svg.select("#insertTxt" + this.id1).attr("visibility", "visible");
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
        }

		for (var i = this.id1 + 1; i <= this.id2; i++)
		    	svg.select("#" + this.ids[i]).select("rect").style("fill", "grey");

		if (this.id2 === 0) {
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "grey");
		}
	}
}

class InsertSwapStep {
	constructor(id1, ids) {
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg) {
        svg.select("#divisor").attr("visibility", "hidden");
		svg.select("#sortTxt").attr("visibility", "hidden");
		svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".insertTxt").attr("visibility", "hidden");        

		svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
		svg.select("#insertTxt" + this.id1).attr("visibility", "visible");
        
        for (var i = 0; i < this.id1; i++) {
            svg.select("#" + this.ids[i]).select("rect").style("fill", "gray");
        }

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
	}
	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
        svg.select("#divisor").attr("visibility", "visible");
		svg.select("#sortTxt").attr("visibility", "visible");
		svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".insertTxt").attr("visibility", "hidden");

		for (var i = 0; i < this.id1; i++) {
            svg.select("#" + this.ids[i]).select("rect").style("fill", "#1ACA1E");
        }

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "gray");
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
		svg.selectAll(".insertTxt").attr("visibility", "hidden");

		svg.select("#arrowpath" + this.id2).attr("visibility", "visible");
		svg.select("#insertTxt" + this.id2).attr("visibility", "visible");
	}

	fastForward(svg) {
		this.fastSwap(svg);

        svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".insertTxt").attr("visibility", "hidden");

		svg.select("#arrowpath" + this.id2).attr("visibility", "visible");
		svg.select("#insertTxt" + this.id2).attr("visibility", "visible");
	}

	backward(svg) {
		this.fastSwap(svg);

        svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".insertTxt").attr("visibility", "hidden");

		svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
		svg.select("#insertTxt" + this.id1).attr("visibility", "visible");
	}
}

export default class InsertionSort extends React.Component {
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
		var steps = [];
		var messages = [];
        var i, j;

		messages.push("<h1>Beginning Insertion Sort!</h1>");
		steps.push(new EmptyStep());

        messages.push("<h1>Index 0 is a one element array, and is therefore sorted.</h1>");
		steps.push(new SortedStep(0, 0, ids));
        
        for(i = 1; i < size; i++)
        {
            messages.push("<h1>Selecting our next insertion index.</h1>");
		    steps.push(new InsertSwapStep(i, ids));

            messages.push("<h1>Pull elements out of our " + (i+1) + " index array and sort them (left to right).</h1>");
		    steps.push(new PartitionStep(0, i, ids));
            
            for(j = i-1; j >= 0; j--)
            {
                if(arr[j] > arr[j+1])
                {
                    messages.push("<h1>" + arr[j] + " > " + arr[j+1] + "</h1>");
                    steps.push(new EmptyStep());
					messages.push("<h1>Scooch " + arr[j] + " to the right.</h1>");
                    steps.push(new SwapStep(j+1, j, ids, stepTime));
                    [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
                }
                else
                {
					messages.push("<h1>" + arr[j] + " < " + arr[j+1] + "</h1>");
					steps.push(new EmptyStep());
                    messages.push("<h1>Insert is in its sorted spot.</h1>");
		            steps.push(new PartSortedStep(0, j + 1, ids));

                    break;
                }
            }
            messages.push("<h1>Indices 0 through " + i + " are in sorted order.</h1>");
		    steps.push(new SortedStep(j + 1, i, ids));

            messages.push("<h1>Indices 0 through " + i + " are in sorted order.</h1>");
		    steps.push(new UnpartitionStep(0, i, ids));
        }

		messages.push("<h1>Finished Insertion Sort!</h1>");
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
		const height = 500;

		let yScale = d3.scaleLinear()
			.domain([0, d3.max(arr)])
			.range([0, height]);

		var svg = d3.select(ref)
			.append("svg")
				.attr("width", (size * (barWidth + barOffset)) + 100)
				.attr("height", height + 300);

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
					return (height + 75) - yScale(d);
				})
				.style("fill", "gray");

		bars.append("text")
				.text((d) => {
					console.log("BAR " + d);
					return d;
				})
				.attr("y", (height + 75) - 15)
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
				return d3.line()([[i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 165], [i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 115]]);
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

		bars.append("text").text("Insert")
			.attr("y", height + 190)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "insertTxt")
			.attr("id", (_, i) => {
				return "insertTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
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
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Insertion Sort!</h1>" : this.state.messages[stepId - 1];
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
        document.getElementById("message").innerHTML = "<h1>Welcome to Insertion Sort!</h1>";

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
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Insertion Sort!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}