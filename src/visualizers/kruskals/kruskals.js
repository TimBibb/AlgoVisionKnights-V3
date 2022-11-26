import React from "react";
import * as d3 from "d3";
import "./kruskals.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import "../css/button.css";
import "../css/messages.css";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { Create } from "@material-ui/icons";
import {Pseudocode, HighlightLineStep} from "../../components/pseudocode/Pseudocode";

class CreatingConn {
  constructor(nodes){

    this.parent = {};

    nodes.forEach(e => (this.parent[e] = e));
  }

  Connect(node1, node2){
    let rootA = this.Check(node1);
    let rootB = this.Check(node2);

    if(rootA == rootB)
      return;

    if(rootA < rootB){
      if(this.parent[node2] != node2)
        this.Connect(this.parent[node2], node1);
      
      this.parent[node2] = this.parent[node1];
    } else {
      if(this.parent[node1] != node1)
        this.Connect(this.parent[node1], node2);

      this.parent[node1] = this.parent[node2];
    }
  }

  Check(node){
    while(this.parent[node] != node){
      node = this.parent[node];
    }
    return node;
  }

  United(node1, node2){
    return this.Check(node1) == this.Check(node2);
  }
}
class EmptyStep {
  forward() {}
  backward() {}
}

class EdgeColorChangeStep {
  constructor(ref, edgeId, weightId, oldColor, newColor) {
    this.ref = ref;
    this.edgeId = "#" + edgeId;
    this.weightId = "#" + weightId;
    this.oldColor = oldColor;
    this.newColor = newColor;
  }
  forward() {
    d3.select(this.ref).select(this.edgeId).style("stroke", this.newColor);
    d3.select(this.ref).select(this.weightId).style("fill", this.newColor);
  }
  backward() {
    d3.select(this.ref).select(this.edgeId).style("stroke", this.oldColor);
    d3.select(this.ref).select(this.weightId).style("fill", this.oldColor);
  }
}

class NodeColorChangeStep {
  constructor(ref, circleId, textId, oldColor, newColor) {
    this.ref = ref;
    this.circleId = "#" + circleId;
    this.textId = "#" + textId;
    this.oldColor = oldColor;
    this.newColor = newColor;
  }
  forward() {
    d3.select(this.ref).select(this.circleId).style("stroke", this.newColor);
    d3.select(this.ref).select(this.textId).style("fill", this.newColor);
  }
  backward() {
    d3.select(this.ref).select(this.circleId).style("stroke", this.oldColor);
    d3.select(this.ref).select(this.textId).style("fill", this.oldColor);
  }
}

