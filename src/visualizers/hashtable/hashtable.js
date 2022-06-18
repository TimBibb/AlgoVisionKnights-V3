import React from "react";
import * as d3 from "d3";
import "./hashtable.css";
import "../css/button.css";
import "../css/messages.css";

// returns a random number in the range [lo, hi)
function randInRange(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

class EmptyStep {
  forward(svg) {}
  fastForward(svg) {}
  backward(svg) {}
}

class ChangeTextStep {
  constructor(id, newText, oldText) {
    this.id = id;
    this.newText = newText;
    this.oldText = oldText;
  }
  forward(svg) {
    svg.select(`#${this.id}`).text(this.newText);
  }
  fastForward(svg) {
    svg.select(`#${this.id}`).text(this.newText);
  }
  backward(svg) {
    svg.select(`#${this.id}`).text(this.oldText);
  }
}

class ChangeEntryColorStep {
  constructor(id, newColor, oldColor) {
    this.id = id;
    this.newColor = newColor;
    this.oldColor = oldColor;
  }
  forward(svg) {
    svg.select(`#${this.id}`).style("fill", this.newColor);
  }
  fastForward(svg) {
    svg.select(`#${this.id}`).style("fill", this.newColor);
  }
  backward(svg) {
    svg.select(`#${this.id}`).style("fill", this.oldColor);
  }
}

class SetVisibilityStep {
  constructor(id, newVisibility, oldVisibility) {
    this.id = id;
    this.newVisibility = newVisibility;
    this.oldVisibility = oldVisibility;
  }
  forward(svg) {
    svg.select(`#${this.id}`).attr("visibility", this.newVisibility);
  }
  fastForward(svg) {
    svg.select(`#${this.id}`).attr("visibility", this.newVisibility);
  }
  backward(svg) {
    svg.select(`#${this.id}`).attr("visibility", this.oldVisibility);
  }
}

class ChangeTextPositionStep {
  constructor(id, newPos, oldPos) {
    this.id = id;
    this.newPos = newPos;
    this.oldPos = oldPos;
  }
  forward(svg) {
    svg.select(`#${this.id}`).attr("x", this.newPos.x).attr("y", this.newPos.y);
  }
  fastForward(svg) {
    svg.select(`#${this.id}`).attr("x", this.newPos.x).attr("y", this.newPos.y);
  }
  backward(svg) {
    svg.select(`#${this.id}`).attr("x", this.oldPos.x).attr("y", this.oldPos.y);
  }
}

export default class HashTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rendered: false,
    };

    this.stepId = 0;
    this.running = false;
    this.info = {};
    this.messages = [];
    this.currentMessage = "";
    this.steps = [];
    this.stepBuffer = [];
    this.stepTime = 400;
    this.waitTime = 4000;

    this.ref = React.createRef();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.turnOffRunning = this.turnOffRunning.bind(this);
    this.run = this.run.bind(this);

    // this.isRunningCheck = this.isRunningCheck.bind(this);
    // this.handleInsertion = this.handleInsertion.bind(this);
    // this.handleDeletion = this.handleDeletion.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);
  }

  initialize() {
    let tableLen = 11;

    let info = {
      tableLen: tableLen,
      operation: "",
      evaluation: "",
      arrowPos: {},
      allArrowPos: [],
      table: [],
      tableText: [],
      deleted: [],
      size: 0,
    };

    let svg = d3
      .select(this.ref.current)
      .append("svg")
      .attr("width", "1500px")
      .attr("height", "650px");

    let left = 400;
    let line = 1200;

    let operation = svg
      .append("text")
      .attr("x", 1500 - line + "px")
      .attr("y", "100px")
      .attr("id", "Operation")
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "50px")
      .attr("font-weight", "bold")
      .style("fill", "white")
      .text("");

    let hashFunction = svg
      .append("text")
      .attr("x", 1500 - line + "px")
      .attr("y", "300px")
      .attr("id", "Function")
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "50px")
      .attr("font-weight", "bold")
      .style("fill", "white")
      .text("h(x) = x % [length of table]");

    let hashEvaluation = svg
      .append("text")
      .attr("x", 1500 - line + "px")
      .attr("y", "400px")
      .attr("id", "Evaluation")
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "50px")
      .attr("font-weight", "bold")
      .style("fill", "white")
      .text("");

    svg
      .append("line")
      .attr("x1", line + "px")
      .attr("y1", "0px")
      .attr("x2", line + "px")
      .attr("y2", "600px")
      .attr("stroke", "white");

    let allArrowPos = [];

    for (let i = 0; i < tableLen + 1; i++) {
      let height = 550;
      let segSize = height / tableLen;

      svg
        .append("line")
        .attr("x1", line - 25 + "px")
        .attr("y1", 50 + i * (height / tableLen) + "px")
        .attr("x2", line + 25 + "px")
        .attr("y2", 50 + i * (height / tableLen) + "px")
        .attr("stroke", "white");

      if (i < tableLen) {
        info.table.push(null);
        info.deleted.push(false);
        info.tableText.push("-");

        svg
          .append("g")
          .attr("id", "Entry" + i)
          .style("fill", "white");

        svg
          .select("#Entry" + i)
          .append("text")
          .attr("id", "Value" + i)
          .attr("x", line + 10 + "px")
          .attr("y", segSize / 2 + 50 + i * (height / tableLen) + "px")
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "middle")
          .attr("font-size", "30px")
          .text("-");

        svg
          .select("#Entry" + i)
          .append("text")
          .attr("id", "Index" + i)
          .attr("x", line - 10 + "px")
          .attr("y", segSize / 2 + 50 + i * (height / tableLen) + "px")
          .attr("text-anchor", "end")
          .attr("dominant-baseline", "middle")
          .attr("font-size", "30px")
          .text(i);

        allArrowPos.push({
          x: line - 50 + "px",
          y: segSize / 2 + 50 + i * (height / tableLen) + "px",
        });
      }
    }

    svg
      .append("text")
      .attr("x", "1190px")
      .attr("y", "25px")
      .attr("id", "IndexLabel")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "30px")
      .attr("font-weight", "bold")
      .attr("visibility", "visible")
      .style("fill", "white")
      .text("Index");

    svg
      .append("text")
      .attr("x", "1210px")
      .attr("y", "25px")
      .attr("id", "ValueLabel")
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "30px")
      .attr("font-weight", "bold")
      .attr("visibility", "visible")
      .style("fill", "white")
      .text("Value");

    let arrow = svg
      .append("text")
      .attr("x", allArrowPos[0].x)
      .attr("y", allArrowPos[0].y)
      .attr("id", "Arrow")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "50px")
      .attr("font-weight", "bold")
      .attr("visibility", "visible")
      .style("fill", "white")
      .text("→");

    info.arrowPos = allArrowPos[0];
    info.allArrowPos = allArrowPos;

    this.info = info;

    this.setState({ rendered: true });
  }

  createMessage(msg) {
    this.currentMessage = "<h1>" + msg + "</h1>";
  }

  flushBuffer() {
    if (this.stepBuffer.length === 0) return;
    this.steps.push(this.stepBuffer);
    this.stepBuffer = [];
    this.messages.push(this.currentMessage);
  }

  addStep(step) {
    this.stepBuffer.push(step);
  }

  insertion(x) {
    console.log("made it to insertion");
    if (this.info.size === this.info.tableLen) {
      this.createMessage(`The hash table is currently full.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      return;
    }

    console.log("made it past size check");

    let hash = x % this.info.tableLen;
    let firstDeleted = -1;

    if (hash < 0) hash += this.info.tableLen;

    let newOperation = `Insert: ${x}`;
    this.createMessage(`We will now insert ${x} into the hash table.`);
    this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
    this.addStep(new ChangeTextStep(`Evaluation`, "", this.info.evaluation));
    this.flushBuffer();
    this.info.operation = newOperation;

    let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
    this.createMessage(`Using the hash function we get that the hash of ${x} is ${hash}.`);
    this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, ""));
    this.flushBuffer();
    this.info.evaluation = newEvaluation;

    this.info.size = this.info.size + 1;

    this.createMessage(
      `Start at the hash, being ${hash}, and iterate linearly until we can insert ${x}.`
    );
    this.addStep(new EmptyStep());
    this.flushBuffer();

    for (let i = 0; i < this.info.tableLen; i++) {
      let index = (hash + i) % this.info.tableLen;

      let newArrowPos = {
        x: this.info.allArrowPos[index].x,
        y: this.info.allArrowPos[index].y,
      };

      this.createMessage(`Check the index ${index}.`);
      this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
      this.flushBuffer();
      this.info.arrowPos = newArrowPos;

      if (this.info.deleted[index] && firstDeleted === -1) {
        this.createMessage(
          `Remember that the first deleted element we've found is at index ${index}.`
        );
        this.addStep(new EmptyStep());
        this.flushBuffer();

        firstDeleted = index;
        continue;
      }

      if (this.info.table[index] === x) {
        this.createMessage(`Since ${x} already exists, we will not reinsert it.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        return;
      }

      if (this.info.table[index] === null) {
        if (firstDeleted === -1) {
          let newText = `${x}`;

          this.createMessage(
            `We found no already deleted entries, so we will place ${x} at this index.`
          );
          this.addStep(new ChangeTextStep(`Value${index}`, newText, this.info.tableText[index]));
          this.flushBuffer();

          this.info.table[index] = x;
          this.info.tableText[index] = newText;
          this.info.deleted[index] = false;
          return;
        } else {
          break;
        }
      }

      if (this.info.deleted[index]) {
        this.createMessage(`The value at index ${index} is deleted, move to the next one.`);
      } else {
        this.createMessage(`There is already a value at index ${index}, move to the next one.`);
      }

      this.addStep(new EmptyStep());
      this.flushBuffer();
    }

    this.createMessage(`Although this entry is empty, we already found a deleted entry.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();

    this.createMessage(`Replace the first deleted entry we found.`);
    this.addStep(
      new ChangeTextPositionStep(`Arrow`, this.info.allArrowPos[firstDeleted], this.info.arrowPos)
    );
    this.addStep(new ChangeEntryColorStep(`Entry${firstDeleted}`, `white`, `#444444`));
    this.flushBuffer();

    let newText = `${x}`;

    this.info.table[firstDeleted] = x;
    this.info.tableText[firstDeleted] = newText;
    this.info.deleted[firstDeleted] = false;

    this.info.arrowPos = this.info.allArrowPos[firstDeleted];

    this.setState({ messages: this.messages, steps: this.steps });
  }

  deletion(x) {
    if (this.info.size === 0) {
      this.createMessage(`There are no entries, so there is nothing to remove.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      return;
    }

    let hash = x % this.info.tableLen;

    if (hash < 0) hash += this.info.tableLen;

    let newOperation = `Delete: ${x}`;
    let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
    this.createMessage(`We will now delete ${x} from the hash table.`);
    this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
    this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, this.info.evaluation));
    this.flushBuffer();
    this.info.operation = newOperation;
    this.info.evaluation = newEvaluation;

    this.info.size = this.info.size - 1;

    for (let i = 0; i < this.info.tableLen; i++) {
      let index = (hash + i) % this.info.tableLen;

      let newArrowPos = {
        x: this.info.allArrowPos[index].x,
        y: this.info.allArrowPos[index].y,
      };

      this.createMessage(`Check the index ${index}.`);
      this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
      this.flushBuffer();
      this.info.arrowPos = newArrowPos;

      if (this.info.deleted[index]) {
        this.createMessage(`This value has already been deleted, so ignore it and continue.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();

        continue;
      }

      if (this.info.table[index] === x) {
        this.createMessage(`We have found ${x}! Mark it as deleted.`);
        this.addStep(new ChangeEntryColorStep(`Entry${index}`, `#444444`, `white`));
        this.flushBuffer();

        this.info.deleted[index] = true;

        return;
      }

      if (this.info.table[index] == null) break;

      this.createMessage(`The value at index ${index} does not match, continue.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
    }

    this.createMessage(`No entry matching ${x} was found. There is nothing to delete.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();

    this.setState({ message: this.messages, steps: this.steps });
  }

  search(x) {
    let hash = x % this.info.tableLen;

    if (hash < 0) hash += this.info.tableLen;

    let newOperation = `Search: ${x}`;
    let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
    this.createMessage(`We will now search for ${x} in the hash table.`);
    this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
    this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, this.info.evaluation));
    this.flushBuffer();
    this.info.operation = newOperation;
    this.info.evaluation = newEvaluation;

    for (let i = 0; i < this.info.tableLen; i++) {
      let index = (hash + i) % this.info.tableLen;

      let newArrowPos = this.info.allArrowPos[index];

      this.createMessage(`Check the index ${index}.`);
      this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
      this.flushBuffer();
      this.info.arrowPos = newArrowPos;

      if (this.info.deleted[index]) {
        this.createMessage(`This value has been deleted, so ignore it and continue.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();

        continue;
      }

      if (this.info.table[index] === x) {
        this.createMessage(`We have found ${x}!`);
        this.addStep(new EmptyStep());
        this.flushBuffer();

        return;
      }

      if (this.info.table[index] === null) break;

      this.createMessage(`The value at index ${index} does not match, continue.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
    }

    this.createMessage(`No entry matching ${x} was found.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();

    this.setState({ message: this.messages, steps: this.steps });
  }

  hashTable() {
    let map = [];
    for (let i = 0; i < 55; i++) map.push(i);

    for (let i = 0; i < 1000; i++) {
      let x = randInRange(0, map.length);
      let y = randInRange(0, map.length);
      [map[x], map[y]] = [map[y], map[x]];
    }

    let instructions = [
      [0, "INSERT"],
      [1, "INSERT"],
      [2, "INSERT"],
      [3, "INSERT"],
      [2, "DELETE"],
      [4, "INSERT"],
      [3, "SEARCH"],
      [5, "INSERT"],
      [1, "DELETE"],
      [1, "SEARCH"],
      [4, "INSERT"],
      [6, "DELETE"],
      [7, "DELETE"],
      [8, "INSERT"],
      [0, "SEARCH"],
    ];

    for (let i = 0; i < instructions.length; i++) {
      let [index, ins] = instructions[i];
      let value = map[index];

      if (ins === "INSERT") {
        this.insertion(value);
      }
      if (ins === "DELETE") {
        this.deletion(value);
      }
      if (ins === "SEARCH") {
        this.search(value);
      }
    }

    this.createMessage(`Finished with Hash Table example!`);
    this.addStep(new EmptyStep());
    this.flushBuffer();

    this.setState({ message: this.messages, steps: this.steps });    
  }

  turnOffRunning() {
    this.running = true;
  }

  forward() {
    if (this.running) return;
    if (this.stepId === this.steps.length) return;
    this.running = true;

    let svg = d3.select(this.ref.current).select("svg");

    document.getElementById("message").innerHTML = this.messages[this.stepId];

    for (const step of this.steps[this.stepId]) step.fastForward(svg);

    this.stepId = this.stepId + 1;

    this.running = false;
  }

  backward() {
    if (this.running) return;
    if (this.stepId - 1 < 0) return;
    this.running = true;

    let svg = d3.select(this.ref.current).select("svg");
    let stepId = this.stepId - 1;

    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Hash Table!</h1>" : this.messages[stepId - 1];

    for (const step of this.steps[stepId]) step.backward(svg);

    this.stepId = stepId;

    this.running = false;
  }

  run() {
    if (!this.running) return;
    if (this.stepId === this.steps.length) {
      this.running = false;
      return;
    }

    let svg = d3.select(this.ref.current).select("svg");

    document.getElementById("message").innerHTML = this.messages[this.stepId];
    for (const step of this.steps[this.stepId]) step.forward(svg);

    this.stepId = this.stepId + 1;
    d3.timeout(this.run, this.waitTime);
  }

  play() {
    if (this.running) return;
    this.running = true;
    this.run();
    console.log("PLAY CLICKED");
  }

  pause() {
    this.running = false;
    console.log("PAUSE CLICKED");
  }

  restart() {
    if (this.running) return;
    if (this.stepId - 1 < 0) return;
    this.running = true;

    let svg = d3.select(this.ref.current).select("svg");

    document.getElementById("message").innerHTML = this.messages[0];
    while (this.stepId - 1 >= 0) {
      for (const step of this.steps[this.stepId - 1]) step.backward(svg);
      this.stepId = this.stepId - 1;
    }

    this.running = false;
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.size !== prevState.size) {
      console.log("SIZE CHANGED");
      this.initialize();
    } else if (this.state.rendered !== prevState.rendered) {
      this.hashTable();
      console.log("steps created");
    }
  }

  fastForward() {
    if (this.running) return;
    if (this.stepId === this.steps.length) return;
    this.running = true;

    let svg = d3.select(this.ref.current).select("svg");

    while (this.stepId < this.steps.length) {
      for (const step of this.steps[this.stepId]) step.fastForward(svg);
      this.stepId = this.stepId + 1;
    }

    this.running = false;
  }

  // isRunningCheck(id) {
  //   if (this.running) {
  //     d3.select(id).property("value", "Error: Visualizer Running");
  //     return true;
  //   }

  //   return false;
  // }

  // handleInsertion() {
  //   let x = d3.select("#insertionValue").property("value");
  //   console.log(`Called insertion(${x})`);
  //   console.log(`Rendered: ${this.state.rendered}`);

  //   let isRunning = this.isRunningCheck("#insertionValue");
  //   if (isRunning) return;
  //   this.fastForward();

  //   this.insertion(parseInt(x));
  //   this.play();
  // }

  // handleDeletion() {
  //   let x = d3.select("#deletionValue").property("value");
  //   console.log(`Called deletion(${x})`);

  //   let isRunning = this.isRunningCheck("#deletionValue");
  //   if (isRunning) return;
  //   this.fastForward();

  //   this.deletion(x);
  //   this.play();
  // }

  // handleSearch() {
  //   let x = d3.select("#searchValue").property("value");
  //   console.log(`Called search(${x})`);

  //   let isRunning = this.isRunningCheck("#searchValue");
  //   if (isRunning) return;
  //   this.fastForward();

  //   this.search(x);
  //   this.play();
  // }

  render() {
    return (
      <div>
        <div class="center-screen">
          {/* <div id="insertion" class="center-screen">
            <label>Value to insert:</label>
            <input type="number" id="insertionValue"></input>
            <button onClick={this.handleInsertion}>Insert</button>
          </div>

          <div id="deletion" class="center-screen">
            <label>Value to delete:</label>
            <input type="number" id="deletionValue"></input>
            <button onClick={this.handleDeletion}>Delete</button>
          </div>

          <div id="search" class="center-screen">
            <label>Value to search:</label>
            <input type="number" id="searchValue"></input>
            <button onClick={this.handleSearch}>Search</button>
          </div> */}

          <button class="button" onClick={this.play}>Play</button>
          <button class="button" onClick={this.pause}>Pause</button>
          <button class="button" onClick={this.restart}>Restart</button>
          <button class="button" onClick={this.backward}>Step Backward</button>
          <button class="button" onClick={this.forward}>Step Forward</button>
        </div>
        <div class="center-screen">
          <span id="message">
            <h1>Welcome to Hash Table!</h1>
          </span>
        </div>
        <div ref={this.ref} class="center-screen"></div>
      </div>
    );
  }
}
