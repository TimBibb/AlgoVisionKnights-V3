import React from "react";
import * as d3 from "d3";
import "./nqueens.css";
import "../css/button.css";
import "../css/messages.css";


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
    constructor( rowID,colID,color){
    this.rowID = rowID;
    this.colID = colID;
    this.color = color;
  
  }

    forward(){ 
    
    d3.select("#code"+ this.rowID + this.colID).attr("fill",this.color);
  
  }

  backward(){
    d3.select("#code"+ this.rowID + this.colID).attr("fill", (this.color === "white") ? "black" : "white");
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
      waitTime: (9 * 2000) / 8
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
          tile.attr("fill", "#EF3F88");
        }
        else {
          tile.attr("fill", "#FFCE36");
        }

        const piece = svg.append("text")
          .style("font-size", size*(4/5)+"px")
          .attr("text-anchor","middle")
          .attr("x", i * size)
          .attr("y", j * size)
          .attr("dx", size / 2)
          .attr("dy", size * 4/5);


        piece.attr("id", "code" + j + i)
          .classed('team1', true)
          .text(queen.code)
          .attr("visibility", "hidden");
      }
    }
    this.setState({n : n});
  }

  nqueens(board, col, row, n) {
    var steps = [];
    var messages = [];

    steps.push(new EmptyStep());
    messages.push("<h1>Beginning nQueens!</h1>");

    function solveNQ(board, col) {
      if(col >= n) {
        steps.push(new EmptyStep());
        messages.push("<h1>nQueens solution found!</h1>");
        
        return true;
      }

      for(var i = 0; i < n; i++) {
        steps.push(new VisibilityStep(i, col, "visible"));
        messages.push("<h1>Queen: Row " + (i+1) + " Column "+ (col+1) + ".</h1>");

        if(queenSafe(board,i,col,n)) {
          board[i][col] = 1;

          if(solveNQ(board, col+1, n)===true) {
            return true;
          }

          board[i][col] = 0;
        }

        if (i + 1 !== n) {
          steps.push(new VisibilityStep(i, col, "hidden"));
          messages.push("<h1>Moving to next available space.</h1>");
        }
        else {
          steps.push(new VisibilityStep(i, col, "hidden"));
          messages.push("<h1>Backtracking...</h1>");
        }
      }

      return false;
    }

    function queenSafe(board, row, col, n){
      var flag = true;
      var i , j;
      for( i= 0; i<col;i++) {
        if(board[row][i]===1) {
          steps.push(new TileStep(row,i,"white"));
          messages.push("<h1>Queen at (" + (row+1)+ " , "+ (i+1)+") is in range.</h1>");
          steps.push(new TileStep(row,i,"black"));
          messages.push("<h1>Queen at (" + (row+1)+ " , "+ (i+1)+") is in range.</h1>");

          flag = false;
          //return false;
        }
      }

      for( i = row, j = col; i>=0 &&j>=0; i--,j--) {
        if(board[i][j]===1) {
          steps.push(new TileStep(i,j,"white"));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          steps.push(new TileStep(i,j,"black"));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          
          flag = false;
          //return false;
        }
      }

      for( i = row, j = col; j>=0 && i < n; i++,j--){
        if(board[i][j]===1){
          steps.push(new TileStep(i,j,"white"));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          steps.push(new TileStep(i,j,"black"));
          messages.push("<h1>Queen at (" + (i+1)+ " , "+ (j+1)+") is in range.</h1>");
          
          flag = false;
          //return false;
        }
      }

      if(flag===false) return flag;

      steps.push(new EmptyStep());
      messages.push("<h1>No queens are in range.</h1>");

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

      if(solveNQ(board, 0)===false) {
        console.log("");
        return false;
      }

        return true;
    }

    NQ();

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
    d3.timeout(this.turnOffRunning, this.state.waitTime);
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
    d3.timeout(this.turnOffRunning, this.state.waitTime);
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
    d3.timeout(this.run, this.state.waitTime);
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
      d3.timeout(this.turnOffRunning, this.state.waitTime);
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

  render() {
    return (
      <div>
        <div class="center-screen" id="banner">
          <button class="button" onClick={this.play}>Play</button>
          <button class="button" onClick={this.pause}>Pause</button>
          <button class="button" onClick={this.restart}>Restart</button>
          <button class="button" onClick={this.backward}>Step Backward</button>
          <button class="button" onClick={this.forward}>Step Forward</button>
        </div>
        <div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to nQueens!</h1></span></div>
        <div ref={this.ref} class="center-screen"></div>
      </div>
    );
  }
}