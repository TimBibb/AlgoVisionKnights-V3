import React from "react";
import "./heaps.css";
import * as d3 from "d3";
import createDefaultTree from "../../foundation/tree/CreateDefaultTree";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import LabeledNode from "../../foundation/tree/LabeledNode";
import Edge from "../../foundation/tree/Edge";
import { MessageSharp, StoreSharp } from "@material-ui/icons";
import { create, svg, tree } from "d3";
import { GRAY, UCF_GOLD } from "../../assets/colors";

var x = 50;
var mid = 0;
var y = 10;
var i = 0;
var j = 0;
var MAX_NODE = 7;
var temp_x = 0;
var temp_y = 0;
var temp_x2 = 0;
var temp_y2 = 0;
var rpm = 0;

function randInRange(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
  }

class EmptyStep {
    forward() {}
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

class changeValue {
    constructor(node, edge, newVal) {
        this.node = node;
        this.edge = edge;
        this.newVal = newVal;
    }

    forward(svg) {
        svg.select("#" + this.node.textId).text(this.newVal);
        this.node.value = this.newVal;
		// svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
	}
}

function sort(arr)
    {
        var N = arr.length;
        var steps = [];
 
        // Build heap (rearrange array)
        for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
            heapify(arr, N, i);
 
        // One by one extract an element from heap
        for (var i = N - 1; i > 0; i--) {
            // Move current root to end
            var temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
 
            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }
 
    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
    function heapify(arr, N, i)
    {
        var largest = i; // Initialize largest as root
        var l = 2 * i + 1; // left = 2*i + 1
        var r = 2 * i + 2; // right = 2*i + 2
 
        // If left child is larger than root
        if (l < N && arr[l] > arr[largest])
            largest = l;
 
        // If right child is larger than largest so far
        if (r < N && arr[r] > arr[largest])
            largest = r;
 
        // If largest is not root
        if (largest != i) {
            var swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
 
            // Recursively heapify the affected sub-tree
            heapify(arr, N, largest);
        }
    }
 
    /* A utility function to print array of size n */
    function printArray(arr)
    {
        var N = arr.length;
        for (var i = 0; i < N; ++i)
            console.log(arr[i] + " ");
         
    }

// insert(item) {
//     this.heap.push(item);
//     var index = this.heap.length - 1;
//     var parent = this.parentIndex(index);
//     while(this.heap[parent] && this.heap[parent] < this.heap[index]) {
//         this.swap(parent, index);
//         index = this.parentIndex(index);
//         parent = this.parentIndex(index);
//     }
// }

// swap(a, b) {
//     let temp = this.heap[a];
//     this.heap[a] = this.heap[b];
//     this.heap[b] = temp;
// }



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
                svg.select("#" + edge.id).style("stroke", GRAY);
            } else  if (this.finalVal > node.value) {
                edge = node.rEdge;
                node = node.right;
                svg.select("#" + edge.id).style("stroke", GRAY);
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
    constructor(ref, value, x, y, i, level, leftEdge, rightEdge) {
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

        this.node = new LabeledNode(
            ref,
            this.id,
            this.textId,
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
            maxLevel: 0,
            running: false,
            root: null
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

    play(){
        console.log("PLAY CLICKED");
    }

    pause(){
        console.log("PAUSE CLICKED");
    }

    // adjustDistances(root, level, side) {
    //     if (root == null) {
    //         return;
    //     }

    //     d3.selectAll(".level1").attr("x", "5%");
    //     console.log("flsfs")

    //     if (side === "left") {
    //         // // root.node.attr("cx", function(d) {return d.x + -5})
    //         // d3.select("#" + root.id).attr("cx", (root.x-5) + "%");
    //         // d3.select("#" + root.textId).attr("x", (root.x-5) + "%");
    //     } else if (side === "right") {
    //         // d3.select("#" + root.id).attr("cx", (root.x+5) + "%");
    //         // d3.select("#" + root.textId).attr("x", (root.x+5) + "%");
    //     } else {

    //     }
    //     // console.log(root.value)
    //     // this.adjustDistances(root.left, level+1, "left");
    //     // this.adjustDistances(root.right, level+1, "right");
    // }

    add(){
        console.log("ADD CLICKED");
        var val = Math.floor(Math.random() * 100);
        var level = 0;
        var modifier = 4;

        if(i < MAX_NODE){
            if(!this.state.root) {
                this.state.root = new Node(this.ref, null, x, y, i);
                //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
                console.log(this.state.root);
                i++;
            } else {
                let node = this.state.root;
                //y += 10;
                level = 0

                while(true) {
                    var tempMod = (level*modifier) > 15 ? 15 : (level*modifier);
                    //console.log(node.value);
                    if(val < node.value) {
                        if(node.left != null) {
                            node = node.left;
                        } else {
                            temp_x = node.x - 20 + tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x - 17 + tempMod;
                            temp_y2 = node.y + 8;
                            node.left = new Node(this.ref, null, temp_x, temp_y, i, level===1);
                            node.lEdge =  new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
                            //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
                            // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
                            // if (level > this.state.maxLevel) {
                            //     this.setState({maxLevel: level});
                            //     this.adjustDistances(this.state.root, level);
                            // }
                            i++;
                            j++;
                            return;
                        }
                    } else {
                        if(node.right != null) {
                            node = node.right;
                        } else {
                            temp_x = node.x + 20 - tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x + 17 - tempMod;
                            temp_y2 = node.y + 8;
                            node.right = new Node(this.ref, null, temp_x, temp_y, i, level===1);
                            node.rEdge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
                            //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
                            // if (level > this.state.maxLevel) {
                            //     this.setState({maxLevel: level});
                            //     this.adjustDistances(this.state.root, level);
                            // }
                            i++;
                            j++;
                            return;
                        }
                    }
                    level++;
                }
            }
        } else {
            console.log("Max node reached please restart tree.");
            //this.messages.push("<h1>Max node reached please restart tree.</h1>");
            document.getElementById("message").innerHTML = "Max node reached please restart tree.";
            return;
        }
    }

    simulate() {
        console.log("SIMULATING");
        //var svg = this.initialize();
        var val = Math.floor((Math.random() * 13));
        var val_left = Math.floor((Math.random() * 13) + 14);
        var val_right = Math.floor((Math.random() * 13) + 28);
        var val_left2 = Math.floor((Math.random() * 13) + 42);
        var val_right2 = Math.floor((Math.random() * 13) + 56);
        var val_left3 = Math.floor((Math.random() * 13) + 71);
        var val_right3 = Math.floor((Math.random() * 13) + 85);

        // var val = Math.floor((Math.random() * 15) + 31);
        // var val_left = Math.floor((Math.random() * 15) + 16);
        // var val_right = Math.floor((Math.random() * 15) + 61);

        var level = 0;
        var temp = "";
        var steps = []
        var messages = []
        var arr = []
        var root = null;
        var k = 0;

        // root node
        root = new Node(this.ref, val, x, y, 0);
        this.setState({root: root})
        let node = root;


        // left node to root
        node.lEdge = new Edge(this.ref, "edge" + 1, node.x-3 + "%", node.y+1.5 + "%", 30 + "%", 20 + "%", "visible");
        node.left = new Node(this.ref, val_left, 30, 20, 1, level===1);

        // right node to root
        node.rEdge = new Edge(this.ref, "edge" + 2, node.x+3 + "%", node.y+1.5 + "%", 70 + "%", 20 + "%", "visible");
        node.right = new Node(this.ref, val_right, 70, 20, 2, level===1);

        // left node to left child of root
        node.lEdge = new Edge(this.ref, "edge" + 3, node.left.x-2.5 + "%", node.left.y+3 + "%", 15 + "%", 40 + "%", "visible");
        node.left.left = new Node(this.ref, val_left2, 15, 40, 3, level===1);

        // right node to left child of root
        node.rEdge = new Edge(this.ref, "edge" + 4, node.left.x+2.5 + "%", node.left.y+3 + "%", 45 + "%", 40 + "%", "visible");
        node.left.right = new Node(this.ref, val_right2, 45, 40, 4, level===1);

        // left node to right child of root
        node.lEdge = new Edge(this.ref, "edge" + 5, node.right.x-2.5 + "%", node.right.y+3 + "%", 57 + "%", 40 + "%", "visible");
        node.right.left = new Node(this.ref, val_left3, 57, 40, 5, level===1);

        // right node to right child of root
        node.rEdge = new Edge(this.ref, "edge" + 6, node.right.x+2.5 + "%", node.left.y+3 + "%", 85 + "%", 40 + "%", "visible");
        node.right.right = new Node(this.ref, val_right3, 85, 40, 6, level===1);

        console.log("node.left.value: " + node.left.value)
        console.log("node.right.value: " + node.right.value)
        console.log("node.left.left.value: " + node.left.left.value)
        console.log("node.left.rigth.value: " + node.left.right.value)

        steps.push(new EmptyStep())
        messages.push("Starting to work on the tree!");

        console.log("node.left.value: " + node.left.value + " < node.left.left.value: " + node.left.left.value)

        while(k < 5){
            if(node.left.left.value > node.left.value || node.left.right.value > node.left.value){
                if(node.left.left.value > node.left.right.value){
                    temp = node.left.value;

                    steps.push(new EmptyStep());
                    messages.push( node.left.left.value + " is greater than " + node.left.right.value);

                    steps.push(new HighlightNodeStep(node.left.left, null));
                    messages.push("");

                    steps.push(new HighlightNodeStep(node.left.right, null));
                    messages.push("");

                    steps.push(new EmptyStep());
                    messages.push("So we swap " + node.left.left.value + " with the parent " + node.left.value);

                    steps.push(new changeValue(node.left, null,node.left.left.value))
                    node.left.value = node.left.left.value;
                    steps.push(new changeValue(node.left.left, null, temp))
                    node.left.left.value = temp;
                }
                else{
                    temp = node.left.value;

                    // steps.push(new EmptyStep());
                    // messages.push( node.left.right.value + " is greater than " + node.left.left.value);

                    steps.push(new HighlightNodeStep(node.left.right, null));
                    messages.push( node.left.right.value + " is greater than " + node.left.left.value);

                    steps.push(new HighlightNodeStep(node.left.left, null));
                    messages.push("");

                    steps.push(new UnHighlightNodeStep(node.left.left, null));
                    messages.push("");

                    steps.push(new HighlightNodeStep(node.left, null));
                    steps.push(new changeValue(node.left, null,node.left.right.value))
                    messages.push("So we swap " + node.left.right.value + " with the parent " + node.left.value);
                    node.left.value = node.left.right.value;

                    steps.push(new EmptyStep());
                    steps.push(new changeValue(node.left.right, null, temp))
                    steps.push(new UnHighlightNodeStep(node.left.right, null));
                    steps.push(new UnHighlightNodeStep(node.left, null));
                    node.left.right.value = temp;
                    messages.push("");
                    messages.push("");
                    messages.push("");
                }
            }
            if(node.right.left.value > node.right.value || node.right.right.value > node.right.value){
                
                steps.push(new EmptyStep());
                messages.push( "On the other end, we can see that another triangle forms.");

                if(node.right.left.value > node.right.right.value){
                    temp = node.right.value;

                    steps.push(new EmptyStep());
                    messages.push( node.right.left.value + " is greater than " + node.right.right.value);

                    steps.push(new HighlightNodeStep(node.right.left, null));
                    messages.push("");

                    steps.push(new HighlightNodeStep(node.right.right, null));
                    messages.push("");

                    steps.push(new EmptyStep());
                    messages.push("So we swap " + node.right.left.value + " with the parent " + node.right.value);

                    steps.push(new changeValue(node.right, null,node.right.left.value))
                    node.right.value = node.right.left.value;
                    steps.push(new changeValue(node.right.left, null, temp))
                    node.right.left.value = temp;
                }
                else if(node.right.left.value < node.right.right.value){
                    temp = node.right.value;

                    // steps.push(new EmptyStep());
                    // messages.push( node.left.right.value + " is greater than " + node.left.left.value);

                    steps.push(new HighlightNodeStep(node.right.right, null));
                    messages.push( node.right.right.value + " is greater than " + node.right.left.value);

                    steps.push(new HighlightNodeStep(node.right.left, null));
                    messages.push("");

                    steps.push(new UnHighlightNodeStep(node.right.left, null));
                    messages.push("");

                    steps.push(new HighlightNodeStep(node.right, null));
                    steps.push(new changeValue(node.right, null,node.right.right.value))
                    messages.push("So we swap " + node.right.right.value + " with the parent " + node.right.value);
                    node.right.value = node.right.right.value;

                    steps.push(new EmptyStep());
                    steps.push(new changeValue(node.right.right, null, temp))
                    node.right.right.value = temp;
                    steps.push(new UnHighlightNodeStep(node.right.right, null));
                    steps.push(new UnHighlightNodeStep(node.right, null));
                    messages.push("");
                    messages.push("");
                    messages.push("");
                }
            }
            if(node.left.value > root.value || node.right.value > root.value){
                
                steps.push(new EmptyStep());
                messages.push("Now we got to the top triangle, where we have the main root with its childs");

                if(node.left.value > node.right.value){
                    temp = root.value;

                    steps.push(new EmptyStep());
                    messages.push( node.left.value + " is greater than " + node.right.value);

                    steps.push(new HighlightNodeStep(node.left, null));
                    messages.push("");

                    steps.push(new HighlightNodeStep(node.right, null));
                    messages.push("");

                    steps.push(new EmptyStep());
                    messages.push("So we swap " + node.left.value + " with the parent " + root.value);

                    steps.push(new changeValue(root, null, node.left.value))
                    steps.push(new changeValue(node.left, null, temp))
                }
                else if(node.left.value < node.right.value){
                    temp = root.value;

                    // steps.push(new EmptyStep());
                    // messages.push( node.left.right.value + " is greater than " + node.left.left.value);

                    steps.push(new HighlightNodeStep(node.right, null));
                    messages.push( node.right.value + " is greater than " + node.left.value);

                    steps.push(new HighlightNodeStep(node.left, null));
                    messages.push("");

                    steps.push(new UnHighlightNodeStep(node.left, null));
                    messages.push("");

                    steps.push(new HighlightNodeStep(root, null));
                    steps.push(new changeValue(root, null, node.right.value))
                    messages.push("So we swap " + node.right.value + " with the parent " + root.value);
                    root.value = node.right.value;

                    steps.push(new EmptyStep());
                    steps.push(new changeValue(node.right, null, temp))
                    node.right.value = temp
                    steps.push(new UnHighlightNodeStep(node.right, null));
                    steps.push(new UnHighlightNodeStep(root, null));
                    messages.push("");
                    messages.push("");
                    messages.push("");
                }
            }
            k++
        }

        // while (i < MAX_NODE) {
        //     val = Math.floor((Math.random() * 15) + 31);
        //     val_left = Math.floor((Math.random() * 15) + 16);
        //     val_right = Math.floor((Math.random() * 15) + 61);
        //     steps.push(new EmptyStep());
        //     messages.push("The next value we will insert into the tree is " + val );
        //     console.log("level " + level);
        //     if(!root) {
        //         root = new Node(this.ref, val, x, y, i);
        //         this.setState({root: root})
        //         //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
        //         steps.push(new NewNodeStep(root, null));
        //         messages.push("The tree is empty, let's add "+ val + " as the root node.");
                
        //         // steps.push(new UnHighlightNodeStep(this.state.root, null));
        //         steps.push(new UnHighlightPathStep(root, val));
        //         messages.push("The tree is empty, let's add "+ val + " as the root node.");
        //         i++;
        //     } else {
        //         let node = root;
        //         //y += 10;
        //         level = 0
        //         var firstStep = true;

        //         console.log("root created: " + root.value)

        //         while(true) {
        //             var tempMod = (level*modifier) > 15 ? 15 : (level*modifier);
        //             console.log(node.value);
        //             if (firstStep) {
        //                 steps.push(new HighlightNodeStep(node, null));
        //                 messages.push("The next value we will insert into the tree is " + val );
        //                 firstStep = false;
        //             } else {
        //                 steps.push(new HighlightNodeStep(node, null));
        //                 messages.push("");
        //             }

        //             if(val_left < node.value) {
        //                 // steps.push(new EmptyStep());
        //                 // messages.push( val + " is less than " + node.value );

        //                 // steps.push(new UnHighlightNodeStep(node, null));
        //                 // messages.push(val + " is less than " + node.value);

        //                 if(node.left != null) {
        //                     var edge = node.lEdge;
        //                     node = node.left;
        //                     steps.push(new HighlightNodeStep(node, edge));
        //                     messages.push("Let's traverse to the left edge of the node.");

        //                     // steps.push(new UnHighlightNodeStep(node, edge));
        //                     // messages.push("Let's traverse to the left edge of the node.");
        //                 } else {
        //                     temp_x = node.x - 20 + tempMod;
        //                     temp_y = node.y + 10;
        //                     temp_x2 = node.x - 17 + tempMod;
        //                     temp_y2 = node.y + 8;

        //                     node.lEdge = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
        //                     node.left = new Node(this.ref, val_left, temp_x, temp_y, i, level===1);

        //                     steps.push(new EmptyStep());
        //                     messages.push( node.value + " has no left child.");

        //                     steps.push(new NewNodeStep(node.left, node.lEdge));
        //                     messages.push("Let's insert " + val_left + " to the left of node " + node.value );

        //                     // steps.push(new UnHighlightNodeStep(node.left, node.lEdge));
        //                     steps.push(new UnHighlightPathStep(root, val));
        //                     messages.push("Let's insert " + val_left + " to the left of node " + node.value );

        //                     //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
        //                     // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
        //                     // if (level > this.state.maxLevel) {
        //                     //     this.setState({maxLevel: level});
        //                     //     this.adjustDistances(root, level);
        //                     // }
        //                     i++;
        //                     j++;
        //                     console.log("Left node created: " + node.value + " " + node.id)

        //                     break;
        //                 }
        //             } 
        //             else if (val_right > node.value) {
        //                 steps.push(new EmptyStep());
        //                 messages.push( val + " is greater than " + node.value );

        //                 // steps.push(new UnHighlightNodeStep(node, null));
        //                 // messages.push(val + " is greater than " + node.value);

        //                 if(node.right != null) {
        //                     var edge = node.rEdge
        //                     node = node.right;
        //                     steps.push(new HighlightNodeStep(node, edge));
        //                     messages.push("Let's traverse to the right edge of the node.");
        //                     // node.value = root.value;
        //                     // steps.push(new UnHighlightNodeStep(node, edge));
        //                     // messages.push("Let's traverse to the right edge of the node.");
        //                 } else {
        //                     temp_x = node.x + 20 - tempMod;
        //                     temp_y = node.y + 10;
        //                     temp_x2 = node.x + 17 - tempMod;
        //                     temp_y2 = node.y + 8;
        //                     node.rEdge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
        //                     node.right = new Node(this.ref, val_right, temp_x, temp_y, i, level===1);

        //                     steps.push(new EmptyStep());
        //                     messages.push( node.value + " has no right child.");

        //                     steps.push(new NewNodeStep(node.right, node.rEdge));
        //                     messages.push("Let's insert " + val_right + " to the right of node " + node.value );

        //                     // steps.push(new UnHighlightNodeStep(node.right, node.rEdge));
        //                     steps.push(new UnHighlightPathStep(root, val_right));
        //                     messages.push("Let's insert " + val_right + " to the right of node " + node.value );

        //                     //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
        //                     // if (level > this.state.maxLevel) {
        //                     //     this.setState({maxLevel: level});
        //                     //     this.adjustDistances(root, level);
        //                     // }
        //                     i++;
        //                     j++;
        //                     break;
        //                 }
        //             }
        //              else {
        //                 steps.push(new EmptyStep());
        //                 messages.push(val + " is equal to " + node.value);

        //                 // steps.push(new UnHighlightNodeStep(node, null));
        //                 steps.push(new UnHighlightPathStep(root, val));
        //                 messages.push("There cannot be duplicate values in a BST, so we will move on.");
        //                 break;
        //             }
        //             level++;
        //         }
        //     }
        // }

        steps.push(new EmptyStep())
        messages.push("Heaps insertion complete!");
        console.log(this.state.root);
        this.setState({steps: steps});
        this.setState({messages: messages});
    }

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
        document.getElementById("message").innerHTML = "Welcome to Heaps!";

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
                    {/* <button class="button" onClick={this.pause}>Pause</button> */}
                    <button class="button" onClick={this.add}>Add</button>
                    <button class="button" onClick={this.restart}>Restart</button>
                    {/* <button class="button" onClick={this.backward}>Step Backward</button> 
                    <button class="button" onClick={this.forward}>Step Forward</button> */}
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Heaps!</h1></span></div>
                <table>
                    <tr>
                        <div ref={this.ref} class=""></div>
                    </tr>
                    <tr>
                        <div style={{width: "500px"}}>
                            <p>tim</p>
                        </div>
                    </tr>
                </table>
            </div>
        )
    }
}