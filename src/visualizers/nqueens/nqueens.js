import React from "react";
import * as d3 from "d3";
import "./nqueens.css";
import "../css/button.css";
import "../css/messages.css";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { Pseudocode } from "../../components/pseudocode/Pseudocode";
import { HighlightLineStep } from "../../components/pseudocode/Pseudocode";
import { color } from "d3";

class EmptyStep {
  forward() {}
  backward() {}
}

class VisibilityStep {
  constructor(rowID, colID, visibility, color) {
    this.rowID = rowID;
    this.colID = colID;
    this.visibility = visibility;
    this.color = color;
  }

  forward() {
    d3.select("#code"+ this.rowID + this.colID).attr("visibility", this.visibility);
    d3.select("#code"+ this.rowID + this.colID).attr("fill", this.color);
  }

  backward() {
    d3.select("#code"+ this.rowID + this.colID).attr("visibility", (this.visibility === "visible") ? "hidden" : "visible");
  }
}

class TileStep{
    constructor( rowID,colID,color){
    this.rowID = rowID;
    this.colID = colID;
    this.color = color;
  
  }

    forward(){ 
    
    d3.select("#code"+ this.rowID + this.colID).attr("fill",this.color);
  
  }

  backward(){
    d3.select("#code"+ this.rowID + this.colID).attr("fill", (this.color === localStorage.getItem('primaryColor')) ? localStorage.getItem('secondaryColor') : localStorage.getItem('primaryColor'));
  }
}



export default class Queens extends React.Component {

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
      waitTime: (9 * 2000) / 8,
      interval: null,
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

    let n = 4;

    const queen = {
      name: "Black Queen",    
      code: "\u265B",
    };

    const size = 100, matrix = size * n;

    console.log(matrix);

    const div = d3.select(this.ref.current);

    const svg = div.append("svg")
      .attr("width", matrix + "px")
      .attr("height",matrix + "px");

    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        const tile = svg.append("rect")
          .attr("x", i * size)
          .attr("y", j * size)
          .attr("width", size + "px")
          .attr("height",size + "px");

        if ((i+j)%2===0) {
          tile.attr("fill", localStorage.getItem('nodeColor'));
        }
        else {
          tile.attr("fill", localStorage.getItem('accentColor'));
        }

        const piece = svg.append("text")
          .style("font-size", size*(4/5)+"px")
          .attr("text-anchor","middle")
          .attr("x", i * size)
          .attr("y", j * size)
          .attr("dx", size / 2)
          .attr("dy", size * 4/5)
          // .style("fill", localStorage.getItem("secondaryColor"));


