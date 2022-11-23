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
		svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.node.textId).attr("visibility", "visible");
        console.log(" EDGE EXISTS " + this.edge)
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", UCF_GOLD);
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
		// svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
	}
}

class HighlightNodeStep {
  constructor(node, edge) {
	  this.node = node;
    this.edge = edge;
	}

    forward(svg) {
		svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.node.textId).attr("visibility", "visible");
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", UCF_GOLD);
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
	}
}

class UnHighlightNodeStep {
    constructor(node, edge) {
		this.node = node;
        this.edge = edge;
	}

    forward(svg) {
		svg.select("#" + this.node.id).attr("stroke", GRAY);
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", GRAY);
        }
	}
}

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
    constructor(ref, value, x, y, i, parent, level, leftEdge, rightEdge) {
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
    node_y.height = max(height(node_y.left), height(node_y.right)) + 1;
    node_x.height = max(height(node_x.left), height(node_x.right)) + 1;

    return [node_y, steps, messages];
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

function readjustCoordinates(node){
    var modifier = 4;
    if(node != null){
        if(node.parent == null){
            node.x = x;
            node.y = y;
            node.level = 0;

            // d3.select(ref.current).select("svg").select("#" + node.id).attr("cx", node.x + "%");
            // d3.select(ref.current).select("svg").select("#" + node.id).attr("cy", node.y + "%");
            // d3.select(ref.current).select("svg").select("#" + node.textId).attr("x", node.x + "%");
            // d3.select(ref.current).select("svg").select("#" + node.textId).attr("y", node.y + "%");
        }
        else{
            if(node.value < node.parent.value){
                node.level = node.parent.level + 1;
                var temp_mod = (node.level*modifier) > 15 ? 15 : (node.level*modifier);
                node.x = node.parent.x - 20 + temp_mod;
                node.y = node.parent.y + 10;

                // d3.select(ref.current).select("svg").select("#" + node.id).attr("cx", node.x + "%");
                // d3.select(ref.current).select("svg").select("#" + node.id).attr("cy", node.y + "%");
                // d3.select(ref.current).select("svg").select("#" + node.textId).attr("x", node.x + "%");
                // d3.select(ref.current).select("svg").select("#" + node.textId).attr("y", node.y + "%");
            }
            else{
                node.level = node.parent.level + 1;
                var temp_mod = (node.level*modifier) > 15 ? 15 : (node.level*modifier);
                node.x = node.parent.x + 20 - temp_mod;
                node.y = node.parent.y + 10;

                // d3.select(ref.current).select("svg").select("#" + node.id).attr("cx", node.x + "%");
                // d3.select(ref.current).select("svg").select("#" + node.id).attr("cy", node.y + "%");
                // d3.select(ref.current).select("svg").select("#" + node.textId).attr("x", node.x + "%");
                // d3.select(ref.current).select("svg").select("#" + node.textId).attr("y", node.y + "%");
            }
        }

        readjustCoordinates(node.left);
        readjustCoordinates(node.right);
        
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
        var svgGroup = d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "750px").append("g");
        
        let zoom = d3.zoom()
            .on('zoom', this.handleZoom);
        
        d3.select(this.ref.current).select("svg")
            .call(zoom);

        svgGroup.attr("visibility", "visible");

        console.log("initialized");
        return svgGroup;
    }

    // simulate() {
    //     console.log("SIMULATING");
    //     var val = Math.floor(Math.random() * 100);
    //     var level = 0;
    //     var modifier = 4;
    //     var steps = []
    //     var messages = []
    //     var root = null;

    //     while (i < MAX_NODE) {
    //         val = Math.floor(Math.random() * 100);
    //         steps.push(new EmptyStep());
    //         messages.push("The next value we will insert into the tree is " + val );
    //         console.log("level " + level);
    //         if(!root) {
    //             root = new Node(this.ref, val, x, y, i, null);
    //             this.setState({root: root})
    //             //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
    //             steps.push(new NewNodeStep(root, null));
    //             messages.push("The tree is empty, let's add "+ val + " as the root node.");
                
    //             // steps.push(new UnHighlightNodeStep(this.state.root, null));
    //             //steps.push(new UnHighlightPathStep(root, val));
    //             steps.push(new EmptyStep());
    //             messages.push("The tree is empty, let's add "+ val + " as the root node.");
    //             i++;
    //         } else {
    //             let node = root;
    //             //y += 10;
    //             level = 0
    //             var firstStep = true;

    //             while(true) {
    //                 var tempMod = (level*modifier) > 15 ? 15 : (level*modifier);
    //                 //console.log(node.value);
    //                 if (firstStep) {
    //                     //steps.push(new HighlightNodeStep(node, null));
    //                     steps.push(new EmptyStep());
    //                     messages.push("The next value we will insert into the tree is " + val );
    //                     firstStep = false;
    //                 } else {
    //                     //steps.push(new HighlightNodeStep(node, null));
    //                     steps.push(new EmptyStep());
    //                     messages.push(" ");
    //                 }

    //                 if(val < node.value) {
    //                     steps.push(new EmptyStep());
    //                     messages.push( val + " is less than " + node.value );

    //                     // steps.push(new UnHighlightNodeStep(node, null));
    //                     // messages.push(val + " is less than " + node.value);

    //                     if(node.left != null) {
    //                         // var edge = node.lEdge;
    //                         node = node.left;
    //                         // steps.push(new HighlightNodeStep(node, edge));
    //                         steps.push(new EmptyStep());
    //                         messages.push("Let's traverse to the left edge of the node.");

    //                         // steps.push(new UnHighlightNodeStep(node, edge));
    //                         // messages.push("Let's traverse to the left edge of the node.");
    //                     } else {
    //                         temp_x = node.x - 20 + tempMod;
    //                         temp_y = node.y + 10;
    //                         temp_x2 = node.x - 17 + tempMod;
    //                         temp_y2 = node.y + 8;

    //                         // node.lEdge = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
    //                         node.left = new Node(this.ref, val, temp_x, temp_y, i, node);

    //                         steps.push(new EmptyStep());
    //                         messages.push( node.value + " has no left child.");

    //                         steps.push(new NewNodeStep(node.left, node.lEdge));
    //                         messages.push("Let's insert " + val + " to the left of node " + node.value );

    //                         // steps.push(new UnHighlightNodeStep(node.left, node.lEdge));
    //                         //steps.push(new UnHighlightPathStep(root, val));
    //                         steps.push(new EmptyStep());
    //                         messages.push("Let's insert " + val + " to the left of node " + node.value );

    //                         //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
    //                         // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
    //                         // if (level > this.state.maxLevel) {
    //                         //     this.setState({maxLevel: level});
    //                         //     this.adjustDistances(root, level);
    //                         // }
    //                         i++;
    //                         j++;
    //                         node.height = 1 + max(getHeight(node.left), getHeight(node.right));
    //                         // updateHeights(root);
    //                         break;
    //                     }
    //                 } else if (val > node.value) {
    //                     steps.push(new EmptyStep());
    //                     messages.push( val + " is greater than " + node.value );

    //                     // steps.push(new UnHighlightNodeStep(node, null));
    //                     // messages.push(val + " is greater than " + node.value);

    //                     if(node.right != null) {
    //                         // var edge = node.rEdge
    //                         node = node.right;
    //                         // steps.push(new HighlightNodeStep(node, edge));
    //                         steps.push(new EmptyStep());
    //                         messages.push("Let's traverse to the right edge of the node.");

    //                         // steps.push(new UnHighlightNodeStep(node, edge));
    //                         // messages.push("Let's traverse to the right edge of the node.");
    //                     } else {
    //                         temp_x = node.x + 20 - tempMod;
    //                         temp_y = node.y + 10;
    //                         temp_x2 = node.x + 17 - tempMod;
    //                         temp_y2 = node.y + 8;
    //                         // node.rEdge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
    //                         node.right = new Node(this.ref, val, temp_x, temp_y, i, node);

    //                         steps.push(new EmptyStep());
    //                         messages.push( node.value + " has no right child.");

    //                         steps.push(new NewNodeStep(node.right, node.rEdge));
    //                         messages.push("Let's insert " + val + " to the right of node " + node.value );

    //                         // steps.push(new UnHighlightNodeStep(node.right, node.rEdge));
    //                         //steps.push(new UnHighlightPathStep(root, val));
    //                         steps.push(new EmptyStep());
    //                         messages.push("Let's insert " + val + " to the right of node " + node.value );

    //                         //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
    //                         // if (level > this.state.maxLevel) {
    //                         //     this.setState({maxLevel: level});
    //                         //     this.adjustDistances(root, level);
    //                         // }
    //                         i++;
    //                         j++;
    //                         node.height = 1 + max(getHeight(node.left), getHeight(node.right));
    //                         //updateHeights(root);
    //                         break;
    //                     }
    //                 } else {
    //                     steps.push(new EmptyStep());
    //                     messages.push(val + " is equal to " + node.value);

    //                     // steps.push(new UnHighlightNodeStep(node, null));
    //                     //steps.push(new UnHighlightPathStep(root, val));
    //                     messages.push("There cannot be duplicate values in a BST, so we will move on.");
    //                     break;
    //                 }
    //                 level++;
    //             }
    //         }

    //         //console.log(root);
    //         root = this.BalancingRecursion(root, val);
    //         readjustCoordinates(root)
    //         console.log(root);
    //     }

    //     steps.push(new EmptyStep())
    //     messages.push("AVL Tree insertion complete!");
    //     console.log(this.state.root);
    //     this.setState({steps: steps});
    //     this.setState({messages: messages});
    // }

    simulate() {
        console.log("SIMULATING");
        var val = Math.floor(Math.random() * 100);
        var level = 0;
        var modifier = 4;
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
                root = new Node(this.ref, val, x, y, i);
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
                
                [root, steps, messages] = this.insertingvalue(root, steps, messages, val, x, y, level, modifier);
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

    insertingvalue(node, steps, messages, val, x, y, lev, mod){

        var tempMod = (lev*mod) > 15 ? 15 : (lev*mod);
        if(node === null){

            node = new Node(this.ref, val, x, y, i);
            steps.push(new NewNodeStep(node, null));
            messages.push("Let's insert " + val );
            return [node, steps, messages];
        }
        else if(val < node.value){
            [node.left, steps, messages] = this.insertingvalue(node.left, steps, messages, val, node.x-20+tempMod, node.y+10, ++lev, mod);
        }
        else if(val > node.value){
            [node.right, steps, messages] = this.insertingvalue(node.right, steps, messages, val, node.x+20-tempMod, node.y+10, ++lev, mod);
        }
        else{
            steps.push(new EmptyStep());
            messages.push("There cannot be duplicate values in a BST, so we will move on.");
            console.log("DUPLICATE: " + val);
            
            return [node, steps, messages];
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

        return[node, steps, messages];
    }

    BalancingRecursion(node, val){
        if(node == null) return;

        this.BalancingRecursion(node.left);
        this.BalancingRecursion(node.right);
        
        var balance = getHeight(node);
        node.balance = balance;
    }
    // BalancingRecursion(node, val){
    //     if(node == null) return;

    //     this.BalancingRecursion(node.left);
    //     this.BalancingRecursion(node.right);
        
    //     var balance = getHeight(node);
    //     node.balance = balance;

    //     // console.log("NODE " + node.value + ": " + balance);
    //     // console.log("NODE " + node.value);
    //     // if(node.right !=null)
    //     //     console.log("NODER " + node.right.value);
    //     // if(node.left !=null)
    //     //     console.log("NODEL " + node.left.value);

    //     if(balance > 1 && val < node.left.value){
    //         //console.log("RR NODE " + node.value + ": " + balance);
    //         console.log("RIGHT ROTATE");
    //         node = new rightRotation(node);
    //     }

    //     if(balance < -1 && val > node.right.value){
    //         //console.log("LR NODE " + node.value + ": " + balance);
    //         console.log("LEFT ROTATE");
    //         node = new leftRotation(node);
    //     }

    //     if(balance > 1 && val > node.left.value){
    //         //console.log("LRR NODE " + node.value + ": " + balance);
    //         console.log("LEFT-RIGHT ROTATE");
    //         // node.left = new leftRotation(node.left);
    //         // node = new rightRotation(node);
    //     }

    //     if(balance < -1 && val < node.right.value){
    //         //console.log("RLR NODE " + node.value + ": " + balance);
    //         console.log("RIGHT-LEFT ROTATE");
    //         // node.right = new rightRotation(node.right);
    //         // node = new leftRotation(node);  
    //     }

    //     return node;
    // }

    turnOffRunning() {
		console.log("setting running to false");
		this.setState({running: false});
	}

    // restart(){
    //     console.log("RESTART CLICKED");
    //     d3.select(this.ref.current).select("svg").remove();
    //     document.getElementById("message").innerHTML = "<h1>Welcome to Binary Search Tree!</h1>";
    //     i = 0;
    //     j = 0;
    //     this.setState({maxLevel: -1, root: null})
    //     this.initialize();
    // }

    backward(){
        console.log("BACKWARDS CLICKED");
    }

    forward(){		
		console.log("FORWARD CLICKED");

		if (this.state.running) return; // The user can't step forward while running via the play
										// button so as not to ruin the visualizer
		if (this.state.stepId === this.state.steps.length) return; // At the end of the step queue
		
		// Uses the step's fastForward function and displays associated message
		this.state.steps[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg g"));
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
        this.initialize();  
        this.simulate();

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
            </div>
        )
    }
}