import React from "react";
import "./binarysearchtree.css";
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
import { wait } from "@testing-library/react";
import "../css/input.css"

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
    forward(svg) {}
	fastForward(svg) {}
	backward(svg) {}
}

class NewNodeStep {
    constructor(node, edge) {
        this.node = node;
        this.edge = edge;
    }

    forward(svg) {
		svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.textId).attr("visibility", "visible");
        console.log(" EDGE EXISTS " + this.edge)
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('accentColor'));
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
		// svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
	}
    fastForward(svg){
        this.forward(svg);
    }

    backward(svg){
        svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('secondaryColor'));
        svg.select("#" + this.node.id).attr("visibility", "hidden");
        svg.select("#" + this.node.textId).attr("visibility", "hidden");
        console.log(" EDGE EXISTS " + this.edge)
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('secondaryColor'));
            svg.select("#" + this.edge.id).attr("visibility", "hidden");
        }
    }
}

class HighlightNodeStep {
    constructor(node, edge) {
		this.node = node;
        this.edge = edge;
	}

    forward(svg) {
		svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('accentColor'));
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.textId).attr("visibility", "visible");
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('accentColor'));
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
	}
    fastForward(svg){
        this.forward(svg);
    }
    backward(svg){
        svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('secondaryColor'));
        svg.select("#" + this.node.id).attr("visibility", "visible");
        svg.select("#" + this.node.textId).attr("visibility", "visible");
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('secondaryColor'));
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
    fastForward(svg){
        this.forward(svg);
    }
    backward(svg){
        svg.select("#" + this.node.id).attr("stroke", localStorage.getItem('accentColor'));
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", localStorage.getItem('accentColor'));
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
    fastForward(svg){
        this.forward(svg);
    }
    backward(svg){
        var node = this.root;
        var edge = null;
        while (node != null) {
            svg.select("#" + node.id).attr("stroke", localStorage.getItem('accentColor'));
            if (this.finalVal < node.value) {
                edge = node.lEdge;
                node = node.left;
                svg.select("#" + edge.id).style("stroke", localStorage.getItem('accentColor'));
            } else  if (this.finalVal > node.value) {
                edge = node.rEdge;
                node = node.right;
                svg.select("#" + edge.id).style("stroke", localStorage.getItem('accentColor'));
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
    constructor(ref, value, x, y, i, leftEdge, rightEdge) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
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
            "hidden",
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
            running: false,
            root: null,
            interval: null,
            svg: null,
            inserting: false,
            intTest: null,
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
        this.fastForward = this.fastForward.bind(this);
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
                this.state.root = new Node(this.ref, val, x, y, i);
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
                            node.left = new Node(this.ref, val, temp_x, temp_y, i);
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
                            node.right = new Node(this.ref, val, temp_x, temp_y, i);
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

    newAdd(val, oldroot) {
        var level = 0;
        var modifier = 4;
        var steps = []
        var messages = []
        var pseudocodeArr = [];
        var root = oldroot

        if(!root) {
            root = new Node(this.ref, val, x, y, i);
            // this.setState({root: root})
            //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
            steps.push(new NewNodeStep(root, null));
            messages.push("The tree is empty, let's add "+ val + " as the root node.");
            pseudocodeArr.push(new HighlightLineStep(6, this.props.lines))
            
            // steps.push(new UnHighlightNodeStep(this.state.root, null));
            steps.push(new UnHighlightPathStep(root, val));
            messages.push("Incrementing number of total nodes.");
            pseudocodeArr.push(new HighlightLineStep(7, this.props.lines))
            i++;
        } else {
            steps.push(new EmptyStep());
            messages.push("The tree has a root node!");
            pseudocodeArr.push(new HighlightLineStep(9, this.props.lines))

            let node = root;
            //y += 10;
            level = 0
            var firstStep = true;

            steps.push(new EmptyStep());
            messages.push("We will be inserting a new value into the tree!");
            pseudocodeArr.push(new HighlightLineStep(9, this.props.lines))

            while(true) {
                steps.push(new EmptyStep());
                messages.push("The value can be inserted. Continuing.");
                pseudocodeArr.push(new HighlightLineStep(12, this.props.lines))
                var tempMod = (level*modifier) > 15 ? 15 : (level*modifier);
                //console.log(node.value);
                steps.push(new EmptyStep());
                messages.push("Has the insertion already occurred?");
                pseudocodeArr.push(new HighlightLineStep(13, this.props.lines))
                if (firstStep) {
                    steps.push(new HighlightNodeStep(node, null));
                    messages.push("No. The next value we will insert into the tree is " + val );
                    pseudocodeArr.push(new HighlightLineStep(14, this.props.lines))
                    
                    steps.push(new HighlightNodeStep(node, null));
                    messages.push("No. The next value we will insert into the tree is " + val );
                    pseudocodeArr.push(new HighlightLineStep(15, this.props.lines))
                    firstStep = false;
                } else {
                    steps.push(new HighlightNodeStep(node, null));
                    messages.push("Yes. No insertion has occurred...");
                    pseudocodeArr.push(new HighlightLineStep(17, this.props.lines))

                    steps.push(new HighlightNodeStep(node, null));
                    messages.push("Yes. No insertion has occurred...");
                    pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))
                }

                steps.push(new HighlightNodeStep(node, null));
                messages.push("Is the new value < the current node?");
                pseudocodeArr.push(new HighlightLineStep(20, this.props.lines))
                if(val < node.value) {
                    steps.push(new EmptyStep());
                    messages.push("Yes " + val + " is less than " + node.value );
                    pseudocodeArr.push(new HighlightLineStep(20, this.props.lines))

                    // steps.push(new UnHighlightNodeStep(node, null));
                    // messages.push(val + " is less than " + node.value);

                    steps.push(new EmptyStep());
                    messages.push("Does node.left = null?");
                    pseudocodeArr.push(new HighlightLineStep(21, this.props.lines))

                    if(node.left != null) {
                        steps.push(new EmptyStep());
                        messages.push("No, node.left != null.");
                        pseudocodeArr.push(new HighlightLineStep(21, this.props.lines))
                        var edge = node.lEdge;
                        node = node.left;
                        steps.push(new HighlightNodeStep(node, edge));
                        messages.push("Let's traverse to the left edge of the node.");
                        pseudocodeArr.push(new HighlightLineStep(22, this.props.lines))
                        // steps.push(new UnHighlightNodeStep(node, edge));
                        // messages.push("Let's traverse to the left edge of the node.");
                    } else {
                        steps.push(new EmptyStep());
                        messages.push("Yes, let's perform an insertion.");
                        pseudocodeArr.push(new HighlightLineStep(24, this.props.lines))
                        temp_x = node.x - 20 + tempMod;
                        temp_y = node.y + 10;
                        temp_x2 = node.x - 17 + tempMod;
                        temp_y2 = node.y + 8;

                        node.lEdge = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
                        node.left = new Node(this.ref, val, temp_x, temp_y, i);

                        steps.push(new EmptyStep());
                        messages.push( node.value + " has no left child.");
                        pseudocodeArr.push(new HighlightLineStep(24, this.props.lines))

                        steps.push(new NewNodeStep(node.left, node.lEdge));
                        messages.push("Let's insert " + val + " to the left of node " + node.value );
                        pseudocodeArr.push(new HighlightLineStep(25, this.props.lines))

                        // steps.push(new UnHighlightNodeStep(node.left, node.lEdge));
                        steps.push(new UnHighlightPathStep(root, val));
                        messages.push("Let's insert " + val + " to the left of node " + node.value );
                        pseudocodeArr.push(new HighlightLineStep(25, this.props.lines))

                        //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
                        // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
                        // if (level > this.state.maxLevel) {
                        //     this.setState({maxLevel: level});
                        //     this.adjustDistances(root, level);
                        // }
                        steps.push(new EmptyStep());
                        messages.push("Incrementing total node count.");
                        pseudocodeArr.push(new HighlightLineStep(26, this.props.lines))
                        i++;
                        steps.push(new EmptyStep());
                        messages.push("Incrementing total node count.");
                        pseudocodeArr.push(new HighlightLineStep(27, this.props.lines))
                        j++;
                        steps.push(new EmptyStep());
                        messages.push("Inserted!");
                        pseudocodeArr.push(new HighlightLineStep(28, this.props.lines))
                        break;
                    }
                } else if (val > node.value) {
                    steps.push(new EmptyStep());
                    messages.push("Is our new value greater than the current node's value?");
                    pseudocodeArr.push(new HighlightLineStep(31, this.props.lines))

                    steps.push(new EmptyStep());
                    messages.push( val + " is greater than " + node.value );
                    pseudocodeArr.push(new HighlightLineStep(31, this.props.lines))
                    // steps.push(new UnHighlightNodeStep(node, null));
                    // messages.push(val + " is greater than " + node.value);

                    steps.push(new EmptyStep());
                    messages.push("Does node.right = null?");
                    pseudocodeArr.push(new HighlightLineStep(32, this.props.lines))

                    if(node.right != null) {
                        steps.push(new EmptyStep());
                        messages.push("No, node.right != null.");
                        pseudocodeArr.push(new HighlightLineStep(32, this.props.lines))

                        var edge = node.rEdge
                        node = node.right;
                        steps.push(new HighlightNodeStep(node, edge));
                        messages.push("Let's traverse to the right edge of the node.");
                        pseudocodeArr.push(new HighlightLineStep(33, this.props.lines))
                        // steps.push(new UnHighlightNodeStep(node, edge));
                        // messages.push("Let's traverse to the right edge of the node.");
                    } else {
                        steps.push(new EmptyStep());
                        messages.push("Yes, let's perform an insertion.");
                        pseudocodeArr.push(new HighlightLineStep(35, this.props.lines))
                        temp_x = node.x + 20 - tempMod;
                        temp_y = node.y + 10;
                        temp_x2 = node.x + 17 - tempMod;
                        temp_y2 = node.y + 8;
                        node.rEdge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
                        node.right = new Node(this.ref, val, temp_x, temp_y, i);

                        steps.push(new EmptyStep());
                        messages.push( node.value + " has no right child.");
                        pseudocodeArr.push(new HighlightLineStep(35, this.props.lines))
                        
                        steps.push(new NewNodeStep(node.right, node.rEdge));
                        messages.push("Let's insert " + val + " to the right of node " + node.value );
                        pseudocodeArr.push(new HighlightLineStep(36, this.props.lines))

                        // steps.push(new UnHighlightNodeStep(node.right, node.rEdge));
                        steps.push(new UnHighlightPathStep(root, val));
                        messages.push("Let's insert " + val + " to the right of node " + node.value );
                        pseudocodeArr.push(new HighlightLineStep(36, this.props.lines))
                        //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
                        // if (level > this.state.maxLevel) {
                        //     this.setState({maxLevel: level});
                        //     this.adjustDistances(root, level);
                        // }
                        steps.push(new EmptyStep());
                        messages.push("Incrementing total node count.");
                        pseudocodeArr.push(new HighlightLineStep(37, this.props.lines))
                        i++;
                        steps.push(new EmptyStep());
                        messages.push("Incrementing total node count.");
                        pseudocodeArr.push(new HighlightLineStep(38, this.props.lines))
                        j++;
                        steps.push(new EmptyStep());
                        messages.push("Inserted!");
                        pseudocodeArr.push(new HighlightLineStep(39, this.props.lines))
                        break;
                    }
                } else {
                    steps.push(new EmptyStep());
                    messages.push("Are the new value and node values equal?");
                    pseudocodeArr.push(new HighlightLineStep(42, this.props.lines))
                    
                    steps.push(new EmptyStep());
                    messages.push(val + " is equal to " + node.value);
                    pseudocodeArr.push(new HighlightLineStep(43, this.props.lines))

                    // steps.push(new UnHighlightNodeStep(node, null));
                    steps.push(new UnHighlightPathStep(root, val));
                    messages.push("There cannot be duplicate values in a BST, so we will move on.");
                    pseudocodeArr.push(new HighlightLineStep(44, this.props.lines))
                    break;
                }
                level++;
            }
        }

        steps.push(new EmptyStep())
        messages.push("Insertion of " + val + " complete!");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines))

        console.log("finished insertion of node", root);
        this.setState({steps: steps});
        this.setState({messages: messages});
        this.setState({root: root})
        this.props.handleCodeStepsChange(pseudocodeArr);
    }

    simulate() {
        console.log("SIMULATING");
        var val = Math.floor(Math.random() * 100);
        var level = 0;
        var modifier = 4;
        var steps = []
        var messages = []
        var root = null;
        var pseudocodeArr = [];

        steps.push(new EmptyStep());
        messages.push("Welcome to Binary Search Tree!");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines))

        console.log("Current Lines: " + this.props.lines);

        while (i < MAX_NODE) {
            steps.push(new EmptyStep());
            messages.push("There are less nodes than the max allowed.");
            pseudocodeArr.push(new HighlightLineStep(3, this.props.lines))

            val = Math.floor(Math.random() * 100);
            steps.push(new EmptyStep());
            messages.push("The next value we will insert into the tree is " + val );
            pseudocodeArr.push(new HighlightLineStep(4, this.props.lines))
            
            console.log("level " + level);

            steps.push(new EmptyStep());
            messages.push("Does the tree have a root node?");
            pseudocodeArr.push(new HighlightLineStep(5, this.props.lines))

            if(!root) {
                root = new Node(this.ref, val, x, y, i);
                // this.setState({root: root})
                //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
                steps.push(new NewNodeStep(root, null));
                messages.push("The tree is empty, let's add "+ val + " as the root node.");
                pseudocodeArr.push(new HighlightLineStep(6, this.props.lines))
                
                // steps.push(new UnHighlightNodeStep(this.state.root, null));
                steps.push(new UnHighlightPathStep(root, val));
                messages.push("Incrementing number of total nodes.");
                pseudocodeArr.push(new HighlightLineStep(7, this.props.lines))
                i++;
            } else {
                steps.push(new EmptyStep());
                messages.push("The tree has a root node!");
                pseudocodeArr.push(new HighlightLineStep(9, this.props.lines))

                let node = root;
                //y += 10;
                level = 0
                var firstStep = true;

                steps.push(new EmptyStep());
                messages.push("We will be inserting a new value into the tree!");
                pseudocodeArr.push(new HighlightLineStep(9, this.props.lines))

                while(true) {
                    steps.push(new EmptyStep());
                    messages.push("The value can be inserted. Continuing.");
                    pseudocodeArr.push(new HighlightLineStep(12, this.props.lines))
                    var tempMod = (level*modifier) > 15 ? 15 : (level*modifier);
                    //console.log(node.value);
                    steps.push(new EmptyStep());
                    messages.push("Has the insertion already occurred?");
                    pseudocodeArr.push(new HighlightLineStep(13, this.props.lines))
                    if (firstStep) {
                        steps.push(new HighlightNodeStep(node, null));
                        messages.push("No. The next value we will insert into the tree is " + val );
                        pseudocodeArr.push(new HighlightLineStep(14, this.props.lines))
                        
                        steps.push(new HighlightNodeStep(node, null));
                        messages.push("No. The next value we will insert into the tree is " + val );
                        pseudocodeArr.push(new HighlightLineStep(15, this.props.lines))
                        firstStep = false;
                    } else {
                        steps.push(new HighlightNodeStep(node, null));
                        messages.push("Yes. No insertion has occurred...");
                        pseudocodeArr.push(new HighlightLineStep(17, this.props.lines))

                        steps.push(new HighlightNodeStep(node, null));
                        messages.push("Yes. No insertion has occurred...");
                        pseudocodeArr.push(new HighlightLineStep(18, this.props.lines))
                    }

                    steps.push(new HighlightNodeStep(node, null));
                    messages.push("Is the new value < the current node?");
                    pseudocodeArr.push(new HighlightLineStep(20, this.props.lines))
                    if(val < node.value) {
                        steps.push(new EmptyStep());
                        messages.push("Yes " + val + " is less than " + node.value );
                        pseudocodeArr.push(new HighlightLineStep(20, this.props.lines))

                        // steps.push(new UnHighlightNodeStep(node, null));
                        // messages.push(val + " is less than " + node.value);

                        steps.push(new EmptyStep());
                        messages.push("Does node.left = null?");
                        pseudocodeArr.push(new HighlightLineStep(21, this.props.lines))

                        if(node.left != null) {
                            steps.push(new EmptyStep());
                            messages.push("No, node.left != null.");
                            pseudocodeArr.push(new HighlightLineStep(21, this.props.lines))
                            var edge = node.lEdge;
                            node = node.left;
                            steps.push(new HighlightNodeStep(node, edge));
                            messages.push("Let's traverse to the left edge of the node.");
                            pseudocodeArr.push(new HighlightLineStep(22, this.props.lines))
                            // steps.push(new UnHighlightNodeStep(node, edge));
                            // messages.push("Let's traverse to the left edge of the node.");
                        } else {
                            steps.push(new EmptyStep());
                            messages.push("Yes, let's perform an insertion.");
                            pseudocodeArr.push(new HighlightLineStep(24, this.props.lines))
                            temp_x = node.x - 20 + tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x - 17 + tempMod;
                            temp_y2 = node.y + 8;

                            node.lEdge = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
                            node.left = new Node(this.ref, val, temp_x, temp_y, i);

                            steps.push(new EmptyStep());
                            messages.push( node.value + " has no left child.");
                            pseudocodeArr.push(new HighlightLineStep(24, this.props.lines))

                            steps.push(new NewNodeStep(node.left, node.lEdge));
                            messages.push("Let's insert " + val + " to the left of node " + node.value );
                            pseudocodeArr.push(new HighlightLineStep(25, this.props.lines))

                            // steps.push(new UnHighlightNodeStep(node.left, node.lEdge));
                            steps.push(new UnHighlightPathStep(root, val));
                            messages.push("Let's insert " + val + " to the left of node " + node.value );
                            pseudocodeArr.push(new HighlightLineStep(25, this.props.lines))

                            //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
                            // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
                            // if (level > this.state.maxLevel) {
                            //     this.setState({maxLevel: level});
                            //     this.adjustDistances(root, level);
                            // }
                            steps.push(new EmptyStep());
                            messages.push("Incrementing total node count.");
                            pseudocodeArr.push(new HighlightLineStep(26, this.props.lines))
                            i++;
                            steps.push(new EmptyStep());
                            messages.push("Incrementing total node count.");
                            pseudocodeArr.push(new HighlightLineStep(27, this.props.lines))
                            j++;
                            steps.push(new EmptyStep());
                            messages.push("Inserted!");
                            pseudocodeArr.push(new HighlightLineStep(28, this.props.lines))
                            break;
                        }
                    } else if (val > node.value) {
                        steps.push(new EmptyStep());
                        messages.push("Is our new value greater than the current node's value?");
                        pseudocodeArr.push(new HighlightLineStep(31, this.props.lines))

                        steps.push(new EmptyStep());
                        messages.push( val + " is greater than " + node.value );
                        pseudocodeArr.push(new HighlightLineStep(31, this.props.lines))
                        // steps.push(new UnHighlightNodeStep(node, null));
                        // messages.push(val + " is greater than " + node.value);

                        steps.push(new EmptyStep());
                        messages.push("Does node.right = null?");
                        pseudocodeArr.push(new HighlightLineStep(32, this.props.lines))

                        if(node.right != null) {
                            steps.push(new EmptyStep());
                            messages.push("No, node.right != null.");
                            pseudocodeArr.push(new HighlightLineStep(32, this.props.lines))

                            var edge = node.rEdge
                            node = node.right;
                            steps.push(new HighlightNodeStep(node, edge));
                            messages.push("Let's traverse to the right edge of the node.");
                            pseudocodeArr.push(new HighlightLineStep(33, this.props.lines))
                            // steps.push(new UnHighlightNodeStep(node, edge));
                            // messages.push("Let's traverse to the right edge of the node.");
                        } else {
                            steps.push(new EmptyStep());
                            messages.push("Yes, let's perform an insertion.");
                            pseudocodeArr.push(new HighlightLineStep(35, this.props.lines))
                            temp_x = node.x + 20 - tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x + 17 - tempMod;
                            temp_y2 = node.y + 8;
                            node.rEdge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "hidden");
                            node.right = new Node(this.ref, val, temp_x, temp_y, i);

                            steps.push(new EmptyStep());
                            messages.push( node.value + " has no right child.");
                            pseudocodeArr.push(new HighlightLineStep(35, this.props.lines))
                            
                            steps.push(new NewNodeStep(node.right, node.rEdge));
                            messages.push("Let's insert " + val + " to the right of node " + node.value );
                            pseudocodeArr.push(new HighlightLineStep(36, this.props.lines))

                            // steps.push(new UnHighlightNodeStep(node.right, node.rEdge));
                            steps.push(new UnHighlightPathStep(root, val));
                            messages.push("Let's insert " + val + " to the right of node " + node.value );
                            pseudocodeArr.push(new HighlightLineStep(36, this.props.lines))
                            //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
                            // if (level > this.state.maxLevel) {
                            //     this.setState({maxLevel: level});
                            //     this.adjustDistances(root, level);
                            // }
                            steps.push(new EmptyStep());
                            messages.push("Incrementing total node count.");
                            pseudocodeArr.push(new HighlightLineStep(37, this.props.lines))
                            i++;
                            steps.push(new EmptyStep());
                            messages.push("Incrementing total node count.");
                            pseudocodeArr.push(new HighlightLineStep(38, this.props.lines))
                            j++;
                            steps.push(new EmptyStep());
                            messages.push("Inserted!");
                            pseudocodeArr.push(new HighlightLineStep(39, this.props.lines))
                            break;
                        }
                    } else {
                        steps.push(new EmptyStep());
                        messages.push("Are the new value and node values equal?");
                        pseudocodeArr.push(new HighlightLineStep(42, this.props.lines))
                        
                        steps.push(new EmptyStep());
                        messages.push(val + " is equal to " + node.value);
                        pseudocodeArr.push(new HighlightLineStep(43, this.props.lines))

                        // steps.push(new UnHighlightNodeStep(node, null));
                        steps.push(new UnHighlightPathStep(root, val));
                        messages.push("There cannot be duplicate values in a BST, so we will move on.");
                        pseudocodeArr.push(new HighlightLineStep(44, this.props.lines))
                        break;
                    }
                    level++;
                }
            }
        }

        steps.push(new EmptyStep())
        messages.push("Binary Search Tree insertion complete!");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines))

        console.log(this.state.root);
        this.setState({steps: steps});
        this.setState({messages: messages});
        this.setState({root: root})
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
        if (this.state.stepId - 1 < 0) return;

        let stepId = this.state.stepId - 1;

        this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
        this.props.codeSteps[stepId].forward();
        document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Binary Search Tree!</h1>" : "<h1>" + this.state.messages[this.state.stepId] + "</h1>";

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
		//this.props.codeSteps[this.state.stepId].forward();
        this.state.steps[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg g"));
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
        //this.props.codeSteps[this.state.stepId].forward();
        console.log(this.state)
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
        document.getElementById("message").innerHTML = "Welcome to Binary Search Tree Insertion!";

		this.setState({running: false, steps: [], messages: [], tree: [], stepId: 0, root: null, svg: null, inserting: false});
        this.initialize();
        i = 0;
        j = 0;

	}

    restartInsertion() {
		console.log("RESTART CLICKED");
        
		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "Welcome to Binary Search Tree Insertion!";

		this.setState({running: false, steps: [], messages: [], tree: [], stepId: 0, root: null, svg: null, inserting: true});
        this.initialize();
        i = 0;
        j = 0;
	}

    clearSteps() {
		this.setState({steps: [], messages: [], stepId: 0});
	}

    componentDidMount() {
        this.initialize()
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
        // if (this.state.root !== prevState.root && this.state.root === null) {
        //     console.log("second")
		// 	// console.log("Steps changed");
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

    fastForward() {
        if (this.state.running) return;
        if (this.state.stepId === this.state.steps.length) return;
        this.running = true;
    
        let svg = d3.select(this.ref.current).select("svg");
    
        while (this.state.stepId < this.state.steps.length) {
          for (const step of this.state.steps[this.state.stepId]) step.fastForward(svg);
          this.state.stepId = this.state.stepId + 1;
        }
    
        this.running = false;
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
        document.getElementById("message").innerHTML = "Let's insert "+ parseInt(x) + " into the tree.";

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
                    <button class="button" onClick={this.backward}>Step Backward</button> 
                    <button class="button" onClick={this.forward}>Step Forward</button>
                    <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
                </div>
                <div id="insertion" class="center-screen">
                    <input class="inputValue2"type="number" id="insertionValue" placeholder="ex. 25"></input>
                    <button class="button" id="insertBut" onClick={this.handleInsertion}>Insert</button>
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Binary Search Tree!</h1></span></div>
                <table>
                    <tr>
                        <div ref={this.ref} class=""></div>
                    </tr>
                    {/* <tr>
                        <div style={{width: "500px"}}>
                            <p>tim</p>
                        </div>
                    </tr> */}
                </table>
                <div class="parent-svg">
                    <div id="visualizerDiv" ref={this.ref} class="center-screen tree-vis grabbable"></div>
					<Pseudocode algorithm={"bststructure"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
            </div>
        )
    }
}