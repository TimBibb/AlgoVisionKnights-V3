import React from "react";
import * as d3 from "d3";
import "./hashtablequadratic.css";
import "../css/button.css";
import "../css/messages.css";
import "../css/input.css";
import "../css/button.css";
import { Pseudocode } from "../../components/pseudocode/Pseudocode";
import { HighlightLineStep } from "../../components/pseudocode/Pseudocode";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";

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
      interval: null,
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
      .attr("width", "100%")
      .attr("height", "650px");

      svg.attr("perserveAspectRatio", "xMinYMid")
      svg.attr("viewBox", "0 0 " + 1500 + " " + (650))

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
      .style("fill", localStorage.getItem('primaryColor'))
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
      .style("fill", localStorage.getItem('primaryColor'))
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
      .style("fill", localStorage.getItem('primaryColor'))
      .text("");

    svg
      .append("line")
      .attr("x1", line + "px")
      .attr("y1", "0px")
      .attr("x2", line + "px")
      .attr("y2", "600px")
      .attr("stroke", localStorage.getItem('primaryColor'));

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
        .attr("stroke", localStorage.getItem('primaryColor'));

      if (i < tableLen) {
        info.table.push(null);
        info.deleted.push(false);
        info.tableText.push("-");

        svg
          .append("g")
          .attr("id", "Entry" + i)
          .style("fill", localStorage.getItem('primaryColor'));

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
      .style("fill", localStorage.getItem('primaryColor'))
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
      .style("fill", localStorage.getItem('primaryColor'))
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
      .style("fill", localStorage.getItem('primaryColor'))
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

  /*addHighlight(highlight){
    this.stepBuffer.push(highlight);
  }*/

  insertion(x) {
    var pseudocodeArr = [];

    this.createMessage(`Beginning the insertion process!`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

    console.log("made it to insertion");

    this.createMessage(`Checking if the hash table is already full.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(1, this.props.lines));

    if (this.info.size === this.info.tableLen) {
      this.createMessage(`The hash table is currently full.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(2, this.props.lines));
      return pseudocodeArr;
    }

    console.log("made it past size check");

    this.createMessage(`Calculating hash value.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(4, this.props.lines));

    let hash = x % this.info.tableLen;
    let firstDeleted = -1;

    this.createMessage(`Is the hash value less than 0?`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(5, this.props.lines));

    if (hash < 0) {
      this.createMessage(`Current hash value is less than 0`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(6, this.props.lines));

      hash += this.info.tableLen;
    }

    let newOperation = `Insert: ${x}`;
    this.createMessage(`We will now insert ${x} into the hash table.`);
    this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
    this.addStep(new ChangeTextStep(`Evaluation`, "", this.info.evaluation));
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(8, this.props.lines));
    this.info.operation = newOperation;

    let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
    this.createMessage(`Using the hash function we get that the hash of ${x} is ${hash}.`);
    this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, ""));
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(8, this.props.lines));
    this.info.evaluation = newEvaluation;

    this.info.size = this.info.size + 1;

    this.createMessage(
      `Start at the hash, being ${hash}, and iterate linearly until we can insert ${x}.`
    );
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(8, this.props.lines));

    for (let i = 0; i < this.info.tableLen; i++) {
        this.createMessage(`Insertion iteration ${(i+1)}.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(8, this.props.lines));

        this.createMessage(`Setting index.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(10, this.props.lines));

        let temp_i = i * i;
        let index = (hash + temp_i) % this.info.tableLen;

        let newArrowPos = {
            x: this.info.allArrowPos[index].x,
            y: this.info.allArrowPos[index].y,
        };

        this.createMessage(`Check the index ${index}.`);
        this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(11, this.props.lines));
        this.info.arrowPos = newArrowPos;

        if (this.info.deleted[index] && firstDeleted === -1) {
            this.createMessage(
            `Remember that the first deleted element we've found is at index ${index}.`
            );
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(12, this.props.lines));

            firstDeleted = index;

            this.createMessage(
              `Remember that the first deleted element we've found is at index ${index}.`
            );
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(13, this.props.lines));
            
            continue;
        }

        this.createMessage(`What value is at the current index?`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(15, this.props.lines));

        if (this.info.table[index] === x) {
            this.createMessage(`Since ${x} already exists, we will not reinsert it.`);
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(16, this.props.lines));
            return pseudocodeArr;
        }

        if (this.info.table[index] === null) {

          this.createMessage(`The current index is empty.`);
          this.addStep(new EmptyStep());
          this.flushBuffer();
          pseudocodeArr.push(new HighlightLineStep(18, this.props.lines));

          if (firstDeleted === -1) {
            let newText = `${x}`;

            this.createMessage(
                `We found no already deleted entries, so we will place ${x} at this index.`
            );
            this.addStep(new ChangeTextStep(`Value${index}`, newText, this.info.tableText[index]));
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(19, this.props.lines));

            this.createMessage(
              `We found no already deleted entries, so we will place ${x} at this index.`
            );
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(20, this.props.lines));

            this.info.table[index] = x;
            this.info.tableText[index] = newText;
            this.info.deleted[index] = false;
            return pseudocodeArr;
            } else {
            break;
          }
        }

        this.createMessage(`Has the value at the current index been deleted?`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(26, this.props.lines));

        if (this.info.deleted[index]) {
            this.createMessage(`The value at index ${index} is deleted, move to the next one.`);
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(27, this.props.lines));
        } else {
            this.createMessage(`There is already a value at index ${index}, move to the next one.`); 
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(29, this.props.lines));

            this.createMessage(`There is already a value at index ${index}, move to the next one.`); 
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(30, this.props.lines));
          }

        this.createMessage(`Insertion complete.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));
        }

    this.createMessage(`Although this entry is empty, we already found a deleted entry.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

    this.createMessage(`Replace the first deleted entry we found.`);
    this.addStep(
      new ChangeTextPositionStep(`Arrow`, this.info.allArrowPos[firstDeleted], this.info.arrowPos)
    );
    this.addStep(new ChangeEntryColorStep(`Entry${firstDeleted}`, localStorage.getItem('primaryColor'), localStorage.getItem('secondaryColor')));
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

    let newText = `${x}`;

    this.info.table[firstDeleted] = x;
    this.info.tableText[firstDeleted] = newText;
    this.info.deleted[firstDeleted] = false;

    this.info.arrowPos = this.info.allArrowPos[firstDeleted];

    this.setState({ messages: this.messages, steps: this.steps });

    return pseudocodeArr;
  }

  deletion(x) {
    var pseudocodeArr = [];

    this.createMessage(`Beginning the deletion process!`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(34, this.props.lines));

    this.createMessage(`Checking if the hash table is empty.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(35, this.props.lines));

    if (this.info.size === 0) {
      this.createMessage(`There are no entries, so there is nothing to remove.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(36, this.props.lines));
      return pseudocodeArr;
    }

    this.createMessage(`Calculating hash value.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(38, this.props.lines));

    let hash = x % this.info.tableLen;

    this.createMessage(`Is the hash value less than 0?`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(39, this.props.lines));

    if (hash < 0) {
      this.createMessage(`Current hash value is less than 0`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(40, this.props.lines));

      hash += this.info.tableLen;
    }

    let newOperation = `Delete: ${x}`;
    let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
    this.createMessage(`We will now delete ${x} from the hash table.`);
    this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
    this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, this.info.evaluation));
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(42, this.props.lines));
    this.info.operation = newOperation;
    this.info.evaluation = newEvaluation;

    this.info.size = this.info.size - 1;

    for (let i = 0; i < this.info.tableLen; i++) {
      this.createMessage(`Deletion iteration ${(i+1)}.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(42, this.props.lines));

      this.createMessage(`Setting index.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(44, this.props.lines));

      let temp_i = i * i;
      let index = (hash + temp_i) % this.info.tableLen;

      let newArrowPos = {
        x: this.info.allArrowPos[index].x,
        y: this.info.allArrowPos[index].y,
      };

      this.createMessage(`Check the index ${index}.`);
      this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(45, this.props.lines));
      this.info.arrowPos = newArrowPos;

      if (this.info.deleted[index]) {
        this.createMessage(`This value has already been deleted, so ignore it and continue.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(46, this.props.lines));

        continue;
      }

      this.createMessage(`Does the current index contain our desired value?`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(48, this.props.lines));

      if (this.info.table[index] === x) {
        this.createMessage(`We have found ${x}! Mark it as deleted.`);
        this.addStep(new ChangeEntryColorStep(`Entry${index}`, localStorage.getItem('secondaryColor'), localStorage.getItem('primaryColor')));
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(49, this.props.lines));

        this.info.deleted[index] = true;

        return pseudocodeArr;
      }

      this.createMessage(`Checking if the current node is empty.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(51, this.props.lines));

      if (this.info.table[index] == null) {
        this.createMessage(`The current node is empty.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(52, this.props.lines));

        break;
      }

      this.createMessage(`The value at index ${index} does not match, continue.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(42, this.props.lines));
    }

    this.createMessage(`No entry matching ${x} was found. There is nothing to delete.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(34, this.props.lines));

    this.setState({ message: this.messages, steps: this.steps });

    return pseudocodeArr;
  }

  search(x) {
    var pseudocodeArr = [];

    this.createMessage(`Beginning the searching process!`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(56, this.props.lines));

    this.createMessage(`Calculating hash value.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(57, this.props.lines));

    let hash = x % this.info.tableLen;

    this.createMessage(`Is the hash value less than 0?`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(58, this.props.lines));

    if (hash < 0) {
      this.createMessage(`Current hash value is less than 0`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(59, this.props.lines));

      hash += this.info.tableLen;
    }

    let newOperation = `Search: ${x}`;
    let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
    this.createMessage(`We will now search for ${x} in the hash table.`);
    this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
    this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, this.info.evaluation));
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(61, this.props.lines));
    this.info.operation = newOperation;
    this.info.evaluation = newEvaluation;

    for (let i = 0; i < this.info.tableLen; i++) {
      this.createMessage(`Searching iteration ${(i+1)}.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(61, this.props.lines));

      this.createMessage(`Setting index.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(63, this.props.lines));

      let temp_i = i * i;
      let index = (hash + temp_i) % this.info.tableLen;

      let newArrowPos = this.info.allArrowPos[index];

      this.createMessage(`Check the index ${index}.`);
      this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(64, this.props.lines));
      this.info.arrowPos = newArrowPos;

      if (this.info.deleted[index]) {
        this.createMessage(`This value has been deleted, so ignore it and continue.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(65, this.props.lines));

        continue;
      }

      this.createMessage(`Checking if search value is in current index.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(67, this.props.lines));

      if (this.info.table[index] === x) {
        this.createMessage(`We have found ${x}!`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(68, this.props.lines));

        return pseudocodeArr;
      }

      this.createMessage(`Checking if current index is empty.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(70, this.props.lines));

      if (this.info.table[index] === null) {
        this.createMessage(`Current index is empty.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(71, this.props.lines));
        break;
      }

      this.createMessage(`The value at index ${index} does not match, continue.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(61, this.props.lines));
    }

    this.createMessage(`No entry matching ${x} was found.`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(56, this.props.lines));

    this.setState({ message: this.messages, steps: this.steps });

    return pseudocodeArr;
  }

  hashTable() {
    var pseudocodeArr = [];

    let map = [];
    for (let i = 0; i < 55; i++) map.push(i);

    var example = Math.floor(Math.random() * 5);

    if(example === 0){
      map = [23, 12, 34, 56, 7, 5, 85, 45, 65];
    }else if(example === 1){
      map = [74, 19, 100, 41, 47, 98, 32, 78, 19];
    }else if(example === 2){
      map = [66, 12, 27, 44, 98, 32, 54, 43, 98];
    }else if(example === 3){
      map = [27, 37, 38, 115, 87, 65, 23, 76, 90];
    }else if(example === 4){
      map = [54, 76, 109, 23, 67, 32, 98, 99, 43];
    }



    // for (let i = 0; i < 1000; i++) {
    //   let x = randInRange(0, map.length);
    //   let y = randInRange(0, map.length);
    //   [map[x], map[y]] = [map[y], map[x]];
    // }

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
        pseudocodeArr = [...pseudocodeArr, ...this.insertion(value)];
      }
      if (ins === "DELETE") {
        pseudocodeArr = [...pseudocodeArr, ...this.deletion(value)];
      }
      if (ins === "SEARCH") {
        pseudocodeArr = [...pseudocodeArr, ...this.search(value)];
      }
    }

    this.createMessage(`Finished with Hash Table example!`);
    this.addStep(new EmptyStep());
    this.flushBuffer();
    pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));

    this.props.handleCodeStepsChange(pseudocodeArr);
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

    this.props.codeSteps[this.stepId].forward();

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
    clearInterval(this.state.interval)
    if (!this.running) return;
    if (this.stepId === this.steps.length) {
      this.running = false;
      return;
    }

    let svg = d3.select(this.ref.current).select("svg");

    this.props.codeSteps[this.stepId].forward();

    document.getElementById("message").innerHTML = this.messages[this.stepId];
    for (const step of this.steps[this.stepId]) step.forward(svg);

    this.stepId = this.stepId + 1;
    // d3.timeout(this.run, this.waitTime);
    this.setState({interval: setInterval(this.run, this.props.waitTime)})

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

  componentWillUnmount() {
    console.log("component unmounted")
    clearInterval(this.state.interval);
  }

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
          <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
        </div>
        <div id="message-pane" class="center-screen">
          <span id="message">
            <h1>Welcome to Hash Table!</h1>
          </span>
        </div>
        <div ref={this.ref} class="center-screen"></div>
        <div class="parent-svg">
                    <div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"hashtablequadratic"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
        </div>
      </div>
    );
  }
}