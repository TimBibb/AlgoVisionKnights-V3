import React from "react";
import * as d3 from "d3";
import "./fibonaccisequence.css";
import LabeledNode from "../../foundation/graph/LabeledNode";
import UndirectedEdge from "../../foundation/graph/UndirectedEdge";
import "../css/button.css";
import "../css/messages.css";

class EmptyStep {
  forward() {}
  backward() {}
}

class EdgeColorChangeStep {
  constructor(ref, edgeId, oldColor, newColor) {
    this.ref = ref;
    this.edgeId = "#edge" + edgeId;
    this.oldColor = oldColor;
    this.newColor = newColor;
  }
  forward() {
    d3.select(this.ref).select(this.edgeId).style("stroke", this.newColor);
  }
  backward() {
    d3.select(this.ref).select(this.edgeId).style("stroke", this.oldColor);
  }
}

class NodeColorChangeStep {
  constructor(ref, circleId, textId, oldColor, newColor) {
    this.ref = ref;
    this.circleId = "#node" + circleId;
    this.textId = "#label" + textId;
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

class NodeVisibilityChangeStep {
  constructor(ref, circleId, textId, oldVisibility, newVisibility) {
    this.ref = ref;
    this.circleId = "#node" + circleId;
    this.textId = "#label" + textId;
    this.oldVisibility = oldVisibility;
    this.newVisibility = newVisibility;
  }
  forward() {
    d3.select(this.ref).select(this.circleId).attr("visibility", this.newVisibility);
    d3.select(this.ref).select(this.textId).attr("visibility", this.newVisibility);
  }
  backward() {
    d3.select(this.ref).select(this.circleId).attr("visibility", this.oldVisibility);
    d3.select(this.ref).select(this.textId).attr("visibility", this.oldVisibility);
  }
}

class EdgeVisibilityChangeStep {
  constructor(ref, edgeId, oldVisibility, newVisibility) {
    this.ref = ref;
    this.edgeId = "#edge" + edgeId;
    this.oldVisibility = oldVisibility;
    this.newVisibility = newVisibility;
  }
  forward() {
    d3.select(this.ref).select(this.edgeId).attr("visibility", this.newVisibility);
  }
  backward() {
    d3.select(this.ref).select(this.edgeId).attr("visibility", this.oldVisibility);
  }
}

function createFibGraph(ref) {
  let numberOfNodes = 9;
  let numberOfEdges = 8;
  var edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [1, 5],
    [0, 6],
    [6, 7],
    [6, 8]
  ];
  let graph = {
    numberOfNodes: numberOfNodes,
    numberOfEdges: numberOfEdges,
    edges: edges,
    edgeInfo: [],
    nodeInfo: [],
  };
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 0,
    47.5 + "%",
    13.5 + "%",
    27.5 + "%",
    17.5 + "%",
    "hidden"
  ));
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 1,
    22.5 + "%",
    22.5 + "%",
    14.5 + "%",
    27.5 + "%",
    "hidden"
  ));
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 2,
    9.5 + "%",
    32.5 + "%",
    8.5 + "%",
    37.5 + "%",
    "hidden"
  ));
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 3,
    14.5 + "%",
    32.5 + "%",
    15.5 + "%",
    37.5 + "%",
    "hidden"
  ));
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 4,
    27.5 + "%",
    22.5 + "%",
    34.5 + "%",
    27.5 + "%",
    "hidden"
  ));
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 5,
    52.5 + "%",
    12.5 + "%",
    72.5 + "%",
    17.5 + "%",
    "hidden"
  ));
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 6,
    72.5 + "%",
    22.5 + "%",
    64.5 + "%",
    27.5 + "%",
    "hidden"
  ));
  graph.edgeInfo.push(new UndirectedEdge(
    ref,
    "edge" + 7,
    77.5 + "%",
    22.5 + "%",
    84.5 + "%",
    27.5 + "%",
    "hidden"
  ));

  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node0",
    "label0",
    50 + "%",
    10 + "%",
    "f4",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node1",
    "label1",
    25 + "%",
    20 + "%",
    "f3",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node2",
    "label2",
    12 + "%",
    30 + "%",
    "f2",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node3",
    "label3",
    6 + "%",
    40 + "%",
    "f1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node4",
    "label4",
    18 + "%",
    40 + "%",
    "f0",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node5",
    "label5",
    37 + "%",
    30 + "%",
    "f1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node6",
    "label6",
    75 + "%",
    20 + "%",
    "f2",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node7",
    "label7",
    62 + "%",
    30 + "%",
    "f1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node8",
    "label8",
    87 + "%",
    30 + "%",
    "f0",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node9",
    "label9",
    50 + "%",
    10 + "%",
    "3",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node10",
    "label10",
    25 + "%",
    20 + "%",
    "2",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node11",
    "label11",
    12 + "%",
    30 + "%",
    "1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node12",
    "label12",
    6 + "%",
    40 + "%",
    "1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node13",
    "label13",
    18 + "%",
    40 + "%",
    "0",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node14",
    "label14",
    37 + "%",
    30 + "%",
    "1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node15",
    "label15",
    75 + "%",
    20 + "%",
    "1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node16",
    "label16",
    62 + "%",
    30 + "%",
    "1",
    "hidden",
    "gray"
  ));
  graph.nodeInfo.push(new LabeledNode(
    ref,
    "node17",
    "label17",
    87 + "%",
    30 + "%",
    "0",
    "hidden",
    "gray"
  ));

  return graph;
}

