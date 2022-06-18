import React from "react";
import * as d3 from "d3";
import "./bellmanford.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import "../css/button.css";
import "../css/messages.css";

class EmptyStep {
  forward(svg) {}
  backward(svg) {}
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
    } else if (this.oldParentID !== -1) {
      svg.select(this.pID).text("Parent: " + this.oldParentID);
    }

    if (this.oldDist === -1 && this.newDist !== -1) {
      svg.select(this.dID).text("Distance: ∞");
    } else if (this.oldDist !== -1) {
      svg.select(this.dID).text("Distance: " + this.oldDist);
    }
  }
}

class ChangeDirectedEdgeColorStep {
  constructor(edge, newColor, oldColor) {
    this.edge = edge;
    this.newColor = newColor;
    this.oldColor = oldColor;
  }
  forward(svg) {
    svg.select("#" + this.edge.wing1.attr.id).style("stroke", this.newColor);
    svg.select("#" + this.edge.wing2.attr.id).style("stroke", this.newColor);
    svg.select("#" + this.edge.line.attr.id).style("stroke", this.newColor);
    svg.select("#" + this.edge.text.attr.id).style("fill", this.newColor);
  }
  backward(svg) {
    svg.select("#" + this.edge.wing1.attr.id).style("stroke", this.oldColor);
    svg.select("#" + this.edge.wing2.attr.id).style("stroke", this.oldColor);
    svg.select("#" + this.edge.line.attr.id).style("stroke", this.oldColor);
    svg.select("#" + this.edge.text.attr.id).style("fill", this.oldColor);
  }
}

