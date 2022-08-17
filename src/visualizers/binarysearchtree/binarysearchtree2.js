import React from "react";
import "./binarysearchtree.css";
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";

var width = 600;
var height = 600;
var margin = { top: 150, bottom: 20, left: 40, right: 20 };

class Node {
    constructor(value, left = null, right = null,visited=true) {
      this.left = left;
      this.right = right;
      this.value = value;
      this.visited = visited;
    }
}

class Tree {
    constructor() {
      this.root = null;
    }
    toObject() {
      return this.root;
    }
  
    add(num) {
      if (!this.root) {
        this.root = new Node(num);
      } else {
        let node = this.root;
        
        this.clearVisited()
  
        while (true) {
          node.visited = true
          if (num < node.value) {
            if (node.left) {
              node = node.left;
            } else {
              node.left = new Node(num);
              return;
            }
          } else {
            if (node.right) {
              node = node.right;
            } else {
              node.right = new Node(num);
              return;
            }
          }
        }
      }
    }
    
    clearVisited() {
      
      preorderTraverse_clear(this.root,[])
      
    }
    
}
const preorderTraverse_clear = (node, array) => {
    if (!node) return array;
  
    node.visited = false
  
    array = preorderTraverse_clear(node.left, array);
    array = preorderTraverse_clear(node.right, array);
    return array;
};
const preorderTraverse = (node, array, y, x, sign) => {
    if (!node) return array;
  
    if (y === 0) {
      array.push({ value: node.value, y: 0, x: 0 ,visited:node.visited});
    } else {
      x = x + (sign * 2) / Math.pow(2, y);
      array.push({ value: node.value, y: y, x: x, visited:node.visited });
    }
    y = y + 1;
  
    array = preorderTraverse(node.left, array, y, x, -1);
    array = preorderTraverse(node.right, array, y, x, 1);
    return array;
  };
  
  const preorderTraverse_link = (node, linkarray, y, x, sign) => {
    if (!node) return linkarray;
    var prev_x = x;
    var prev_y = y - 1;
  
    if (y === 0) {
    } else {
      x = x + (sign * 2) / Math.pow(2, y);
      linkarray.push({ source: [prev_x, prev_y], target: [x, y] });
    }
    y = y + 1;
  
    linkarray = preorderTraverse_link(node.left, linkarray, y, x, -1);
    linkarray = preorderTraverse_link(node.right, linkarray, y, x, 1);
    return linkarray;
  };
  
  var topMargin = 50;
  
  const convertToXY = (item) => {
    var node = {};
    node.value = item.value;
    node.y = item.y * 50 + topMargin;
    node.x = item.x * 200 + 400;
    node.visited = item.visited;
    return node;
  };
  
  const convertLinkToXY = (item) => {
    var node = { source: [], target: [] };
    node.source[0] = item.source[0] * 200 + 400;
    node.source[1] = item.source[1] * 50 + topMargin;
    node.target[0] = item.target[0] * 200 + 400;
    node.target[1] = item.target[1] * 50 + topMargin;
    return node;
  };

export default class binarysearchtree extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
			// arr: [], // Elements to be sorted
			// size: 10, // Number of elements to be in the array
			// steps: [], // Step queue that will be used for making changes to the visualizer
			// ids: [], // IDs of the group elements
			// messages: [], // Message queue for the messages that will appear at the top
			running: false, // "Running" aka autoplay of going through the step and message queues
							// via the Play button
			// stepId: 0, // ID of the current step
			// stepTime: 5000, // Milliseconds for transition durations aka duration of each animation
			// waitTime: 5000, // Milliseconds between each step
		};
        
		// Bindings
		this.ref = React.createRef(); // Where the visualizer will be
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
        this.add = this.addNew.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
	}

    initialize(){
        let tree = new Tree();
        tree.add(40);

        var treeArray = preorderTraverse(tree.root, [], 0, 0, 1);
        treeArray = treeArray.map(convertToXY);

        var svg = d3.select("body").append("svg");

        var link_sel = svg.append("g")    
        var node_sel = svg.append("g")

        var keyFunc = function(d, i) { return d.value }
    
        var visitedFunc = function(d,i) {return d.visited}

        var nodes = node_sel
                    .selectAll("g")
                    .data(treeArray)
                    .enter()
                    // Add one g element for each data node here.
                    .append("g")
                    // Position the g element like the circle element used to be.
    			    .attr("transform",d => "translate(" + d.x + "," + d.y + ")");


        nodes.append("circle")
			.attr("fill" , "white")
			.attr("stroke" , "black")
            .attr("r", 20);

        // Add a text element to the previously added g element.
        nodes.append("text")
            .attr("text-anchor", "middle")
		    .attr("y", ".3em")
            .text(d => d.value);    

        var linkGen = d3.linkVertical();
        var prevLink=[]
    }
    
    play(){
        console.log("PLAY CLICKED");
        // if(this.state.running) return;

        // this.setState({running: true});
        // document.getElementById("message").innerHTML = "<h1>It works!</h1>";
        // this.run();
    }

    pause(){
        console.log("PAUSE CLICKED");
    }

    addNew(){
        console.log("ADD CLICKED");
    }

    restart(){
        console.log("RESTART CLICKED");
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
                    <button class="button" onClick={this.play}>Play</button>
                    {/* <button class="button" onClick={this.pause}>Pause</button> */}
                    <button class="button" onClick={this.addNew}>ADD</button>
                    <button class="button" onClick={this.restart}>Restart</button>
                    {/* <button class="button" onClick={this.backward}>Step Backward</button>  */}
                    {/* <button class="button" onClick={this.forward}>Step Forward</button> */}
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Binary Search Tree!</h1></span></div>
                <div ref={this.ref} class="center-screen"></div>
            </div>
        )
    }
}