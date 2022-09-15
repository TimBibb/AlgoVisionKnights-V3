import React from "react";
import "./heaps.css";
import * as d3 from "d3";
import createDefaultTree from "../../foundation/tree/CreateDefaultTree";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import LabeledNode from "../../foundation/tree/LabeledNode";
import Edge from "../../foundation/tree/Edge";
import { MessageSharp } from "@material-ui/icons";
import { tree } from "d3";

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
    // addnew(ref, num) {
    //     if(i < MAX_NODE){
    //         if(!this.root) {
    //             this.root = new Node(ref, num, x, y, i);
    //             //this.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
    //             console.log(this.root);
    //             i++;
    //         } else {
    //             let node = this.root;
    //             //y += 10;

    //             while(true) {
    //                 //console.log(node.value);
    //                 if(num < node.value) {
    //                     if(node.left != null) {
    //                         node = node.left;
    //                     } else {
    //                         temp_x = node.x - 15;
    //                         temp_y = node.y + 10;
    //                         node.left = new Node(ref, num, temp_x, temp_y, i);
    //                         //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
    //                         let edge = new Edge(ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
    //                         i++;
    //                         j++;
    //                         return;
    //                     }
    //                 } else {
    //                     if(node.right != null) {
    //                         node = node.right;
    //                     } else {
    //                         temp_x = node.x + 15;
    //                         temp_y = node.y + 10;
    //                         node.right = new Node(ref, num, temp_x, temp_y, i);
    //                         //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
    //                         let edge = new Edge(ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
    //                         i++;
    //                         j++;
    //                         return;
    //                     }
    //                 }
    //             }
    //         }
    //     } else {
    //         console.log("Max node reached please restart tree.");
    //         this.messages.push("<h1>Max node reached please restart tree.</h1>");
    //         return;
    //     }
    // }
}

class Node {
    constructor(ref, value, x, y, i) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;

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

export default class binarysearchtree extends React.Component {
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
	}

    initialize() {
        d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "750px");

        let tree = new Tree();
        // root node
        this.root = new Node(this.ref, null, x, y, 0);
        // child of root node
        this.node = new Node(this.ref, null, 30, 20, 1);
        this.node = new Node(this.ref, null, 69, 20, 2);
        // child of child of root node left side
        this.node = new Node(this.ref, null, 20, 40, 4);
        this.node = new Node(this.ref, null, 40, 40, 5);
        // child of child of root node right side
        this.node = new Node(this.ref, null, 60, 40, 6);
        this.node = new Node(this.ref, null, 80, 40, 7);
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

        this.setState({tree: tree});
    }

    play(){
        console.log("PLAY CLICKED");
    }

    pause(){
        console.log("PAUSE CLICKED");
    }

    add(){
        console.log("ADD CLICKED");
        var val = Math.floor(Math.random() * 100);

        if(i < MAX_NODE){
            if(!this.root) {
                this.root = new Node(this.ref, val, x, y, i);
                //this.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
                console.log(this.root);
                i++;
            } else {
                let node = this.root;
                //y += 10;

                while(true) {
                    //console.log(node.value);
                    if(val < node.value) {
                        if(node.left != null) {
                            node = node.left;
                        } else {
                            temp_x = node.x - 15;
                            temp_y = node.y + 10;
                            temp_x2 = node.x - 12.25;
                            temp_y2 = node.y + 8;
                            node.left = new Node(this.ref, val, temp_x, temp_y, i);
                            //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
                            // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
                            let edge2 = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            i++;
                            j++;
                            return;
                        }
                    } else {
                        if(node.right != null) {
                            node = node.right;
                        } else {
                            temp_x = node.x + 15;
                            temp_y = node.y + 10;
                            temp_x2 = node.x + 12.25;
                            temp_y2 = node.y + 8;
                            node.right = new Node(this.ref, val, temp_x, temp_y, i);
                            //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
                            let edge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            i++;
                            j++;
                            return;
                        }
                    }
                }
            }
        } else {
            console.log("Max node reached please restart tree.");
            //this.messages.push("<h1>Max node reached please restart tree.</h1>");
            document.getElementById("message").innerHTML = "<h1>Max node reached please restart tree.</h1>";
            return;
        }
    }

    restart(){
        console.log("RESTART CLICKED");
        d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "<h1>Welcome to Binary Search Tree!</h1>";
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
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Binary Search Tree!</h1></span></div>
                <div ref={this.ref} class="center-screen"></div>
            </div>
        )
    }
}