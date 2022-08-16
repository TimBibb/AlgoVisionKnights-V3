import React from "react";
import * as d3 from "d3";
import "../css/button.css";
import "./singlylinkedlist.css";
import "../css/messages.css";
import "../css/input.css";


import { ConsoleView } from "react-device-detect";
import { Component } from "react";
import UserInput  from "../../components/userInput/UserInput";

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

class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

export default class singlylinkedlist extends React.Component {
	constructor(props) {
		// Constructor for Visualization
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
	
		// Constructor for Linked List
		this.head = null;
		this.size = 0;

	}

	// --------------------------------LL functions-----------------------------
	initial() {
		var steps = [];
		var messages = [];

		this.setState({steps: steps});
		this.setState({messages: messages});
	}

	// insert element towards the end of the list
    insert(element, ids, length, stepTime) {
        // Functions for add
		var node = new Node(element);
		var current;
		
		if (this.head == null) this.head = node;
		else {
			current = this.head;
			while (current.next) current = current.next;
			current.next = node;
		}
		this.size++;
    }

	// remove element from the list
	remove(element, index, ids, length, stepTime) {
		var current = this.head;
		var previous = null;
	 
		// iterate over the list
		while (current != null) {
			// comparing element with current
			// element if found then remove the
			// and return true
			if (current.element === element) {
				if (previous == null) {
					this.head = current.next;
				} else {
					previous.next = current.next;
				}
				this.size--;
				return current.element;
			}
			previous = current;
			current = current.next;
		}
		return -1;
	}

	// insert at specific position
	insertAt(element, index, ids, length, stepTime) {
		if (index < 0 || index > this.size) return console.log("Please enter valid index");
		else {
			var node = new Node(element);
			var current, previous;

			current = this.head;

			if (index == 0) {
				node.next = this.head;
				this.head = node;
			} else {
				current = this.head;
				var it = 0;

				while (it < index) {
					it++;
					previous = current;
					current = current.next;
				}

				node.next = current;
				previous.next = node;
			}
			this.size++;
		}
	}

	// Remove element from specified position
	removeFrom(element, index, ids, length, stepTime) { 
		if (index < 0 || index >= this.size) return console.log("Please Enter a valid index");
    	else {
			var current, previous, it = 0;
			current = this.head;
			previous = current;
	
			// deleting first element
			if (index === 0) 
				this.head = current.next;
			else {
				// iterate over the list to the
				// position to removce an element
				while (it < index) {
					it++;
					previous = current;
					current = current.next;
				}
				// remove the element
				previous.next = current.next;
			}
		}
		this.size--;
        // return the remove element
        return current.element;
	}

	isEmpty() {
		return this.size == 0;
	}
	size_of_list() {
		console.log(this.size);
	}
	printList() {
		var curr = this.head;
    	var str = "";
    	while (curr) {
        	str += curr.element + " ";
        	curr = curr.next;
    	}
   	 	console.log(str);
	}

	// --------------------------------End of LL functions---------------------------

    // Initializes the data to be used in the visualizer
	dataInit(size) {
		var arr = [];
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
		d3.timeout(this.turnOffRunning, this.state.waitTime); // Calls function after wait time
	}

	// Step backward button
	backward() {
		console.log("BACKWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId - 1 < 0) return;
		var stepId = this.state.stepId - 1;
		this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
        console.log(this.state.steps[stepId]);
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Binary Search!</h1>" : this.state.messages[stepId - 1];
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.state.waitTime);
	}

	// For the play button
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

	handleInsert() {
		// Check if position input is 
		var posInput = document.getElementById("posVal").value;
		if (posInput && posInput.value) console.log("insertAt(val,pos)");
		else console.log("insert(val)");

		let input = document.getElementById("value").value;
		console.log("Searching for " + input + ".");
		console.log(`called search(${input})`);
		if (this.state.running) return;
		this.setState({running: true});
		this.run();
	}

	handleRemove() {
		var posInput = document.getElementById("posVal").value;
		if (posInput && posInput.value) console.log("removeFrom(val,pos)");
		else console.log("remove(val)");

		let input = document.getElementById("value").value;
		console.log("Searching for " + input + ".");
		console.log(`called search(${input})`);
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
			this.initial([...this.state.arr], this.state.arr[Math.floor(Math.random() * this.state.arr.length)], this.state.ids, this.state.size, this.state.stepTime);
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
					<button class="button" onClick={this.play}>Play</button>
		        	<button class="button" onClick={this.pause}>Pause</button>
		        	<button class="button" onClick={this.restart}>Restart</button>
		        	<button class="button" onClick={this.backward}>Step Backward</button>
		        	<button class="button" onClick={this.forward}>Step Forward</button>
				</div>
                <div class="center-screen">
                    <button class="button"id="insertBut" onClick={this.handleInsert}>Insert</button>
                    <input  type="number" id="inputBox" placeholder="Val"></input>
                    <input  type="number" id="inputBox" placeholder="Pos"></input>
					<button class="button"id="removeBut" onClick={this.handleRemove}>Remove</button>
                    <input  type="number" id="inputBox" placeholder="Val"></input>
                    <input  type="number" id="inputBox" placeholder="Pos"></input>
                </div>
				
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Singly Linked List!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}


