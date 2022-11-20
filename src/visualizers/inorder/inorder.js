import React from "react";
import "./inorder.css";
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";
import LabeledNode from "../../foundation/tree/LabeledNode";
import Edge from "../../foundation/tree/Edge";
import { HighlightTwoTone, MessageSharp, SignalCellularNoSimOutlined, StoreSharp } from "@material-ui/icons";
import { svg, tree } from "d3";
import { GRAY, UCF_GOLD } from "../../assets/colors";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import {Pseudocode, HighlightLineStep} from "../../components/pseudocode/Pseudocode";


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
    fastForward() {}
    backward() {}
}
class CreateAndHighlightNodeStep {
    constructor(node, edge) {
		this.node = node;
        this.edge = edge;
	}

    forward(svg) {
        if (this.node) {
            svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
            svg.select("#" + this.node.id).attr("visibility", "visible");
            svg.select("#" + this.node.node.textId).attr("visibility", "visible");
        } 
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", UCF_GOLD);
            svg.select("#" + this.edge.id).attr("visibility", "visible");
        }
	}

    fastForward(svg){
        this.forward(svg);
    }

    backward(svg) {
        UnHighlightNodeStep.forward(svg)
    }
}

class HighlightNodeStep {
    constructor(node, edge) {
		this.node = node;
        this.edge = edge;
	}

    forward(svg) {
        if (this.node) {
            svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
        } 
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", UCF_GOLD);
        }
	}

    fastForward(svg){
        this.forward(svg);
    }

    backward(svg) {
        if (this.node) {
            svg.select("#" + this.node.id).attr("stroke", GRAY);
        } 
        if (this.edge) {
            svg.select("#" + this.edge.id).style("stroke", GRAY);
        }
    }
}

class UnHighlightNodeStep {
    constructor(node, edge1, edge2) {
		this.node = node;
        this.edge1 = edge1;
        this.edge2 = edge2;
	}

    forward(svg) {
        if (this.node) {
            svg.select("#" + this.node.id).attr("stroke", GRAY);
        }
        if (this.edge1) {
            svg.select("#" + this.edge1.id).style("stroke", GRAY);
        }
        if (this.edge2) {
            svg.select("#" + this.edge2.id).style("stroke", GRAY);
        }
	}

    fastForward(svg){
        this.forward(svg);
    }

