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
import { ExitToApp } from "@material-ui/icons";



class Node {
<<<<<<< HEAD
	constructor(element, id, ref, x) {
		this.element = element;
        this.id = "g" + id;
        this.next = null;
        this.ref = ref;
        this.x = x;
			
		let container = d3.select(this.ref.current)
			.select("svg")
			.append("g")
			.attr("class","gbar")
			.attr("id", this.id)
			.attr("visibility", "hidden")
	
		container
            .append('rect')
			.attr("class", "nodes")
            .attr('height', 50)
            .attr('width',90)
            .attr('x', (150 * this.x))
            .attr('y','50')
            .style("fill", "url(#grad)")
            .attr("stroke-width", "2")
            .attr("stroke", "grey")
			
		container
            .append('line')
            .style("stroke", "grey")
            .style("stroke-width", 2)
		 	.attr("x1", (150 * this.x) + 60)
		 	.attr("y1", 50)
		 	.attr("x2", (150 * this.x) + 60)
		 	.attr("y2", 100)
			
		container
			.append("text")
			.text(this.element)
			.attr("y", '83')
			.attr("x", (150 * this.x) + 20)
			.style("text-anchor", "middle")
			.style("font-size", "28px")
			.style("fill", "white")
			
		container
			.append('line')
			.style("stroke", "white")
			.style("stroke-width", 5)
			.attr("x1", (150 * this.x) + 90)
			.attr("y1", 75)
			.attr("x2", 150 * (this.x + 1))
			.attr("y2", 75)
			.attr("marker-end", "url(#arrow)")
			
		
		container
			.append("svg:marker")
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
			.style("stroke", "white")
    
    ;}

=======
	constructor(element, id, next, ref) {
		this.element = element;
		this.id = id;
		this.next = next ? next : null;
		this.ref = ref;

		// d3.select(ref.current)
		// 	.select("svg g")
		// 	.append('rect')
		// 	.attr('height', barHeight)
		// 	.attr('width', barWidth)
		// 	.attr('x', function (d, i) { return 150 * i; })
		// 	.attr('y', '50')
		// 	.style("fill", "url(#grad)")
		// 	.attr("stroke-width", "2")
		// 	.attr("stroke", "grey")

		// 	// Line to split the rectangle 
		// d3.select(ref.current)
		// 	.select("svg g")
		// 	.append('line')
		// 	.style("stroke", "grey")
		// 	.style("stroke-width", 2)
		// 	.attr("x1", function (d,i) { return (150 * i) + 60})
		// 	.attr("y1", 50)
		// 	.attr("x2", function (d,i) { return (150 * i) + 60})
		// 	.attr("y2", 100)
		
		// d3.select(ref.current)
		// 	.select("svg g")
		// 	.append("text")
		// 	.text((d) => {
		// 		//console.log("BAR" + d);
		// 		return d;
		// 	})
		// 	.attr("y", '83')
		// 	.attr("x", function (d,i) { return (150 * i) + 20})
		// 	.style("text-anchor", "middle")
		// 	.style("font-size", "28px")
		// 	.style("fill", "white");

		// d3.select(ref.current)
		// 	.select("svg g")
		// 	.append('line')
		// 	.data(arrLine)
		// 	.style("stroke", "white")
		// 	.style("stroke-width", 5)
		// 	.attr("x1", function (d, i) {
		// 		d = 90
		// 		return (d + 150 * (i))
		// 	})
		// 	.attr("y1", 75)
		// 	.attr("x2", function (d, i) { return (150 * (i + 1)) })
		// 	.attr("y2", 75)
		// 	.attr("marker-end", "url(#arrow)")
	}
>>>>>>> 315342f41980f8b1730732a14993778daf1ad10f
}

class EmptyStep {
	forward(svg) { }

	fastForward(svg) { }

	backward(svg) { }
}

class ShowNodeStep {
	constructor(id1,idArr) {
		this.idArr = idArr;
		this.id1 = id1;
	}
	forward(svg) {
		svg.select("#" + this.idArr[this.id1]).selectAll("rect, text, line, #arrow").attr("visibility", "visible");
	}
	fastForward(svg) {
		this.forward(svg);
	}
	backward(svg) {
		svg.select("#" + this.idArr[this.id1]).select("rect").style("fill", "#EF3F88");
		svg.select("#" + this.idArr[this.id2]).select("rect").style("fill", "gray");
		svg.selectAll(".qTxt").attr("visibility", "hidden");

		if (this.id1 !== this.id2) {
			svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		}
	}
}
class HideNodeStep {
	constructor(id1,idArr) {
		this.idArr = idArr;
		this.id1 = id1;
	}
	forward(svg) {
		svg.select("#" + this.idArr[this.id1]).selectAll("rect, text, line, #arrow").attr("visibility", "hidden");
	}
	fastForward(svg) {
		this.forward(svg);
	}
	backward(svg) {
		svg.select("#" + this.idArr[this.id1]).select("rect").style("fill", "#EF3F88");
		svg.select("#" + this.idArr[this.id2]).select("rect").style("fill", "gray");
		svg.selectAll(".qTxt").attr("visibility", "hidden");

		if (this.id1 !== this.id2) {
			svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		}
	}
}

