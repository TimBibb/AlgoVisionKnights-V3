import React from "react";
import * as d3 from "d3";
import "./hashtablelinkedlist.css";
import "../css/button.css";
import "../css/messages.css";
import "../css/input.css";
import "../css/button.css";
import { Form } from "react-bootstrap";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import { Pseudocode } from "../../components/pseudocode/Pseudocode";
import { HighlightLineStep } from "../../components/pseudocode/Pseudocode";
import reactDom from "react-dom";
import { Flag } from "@material-ui/icons";

// Linked List Node Class
class DataNode {
  constructor(data, id, next = null) {
    this.data = data
    this.next = next
    this.id = id;
  }
}

class Node {
	constructor(element, id, ref, x, y) {
		this.element = element;
        // id = gindex_x => g1_0
        this.id = "g" + id;
        this.next = null;
        this.ref = ref;
        this.x = x;
        this.y = y;
			
		let container = d3.select(this.ref.current)
			.select("svg")
      .attr("id","nodecontainer")
			.append("g")
			.attr("class","gbar")
			.attr("id", this.id)
			.attr("visibility", "hidden")
	
		container
      .append('rect')
			.attr("class", "nodes")
      .attr('height', 45)
      .attr('width', 90)
      .attr('x', (150 * this.x) + 375)
      .attr('y',(55 * this.y) + 50)
      .style("fill", "url(#grad)")
      .attr("stroke-width", "2")
      .attr("stroke", localStorage.getItem('secondaryColor'))
			
		container
      .append('line')
      .style("stroke", localStorage.getItem('secondaryColor'))
      .style("stroke-width", 2)
		 	.attr("x1", (150 * this.x) + 435)
		 	.attr("y1", (55 * this.y) + 50)
		 	.attr("x2", (150 * this.x) + 435)
		 	.attr("y2", (55 * this.y) + 95)
			
		container
			.append("text")
			.text(this.element)
			.attr("y", (55 * this.y) + 80)
			.attr("x", (150 * this.x) + 405)
			.style("text-anchor", "middle")
			.style("font-size", "28px")
			.style("fill", localStorage.getItem('primaryColor'))
			
    if (this.x < 4) {
      container
        .append('line')
        .style("stroke", localStorage.getItem('primaryColor'))
        .style("stroke-width", 5)
        .attr("x1", (150 * this.x) + 465)
        .attr("y1", (55 * this.y) + 75)
        .attr("x2", 150 * (this.x + 1) + 375)
        .attr("y2", (55 * this.y) + 75)
        .attr("marker-end", "url(#arrow)")
    }
		
		container
			.append("svg:marker")
			.attr("id", "arrow")
			.attr("viewBox", "0 0 12 12")
			.attr("refX", 10.5)
			.attr("refY", 6)
			.attr("markerUnits", "strokeWidth")
			.attr("markerWidth", 8)
			.attr("markerHeight", 30)
			.attr("orient", "auto")
			.append("path")
			.attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
			.style("stroke", localStorage.getItem('primaryColor'))
    
    ;}
}

