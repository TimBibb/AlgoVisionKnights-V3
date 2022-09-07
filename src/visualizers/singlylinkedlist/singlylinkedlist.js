import React from "react";
import * as d3 from "d3";
import "../css/button.css";
import "./singlylinkedlist.css";
import "../css/messages.css";
import "../css/input.css";


import { ConsoleView } from "react-device-detect";
import { Component } from "react";
import UserInput from "../../components/userInput/UserInput";
import { svg } from "d3";

class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}
// When nothing in the visualizer changes but you want to push a new message
// aka for alignment between messages and steps
class EmptyStep {
	forward(svg) { }

	fastForward(svg) { }

	backward(svg) { }
}

class AddNodeStep {
	constructor(element,id1,ids) {
		this.element = element;
		this.ids = ids;
		this.id1 = id1;
	}
	forward(svg) {
		svg.select("#" + this.ids[this.id1]).selectAll("rect, text, line, #arrow").attr("visibility", "visible");
		svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
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
class RemoveNodeStep {
	constructor(id1,ids) {
		this.ids = ids;
		this.id1 = id1;
	}
	forward(svg) {
		svg.select("#" + this.ids[this.id1]).selectAll("rect, text, line").attr("visibility", "hidden");
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


export default class singlylinkedlist extends React.Component {
	constructor(props) {
		// Constructor for Visualization
		super(props);
		this.state = {
			rendered: false
		};
		this.steps = [];
		this.ids = [];
		this.messages = [];
		this.running = false;
		this.stepId = 0;
		this.stepTime = 4000;
		this.waitTime = 2000;
		this.head = null;

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
		this.flag = false;
		//this.isRunningCheck = this.isRunningCheck.bind(this);
		this.handleInsert = this.handleInsert.bind(this);
		this.handleRemove = this.handleRemove.bind(this);

	}

	simulation() {
		this.messages.push("<h1>Beginning Singly Linked List!</h1>");
		this.steps.push(new EmptyStep());
		let num = [33, 67, 22, 44, 32, 12, 30, 42];

		for (let i = 0; i < 8; i++) {
			//let rand = Math.floor(Math.random() * 100);
			this.messages.push("<h1>Inserting " + num[i] + " into the Linked List.</h1>");
			this.steps.push(new AddNodeStep(num[i],i,this.ids));
			this.insert(num[i]);
		}
		for (let k = 0; k < 8; k++) {
			this.messages.push("<h1>Removing " + num[k] + " from the linked list</h1>");
			this.steps.push(new RemoveNodeStep(k,this.ids));
			this.remove(num[k]);
		}
	}

	// insert element towards the end of the list
	insert(element) {
		// Functions for add
		let node = new Node(element);
		let current;
		//this.steps.push(new AddNodeStep(element))
		if (this.head == null)  {
			this.head = node;
			this.messages.push("<h1>Inserting " + element + " into the Linked List.</h1>");
			this.steps.push(new AddNodeStep(element,0,this.ids));
			console.log(element)
		}
		else {
			current = this.head;
			while (current.next) current = current.next;
			current.next = node;
		}
		this.size++;
		this.printList();
		this.setState({ steps: this.state.steps });
		this.setState({ messages: this.state.messages });
	}

	// remove next occurent element from the list
	remove(element) {
		let current = this.head;
		let previous = null;

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
				return;
			}
			previous = current;
			current = current.next;
		}
		this.printList();
		this.setState({ steps: this.state.steps });
		this.setState({ messages: this.state.messages });
		console.log("No value found");
	}


	isEmpty() {
		return this.state.size === 0;
	}
	size_of_list() {
		console.log(this.state.size);
	}
	printList() {
		let curr = this.head;
		let str = "";
		while (curr) {
			str += curr.element + " ";
			curr = curr.next;
		}
		console.log(str);
	}


	// Initializes the visualizer - returns the svg with a "visibility: hidden" attribute
	initialize() {
		const width = 1300;
		const height = 300;
		const barHeight = 50;
		const barWidth = 90;
		const barOffset = 5;

		let svg = d3.select(this.ref.current)
			.append("svg")
			.attr("width", (10 * (barWidth + barOffset)) + 200)
			.attr("height", height);

		
		let arr = [0, 0, 0, 0, 0, 0, 0, 0]
		let arrLine = [0, 0, 0, 0, 0, 0, 0]

		let containers = svg.selectAll(".containers")
			.data(arr)
			.enter()
			.append("g")
			.attr("class", "gbar")
			.attr("id", function (_, i) {
				return "g" + i;
			});
		
		// Gradient to split rectangle color by half
		let grad = svg.append("defs")
			.append("linearGradient")
			.attr("id", "grad")
			.attr("x1", "35%").attr("x2", "100%").attr("y1", "100%").attr("y2", "100%");
		grad.append("stop").attr("offset", "50%").style("stop-color", "rgb(153,204,255)");
		grad.append("stop").attr("offset", "50%").style("stop-color", "rgb(129,230,129)");
		
		containers.append('rect')
			.attr('height', barHeight)
			.attr('width', barWidth)
			.attr('x', function (d, i) { return 150 * i; })
			.attr('y', '50')
			.style("fill", "url(#grad)")
			.attr("stroke-width", "2")
			.attr("stroke", "grey")
			
			
		// Line to split the rectangle 
		containers.append('line')
			.style("stroke", "grey")
			.style("stroke-width", 2)
			.attr("x1", function (d,i) { return (150 * i) + 60})
			.attr("y1", 50)
			.attr("x2", function (d,i) { return (150 * i) + 60})
			.attr("y2", 100)
		
		containers.append("text")
			.text((d) => {
				//console.log("BAR" + d);
				return d;
			})
			.attr("y", '83')
			.attr("x", function (d,i) { return (150 * i) + 20})
			.style("text-anchor", "middle")
			.style("font-size", "28px")
			.style("fill", "white");

		containers.append('line')
			.data(arrLine)
			.style("stroke", "white")
			.style("stroke-width", 5)
			.attr("x1", function (d, i) {
				d = 90
				return (d + 150 * (i))
			})
			.attr("y1", 75)
			.attr("x2", function (d, i) { return (150 * (i + 1)) })
			.attr("y2", 75)
			.attr("marker-end", "url(#arrow)")


		containers.append("svg:defs").append("svg:marker")
			.attr("id", "arrow")
			.attr("viewBox", "0 0 12 12")
			.attr("refX", 10.5)
			.attr("refY", 6)
			.attr("markerUnits", "strokeWidth")
			.attr("markerWidth", 8)
			.attr("markerHeight", 30)
			.attr("orient", "auto")
			.append("path")
			.attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
			.style("stroke", "white");

		let ids = [];
		for (let i = 0; i < 8; i++) ids.push("g" + i);
		svg.attr("visibility", "hidden");
		this.setState({rendered : true});
		this.ids = ids;
		return svg;
	}

	createMessage(msg) {
		this.messages.push("<h1>" + msg + "</h1>");
	  }

	turnOffRunning() {
		console.log("setting running to false");
		this.setState({ running: false });
	}

	// Step forward button
	forward() {
		console.log("FORWARD CLICKED");
		if (this.state.running) return; // The user can't step forward while running via the play
		// button so as not to ruin the visualizer
		if (this.stepId === this.steps.length) return; // At the end of the step queue
		// Uses the step's fastForward function and displays associated message
		this.steps[this.stepId].fastForward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = this.messages[this.stepId];
		this.setState({ stepId: this.stepId + 1 });
		d3.timeout(this.turnOffRunning, this.waitTime); // Calls function after wait time
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
		this.setState({ stepId: stepId });
		d3.timeout(this.turnOffRunning, this.state.waitTime);
	}

	// For the autoplay button
	run() {
		if (!this.running) return;
		console.log(this.stepId);
		console.log(this.steps.length);
		if (this.stepId === this.steps.length) {
			this.running = false;
			return;
		}
		this.steps[this.stepId].forward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = this.messages[this.stepId];
		this.stepId = this.stepId + 1;
		d3.timeout(this.run, this.waitTime);
	}

	play() {
		this.flag = true;
		if (this.running) return;
		this.running = true;
		this.run();
	}

	handleInsert() {
		let input = document.getElementById("insertVal").value;
		// If there is an input then check for posinput
		if (input) {
			this.insert(input);
		}
		else console.log("No Input");
		if (this.state.running) return;
		//this.setState({running: true});
		this.run();
		this.forward();
	}

	handleRemove() {
		let input = document.getElementById("removeVal").value;
		if (input) {
			this.remove(input);
		}
		else {
			console.log("No input entered")
			console.log(this.state.size);
		}
		// if (this.state.running) return;
		// this.setState({running: true});
		// this.run();
	}

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({ running: false });
	}

	restart() {
		console.log("RESTART CLICKED");
		d3.select(this.ref.current).select("svg").remove();
		document.getElementById("message").innerHTML = "<h1>Welcome to Binary Search!</h1>";
		this.setState({ running: false, steps: [], ids: [], messages: [], stepId: 0 });
	}

	// First function to run
	componentDidMount() {
		this.initialize();
	}

	//Calls functions depending on the change in state
	componentDidUpdate(prevProps, prevState) {
		if (this.state.size !== prevState.size) {
		  console.log("SIZE CHANGED");
		  this.initialize();
		} else if (this.state.rendered !== prevState.rendered) {
		console.log(this.flag)
		if (this.flag === true) {
			console.log("s");
			this.simulation();
		  }
			console.log("steps created");
		}
	}
	
	render() {
		return (
			<div>
				<div class="center-screen" id="banner">
					<button class="button" onClick={this.play}>Autoplay</button>
					<button class="button" onClick={this.pause}>Pause</button>
					<button class="button" onClick={this.restart}>Restart</button>
					<button class="button" onClick={this.backward}>Step Backward</button>
					<button class="button" onClick={this.forward}>Step Forward</button>
				</div>
				<div class="center-screen">
					<button class="button" id="insertBut" onClick={this.handleInsert}>Insert</button>
					<input type="number" class="inputBox" id="insertVal" placeholder="Val"></input>
					<button class="button" id="removeBut" onClick={this.handleRemove}>Remove</button>
					<input type="number" class="inputBox" id="removeVal" placeholder="Val"></input>
				</div>
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Singly Linked List!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}

