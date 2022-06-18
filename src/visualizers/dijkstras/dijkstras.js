import React from "react";
import "./dijkstras.css";
import * as d3 from "d3";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import "../css/button.css";
import "../css/messages.css";

class EmptyStep {
	forward(svg) {
		
	}

	backward(svg) {

	}
}

class ColorNodeStep {
	constructor(nodeID, oldColor, newColor) {
		this.circleID = "#node" + nodeID;
		this.textID = "#label" + nodeID;
		this.oldColor = oldColor;
		this.newColor = newColor;
	}

	forward(svg) {
		svg.select(this.circleID).style("stroke", this.newColor);
		svg.select(this.textID).style("fill", this.newColor);
	}

	backward(svg) {
		svg.select(this.circleID).style("stroke", this.oldColor);
		svg.select(this.textID).style("fill", this.oldColor);
	}
}

class SetInfoStep {
	constructor(nodeID, oldParentID, newParentID, oldDist, newDist) {
		this.pID = "#pTxt" + nodeID;
		this.dID = "#dTxt" + nodeID;
		this.oldParentID = oldParentID;
		this.newParentID = newParentID;
		this.oldDist = oldDist;
		this.newDist = newDist;
	}

	forward(svg) {
		if (this.newParentID !== -1) {
			svg.select(this.pID).text("Parent: " + this.newParentID);
		}

		if (this.newDist !== -1) {
			svg.select(this.dID).text("Distance: " + this.newDist);
		}
	}

	backward(svg) {
		if (this.oldParentID === -1 && this.newParentID !== -1) {
			svg.select(this.pID).text("Parent: N/A");
		}
		else if (this.oldParentID !== -1) {
			svg.select(this.pID).text("Parent: " + this.oldParentID);
		}

		if (this.oldDist === -1 && this.newDist !== -1) {
			svg.select(this.dID).text("Distance: ∞");
		}
		else if (this.oldDist !== -1) {
			svg.select(this.dID).text("Distance: " + this.oldDist);
		}
	}
}

class ColorEdgeStep {
	constructor(edgeID, oldColor, newColor) {
		this.edgeID = "#edge" + edgeID;
		this.weightID = "#weight" + edgeID;
		this.oldColor = oldColor;
		this.newColor = newColor;
	}

	forward(svg) {
		svg.select(this.edgeID).style("stroke", this.newColor);
		svg.select(this.weightID).style("fill", this.newColor);
	}

	backward(svg) {
		svg.select(this.edgeID).style("stroke", this.oldColor);
		svg.select(this.weightID).style("fill", this.oldColor);
	}
  }