class RemoveNodeStep {
	constructor(id1,idArr) {
		this.idArr = idArr;
		this.id1 = id1;
	}
	forward(svg) {
		svg.select("#" + this.idArr[this.id1]).selectAll("rect, text, line").attr("visibility", "hidden");
	}
	fastForward(svg) {
		this.forward(svg);
	}
	backward(svg) {
		svg.select("#" + this.idArr[this.id1]).select("rect").style("fill", "#EF3F88");
		svg.select("#" + this.idArr[this.id2]).select("rect").style("fill", "gray");
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
			rendered: false,
			stepsArr : [],
			idArr : [],
			messagesArr : [],
			running : false,
			stepId : 0,
			stepTime : 4000,
			waitTime : 1000,
			flag : false,
			inputFlag : false,
			nodeID : 0,
			nodeCounter: 0,
			MAX_NODE : 8,
			MAX_INPUT : 999,
			MIN_INPUT : -999,
		};
	
		// Bindings
		this.ref = React.createRef(); // Where the visualizer will be
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		//this.turnOffRunning = this.turnOffRunning.bind(this);
		this.handleInsert = this.handleInsert.bind(this);
		this.run = this.run.bind(this);
		// Constructor for Linked List
		this.head = null;
		this.size = 0;		
	}
	
	// Initializes the visualizer - returns the svg with a "visibility: hidden" attribute
	initialize() {
		console.log("Building the visualizer");
		const height = 300;
		const barWidth = 90;
		const barOffset = 5;

		let svg = d3.select(this.ref.current)
			.append("svg")
			.attr("width", 1140)
			.attr("height", height);
			// .append("g")
		
		// return svg
		
		// Gradient to split rectangle color by half
		let grad = svg.append("defs")
			.append("linearGradient")
			.attr("id", "grad")
			.attr("x1", "35%").attr("x2", "100%").attr("y1", "100%").attr("y2", "100%");
		grad.append("stop").attr("offset", "50%").style("stop-color", "rgb(153,204,255)");
		grad.append("stop").attr("offset", "50%").style("stop-color", "rgb(129,230,129)");
		

		this.setState({ rendered : true});
		return svg;
	}

	simulation() {
		let arr = [];
		for (let i = 0; i < 8; i++) arr[i] = Math.floor(Math.random() * 100);
		
		console.log("Running stimulation");
		this.state.messagesArr.push("<h1>Beginning Singly Linked List!</h1>");
		this.state.stepsArr.push(new EmptyStep());
		
		this.state.messagesArr.push("<h1>Let's insert the nodes from the tail.</h1>");
		this.state.stepsArr.push(new EmptyStep());
		for (let i = 0; i < 8; i++) {
			this.insert(arr[i], i);
		}

		this.state.messagesArr.push("<h1>Let's remove some nodes from the tail.</h1>");
		this.state.stepsArr.push(new EmptyStep());
		for (let k = 7; k >= 3; k--) {
			this.remove(arr[k],k);
		}

		this.state.messagesArr.push("<h1>Let's insert the nodes back.</h1>");
		this.state.stepsArr.push(new EmptyStep());
		for (let i = 3; i < 8; i++) {
			this.insert(arr[i], i);
		}

		this.setState({ stepsArr: this.state.stepsArr }, () => {
			console.log(this.state.stepsArr.length)
		});
		this.setState({ messagesArr: this.state.messagesArr }, () => {
			console.log(this.state.messagesArr.length)
		});
		
	}

	// insert element towards the end of the list
