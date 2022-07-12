import React from "react";
import "./template.css"; // These end up being the same for every algorithm / data structure
						 // so it could be just as well for you to make one file you import
						 // for all visualizers
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";
import createDefaultGraph from "../../foundation/graph/createDefaultGraph";

// When nothing in the visualizer changes but you want to push a new message
// aka for alignment between messages and steps
class EmptyStep {
	forward(svg) {
		
	}

	fastForward(svg) {

	}

	backward(svg) {

	}
}

class ColorSwapStep{
    constructor(id1, id2, ids){
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

// Replace "Template" with something like "Heap" or "Kruskals"
export default class LinearSearch extends React.Component {
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
			stepTime: 300, // Milliseconds for transition durations aka duration of each animation
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
	}

    initialize(){
        d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "750px");

        let isWeighted = false;
        let isDirected = false;

        let graph = createDefaultGraph(this.ref, isWeighted, isDirected);
        let stack = [];
        stack.push(new Number(this.ref, "stack", "7%", "10%", "Stack", "grey", "visible"));

        this.setState({graph: graph, stack: stack});
    }

    printArray(arr, size){
        for(let i = 0; i < size; i++){
            console.log(arr[i]);
        }
    }

    sort(arr, length, item, stepTime){

        var steps = [];
        var message = [];

        message.push("<h1>Beginning Linear Search!</h1>");
        steps.push(new EmptyStep());

        for(let i = 0; i < length; i++){
            message.push("<h1>Searching Index " + i + "for Value " + item + ".</h1>");
            steps.push(new ColorSwapStep());
            if(arr[i] == item){
                message.push("<h1>Found Item at Index " + i + ".</h1>");
                return i;
                //steps.push(new ColorFound());
                //remove second id from color swap step for new color (Gold)
            }
            else{
                message.push("<h1>" + arr[i] + " != " + item + " </h1>");
            }
        
        steps.push(new EmptyStep());
        
        }
        message.push("<h1>Requested Item Not Found");
        return -1;
    }

	// Main function - example of pushing to messages and steps queues
	// **NOTE: steps.length == messages.length MUST be true
	// You may need to push EmptyStep's or repeat messages depending on what you're doing
	
    /*sort(arr, ids, size, stepTime)
	{
		var steps = [];
		var messages = [];
        var i, j;

		messages.push("<h1>Beginning Bubble Sort!</h1>");
		steps.push(new EmptyStep());

        for (i = 0; i < size; i++) {
            messages.push("<h1>Select the leftmost element.</h1>");
		    steps.push(new BubbleSwapStep(0, 0, ids));

            for(j = 0; j < size - i - 1; j++){
                messages.push("<h1>Attempt to Bubble Up.</h1>");
		        steps.push(new QSwapStep(j+1, ids));
                
                if (arr[j] > arr[j+1]) {
					messages.push("<h1>" + arr[j] + " > " + arr[j+1] + "</h1>");
		            steps.push(new EmptyStep());

                    messages.push("<h1>Bubble Up!</h1>");
		            steps.push(new SwapStep(j, j+1, ids, stepTime));
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

                    messages.push("<h1>Bubble Up!</h1>");
		            steps.push(new UncolorStep(j, ids));
                }
                else {
					messages.push("<h1>" + arr[j] + " < " + arr[j + 1] + "</h1>");
		            steps.push(new EmptyStep());

                    messages.push("<h1>No change.</h1>");
		            steps.push(new UncolorStep(j+1, ids));

                    messages.push("<h1>Increment our Bubble pointer.</h1>");
                    steps.push(new BubbleSwapStep(j, j+1, ids, stepTime));
                }
            }

			messages.push("<h1>Reached the end of the unsorted array.</h1>");
			steps.push(new EmptyStep());

            messages.push("<h1>" + arr[j] + " sorted.</h1>");
		    steps.push(new SortedStep(j, ids));

            messages.push("<h1>" + arr[j] + " is now it its sorted position.</h1>");
		    steps.push(new EmptyStep());

            if (i !== size - 1) {
                messages.push("<h1>Reset our Bubble pointer.</h1>");
		        steps.push(new EmptyStep());
            }
        } 

		messages.push("<h1>Finished Bubble Sort!</h1>");
		steps.push(new EmptyStep());

		// Always do setState at the end of a function if possible since it could
		// trigger componentDidUpdate
		this.setState({steps: steps});
		this.setState({messages: messages});
	}

	// Ran once the component is mounted aka the first function that is ran*/
	
    // Initializes the data to be used in the visualizer
	dataInit(size) {
		var arr = [];

		// fills arr with random numbers [15, 70]
		for (let i = 0; i < size; i++)
		{
			arr[i] = 15 + Math.floor(Math.random() * 56);
		}

        target = arr[Math.floor(Math.random() * arr.length)];

		this.setState({arr: arr});
	}

	// Initializes the visualizer - returns the svg with a "visibility: hidden" attribute
	initialize(arr, size, ref) {
		const barWidth = 70;
		const barOffset = 30;
		const height = 450;

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

		// Easy backward functions so just run that
		if (this.state.steps[stepId] instanceof EmptyStep || this.state.steps[stepId] instanceof PartitionStep ||
			this.state.steps[stepId] instanceof UnpartitionStep || this.state.steps[stepId] instanceof SwapStep)
		{
			console.log(this.state.steps[stepId]);
			this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
		}

		// Or make a new svg and run steps up until step before
		else
		{
			d3.select(this.ref.current).select("svg").remove();

			var svg = this.initialize();

			for (var i = 0; i < stepId; i++) {
				this.state.steps[i].fastForward(svg);
				console.log(this.state.steps[i]);
			}

			svg.attr("visibility", "visible");
		}

		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Bubble Sort!</h1>" : this.state.messages[stepId - 1];

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

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() {
		console.log("RESTART CLICKED");

		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "<h1>Welcome to Bubble Sort!</h1>";

        this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
	}

	// First function to run
	componentDidMount() {
		this.dataInit(this.state.size);
	}

	// Calls functions depending on the change in state
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

		//
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
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Template!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}