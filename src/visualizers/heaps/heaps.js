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
            console.log("level " + level);
            if(!root) {
                root = new Node(this.ref, null, x, y, i);
                this.setState({root: root})
                //this.state.root = new LabeledNode(ref, "node" + i, "label" + i, x + "%", y + "%", num, "visible", "gray");
                steps.push(new NewNodeStep(root, null));
                messages.push("The tree is empty, let's add "+ val + " as the root node.");
                
                // steps.push(new UnHighlightNodeStep(this.state.root, null));
                steps.push(new UnHighlightPathStep(root, val));
                messages.push("The tree is empty, let's add "+ val + " as the root node.");
                i++;
            } else {
                let node = root;
                //y += 10;
                level = 0
                var firstStep = true;

                while(true) {
                    var tempMod = (level*modifier) > 15 ? 15 : (level*modifier);
                    //console.log(node.value);
                    if (firstStep) {
                        steps.push(new HighlightNodeStep(node, null));
                        messages.push("The next value we will insert into the tree is " + val );
                        firstStep = false;
                    } else {
                        steps.push(new HighlightNodeStep(node, null));
                        messages.push("");
                    }

                    if(val < node.value) {
                        steps.push(new EmptyStep());
                        messages.push( val + " is less than " + node.value );

                        // steps.push(new UnHighlightNodeStep(node, null));
                        // messages.push(val + " is less than " + node.value);

                        if(node.left != null) {
                            var edge = node.lEdge;
                            node = node.left;
                            steps.push(new HighlightNodeStep(node, edge));
                            messages.push("Let's traverse to the left edge of the node.");

                            // steps.push(new UnHighlightNodeStep(node, edge));
                            // messages.push("Let's traverse to the left edge of the node.");
                        } else {
                            temp_x = node.x - 20 + tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x - 17 + tempMod;
                            temp_y2 = node.y + 8;

                            node.lEdge = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            node.left = new Node(this.ref, null, temp_x, temp_y, i, level===1);

                            steps.push(new EmptyStep());
                            messages.push( node.value + " has no left child.");

                            steps.push(new NewNodeStep(node.left, node.lEdge));
                            messages.push("Let's insert " + val + " to the left of node " + node.value );

                            // steps.push(new UnHighlightNodeStep(node.left, node.lEdge));
                            steps.push(new UnHighlightPathStep(root, val));
                            messages.push("Let's insert " + val + " to the left of node " + node.value );

                            //node.left = new LabeledNode(ref, "node" + i, "label" + i, (x/2) + "%", y + "%", num, "visible", "gray");
                            // let edge = new Edge(this.ref, "edge" + j, node.x + "%", node.y + "%", temp_x + "%", temp_y + "%", "visible");
                            // if (level > this.state.maxLevel) {
                            //     this.setState({maxLevel: level});
                            //     this.adjustDistances(root, level);
                            // }
                            i++;
                            j++;
                            break;
                        }
                    } else if (val > node.value) {
                        steps.push(new EmptyStep());
                        messages.push( val + " is greater than " + node.value );

                        // steps.push(new UnHighlightNodeStep(node, null));
                        // messages.push(val + " is greater than " + node.value);

                        if(node.right != null) {
                            var edge = node.rEdge
                            node = node.right;
                            steps.push(new HighlightNodeStep(node, edge));
                            messages.push("Let's traverse to the right edge of the node.");

                            // steps.push(new UnHighlightNodeStep(node, edge));
                            // messages.push("Let's traverse to the right edge of the node.");
                        } else {
                            temp_x = node.x + 20 - tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x + 17 - tempMod;
                            temp_y2 = node.y + 8;
                            node.rEdge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            node.right = new Node(this.ref, null, temp_x, temp_y, i, level===1);

                            steps.push(new EmptyStep());
                            messages.push( node.value + " has no right child.");

                            steps.push(new NewNodeStep(node.right, node.rEdge));
                            messages.push("Let's insert " + val + " to the right of node " + node.value );

                            // steps.push(new UnHighlightNodeStep(node.right, node.rEdge));
                            steps.push(new UnHighlightPathStep(root, val));
                            messages.push("Let's insert " + val + " to the right of node " + node.value );

                            //node.right = new LabeledNode(ref, "node" + i, "label" + i, (x + (x/2)) + "%", y + "%", num, "visible", "gray");
                            // if (level > this.state.maxLevel) {
                            //     this.setState({maxLevel: level});
                            //     this.adjustDistances(root, level);
                            // }
                            i++;
                            j++;
                            break;
                        }
                    } else {
                        steps.push(new EmptyStep());
                        messages.push(val + " is equal to " + node.value);

                        // steps.push(new UnHighlightNodeStep(node, null));
                        steps.push(new UnHighlightPathStep(root, val));
                        messages.push("There cannot be duplicate values in a BST, so we will move on.");
                        break;
                    }
                    level++;
                }
            }
        }

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