<<<<<<< HEAD
	insert(element,id) {
		// Create node object
		let node = new Node(element,id, this.ref, id);
		// Push into ids array for referencing
		this.state.idArr.push(node.id);
		
		let current;
		if (this.head == null)  {
			this.head = node;
			this.state.messagesArr.push("<h1>Inserting " + element + " into the Linked List.</h1>");
			this.state.stepsArr.push(new ShowNodeStep(id,this.state.idArr));
=======
	insert(element) {
		let messages = [];
		let steps = [];
		let i = 0;
		// Functions for add
		// let node = new Node(element, this.state.lastId, null, this.ref)
		// get rid of arrays
		// get rid of ids list
		let node = new Node(element);
		let current;
		if (this.head == null)  {
			this.head = node;
			this.head.id = 
			messages.push("<h1>Inserting " + element + " into the Linked List.</h1>");
			steps.push(new AddNodeTailStep(element,0,this.state.ids));
			//console.log("head: " + element);
>>>>>>> 315342f41980f8b1730732a14993778daf1ad10f
		}
		else {
			current = this.head;
			while (current.next) {
				current = current.next;
			}
				current.next = node;
				this.state.messagesArr.push("<h1>Inserting " + element + " into the Linked List.</h1>");
				this.state.stepsArr.push(new ShowNodeStep(id,this.state.idArr));
		}
		this.size++;

		//this.printList();
		this.setState({stepsArr: this.state.stepsArr }, () => {
			//console.log(this.state.stepsArr.length)
		});
		this.setState({messagesArr: this.state.messagesArr }, () => {
			//console.log(this.state.messagesArr.length)
		});
		this.setState({idArr : this.state.idArr});
	}
	// remove next occurent element from the list
	remove(element, id) {
		let current = this.head;
		let previous = null;

		// iterate over the list
		while (current != null) {
			// comparing element with current
			// element if found then remove the
			// and return true
			if (current.element === element) {
				if (previous == null) {
					// If the value is at the head
					this.state.messagesArr.push("<h1>Removing " + element + " at the head.</h1>");
					this.state.stepsArr.push(new HideNodeStep(id,this.state.idArr));
					this.head = current.next;
				} else {
					// Take previous next and assign to successor node next
					this.state.messagesArr.push("<h1>Removing " + element + ".</h1>");
					this.state.stepsArr.push(new HideNodeStep(id,this.state.idArr));
					previous.next = current.next;
				}
				this.size--;
				return;
			}
			previous = current;
			current = current.next;
		}
		this.printList();
		this.setState({stepsArr: this.state.stepsArr }, () => {
			//console.log(this.state.stepsArr.length)
		});
		this.setState({messagesArr: this.state.messagesArr }, () => {
			//console.log(this.state.messagesArr.length)
		});
		this.setState({idArr : this.state.idArr});
		console.log("No value found");
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

	//Step forward button
	forward() {
		console.log("FORWARD CLICKED");
		if (this.state.running) return; // The user can't step forward while running via the play
		// button so as not to ruin the visualizer
		if (this.state.stepId === this.state.stepsArr.length) return; // At the end of the step queue
		// Uses the step's fastForward function and displays associated message
		this.state.stepsArr[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({ stepId: this.state.stepId + 1 });
		d3.timeout(this.turnOffRunning, this.state.waitTime); // Calls function after wait time
	}

	//Step backward button
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

	//For the autoplay button
	run() {
		console.log("Inside run()");
		if (!this.state.running) {
			console.log("Not running");
			return;
		}
		console.log("Stepid: " + this.state.stepId);
		console.log("Total Steps: " + this.state.stepsArr.length);
		if (this.state.stepId === this.state.stepsArr.length) {
			console.log("We are the end!");
			this.setState({running: false});
			return;
		}
		this.state.stepsArr[this.state.stepId].forward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = this.state.messagesArr[this.state.stepId];
		this.setState({stepId : this.state.stepId + 1});
		d3.timeout(this.run, this.state.waitTime);
	}

	play() {
		console.log("Play clicked");
		if (this.state.running) return;
		this.setState({flag : true});
		this.setState({running: true});
		this.simulation();
		this.run();
	}

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({ running: false });
	}

	restart() {
		console.log("RESTART CLICKED");
		d3.select(this.ref.current).select("svg").remove();
		document.getElementById("message").innerHTML = "<h1>Welcome to Singly Linked List!</h1>";
		this.setState({ rendered: false, running: false, stepsArr: [], messagesArr: [], stepId: 0, flag : true});
	}

	// First function to run when launch the page
	componentDidMount() {
		console.log("Mounting our D3");
		this.initialize();
	}

	//Calls functions depending on the change in state
	componentDidUpdate(prevProps, prevState) {
		if (this.state.rendered !== prevState.rendered && this.state.flag === false) {
			console.log("Current state has been rendered");
			// this.simulation();	
		}
		// Restart
		else if (this.state.stepsArr.length !== prevState.stepsArr.length && this.state.flag === true) {
			console.log("Restart");
			this.initialize();
			//this.simulation();
		}
		else if (this.state.running !== prevState.running && this.state.running === true)
		{
			this.run();
			console.log("We ran");
		}
	}

	handleInsert() {
		let input = document.getElementById("insertVal").value;
		// If there is an input then check for posinput
		if (this.state.running) return;
		this.setState({running: true});
		if (input && this.state.nodeCounter < this.state.MAX_NODE) {
			this.insert(input,this.state.nodeID);
			this.setState({nodeID : this.state.nodeID + 1, 
						   nodeCounter : this.state.nodeCounter + 1});
			this.run();
		}
		else{
			console.log("No Input");
			if (this.state.nodeID >= 7){
				document.getElementById("message").innerHTML = "<h1>Sorry! The limit is 8 nodes</h1>";
				return;
			}
		} 
	} 

	handleRemove() {
		let input = document.getElementById("removeVal").value;
		if (this.state.running) return;
		this.setState({running : true});
		if (input) {
			this.remove(input);
		}
		else {
			console.log("No input entered")
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



 
	
	