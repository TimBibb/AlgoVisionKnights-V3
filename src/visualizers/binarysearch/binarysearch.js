import React from "react";
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";
import "./binarysearch.css";
import { render } from "react-dom";


// Alignment between messages and steps
class EmptyStep {
    forward(svg){}
    fastForward(svg){}
    backward(svg){}
}

// D3 manipulations - 
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

export default class binarysearch extends React.Component {
    constructor(props) {
        super(props);
        // Initial state
        this.state = {
            stepId: 0, // ID of current step
            running: false, // current state of playing
            info: {},
            messages: [], // message queue for the messages that will appear
            currentMessage: "",
            steps: [], // step queue that will be used for making change to visualizer
            stepBuffer: [], 
            ids: [], // ID of the group elements
            stepTime: 400, // ms for transition duration
            waitTime: 4000 // ms between steps
        };
        // Bindings
        this.ref = React.createRef(); // where the visualizer will be 
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.restart = this.restart.bind(this);
        this.backward = this.backward.bind(this);
        this.forward = this.forward.bind(this);
        this.turnOffRunning = this.turnOffRunning.bind(this);
        this.run = this.run.bind(this);
        // User input will be implemented after
        // this.isRunningCheck = this.isRunningCheck.bind(this);
        // this.handleInsertion = this.handleInsertion.bind(this);
    }

    // Main function of binary search - example of pushing to messages and step queues
    
	printArray(arr, size) {
		for (let i = 0; i < size; i++) console.log(arr[i]);
	}
	
	search(arr,ids,length,stepTime) {
		var steps = [];
        var messages = [];

        messages.push("<h1>Beginning Linear Search!</h1>");
        steps.push(new EmptyStep());
        for(let i = 0; i < length; i++){
            messages.push("<h1>Searching Index " + i + "for Value " + this.state.target + ".</h1>");
            steps.push(new ColorSwapStep(i, i+1, ids));
            if(arr[i] == this.state.target){
                messages.push("<h1>Found Item at Index " + i + ".</h1>");
				steps.push(new EmptyStep());
				break;
				//steps.push(new ColorFound());
                //remove second id from color swap step for new color (Gold)
            }
            else{
                messages.push("<h1>" + arr[i] + " != " + this.state.target + " </h1>");
				steps.push(new EmptyStep());
            }
        }

        // messages.push("<h1>Requested Item Not Found");

		this.setState({steps: steps});
		this.setState({messages: messages});
	}
    
    // The visualizer 
    initialize(arr,size,ref) {
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

		for (let i = 0; i < size; i++) ids.push("g" + i);

		this.setState({ids: ids});

		svg.attr("visibility", "hidden");

        return svg;
    }
    
    // Data initialization for visualizer
    dataInit(size) {
        var arr = [];
		// fills arr with random numbers [15, 70]
		for (let i = 0; i < size; i++) {
		    arr[i] = 15 + Math.floor(Math.random() * 56);
		}
		this.setState({arr: arr});
    }
    
    // Step forward function for forward button
    forward() {
        console.log("FORWARD CLICKED");
		if (this.state.running) return; // Returns if it is currently playing
		if (this.state.stepId === this.state.steps.length) return; // Return when at the end of step queue
		
		// Use fast forward and display message
		this.state.steps[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg"));
		console.log(this.state.steps[this.state.stepId]);
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});
		d3.timeout(this.turnOffRunning, this.state.waitTime);
    }

    // Step backward function for backward button
    backward() {
        console.log("BACKWARD CLICKED");
		if (this.state.running) return; // Return if running
		if (this.state.stepId - 1 < 0) return; // Prohibit going backward on stepid: 0
		
		var stepId = this.state.stepId - 1; // Take a step back by decrementing stepId
		this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Binary Search!</h1>" : this.state.messages[stepId - 1];
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.state.waitTime);
    }
    // Play function for play button
    play() {
        console.log("PLAY CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
		this.run();
    }
    // Pause function for pause button
    pause() {
        console.log("PAUSE CLICKED");
		this.setState({running: false});
    }
    // Restart function for restart button
    restart() {
        console.log("RESTART CLICKED");
		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "<h1>Welcome to Binary Sort!</h1>";
        this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
    }
    // ---------------------------------------
    
    // Run function - kick off from the play button 
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
    // Turn off running
    turnOffRunning() {
        this.setState({running: false});
    }
    
    // First function to run
    componentDidMount() {this.dataInit(this.state.size);}



    render() 
    {
        return (
            <div>
                <div class="center-screen" id="banner">
                    <button class="button" onClick={this.play}>Play</button>
                    <button class="button" onClick={this.pause}>Pause</button>
                    <button class="button" onClick={this.restart}>Restart</button>
                    <button class="button" onClick={this.backward}>Step Backward</button>
                    <button class="button" onClick={this.forward}>Step Forward</button> 
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Binary Search!</h1></span></div>
                <div ref={this.ref} class="center-screen"></div>
            </div>
        )
    }
}


