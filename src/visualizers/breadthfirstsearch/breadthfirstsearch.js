import React from "react";
import * as d3 from "d3";
import "./breadthfirstsearch.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";

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
    var svg = d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "650px");

    let isWeighted = false;
    let isDirected = false;

    let graph = createDefaultGraph(this.ref, isWeighted, isDirected);

    let queue = [];
    queue.push(new Number(this.ref, "queue", "10%", "5%", "Queue", "grey", "visible"));
    
    for(var i=0; i<graph.numberOfNodes;i++){

    var node = d3.select(this.ref.current).select("#node" + i);

     var lTxt = svg
      .append("text")
      .text("Level: "+ 0)
			.attr("id", "lTxt" + i)
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white");

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



    var temp = randInRange(0, graph.numberOfNodes);
    nodeLevel[temp] = 0;


    let currNode, adjNode, edgeId;

    for(var i=0; i<graph.numberOfNodes;++i){

    for (const edge of graph.adjacencyList[temp]) {
      
          [currNode, adjNode, edgeId] = edge;
          console.log(currNode.edgeInfo);

    if(currentNode[currNode] === false){
          createMessage("Current Node: " + currNode + ".");
          addStep(
          new NodeColorChangeStep(
            this.ref.current,
            graph.nodeInfo[currNode].circle.attr.id,
            graph.nodeInfo[currNode].text.attr.id,
            "gray",
            "#1ACA1E"
          )
        );
        flushBuffer();

        currentNode[currNode]=true;
    }

    if(!(nodeQueue.includes(currNode))){ 
          nodeQueue.push(currNode);

        
          let factor = 20 + (queueLength*10);
          
          queue.push(new Number(this.ref, "queue" + currNode, "7%", factor + "%", currNode, "grey", "hidden"));
          
          createMessage("Node " + currNode + " added to the queue.");
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
          
    }


    if(!(nodeVisited[adjNode])&& nodeLevel[adjNode] === 0)
    nodeLevel[adjNode]=nodeLevel[currNode]+1;

        


    if(!(nodeVisited[adjNode])){



      if(edgeSelected[adjNode] === false){


        createMessage(
        "Node " + currNode + " shares an edge with Node " + adjNode + "."
        );

        addStep(
            new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[edgeId].attr.id,
            "gray",
            "white"
            )
        );

        flushBuffer();

        if(!(nodeQueue.includes(adjNode))){

          nodeQueue.push(adjNode);
          nodeStack.push(adjNode);

          let factor = 20 + (queueLength*10);
          
          queue.push(new Number(this.ref, "queue" + adjNode, "7%", factor + "%", adjNode, "grey", "hidden"));
          
          createMessage("Node " + adjNode + " added to  queue.");
            
          addStep(
              new StackChangeStep(
              this.ref.current,
              "queue" + adjNode,
              "hidden",
              "visible"
              )
            );

          flushBuffer();
          queueLength++;
          
        }


        console.log("Queue:" + nodeQueue);

        
        nodeVisited[currNode]=true;
        edgeSelected[adjNode]=true;
      }

      else{

        createMessage("Node "+ adjNode +" has been previously visited.");
        
        addStep(
            new EdgeColorChangeStep(
            this.ref.current,
            graph.edgeInfo[edgeId].attr.id,
            "gray",
            "black"
            )
        );
        

        flushBuffer();
        nodeVisited[currNode]=true;
      }

    }

    else{

      
        createMessage("Node " + currNode + "  shares an edge with " + adjNode + ".");
        addStep(new EmptyStep());
        flushBuffer();

    }


    }

      nodeQueue.shift();

      createMessage("Node " + currNode + " exits the queue.");
      
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

      if(nodeLevel[currNode] === 0){
        addStep(
          new NodeColorChangeStep(
          this.ref.current,
          graph.nodeInfo[currNode].circle.attr.id,
          graph.nodeInfo[currNode].text.attr.id,
          "white",
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
          "white",
          "#EF3F88"
          )
        );

      
      }

      else if(nodeLevel[currNode] === 2){
        addStep(
          new NodeColorChangeStep(
          this.ref.current,
          graph.nodeInfo[currNode].circle.attr.id,
          graph.nodeInfo[currNode].text.attr.id,
          "white",
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
          "white",
          "#CC01BE"
          )
        );

      }
      addStep(new SetInfoStep(currNode,0,nodeLevel[currNode]));  
      flushBuffer();


    temp = nodeStack.shift();


    }

      createMessage("Finished Breadth First Search!");
      
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

    console.log(this.state.steps[this.state.stepId]);
    this.setState({ stepId: this.state.stepId + 1 });

    d3.timeout(this.turnOffRunning, this.state.waitTime);
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

    var stepId = this.state.stepId;
     let svg = d3.select(this.ref.current).select("svg");
    document.getElementById("message").innerHTML = "<h1>Welcome to Breadth First Search!</h1>";
    while (stepId - 1 >= 0) {
      for (const step of this.state.steps[--stepId]) step.backward(svg);
      
      d3.timeout(this.turnOffRunning, this.state.waitTime);
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
        <div class="center-screen">
          <button class="button" onClick={this.play}>Play</button>
          <button class="button" onClick={this.pause}>Pause</button>
          <button class="button" onClick={this.restart}>Restart</button>
          <button class="button" onClick={this.backward}>Step Backward</button>
          <button class="button" onClick={this.forward}>Step Forward</button>
        </div>
        <div class="center-screen">
          <span id="message">
            <h1>Welcome to Breadth First Search!</h1>
          </span>
        </div>
        <div ref={this.ref} class="center-screen"></div>
      </div>
    );
  }
}