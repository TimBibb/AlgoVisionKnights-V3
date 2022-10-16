import React from "react";
import "./avl.css";
import * as d3 from "d3";
import createDefaultTree from "../../foundation/tree/CreateDefaultTree";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import LabeledNode from "../../foundation/avl/LabeledNode";
import Edge from "../../foundation/tree/Edge";
import { MessageSharp } from "@material-ui/icons";
import { tree } from "d3";
import { ConsoleView } from "react-device-detect";

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
    backward() {}
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
    constructor(ref, value, x, y, i, parent) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
        this.height = 0;
        this.balance = 0;
        this.id =  "node" + i;
        this.textId = "label" + i;
        this.parent = parent;

        let node = new LabeledNode(
            ref,
            "node" + i,
            "label" + i,
            this.x + "%",
            this.y + "%",
            this.value,
            "visible",
            "white"
        );
    }
}

function height(node){
  if(node == null)
    return 0;
  
  return node.height;
}

function max(a, b){
  if(a > b)
    return a;
  return b;
}

function getHeight(node){
  if(node == null)
    return 0;
  return height(node.left) - height(node.right);
}

// function Balancing(node, val){
//     if(node != null){
//         Balancing(node.left);
//         Balancing(node.right);
    
//         //console.log("AQUIIII" + node.value + " " + node.height);
        
//         var balance = getHeight(node);
//         node.balance = balance;

//         console.log("NODE " + node.value + ": " + balance);

//         if(balance > 1 && val < node.left.value){
//             console.log("RIGHT ROTATE");
//             rightRotation(node);
//         }

//         if(balance < -1 && val > node.right.value){
//             console.log("LEFT ROTATE");
//             leftRotation(node);
//         }

//         if(balance > 1 && val > node.left.value){
//             console.log("LEFT-RIGHT ROTATE");
//         }

//         if(balance < -1 && val < node.right.value){
//             console.log("RIGHT-LEFT ROTATE");
//         }
//     }
// }

function rightRotation(y){
    let x = y.left;
    let temp = x.right;
    let temp_p1 = y.parent;

    x.right = y;
    y.left = temp;

    x.parent = temp_p1;
    y.parent =  x;
    //console.log("Y: " + y + ", y.left: " + y.left);
    if(y.left != null)
        y.left.parent = y;

    //switchNodes();
    updateHeights(y);
    updateHeights(x);

    return x;
}

function leftRotation(x){
    let y = x.right;
    let temp = y.left;
    let temp_p1 = x.parent;

    y.left = x;
    x.right = temp;

    y.parent = temp_p1;
    x.parent = y;
    //console.log("X: " + x + ", x.right: " + x.right);
    if(x.right != null)
        x.right.parent = x;
    

    //switchNodes();
    updateHeights(y);
    updateHeights(x);

    return y;
}

function updateHeights(node){
  if(node != null){
    updateHeights(node.left);
    updateHeights(node.right);

    //console.log("AQUIIII" + node.value + " " + node.height);
    
    if(node.left == null && node.right == null)
      node.height = 0;
    else
      node.height = 1 + max(height(node.left), height(node.right));
  }
}

function switchNodes(){

}



class changeNodeInfo{
    constructor(node) {
        this.node = node;
    }

    forward(svg) {
        //svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
        svg.select("#" + this.node.id).attr("cx", this.node.x + "%");
        svg.select("#" + this.node.id).attr("cy", this.node.y + "%");
        svg.select("#" + this.node.textId).attr("cx", this.node.x + "%");
        svg.select("#" + this.node.textId).attr("cy", this.node.y + "%");
        // svg.select("#")
        // svg.select("#" + this.node.id).attr("visibility", "visible");
        // svg.select("#" + this.node.textId).attr("visibility", "visible");
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
        };
        
