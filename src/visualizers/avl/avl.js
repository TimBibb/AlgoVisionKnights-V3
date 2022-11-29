import React from "react";
import "./avl.css";
import * as d3 from "d3";
import createDefaultTree from "../../foundation/tree/CreateDefaultTree";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import "../css/input.css";
import LabeledNode from "../../foundation/tree/LabeledNode";
import Edge from "../../foundation/tree/Edge";
import { MessageSharp, StoreSharp } from "@material-ui/icons";
import { local, svg, tree } from "d3";
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
		svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.node.textId).attr("visibility", "visible");
	}
}

class HighlightPathStep {
    constructor(node) {
        this.node = node;
    }
    
    forward(svg) {
        svg.select("#" + this.node.id).attr("stroke", localStorage.getItem("accentColor"));
        
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
            svg.select("#" + node.id).attr("stroke", localStorage.getItem("secondaryColor"));
            if (this.finalVal < node.value) {
                edge = node.lEdge;
                node = node.left;
            } else  if (this.finalVal > node.value) {
                edge = node.rEdge;
                node = node.right;
            } else {
                return;
            }
        }
    }
}

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

class Edges {
    constructor(ref, x1, y1, x2, y2, j){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.id = "edge" + j;

        this.edge = new Edge(
            ref,
            this.id,
            this.x1 + "%",
            this.y1 + "%",
            this.x2 + "%",
            this.y2 + "%",
            "hidden"
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

function rightRotation(node_y, steps, messages, pseudocodeArr, lines){
    var flag = 1;
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
    messages.push("Starting Right Rotation in the following subtree.");
    pseudocodeArr.push(new HighlightLineStep(63, lines));

    [node_x, steps, messages, pseudocodeArr] = HightlightNodes(node_x, steps, messages, node_y.x, node_y.y, node_y.level, flag, pseudocodeArr, lines);

    steps.push(new EmptyStep());
    messages.push("Doing the Right Rotation.");
    pseudocodeArr.push(new HighlightLineStep(68, lines));

    [steps, messages, pseudocodeArr] = RotatingNodes(node_x, steps, messages, pseudocodeArr, lines);

    //Trying to Unhighlight
    [steps, messages, pseudocodeArr] = UnHightlightNodes(node_x, steps, messages, pseudocodeArr, lines);

    return [node_x, steps, messages, pseudocodeArr];
}

function leftRotation(node_x, steps, messages, pseudocodeArr, lines){
    var flag = 0;
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
    pseudocodeArr.push(new HighlightLineStep(55, lines));

    [node_y, steps, messages, pseudocodeArr] = HightlightNodes(node_y, steps, messages, node_x.x, node_x.y, node_x.level, flag, pseudocodeArr, lines);

    steps.push(new EmptyStep());
    messages.push("Doing the Left Rotation.");
    pseudocodeArr.push(new HighlightLineStep(60, lines));

    [steps, messages, pseudocodeArr] = RotatingNodes(node_y, steps, messages, pseudocodeArr, lines);

    //Trying to Unhighlight
    [steps, messages, pseudocodeArr] = UnHightlightNodes(node_y, steps, messages, pseudocodeArr, lines);

    // console.log(node)
    // console.log(JSON.parse(JSON.stringify(node_y)));

    return [node_y, steps, messages, pseudocodeArr];
}

function HightlightNodes(node, steps, messages, x_coor, y_coor, lev, flag, pseudocodeArr, lines){
    var tempMod = (lev*mod) > 15 ? 15 : (lev*mod);
    if(node !== null){
        node.x = x_coor;
        node.y = y_coor;
        node.level = lev
        
        node.leftEdge.x1 = node.x-3;
        node.leftEdge.y1 = node.y+1.5;
        node.leftEdge.x2 = node.x-17+tempMod;
        node.leftEdge.y2 = node.y+8;

        node.rightEdge.x1 = node.x+3;
        node.rightEdge.y1 = node.y+1.5;
        node.rightEdge.x2 = node.x+17-tempMod;
        node.rightEdge.y2 = node.y+8;

        if(flag === 0){
            steps.push(new HighlightNodeStep(node));
            messages.push("Starting Left Rotation in the following subtree.");
            pseudocodeArr.push(new HighlightLineStep(60, lines));
        }else{
            steps.push(new HighlightNodeStep(node));
            messages.push("Starting Right Rotation in the following subtree.");
            pseudocodeArr.push(new HighlightLineStep(68, lines));
        }

        if(node.left !== null)
            [node.left, steps, messages, pseudocodeArr] = HightlightNodes(node.left, steps, messages, node.x-20+tempMod, node.y+10, node.level + 1, flag, pseudocodeArr, lines);
        if(node.right !== null)
            [node.right, steps, messages, pseudocodeArr] = HightlightNodes(node.right, steps, messages, node.x+20-tempMod, node.y+10, node.level + 1, flag, pseudocodeArr, lines);
    }

    return [node, steps, messages, pseudocodeArr]
}

class HighlightNodeStep{
    constructor(node){
        this.node = node;
    }

    forward(svg){
        if(this.node !== null){
            svg.select("#" + this.node.id).attr("stroke", localStorage.getItem("accentColor"));
        }
    }
}

function RotatingNodes(tempNode, steps, messages, pseudocodeArr, lines){

    steps.push(new EmptyStep());
    messages.push("Performing rotation.");
    pseudocodeArr.push(new HighlightLineStep(71, lines));

    steps.push(new EmptyStep());
    messages.push("Is the node rotating null?");
    pseudocodeArr.push(new HighlightLineStep(72, lines));

    if (tempNode !== null){

        var node = JSON.parse(JSON.stringify(tempNode));
        //console.log(node.value + ": xcoor-> " + node.x + " ycoor-> " + node.y);
        steps.push(new RotationStep(node, node.x, node.y, node.leftEdge, node.rightEdge, node.leftEdge.x1, node.leftEdge.y1, node.leftEdge.x2, node.leftEdge.y2, node.rightEdge.x1, node.rightEdge.y1, node.rightEdge.x2, node.rightEdge.y2));
        messages.push("Rotating node " + node.value + ".");
        pseudocodeArr.push(new HighlightLineStep(72, lines));

        steps.push(new EmptyStep());
        messages.push("Is the node to the left null?");
        pseudocodeArr.push(new HighlightLineStep(73, lines));

        if(node.left !== null) {
            steps.push(new EmptyStep());
            messages.push("Rotating left node.");
            pseudocodeArr.push(new HighlightLineStep(74, lines));

            [steps, messages, pseudocodeArr] = RotatingNodes(node.left, steps, messages, pseudocodeArr, lines);
        }
        
        steps.push(new EmptyStep());
        messages.push("Is the node to the right null?");
        pseudocodeArr.push(new HighlightLineStep(76, lines));

        if(node.right !== null) {
            steps.push(new EmptyStep());
            messages.push("Rotating right node.");
            pseudocodeArr.push(new HighlightLineStep(77, lines));

            [steps, messages, pseudocodeArr] = RotatingNodes(node.right, steps, messages, pseudocodeArr, lines);
        }
    }

    steps.push(new EmptyStep());
    messages.push("Rotation complete.");
    pseudocodeArr.push(new HighlightLineStep(80, lines));

    return [steps, messages, pseudocodeArr];
}

class RotationStep{
    constructor(node, cx, cy, ledge, redge, lx1, ly1, lx2, ly2, rx1, ry1, rx2, ry2){
        this.node = node;
        this.cx = cx;
        this.cy = cy;

        this.ledge = ledge;
        this.lx1 = lx1;
        this.ly1 = ly1;
        this.lx2 = lx2;
        this.ly2 = ly2;

        this.redge = redge;
        this.rx1 = rx1;
        this.ry1 = ry1;
        this.rx2 = rx2;
        this.ry2 = ry2;
    }
    
    forward(svg){
        console.log(JSON.parse(JSON.stringify(this.node)));
        svg.select("#" + this.node.id)
			.attr("cx", this.cx + "%")
            .attr("cy", this.cy + "%");

        svg.select("#" + this.node.textId)
            .attr("x", this.cx + "%")
            .attr("y", this.cy + "%");

        if(this.node.left === null){
            svg.select("#" + this.ledge.id)
                .attr("x1", this.lx1 + "%")
                .attr("y1", this.ly1 + "%")
                .attr("x2", this.lx2 + "%")
                .attr("y2", this.ly2 + "%")
                .attr("visibility", "hidden");
        }else{
            svg.select("#" + this.ledge.id)
                .attr("x1", this.lx1 + "%")
                .attr("y1", this.ly1 + "%")
                .attr("x2", this.lx2 + "%")
                .attr("y2", this.ly2 + "%")
                .attr("visibility", "visible");
        }

        if(this.node.right === null){
            svg.select("#" + this.redge.id)
                .attr("x1", this.rx1 + "%")
                .attr("y1", this.ry1 + "%")
                .attr("x2", this.rx2 + "%")
                .attr("y2", this.ry2 + "%")
                .attr("visibility", "hidden");
        }else{
            svg.select("#" + this.redge.id)
                .attr("x1", this.rx1 + "%")
                .attr("y1", this.ry1 + "%")
                .attr("x2", this.rx2 + "%")
                .attr("y2", this.ry2 + "%")
                .attr("visibility", "visible");
        }
    }

    fastForward(svg){
        this.forward(svg);
    }
}

function UnHightlightNodes(node, steps, messages, pseudocodeArr, lines){
    if(node !== null){

        steps.push(new UnHighlightNodeStep(node));
        messages.push("Finishing Rotation(s)");
        pseudocodeArr.push(new HighlightLineStep(71, lines));

        if(node.left !== null)
            [steps, messages, pseudocodeArr] = UnHightlightNodes(node.left, steps, messages, pseudocodeArr, lines);
        if(node.right !== null)
            [steps, messages, pseudocodeArr] = UnHightlightNodes(node.right, steps, messages, pseudocodeArr, lines);
    }

    return [steps, messages, pseudocodeArr];
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
            root: null,
            interval: null,
            svg: null,
            intTest: null,
            inserting: false,
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
        this.handleInsertion = this.handleInsertion.bind(this);
        this.isRunningCheck = this.isRunningCheck.bind(this);
        this.startRunning = this.startRunning.bind(this);
        this.clearSteps = this.clearSteps.bind(this);
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
        this.setState({svg: svgGroup})
        return svgGroup;
    }

    newAdd(val, oldroot) {
        console.log("newAdd running");
        var steps = []
        var messages = []
        var pseudocodeArr = [];
        var root = oldroot;

        steps.push(new EmptyStep());
        messages.push("Starting AVL Tree Insertion Simulation.");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

        // steps.push(new EmptyStep());
        // messages.push("Our tree is currently empty. Let's add some nodes!");
        // pseudocodeArr.push(new HighlightLineStep(3, this.props.lines));

        // steps.push(new EmptyStep());
        // messages.push("There are less nodes than the max allowed.");
        // pseudocodeArr.push(new HighlightLineStep(3, this.props.lines));

        //console.log(root);
        console.log(val);

        steps.push(new EmptyStep());
        messages.push("The next value we will insert into the tree is " + val);
        pseudocodeArr.push(new HighlightLineStep(4, this.props.lines));

        steps.push(new EmptyStep());
        messages.push("Does the tree have a root node?");
        pseudocodeArr.push(new HighlightLineStep(5, this.props.lines));

        if(!root) {

            steps.push(new EmptyStep());
            messages.push("The tree does not have a root node. Setting the root!");
            pseudocodeArr.push(new HighlightLineStep(5, this.props.lines));

            root = new Node(this.ref, val, x, y, i, 0);
            var tempMod = (root.level*mod) > 15 ? 15 : (root.level*mod);
            root.leftEdge = new Edges(this.ref, root.x-3, root.y+1.5, root.x-17+tempMod, root.y+8, j++);
            root.rightEdge = new Edges(this.ref, root.x+3, root.y+1.5, root.x+17-tempMod, root.y+8, j++);
            // this.setState({root: root})
            //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
            // steps.push(new UnHighlightNodeStep(this.state.root, null));
            //steps.push(new UnHighlightPathStep(root, val));

            steps.push(new NewNodeStep(root, null));
            messages.push("The tree is empty, let's add "+ val + " as the root node.");
            pseudocodeArr.push(new HighlightLineStep(6, this.props.lines));

            steps.push(new UnHighlightPathStep(root, val));
            messages.push("The tree has a root node!");
            pseudocodeArr.push(new HighlightLineStep(7, this.props.lines));
            i++;
        }
        else{
            
            steps.push(new EmptyStep());
            messages.push("Yes! It has root!");
            pseudocodeArr.push(new HighlightLineStep(9, this.props.lines));
            
            steps.push(new EmptyStep());
            messages.push("We will be inserting a new value into the tree!");
            pseudocodeArr.push(new HighlightLineStep(10, this.props.lines));

            [root, steps, messages, pseudocodeArr] = this.insertingvalue(root, steps, messages, val, x, y, root.level, pseudocodeArr);

        }

        steps.push(new EmptyStep())
        messages.push("AVL Tree insertion complete!");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

        this.setState({steps: steps});
        this.setState({messages: messages});
        this.setState({root: root})
        this.props.handleCodeStepsChange(pseudocodeArr);
    }

    simulate() {
        console.log("SIMULATING");
        var val = Math.floor(Math.random() * 100);
        // var modifier = 4;
        var steps = []
        var messages = []
        var root = null;

        var pseudocodeArr = [];

        steps.push(new EmptyStep());
        messages.push("Welcome to the AVL Tree Simulation.");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

        steps.push(new EmptyStep());
        messages.push("Our tree is currently empty. Let's add some nodes!");
        pseudocodeArr.push(new HighlightLineStep(3, this.props.lines));

        while (i < MAX_NODE) {
            val = Math.floor(Math.random() * 100);
            steps.push(new EmptyStep());
            messages.push("There are less nodes than the max allowed.");
            pseudocodeArr.push(new HighlightLineStep(3, this.props.lines));

            //console.log(root);
            console.log(val);

            steps.push(new EmptyStep());
            messages.push("The next value we will insert into the tree is " + val);
            pseudocodeArr.push(new HighlightLineStep(4, this.props.lines));

            steps.push(new EmptyStep());
            messages.push("Does the tree have a root node?");
            pseudocodeArr.push(new HighlightLineStep(5, this.props.lines));

            if(!root) {

                steps.push(new EmptyStep());
                messages.push("The tree does not have a root node. Setting the root!");
                pseudocodeArr.push(new HighlightLineStep(5, this.props.lines));

                root = new Node(this.ref, val, x, y, i, 0);
                var tempMod = (root.level*mod) > 15 ? 15 : (root.level*mod);
                root.leftEdge = new Edges(this.ref, root.x-3, root.y+1.5, root.x-17+tempMod, root.y+8, j++);
                root.rightEdge = new Edges(this.ref, root.x+3, root.y+1.5, root.x+17-tempMod, root.y+8, j++);
                // this.setState({root: root})
                //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
                // steps.push(new UnHighlightNodeStep(this.state.root, null));
                //steps.push(new UnHighlightPathStep(root, val));

                steps.push(new NewNodeStep(root, null));
                messages.push("The tree is empty, let's add "+ val + " as the root node.");
                pseudocodeArr.push(new HighlightLineStep(6, this.props.lines));

                steps.push(new UnHighlightPathStep(root, val));
                messages.push("The tree has a root node!");
                pseudocodeArr.push(new HighlightLineStep(7, this.props.lines));
                i++;
            }
            else{
                
                steps.push(new EmptyStep());
                messages.push("Yes! It has root!");
                pseudocodeArr.push(new HighlightLineStep(9, this.props.lines));
                steps.push(new EmptyStep());
                messages.push("We will be inserting a new value into the tree!");
                pseudocodeArr.push(new HighlightLineStep(10, this.props.lines));

                [root, steps, messages, pseudocodeArr] = this.insertingvalue(root, steps, messages, val, x, y, root.level, pseudocodeArr);

            }

            // console.log(root);
            console.log(JSON.parse(JSON.stringify(root)));

        }

        steps.push(new EmptyStep())
        messages.push("AVL Tree insertion complete!");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

        this.setState({steps: steps});
        this.setState({messages: messages});
        this.setState({root:root})
        this.props.handleCodeStepsChange(pseudocodeArr);
        
    }

    insertingvalue(node, steps, messages, val, x, y, lev, pseudocodeArr){

        steps.push(new EmptyStep());
        messages.push("Beginning insertion process.");
        pseudocodeArr.push(new HighlightLineStep(15, this.props.lines));

        var tempMod = (lev*mod) > 15 ? 15 : (lev*mod);

        steps.push(new EmptyStep());
        messages.push("Is the current node value null?");
        pseudocodeArr.push(new HighlightLineStep(16, this.props.lines));

        if(node === null){
            steps.push(new EmptyStep());
            messages.push("The current node is equal to null. Inserting value!");
            pseudocodeArr.push(new HighlightLineStep(16, this.props.lines));

            node = new Node(this.ref, val, x, y, i, lev);
            node.leftEdge = new Edges(this.ref, node.x-3, node.y+1.5, node.x-17+tempMod, node.y+8, j++);
            node.rightEdge = new Edges(this.ref, node.x+3, node.y+1.5, node.x+17-tempMod, node.y+8, j++);
            i++;

            steps.push(new NewNodeStep(node, null));
            messages.push("Let's insert the new value " + val );
            pseudocodeArr.push(new HighlightLineStep(17, this.props.lines));

            steps.push(new UnHighlightPathStep(node));
            messages.push("Let's insert the new value " + val);
            pseudocodeArr.push(new HighlightLineStep(18, this.props.lines));

            return [node, steps, messages, pseudocodeArr];
        }
        else if(val < node.value){
            steps.push(new HighlightPathStep(node));
            messages.push("Is the new value " + val + " < the current node " + node.value + "?");
            pseudocodeArr.push(new HighlightLineStep(20, this.props.lines));

            steps.push(new EdgeVisible(node.leftEdge));
            messages.push("Is the value " + val + " < the current node " + node.value + "?");
            pseudocodeArr.push(new HighlightLineStep(20, this.props.lines));

            steps.push(new UnHighlightPathStep(node));
            messages.push("Is the value " + val + " < the current node " + node.value + "?");
            pseudocodeArr.push(new HighlightLineStep(20, this.props.lines));

            steps.push(new EmptyStep());
            messages.push(val + " is < current node. Inserting to the left!");
            pseudocodeArr.push(new HighlightLineStep(21, this.props.lines));
            [node.left, steps, messages, pseudocodeArr] = this.insertingvalue(node.left, steps, messages, val, node.x-20+tempMod, node.y+10, ++lev, pseudocodeArr);
        }
        else if(val > node.value){
            steps.push(new HighlightPathStep(node));
            messages.push("Is the value " + val + " > the current node " + node.value + "?");
            pseudocodeArr.push(new HighlightLineStep(23, this.props.lines));

            steps.push(new EdgeVisible(node.rightEdge));
            messages.push("Is the value " + val + " > the current node " + node.value + "?");
            pseudocodeArr.push(new HighlightLineStep(23, this.props.lines));

            steps.push(new UnHighlightPathStep(node));
            messages.push("Is the value " + val + " > the current node " + node.value + "?");
            pseudocodeArr.push(new HighlightLineStep(23, this.props.lines));

            steps.push(new EmptyStep());
            messages.push(val + " is > current node. Inserting to the right!");
            pseudocodeArr.push(new HighlightLineStep(24, this.props.lines));
            [node.right, steps, messages, pseudocodeArr] = this.insertingvalue(node.right, steps, messages, val, node.x+20-tempMod, node.y+10, ++lev, pseudocodeArr);
        }
        else{
            steps.push(new EmptyStep());
            messages.push(val + " is a duplicate!");
            pseudocodeArr.push(new HighlightLineStep(26, this.props.lines));

            steps.push(new EmptyStep());
            messages.push("There cannot be duplicate values in an AVL, so we will move on.");
            pseudocodeArr.push(new HighlightLineStep(27, this.props.lines));
            console.log("DUPLICATE: " + val);
            
            return [node, steps, messages, pseudocodeArr]; //j instead of pseudo
        }

        node.height = 1 + max(height(node.left), height(node.right));

        steps.push(new EmptyStep());
        messages.push("Setting balance value to determine needed rotations.");
        pseudocodeArr.push(new HighlightLineStep(29, this.props.lines));

        var balance = getHeight(node);

        var lines = this.props.lines;
        //console.log("Node: " + node.value + ", height: " + node.height + ", balance: " + balance)
        //console.log("node" + node.value + " height " + node.height);
        //console.log("node" + node.value + " balance " + balance);

        steps.push(new EmptyStep());
        messages.push("Is the balance value greater or less than 1?");
        pseudocodeArr.push(new HighlightLineStep(30, this.props.lines));

        if(balance > 1){

            steps.push(new EmptyStep());
            messages.push("Balance value is > 1. Is " + val + " < or > than node.left?");
            pseudocodeArr.push(new HighlightLineStep(31, this.props.lines));

            if(val < node.left.value){
                console.log("RIGHT ROTATE in node: " + node.value);

                steps.push(new EmptyStep());
                messages.push("We will perform a Right Rotation in node " + node.value);
                pseudocodeArr.push(new HighlightLineStep(32, this.props.lines));

                [node, steps, messages, pseudocodeArr] = rightRotation(node, steps, messages, pseudocodeArr, lines);
                
                steps.push(new EmptyStep());
                messages.push("Rotation successful.");
                pseudocodeArr.push(new HighlightLineStep(33, this.props.lines));
                
                return [node, steps, messages, pseudocodeArr];
            }
            else if(val > node.left.value){
                console.log("LEFT-RIGHT ROTATE in node: " + node.left.value + " and " + node.value);
                
                steps.push(new EmptyStep());
                messages.push("We will perform a Left-Right Rotation in the subtree starting in node " + node.value);
                pseudocodeArr.push(new HighlightLineStep(35, this.props.lines));

                steps.push(new EmptyStep());
                messages.push("Performing left rotation.");
                pseudocodeArr.push(new HighlightLineStep(36, this.props.lines));

                [node.left, steps, messages, pseudocodeArr] = leftRotation(node.left, steps, messages, pseudocodeArr, lines);
                
                steps.push(new EmptyStep());
                messages.push("Performing right rotation.");
                pseudocodeArr.push(new HighlightLineStep(37, this.props.lines));

                [node, steps, messages, pseudocodeArr] = rightRotation(node, steps, messages, pseudocodeArr, lines);
                
                steps.push(new EmptyStep());
                messages.push("Rotations successful.");
                pseudocodeArr.push(new HighlightLineStep(38, this.props.lines));
                
                return [node, steps, messages, pseudocodeArr];
            }
        }
        if(balance < -1){

            steps.push(new EmptyStep());
            messages.push("Balance value is < 1. Is " + val + " < or > than node.right?");
            pseudocodeArr.push(new HighlightLineStep(41, this.props.lines));

            if(val > node.right.value){
                console.log("LEFT ROTATE in node: " + node.value);

                steps.push(new EmptyStep());
                messages.push(val + " is > " + node.right.value);
                pseudocodeArr.push(new HighlightLineStep(42, this.props.lines));

                steps.push(new EmptyStep());
                messages.push("We will perform a Left Rotation in node " + node.value);
                pseudocodeArr.push(new HighlightLineStep(43, this.props.lines));

                [node, steps, messages, pseudocodeArr] = leftRotation(node, steps, messages, pseudocodeArr, lines);
                
                steps.push(new EmptyStep());
                messages.push("Rotation successful.");
                pseudocodeArr.push(new HighlightLineStep(44, this.props.lines));
                
                return [node, steps, messages, pseudocodeArr];
            }
            else if(val < node.right.value){
                console.log("RIGHT-LEFT ROTATE in node: " + node.right.value + " and " + node.value);
                
                steps.push(new EmptyStep());
                messages.push("We will perform a Right-Left Rotation in the subtree starting in node " + node.value);
                pseudocodeArr.push(new HighlightLineStep(46, this.props.lines));

                steps.push(new EmptyStep());
                messages.push("Performing right rotation.");
                pseudocodeArr.push(new HighlightLineStep(47, this.props.lines));

                [node.right, steps, messages, pseudocodeArr] = rightRotation(node.right, steps, messages, pseudocodeArr, lines);
                
                steps.push(new EmptyStep());
                messages.push("Performing left rotation.");
                pseudocodeArr.push(new HighlightLineStep(48, this.props.lines));
                
                [node, steps, messages, pseudocodeArr] = leftRotation(node, steps, messages, pseudocodeArr, lines);
                
                steps.push(new EmptyStep());
                messages.push("Rotations successful.");
                pseudocodeArr.push(new HighlightLineStep(49, this.props.lines));
                
                return [node, steps, messages, pseudocodeArr];
            }
        }

        steps.push(new EmptyStep());
        messages.push("Insertion successful.");
        pseudocodeArr.push(new HighlightLineStep(52, this.props.lines));

        console.log(steps.length);
        console.log(messages.length);
        console.log(pseudocodeArr.length);

        return[node, steps, messages, pseudocodeArr];
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
		

        this.props.codeSteps[this.state.stepId].forward();
		// Uses the step's fastForward function and displays associated message
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg g"));
		document.getElementById("message").innerHTML = "<h1>" + this.state.messages[this.state.stepId] + "</h1>";

		this.setState({stepId: this.state.stepId + 1});

		d3.timeout(this.turnOffRunning, this.props.waitTime); // Calls function after wait time
    }

    run(){
        clearInterval(this.state.interval)
		if (!this.state.running) return;
		if (this.state.stepId === this.state.steps.length) {
			this.setState({running: false});
			return;
		}

        this.props.codeSteps[this.state.stepId].forward();
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg g"));
		document.getElementById("message").innerHTML = "<h1>" +  this.state.messages[this.state.stepId] + "</h1>";
		this.setState({stepId: this.state.stepId + 1});
		// d3.timeout(this.run, this.props.waitTime);
        this.setState({interval: setInterval(this.run, this.props.waitTime)})

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

		this.setState({running: false, steps: [], messages: [], tree: [], maxLevel: -1, stepId: 0, root: null, svg: null, inserting: false});
        this.initialize();
        i = 0;
        j = 0;

	}

    restartInsertion() {
		console.log("RESTART CLICKED");
        
		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "Welcome to AVL Tree Insertion!";

		this.setState({running: false, steps: [], messages: [], tree: [], stepId: 0, root: null, svg: null, inserting: true});
        this.initialize();
        i = 0;
        j = 0;
	}

    clearSteps() {
        console.log("clearing steps")
		this.setState({steps: [], messages: [], stepId: 0});
	}


    componentDidMount() {
        this.initialize();   
        // this.simulate();
    }

    // Calls functions depending on the change in state
	componentDidUpdate(prevProps, prevState) {
        // console.log(this.state.root);
		// Part of restart -> Reinitialize with original array
        if (this.state.svg !== prevState.svg && this.state.svg != null && !this.state.inserting) {
            console.log("first")
            this.simulate();
        }
        // else if (this.state.root !== prevState.root && this.state.root === null) {
		// 	console.log("Steps changed");
		// 	var svg = this.initialize();
        //     this.simulate();
		// 	svg.attr("visibility", "visible");
		// }
		else if (this.state.running !== prevState.running && this.state.running === true)
		{
			this.run();
			console.log("We ran");
		}
	}

    componentWillUnmount() {
        console.log("component unmounted")
        clearInterval(this.state.interval);
    }

    isRunningCheck(id) {
        if (this.state.running) {
          d3.select(id).property("value", "Error: Visualizer Running");
          return true;
        }
    
        return false;
    }

    startRunning() {
        this.setState({running: true})
        clearInterval(this.state.intTest)
    }

    handleInsertion() {
        let x = d3.select("#insertionValue").property("value");
        console.log(`Called insertion(${x})`);
        var root = this.state.root
    
        let isRunning = this.isRunningCheck("#insertionValue");
        if (isRunning) return;
        //document.getElementById("message").innerHTML = "Let's insert "+ parseInt(x) + " into the tree.";

        if (!this.state.inserting) {
            root = null
            this.setState({inserting: true})
            this.restartInsertion();
        } else {
            this.clearSteps()
        }

		// this.setState({running: false, steps: [], messages: [], tree: [], stepId: 0, root: null, svg: null});
        // this.initialize();
        // this.restart()
        // this.fastForward();
        var int = parseInt(x)
    
        this.newAdd(parseInt(x), root);
        console.log("trying to run")
        this.setState({intTest: setInterval(this.startRunning, 1500)})
        // this.setState({running: true})
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
                    {/* <button class="button" onClick={this.backward}>Step Backward</button>  */}
                    <button class="button" onClick={this.forward}>Step Forward</button>
                    <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
                </div>
                <div id="insertion" class="center-screen">
                    <input class="inputValue2"type="number" id="insertionValue" placeholder="ex. 25"></input>
                    <button class="button" id="insertBut" onClick={this.handleInsertion}>Insert</button>
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
                    <div id="visualizerDiv" ref={this.ref} class="center-screen tree-vis grabbable"></div>
					<Pseudocode algorithm={"AVL"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
            </div>
        )
    }
}