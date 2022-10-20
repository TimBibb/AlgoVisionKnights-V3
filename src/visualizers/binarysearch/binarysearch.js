import React from "react";
import * as d3 from "d3";
import "../css/button.css";
import "./binarysearch.css";
import "../css/messages.css";
import "../css/input.css";
import Line from "../../foundation/pseudocode/Line";
import {Pseudocode, HighlightLineStep} from "../../components/pseudocode/Pseudocode";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";

// When nothing in the visualizer changes but you want to push a new message
// aka for alignment between messages and steps
class EmptyStep {
	forward(svg) {	}

	fastForward(svg) {}

	backward(svg) {}
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
class OldColor{
	constructor(id1, ids){
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg){
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#f08bb5");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#f08bb5");
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "gray");

		svg.selectAll(".qTxt").attr("visibility", "hidden");

		if (this.id1 !== this.id2) {
			svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		}
	}
}
class ColorFound{
	constructor(id1, ids){
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg){
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#FFD700");
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
export default class binarysearch extends React.Component {
	constructor(props) {
		super(props);

		// Initial state - changes to the state trigger componentDidUpdate
		this.state = {
			arr: [], // Elements to be sorted
			size: 10, // Number of elements to be in the array
			steps: [], // Step queue that will be used for making changes to the visualizer
			ids: [], // IDs of the group elements
			messages: [], // Message queue for the messages that will appear at the top
			running: false, // "Running" aka autoplay of going through the step and message queues
							// via the Play button
			stepId: 0, // ID of the current step
			stepTime: 4000, // Milliseconds for transition durations aka duration of each animation
			waitTime: 2000, // Milliseconds between each step
			target: -1
		};

		// Bindings
		this.ref = React.createRef(); // Where the visualizer will be
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
		this.recursiveSearch = this.recursiveSearch.bind(this)
	}
    search(arr, target, ids, length, stepTime){
		let pseudocodeArr = [];
        let steps = [];
        let messages = [];
        messages.push("<h1>Beginning Binary Search! Target: " + target + "</h1>");
        steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(1,this.props.lines));
		[steps, messages, pseudocodeArr] = this.recursiveSearch(arr, target, 0, arr.length - 1, ids, steps, messages, pseudocodeArr)
		this.setState({steps: steps});
		this.setState({messages: messages});
		this.props.handleCodeStepsChange(pseudocodeArr);
    }

	recursiveSearch (arr, target, start, end, ids, steps, messages, pseudocodeArr) {
		if (start > end) {
			messages.push("<h1>There are no more indexes to traverse, target " + target + " is not in the array</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(HighlightLineStep(2,this.props.lines));

			messages.push("<h1>There are no more indexes to traverse, target " + target + " is not in the array</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(HighlightLineStep(3,this.props.lines));
			return [steps, messages, pseudocodeArr];
		}

		let mid = Math.floor((start + end) / 2);
		messages.push("<h1> Find midpoint from index " + start + " to " + end + "</h1>");
		steps.push(new FirstColor(mid, ids));
		pseudocodeArr.push(new HighlightLineStep(4,this.props.lines));

		if(arr[mid] === target) {
			messages.push("<h1>Target " + target + " found at index [" + mid + "]</h1>");
			steps.push(new ColorFound(mid, ids));
			pseudocodeArr.push(new HighlightLineStep(5, this.props.lines))
			return [steps, messages, pseudocodeArr];
		}

		messages.push("<h1>" + target + " does NOT equal to " + arr[mid] + "</h1>");
		steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(4, this.props.lines))

		if (arr[mid] > target) {
			messages.push("<h1> If midpoint value " + arr[mid] + " is GREATER than " + target + ". Get next midpoint on the LEFT side of current midpoint</h1>");
			steps.push(new OldColor(mid,ids));
			pseudocodeArr.push(new HighlightLineStep(3, this.props.lines))

			return this.recursiveSearch(arr,  target, start, mid-1, ids, steps, messages, pseudocodeArr);
		}
		else {
			messages.push("<h1> If midpoint value " + arr[mid] + " is LESSER than " + target + ". Get next midpoint on the RIGHT side of current midpoint</h1>");
			steps.push(new OldColor(mid,ids));
			pseudocodeArr.push(new HighlightLineStep(2, this.props.lines))

			return this.recursiveSearch(arr,  target, mid+1, end, ids, steps, messages, pseudocodeArr);
		}
	
	}
	
    // Initializes the data to be used in the visualizer
	dataInit(size) {
		let arr = [];
		// fills arr with random numbers [15, 70]
		for (let i = 0; i < size; i++) arr[i] = Math.floor(Math.random() * 100);
		arr.sort(function (current,next) { return current - next});
		this.setState({
			arr: arr,
			target: arr[Math.floor(Math.random() * arr.length)]
		});
	}

	// Initializes the visualizer - returns the svg with a "visibility: hidden" attribute
	initialize(arr, size, ref) {
		const barWidth = 70;
		const barOffset = 5;
		const height = 50;
		
		// Used for scaling the bar heights in reference to the maximum value of the data array
		let yScale = d3.scaleLinear()
			.domain([0, d3.max(arr)])
			.range([0, height]);

		let svg = d3.select(ref)
			.append("svg")
				.attr("width", (size * (barWidth + barOffset)) + 100)
				.attr("height", height + 250);

		let bars = svg.selectAll(".bar")
					.data(arr)
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
				.attr("stroke", "rgb(255,255,255)")
				.attr("stroke-width", "2")
				.attr("y", height)
				.style("fill", "gray");

		bars.append("text")
				.text((d) => {
					//console.log("BAR " + d);
					return d;
				})
				.attr("y", (height + 35))
				.attr("x", (_, i) => {
					return i * (barWidth + barOffset) + (barWidth / 2) + 65;
				})
				.style("text-anchor", "middle")
				.style("font-size", "28px")
				.style("fill", "white");

		// Arrowhead for the pointers?
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

		// Pointers
		bars.append("path")
			.attr("d", (_, i) => {
				return d3.line()([[i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 185], 
				[i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 135]]);
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

		bars.append("text").text("Bubble")
			.attr("y", height + 215)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "bubbleTxt")
			.attr("id", (_, i) => {
				return "bubbleTxt" + i;
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
		// Triggers componentDidUpdate to run the main function for the steps and messages queues
		this.setState({ids: ids});
		svg.attr("visibility", "hidden");
        return svg;
	}

	turnOffRunning() {
		console.log("setting running to false");
		this.setState({running: false});
	}

	// Step forward button
	forward() {
		console.log("FORWARD CLICKED");
		if (this.state.running) return; // The user can't step forward while running via the play
										// button so as not to ruin the visualizer
		if (this.state.stepId === this.state.steps.length) return; // At the end of the step queue
		// Uses the step's fastForward function and displays associated message
		this.state.steps[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});
		d3.timeout(this.turnOffRunning, this.props.waitTime); // Calls function after wait time
	}

	// Step backward button
	backward() {
		console.log("BACKWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId - 1 < 0) return;
		let stepId = this.state.stepId - 1;
		this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
        console.log(this.state.steps[stepId]);
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Binary Search!</h1>" : this.state.messages[stepId - 1];
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.props.waitTime);
	}

	// For the play button
	run() {
		if (!this.state.running) return;
		if (this.state.stepId === this.state.steps.length) {
			this.setState({running: false});
			return;
		}
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg"));
		this.props.codeSteps[this.state.stepId].forward();
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});
		d3.timeout(this.run, this.props.waitTime);
	}

	play() {
		console.log("PLAY CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
		this.run();
	}

	handleSearch() {
		let input = document.getElementById("value").value;
		console.log("Searching for " + input + ".");
		// console.log(`called search(${x})`);
		// if (this.state.running) return;
		// this.setState({running: true});
		// this.run();
	}

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() { 
		console.log("RESTART CLICKED");
		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "<h1>Welcome to Binary Search!</h1>";
		this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
	}

	// First function to run
	componentDidMount() {
		this.dataInit(this.state.size);
	}

	//Calls functions depending on the change in state
	componentDidUpdate(prevProps, prevState) {
		// Component mounted and unsorted array created -> Initialize visualizer
		if (this.state.arr.length > prevState.arr.length) {
			console.log("Not searched");
			this.initialize(this.state.arr, this.state.size, this.ref.current);
		}
		// Visualizer initialized -> Sort copy of array and get steps
		else if (this.state.ids.length > prevState.ids.length) {
			d3.select(this.ref.current).select("svg").attr("visibility", "visible");
			// 30 -> will implement user input
			this.search([...this.state.arr], this.state.arr[Math.floor(Math.random() * this.state.arr.length)], this.state.ids, this.state.size, this.state.stepTime);
			console.log("ran visualizer");
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
					{/* <input type="number" id="value" class="inputValue"></input>
					<button class="button" onClick={this.handleSearch}>Search</button> */}
					<button class="button" onClick={this.play}>Play</button> 
		        	<button class="button" onClick={this.pause}>Pause</button>
		        	<button class="button" onClick={this.restart}>Restart</button>
		        	<button class="button" onClick={this.backward}>Step Backward</button>
		        	<button class="button" onClick={this.forward}>Step Forward</button>
					<SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
				</div>
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Binary Search!</h1></span></div>
				<div class="parent-svg">
					<div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"binarysearch"} lines={this.props.lines} 
								handleLinesChange={this.props.handleLinesChange} code={this.props.code} 
								handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} 
								handleCodeStepsChange={this.handleCodeStepsChange}>
					</Pseudocode>
				</div>
			</div>
		)
	}
}


