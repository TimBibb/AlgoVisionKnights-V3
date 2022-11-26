import React from "react";
import "./avl.css";
import * as d3 from "d3";
import createDefaultTree from "../../foundation/tree/CreateDefaultTree";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import LabeledNode from "../../foundation/tree/LabeledNode";
import Edge from "../../foundation/tree/Edge";
import { MessageSharp, StoreSharp } from "@material-ui/icons";
import { svg, tree } from "d3";
import { GRAY, UCF_GOLD } from "../../assets/colors";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { Pseudocode, HighlightLineStep } from "../../components/pseudocode/Pseudocode";

var x = 50;
var mid = 0;
var y = 10;
var i = 0;
var j = 0;
var MAX_NODE = 10;
var temp_x = 0;
var temp_y = 0;
var temp_x2 = 0;
var temp_y2 = 0;
var mod = 4;

function randInRange(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
  }
  
class EmptyStep {
    forward() {}
    fastForward(){}
    backward() {}
}

class NewNodeStep {
    constructor(node, edge) {
        this.node = node;
        this.edge = edge;
    }

    forward(svg) {
		svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('secondaryColor'));
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.node.textId).attr("visibility", "visible");
        console.log(" EDGE EXISTS " + this.edge)
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('secondaryColor'));
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
		// svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
	}
}

// class HighlightNodeStep {
//   constructor(node, edge) {
// 	  this.node = node;
//         this.edge = edge;
// 	}

//     forward(svg) {
// 		svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
//         svg.select("#" + this.node.id).attr("visibility", "visible");
//         svg.select("#" + this.node.node.textId).attr("visibility", "visible");
//         if (this.edge) {
//             svg.select("#" + this.edge.id).style("stroke", UCF_GOLD);
//             svg.select("#" + this.edge.id).attr("visibility", "visible");
//         }
// 	}
// }

// class UnHighlightNodeStep {
//     constructor(node, edge) {
// 		this.node = node;
//         this.edge = edge;
// 	}

//     forward(svg) {
// 		svg.select("#" + this.node.id).attr("stroke", GRAY);
//         if (this.edge) {
//             svg.select("#" + this.edge.id).style("stroke", GRAY);
//         }
// 	}
// }

class UnHighlightPathStep {
    constructor(root, finalVal) {
        this.root = root;
        this.finalVal = finalVal;
    }
    
    forward(svg) {
        var node = this.root;
        var edge = null;
        while (node != null) {
            svg.select("#" + node.id).attr("stroke", GRAY);
            if (this.finalVal < node.value) {
                edge = node.lEdge;
                node = node.left;
                if(edge != null)
                    svg.select("#" + edge.id).style("stroke", GRAY);
            } else  if (this.finalVal > node.value) {
                edge = node.rEdge;
                node = node.right;
                if(edge != null)
                    svg.select("#" + edge.id).style("stroke", GRAY);
            } else {
                return;
            }
        }
    }
}
// class UnHighlightPathStep {
//     constructor(node, edge) {
//         this.node = node;
//         this.edge = edge;
//     }

//     forward(svg) {
//         svg.select("#" + this.node.id).attr("stroke", GRAY);
//         if (this.edge) {
//             svg.select("#" + this.edge.id).style("stroke", GRAY);
//         }
//     }
// }

class Tree {
    constructor() {
        this.root = null;
    }
    toObject() {
        return this.root;
    }
}

class Node {
    constructor(ref, value, x, y, i, level, parent, leftEdge, rightEdge) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
        this.level = level;
        this.lEdge = leftEdge;
        this.rEdge = rightEdge;
        this.id =  "node" + i;
        this.textId = "label" + i;
        this.parent = parent;
        this.height = 1;
        this.balance = 0;

        this.node = new LabeledNode(
            ref,
            this.id,
            this.textId,
            this.x + "%",
            this.y + "%",
            this.value,
            "hidden",
            "white"
        );
    }
}

function height(node){
    if(node === null)
        return 0;

    return node.height;
}

function max(a, b){
    if(a > b)
        return a;
    return b;
}

function getHeight(node){
    if(node === null)
        return 0;
    return height(node.left) - height(node.right);
}