export default class FibonacciSequence extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: [],
      steps: [],
      stack: [],
      stepTime: 2900,
      waitTime: 2000,
      running: false,
      stepId: 0,
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
    d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "750px");

    let graph = createFibGraph(this.ref);

    this.setState({graph: graph})
  }

  fibonaccisequence(graph, stack) {
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

    addStep(new EmptyStep());
    createMessage("For example, we will find the 4th Fibonacci number.");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 0, 0, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 0, 0, "gray", "white"));
    createMessage("We begin by calling fib(4).");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Since 4 is not a base case, we use the formula fib(n) = fib(n-1) + fib(n-2).")
    flushBuffer();

    addStep(new NodeColorChangeStep(this.ref.current, 0, 0, "white", "gray"));
    addStep(new EdgeVisibilityChangeStep(this.ref.current, 0, "hidden", "visible"));
    addStep(new EdgeColorChangeStep(this.ref.current, 0, "gray", "white"));
    createMessage("Calculating fib(n-1).");
    flushBuffer();

    addStep(new EdgeColorChangeStep(this.ref.current, 0, "white", "gray"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 1, 1, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 1, 1, "gray", "white"));
    createMessage("fib(n-1) = fib(3)");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Since 3 is not a base case, we use the formula fib(n) = fib(n-1) + fib(n-2).");
    flushBuffer();

    addStep(new NodeColorChangeStep(this.ref.current, 1, 1, "white", "gray"));
    addStep(new EdgeVisibilityChangeStep(this.ref.current, 1, "hidden", "visible"));
    addStep(new EdgeColorChangeStep(this.ref.current, 1, "gray", "white"));
    createMessage("Calculating fib(n-1).");
    flushBuffer();

    addStep(new EdgeColorChangeStep(this.ref.current, 1, "white", "gray"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 2, 2, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 2, 2, "gray", "white"));
    createMessage("fib(n-1) = fib(2)");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Since 2 is not a base case, we use the formula fib(n) = fib(n-1) + fib(n-2).");
    flushBuffer();

    addStep(new NodeColorChangeStep(this.ref.current, 2, 2, "white", "gray"));
    addStep(new EdgeVisibilityChangeStep(this.ref.current, 2, "hidden", "visible"));
    addStep(new EdgeColorChangeStep(this.ref.current, 2, "gray", "white"));
    createMessage("Calculating fib(n-1).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 3, 3, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 3, 3, "gray", "white"));
    addStep(new EdgeColorChangeStep(this.ref.current, 2, "white", "gray"));
    createMessage("fib(n-1) = fib(1)");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 3, 3, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 12, 12, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 12, 12, "gray", "white"));
    createMessage("Since 1 is a base case, we return its value of 1.");
    flushBuffer();

    addStep(new EdgeVisibilityChangeStep(this.ref.current, 3, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 12, 12, "white", "gray"));
    addStep(new EdgeColorChangeStep(this.ref.current, 3, "gray", "white"));
    createMessage("Calculating fib(n-2).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 4, 4, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 4, 4, "gray", "white"));
    addStep(new EdgeColorChangeStep(this.ref.current, 3, "white", "gray"));
    createMessage("fib(n-2) = fib(0)");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 4, 4, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 13, 13, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 13, 13, "gray", "white"));
    createMessage("Since 0 is a base case, we return its value of 0.");
    flushBuffer();

    addStep(new EmptyStep());
    addStep(new NodeColorChangeStep(this.ref.current, 12, 12, "gray", "white"));
    createMessage("Using the values of fib(1) and fib(0), we can calculate fib(2).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 2, 2, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 11, 11, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 11, 11, "gray", "white"));
    addStep(new NodeColorChangeStep(this.ref.current, 12, 12, "white", "gray"));
    addStep(new NodeColorChangeStep(this.ref.current, 13, 13, "white", "gray"));
    createMessage("1 + 0 = 1");
    flushBuffer();

    addStep(new EdgeVisibilityChangeStep(this.ref.current, 4, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 11, 11, "white", "gray"));
    addStep(new EdgeColorChangeStep(this.ref.current, 4, "gray", "white"));
    createMessage("Calculating fib(n-2).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 5, 5, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 5, 5, "gray", "white"));
    addStep(new EdgeColorChangeStep(this.ref.current, 4, "white", "gray"));
    createMessage("fib(n-2) = fib(1)");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 5, 5, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 14, 14, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 14, 14, "gray", "white"));
    createMessage("Since 1 is a base case, we return its value of 1.");
    flushBuffer();

    addStep(new EmptyStep());
    addStep(new NodeColorChangeStep(this.ref.current, 11, 11, "gray", "white"));
    createMessage("Using the values of fib(2) and fib(1), we can calculate fib(3).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 1, 1, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 10, 10, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 10, 10, "gray", "white"));
    addStep(new NodeColorChangeStep(this.ref.current, 11, 11, "white", "gray"));
    addStep(new NodeColorChangeStep(this.ref.current, 14, 14, "white", "gray"));
    createMessage("1 + 1 = 2");
    flushBuffer();

    addStep(new EdgeVisibilityChangeStep(this.ref.current, 5, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 10, 10, "white", "gray"));
    addStep(new EdgeColorChangeStep(this.ref.current, 5, "gray", "white"));
    createMessage("Calculating fib(n-2).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 6, 6, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 6, 6, "gray", "white"));
    addStep(new EdgeColorChangeStep(this.ref.current, 5, "white", "gray"));
    createMessage("fib(n-2) = fib(2)");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Since 2 is not a base case, we use the formula fib(n) = fib(n-1) + fib(n-2).");
    flushBuffer();

    addStep(new EdgeVisibilityChangeStep(this.ref.current, 6, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 6, 6, "white", "gray"));
    addStep(new EdgeColorChangeStep(this.ref.current, 6, "gray", "white"));
    createMessage("Calculating fib(n-1).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 7, 7, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 7, 7, "gray", "white"));
    addStep(new EdgeColorChangeStep(this.ref.current, 6, "white", "gray"));
    createMessage("fib(n-1) = fib(1)");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 7, 7, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 16, 16, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 16, 16, "gray", "white"));
    createMessage("Since 1 is a base case, we return its value of 1.");
    flushBuffer();

    addStep(new EdgeVisibilityChangeStep(this.ref.current, 7, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 16, 16, "white", "gray"));
    addStep(new EdgeColorChangeStep(this.ref.current, 7, "gray", "white"));
    createMessage("Calculating fib(n-2).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 8, 8, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 8, 8, "gray", "white"));
    addStep(new EdgeColorChangeStep(this.ref.current, 7, "white", "gray"));
    createMessage("fib(n-2) = fib(0)");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 8, 8, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 17, 17, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 17, 17, "gray", "white"));
    createMessage("Since 0 is a base case, we return its value of 0.");
    flushBuffer();

    addStep(new EmptyStep());
    addStep(new NodeColorChangeStep(this.ref.current, 16, 16, "gray", "white"));
    createMessage("Using the values of fib(1) and fib(0), we can calculate fib(2).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 6, 6, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 15, 15, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 15, 15, "gray", "white"));
    addStep(new NodeColorChangeStep(this.ref.current, 16, 16, "white", "gray"));
    addStep(new NodeColorChangeStep(this.ref.current, 17, 17, "white", "gray"));
    createMessage("1 + 0 = 1");
    flushBuffer();

    addStep(new EmptyStep());
    addStep(new NodeColorChangeStep(this.ref.current, 10, 10, "gray", "white"));
    createMessage("Using the values of fib(3) and fib(2), we can calculate fib(4).");
    flushBuffer();

    addStep(new NodeVisibilityChangeStep(this.ref.current, 0, 0, "visible", "hidden"));
    addStep(new NodeVisibilityChangeStep(this.ref.current, 9, 9, "hidden", "visible"));
    addStep(new NodeColorChangeStep(this.ref.current, 9, 9, "gray", "white"));
    addStep(new NodeColorChangeStep(this.ref.current, 15, 15, "white", "gray"));
    addStep(new NodeColorChangeStep(this.ref.current, 10, 10, "white", "gray"));
    createMessage("2 + 1 = 3");
    flushBuffer();

    addStep(new EmptyStep());
    addStep(new NodeColorChangeStep(this.ref.current, 9, 9, "white", "gray"));
    createMessage("The Fibonacci function has completed, returning fib(4) = 3.");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Finished Fibonacci Sequence!");
    flushBuffer();

    this.setState({steps: steps, messages: messages});
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

    d3.timeout(this.turnOffRunning, this.state.waitTime);
  }

  backward() {
    console.log("BACKWARD CLICKED");
		if (this.state.running) this.setState({running: false});
		if (this.state.stepId - 1 < 0) return;

		var stepId = this.state.stepId - 1;

		for (const step of this.state.steps[stepId]) step.backward();
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Fibonacci Sequence!</h1>" : this.state.messages[stepId - 1];
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.state.waitTime);
  }

  run() {
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }
    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward();
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

		d3.select(this.ref.current).select("svg").remove();
    document.getElementById("message").innerHTML = "<h1>Welcome to Fibonacci Sequence!</h1>";

    this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.graph !== prevState.graph) {
      this.fibonaccisequence(this.state.graph, this.state.stack);
      console.log("Sorted");
    } else if (this.state.running !== prevState.running) {
      this.run();
      console.log("We ran");
    }
    // For reset
    else if (this.state.steps.length !== prevState.steps.length && this.state.steps.length === 0) {
			console.log("We're restarting");
			this.initialize();
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
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Fibonacci Sequence!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
} 