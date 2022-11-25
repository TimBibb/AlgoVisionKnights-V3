import React from "react";
import * as d3 from "d3";
import "./breadthfirstsearch.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { Pseudocode } from "../../components/pseudocode/Pseudocode";
import { HighlightLineStep } from "../../components/pseudocode/Pseudocode";

function randInRange(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

class EmptyStep {
  forward(svg) {}
  backward(svg) {}
}


class EdgeColorChangeStep {
  constructor(ref, edgeId, oldColor, newColor) {
    this.ref = ref;
    this.edgeId = "#" + edgeId;
    this.oldColor = oldColor;
    this.newColor = newColor;
  }
  forward(svg) {
    d3.select(this.ref).select(this.edgeId).style("stroke", this.newColor);
 
  }
  backward(svg) {
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
  forward(svg) {
    svg.select(this.circleId).style("stroke", this.newColor);
    svg.select(this.textId).style("fill", this.newColor);
  }
  backward(svg) {
    svg.select(this.circleId).style("stroke", this.oldColor);
    svg.select(this.textId).style("fill", this.oldColor);
  }
}

class SetInfoStep {
	constructor(nodeID, prevLevel, currentLevel) {
		this.lID = "#lTxt" + nodeID;
		this.prevLevel = prevLevel;
		this.currentLevel = currentLevel;

	}

	forward(svg) {
		if (this.currentLevel !== 0) {
      svg.select(this.lID).text("Level: " + this.currentLevel);
		}
	}

	backward(svg) {
		if (this.prevLevel === 0 && this.currentLevel !== 0) {
      svg.select(this.lID).text("Level: 0");
		}
		else if (this.currentLevel !== 0) {

      svg.select(this.lID).text("Level: " + this.prevLevel);
		}

	}
}

class StackChangeStep {
  constructor(ref, queueId, oldVisibility, newVisibility) {
    this.ref = ref;
    this.queueId = "#" + queueId;
    this.oldVisibility = oldVisibility;
    this.newVisibility = newVisibility;
  }
  forward(svg) {
    svg.select(this.queueId).attr("visibility", this.newVisibility);
  }
  backward(svg) {
    svg.select(this.queueId).attr("visibility", this.oldVisibility);
  }
}



export default class BreadthFirstSearch extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      graph: [],
      running: false,
      steps: [],
      queue:[],
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
  
    let isWeighted = false;
    let isDirected = false;

    let graph = createDefaultGraph(this.ref, isWeighted, isDirected);

    let queue = [];
    queue.push(new Number(this.ref, "queue", "10%", "5%", "Queue", localStorage.getItem('secondaryColor'), "visible"));
    
    for(var i=0; i<graph.numberOfNodes;i++){

    var node = d3.select(this.ref.current).select("#node" + i);

     var lTxt = svg
      .append("text")
      .text("Level: "+ 0)
			.attr("id", "lTxt" + i)
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", localStorage.getItem('primaryColor'));

      if (i === 0) {
				lTxt
					.attr("y", (parseInt(node.attr("cy")) - 10) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 8) + "%");

			}
			else if (i === 1 || i === 3) {
				lTxt
					.attr("y", (parseInt(node.attr("cy")) - 10) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 6) + "%");

			}
			else if (i === 2 || i === 4) {
				lTxt
					.attr("y", (parseInt(node.attr("cy")) + 13) + "%")
					.attr("x", (parseInt(node.attr("cx")) - 6) + "%");

			}
			else if (i === 5) {
				lTxt
					.attr("y", (parseInt(node.attr("cy")) - 10) + "%")
					.attr("x", (parseInt(node.attr("cx")) + 2) + "%");
				
			}


    }
    
    this.setState({ graph: graph, queue: queue });

  }

    breadthfirstsearch(graph,queue) {

        var pseudocodeArr = [];

        var nodeQueue = [];
        var nodeStack = [];
        var nodeLevel = Array(6).fill(0);
        var queueLength = 0;
        var nodeVisited = Array.from({ length: graph.numberOfNodes }, () => false);
        var edgeSelected = Array.from({ length: graph.numberOfEdges }, () => false);
        var currentNode = Array.from({ length: graph.numberOfNodes }, () => false);
          console.log("Graph:" + graph.edges);

          console.log("Node Queue:" + nodeQueue);

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
        createMessage("Beginning Breadth First Search!");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines))


    var temp = randInRange(0, graph.numberOfNodes);
    nodeLevel[temp] = 0;


    let currNode, adjNode, edgeId;

    for(var i=0; i<graph.numberOfNodes;++i){

      addStep(new EmptyStep());
      createMessage("Next Iteration...");
      flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(6, this.props.lines))

      for (const edge of graph.adjacencyList[temp]) {

        console.log("we have reached the second for loop");
      
        [currNode, adjNode, edgeId] = edge;
        console.log(currNode.edgeInfo);

        addStep(new EmptyStep());
        createMessage("Setting Edge...");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(7, this.props.lines))

        addStep(new EmptyStep());
        createMessage("Setting Edge...");
        flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(8, this.props.lines))

    if(currentNode[currNode] === false){
          createMessage("Current Node: " + currNode + ".");
          pseudocodeArr.push(new HighlightLineStep(9, this.props.lines))
          addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[currNode].circle.attr.id,
            graph.nodeInfo[currNode].text.attr.id,
            localStorage.getItem('secondaryColor'),
            localStorage.getItem('accentColor')
          )
        );
        flushBuffer();

        currentNode[currNode]=true;
    }

    if(!(nodeQueue.includes(currNode))){ 
          nodeQueue.push(currNode);

        
          let factor = 20 + (queueLength*10);
          
          queue.push(new Number(this.ref, "queue" + currNode, "7%", factor + "%", currNode, localStorage.getItem('secondaryColor'), "hidden"));
          
          createMessage("Node " + currNode + " added to the queue.");
          pseudocodeArr.push(new HighlightLineStep(11, this.props.lines))
            addStep(
              new StackChangeStep(
                this.ref.current,
                "queue" + currNode,
                "hidden",
                "visible"
              )
            );
            flushBuffer();
            queueLength++;
          
          createMessage("Node " + currNode + " added to the queue.");
          pseudocodeArr.push(new HighlightLineStep(12, this.props.lines))
          addStep(new EmptyStep());
          flushBuffer();
    }


    if(!(nodeVisited[adjNode])&& nodeLevel[adjNode] === 0)
    nodeLevel[adjNode]=nodeLevel[currNode]+1;

        


    if(!(nodeVisited[adjNode])){



      if(edgeSelected[adjNode] === false){


        createMessage(
        "Node " + currNode + " shares an edge with Node " + adjNode + "."
        );
        pseudocodeArr.push(new HighlightLineStep(16, this.props.lines))  
        addStep(
            new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[edgeId].attr.id,
            localStorage.getItem('secondaryColor'),
            localStorage.getItem('accentColor')
            )
        );

        flushBuffer();

        if(!(nodeQueue.includes(adjNode))){

          nodeQueue.push(adjNode);
          nodeStack.push(adjNode);

          let factor = 20 + (queueLength*10);
          
          queue.push(new Number(this.ref, "queue" + adjNode, "7%", factor + "%", adjNode, localStorage.getItem('secondaryColor'), "hidden"));
          
          createMessage("Node " + adjNode + " added to  queue.");
          pseudocodeArr.push(new HighlightLineStep(17, this.props.lines))  

          addStep(
              new StackChangeStep(
              this.ref.current,
              "queue" + adjNode,
              "hidden",
              "visible"
              )
            );

          flushBuffer();

          createMessage("Node " + adjNode + " added to  queue.");
          pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))
          addStep(new EmptyStep());
          flushBuffer();

          createMessage("Node " + adjNode + " added to  queue.");
          pseudocodeArr.push(new HighlightLineStep(19, this.props.lines))
          addStep(new EmptyStep());
          flushBuffer();

          queueLength++;
          
        }


        console.log("Queue:" + nodeQueue);

        
        nodeVisited[currNode]=true;
        edgeSelected[adjNode]=true;
      }

      else{

        createMessage("Node "+ adjNode +" has been previously visited.");
        pseudocodeArr.push(new HighlightLineStep(22, this.props.lines))

        addStep(
            new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[edgeId].attr.id,
            localStorage.getItem('secondaryColor'),
            localStorage.getItem('cardColor')
            )
        );
        

        flushBuffer();

        createMessage("Node "+ adjNode +" has been previously visited.");
        pseudocodeArr.push(new HighlightLineStep(23, this.props.lines))
        addStep(new EmptyStep());
        flushBuffer();

        nodeVisited[currNode]=true;
      }

    }

    else{

      
        createMessage("Node " + currNode + "  shares an edge with " + adjNode + ".");
        pseudocodeArr.push(new HighlightLineStep(26, this.props.lines))
        addStep(new EmptyStep());
        flushBuffer();

    }

    //for loop ends here
    }

      nodeQueue.shift();

      createMessage("Node " + currNode + " exits the queue.");
      pseudocodeArr.push(new HighlightLineStep(31, this.props.lines))

      addStep(
        new StackChangeStep(
        this.ref.current,
        "queue" + currNode,
        "visible",
        "hidden"
        )
      );
      
      flushBuffer();

      createMessage("Node " + currNode + " is checked. Node Level: " + nodeLevel[currNode] + ".");
      pseudocodeArr.push(new HighlightLineStep(19, this.props.lines))

      if(nodeLevel[currNode] === 0){
        addStep(
          new NodeColorChangeStep(
          this.ref.current,
          graph.nodeInfo[currNode].circle.attr.id,
          graph.nodeInfo[currNode].text.attr.id,
          localStorage.getItem('accentColor'),
          "#FFB050"
          )
        );



      }

      else if(nodeLevel[currNode] === 1){
        addStep(
          new NodeColorChangeStep(
          this.ref.current,
          graph.nodeInfo[currNode].circle.attr.id,
          graph.nodeInfo[currNode].text.attr.id,
          localStorage.getItem('accentColor'),
          "#1ACA1E"
          )
        );

      
      }

      else if(nodeLevel[currNode] === 2){
        addStep(
          new NodeColorChangeStep(
          this.ref.current,
          graph.nodeInfo[currNode].circle.attr.id,
          graph.nodeInfo[currNode].text.attr.id,
          localStorage.getItem('accentColor'),
          "#648FFF"
          )
        );


      }

      else if(nodeLevel[currNode] === 3){
        addStep(
          new NodeColorChangeStep(
          this.ref.current,
          graph.nodeInfo[currNode].circle.attr.id,
          graph.nodeInfo[currNode].text.attr.id,
          localStorage.getItem('accentColor'),
          "#EF3F88"
          )
        );

      }
      addStep(new SetInfoStep(currNode,0,nodeLevel[currNode]));  
      flushBuffer();


    temp = nodeStack.shift();

    //main for loop ends here
    }

      createMessage("Finished Breadth First Search!");
      
      addStep(new EmptyStep());
      pseudocodeArr.push(new HighlightLineStep(19, this.props.lines))

      flushBuffer();

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

    let svg = d3.select(this.ref.current).select("svg");

    console.log(this.state.steps);
    console.log(this.props.codeSteps);
    console.log(this.state.stepId);

    this.props.codeSteps[this.state.stepId].forward();

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward(svg);

    console.log(this.state.steps[this.state.stepId]);
    this.setState({ stepId: this.state.stepId + 1 });

    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  backward() {
    console.log("BACKWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId - 1 < 0) return;

    let svg = d3.select(this.ref.current).select("svg");

    var stepId = this.state.stepId - 1;
    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Breadth First Search!</h1>" : this.state.messages[stepId - 1];
    for (const step of this.state.steps[stepId]) step.backward(svg);
  
    this.setState({stepId: stepId});
    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  run() {
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }
    let svg = d3.select(this.ref.current).select("svg");

    console.log(this.state.steps);
    console.log(this.props.codeSteps);
    console.log(this.state.stepId);

    this.props.codeSteps[this.state.stepId].forward();

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward(svg);

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
     let svg = d3.select(this.ref.current).select("svg");
    document.getElementById("message").innerHTML = "<h1>Welcome to Breadth First Search!</h1>";
    while (stepId - 1 >= 0) {
      for (const step of this.state.steps[--stepId]) step.backward(svg);
      
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
      this.breadthfirstsearch(this.state.graph,this.state.queue);
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
            <h1 id="message-pane">Welcome to Breadth First Search!</h1>
          </span>
        </div>
        <div ref={this.ref} class="center-screen"></div>
        <div class="parent-svg">
                    <div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"breadthfirst"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
      </div>
    );
  }
}