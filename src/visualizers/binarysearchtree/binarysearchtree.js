import React from "react";
import "./binarysearchtree.css";
import * as d3 from "d3";
import createDefaultTree from "../../foundation/tree/CreateDefaultTree";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";

function randInRange(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
  }
  
class EmptyStep {
    forward() {}
    backward() {}
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
    
        let isWeighted = false;
        let isDirected = false;
    
        let tree = createDefaultTree(this.ref);
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
                    <button class="button" onClick={this.pause}>Pause</button>
                    <button class="button" onClick={this.add}>ADD</button>
                    <button class="button" onClick={this.restart}>Restart</button>
                    <button class="button" onClick={this.backward}>Step Backward</button> 
                    <button class="button" onClick={this.forward}>Step Forward</button>
                </div>
                <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Binary Search Tree!</h1></span></div>
                <div ref={this.ref} class="center-screen"></div>
            </div>
        )
    }
}