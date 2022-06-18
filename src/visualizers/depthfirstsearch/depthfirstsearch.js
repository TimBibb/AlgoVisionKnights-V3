import React from "react";
import * as d3 from "d3";
import "./depthfirstsearch.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";

// returns a random number in the range [lo, hi)
function randInRange(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

class EmptyStep {
  forward() {}
  backward() {}
}

class EdgeColorChangeStep {
  constructor(ref, edgeId, oldColor, newColor) {
    this.ref = ref;
    this.edgeId = "#" + edgeId;
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

class StackChangeStep {
  constructor(ref, stackId, oldVisibility, newVisibility) {
    this.ref = ref;
    this.stackId = "#" + stackId;
    this.oldVisibility = oldVisibility;
    this.newVisibility = newVisibility;
  }
  forward() {
    d3.select(this.ref).select(this.stackId).attr("visibility", this.newVisibility);
  }
  backward() {
    d3.select(this.ref).select(this.stackId).attr("visibility", this.oldVisibility);
  }
}

export default class DepthFirstSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: [],
      steps: [],
      stack: [],
      stepTime: 1900,
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

    let isWeighted = false;
    let isDirected = false;

    let graph = createDefaultGraph(this.ref, isWeighted, isDirected);
    let stack = [];
    stack.push(new Number(this.ref, "stack", "7%", "10%", "Stack", "grey", "visible"));
    
    this.setState({graph: graph, stack: stack});
  }

  depthfirstsearch(graph, stack) {
    console.log(graph);
    var messages = [];
    var currentMessage = "";
    function createMessage(msg) {
      currentMessage = "<h1>" + msg + "</h1>";
    }
    var steps = [];
    var stepBuffer = [];
    var numsInStack = 0;
    var nums = 0;
    let numStack = [];

    function flushBuffer() {
      if (stepBuffer.length === 0) return;
      steps.push(stepBuffer);
      stepBuffer = [];
      messages.push(currentMessage);
    }

    function addStep(step) {
      stepBuffer.push(step);
    }

    var nodeVisited = Array.from({ length: graph.numberOfNodes }, () => false);
    let head = randInRange(0, 6);

    let nodeStack = [];
    let edgeStack = [];
    addStep(new EmptyStep());
    createMessage("Node " + head + " was randomly selected as the start of our search.");
    flushBuffer();

    console.log("Currently visiting: " + head);
    nodeVisited[head] = true;
    addStep(
      new NodeColorChangeStep(
        this.ref.current,
        graph.nodeInfo[head].circle.attr.id,
        graph.nodeInfo[head].text.attr.id,
        "gray",
        "yellow"
      )
    );
    createMessage("Currently at node " + head + ".");
    flushBuffer();

    addStep(
      new EmptyStep()
    );
    createMessage("Adding unvisited adjacent nodes to be searched into the stack.");
    flushBuffer();

    for (let node = 0; node < graph.adjacencyList[head].length; node++) {
      if (nodeVisited[graph.adjacencyList[head][node][1]] === false) {
        nodeStack.push(graph.adjacencyList[head][node][1]);
        edgeStack.push(graph.adjacencyList[head][node][2]);
        let ys = 20 + (numsInStack*10);
        stack.push(new Number(this.ref, "stack" + nums, "7%", ys + "%", graph.adjacencyList[head][node][1], "grey", "hidden"));
        numStack.push(nums);
        addStep(
          new StackChangeStep(
            this.ref.current,
            "stack" + nums,
            "hidden",
            "visible"
          )
        );
        createMessage("Adding " + graph.adjacencyList[head][node][1] + " to the stack.");
        flushBuffer();
        numsInStack++;
        nums++;
      }
    }
    
    while (nodeStack.length !== 0) {
      let s = nodeStack.pop();
      let e = edgeStack.pop();
      let n = numStack.pop();
      addStep(
        new EmptyStep()
      );
      createMessage("Checking the last node added to the stack.");
      flushBuffer();

      addStep(
        new StackChangeStep(
          this.ref.current,
          "stack" + n,
          "visible",
          "hidden"
        )
      );
      createMessage("Removing " + s + " from the stack.");
      flushBuffer();
      numsInStack--;

      if (nodeVisited[s] === false)
      {
        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[e].attr.id,
            "gray",
            "yellow"
          )
        );
        createMessage("Traveling to node " + s + ".");
        flushBuffer();

        nodeVisited[s] = true;
        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[s].circle.attr.id,
            graph.nodeInfo[s].text.attr.id,
            "gray",
            "yellow"
          )
        );
        createMessage("Marking node " + s + " as visited.");
        flushBuffer();
      }
      else
      {
        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[e].attr.id,
            "gray",
            "yellow"
          )
        );
        createMessage("Traveling to node " + s + ".");
        flushBuffer();

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[s].circle.attr.id,
            graph.nodeInfo[s].text.attr.id,
            "yellow",
            "white"
          )
        );
        createMessage("Node " + s + " has already been visited.");
        flushBuffer();

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[s].circle.attr.id,
            graph.nodeInfo[s].text.attr.id,
            "white",
            "yellow"
          )
        );
        createMessage("Node " + s + " has already been visited.");
        flushBuffer();

        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[e].attr.id,
            "yellow",
            "black"
          )
        );
        createMessage("Traveling back to parent node.");
        flushBuffer();
      }

      addStep(
        new EmptyStep()
      );
      createMessage("Adding unvisited adjacent nodes to be searched into the stack.");
      flushBuffer();

      for (let node = 0; node < graph.adjacencyList[s].length; node++) {
        if (nodeVisited[graph.adjacencyList[s][node][1]] === false) {
          nodeStack.push(graph.adjacencyList[s][node][1]);
          edgeStack.push(graph.adjacencyList[s][node][2]);
          let ys = 20 + (numsInStack*10);
          stack.push(new Number(this.ref, "stack" + nums, "7%", ys + "%", graph.adjacencyList[s][node][1], "grey", "hidden"));
          numStack.push(nums);
          addStep(
            new StackChangeStep(
              this.ref.current,
              "stack" + nums,
              "hidden",
              "visible"
            )
          );
          createMessage("Adding " + graph.adjacencyList[s][node][1] + " to the stack.");
          flushBuffer();
          numsInStack++;
          nums++;
        }
      }
    }

    addStep(new EmptyStep());
    createMessage("The stack is empty.");
    flushBuffer();

    addStep(new EmptyStep());
    createMessage("Finished Depth First Search!");
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

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward();
    // this.state.steps[this.state.stepId].forward();
    console.log(this.state.steps[this.state.stepId]);
    this.setState({ stepId: this.state.stepId + 1 });

    d3.timeout(this.turnOffRunning, this.state.waitTime);
  }
  
  backward() {
    console.log("BACKWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId - 1;

    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Depth First Search (DFS)!</h1>" : this.state.messages[stepId - 1];
    for (const step of this.state.steps[stepId]) step.backward();
    // this.state.steps[--stepId].backward();
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
    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId;
    document.getElementById("message").innerHTML = "<h1>Welcome to Depth First Search (DFS)!</h1>";
    while (stepId - 1 >= 0) {
      for (const step of this.state.steps[--stepId]) step.backward();
      // this.state.steps[--stepId].backward();
      d3.timeout(this.turnOffRunning, this.state.waitTime);
    }

    this.setState({ running: false });
    this.setState({ stepId: 0 });
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.graph !== prevState.graph) {
      this.depthfirstsearch(this.state.graph, this.state.stack);
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
				</div>
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Depth First Search (DFS)!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}