		// Bindings
		this.ref = React.createRef();

		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
        this.add = this.add.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
	}

    handleZoom(e) {
        d3.select(this.ref.current).select("svg g")
            .attr('transform', e.transform);
    }

    initialize() {
        d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "750px");

        let tree = new Tree();
        //tree.addnew(this.ref, 50);
        // tree.addnew(this.ref, 2);
        // tree.addnew(this.ref, 60);
        // tree.addnew(this.ref, 4); 
        // tree.addnew(this.ref, 1); 
        // tree.addnew(this.ref, 70);
        // tree.addnew(this.ref, -3);
        // tree.addnew(this.ref, -2); 
        // tree.addnew(this.ref, 80);
        // tree.addnew(this.ref, 65);
        //tree.addnew(this.ref, 95);

        let zoom = d3.zoom()
            .on('zoom', this.handleZoom);
        
        d3.select(this.ref.current).select("svg")
            .call(zoom);

        this.setState({tree: tree});
    }

    play(){
        console.log("PLAY CLICKED");
    }

    pause(){
        console.log("PAUSE CLICKED");
    }

    // insert(node, value){
    //   if(node == null)
    //     return new Node(this.ref, value, x, y, i);
      
    //   if(value < node.value)
    //     node.left = this.insert(node.left, value);
    //   else if(value > node.value)
    //     node.right = this.insert(node.right, value);
    //   else 
    //     return node;

    //   node.height = 1 + max(height(node.left), height(node.right));

    //   var balance = getHeight(node);

    // }

    // add(){
    //   console.log("ADD CLICKED");
    //   var val = Math.floor(Math.random() * 100);
    //   if(i < MAX_NODE){
    //     this.root = this.insert(this.root, val);
    //     console.log(this.root);
    //     i++;
    //   }
    //   else {
    //     console.log("Max node reached please restart tree.");
    //     //this.messages.push("<h1>Max node reached please restart tree.</h1>");
    //     document.getElementById("message").innerHTML = "<h1>Max node reached please restart tree.</h1>";
    //     return;
    //   }
    // }
  //   add(){
  //     console.log("ADD CLICKED");
  //     var val = Math.floor(Math.random() * 100);
  //     let node = null;

  //     if(i < MAX_NODE){
  //         if(!this.root) {
  //             this.root = new Node(this.ref, val, x, y, i);
  //             //this.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
  //             console.log(this.root);
  //             return;
  //             i++;
  //         } else {
  //             node = this.root;
  //             //y += 10;

  //             this.insert(node, val);        
  //             i++;  
  //         }

  //     } else {
  //         console.log("Max node reached please restart tree.");
  //         //this.messages.push("<h1>Max node reached please restart tree.</h1>");
  //         document.getElementById("message").innerHTML = "<h1>Max node reached please restart tree.</h1>";
  //         return;
  //     }
  // }
    add(){
        console.log("ADD CLICKED");
        var val = Math.floor(Math.random() * 100);
        let node = null;

        if(i < MAX_NODE){
            if(!this.root) {
                this.root = new Node(this.ref, val, x, y, i, null);
                //this.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
                console.log(this.root);
                console.log("BALANCE ROOT: " + getHeight(this.root));
                i++;
                return;
            } else {
                node = this.root;
                //y += 10;

                while(true) {
                    //console.log(node.value);
                    //console.log(node.value + "and" + height(node));
                    if(val < node.value) {
                        if(node.left != null) {
                            node = node.left;
                        } else {
                            temp_x = node.x - 15;
                            temp_y = node.y + 10;
                            temp_x2 = node.x - 12.25;
                            temp_y2 = node.y + 8;
                            node.left = new Node(this.ref, val, temp_x, temp_y, i, node);
                            //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
                            // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
                            //let edge2 = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            i++;
                            j++;
                            updateHeights(this.root);
                            //Balancing(this.root);
                            break;
                        }
                    } else {
                        if(node.right != null) {
                            node = node.right;
                        } else {
                            temp_x = node.x + 15;
                            temp_y = node.y + 10;
                            temp_x2 = node.x + 12.25;
                            temp_y2 = node.y + 8;
                            node.right = new Node(this.ref, val, temp_x, temp_y, i, node);
                            //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
                            //let edge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            i++;
                            j++;
                            updateHeights(this.root);
                            //Balancing(this.root, val);
                            break;
                        }
                    }
                }
            }
            this.root = this.BalancingRecursion(this.root, val);
            this.readjustCoordinates(this.root);
            this.root = this.BalancingRecursion(this.root, val);
            console.log(this.root);

            //var balance = getHeight(this.root);

            //console.log("BALANCE: " + balance);

            

        } else {
            console.log("Max node reached please restart tree.");
            //this.messages.push("<h1>Max node reached please restart tree.</h1>");
            document.getElementById("message").innerHTML = "<h1>Max node reached please restart tree.</h1>";
            return;
        }
    }

    BalancingRecursion(node, val){
        if(node == null) return;

        this.BalancingRecursion(node.left);
        this.BalancingRecursion(node.right);
        
        var balance = getHeight(node);
        node.balance = balance;

        //console.log("NODE " + node.value + ": " + balance);

        if(balance > 1 && val < node.left.value){
            console.log("RIGHT ROTATE");
            node = rightRotation(node);
        }

        if(balance < -1 && val > node.right.value){
            console.log("LEFT ROTATE");
            node = leftRotation(node);
        }

        if(balance > 1 && val > node.left.value){
            console.log("LEFT-RIGHT ROTATE");
            node.left = leftRotation(node.left);
            node = rightRotation(node);
        }

        if(balance < -1 && val < node.right.value){
            console.log("RIGHT-LEFT ROTATE");
            node.right = rightRotation(node.right);
            node = leftRotation(node);  
        }

        return node;
    }

    readjustCoordinates(node){
        if(node != null){
            if(node.parent == null){
                node.x = x;
                node.y = y;
                // d3.select("svg").select("#" + node.id).attr("transform", "translate(" + node.x + " " + node.y + ")");
                // d3.select("svg").select("#" + node.textId).attr("transform", "translate(" + node.x + " " + node.y + ")");
                // d3.select("svg").select("#" + node.id).remove();
                d3.select(this.ref.current).select("svg").select("#" + node.id).attr("cx", node.x + "%");
                d3.select(this.ref.current).select("svg").select("#" + node.id).attr("cy", node.y + "%");
                d3.select(this.ref.current).select("svg").select("#" + node.textId).attr("x", node.x + "%");
                d3.select(this.ref.current).select("svg").select("#" + node.textId).attr("y", node.y + "%");
                // d3.select("svg").select("#" + node.id).attr("cx", node.x + "%");
                // d3.select("svg").select("#" + node.id).attr("cy", node.y + "%");
                // d3.select("svg").select("#" + node.textId).attr("cx", node.x + "%");
                // d3.select("svg").select("#" + node.textId).attr("cy", node.y + "%");
            }
            else{
                if(node.value < node.parent.value){
                    node.x = node.parent.x - 15;
                    node.y = node.parent.y + 10;
                    // d3.select("svg").select("#" + node.id).attr("transform", "translate(" + node.x + " " + node.y + ")");
                    // d3.select("svg").select("#" + node.textId).attr("transform", "translate(" + node.x + " " + node.y + ")");
                    // d3.select("svg").select("#" + node.id).remove();
                    d3.select(this.ref.current).select("svg").select("#" + node.id).attr("cx", node.x + "%");
                    d3.select(this.ref.current).select("svg").select("#" + node.id).attr("cy", node.y + "%");
                    d3.select(this.ref.current).select("svg").select("#" + node.textId).attr("x", node.x + "%");
                    d3.select(this.ref.current).select("svg").select("#" + node.textId).attr("y", node.y + "%");
                    // d3.select("svg").select("#" + node.id).attr("cx", node.x + "%");
                    // d3.select("svg").select("#" + node.id).attr("cy", node.y + "%");
                    // d3.select("svg").select("#" + node.textId).attr("cx", node.x + "%");
                    // d3.select("svg").select("#" + node.textId).attr("cy", node.y + "%");
                }
                else{
                    node.x = node.parent.x + 15;
                    node.y = node.parent.y + 10;
                    // d3.select("svg").select("#" + node.id).attr("transform", "translate(" + node.x + " " + node.y + ")");
                    // d3.select("svg").select("#" + node.textId).attr("transform", "translate(" + node.x + " " + node.y + ")");
                    // d3.select("svg").select("#" + node.id).remove();
                    d3.select(this.ref.current).select("svg").select("#" + node.id).attr("cx", node.x + "%");
                    d3.select(this.ref.current).select("svg").select("#" + node.id).attr("cy", node.y + "%");
                    d3.select(this.ref.current).select("svg").select("#" + node.textId).attr("x", node.x + "%");
                    d3.select(this.ref.current).select("svg").select("#" + node.textId).attr("y", node.y + "%");
                    // d3.select("svg").select("#" + node.id).attr("cx", node.x + "%");
                    // d3.select("svg").select("#" + node.id).attr("cy", node.y + "%");
                    // d3.select("svg").select("#" + node.textId).attr("cx", node.x + "%");
                    // d3.select("svg").select("#" + node.textId).attr("cy", node.y + "%");
                }
            }
    
            this.readjustCoordinates(node.left);
            this.readjustCoordinates(node.right);
            
        }
    }

    restart(){
        console.log("RESTART CLICKED");
        d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "<h1>Welcome to AVL Tree!</h1>";
        i = 0;
        j = 0;
        this.root = null;
        this.initialize();
    }

    backward(){
        console.log("BACKWARDS CLICKED");
    }

    forward(){
        console.log("FORWARD CLICKED");
    }

    run(){
        console.log("RUN CLICKED");
    }

    turnOffRunning(){
        console.log("TURNOFF CLICKED");
    }

    componentDidMount() {
        this.initialize();
    }


    render() {
        return (
            <div>
                <div class="center-screen" id="banner">
                    {/* <button class="button" onClick={this.play}>Play</button>
                    <button class="button" onClick={this.pause}>Pause</button> */}
                    <button class="button" onClick={this.add}>Add</button>
                    <button class="button" onClick={this.restart}>Restart</button>
                    {/* <button class="button" onClick={this.backward}>Step Backward</button> 
                    <button class="button" onClick={this.forward}>Step Forward</button> */}
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to AVL Tree!</h1></span></div>
                <div ref={this.ref} class="center-screen"></div>
            </div>
        )
    }
}