export default class Dijkstras extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            graph: [],
			first: 0,
            running: false,
            steps: [],
            stepId: 0,
            stepTime: 500,
            waitTime: 3000,
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

	minInsert(minQueue, v, dist) {
		minQueue.push([v, dist]);

		var min = minQueue[0][1];
		var indx = 0;

		for (var i = 1; i < minQueue.length; i++) {
			if (minQueue[i][1] < min) {
				min = minQueue[i][1];
				indx = i;
			}
		}

		[minQueue[0], minQueue[indx]] = [minQueue[indx], minQueue[0]];
	}

    dijkstras(graph, first)
	{
		var steps = [];
		var messages = [];

		messages.push("<h1>Beginning Dijkstra's!</h1>");
		steps.push(new EmptyStep());

		var visitedNum = 0;

		messages.push("<h1>Node " + first + " is the main node.</h1>");
		steps.push(new ColorNodeStep(first, "gray", "#1ACA1E"));

		graph.distances[first] = 0;

		messages.push("<h1>Node " + first + "'s distance is 0.</h1>");
		steps.push(new SetInfoStep(first, -1, -1, -1, 0));

		console.log("LIST");
		console.log(graph.adjacencyList);

		var minQueue = [[first, 0]];

		while (minQueue.length !== 0 && visitedNum !== graph.numberOfNodes) {
			var head = minQueue.shift();
			if (graph.visited[head[0]] === true) {
                continue;
            }

			if (head[0] !== first) {
				messages.push("<h1>Node " + head[0] + " is the unvisited neighbor with the smallest distance.</h1>");
				steps.push(new EmptyStep());
			}

			messages.push("<h1>Node " + head[0] + " is the current head node.</h1>");
			steps.push(new ColorNodeStep(head[0], (head[0] === first) ? "#1ACA1E" : "gray", "#648FFF"));

			for (var i = 0; i < graph.adjacencyList[head[0]].length; i++) {
				var v = graph.adjacencyList[head[0]][i][1];
				var weight = graph.adjacencyList[head[0]][i][2];
				var edge = graph.adjacencyList[head[0]][i][3];

				if (graph.visited[v] === true) {
					continue;
				}

				messages.push("<h1>Compare " + head[0] + " to " + v + ".</h1>");
				steps.push(new ColorNodeStep(v, (graph.visited[head[0]]) ? "black" : "gray", "#EF3F88"));

				if (graph.distances[v] === -1) {
					messages.push("<h1>Compare " + head[0] + " to " + v + ".</h1>");
					steps.push(new ColorEdgeStep(edge, (graph.parentEdges.includes(edge)) ? "#1ACA1E" : "gray", "white"));

					messages.push("<h1>" + graph.distances[head[0]] + " + " + weight + " < ∞.</h1>");
					steps.push(new EmptyStep());

					messages.push("<h1>Distance through " + head[0] + " is less than " + v + "'s current distance.</h1>");
					steps.push(new EmptyStep());

					messages.push("<h1>" + v +"'s parent is now " + head[0] + ".</h1>");
					steps.push(new SetInfoStep(v, graph.parents[v], head[0], -1, -1));

					graph.parents[v] = head[0];
					graph.parentEdges[v] = edge;

					messages.push("<h1>" + v +"'s distance is now " + parseInt(graph.distances[head[0]] + weight) + ".</h1>");
					steps.push(new SetInfoStep(v, -1, -1, graph.distances[v], graph.distances[head[0]] + weight));

					graph.distances[v] = graph.distances[head[0]] + weight;
					
					messages.push("<h1>" + v +"'s distance is now " + graph.distances[v] + ".</h1>");
					steps.push(new ColorEdgeStep(edge, "white", "#1ACA1E"));

					messages.push("<h1>" + v +"'s distance is now " + graph.distances[v] + ".</h1>");
				}
				else if (graph.distances[head[0]] + weight < graph.distances[v]) {

					messages.push("<h1>Compare " + head[0] + " to " + v + ".</h1>");
					steps.push(new ColorEdgeStep(edge, (graph.parentEdges.includes(edge)) ? "#1ACA1E" : "gray", "white"));

					messages.push("<h1>" + graph.distances[head[0]] + " + " + weight + " < " + graph.distances[v] + ".</h1>");
					steps.push(new EmptyStep());

					messages.push("<h1>Distance through " + head[0] + " is less than " + v + "'s current distance.</h1>");
					steps.push(new ColorEdgeStep(graph.parentEdges[v], "#1ACA1E", "#444444"));

					messages.push("<h1>" + v +"'s parent is now " + head[0] + ".</h1>");
					steps.push(new SetInfoStep(v, graph.parents[v], head[0], -1, -1));

					graph.parents[v] = head[0];
					graph.parentEdges[v] = edge;

					messages.push("<h1>" + v +"'s distance is now " + parseInt(graph.distances[head[0]] + weight) + ".</h1>");
					steps.push(new SetInfoStep(v, -1, -1, graph.distances[v], graph.distances[head[0]] + weight));

					graph.distances[v] = graph.distances[head[0]] + weight;
					
					messages.push("<h1>" + v +"'s distance is now " + graph.distances[v] + ".</h1>");
					steps.push(new ColorEdgeStep(edge, "white", "#1ACA1E"));

					messages.push("<h1>" + v +"'s distance is now " + graph.distances[v] + ".</h1>");
				}
				else
				{
					messages.push("<h1>Compare " + head[0] + " to " + v + ".</h1>");
					steps.push(new ColorEdgeStep(edge, (graph.parentEdges.includes(edge)) ? "#1ACA1E" : "gray", "white"));

					messages.push("<h1>" + graph.distances[head[0]] + " + " + weight + " > " + graph.distances[v] + ".</h1>");
					steps.push(new EmptyStep());

					messages.push("<h1>Distance through " + head[0] + " is not less than " + v + "'s current distance. No change.</h1>");
					steps.push(new ColorEdgeStep(edge, "white", (graph.parentEdges.includes(edge)) ? "#1ACA1E" : "#444444"));

					messages.push("<h1>Distance through " + head[0] + " is not less than " + v + "'s current distance. No change.</h1>");
				}

				steps.push(new ColorNodeStep(v, "#EF3F88", "gray"));

				this.minInsert(minQueue, v, graph.distances[v]);
			}

			graph.visited[head[0]] = true;
			visitedNum++;

			messages.push("<h1>Finished with Node " + head[0] + ".</h1>");
			steps.push(new ColorNodeStep(head[0], "#648FFF", (head[0] !== first) ? "black" : "#1ACA1E"));
		}

        messages.push("<h1>Found shortest paths from Node " + first +  " to all nodes.</h1>");
		steps.push(new EmptyStep());

		messages.push("<h1>Finished Dijkstra's!</h1>");
		steps.push(new EmptyStep());

		this.setState({steps: steps});
		this.setState({messages: messages});

		console.log(steps);
		console.log(messages);
	}

	initialize() {
        var svg = d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "650px");

        let isWeighted = true;
        let isDirected = false;
    
        let graph = createDefaultGraph(this.ref, isWeighted, isDirected);

		graph.distances = [];
		graph.parents = [];
		graph.visited = [];
		graph.parentEdges = [];

		for (var i = 0; i < graph.numberOfNodes; i++) {
			graph.distances.push(-1);
			graph.parents.push(-1);
			graph.visited.push(false);
			graph.parentEdges.push([-1, -1]);

			var node = d3.select(this.ref.current).select("#node" + i);

			var pTxt = svg.append("text").text("Parent: N/A")
				.attr("id", "pTxt" + i)
				.style("font-family", "Merriweather")
				.attr("font-weight", "bold")
				.style("font-size", "26px")
				.style("fill", "white");

			var dTxt = svg.append("text").text("Distance: ∞")
				.attr("id", "dTxt" + i)
				.style("font-family", "Merriweather")
				.attr("font-weight", "bold")
				.style("font-size", "26px")
				.style("fill", "white");

			if (i === 0) {
				pTxt
					.attr("y", (parseInt(node.attr("cy")) - 12) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 14) + "%");
				dTxt
					.attr("y", (parseInt(node.attr("cy")) - 8) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 14) + "%");
			}
			else if (i === 1 || i === 3) {
				pTxt
					.attr("y", (parseInt(node.attr("cy")) - 12) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 6) + "%");
				dTxt
					.attr("y", (parseInt(node.attr("cy")) - 8) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 6) + "%");
			}
			else if (i === 2 || i === 4) {
				pTxt
					.attr("y", (parseInt(node.attr("cy")) + 11) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 6) + "%");
				dTxt
					.attr("y", (parseInt(node.attr("cy")) + 15) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 6) + "%");
			}
			else if (i === 5) {
				pTxt
					.attr("y", (parseInt(node.attr("cy")) - 12) + "%")
					.attr("x", (parseInt(node.attr("cx")) + 2) + "%");
				dTxt
					.attr("y", (parseInt(node.attr("cy")) - 8) + "%")
					.attr("x", (parseInt(node.attr("cx")) + 2) + "%");
			}
		}

        this.setState({graph: graph});

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
		
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg"));
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

		console.log(this.state.steps[stepId]);
		this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
		
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Dijkstra's!</h1>" : this.state.messages[stepId - 1];
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

        document.getElementById("message").innerHTML = "<h1>Welcome to Dijkstra's!</h1>";

		console.log("Reset state");
		this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
	}

	componentDidMount() {
		this.initialize();
	}

	componentDidUpdate(prevProps, prevState) {
			var svg = d3.select(this.ref.current).select("svg");

		// Graph created in initialize -> run algorithms to get steps
		if (this.state.graph !== prevState.graph) {
            svg.attr("visibility", "visible");
			console.log("We initialized. Time to run algorithm.");
			this.dijkstras(this.state.graph, this.state.first);
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
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Dijkstra's!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}