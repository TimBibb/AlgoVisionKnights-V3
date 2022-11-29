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
import { create, gray, svg, tree } from "d3";
import { GRAY, UCF_GOLD } from "../../assets/colors";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { Pseudocode } from "../../components/pseudocode/Pseudocode";
import { HighlightLineStep } from "../../components/pseudocode/Pseudocode";
import "../css/input.css"

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
        console.log(" EDGE EXISTS " + this.edge)
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('accentColor'));
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
		// svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
	}
}

class UnhideEdges {
    constructor(edge) {
        this.edge = edge;
	}

    forward(svg) {
        if (this.edge) {
            // svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('accentColor'));
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
	}
}

class ShowLeftRightNodesHighlighted{
    constructor(left, right) {
		this.left = left;
        this.right = right;
	}

    forward(svg) {
        svg.select("#" + this.left.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.left.textId).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.left.id).attr("visibility", "visible");
        svg.select("#" + this.left.textId).attr("visibility", "visible");

        svg.select("#" + this.right.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.right.textId).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.right.id).attr("visibility", "visible");
        svg.select("#" + this.right.textId).attr("visibility", "visible");
	}

    fastForward(svg){
        this.forward(svg);
    }

    backward(svg){
        svg.select("#" + this.left.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.left.textId).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.left.id).attr("visibility", "hidden");
        svg.select("#" + this.left.textId).attr("visibility", "hidden");

        svg.select("#" + this.right.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.right.textId).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.right.id).attr("visibility", "hidden");
        svg.select("#" + this.right.textId).attr("visibility", "hidden");
    }
}

class UnhighlightNodes{
    constructor(left, right, parent, leftEdge, rightEdge) {
		this.left = left;
        this.right = right;
        this.parent = parent;
        this.leftEdge = leftEdge;
        this.rightEdge = rightEdge;
	}

    forward(svg) {
        svg.select("#" + this.left.id).attr("stroke", localStorage.getItem('secondaryColor'));
        svg.select("#" + this.left.textId).attr("stroke", localStorage.getItem('secondaryColor'));

        svg.select("#" + this.right.id).attr("stroke", localStorage.getItem('secondaryColor'));
        svg.select("#" + this.right.textId).attr("stroke", localStorage.getItem('secondaryColor'));

        svg.select("#" + this.parent.id).attr("stroke", localStorage.getItem('secondaryColor'));
        svg.select("#" + this.parent.textId).attr("stroke", localStorage.getItem('secondaryColor'));

        svg.select("#" + this.leftEdge.id).style("stroke", localStorage.getItem('secondaryColor'));
        svg.select("#" + this.rightEdge.id).style("stroke", localStorage.getItem('secondaryColor'));
	}

    fastForward(svg){
        this.forward(svg);
    }

    backward(svg){
        svg.select("#" + this.left.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.left.textId).attr("stroke", localStorage.getItem('accentColor'));

        svg.select("#" + this.right.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.right.textId).attr("stroke", localStorage.getItem('accentColor'));

        svg.select("#" + this.parent.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.parent.textId).attr("stroke", localStorage.getItem('accentColor'));

        svg.select("#" + this.leftEdge.id).style("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.rightEdge.id).style("stroke", localStorage.getItem('accentColor'));
    }
}

class ShowParentWithEdges{
    constructor(node, leftEdge, rightEdge) {
		this.node = node;
        this.leftEdge = leftEdge;
        this.rightEdge = rightEdge;
	}

    forward(svg) {
        svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.textId).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.node.textId).attr("visibility", "visible");

        svg.select("#" + this.leftEdge.id).style("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.leftEdge.id).attr("visibility", "visible");
        svg.select("#" + this.rightEdge.id).style("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.rightEdge.id).attr("visibility", "visible");
	}

    fastForward(svg){
        this.forward(svg);
    }

    backward(svg){
        svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.textId).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.id).attr("visibility", "hidden");
        svg.select("#" + this.node.node.textId).attr("visibility", "hidden");