function rightRotation(node_y, steps, messages){
    let node_x = node_y.left;
    let temp = node_x.right;
    //let temp_p1 = y.parent;

    node_x.right = node_y;
    node_y.left = temp;

    // x.parent = temp_p1;
    // y.parent =  x;
    // //console.log("Y: " + y + ", y.left: " + y.left);
    // if(y.left != null)
    //     y.left.parent = y;

    //switchNodes();
    node_y.height = max(height(node_y.left), height(node_y.right)) + 1;
    node_x.height = max(height(node_x.left), height(node_x.right)) + 1;

    steps.push(new EmptyStep());
    messages.push("Starting Left Rotation in the following subtree.");

    [node_x, steps, messages] = HightlightNodes(node_x, steps, messages, node_y.x, node_y.y, node_y.level);

    steps.push(new EmptyStep());
    messages.push("Doing the Right Rotation.");

    [steps, messages] = RotatingNodes(node_x, steps, messages);

    //Trying to Unhighlight
    [steps, messages] = UnHightlightNodes(node_x, steps, messages);

    return [node_x, steps, messages];
}

function leftRotation(node_x, steps, messages){
    let node_y = node_x.right;
    let temp = node_y.left;
    // let temp_p1 = x.parent;

    node_y.left = node_x;
    node_x.right = temp;

    // y.parent = temp_p1;
    // x.parent = y;
    // //console.log("X: " + x + ", x.right: " + x.right);
    // if(x.right != null)
    //     x.right.parent = x;
    

    //switchNodes();
    // node_y.height = max(height(node_y.left), height(node_y.right)) + 1;
    node_x.height = max(height(node_x.left), height(node_x.right)) + 1;
    node_y.height = max(height(node_y.left), height(node_y.right)) + 1;

    steps.push(new EmptyStep());
    messages.push("Starting Left Rotation in the following subtree.");

    [node_y, steps, messages] = HightlightNodes(node_y, steps, messages, node_x.x, node_x.y, node_x.level);

    steps.push(new EmptyStep());
    messages.push("Doing the Left Rotation.");

    [steps, messages] = RotatingNodes(node_y, steps, messages);

    //Trying to Unhighlight
    [steps, messages] = UnHightlightNodes(node_y, steps, messages);

    // console.log(node)
    // console.log(JSON.parse(JSON.stringify(node_y)));

    return [node_y, steps, messages];
}

function HightlightNodes(node, steps, messages, x_coor, y_coor, lev){
    var tempMod = (lev*mod) > 15 ? 15 : (lev*mod);
    if(node !== null){
        node.x = x_coor;
        node.y = y_coor;
        node.level = lev

        steps.push(new HighlightNodeStep(node));
        messages.push("Highlighting node " + node.value);

        if(node.left !== null)
            [node.left, steps, messages] = HightlightNodes(node.left, steps, messages, node.x-20+tempMod, node.y+10, ++lev);
        if(node.right !== null)
            [node.right, steps, messages] = HightlightNodes(node.right, steps, messages, node.x+20-tempMod, node.y+10, ++lev);
    }

    return [node, steps, messages]
}

class HighlightNodeStep{
    constructor(node){
        this.node = node;
    }

    forward(svg){
        if(this.node !== null){
            svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
        }
    }
}

function RotatingNodes(node, steps, messages){
    if (node !== null){

        //console.log(node.value + ": xcoor-> " + node.x + " ycoor-> " + node.y);
        steps.push(new RotationStep(node, node.x, node.y));
        messages.push("Rotating node " + node.value + ".");

        if(node.left !== null)
            [steps, messages] = RotatingNodes(node.left, steps, messages);
        if(node.right !== null)
            [steps, messages] = RotatingNodes(node.right, steps, messages);
    }

    return [steps, messages];
}

class RotationStep{
    constructor(node, cx, cy){
        this.node = node;
        this.cx = cx;
        this.cy = cy;
    }
    
    forward(svg){
        svg.select("#" + this.node.id)
			.attr("cx", this.cx + "%")
            .attr("cy", this.cy + "%");

        svg.select("#" + this.node.textId)
            .attr("x", this.cx + "%")
            .attr("y", this.cy + "%");
    }
}

function UnHightlightNodes(node, steps, messages){
    if(node !== null){

        steps.push(new UnHighlightNodeStep(node));
        messages.push("Finishing Rotation(s)");

        if(node.left !== null)
            [steps, messages] = UnHightlightNodes(node.left, steps, messages);
        if(node.right !== null)
            [steps, messages] = UnHightlightNodes(node.right, steps, messages);
    }

    return [steps, messages];
}

class UnHighlightNodeStep{
    constructor(node){
        this.node = node;
    }

    forward(svg){
        if(this.node !== null){
            svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('secondaryColor'));
        }
    }
}

class EdgeVisible{
    constructor(edge){
        this.edge = edge;
    }

    forward(svg){
        svg.select("#" + this.edge.id).attr("visibility", "visible");
    }
}