export default class BellmanFord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: [],
      running: false,
      steps: [],
      stepId: 0,
      stepTime: 0,
      waitTime: 5000,
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
    var svg = d3
      .select(this.ref.current)
      .append("svg")
      .attr("width", "1500px")
      .attr("height", "650px");

    let isWeighted = true;
    let isDirected = true;

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

      var pTxt = svg
        .append("text")
        .text("Parent: N/A")
        .attr("id", "pTxt" + i)
        .style("font-family", "Merriweather")
        .attr("font-weight", "bold")
        .style("font-size", "26px")
        .style("fill", "white");

      var dTxt = svg
        .append("text")
        .text("Distance: ∞")
        .attr("id", "dTxt" + i)
        .style("font-family", "Merriweather")
        .attr("font-weight", "bold")
        .style("font-size", "26px")
        .style("fill", "white");

      if (i === 0) {
        pTxt
          .attr("y", parseInt(node.attr("cy")) - 12 + "%")
          .attr("x", parseInt(node.attr("cx")) - 14 + "%");
        dTxt
          .attr("y", parseInt(node.attr("cy")) - 8 + "%")
          .attr("x", parseInt(node.attr("cx")) - 14 + "%");
      } else if (i === 1 || i === 3) {
        pTxt
          .attr("y", parseInt(node.attr("cy")) - 12 + "%")
          .attr("x", parseInt(node.attr("cx")) - 6 + "%");
        dTxt
          .attr("y", parseInt(node.attr("cy")) - 8 + "%")
          .attr("x", parseInt(node.attr("cx")) - 6 + "%");
      } else if (i === 2 || i === 4) {
        pTxt
          .attr("y", parseInt(node.attr("cy")) + 11 + "%")
          .attr("x", parseInt(node.attr("cx")) - 6 + "%");
        dTxt
          .attr("y", parseInt(node.attr("cy")) + 15 + "%")
          .attr("x", parseInt(node.attr("cx")) - 6 + "%");
      } else if (i === 5) {
        pTxt
          .attr("y", parseInt(node.attr("cy")) - 12 + "%")
          .attr("x", parseInt(node.attr("cx")) + 2 + "%");
        dTxt
          .attr("y", parseInt(node.attr("cy")) - 8 + "%")
          .attr("x", parseInt(node.attr("cx")) + 2 + "%");
      }
    }
    this.setState({ graph: graph });
  }

  prims(graph) {
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

    createMessage("We will find the shortest distance from a source node to all other nodes.");
    addStep(new EmptyStep());
    flushBuffer();

    createMessage(
      "We will also find the parents, where the shortest distance is coming from."
    );
    addStep(new EmptyStep());
    flushBuffer();

    createMessage(
      "Our source node will be node 0. With this, it takes 0 distance to reach itself."
    );
    addStep(new SetInfoStep(0, -1, -1, -1, 0));
    // addStep(new ChangeTextStep(dists[0].attr.id, 0, "∞"));
    flushBuffer();

    // dists[0].value = 0;
    graph.distances[0] = 0;

    createMessage("All other distances will be set to ∞.");
    addStep(new EmptyStep());
    flushBuffer();

    createMessage("We will loop through all edges up to the (number of nodes - 1) times.");
    addStep(new EmptyStep());
    flushBuffer();

    for (let iterations = 0; iterations < graph.numberOfNodes - 1; iterations++) {
      createMessage("Starting iteration " + (iterations + 1) + ".");
      addStep(new EmptyStep());
      flushBuffer();

      console.log(iterations);
      for (let edgeId = 0; edgeId < graph.numberOfEdges; edgeId++) {
        let [node1, node2, weight, _edgeId] = graph.edges[edgeId];

        createMessage("Let's look at the edge " + node1 + " → " + node2 + ".");
        addStep(new ChangeDirectedEdgeColorStep(graph.edgeInfo[edgeId], "white", "gray"));
        flushBuffer();

        // let dist1 = parseInt(dists[node1].value);
        // let dist2 = parseInt(dists[node2].value);
        let dist1 = parseInt(graph.distances[node1]);
        let dist2 = parseInt(graph.distances[node2]);

        if (graph.distances[node1] === -1) {
          createMessage(
            "Since the source of the edge has an infinite value, no update can be made."
          );
          addStep(new EmptyStep());
          flushBuffer();
        } else {
          var dist2string = dist2 === -1 ? "∞" : dist2;

          if (dist1 !== -1 && (dist2 === -1 || dist1 + weight < dist2)) {
            createMessage(
              `Since ${dist1} + ${weight} = ${
                dist1 + weight
              } < ${dist2string}, we can update the distance and parent at node ${node2}.`
            );
            addStep(
              new SetInfoStep(
                node2,
                graph.parents[node2],
                node1,
                graph.distances[node2],
                dist1 + weight
              )
            );
            flushBuffer();

            graph.distances[node2] = dist1 + weight;
            graph.parents[node2] = node1;
          } else {
            createMessage(
              `Since ${dist1} + ${weight} = ${
                dist1 + weight
              } ≥ ${dist2string}, we don't update the distance or parent at node ${node2}.`
            );
            addStep(new EmptyStep());
            flushBuffer();
          }
        }
        addStep(new ChangeDirectedEdgeColorStep(graph.edgeInfo[edgeId], "gray", "white"));
        flushBuffer();
      }
    }

    createMessage("We have now found the shortest distances from node 0 to all other nodes!");
    addStep(new EmptyStep());
    flushBuffer();

    createMessage("Finished Bellman-Ford!");
    addStep(new EmptyStep());
    flushBuffer();

    this.setState({ steps: steps, messages: messages });
  }

  turnOffRunning() {
    this.setState({ running: false });
  }

  forward() {
    console.log("FORWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId === this.state.steps.length) return;

    let svg = d3.select(this.ref.current).select("svg");

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward(svg);

    this.setState({ stepId: this.state.stepId + 1 });

    d3.timeout(this.turnOffRunning, this.state.waitTime);
  }

  backward() {
    console.log("BACKWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId - 1 < 0) return;

    let svg = d3.select(this.ref.current).select("svg");

    var stepId = this.state.stepId - 1;
    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Bellman Ford!</h1>" : this.state.messages[stepId - 1];
    for (const step of this.state.steps[stepId]) step.backward(svg);

    this.setState({ stepId: stepId });
    d3.timeout(this.turnOffRunning, this.state.waitTime);
  }

  run() {
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }

    let svg = d3.select(this.ref.current).select("svg");

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward(svg);

    this.setState({ stepId: this.state.stepId + 1 });
    d3.timeout(this.run, this.state.waitTime);
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

    let svg = d3.select(this.ref.current).select("svg");

    var stepId = this.state.stepId;
    document.getElementById("message").innerHTML = "<h1>Welcome to Bellman Ford!</h1>";
    while (stepId - 1 >= 0) {
      for (const step of this.state.steps[--stepId]) step.backward(svg);
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
      this.prims(this.state.graph);
      console.log("Sorted");
    } else if (this.state.running !== prevState.running) {
      this.run();
      console.log("We ran");
    }
  }

  render() {
    return (
      <div>
        <div class="center-screen">
          <button class="button" onClick={this.play}>Play</button>
          <button class="button" onClick={this.pause}>Pause</button>
          <button class="button" onClick={this.restart}>Restart</button>
          <button class="button" onClick={this.backward}>Step Backward</button>
          <button class="button" onClick={this.forward}>Step Forward</button>
        </div>
        <div class="center-screen">
          <span id="message">
            <h1>Welcome to Bellman Ford!</h1>
          </span>
        </div>
        <div ref={this.ref} class="center-screen"></div>
      </div>
    );
  }
}