        svg.select("#" + this.leftEdge.id).style("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.leftEdge.id).attr("visibility", "hidden");
        svg.select("#" + this.rightEdge.id).style("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.rightEdge.id).attr("visibility", "hidden");
    }
}

class HighlightNodeStep {
    constructor(node, edge) {
		this.node = node;
        this.edge = edge;
	}

    forward(svg) {
        console.log(this.node)
        svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.node.textId).attr("visibility", "visible");
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('accentColor'));
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
		svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('secondaryColor'));
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('secondaryColor'));
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
            svg.select("#" + node.id).attr("stroke", localStorage.getItem('secondaryColor'));
            if (this.finalVal < node.value) {
                edge = node.lEdge;
                node = node.left;
                svg.select("#" + edge.id).style("stroke", localStorage.getItem('secondaryColor'));
            } else  if (this.finalVal > node.value) {
                edge = node.rEdge;
                node = node.right;
                svg.select("#" + edge.id).style("stroke", localStorage.getItem('secondaryColor'));
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
    constructor(ref, visibility, display, x, y, i, leftEdge, rightEdge, left, right, level, character, name, value) {
        this.display = display;
        this.left = left;
        this.right = right;
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

export default class huffmancodingtree extends React.Component {
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
        this.add = this.add.bind(this);
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
        this.newAdd = this.newAdd.bind(this);
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
        this.setState({svg: svgGroup})
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

    newAdd(word) {
        this.helper(word)
    }

    simulate() {
        var ranWords = randomWords({exactly: 1, join: '', maxLength: 5});
        this.helper(ranWords)
    }

    helper(ranWords) {
        console.log("SIMULATING");

        var level = 0;
        var temp = "";
        var steps = []
        var messages = []
        var pseudocodeArr = [];
        var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "a", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        var arr = { letters:[], numbers:[], node:[]}
        var root = null;
        var k = 0;
        var l = 0
        let q = [];
        // for usage of ranWords: https://www.npmjs.com/package/random-words
        // var ranWords = randomWords({exactly: 1, join: '', maxLength: 5});

        steps.push(new EmptyStep())
        messages.push("Starting to work on the tree!");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

        steps.push(new EmptyStep())
        messages.push("We chose a random word: \"" + ranWords + "\"");

        steps.push(new EmptyStep())
        messages.push("We chose a random word: \"" + ranWords + "\"");

        console.log("this is a random string: " + ranWords + " length: " + ranWords.length);

        // steps.push(new EmptyStep())
        // messages.push("We use a random string: '" + ranWords + "'");
        // steps.push(new EmptyStep())
        // messages.push("We use a random string: '" + ranWords + "'");

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

        
        // for printing the frequency of the letters as a message
        for(let i = 0; i < arr.letters.length;i++)
            arr.node[i] = " " + arr.letters[i] + " " + arr.numbers[i];

        steps.push(new EmptyStep())
        messages.push("Letter frequency for this word: [" + arr.node + "]");
        steps.push(new EmptyStep())
        messages.push("Letter frequency for this word: [" + arr.node + "]");

        MAX_NODE = (arr.letters.length * 2) - 1;
        console.log(MAX_NODE)

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

        var n = 0, m = 0, w = 0, p = 0, h = 0;

        let f = q;

        while ((q.length) > 1) {

            steps.push(new EmptyStep())
            messages.push("The priority queue has more than one entry.");
            pseudocodeArr.push(new HighlightLineStep(5, this.props.lines));

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

            steps.push(new EmptyStep())
            messages.push("Is there a root node?");
            pseudocodeArr.push(new HighlightLineStep(8, this.props.lines));

            if(!root){

                moveRightx = x+modx-tempx+l;
                moveRighty = y-modx+tempy-l;
                moveRightParentx = x+modx;
                moveRightParenty = y-modx-10;

                // new node f which is equal
                let f = new Node(this.ref, "hidden", left.value + right.value, x+modx, y-modx-10, i);
                i++;

                f.lEdge = new Edge(this.ref, "edge" + i, moveRightx + "%", moveRighty + "%", f.x + "%", f.y + "%", "hidden");
                f.left = new Node(this.ref, "hidden", left.display, moveRightx, moveRighty, i)
                i++;

                f.rEdge = new Edge(this.ref, "edge" + i, x+modx+tempx-l + "%", y-modx+tempy-l + "%", f.x + "%", f.y + "%", "hidden");
                f.right = new Node(this.ref, "hidden", right.display, x+modx+tempx-l, y-modx+tempy-l, i)
                i++

                steps.push(new ShowLeftRightNodesHighlighted(f.left, f.right))
                messages.push("We take the first two items from our priority queue: " + f.left.display + " and " + f.right.display);
                pseudocodeArr.push(new HighlightLineStep(9, this.props.lines));
                steps.push(new EmptyStep())
                messages.push("We take the first two items from our priority queue: " + f.left.display + " and " + f.right.display)
                pseudocodeArr.push(new HighlightLineStep(9, this.props.lines));

                f = new Node(this.ref, "hidden", left.value + right.value, x+modx, y-modx-10, i, f.lEdge, f.rEdge, f.left, f.right)
                i++;

                steps.push(new ShowParentWithEdges(f, f.lEdge, f.rEdge));
                messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                pseudocodeArr.push(new HighlightLineStep(10, this.props.lines));

                steps.push(new UnhighlightNodes(f.left, f.right, f, f.lEdge, f.rEdge))
                messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                pseudocodeArr.push(new HighlightLineStep(10, this.props.lines));

                steps.push(new EmptyStep())
                messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                pseudocodeArr.push(new HighlightLineStep(11, this.props.lines));

                n++;
                console.log("!root: " + n);
                //console.log(f)

                f.value = left.value + right.value;
                f.display = left.value + right.value;
                f.character = '-';
    
                // // first extracted node as left child.
                f.left = x;
    
                // // second extracted node as the right child.
                f.right = y;
    
                // marking the f node as the root node.
                root = f;

                // console.log(f)
    
                // add this node to the priority-queue.
                q.push(f);
                q.sort(function(a,b){return a.data-b.data;});
            }
            // This case doesn't exist because of the nature of the priority queue, it is here to follow the rhythm ;)
            steps.push(new EmptyStep())
            messages.push("Comparing the left and right values.");
            pseudocodeArr.push(new HighlightLineStep(13, this.props.lines));
            
            if(left.character == '-' && right.character != '-'){
                steps.push(new EmptyStep())
                messages.push("Left character = " + left.character + " and right character = " + right.character);
                pseudocodeArr.push(new HighlightLineStep(13, this.props.lines));

                // new node f which is equal
                let f = new Node(this.ref, "hidden", left.value + right.value, x+modx, y-modx-10, i);
                i++;

                f.lEdge = new Edge(this.ref, "edge" + i, x+modx-tempx+l + "%", y-modx+tempy-l-10 + "%", f.x + "%", f.y + "%", "hidden");
                f.left = new Node(this.ref, "hidden", right.display, x+modx-tempx+l, y-modx+tempy-l-10, i)
                i++;

                f.rEdge = new Edge(this.ref, "edge" + i, x+modx+tempx-l + "%", y-modx+tempy-l-10 + "%", f.x + "%", f.y + "%", "hidden");
                f.right = new Node(this.ref, "hidden", left.display, x+modx+tempx-l, y-modx+tempy-l-10, i)
                i++;

                steps.push(new ShowLeftRightNodesHighlighted(f.left, f.right))
                messages.push("Showing left and right child!!!");
                pseudocodeArr.push(new HighlightLineStep(14, this.props.lines));

                f = new Node(this.ref, "hidden", left.value + right.value, x+modx, y-modx-10, i, f.lEdge, f.rEdge, f.left, f.right);
                i++;

                steps.push(new ShowParentWithEdges(f, f.lEdge, f.rEdge));
                messages.push("Showing parent with edges!!!!");
                pseudocodeArr.push(new HighlightLineStep(14, this.props.lines));

                steps.push(new UnhighlightNodes(f.left, f.right, f, f.lEdge, f.rEdge))
                messages.push("Showing everything unhighlighted!!!");
                pseudocodeArr.push(new HighlightLineStep(14, this.props.lines));

                m++;
                console.log("left.character == '-' && right.character != '-': " + m);

                f.value = left.value + right.value;
                f.display = left.value + right.value;
                f.character = '-';
    
                // // first extracted node as left child.
                f.left = x;
    
                // // second extracted node as the right child.
                f.right = y;
    
                // marking the f node as the root node.
                root = f;

                // console.log(f)
    
                // add this node to the priority-queue.
                q.push(f);
                q.sort(function(a,b){return a.data-b.data;});
            }
            steps.push(new EmptyStep())
            messages.push("Comparing the left and right values.");
            pseudocodeArr.push(new HighlightLineStep(13, this.props.lines));

            if(right.character == '-' && left.character != '-'){
                steps.push(new EmptyStep())
                messages.push("Left character = " + left.character + " and right character = " + right.character);
                pseudocodeArr.push(new HighlightLineStep(16, this.props.lines));

                console.log(k)

                steps.push(new EmptyStep())
                messages.push("Checking character count.");
                pseudocodeArr.push(new HighlightLineStep(17, this.props.lines));

                if(k < 20){
                    steps.push(new EmptyStep())
                    messages.push("Character count < 20");
                    pseudocodeArr.push(new HighlightLineStep(17, this.props.lines));

                // new node f which is equal
                    let f = new Node(this.ref, "hidden", left.value + right.value, x+modx, y-modx-20, i);
                    i++;

                    f.lEdge = new Edge(this.ref, "edge" + i, x+modx-tempx+l + "%", y-modx+tempy-l-10 + "%", f.x + "%", f.y + "%", "hidden");
                    f.left = new Node(this.ref, "hidden", right.display, x+modx-tempx+l, y-modx+tempy-l-10, i)
                    i++;
                    
                    f.rEdge = new Edge(this.ref, "edge" + i, x+modx+tempx-l + "%", y-modx+tempy-l-10 + "%", f.x + "%", f.y + "%", "hidden");
                    f.right = new Node(this.ref, "hidden", left.display, x+modx+tempx-l, y-modx+tempy-l-10, i)
                    i++;

                    steps.push(new ShowLeftRightNodesHighlighted(f.left, f.right))
                    messages.push("We take the next two items from our priority queue: " + f.right.display + " and " + f.left.display);
                    pseudocodeArr.push(new HighlightLineStep(18, this.props.lines));
                    steps.push(new EmptyStep())
                    messages.push("We take the next two items from our priority queue: " + f.right.display + " and " + f.left.display);
                    pseudocodeArr.push(new HighlightLineStep(18, this.props.lines));

                    f = new Node(this.ref, "hidden", left.value + right.value, x+modx, y-modx-20, i, f.lEdge, f.rEdge, f.left, f.right)
                    i++;

                    steps.push(new ShowParentWithEdges(f, f.lEdge, f.rEdge));
                    messages.push("To get our parent node, we sum left and right childs, so: " + right.value + " + " + left.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(23, this.props.lines));

                    steps.push(new UnhighlightNodes(f.left, f.right, f, f.lEdge, f.rEdge))
                    messages.push("To get our parent node, we sum left and right childs, so: " + right.value + " + " + left.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(23, this.props.lines));

                    steps.push(new EmptyStep())
                    messages.push("To get our parent node, we sum left and right childs, so: " + right.value + " + " + left.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(24, this.props.lines));

                    w++;
                    console.log((x+modx-tempx+l))
                    console.log((y-modx+tempy-l))
                    console.log("right.character == '-' && left.character != '-': " + w);
                    console.log(k)
                }
                if(k >= 20){
                    steps.push(new EmptyStep())
                    messages.push("Character count >= 20");
                    pseudocodeArr.push(new HighlightLineStep(20, this.props.lines));

                    let f = new Node(this.ref, "hidden", left.value + right.value, moveRightParentx+48, moveRightParenty-30, i);
                    i++;

                    f.lEdge = new Edge(this.ref, "edge" + i, moveRightParentx+67 + "%", moveRightParenty + "%", f.x + "%", f.y + "%", "hidden");
                    f.left = new Node(this.ref, "hidden", right.display, moveRightParentx+65, moveRightParenty, i)
                    i++;

                    f.rEdge = new Edge(this.ref, "edge" + i, moveRightParentx+30 + "%", moveRightParenty + "%", f.x + "%", f.y + "%", "hidden");
                    f.right = new Node(this.ref, "hidden", left.display, moveRightParentx+30, moveRightParenty, i)
                    i++;

                    steps.push(new ShowLeftRightNodesHighlighted(f.left, f.right))
                    messages.push("We take the next two items from our priority queue: " + f.right.display + " and " + f.left.display);
                    pseudocodeArr.push(new HighlightLineStep(21, this.props.lines));
                    steps.push(new EmptyStep())
                    messages.push("We take the next two items from our priority queue: " + f.right.display + " and " + f.left.display)
                    pseudocodeArr.push(new HighlightLineStep(21, this.props.lines));

                    f = new Node(this.ref, "hidden", left.value + right.value, moveRightParentx+48, moveRightParenty-30, i, f.lEdge, f.rEdge, f.left, f.right)
                    i++;

                    steps.push(new ShowParentWithEdges(f, f.lEdge, f.rEdge));
                    messages.push("To get our parent node, we sum left and right childs, so: " + right.value + " + " + left.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(23, this.props.lines));
                    
                    steps.push(new UnhighlightNodes(f.left, f.right, f, f.lEdge, f.rEdge))
                    messages.push("To get our parent node, we sum left and right childs, so: " + right.value + " + " + left.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(23, this.props.lines));

                    steps.push(new EmptyStep())
                    messages.push("To get our parent node, we sum left and right childs, so: " + right.value + " + " + left.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(24, this.props.lines));
                }

                f.value = left.value + right.value;
                f.display = left.value + right.value;
                f.character = '-';
    
                // // first extracted node as left child.
                f.left = x;
    
                // // second extracted node as the right child.
                f.right = y;
    
                // marking the f node as the root node.
                root = f;

                // console.log(f)
    
                // add this node to the priority-queue.
                q.push(f);
                q.sort(function(a,b){return a.data-b.data;});
            }

            steps.push(new EmptyStep())
            messages.push("Comparing the left and right values.");
            pseudocodeArr.push(new HighlightLineStep(26, this.props.lines));

            if(right.character == '-' && left.character == '-'){
                steps.push(new EmptyStep())
                messages.push("Left character = " + left.character + " and right character = " + right.character);
                pseudocodeArr.push(new HighlightLineStep(26, this.props.lines));

                steps.push(new EmptyStep())
                messages.push("Checking character count.");
                pseudocodeArr.push(new HighlightLineStep(27, this.props.lines));

                if(k <= 20){
                    steps.push(new EmptyStep())
                    messages.push("Character count <= 20");
                    pseudocodeArr.push(new HighlightLineStep(27, this.props.lines));

                    let f = new Node(this.ref, "hidden", left.value + right.value, x+modx-7, y-modx-10, i);
                    i++;
                    
                    f.lEdge = new Edge(this.ref, "edge" + i, moveRightParentx + "%", moveRightParenty + "%", f.x + "%", f.y + "%", "hidden");
                    f.left = new Node(this.ref, "hidden", left.display, moveRightParentx, moveRightParenty, i)
                    i++;

                    f.rEdge = new Edge(this.ref, "edge" + i, moveRightParentx+65 + "%", moveRightParenty + "%", f.x + "%", f.y + "%", "hidden");
                    f.right = new Node(this.ref, "hidden", right.display, moveRightParentx+65, moveRightParenty, i)
                    i++;

                    steps.push(new ShowLeftRightNodesHighlighted(f.left, f.right))
                    messages.push("We take the next two items from our priority queue: " + f.left.display + " and " + f.right.display);
                    pseudocodeArr.push(new HighlightLineStep(28, this.props.lines));
                    steps.push(new EmptyStep())
                    messages.push("We take the next two items from our priority queue: " + f.left.display + " and " + f.right.display)
                    pseudocodeArr.push(new HighlightLineStep(28, this.props.lines));

                    f = new Node(this.ref, "hidden", left.value + right.value, x+modx-7, y-modx-10, i, f.lEdge, f.rEdge, f.left, f.right);
                    i++;

                    steps.push(new ShowParentWithEdges(f, f.lEdge, f.rEdge));
                    messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(29, this.props.lines));

                    steps.push(new UnhighlightNodes(f.left, f.right, f, f.lEdge, f.rEdge))
                    messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(29, this.props.lines));

                    steps.push(new EmptyStep())
                    messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(30, this.props.lines));

                    p++;
                    console.log("right.character == '-' && left.character == '-': " + p);

                    f.value = left.value + right.value;
                    f.display = left.value + right.value;
                    f.character = '-';
        
                    // // first extracted node as left child.
                    f.left = x;
        
                    // // second extracted node as the right child.
                    f.right = y;
        
                    // marking the f node as the root node.
                    root = f;

                    // console.log(f)
        
                    // add this node to the priority-queue.
                    q.push(f);
                    q.sort(function(a,b){return a.data-b.data;});
                }
                else if(k > 20){
                    steps.push(new EmptyStep())
                    messages.push("Character count > 20");
                    pseudocodeArr.push(new HighlightLineStep(32, this.props.lines));

                    let f = new Node(this.ref, "hidden", left.value + right.value, x+modx-35, y-modx-10, i);
                    i++;
                    
                    f.lEdge = new Edge(this.ref, "edge" + i, moveRightParentx-1.5 + "%", moveRightParenty + "%", f.x + "%", f.y + "%", "hidden");
                    f.left = new Node(this.ref, "hidden", left.display, moveRightParentx, moveRightParenty, i)
                    i++;

                    f.rEdge = new Edge(this.ref, "edge" + i, moveRightParentx+48 + "%", moveRightParenty-30 + "%", f.x + "%", f.y + "%", "hidden");
                    f.right = new Node(this.ref, "hidden", right.display, moveRightParentx+48, moveRightParenty-30, i)
                    i++;

                    steps.push(new ShowLeftRightNodesHighlighted(f.left, f.right))
                    messages.push("We take the next two items from our priority queue: " + f.left.display + " and " + f.right.display);
                    pseudocodeArr.push(new HighlightLineStep(33, this.props.lines));
                    steps.push(new EmptyStep())
                    messages.push("We take the next two items from our priority queue: " + f.left.display + " and " + f.right.display)
                    pseudocodeArr.push(new HighlightLineStep(33, this.props.lines));

                    f = new Node(this.ref, "hidden", left.value + right.value, x+modx-35, y-modx-10, i, f.lEdge, f.rEdge, f.left, f.right)
                    i++

                    steps.push(new ShowParentWithEdges(f, f.lEdge, f.rEdge));
                    messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(34, this.props.lines));

                    steps.push(new UnhighlightNodes(f.left, f.right, f, f.lEdge, f.rEdge))
                    messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(34, this.props.lines));

                    steps.push(new EmptyStep())
                    messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                    pseudocodeArr.push(new HighlightLineStep(35, this.props.lines));

                    p++;
                    console.log("right.character == '-' && left.character == '-': " + p);

                    f.value = left.value + right.value;
                    f.display = left.value + right.value;
                    f.character = '-';
        
                    // // first extracted node as left child.
                    f.left = x;
        
                    // // second extracted node as the right child.
                    f.right = y;
        
                    // marking the f node as the root node.
                    root = f;

                    // console.log(f)
        
                    // add this node to the priority-queue.
                    q.push(f);
                    q.sort(function(a,b){return a.data-b.data;});
                }
            }
            steps.push(new EmptyStep())
            messages.push("Comparing the left and right values.");
            pseudocodeArr.push(new HighlightLineStep(38, this.props.lines));

            if(right.character != '-' && left.character != '-' && k >= 10){
                steps.push(new EmptyStep())
                messages.push("Left character = " + left.character + " and right character = " + right.character);
                pseudocodeArr.push(new HighlightLineStep(38, this.props.lines));

                let f = new Node(this.ref, "hidden", left.value + right.value, moveRightParentx+65, moveRightParenty, i);
                i++

                f.lEdge = new Edge(this.ref, "edge" + i, moveRightx+60 + "%", moveRighty + "%", f.x + "%", f.y + "%", "hidden");
                f.left = new Node(this.ref, "hidden", left.display, moveRightx+60, moveRighty, i)
                i++
                
                f.rEdge = new Edge(this.ref, "edge" + i, moveRightx+100 + "%", moveRighty + "%", f.x + "%", f.y + "%", "hidden");
                f.right = new Node(this.ref, "hidden", right.display, moveRightx+100, moveRighty, i)
                i++
                
                steps.push(new ShowLeftRightNodesHighlighted(f.left, f.right))
                messages.push("We take the next two items from our priority queue: " + f.left.display + " and " + f.right.display);
                pseudocodeArr.push(new HighlightLineStep(39, this.props.lines));
                steps.push(new EmptyStep())
                messages.push("We take the next two items from our priority queue: " + f.left.display + " and " + f.right.display)
                pseudocodeArr.push(new HighlightLineStep(39, this.props.lines));

                f = new Node(this.ref, "hidden", left.value + right.value, moveRightParentx+65, moveRightParenty, i, f.lEdge, f.rEdge, f.left, f.right)
                i++

                steps.push(new ShowParentWithEdges(f, f.lEdge, f.rEdge));
                messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                pseudocodeArr.push(new HighlightLineStep(40, this.props.lines));

                steps.push(new UnhighlightNodes(f.left, f.right, f, f.lEdge, f.rEdge))
                messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                pseudocodeArr.push(new HighlightLineStep(40, this.props.lines));

                steps.push(new EmptyStep())
                messages.push("To get our parent node, we sum left and right childs, so: " + left.value + " + " + right.value + " = " + f.display);
                pseudocodeArr.push(new HighlightLineStep(41, this.props.lines));

                h++;
                console.log("right.character != '-' && left.character != '-' && k >= 10: " + h);

                f.value = left.value + right.value;
                f.display = left.value + right.value;
                f.character = '-';
    
                // // first extracted node as left child.
                f.left = x;
    
                // // second extracted node as the right child.
                f.right = y;
    
                // marking the f node as the root node.
                root = f;

                // console.log(f)
    
                // add this node to the priority-queue.
                q.push(f);
                q.sort(function(a,b){return a.data-b.data;});
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

            // f.value = left.value + right.value;
            // f.display = left.value + right.value;
            // f.character = '-';

            // // // first extracted node as left child.
            // f.left = x;

            // // // second extracted node as the right child.
            // f.right = y;

            // // marking the f node as the root node.
            // root = f;

            // // console.log(f)

            // // add this node to the priority-queue.
            // q.push(f);
            // q.sort(function(a,b){return a.data-b.data;});
            

            k += 10;
            l += 5;
        }

        for(var i = 0; i < ranWords.length; i++){
            letterMap.delete(ranWords.charAt(i), letterMap.get(ranWords.charAt(i)));
            letterMapSorted.delete(ranWords.charAt(i), letterMapSorted.get(ranWords.charAt(i)));
        }

        steps.push(new EmptyStep())
        messages.push("Huffman Coding Tree insertion complete!");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));
        this.setState({steps: steps});
        this.setState({messages: messages});
        this.props.handleCodeStepsChange(pseudocodeArr);
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
        if(this.state.running) return;
        if(this.state.stepId === this.state.steps.length) return;
        if (this.state.stepId - 1 < 0) return;

        let stepId = this.state.stepId - 1;

        this.state.steps[this.state.stepId].backward(d3.select(this.ref.current).select("svg"));
        document.getElementById("message").innerHTML = "<h1>" + this.state.messages[this.state.stepId] + "</h1>";

		this.setState({stepId: stepId});

		d3.timeout(this.turnOffRunning, this.props.waitTime);

    }

    forward(){		
		console.log("FORWARD CLICKED");

		if (this.state.running) return; // The user can't step forward while running via the play
										// button so as not to ruin the visualizer
		if (this.state.stepId === this.state.steps.length) return; // At the end of the step queue
		
        this.props.codeSteps[this.state.stepId].forward();

		// Uses the step's fastForward function and displays associated message
		this.state.steps[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg g"));
		document.getElementById("message").innerHTML = "<h1>" + this.state.messages[this.state.stepId] + "</h1>";

		this.setState({stepId: this.state.stepId + 1});

		d3.timeout(this.turnOffRunning, this.state.waitTime); // Calls function after wait time
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
		// d3.timeout(this.run, this.state.waitTime);
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
        document.getElementById("message").innerHTML = "Welcome to Huffman Coding Tree!";

		this.setState({running: false, steps: [], messages: [], tree: [], maxLevel: -1, stepId: 0, root: null});
        this.initialize()
        i = 0;
        j = 0;

	}

    restartInsertion() {
		console.log("RESTART CLICKED");
        
		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "Welcome to Huffman Coding Tree!";

		this.setState({running: false, steps: [], messages: [], tree: [], stepId: 0, root: null, svg: null, inserting: true});
        this.initialize();
        i = 0;
        j = 0;
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
			console.log("Steps changed");
			// var svg = this.initialize();
            this.simulate();
			// svg.attr("visibility", "visible");
		}
		else if (this.state.running !== prevState.running && this.state.running === true)
		{
			this.run();
			console.log("We ran");
		}
	}

    refreshPage() {
        window.location.reload(false);
    }

    componentWillUnmount() {
    console.log("component unmounted")
    clearInterval(this.state.interval);
    }

    clearSteps() {
        console.log("clearing steps")
		this.setState({steps: [], messages: [], stepId: 0});
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
        console.log(`Called huffman(${x})`);
        // var root = this.state.root

    
        let isRunning = this.isRunningCheck("#insertionValue");
        if (isRunning) return;

        if (x.length > 5) {
            document.getElementById("message").innerHTML = "Please use a word smaller than 5 characters";
            return
        }
        // document.getElementById("message").innerHTML = "Let's insert "+ parseInt(x) + " into the tree.";

        if (!this.state.inserting) {
            // root = null
            this.setState({inserting: true})
            this.restartInsertion();
        } else {
            this.clearSteps()
        }

		// this.setState({running: false, steps: [], messages: [], tree: [], stepId: 0, root: null, svg: null});
        // this.initialize();
        // this.restart()
        // this.fastForward();
    
        this.newAdd(x);
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
                    <button class="button" onClick={this.refreshPage}>Restart</button>
                    <button class="button" onClick={this.backward}>Step Backward</button> 
                    <button class="button" onClick={this.forward}>Step Forward</button>
                    <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
                </div>
                <div id="insertion" class="center-screen">
                    <input class="inputValue2" type="string" id="insertionValue" placeholder="ex. algo"></input>
                    <button class="button" id="insertBut" onClick={this.handleInsertion}>Insert</button>
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Huffman Coding Tree!</h1></span></div>
                <table>
                    <tr>
                        <div ref={this.ref} class=""></div>
                    </tr>
                    {/* <tr>
                        <div style={{width: "500px"}}>
                            <p>gian</p>
                        </div>
                    </tr> */}
                </table>
                <div class="parent-svg">
                <div id="visualizerDiv" ref={this.ref} class="center-screen tree-vis grabbable"></div>
                    <Pseudocode algorithm={"huffman"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
            </div>
        )
    }
}