    backward(svg) {
        if (this.node) {
            svg.select("#" + this.node.id).attr("stroke", UCF_GOLD);
        }
        if (this.edge1) {
            svg.select("#" + this.edge1.id).style("stroke", UCF_GOLD);
        }
        if (this.edge2) {
            svg.select("#" + this.edge2.id).style("stroke", UCF_GOLD);
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

    fastForward(svg){
        this.forward(svg);
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
            //pseudocodeArr: [],
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
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
        this.buildtree = this.buildTree.bind(this);
        this.playinorder = this.playinorder.bind(this);
        this.inorderRecursive = this.inorderRecursive.bind(this);
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

    buildTree() {
        console.log("SIMULATING");
        var val = Math.floor(Math.random() * 100);
        var level = 0;
        var modifier = 4;
        var steps = []
        var messages = []
        var root = null;

        while (i < MAX_NODE) {
            val = Math.floor(Math.random() * 100);
            if(!root) {
                root = new Node(this.ref, val, x, y, i);
                console.log(root);
                this.setState({root: root})
                i++;
            } else {
                let node = root;
                //y += 10;
                level = 0
                var firstStep = true;

                while(true) {
                    var tempMod = (level*modifier) > 15 ? 15 : (level*modifier);
                    //console.log(node.value);

                    if(val < node.value) {

                        if(node.left != null) {
                            var edge = node.lEdge;
                            node = node.left;

                            // steps.push(new UnHighlightNodeStep(node, edge));
                            // messages.push("Let's traverse to the left edge of the node.");
                        } else {
                            temp_x = node.x - 20 + tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x - 17 + tempMod;
                            temp_y2 = node.y + 8;

                            node.lEdge = new Edge(this.ref, "edge" + j, node.x-3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            node.left = new Node(this.ref, val, temp_x, temp_y, i, level===1);

                            i++;
                            j++;
                            break;
                        }
                    } else if (val > node.value) {
                        if(node.right != null) {
                            var edge = node.rEdge
                            node = node.right;
                            // steps.push(new UnHighlightNodeStep(node, edge));
                            // messages.push("Let's traverse to the right edge of the node.");
                        } else {
                            temp_x = node.x + 20 - tempMod;
                            temp_y = node.y + 10;
                            temp_x2 = node.x + 17 - tempMod;
                            temp_y2 = node.y + 8;

                            node.rEdge = new Edge(this.ref, "edge" + j, node.x+3 + "%", node.y+1.5 + "%", temp_x2 + "%", temp_y2 + "%", "visible");
                            node.right = new Node(this.ref, val, temp_x, temp_y, i, level===1);

                            i++;
                            j++;
                            break;
                        }
                    } else {
                        break;
                    }
                    level++;
                }
            }
        }

        return root;
    }

    inorder(root) {
        var steps = []
        var messages = []
        var list = [];

        var pseudocodeArr = [];

        console.log("inordering");
        console.log(root);
        
        messages.push("<h1>Beginning at the Root</h1>");
        //messages.push("<h1>Beginning at the Root</h1>");
        steps.push(new EmptyStep());
        //steps.push(new EmptyStep());
        //console.log("Pushing first hightlight");
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));
        //pseudocodeArr.push(new HighlightLineStep(0,this.props.lines));

        [steps, messages, list, pseudocodeArr] = this.inorderRecursive(root, steps, messages, list, pseudocodeArr);
        //messages.push("Finished inorder! our final list is ", list);
        this.setState({steps: steps, messages: messages});

        console.log(pseudocodeArr);

        this.props.handleCodeStepsChange(pseudocodeArr);
    }

    inorderRecursive(root, steps, messages, list, pseudocodeArr) {
        var node = root;
        // messages.push("funco pop")

        messages.push("<h1>Checking if Node is Equal to Null</h1>");
        steps.push(new EmptyStep());
        //console.log("Pushing Line 1 highlight");
        pseudocodeArr.push(new HighlightLineStep(1, this.props.lines));

        if (node == null){
            messages.push("<h1>Returning</h1>");
            steps.push(new EmptyStep());
            //console.log("Pushing Line 2 highlight");
            pseudocodeArr.push(new HighlightLineStep(2, this.props.lines));
            return [steps, messages, list, pseudocodeArr];
        } 
        
        // # Push right and left children of the popped node
        // # to stack
        if (node.left != null) {
            messages.push(list.toString());
            steps.push(new HighlightNodeStep(node.left, node.lEdge));
            //console.log("Pushing Line 3 highlight");
            pseudocodeArr.push(new HighlightLineStep(3, this.props.lines));
            this.inorderRecursive(node.left, steps, messages, list, pseudocodeArr);
        }

        console.log(node.value);
        list.push(node.value);

        messages.push(list.toString());
        steps.push(new HighlightNodeStep(node, null));
        //console.log("Pushing Line 4 highlight");
        pseudocodeArr.push(new HighlightLineStep(4, this.props.lines));

        if (node.right != null) {
            messages.push(list.toString());
            steps.push(new HighlightNodeStep(node.right, node.rEdge));
            //console.log("Pushing Line 5 highlight");
            pseudocodeArr.push(new HighlightLineStep(5, this.props.lines));
            this.inorderRecursive(node.right, steps, messages, list, pseudocodeArr);
        }
        messages.push(list.toString());
        steps.push(new UnHighlightNodeStep(node, node.lEdge, node.rEdge));
        //console.log("Pushing Line 4 highlight");
        pseudocodeArr.push(new HighlightLineStep(4, this.props.lines));

        return [steps, messages, list, pseudocodeArr];
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
        console.log("BACKWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId - 1 < 0) return;

		var stepId = this.state.stepId - 1;

		this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg g"));
        this.props.codeSteps[this.state.stepId].forward();
		console.log(this.state.steps[stepId]);
		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Inorder Sort!</h1>" : "<h1>" + this.state.messages[this.state.stepId] + "</h1>";
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.props.waitTime);
    }

    forward(){		
		console.log("FORWARD CLICKED");

		if (this.state.running) return; // The user can't step forward while running via the play
										// button so as not to ruin the visualizer
		if (this.state.stepId === this.state.steps.length) return; // At the end of the step queue
		
		// Uses the step's fastForward function and displays associated message
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg g"));
        this.props.codeSteps[this.state.stepId].forward();
		document.getElementById("message").innerHTML = "<h1>" + this.state.messages[this.state.stepId] + "</h1>";

		this.setState({stepId: this.state.stepId + 1});

		d3.timeout(this.turnOffRunning, this.props.waitTime); // Calls function after wait time
    }

    run(){
		if (!this.state.running) return;
		if (this.state.stepId === this.state.steps.length) {
			this.setState({running: false});
			return;
		}
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg g"));
        this.props.codeSteps[this.state.stepId].forward();
		document.getElementById("message").innerHTML = "<h1>" +  this.state.messages[this.state.stepId] + "</h1>";
		this.setState({stepId: this.state.stepId + 1});
		d3.timeout(this.run, this.props.waitTime);
    }

    playinorder() {
        console.log("PLAY inorder CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
    }

    play() {
		console.log("PLAY CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
	}

    pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() {
		console.log("RESTART CLICKED");

		d3.select(this.ref.current).select("svg").remove();
        document.getElementById("message").innerHTML = "Welcome to Inorder Traversal!";

		this.setState({running: false, steps: [], messages: [], tree: [], maxLevel: -1, stepId: 0, root: null});
        i = 0;
        j = 0;

	}

    componentDidMount() {
        this.initialize();   
        var root = this.buildTree();
        this.inorder(root);
    }

    // Calls functions depending on the change in state
	componentDidUpdate(prevProps, prevState) {
        // console.log(this.state.root);
		// Part of restart -> Reinitialize with original array
        if (this.state.root !== prevState.root && this.state.root === null) {
			console.log("Steps changed");
			var svg = this.initialize();
            var root = this.buildTree();
            this.inorder(root);
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
                    {/* <button class="button" onClick={this.playinorder}>inorder</button> */}
                    <button class="button" onClick={this.pause}>Pause</button>
                    {/* <button class="button" onClick={this.add}>Add</button> */}
                    <button class="button" onClick={this.restart}>Restart</button>
                    <button class="button" onClick={this.backward}>Step Backward</button> 
                    <button class="button" onClick={this.forward}>Step Forward</button>
                    <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Inorder Traversal!</h1></span></div>
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
                <div class="parent-svg">
                    <div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"inorder"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
            </div>
        )
    }
}