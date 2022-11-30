import React from "react";
import * as d3 from "d3";
import "./depthfirstsearch.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { Pseudocode } from "../../components/pseudocode/Pseudocode";
import { HighlightLineStep } from "../../components/pseudocode/Pseudocode";

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
      interval: null,
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
		const height = 550

    var svg = d3.select(this.ref.current)
			.append("svg")
			.attr("width", "100%")
			.attr("height", height);
		
		svg.attr("perserveAspectRatio", "xMinYMid meet")
		svg.attr("viewBox", "0 0 " + width + " " + (height+250))
    
    let isWeighted = false;
    let isDirected = false;

    let graph = createDefaultGraph(this.ref, isWeighted, isDirected);
    let stack = [];
    stack.push(new Number(this.ref, "stack", "7%", "10%", "Stack", localStorage.getItem('secondaryColor'), "visible"));
    
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

    var pseudocodeArr = [];

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

    addStep(new EmptyStep());
    createMessage("Welcome to Depth First Search!");
    flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(0, this.props.lines))

    let nodeStack = [];
    let edgeStack = [];
    addStep(new EmptyStep());
    createMessage("Node " + head + " was randomly selected as the start of our search.");
    flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(4, this.props.lines))

    console.log("Currently visiting: " + head);
    nodeVisited[head] = true;
    addStep(
      new NodeColorChangeStep(
        this.ref.current,
        graph.nodeInfo[head].circle.attr.id,
        graph.nodeInfo[head].text.attr.id,
        "gray",
        localStorage.getItem('accentColor')
      )
    );
    createMessage("Currently at node " + head + ".");
    flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(5, this.props.lines))

    addStep(
      new EmptyStep()
    );
    createMessage("Adding unvisited adjacent nodes to be searched into the stack.");
    flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(5, this.props.lines))

    for (let node = 0; node < graph.adjacencyList[head].length; node++) {
      addStep(
        new EmptyStep()
      );
      createMessage("Checking the next node.");
      flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(6, this.props.lines))
      if (nodeVisited[graph.adjacencyList[head][node][1]] === false) {
        addStep(
          new EmptyStep()
        );
        createMessage("Checking if we have visited the current node.");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(7, this.props.lines))

        nodeStack.push(graph.adjacencyList[head][node][1]);
        edgeStack.push(graph.adjacencyList[head][node][2]);
        let ys = 20 + (numsInStack*10);
        stack.push(new Number(this.ref, "stack" + nums, "7%", ys + "%", graph.adjacencyList[head][node][1], localStorage.getItem('secondaryColor'), "hidden"));
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
        pseudocodeArr.push(new HighlightLineStep(8, this.props.lines))

        addStep(
          new EmptyStep()
        );
        createMessage("Adding " + graph.adjacencyList[head][node][1] + " to the stack.");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(9, this.props.lines))

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
      pseudocodeArr.push(new HighlightLineStep(12, this.props.lines))

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
      pseudocodeArr.push(new HighlightLineStep(12, this.props.lines))
      numsInStack--;

      if (nodeVisited[s] === false)
      {
        addStep(
          new EmptyStep()
        );
        createMessage("Checking if the recently popped node was visited.");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(15, this.props.lines))

        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[e].attr.id,
            "gray",
            localStorage.getItem('accentColor')
          )
        );
        createMessage("Traveling to node " + s + ".");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(16, this.props.lines))

        nodeVisited[s] = true;
        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[s].circle.attr.id,
            graph.nodeInfo[s].text.attr.id,
            "gray",
            localStorage.getItem('accentColor')
          )
        );
        createMessage("Marking node " + s + " as visited.");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(16, this.props.lines))
      }
      else
      {
        addStep(
          new EmptyStep()
        );
        createMessage("Is travel to node " + s + " necessary?");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(17, this.props.lines))

        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[e].attr.id,
            "gray",
            localStorage.getItem('accentColor')
          )
        );
        createMessage("Traveling to node " + s + ".");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[s].circle.attr.id,
            graph.nodeInfo[s].text.attr.id,
            localStorage.getItem('accentColor'),
            "1ACA1E"
          )
        );
        createMessage("Node " + s + " has already been visited.");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))

        addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[s].circle.attr.id,
            graph.nodeInfo[s].text.attr.id,
            "EF3F88",
            localStorage.getItem('accentColor')
          )
        );
        createMessage("Node " + s + " has already been visited.");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))

        addStep(
          new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[e].attr.id,
            localStorage.getItem('accentColor'),
            localStorage.getItem('cardColor')
          )
        );
        createMessage("Traveling back to parent node.");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))
      }

      addStep(
        new EmptyStep()
      );
      createMessage("Adding unvisited adjacent nodes to be searched into the stack.");
      flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))

      for (let node = 0; node < graph.adjacencyList[s].length; node++) {
        addStep(
          new EmptyStep()
        );
        createMessage("Next iteration!");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(20, this.props.lines))
        if (nodeVisited[graph.adjacencyList[s][node][1]] === false) {
          addStep(
            new EmptyStep()
          );
          createMessage("Checking if we have visited the current node.");
          flushBuffer();
          pseudocodeArr.push(new HighlightLineStep(21, this.props.lines))
          nodeStack.push(graph.adjacencyList[s][node][1]);
          edgeStack.push(graph.adjacencyList[s][node][2]);
          let ys = 20 + (numsInStack*10);
          stack.push(new Number(this.ref, "stack" + nums, "7%", ys + "%", graph.adjacencyList[s][node][1], localStorage.getItem('secondaryColor'), "hidden"));
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
          pseudocodeArr.push(new HighlightLineStep(22, this.props.lines))

          addStep(
            new EmptyStep()
          );
          createMessage("Adding " + graph.adjacencyList[s][node][1] + " to the stack.");
          flushBuffer();
          pseudocodeArr.push(new HighlightLineStep(23, this.props.lines))

          numsInStack++;
          nums++;
        }
      }
    }

    addStep(new EmptyStep());
    createMessage("The stack is empty.");
    flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(0, this.props.lines))

    addStep(new EmptyStep());
    createMessage("Finished Depth First Search!");
    flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(0, this.props.lines))

    this.setState({ steps: steps, messages: messages });
    this.props.handleCodeStepsChange(pseudocodeArr);
  }

  turnOffRunning() {
    this.setState({ running: false });
  }

  forward() {
    console.log("FORWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId === this.state.steps.length) return;

    this.props.codeSteps[this.state.stepId].forward();
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

    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Depth First Search (DFS)!</h1>" : this.state.messages[stepId - 1];
    for (const step of this.state.steps[stepId]) step.backward();
    this.props.codeSteps[stepId].forward();
    // this.state.steps[--stepId].backward();
    this.setState({stepId: stepId});
    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  run() {
    clearInterval(this.state.interval)

    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }
    this.props.codeSteps[this.state.stepId].forward();
    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward();
    this.setState({ stepId: this.state.stepId + 1 });
    // d3.timeout(this.run, this.props.waitTime);
    this.setState({interval: setInterval(this.run, this.props.waitTime)})

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
      d3.timeout(this.turnOffRunning, this.props.waitTime);
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

  componentWillUnmount() {
    console.log("component unmounted")
    clearInterval(this.state.interval);
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
				<div class="center-screen"><span id="message"><h1 id="message-pane">Welcome to Depth First Search (DFS)!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
        <div class="parent-svg">
                    <div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"depthfirst"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
			</div>
		)
	}
}