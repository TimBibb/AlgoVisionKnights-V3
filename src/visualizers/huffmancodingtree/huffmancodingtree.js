import React from "react";
import "./huffmancodingtree.css";
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

var x = 35;
var mid = 0;
var y = 50;
var i = 0;
var j = 0;
var MAX_NODE = 0;
var temp_x = 0;
var temp_y = 0;
var temp_x2 = 0;
var temp_y2 = 0;
var rpm = 0;
var moveRightx = 0;
var moveRighty = 0;
var moveRightParentx = 0;
var moveRightParenty = 0;
// for usage of randomWords: https://www.npmjs.com/package/random-words
var randomWords = require('random-words');

const letterMap = new Map();

// Get value from the Hash Map (["a", 0] you are grabbing the "0")
function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
        if (key === searchValue)
        return value;
    }
}

// Get letter from the Hash Map (["a", 0], you are grabbing the "a")
function getByLetter(map, searchValue) {
    for (let [key, value] of map.entries()) {
        if (value === searchValue)
        return key;
    }
}

function parentSum(left, right){
    return left+right;
}

function randInRange(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
  }

function Traverse(node){
    if(node != null){
        Traverse(node.left);
        Traverse(node.right);

    //   if(node.left == null && node.right == null)
    //     node.height = 0;
    //   else
    //     node.height = 1 + max(height(node.left), height(node.right));
    }
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
    constructor(node, edge, newVal, lEdge, rEdge) {
        this.node = node;
        this.edge = edge;
        this.newVal = newVal;
        this.lEdge = lEdge;
        this.rEdge = rEdge;
    }

    forward(svg) {
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.node.textId).attr("visibility", "visible");
        svg.select("#" + this.node.textId).text(this.newVal);
        this.node.value = this.newVal;
        svg.select("#" + this.lEdge.id).attr("visibility", "visible");
        svg.select("#" + this.rEdge.id).attr("visibility", "visible");
		// svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
	}
}

class ChangeCoordinates {
    constructor(node, edge, cx, cy) {
		this.node = node;
        this.edge = edge;
        this.cx = cx;
        this.cy = cy;
	}

    forward(svg) {
        svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
        svg.select("#" + this.node.id).attr("cx", this.cx);
        svg.select("#" + this.node.id).attr("cy", this.cy);
        svg.select("#" + this.node.textId).attr("cx", this.cx);
        svg.select("#" + this.node.textId).attr("cy", this.cy);
        // svg.select("#")
        // svg.select("#" + this.node.id).attr("visibility", "visible");
        // svg.select("#" + this.node.textId).attr("visibility", "visible");
	}
}

class UnhideEdges {
    constructor(edge) {
        this.edge = edge;
	}