        piece.attr("id", "code" + j + i)
          .classed('team1', true)
          .text(queen.code)
          .attr("visibility", "hidden")
      }
    }
    this.setState({n : n});
  }

  nqueens(board, col, row, n) {
    var steps = [];
    var messages = [];

    var pseudocodeArr = [];
    var lines = this.props.lines;

    steps.push(new EmptyStep());
    messages.push("<h1>Beginning nQueens!</h1>");
    pseudocodeArr.push(new HighlightLineStep(0, lines));

    function solveNQ(board, col) {

      //var pseudocodeArr = [];

      steps.push(new EmptyStep());
      messages.push("<h1>solveNQ(board, col)</h1>");
      pseudocodeArr.push(new HighlightLineStep(1, lines));

      if(col >= n) {
        steps.push(new EmptyStep());
        messages.push("<h1>Checking if problem is solved.</h1>");
        pseudocodeArr.push(new HighlightLineStep(2, lines));

        steps.push(new EmptyStep());
        messages.push("<h1>nQueens solution found!</h1>");
        pseudocodeArr.push(new HighlightLineStep(3, lines));
        
        return true;
      }

      for(var i = 0; i < n; i++) {

        steps.push(new VisibilityStep(i, col, "visible", localStorage.getItem('secondaryColor')));
        messages.push("<h1>Queen: Row " + (i+1) + " Column "+ (col+1) + ".</h1>")
        pseudocodeArr.push(new HighlightLineStep(4, lines));

        //const [flag, pseudo] = queenSafe(board,i,col,n);

        if(queenSafe(board,i,col,n)) {
          //pseudocodeArr = [...pseudocodeArr, ...pseudo];

          steps.push(new EmptyStep());
          messages.push("<h1>Is the Queen currently safe?</h1>");
          pseudocodeArr.push(new HighlightLineStep(5, lines));
          board[i][col] = 1;

          //var solveRet = solveNQ(board, col+1, n);
          //var temp = solveRet[0];

          if(solveNQ(board, col+1, n)===true) {
            return true;
          }

          board[i][col] = 0;
        }

        if (i + 1 !== n) {
          steps.push(new EmptyStep());
          messages.push("<h1>Checking if next space is available.</h1>");
          pseudocodeArr.push(new HighlightLineStep(7, lines));

          steps.push(new VisibilityStep(i, col, "hidden", localStorage.getItem('secondaryColor')));
          messages.push("<h1>Moving to next available space.</h1>");
          pseudocodeArr.push(new HighlightLineStep(8, lines));
        }
        else {
          steps.push(new EmptyStep());
          messages.push("<h1>Checking if next space is available.</h1>");
          pseudocodeArr.push(new HighlightLineStep(9, lines));

          steps.push(new VisibilityStep(i, col, "hidden", localStorage.getItem('secondaryColor')));
          messages.push("<h1>Backtracking...</h1>");
          pseudocodeArr.push(new HighlightLineStep(10, lines));
        }
      }

      return false;
    }

    function queenSafe(board, row, col, n){
      //var pseudocodeArr = [];

      steps.push(new EmptyStep());
      messages.push("<h1>queenSafe(board, row, col, n)</h1>");
      pseudocodeArr.push(new HighlightLineStep(13, lines));

      var flag = true;
      var i , j;
      for( i= 0; i<col;i++) {

        steps.push(new EmptyStep());
        messages.push("<h1>Row " + row + ", Column " + i + "</h1>");
        pseudocodeArr.push(new HighlightLineStep(14, lines));

        if(board[row][i]===1) {
          steps.push(new EmptyStep());
          messages.push("<h1>Checking if board[row][i] is equal to 1.</h1>");
          pseudocodeArr.push(new HighlightLineStep(15, lines));
          steps.push(new TileStep(row,i,localStorage.getItem('primaryColor')));
          messages.push("<h1>Queen at (" + (row+1)+ " , "+ (i+1)+") is in range.</h1>");
          pseudocodeArr.push(new HighlightLineStep(16, lines));
          steps.push(new TileStep(row,i,localStorage.getItem('secondaryColor')));
          messages.push("<h1>Queen at (" + (row+1)+ " , "+ (i+1)+") is in range.</h1>");
          pseudocodeArr.push(new HighlightLineStep(17, lines));

          flag = false;
          //return flag;
        }
      }

      for( i = row, j = col; i>=0 &&j>=0; i--,j--) {

        steps.push(new EmptyStep());
        messages.push("<h1>Row " + i + ", Column " + j + "</h1>");
        pseudocodeArr.push(new HighlightLineStep(20, lines));

        if(board[i][j]===1) {
          steps.push(new EmptyStep());
          messages.push("<h1>Checking if board[i][j] is equal to 1.</h1>");
          pseudocodeArr.push(new HighlightLineStep(21, lines));
          steps.push(new TileStep(i,j,localStorage.getItem('primaryColor')));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          pseudocodeArr.push(new HighlightLineStep(22, lines));
          steps.push(new TileStep(i,j,localStorage.getItem('secondaryColor')));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          pseudocodeArr.push(new HighlightLineStep(23, lines));

          flag = false;
          //return flag;
        }
      }

      for( i = row, j = col; j>=0 && i < n; i++,j--){

        steps.push(new EmptyStep());
        messages.push("<h1>Row " + i + ", Column " + j + "</h1>");
        pseudocodeArr.push(new HighlightLineStep(26, lines));

        if(board[i][j]===1){

          steps.push(new EmptyStep());
          messages.push("<h1>Checking if board[i][j] is equal to 1.</h1>");
          pseudocodeArr.push(new HighlightLineStep(27, lines));

          steps.push(new TileStep(i,j,localStorage.getItem('primaryColor')));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          pseudocodeArr.push(new HighlightLineStep(28, lines));
          steps.push(new TileStep(i,j,localStorage.getItem('secondaryColor')));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          pseudocodeArr.push(new HighlightLineStep(29, lines));

          flag = false;
          //return flag;
        }
      }

      if(flag===false) return flag;

      steps.push(new EmptyStep());
      messages.push("<h1>No queens are in range.</h1>");
      pseudocodeArr.push(new HighlightLineStep(32, lines));

      return flag;
    }
  

    function NQ() {

      const board = new Array(n);
      var i;

      for( i = 0; i < n;i++) {
        board[i] = new Array(n);
      }

      for(i = 0;i<n;i++) {
        for(var j = 0;j<n;j++) {
          board[i][j] = 0;
        }
      }

      console.log(board);

      //var solveRet = solveNQ(board, 0);
      //pseudocodeArr = [...pseudocodeArr, ...solveNQ(board, 0)];

      //var temp = solveRet[0];

      if(solveNQ(board, 0)===false) {
        console.log("");
        return false;
      }
      /*if(solveNQ(board, 0)===false) {
        console.log("");
        return false;
      }*/

    }

    //pseudocodeArr = [...pseudocodeArr, ...NQ()];

    NQ();

    this.props.handleCodeStepsChange(pseudocodeArr);
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
    this.props.codeSteps[this.state.stepId].forward();

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
    this.props.codeSteps[this.state.stepId].forward();

    console.log(this.state.steps[stepId]);
    this.setState({stepId: stepId});
    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  run() {
    clearInterval(this.state.interval)
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      //this.setState({ running: false });
      this.running = false;
      return;
    }

    console.log(this.state.steps);
    console.log(this.props.codeSteps);
    console.log(this.state.stepId);
    this.props.codeSteps[this.state.stepId].forward();

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    this.state.steps[this.state.stepId].forward();
    
    this.setState({stepId: this.state.stepId + 1});
    //this.state.stepId = this.state.stepId + 1;
    // d3.timeout(this.run, this.props.waitTime);
    this.setState({interval: setInterval(this.run, this.props.waitTime)})

  }

  play() {
    console.log("PLAY CLICKED");

    if (this.state.running) return;

    this.setState({running: true});
    this.run();
  }

  pause() {
    console.log("PAUSE CLICKED");
    this.setState({running: false});
  }

  restart() {
    console.log("RESTART CLICKED");

    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId;

    document.getElementById("message").innerHTML = "<h1>Welcome to nQueens!</h1>";

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
      this.nqueens(this.state.board, this.state.col,this.state.row,this.state.n);
    }

    else if (this.state.running !== prevState.running) {
      this.run();
      console.log("We ran");
    }
  }

  componentWillUnmount() {
    console.log("component unmounted")
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <div>
        <div class="center-screen" id="banner">
          <button class="button" onClick={this.play}>Play</button>
          <button class="button" onClick={this.pause}>Pause</button>
          <button class="button" onClick={this.restart}>Restart</button>
          <button class="button" onClick={this.backward}>Step Backward</button>
          <button class="button" onClick={this.forward}>Step Forward</button>
          <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
        </div>
        <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to nQueens!</h1></span></div>
        <div ref={this.ref} class="center-screen"></div>
        <div class="parent-svg">
                    <div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"nqueens"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
                </div>
      </div>
    );
  }
}