function updateHeights(node){
    
  if(node != null){
    updateHeights(node.left);
    updateHeights(node.right);

    //console.log("AQUIIII" + node.value + " " + node.height);
    
    if(node.left == null && node.right == null)
      node.height = 1;
    else
      node.height = 1 + max(height(node.left), height(node.right));
  }
}

export default class avl extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            tree: [],
            steps: [],
            stepTime: 1900,
            waitTime: 2000,
            running: false,
            stepId: 0,
            messages: [],
            maxLevel: 0,
            running: false,
            root: null
        };
        
		// Bindings
		this.ref = React.createRef();

		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
        //this.add = this.add.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
        this.simluate = this.simulate.bind(this);
	}

    handleZoom(e) {
        d3.select(this.ref.current).select("svg g")
            .attr('transform', e.transform);
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
        
        var svgGroup = svg.append("g");

        let zoom = d3.zoom()
            .on('zoom', this.handleZoom);
        
        d3.select(this.ref.current).select("svg")
            .call(zoom);

        svgGroup.attr("visibility", "visible");

        console.log("initialized");
        return svgGroup;
    }

    simulate() {
        console.log("SIMULATING");
        var val = Math.floor(Math.random() * 100);
        // var modifier = 4;
        var steps = []
        var messages = []
        var root = null;

        while (i < MAX_NODE) {
            val = Math.floor(Math.random() * 100);
            steps.push(new EmptyStep());
            messages.push("The next value we will insert into the tree is " + val );

            //console.log(root);
            console.log(val);

            if(!root) {
                
                root = new Node(this.ref, val, x, y, i, 0);
                var tempMod = (root.level*mod) > 15 ? 15 : (root.level*mod);
                root.leftEdge = new Edge(this.ref, "edge" + j++, root.x-3 + "%", root.y+1.5 + "%", root.x-17+tempMod + "%", root.y+8 + "%", "hidden");
                root.rightEdge = new Edge(this.ref, "edge" + j++, root.x+3 + "%", root.y+1.5 + "%", root.x+17-tempMod + "%", root.y+8 + "%", "hidden");
                this.setState({root: root})
                //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
                steps.push(new NewNodeStep(root, null));
                messages.push("The tree is empty, let's add "+ val + " as the root node.");
                
                // steps.push(new UnHighlightNodeStep(this.state.root, null));
                //steps.push(new UnHighlightPathStep(root, val));
                steps.push(new EmptyStep());
                messages.push("The tree is empty, let's add "+ val + " as the root node.");
                i++;
            }
            else{
                
                [root, steps, messages, j] = this.insertingvalue(root, steps, messages, val, x, y, root.level, j);
                i++;
            }

            // console.log(root);
            console.log(JSON.parse(JSON.stringify(root)));

        }

        steps.push(new EmptyStep())
        messages.push("AVL Tree insertion complete!");
        this.setState({steps: steps});
        this.setState({messages: messages});
        
    }

    insertingvalue(node, steps, messages, val, x, y, lev, j){

        var tempMod = (lev*mod) > 15 ? 15 : (lev*mod);
        if(node === null){

            node = new Node(this.ref, val, x, y, i, lev);
            node.leftEdge = new Edge(this.ref, "edge" + j++, node.x-3 + "%", node.y+1.5 + "%", node.x-17+tempMod + "%", node.y+8 + "%", "hidden");
            node.rightEdge = new Edge(this.ref, "edge" + j++, node.x+3 + "%", node.y+1.5 + "%", node.x+17-tempMod + "%", node.y+8 + "%", "hidden");
            steps.push(new NewNodeStep(node, null));
            messages.push("Let's insert " + val );
            return [node, steps, messages, j];
        }
        else if(val < node.value){
            steps.push(new EmptyStep());
            messages.push("Is the value " + val + " smaller than the current node " + node.value + "?");

            steps.push(new EdgeVisible(node.leftEdge));
            messages.push("Is the value " + val + " smaller than the current node " + node.value + "?");

            [node.left, steps, messages, j] = this.insertingvalue(node.left, steps, messages, val, node.x-20+tempMod, node.y+10, ++lev, j);
        }
        else if(val > node.value){
            steps.push(new EmptyStep());
            messages.push("Is the value " + val + " bigger than the current node " + node.value + "?");

            steps.push(new EdgeVisible(node.rightEdge));
            messages.push("Is the value " + val + " smaller than the current node " + node.value + "?");

            [node.right, steps, messages, j] = this.insertingvalue(node.right, steps, messages, val, node.x+20-tempMod, node.y+10, ++lev, j);
        }
        else{
            steps.push(new EmptyStep());
            messages.push("There cannot be duplicate values in a BST, so we will move on.");
            console.log("DUPLICATE: " + val);
            
            return [node, steps, messages, j];
        }

        node.height = 1 + max(height(node.left), height(node.right));
        var balance = getHeight(node);
        //console.log("Node: " + node.value + ", height: " + node.height + ", balance: " + balance)
        //console.log("node" + node.value + " height " + node.height);
        console.log("node" + node.value + " balance " + balance);

        if(balance > 1){
            if(val < node.left.value){
                console.log("RIGHT ROTATE in node: " + node.value);
                [node, steps, messages] = rightRotation(node, steps, messages);
                return [node, steps, messages];
            }
            else if(val > node.left.value){
                console.log("LEFT-RIGHT ROTATE in node: " + node.left.value + " and " + node.value);
                [node.left, steps, messages] = leftRotation(node.left, steps, messages);
                [node, steps, messages] = rightRotation(node, steps, messages);
                return [node, steps, messages];
            }
        }
        if(balance < -1){
            if(val > node.right.value){
                console.log("LEFT ROTATE in node: " + node.value);
                [node, steps, messages] = leftRotation(node, steps, messages);
                return [node, steps, messages];
            }
            else if(val < node.right.value){
                console.log("RIGHT-LEFT ROTATE in node: " + node.right.value + " and " + node.value);
                [node.right, steps, messages] = rightRotation(node.right, steps, messages);
                [node, steps, messages] = leftRotation(node, steps, messages);
                return [node, steps, messages];
            }
        }

        return[node, steps, messages, j];
    }

    BalancingRecursion(node, val){
        if(node == null) return;

        this.BalancingRecursion(node.left);
        this.BalancingRecursion(node.right);
        
        var balance = getHeight(node);
        node.balance = balance;
    }

    turnOffRunning() {
		console.log("setting running to false");
		this.setState({running: false});
	}

    backward(){
        console.log("BACKWARDS CLICKED");
    }

    forward(){		
		console.log("FORWARD CLICKED");

		if (this.state.running) return; // The user can't step forward while running via the play
										// button so as not to ruin the visualizer
		if (this.state.stepId === this.state.steps.length) return; // At the end of the step queue
		
		// Uses the step's fastForward function and displays associated message
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg g"));
		document.getElementById("message").innerHTML = "<h1>" + this.state.messages[this.state.stepId] + "</h1>";

		this.setState({stepId: this.state.stepId + 1});

		d3.timeout(this.turnOffRunning, this.state.waitTime); // Calls function after wait time
    }

    run(){
		if (!this.state.running) return;
		if (this.state.stepId === this.state.steps.length) {
			this.setState({running: false});
			return;
		}
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg g"));
		document.getElementById("message").innerHTML = "<h1>" +  this.state.messages[this.state.stepId] + "</h1>";
		this.setState({stepId: this.state.stepId + 1});
		d3.timeout(this.run, this.state.waitTime);
    }

    playPreorder() {
        console.log("PLAY PREORDER CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
    }

    play() {
		console.log("PLAY CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
        // this.simulate();
		// this.run();
	}

    pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() {
		console.log("RESTART CLICKED");

		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "Welcome to AVL!";

		this.setState({running: false, steps: [], messages: [], tree: [], maxLevel: -1, stepId: 0, root: null});
        i = 0;
        j = 0;

	}

    componentDidMount() {
        this.initialize();   
        this.simulate();
    }

    // Calls functions depending on the change in state
	componentDidUpdate(prevProps, prevState) {
        // console.log(this.state.root);
		// Part of restart -> Reinitialize with original array
        if (this.state.root !== prevState.root && this.state.root === null) {
			console.log("Steps changed");
			var svg = this.initialize();
            this.simulate();
			svg.attr("visibility", "visible");
		}
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
                    {/* <button class="button" onClick={this.playPreorder}>Preorder</button> */}
                    <button class="button" onClick={this.pause}>Pause</button>
                    {/* <button class="button" onClick={this.add}>Add</button> */}
                    <button class="button" onClick={this.restart}>Restart</button>
                    <button class="button" onClick={this.backward}>Step Backward</button> 
                    <button class="button" onClick={this.forward}>Step Forward</button>
                    <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to AVL!</h1></span></div>
                <table>
                    <tr>
                        <div ref={this.ref} class=""></div>
                    </tr>
                    {/* <tr>
                        <div style={{width: "500px"}}>
                            <p>Miguel</p>
                        </div>
                    </tr> */}
                </table>
                <div class="parent-svg">
                    <div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"avl"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
            </div>
        )
    }
}