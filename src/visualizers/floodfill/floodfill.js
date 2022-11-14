import React from "react";
import * as d3 from "d3";
import "./floodfill.css";
import "../css/button.css";
import "../css/messages.css";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { GRAY, GRAYBLACK, UCF_GOLD } from "../../assets/colors";


class EmptyStep {
  forward() {}
  backward() {}
}

class VisibilityStep {
  constructor(rowID, colID, visibility) {
    this.rowID = rowID;
    this.colID = colID;
    this.visibility = visibility;
  }

  forward() {
    d3.select("#code"+ this.rowID + this.colID).attr("visibility", this.visibility);
  }

  backward() {
    d3.select("#code"+ this.rowID + this.colID).attr("visibility", (this.visibility === "visible") ? "hidden" : "visible");
  }
}

class TileStep{
    constructor( colID, rowID, color){
    this.colID = colID;
    this.rowID = rowID;
    this.color = color;
  
  }

    forward(){ 
    
    d3.select("#code"+ this.rowID + this.colID).attr("fill", this.color);
  
  }

  backward(){
    d3.select("#code"+ this.rowID + this.colID).attr("fill", (this.color === "white") ? "black" : "white");
  }
}

class Tile{
    constructor(tileID, color){
        this.tileID = tileID;
        this.color = color;
    }
}