    forward(svg) {
        if (this.edge) {
            // svg.select("#" + this.edge.id).style("stroke", UCF_GOLD);
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
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
    constructor(ref, visibility, display, x, y, i, level, character, name, value, leftEdge, rightEdge) {
        this.display = display;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
        this.level = level;
        this.lEdge = leftEdge;
        this.rEdge = rightEdge;
        this.character = character;
        this.name = name;
        this.value = value;
        this.id =  "node" + i;
        this.textId = "label" + i;

        this.node = new LabeledNode(
            ref,
            this.id,
            this.textId,
            this.x + "%",
            this.y + "%",
            this.display,
            visibility,
            "white"
        );
    }
}

class HuffmanNode
{
    constructor()
    {
        this.data = 0;
        this.c = '';
        this.left = this.right = null;
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

    add(){
        console.log("ADD CLICKED");
    }

    simulate() {
        console.log("SIMULATING");

        var level = 0;
        var temp = "";
        var steps = []
        var messages = []
        var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "a", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        var arr = { letters:[], numbers:[], node:[]}
        var root = null;
        var k = 0;
        var l = 0
        let q = [];
        // for usage of ranWords: https://www.npmjs.com/package/random-words
        var ranWords = randomWords({exactly: 1, join: '', maxLength: 5});

        console.log("this is a random string: " + ranWords + " length: " + ranWords.length);

        // adding each letter frequency to the map
        for(var i = 0; i < ranWords.length; i++){
            letterMap.set(ranWords.charAt(i), letterMap.get(ranWords.charAt(i)) + 1 || 1);
        }

        // sort Map by value, we want this to create our MinHeap. We are sorting ascending order (1, 2, 3)
        const letterMapSorted = new Map([...letterMap.entries()].sort((a, b) => a[1] - b[1]));

        console.log(letterMapSorted)

        //converting hash map into array
        arr.letters = Array.from(letterMapSorted.keys());
        arr.numbers = Array.from(letterMapSorted.values());

        MAX_NODE = (arr.letters.length * 2) - 1;
        console.log(MAX_NODE)

        // console.log(arr.letters)
        // console.log(arr.numbers)

        //root = new Node(this.ref, arr.letters[0] + " " + arr.numbers[0], x, y, 0);

        //constructor(ref, visibility, display, x, y, i, level, character, name, value, leftEdge, rightEdge)

        // for(var i = 0; i < arr.letters.length; i++){
        //     arr.node[i] = new Node(this.ref,  "hidden", arr.numbers[i], 30, 30, i, level, arr.letters[i], arr.letters[i] + arr.numbers[i])
        // }

        // class Node {
        //     constructor(ref, visibility, display, x, y, i, level, character, name, value, leftEdge, rightEdge) {
        //         this.display = display;
        //         this.left = null;
        //         this.right = null;
        //         this.x = x;
        //         this.y = y;
        //         this.level = level;
        //         this.lEdge = leftEdge;
        //         this.rEdge = rightEdge;
        //         this.character = character;
        //         this.name = name;
        //         this.value = value;
        //         this.id =  "node" + i;
        //         this.textId = "label" + i;
        
        //         this.node = new LabeledNode(
        //             ref,
        //             this.id,
        //             this.textId,
        //             this.x + "%",
        //             this.y + "%",
        //             this.display,
        //             visibility,
        //             "white"
        //         );
        //     }
        // }

        for (let i = 0; i < arr.letters.length; i++) {
            let hn = new Node(this.ref, "hidden", 0, x, y, i);
   
            hn.character = arr.letters[i];
            hn.value = arr.numbers[i];
            hn.display = arr.letters[i] + " " + arr.numbers[i];
            hn.name = arr.letters[i] + arr.numbers[i];
   
            hn.left = null;
            hn.right = null;
   
            // add functions adds
            // the huffman node to the queue.
            q.push(hn);
        }

        console.log(arr)
        console.log(q.length)
        console.log(q)

        let f = q;

        while ((q.length) > 1) {
            var modx = k+k;
            var mody = k+5;
            var tempx = k + 15;
            var tempy = k + 15;
            var tempmodx = 0;
            var tempmody = 0;

            // first min extract.
            let left = q[0];
            console.log(left)
            q.shift();
   
            // second min extract.
            let right = q[0];
            console.log(right)
            q.shift();

            if(!root){

                // new node f which is equal
                let f = new Node(this.ref, "visible", left.value + right.value, x+modx, y-modx, i);

                f.left = new Node(this.ref, "visible", left.display, x+modx-tempx+l, y-modx+tempy-l, i)
                f.right = new Node(this.ref, "visible", right.display, x+modx+tempx-l, y-modx+tempy-l, i)

                console.log("x+modx-tempx+l: " + (x+modx-tempx+l))
                console.log("y-modx+tempy-l: " + (y-modx+tempy-l))

                moveRightx = x+modx-tempx+l;
                moveRighty = y-modx+tempy-l;
                moveRightParentx = x+modx;
                moveRightParenty = y-modx;

                //console.log(f)
            }
            if(left.character == '-' && right.character != '-'){
                // new node f which is equal
                let f = new Node(this.ref, "visible", left.value + right.value, x+modx, y-modx, i);
                
                f.left = new Node(this.ref, "visible", right.display, x+modx-tempx+l, y-modx+tempy-l, i)
                //console.log("f.left: x = " + (x+modx-tempx+l) + " y = " + (y-modx+tempy-l))
                f.right = new Node(this.ref, "visible", left.display, x+modx+tempx-l, y-modx+tempy-l, i)

                f.left.display = left.display;
                f.right.display = right.display;
            }
            if(right.character == '-' && left.character != '-'){
                // new node f which is equal
                let f = new Node(this.ref, "visible", left.value + right.value, x+modx, y-modx, i);
                
                f.left = new Node(this.ref, "visible", right.display, x+modx-tempx+l, y-modx+tempy-l, i)
                //console.log("f.left: x = " + (x+modx-tempx+l) + " y = " + (y-modx+tempy-l))
                f.right = new Node(this.ref, "visible", left.display, x+modx+tempx-l, y-modx+tempy-l, i)

                f.left.display = left.display;
                f.right.display = right.display;
            }
            if(right.character == '-' && left.character == '-'){
                let f = new Node(this.ref, "visible", left.value + right.value, x+modx, y-modx, i);
                
                f.left = new Node(this.ref, "visible", left.display, moveRightParentx, moveRightParenty, i)
                //console.log("f.left: x = " + (x+modx-tempx+l) + " y = " + (y-modx+tempy-l))
                f.right = new Node(this.ref, "visible", right.display, moveRightParentx+65, moveRightParenty, i)
            }
            if(right.character != '-' && left.character != '-' && k >= 10){
                let f = new Node(this.ref, "visible", left.value + right.value, moveRightParentx+65, moveRightParenty, i);

                f.left = new Node(this.ref, "visible", left.display, moveRightx+60, moveRighty, i)
                // console.log("f.left: x = " + (x-modx+tempx-l) + " y = " + (y+modx-tempy+l))
                f.right = new Node(this.ref, "visible", right.display, moveRightx+100, moveRighty, i)
            }

            // if(left.character == '-' || right.character == '-'){
            //     let f = new Node(this.ref, "visible", left.value + right.value, x+modx, y-modx, i);

            //     f.left = new Node(this.ref, "visible", right.display, x+modx-tempx+l, y-modx+tempy-l, i)
            //     // console.log("f.left: x = " + (x+modx-tempx) + " y = " + (y-modx+tempy))
            //     f.right = new Node(this.ref, "visible", left.display, x+modx+tempx, y-modx+tempy, i)
            //     // console.log("f.right: x = " + (x+modx+tempx) + " y = " + (y-modx+tempy))

            //     // console.log(f)
            // }

            // IN CASE SOMETHING BREAK UP, DELETE IT AND REUSE THIS PORTION. --->>>>
            // new node f which is equal
            // let f = new Node(this.ref, "visible", left.value + right.value, x+modx, y-modx, i);

            // f.left = new Node(this.ref, "visible", left.display, x+modx-tempx, y-modx+tempy, i)
            // f.right = new Node(this.ref, "visible", right.display, x+modx+tempx, y-modx+tempy, i)
            // console.log(f)

            // to the sum of the frequency of the two nodes
            // assigning values to the f node.
            f.value = left.value + right.value;
            f.display = left.value + right.value;
            f.character = '-';
   
            // // first extracted node as left child.
            f.left = x;
   
            // // second extracted node as the right child.
            f.right = y;
   
            // marking the f node as the root node.
            root = f;

            console.log(f)
   
            // add this node to the priority-queue.
            q.push(f);
            q.sort(function(a,b){return a.data-b.data;});
            k += 10;
            l += 5;
        }

        // while(k < MAX_NODE){
        //     if(!root) {
        //         root = new Node(this.ref,  "hidden", 0, x, y, k);
        //         console.log(root)
        //         this.setState({root: root})
        //     } else {
        //         let node = root;
        //         // console.log(root)
        //         level = 0

        //         while(true) {
        //             if(node.left == null){
        //                 node.lEdge = new Edge(this.ref, "edge" + 1, node.x-3 + "%", node.y+1.5 + "%", 30 + "%", 20 + "%", "hidden");
        //                 node.left = new Node(this.ref, "visible", arr.letters[k] + " " + arr.numbers[k], 30, 20, k, level===1, arr.letters[k], arr.letters[k] + arr.numbers[k], arr.numbers[k]);
        //                 console.log("node.left.display:" + node.left.display)
                        
        //                 //steps.push(new HighlightNodeStep(node.right, null));
        //                 //steps.push(new ChangeCoordinates(node, null, 50 + "%", 15 + "%"));
        //                 console.log(node)
        //                 k++;
        //             }
        //             if(node.right == null){
        //                 node.rEdge = new Edge(this.ref, "edge" + 2, node.x+3 + "%", node.y+1.5 + "%", 70 + "%", 20 + "%", "hidden");
        //                 node.right = new Node(this.ref, "visible", arr.letters[k] + " " + arr.numbers[k], 70, 20, k, level===1, arr.letters[k], arr.letters[k] + arr.numbers[k], arr.numbers[k]);
        //                 console.log("node.right.display:" + node.right.display)
        //                 k++;
        //             }
        //             if(node.left != null && node.right != null){
        //                 node.value = parentSum(node.left.value, node.right.value)
        //                 node.display = node.value;

        //                 messages.push("<h1> CHANGING VALUE!!!! </h1>");
        //                 steps.push(new changeValue(node, null, node.display, node.lEdge, node.rEdge))
        //                 // steps.push(new UnhideEdges(node.lEdge))
        //                 // steps.push(new UnhideEdges(node.rEdge))

        //                 root = node;
        //             }
        //             break;
        //         }
        //         k++;

        //     }
        // }

        // console.log(letterSet.size)


        // for(var i = 0; i < letterSet.size; i++){
        //     console.log("letter frequency '" + arr.letters[i] + " ': " + letterMapSorted.get(arr.letters[i]))
        //     // console.log(getByValue(letterMapSorted, arr.letters[i]))
        //     arr.numbers[i] = getByValue(letterMapSorted, arr.letters[i])
        //     console.log(arr.numbers[i])
        // }




        // for(let key of letterSet){
        //     console.log(key)
        // }

        // root node
        // root = new Node(this.ref, val, x, y, 0);
        // this.setState({root: root})
        // let node = root;

        

        steps.push(new EmptyStep())
        messages.push("Starting to work on the tree!");

        steps.push(new EmptyStep())
        messages.push("Huffman Coding Tree insertion complete!");
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
        document.getElementById("message").innerHTML = "Welcome to Huffman Coding Tree!";

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
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Huffman Coding Tree!</h1></span></div>
                <table>
                    <tr>
                        <div ref={this.ref} class=""></div>
                    </tr>
                    <tr>
                        <div style={{width: "500px"}}>
                            <p>gian</p>
                        </div>
                    </tr>
                </table>
            </div>
        )
    }
}