class ShowNodeStep {
	constructor(id1) {
		this.id1 = id1;
	}
	forward(svg) {
		svg.select("#" + this.id1).attr("visibility", "visible");
	}
	fastForward(svg) {
		this.forward(svg);
	}
	backward(svg) {

    svg.select("#" + this.id1).attr("visibility", "hidden");
		// svg.select("#" + this.idArr[this.id1]).select("rect").style("fill", "#EF3F88");
		// svg.select("#" + this.idArr[this.id2]).select("rect").style("fill", "gray");
		// svg.selectAll(".qTxt").attr("visibility", "hidden");

		// if (this.id1 !== this.id2) {
		// 	svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		// }
	}
}
class HighlightNodeStep {
	constructor(id) {
		this.id = id;
	}
	forward(svg){
		svg.select("#" + this.id).select("rect").style("fill", localStorage.getItem('accentColor'));
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {

    svg.select("#" + this.id).select("rect").style("fill", localStorage.getItem('secondaryColor'));
		svg.select("#" + this.id).select("rect").style("fill", "url(#grad)");
		// svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
		// svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "gray");

		// svg.selectAll(".qTxt").attr("visibility", "hidden");

		// if (this.id1 !== this.id2) {
		// 	svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		// }
	}
}
class DeHighlightNodeStep {
	constructor(id) {
		this.id = id;
	}
	forward(svg){
		svg.select("#" + this.id).select("rect").style("fill", "url(#grad)");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
    svg.select("#" + this.id).select("rect").style("fill", localStorage.getItem('accentColor'));
		// svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
		// svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "gray");

		// svg.selectAll(".qTxt").attr("visibility", "hidden");

		// if (this.id1 !== this.id2) {
		// 	svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		// }
	}
}
class RemoveNodeStep {
	constructor(id,node) {
		this.id = id
    this.node = node
	}
	forward(svg) {
    console.log(this.node.id)
    console.log(this.id);
		svg.select("#" + this.id).attr("visibility", "hidden");
	}
	fastForward(svg) {
		this.forward(svg);
	}
	backward(svg) {
		svg.select("#" + this.id).attr("visibility", "visible");
	}
}

// returns a random number in the range [lo, hi)
function randInRange(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
}

function modRand(n) {
  let num = [];
  for (let i = 0; i < 999; i++) {
    if ((i % 11) === n) num.push(i);
  }
  return num[Math.floor(Math.random() * num.length)];
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
      let line = 310;
  
      let operation = svg
        .append("text")
        .attr("x", "1200px")
        .attr("y", "100px")
        .attr("id", "Operation")
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
        .style("fill", localStorage.getItem('primaryColor'))
        .text("");
  
      let hashFunction = svg
        .append("text")
        .attr("x", "1150px")
        .attr("y", "300px")
        .attr("id", "Function")
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
        .style("fill", localStorage.getItem('primaryColor'))
        .text("h(x) = x % [length of table]");
  
      let hashEvaluation = svg
        .append("text")
        .attr("x", "1200px")
        .attr("y", "400px")
        .attr("id", "Evaluation")
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
        .style("fill", localStorage.getItem('primaryColor'))
        .text("");
  
      svg
        .append("line")
        .attr("x1", line + "px")
        .attr("y1", "0px")
        .attr("x2", line + "px")
        .attr("y2", "650px")
        .attr("stroke", localStorage.getItem('primaryColor'));
  
      let allArrowPos = [];
  
      for (let i = 0; i < tableLen + 1; i++) {
        let height = 600;
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
            .text("#")
            .attr("marker-end", "url(#arrow2)");
            
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
        .attr("x", "300px")
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
        .attr("x", "320px")
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

        // Linked List
        let grad = svg.append("defs")
        .append("linearGradient")
        .attr("id", "grad")
        .attr("x1", "35%").attr("x2", "100%").attr("y1", "100%").attr("y2", "100%");
        grad.append("stop").attr("offset", "50%").style("stop-color", localStorage.getItem('secondaryColor'));
        grad.append("stop").attr("offset", "50%").style("stop-color", localStorage.getItem('accentColor'));
  

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
      let pseudocodeArr = [];
      //console.log("made it to insertion");
      if (this.info.size === this.info.tableLen) {
        this.createMessage(`The hash table is currently full.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));
        return pseudocodeArr;
      }
  
      //console.log("made it past size check");
  
      // Get hash value
      let hash = x % this.info.tableLen;
      let firstDeleted = -1;
      
      if (hash < 0) hash += this.info.tableLen;
  
      let newOperation = `Insert: ${x}`;
      this.createMessage(`We will now insert ${x} into the hash table.`);
      this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
      this.addStep(new ChangeTextStep(`Evaluation`, "", this.info.evaluation));
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));
      this.info.operation = newOperation;
  
      let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
      this.createMessage(`Using the hash function we get that the hash of ${x} is ${hash}.`);
      this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, ""));
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));
      this.info.evaluation = newEvaluation;
  
      this.info.size = this.info.size + 1;
  
      this.createMessage(
        `Start at the hash, being ${hash}, and iterate linearly until we can insert ${x}.`
      );
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(0, this.props.lines));
  
      for (let i = 0; i < this.info.tableLen; i++) {
        let index = (hash + i) % this.info.tableLen;
        let newArrowPos = {
          x: this.info.allArrowPos[index].x,
          y: this.info.allArrowPos[index].y,
        };
  
        this.createMessage(`Check the index ${index}.`);
        this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(3, this.props.lines));
        this.info.arrowPos = newArrowPos;
  
        if (this.info.deleted[index] && firstDeleted === -1) {
          this.createMessage(
            `Remember that the first deleted element we've found is at index ${index}.`
          );
          this.addStep(new EmptyStep());
          this.flushBuffer();
          pseudocodeArr.push(new HighlightLineStep(4, this.props.lines));
          firstDeleted = index;
          continue;
        }
  
        let currentNode = this.info.table[index];
        if (currentNode === null) {
            // No node at the head, so make one and set it to the head
            let newNode = new Node(x, index + "_" + 0, this.ref, 0, index);
            this.createMessage(`At index ` + index + `, the head is null so we will create our first node.`);
            this.addStep(new ShowNodeStep(newNode.id));
            //this.flushBuffer();
            this.info.table[index] = new DataNode(x,"g"+index+"_"+0);
        } else {
          this.createMessage(`Let's place our value at the end of the linked list.`);
          let xCounter = 1;
          if (currentNode.data === x) {
            this.createMessage(`Since ${x} already exists, we will skip to prevent duplicates.`);
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(6, this.props.lines));
            return pseudocodeArr;
          }
          while (currentNode.next != null) {
                if (currentNode.next.data === x) {
                  //console.log(x);
                  this.createMessage(`Since ${x} already exists, we will skip to prevent duplicates.`);
                  this.addStep(new EmptyStep());
                  this.flushBuffer();
                  pseudocodeArr.push(new HighlightLineStep(6, this.props.lines));
                  return pseudocodeArr;
                }
                // Finding the tail node
                currentNode = currentNode.next;
                xCounter++;
            }
            // set our tail to the new node
            currentNode.next = new DataNode(x,"g"+index+"_"+xCounter);
            let newNode = new Node(x, index+"_"+xCounter, this.ref, xCounter, index);
            this.addStep(new ShowNodeStep(newNode.id))
        }  
        
        if (this.info.deleted[index]) {
          this.createMessage(`The value at index ${index} is deleted, move to the next one.`);
        } 
        else {
          //this.createMessage(`There is already a value at index ${index}, let's iterate through the linkedlist.`);
        }
        
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(11, this.props.lines));
        return pseudocodeArr;
      }
  
      this.createMessage(`Although this entry is empty, we already found a deleted entry.`);
      this.addStep(new EmptyStep());
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(16, this.props.lines));
  
      this.createMessage(`Replace the first deleted entry we found.`);
      this.addStep(
        new ChangeTextPositionStep(`Arrow`, this.info.allArrowPos[firstDeleted], this.info.arrowPos)
      );
      this.addStep(new ChangeEntryColorStep(`Entry${firstDeleted}`, `white`, `#444444`));
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(16, this.props.lines));
  
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
  
      if (this.info.size === 0) {
        this.createMessage(`There are no entries, so there is nothing to remove.`);
        this.addStep(new EmptyStep());
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(17, this.props.lines));
        return pseudocodeArr;
      }
  
      let hash = x % this.info.tableLen;
      if (hash < 0) hash += this.info.tableLen;
      let newOperation = `Delete: ${x}`;
      let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
      this.createMessage(`We will now delete ${x} from the hash table.`);
      this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
      this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, this.info.evaluation));
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(17, this.props.lines));
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
        pseudocodeArr.push(new HighlightLineStep(18, this.props.lines));
        this.info.arrowPos = newArrowPos;
  
        let currentNode = this.info.table[index];
        if (currentNode === null) {
          this.createMessage(`At index ` + index + `, the head is null so we do not have a linked list here. Not found`);
          this.addStep(new EmptyStep());
          return pseudocodeArr;
        }
        if (currentNode.data === x) {
          this.createMessage(`We have found ${x}! Mark it as deleted.`);
          let id = "g" + index + "_" + 0;
          this.addStep(new RemoveNodeStep(id,currentNode));
          
          currentNode = currentNode.next;
          
          this.flushBuffer();
          pseudocodeArr.push(new HighlightLineStep(21, this.props.lines));
          return pseudocodeArr;
        }
        else {
          let xCounter = 1;
          while (currentNode.next !== null) {
            if (currentNode.next.data === x) {
              console.log("FOUND, DELETE");
              this.createMessage(`We have found ${x}! Mark it as deleted.`);
              let id = "g" + index + "_" + xCounter;
              this.addStep(new RemoveNodeStep(id,currentNode.next));
              
              currentNode.next = currentNode.next.next;
              
              this.flushBuffer();
              pseudocodeArr.push(new HighlightLineStep(21, this.props.lines));
              return pseudocodeArr;
            }
            currentNode = currentNode.next;
            xCounter++;
          }
          this.createMessage(`No entry matching ${x} was found. There is nothing to delete.`);
          this.addStep(new EmptyStep());
          this.flushBuffer();
          pseudocodeArr.push(new HighlightLineStep(26, this.props.lines));
          this.setState({ message: this.messages, steps: this.steps });
          return pseudocodeArr;
        }
      }
    }
  
    search(x) {
      var pseudocodeArr = [];
  
      let hash = x % this.info.tableLen;
      

      if (hash < 0) hash += this.info.tableLen;
  
      let newOperation = `Search: ${x}`;
      let newEvaluation = `h(${x}) = ${x} % ${this.info.tableLen} = ${hash}`;
      this.createMessage(`We will now search for ${x} in the hash table.`);
      this.addStep(new ChangeTextStep(`Operation`, newOperation, this.info.operation));
      this.addStep(new ChangeTextStep(`Evaluation`, newEvaluation, this.info.evaluation));
      this.flushBuffer();
      pseudocodeArr.push(new HighlightLineStep(27, this.props.lines));
      this.info.operation = newOperation;
      this.info.evaluation = newEvaluation;
  
      for(let i = 0; i < this.info.tableLen; i++) {
        let index = (hash + i) % this.info.tableLen;
        let newArrowPos = {
          x: this.info.allArrowPos[index].x,
          y: this.info.allArrowPos[index].y,
        };
        this.createMessage(`Check the index ${index}.`);
        this.addStep(new ChangeTextPositionStep(`Arrow`, newArrowPos, this.info.arrowPos));
        this.flushBuffer();
        pseudocodeArr.push(new HighlightLineStep(28, this.props.lines));
        this.info.arrowPos = newArrowPos;
      
        let currentNode = this.info.table[index];
        if (currentNode === null) {
            this.createMessage(`At index ` + index + `, the head is null so we do not have a linked list here. Not found`);
            this.addStep(new EmptyStep());
            return pseudocodeArr;
        }
        if (currentNode.data === x) {
              this.createMessage(`Found ${x}!`);
              let id = "g" + index + "_" + 0;
              this.addStep(new HighlightNodeStep(id));
              this.flushBuffer();
              pseudocodeArr.push(new HighlightLineStep(6, this.props.lines));
              this.addStep(new DeHighlightNodeStep(id));
              return pseudocodeArr;
        }
        else {
            let xCounter = 1;
            while (currentNode.next !== null) {
              if (currentNode.next.data === x) {
                this.createMessage(`Found ${x}!`);
                let id = "g" + index + "_" + xCounter;
                this.addStep(new HighlightNodeStep(id));
                this.flushBuffer();
                pseudocodeArr.push(new HighlightLineStep(6, this.props.lines));
                this.addStep(new DeHighlightNodeStep(id));
                return pseudocodeArr;
              }
              currentNode = currentNode.next;
              xCounter++;
            }
            this.createMessage(`No entry matching ${x} was found.`);
            this.addStep(new EmptyStep());
            this.flushBuffer();
            pseudocodeArr.push(new HighlightLineStep(36, this.props.lines));
            this.setState({ message: this.messages, steps: this.steps });
            return pseudocodeArr;
        }  
      }
}
  
    hashTable() {
      let map = [];
      let pseudocodeArr = [];
  
      for (let i = 0; i < 55; i++) map.push(i);
  
      for (let i = 0; i < 1000; i++) {
        let x = randInRange(0, map.length);
        let y = randInRange(0, map.length);
        [map[x], map[y]] = [map[y], map[x]];
      }
  
      let instructions = [
        [0, "INSERT"],
        [1, "INSERT"],
        [1, "INSERT"],
        [2, "INSERT"],
        [2, "DELETE"],
        [1, "DELETE"],
        [3, "INSERT"],
        [3, "SEARCH"],
        [4, "INSERT"],
        [1, "SEARCH"],
        [5, "INSERT"],
        [1, "SEARCH"],
        [6, "INSERT"],
        [8, "INSERT"],
        [6, "SEARCH"],
        [2,"DELETE"],
        [8,"DELETE"],
        [4,"DELETE"],
        [5,"DELETE"]
      ];
      
      // testing data for search index 
      map[0] = modRand(1);
      map[1] = modRand(1);
      map[2] = modRand(1);
      map[3] = modRand(10);
      map[4] = modRand(7);
      map[5] = modRand(0);
      map[6] = modRand(9);
      map[8] = modRand(6);
      

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
      pseudocodeArr.push(new HighlightLineStep(36, this.props.lines));
  
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
  
      console.log(this.props.codeSteps);
      console.log(this.steps);
  
      let svg = d3.select(this.ref.current).select("svg");
  
      this.props.codeSteps[this.stepId].forward();
  
      document.getElementById("message").innerHTML = this.messages[this.stepId];
  
      for (const step of this.steps[this.stepId]) step.fastForward(svg);
      this.props.codeSteps[this.stepId].forward();
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
  
      //console.log(this.props.codeSteps);
      //console.log(this.steps);
      //console.log(this.stepId);
  
      let svg = d3.select(this.ref.current).select("svg");
  
      //console.log(this.props.codeSteps[this.stepId]);
      this.props.codeSteps[this.stepId].forward();
  
      document.getElementById("message").innerHTML = this.messages[this.stepId];
      for (const step of this.steps[this.stepId]) step.forward(svg);
      this.props.codeSteps[this.stepId].forward();
      this.stepId = this.stepId + 1;
      d3.timeout(this.run, this.props.waitTime);
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
      //if (this.running) return;
      if (this.stepId - 1 < 0) return;
      this.running = true;
      let svg = d3.select(this.ref.current).select("svg");
      //svg.select("#nodecontainer").remove();
      svg.remove();
      this.initialize();
      document.getElementById("message").innerHTML = this.messages[0];
      while (this.stepId - 1 >= 0) {
        for (const step of this.steps[this.stepId - 1]) step.backward(svg);
        this.stepId = this.stepId - 1;
      }

      document.getElementById("message").innerHTML = "<h1>Welcome to Hash Table Linked List!</h1>";
  
      this.running = false;
      this.stepId = 0;
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
  
    isRunningCheck(id) {
      if (this.running) {
        d3.select(id).property("value", "Error: Visualizer Running");
        return true;
      }
  
      return false;
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
            <button class="button" onClick={this.refreshPage}>Restart</button>
            <button class="button" onClick={this.backward}>Step Backward</button>
            <button class="button" onClick={this.forward}>Step Forward</button>
            <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
          </div>
          <div class="center-screen">
            <span id="message">
              <h1>Welcome to Hash Table Linked List!</h1>
            </span>
          </div>
          <div ref={this.ref} class="center-screen"></div>
          <div class="parent-svg">
            <div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
            <Pseudocode algorithm={"hashtablelinkedlist"} lines={this.props.lines} handleLinesChange={this.props.handleLinesChange} code={this.props.code} handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} handleCodeStepsChange={this.handleCodeStepsChange}></Pseudocode>
          </div>
        </div>
      );
    }
  }
  