export default class Kruskals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: [],
      running: false,
      steps: [],
      stepId: 0,
      stepTime: 1900,
      waitTime: 6000,
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

  initialize() {
    const width = 1500
		const height = 450

    var svg = d3.select(this.ref.current)
			.append("svg")
			.attr("width", "100%")
			.attr("height", height);
		
		svg.attr("perserveAspectRatio", "xMinYMid meet")
		svg.attr("viewBox", "0 0 " + width + " " + (height+250))
    
    let isWeighted = true;
    let isDirected = false;

    let graph = createDefaultGraph(this.ref, isWeighted, isDirected);
    this.setState({ graph: graph });
  }

  kruskals(graph, stepTime) {
    var i = 0;
    console.log(graph);
    var messages = [];
    var currentMessage = "";
    function createMessage(msg) {
      currentMessage = "<h1>" + msg + "</h1>";
    }
    var steps = [];
    var stepBuffer = [];
    function flushBuffer() {
      if (stepBuffer.length === 0) return;
      steps.push(stepBuffer);
      stepBuffer = [];
      messages.push(currentMessage);
    }
    function addStep(step) {
      stepBuffer.push(step);
    }
    var comparator = function (edgeId1, edgeId2) {
      return parseInt(graph.edges[edgeId1][2]) - parseInt(graph.edges[edgeId2][2]);
    };

    addStep(new EmptyStep());
    createMessage("We will construct the Minimum Spanning Tree (MST).");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("We will maintain a minimum priority queue of edges based on weight.");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Select all the edges of the graph and insert them in a priority queue.");
    flushBuffer();

    var pq = [];
    var nodeVisited = Array.from({ length: graph.numberOfNodes }, () => false);
    var edgeSelected = Array.from({ length: graph.numberOfEdges }, () => false);
    var nodes = Array.from({length: graph.numberOfNodes}, () => i++);

    let NodesConnected = new CreatingConn(nodes);
    //nodeVisited[0] = true;
    // addStep(
    //   new NodeColorChangeStep(
    //     this.ref.current,
    //     graph.nodeInfo[0].circle.attr.id,
    //     graph.nodeInfo[0].text.attr.id,
    //     localStorage.getItem('secondaryColor'),
    //     localStorage.getItem('accentColor')
    //   )
    // );
    // createMessage("We will start with node 0 to build the MST from.");
    // flushBuffer();

    // addStep(new EmptyStep());
    // createMessage("Insert all unvisited edges that are incident to node 0 into the queue.");
    // flushBuffer();

    // for (const edge of graph.adjacencyList[0]) {
    //   let [node1, node2, _weight, edgeId] = edge;

    //   addStep(
    //     new EdgeColorChangeStep(
    //       this.ref.current,
    //       graph.edgeInfo[edgeId].line.attr.id,
    //       graph.edgeInfo[edgeId].text.attr.id,
    //       localStorage.getItem('secondaryColor'),
    //       "#FFCE36"
    //     )
    //   );
    //   createMessage("Insert edge (" + node1 + ", " + node2 + ") into the queue.");
    //   flushBuffer();

    //   pq.push(edgeId);
    // }

    for (const edge of graph.edges){
      let [node1, node2, _weight, edgeId] = edge;
      pq.push(edgeId);
    }

    // pq.sort();
    console.log(pq);

    for (let i = 0; pq.length > 0 && i < 50; i++) {
      addStep(new EmptyStep());
      createMessage("Select the lowest weighted edge in the queue.");
      flushBuffer();

      pq.sort(comparator);

      let currentId = pq[0];
      let [node1, node2, _weight, edgeId] = graph.edges[currentId];
      [pq[0], pq[pq.length - 1]] = [pq[pq.length - 1], pq[0]];
      pq.pop();

      addStep(
        new EdgeColorChangeStep(
          this.ref.current,
          graph.edgeInfo[currentId].line.attr.id,
          graph.edgeInfo[currentId].text.attr.id,
          "grey",
          localStorage.getItem('accentColor')
        )
      );
      createMessage(
        "The lowest weighted edge in the queue is (" + node1 + ", " + node2 + ")."
      );
      flushBuffer();

      //console.log(nodes);

      if (nodeVisited[node1] && nodeVisited[node2]) {
        if(!NodesConnected.United(node1, node2)){
          NodesConnected.Connect(node1, node2);
          edgeSelected[edgeId] = true;

          addStep(new EmptyStep());
          createMessage(
            "Both nodes " +
              node1 +
              " and " +
              node2 +
              " have already been added to the MST.");
          flushBuffer();

          addStep(
            new EdgeColorChangeStep(
              this.ref.current,
              graph.edgeInfo[currentId].line.attr.id,
              graph.edgeInfo[currentId].text.attr.id,
              localStorage.getItem('accentColor'),
              "#1ACA1E"
            )
          );

          createMessage(
            "Include this edge and node " +
              node2 +
              " in the MST."
          );
          flushBuffer();

        } 
        else {
          addStep(new EmptyStep());
          createMessage(
            "Both nodes " +
              node1 +
              " and " +
              node2 +
              " have already been added to the MST.");
          flushBuffer();

          addStep(
            new EdgeColorChangeStep(
              this.ref.current,
              graph.edgeInfo[currentId].line.attr.id,
              graph.edgeInfo[currentId].text.attr.id,
              localStorage.getItem('accentColor'),
              localStorage.getItem('secondaryColor')
            )
          );
          createMessage("Ignore this edge.");
          flushBuffer();
          // these nodes are already connected, ignore the edge
          continue;
        }
      }

      if(nodeVisited[node1] == false && nodeVisited[node2] == false){
        nodeVisited[node1] = true;
        nodeVisited[node2] = true;
        edgeSelected[edgeId] = true;
        NodesConnected.Connect(node1, node2);

        addStep(new EmptyStep());
        createMessage(
          "Node " +
            node1 +
          " has not been added to the MST.");
        flushBuffer();

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[node1].circle.attr.id,
            graph.nodeInfo[node1].text.attr.id,
            localStorage.getItem('secondaryColor'),
            localStorage.getItem('accentColor')
          )
        );

        addStep(new EmptyStep());
        createMessage(
          "Node " +
            node2 +
          " has not been added to the MST.");
        flushBuffer();

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[node2].circle.attr.id,
            graph.nodeInfo[node2].text.attr.id,
            localStorage.getItem('secondaryColor'),
            localStorage.getItem('accentColor')
          )
        );

        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[currentId].line.attr.id,
            graph.edgeInfo[currentId].text.attr.id,
            localStorage.getItem('accentColor'),
            "#1ACA1E"
          )
        );

        createMessage(
          "Include this edge, node " +
            node1 + " and node " + node2 +
            " in the MST."
        );
        flushBuffer();
      }
      else if(nodeVisited[node1] == false && nodeVisited[node2] == true){
        nodeVisited[node1] = true;
        edgeSelected[edgeId] = true;
        NodesConnected.Connect(node1, node2);

        addStep(new EmptyStep());
        createMessage(
          "Node " +
            node1 +
          " has not been added to the MST.");
        flushBuffer();

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[node1].circle.attr.id,
            graph.nodeInfo[node1].text.attr.id,
            localStorage.getItem('secondaryColor'),
            localStorage.getItem('accentColor')
          )
        );

        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[currentId].line.attr.id,
            graph.edgeInfo[currentId].text.attr.id,
            localStorage.getItem('accentColor'),
            "#1ACA1E"
          )
        );

        createMessage(
          "Include this edge and node " +
            node1 +
            " in the MST."
        );
        flushBuffer();
      }
      else if(nodeVisited[node1] == true && nodeVisited[node2] == false){
        nodeVisited[node2] = true;
        edgeSelected[edgeId] = true;
        NodesConnected.Connect(node1, node2);

        addStep(new EmptyStep());
        createMessage(
          "Node " +
            node2 +
          " has not been added to the MST.");
        flushBuffer();

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[node2].circle.attr.id,
            graph.nodeInfo[node2].text.attr.id,
            localStorage.getItem('secondaryColor'),
            localStorage.getItem('accentColor')
          )
        );

        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[currentId].line.attr.id,
            graph.edgeInfo[currentId].text.attr.id,
            localStorage.getItem('accentColor'),
            "#1ACA1E"
          )
        );

        createMessage(
          "Include this edge and node " +
            node2 +
            " in the MST."
        );
        flushBuffer();
      }
      // var unvisitedNode = nodeVisited[node1] ? node2 : node1;
      // nodeVisited[unvisitedNode] = true;
      // edgeSelected[edgeId] = true;

      // addStep(new EmptyStep());
      // createMessage(
      //   "Node " +
      //     unvisitedNode +
      //   " has not been added to the MST.");
      // flushBuffer();

      // addStep(
      //   new EdgeColorChangeStep(
      //     this.ref.current,
      //     graph.edgeInfo[currentId].line.attr.id,
      //     graph.edgeInfo[currentId].text.attr.id,
      //     localStorage.getItem('accentColor'),
      //     "#1ACA1E"
      //   )
      // );
      // addStep(
      //   new NodeColorChangeStep(
      //     this.ref.current,
      //     graph.nodeInfo[unvisitedNode].circle.attr.id,
      //     graph.nodeInfo[unvisitedNode].text.attr.id,
      //     localStorage.getItem('secondaryColor'),
      //     localStorage.getItem('accentColor')
      //   )
      // );
      // createMessage(
      //   "Include this edge and node " +
      //     unvisitedNode +
      //     " in the MST."
      // );
      // flushBuffer();

      // addStep(new EmptyStep());
      // createMessage(
      //   "Insert all unvisited edges incident to node " + unvisitedNode + " into the queue."
      // );
      // flushBuffer();

      // for (const edge of graph.adjacencyList[unvisitedNode]) {
      //   let [from, to, _weight, edgeId] = edge;
      //   if (nodeVisited[to]) {
      //     continue;
      //   }
      //   addStep(
      //     new EdgeColorChangeStep(
      //       this.ref.current,
      //       graph.edgeInfo[edgeId].line.attr.id,
      //       graph.edgeInfo[edgeId].text.attr.id,
      //       localStorage.getItem('secondaryColor'),
      //       "#FFCE36"
      //     )
      //   );
      //   createMessage("Insert the edge (" + from + ", " + to + ") into the queue.");
      //   flushBuffer();
      //   pq.push(edgeId);
      // }
    }

    addStep(new EmptyStep());
    createMessage("The edges in the MST have been found!");
    flushBuffer();

    let mstEdges = "";
    for (let i = 0; i < graph.numberOfEdges; i++) {
      if (edgeSelected[i]) {
        mstEdges += "(" + graph.edges[i][0] + ", " + graph.edges[i][1] + "), ";
      }
    }

    mstEdges = mstEdges.substring(0, mstEdges.length - 2);

    addStep(new EmptyStep());
    createMessage("The edges in the MST are: " + mstEdges + ".");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Finished Kruskal's!");
    flushBuffer();

    console.log(steps);
    console.log(messages);

    this.setState({ steps: steps, messages: messages });
  }

  turnOffRunning() {
    this.setState({ running: false });
  }

  forward() {
    console.log("FORWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId === this.state.steps.length) return;

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward();
    // this.state.steps[this.state.stepId].forward();
    console.log(this.state.steps[this.state.stepId]);
    this.setState({ stepId: this.state.stepId + 1 });

    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  backward() {
    console.log("BACKWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId - 1;
    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Kruskal's!</h1>" : this.state.messages[stepId - 1];
    for (const step of this.state.steps[stepId]) step.backward();
    // this.state.steps[--stepId].backward();
    this.setState({stepId: stepId});
    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  run() {
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }
    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward();
    // this.state.steps[this.state.stepId].forward();
    this.setState({ stepId: this.state.stepId + 1 });
    d3.timeout(this.run, this.props.waitTime);
  }

  play() {
    console.log("PLAY CLICKED");
    if (this.state.running) return;
    this.setState({ running: true });
    this.run();
  }

  pause() {
    console.log("PAUSE CLICKED");
    this.setState({ running: false });
  }

  restart() {
    console.log("RESTART CLICKED");
    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId;
    document.getElementById("message").innerHTML = "<h1>Welcome to Kruskal's!</h1>";
    while (stepId - 1 >= 0) {
      for (const step of this.state.steps[--stepId]) step.backward();
      // this.state.steps[--stepId].backward();
      d3.timeout(this.turnOffRunning, this.props.waitTime);
    }

    this.setState({ running: false });
    this.setState({ stepId: 0 });
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.size !== prevState.size) {
      console.log("SIZE CHANGED");
      this.initialize();
    } else if (this.state.graph !== prevState.graph) {
      this.kruskals(this.state.graph);
      console.log("Sorted");
    } else if (this.state.running !== prevState.running) {
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
          <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
        </div>
        <div class="center-screen">
          <span id="message">
            <h1 id="message-pane">Welcome to Kruskal's!</h1>
          </span>
        </div>
        <div ref={this.ref} class="center-screen"></div>
        <div class="parent-svg">
					<div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"kruskals"} lines={this.props.lines} 
								handleLinesChange={this.props.handleLinesChange} code={this.props.code} 
								handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} 
								handleCodeStepsChange={this.handleCodeStepsChange}>
					</Pseudocode>
				</div>
      </div>
    );
  }
}