export default class Floodfill extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      n: 0,
      row: 0,
      col: 0,
      board: [],
      size: 10,
      steps: [],
      ids: [],
      messages: [],
      running: false,
      stepId: 0,
      stepTime: 300,
      waitTime: 1500
    };

    this.ref = React.createRef();
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.turnOffRunning = this.turnOffRunning.bind(this);
    this.run = this.run.bind(this);
  }

  initialize() {

    let n = 11;
    let ranNum = [];
    let ranNum2 = []
    let board = Array.from(Array(n), () => new Array(n))

    for(var i = 0; i < 12; i++){
      ranNum[i] = Math.floor(Math.random() * 9 + 1);
    }

    for(var j = 0; j < 12; j++){
      ranNum2[j] = Math.floor(Math.random() * 9 + 1);
    }

    console.log(ranNum)

    const megaTile = {
      name: "Mega Tile",    
      code: "\u265B",
    };

    const size = 25, matrix = size * n;

    console.log(matrix);

    const div = d3.select(this.ref.current);

    const svg = div.append("svg")
      .attr("width", matrix + "px")
      .attr("height",matrix + "px");

    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        const tile = svg.append("rect")
        .attr("id", i+j)
        .attr("x", i * size)
        .attr("y", j * size)
        .attr("width", size + "px")
        .attr("height", size + "px");

        // if(i==0 || i==Math.floor(n/2) || i==(n-1) ){
        //     tile.attr("fill", GRAYBLACK);
        //     board[i][j] = 'BLACKGRAY';
        // }
        if(i==0 || i==(n-1)){
          tile.attr("fill", GRAYBLACK);
          board[i][j] = 'BLACKGRAY';
        }
        else if(ranNum[j] == i || ranNum[i] == j){
          tile.attr("fill", GRAYBLACK);
          board[i][j] = 'BLACKGRAY';
        }
        // else if(j==0 || i==Math.floor(n/2) || j==(n-1)){
        //     tile.attr("fill", GRAYBLACK)
        //     board[i][j] = 'BLACKGRAY';
        // }
        else if(j==0 || j==(n-1)){
          tile.attr("fill", GRAYBLACK)
          board[i][j] = 'BLACKGRAY';
        }
        else {
            tile.attr("fill", UCF_GOLD);
            board[i][j] = 'UCFGOLD';
        }

        tile.attr("id", "code" + j + i)
        .classed('team1', true)
        .text(megaTile.code)

        // const piece = svg.append("text")
        //   .style("font-size", size*(4/5)+"px")
        //   .attr("text-anchor","middle")
        //   .attr("x", i * size)
        //   .attr("y", j * size)
        //   .attr("dx", size / 2)
        //   .attr("dy", size * 4/5);


        // piece.attr("id", "code" + j + i)
        //   .classed('team1', true)
        //   .text(queen.code)
        //   .attr("visibility", "hidden");
        
      }
    }

    this.setState({n : n, board: board});
  }

  floodfill(board, col, row, n) {
    var steps = [];
    var messages = [];
    // var arr = { ID:[], color:[]}
    col = Math.floor(Math.random() * 10);
    row = Math.floor(Math.random() * 10);

    while(board[col][row] == 'BLACKGRAY'){
      col = Math.floor(Math.random() * 10);
      row = Math.floor(Math.random() * 10);
    }

    console.log(board)
    steps.push(new EmptyStep());
    messages.push("<h1>Beginning Floodfill!</h1>");

    steps.push(new EmptyStep());
    messages.push("<h1>We have a board of " + n + "x" + n + "</h1>");

    steps.push(new EmptyStep());
    messages.push("<h1>We first select a random tile: (" + (col)+ " , "+ (row) + ")</h1>");

    // console.log("board: " + board + " col: " + col + " row: " + row + " n: " + n);

    floodFillUtil(board, col, row, n);

    // i = col, j = row
    function floodFillUtil(board, i, j, n){
        // Base cases
        if (i < 0 || i > n || j < 0 || j > n) return [steps, messages, board];
        if (board[i][j] != "UCFGOLD") return [steps, messages, board];

        //console.log(i + " " + j)
        steps.push(new TileStep(i, j, "white"));
        messages.push("<h1>MegaTile at (" + i + " , "+ j +") is in range.</h1>");

        board[i][j] = "white";

        [steps, messages, board] = floodFillUtil(board, i - 1, j, n);
        [steps, messages, board] = floodFillUtil(board, i + 1, j, n);
        [steps, messages, board] = floodFillUtil(board, i, j + 1, n);
        [steps, messages, board] = floodFillUtil(board, i, j - 1, n);

        return [steps, messages, board];
        
    }

    messages.push("<h1>All our tiles have been filled with the new color</h1>");
		steps.push(new EmptyStep());

    messages.push("<h1>All our tiles have been filled with the new color</h1>");
		steps.push(new EmptyStep());

    messages.push("<h1>Finished Floodfill!</h1>");
		steps.push(new EmptyStep());

    this.setState({steps: steps, messages: messages});
  }

  turnOffRunning() {
    this.setState({running: false});
  }

  forward() {
    console.log("FORWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId === this.state.steps.length) return;

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    this.state.steps[this.state.stepId].forward();

    console.log(this.state.steps[this.state.stepId]);
    this.setState({stepId: this.state.stepId + 1});
    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  backward() {
    console.log("BACKWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId - 1;
    document.getElementById("message").innerHTML = this.state.messages[stepId - 1];
    this.state.steps[stepId].backward();

    console.log(this.state.steps[stepId]);
    this.setState({stepId: stepId});
    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  run() {
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    this.state.steps[this.state.stepId].forward();

    this.setState({stepId: this.state.stepId + 1});
    d3.timeout(this.run, this.props.waitTime);
  }

  play() {
    console.log("PLAY CLICKED");

    if (this.state.running) return;

    this.setState({running: true});
    this.run();
    // this.floodfill(this.state.board, this.state.col,this.state.row,this.state.n);
  }

  pause() {
    console.log("PAUSE CLICKED");
    this.setState({running: false});
  }

  restart() {
    console.log("RESTART CLICKED");

    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId;

    document.getElementById("message").innerHTML = "<h1>Welcome to Floodfill!</h1>";

    while (stepId - 1 >= 0) {
      this.state.steps[--stepId].backward();
      d3.timeout(this.turnOffRunning, this.props.waitTime);
    }

    this.setState({running: false});
    this.setState({stepId: 0});
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.n !== prevState.n) {
      console.log("SIZE CHANGED");
      this.floodfill(this.state.board, this.state.col, this.state.row, this.state.n);
    }

    else if (this.state.running !== prevState.running) {
      this.run();
      console.log("We ran");
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <div class="center-screen" id="banner">
          <button class="button" onClick={this.play}>Play</button>
          <button class="button" onClick={this.pause}>Pause</button>
          {/* <button class="button" onClick={this.restart}>Restart</button> */}
          <button class="button" onClick={this.refreshPage}>Restart</button>
          <button class="button" onClick={this.backward}>Step Backward</button>
          <button class="button" onClick={this.forward}>Step Forward</button>
          <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
        </div>
        <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Floodfill!</h1></span></div>
        <div ref={this.ref} class="center-screen"></div>
      </div>
    );
  }
}