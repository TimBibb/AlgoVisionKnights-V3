import React from "react";
import * as d3 from "d3";
import "./heapsort.css";
import UndirectedEdge from "../../foundation/graph/UndirectedEdge";
import UnlabeledNode from "../../foundation/graph/UnlabeledNode";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";
import "../css/input.css";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import {Pseudocode, HighlightLineStep} from "../../components/pseudocode/Pseudocode";

// returns a random number in the range [lo, hi)
function randInRange(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

function OppositeVisibility(attr) {
  if (attr === "visible") return "hidden";
  if (attr === "hidden") return "visible";
  throw 'attr must be "visible" or "hidden"';
}

class Step {
  constructor(ref, stepTime) {
    this.ref = ref;
    this.stepTime = stepTime;
  }
  forward() {
    console.log("Step has no foward function");
  }
  backward() {
    console.log("Step has no backward function");
  }
}

class EmptyStep {
  forward() {}
  fastForward() {}
  backward() {}
}

class FlipVisibilityStep extends Step {
  constructor(ref, stepTime, id) {
    super(ref, stepTime);
    this.id = "#" + id;
  }
  flip() {
    var attr = d3.select(this.ref).select(this.id).attr("visibility");
    d3.select(this.ref).select(this.id).attr("visibility", OppositeVisibility(attr));
  }
  forward() {
    this.flip();
  }
  fastForward() {
    this.flip();
  }
  backward() {
    this.flip();
  }
}

class ChangeNumberColorStep extends Step {
  constructor(ref, stepTime, id, oldColor, newColor) {
    super(ref, stepTime);
    this.id = "#" + id;
    this.oldColor = oldColor;
    this.newColor = newColor;
  }
  forward() {
    d3.select(this.ref)
      .select(this.id)
      .transition()
      .duration(this.stepTime)
      .style("fill", this.newColor);
  }
  fastForward() {
    d3.select(this.ref).select(this.id).style("fill", this.newColor);
  }
  backward() {
    d3.select(this.ref).select(this.id).style("fill", this.oldColor);
  }
}

class SwapXStep {
  constructor(ref, stepTime, id1, id2) {
    // super(ref, stepTime);
    this.ref = ref;
    this.stepTime = stepTime;
    this.id1 = "#" + id1;
    this.id2 = "#" + id2;
  }
  forward() {
    var x1 = d3.select(this.ref).select(this.id1).attr("x");
    var x2 = d3.select(this.ref).select(this.id2).attr("x");
    d3.select(this.ref).select(this.id1).transition().duration(this.stepTime).attr("x", x2);
    d3.select(this.ref).select(this.id2).transition().duration(this.stepTime).attr("x", x1);
  }
  fastForward() {
    var x1 = d3.select(this.ref).select(this.id1).attr("x");
    var x2 = d3.select(this.ref).select(this.id2).attr("x");
    d3.select(this.ref).select(this.id1).attr("x", x2);
    d3.select(this.ref).select(this.id2).attr("x", x1);
  }
  backward() {
    var x1 = d3.select(this.ref).select(this.id1).attr("x");
    var x2 = d3.select(this.ref).select(this.id2).attr("x");
    d3.select(this.ref).select(this.id1).attr("x", x2);
    d3.select(this.ref).select(this.id2).attr("x", x1);
  }
}

class SwapXYStep extends Step {
  constructor(ref, stepTime, id1, id2) {
    super(ref, stepTime);
    this.id1 = "#" + id1;
    this.id2 = "#" + id2;
  }
  forward() {
    var x1 = d3.select(this.ref).select(this.id1).attr("x");
    var y1 = d3.select(this.ref).select(this.id1).attr("y");
    var x2 = d3.select(this.ref).select(this.id2).attr("x");
    var y2 = d3.select(this.ref).select(this.id2).attr("y");
    d3.select(this.ref)
      .select(this.id1)
      .transition()
      .duration(this.stepTime)
      .attr("x", x2)
      .attr("y", y2);
    d3.select(this.ref)
      .select(this.id2)
      .transition()
      .duration(this.stepTime)
      .attr("x", x1)
      .attr("y", y1);
  }
  fastForward() {
    var x1 = d3.select(this.ref).select(this.id1).attr("x");
    var y1 = d3.select(this.ref).select(this.id1).attr("y");
    var x2 = d3.select(this.ref).select(this.id2).attr("x");
    var y2 = d3.select(this.ref).select(this.id2).attr("y");
    d3.select(this.ref).select(this.id1).attr("x", x2).attr("y", y2);
    d3.select(this.ref).select(this.id2).attr("x", x1).attr("y", y1);
  }
  backward() {
    var x1 = d3.select(this.ref).select(this.id1).attr("x");
    var y1 = d3.select(this.ref).select(this.id1).attr("y");
    var x2 = d3.select(this.ref).select(this.id2).attr("x");
    var y2 = d3.select(this.ref).select(this.id2).attr("y");
    d3.select(this.ref).select(this.id1).attr("x", x2).attr("y", y2);
    d3.select(this.ref).select(this.id2).attr("x", x1).attr("y", y1);
  }
}

class TranslateXYStep extends Step {
  constructor(ref, stepTime, id, newX, newY, oldX, oldY) {
    super(ref, stepTime);
    this.id = "#" + id;
    this.newX = newX;
    this.newY = newY;
    this.oldX = oldX;
    this.oldY = oldY;
  }
  forward() {
    d3.select(this.ref)
      .select(this.id)
      .transition()
      .duration(this.stepTime)
      .attr("x", this.newX)
      .attr("y", this.newY);
  }
  fastForward() {
    d3.select(this.ref).select(this.id).attr("x", this.newX).attr("y", this.newY);
  }
  backward() {
    d3.select(this.ref).select(this.id).attr("x", this.oldX).attr("y", this.oldY);
  }
}

export default class HeapSort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      size: 10,
      steps: [],
      messages: [],
      heapCircs: [],
      heapLines: [],
      heapVals: [],
      vals: [],
      stepTime: 1900,
      waitTime: 5000,
      running: false,
      stepId: 0,
      inputMode: false,
      flag: false
    };

    this.ref = React.createRef();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.turnOffRunning = this.turnOffRunning.bind(this);
    this.run = this.run.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }

  initialize() {
    // let width = 900;

    // d3.select(this.ref.current).append("svg").attr("width", width + "px").attr("height", "1000px");
    d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "750px");

    let size = ((this.state.inputMode) ? this.state.arr.length : this.state.size);
    
    let arr =  this.state.arr;
    //console.log(arr)
    // length = 11
    let numIds = Array.from({ length: size + 1 }, (_, i) => "num" + i);
    let lineIds = Array.from({ length: size + 1 }, (_, i) => "line" + i);
    let circIds = Array.from({ length: size + 1 }, (_, i) => "circ" + i);
    let circNumIds = Array.from({ length: size + 1 }, (_, i) => "circNum" + i);

    // find all (x, y) centers for the circles (units are percent)
    var cxs = [null, 50];
    var cys = [null, 20];

    var dx = 40;
    var dy = 18;
    var len = 1;
    var left = 0;
    for (let v = 2; v <= size; v++) {
      if (left === 0) {
        len = len * 2;
        dx /= 2.0;
        left = len;
      }

      let p = Math.floor(v / 2);

      cxs[v] = cxs[p] + (v & 1 ? +1 : -1) * dx;
      cys[v] = cys[p] + dy;
      left--;
    }

    //console.log(cxs);
    //console.log(cys);

    let vals = [null];
    // create the array
    // needs arr[v-1] because it wont create object for index 0 
    for (let v = 1; v <= size; v++) {
      var x = 1.0 / size;
      x = (x * (v - 1) + x / 2.0) * 100.0;
      //((this.state.inputMode) ? arr[v-1] :
      vals.push(new Number(this.ref, numIds[v], x + "%", "5%", arr[v], "gray", "visible"));
    }

    let heapLines = [null, null];

    for (let v = 2; v <= size; v++) {
      let p = Math.floor(v / 2);
      heapLines.push(
        new UndirectedEdge(
          this.ref,
          lineIds[v],
          cxs[p] + "%",
          cys[p] + "%",
          cxs[v] + "%",
          cys[v] + "%",
          "hidden"
        )
      );
    }

    let heapCircs = [null];
    for (let v = 1; v <= size; v++) {
      heapCircs.push(new UnlabeledNode(this.ref, circIds[v], cxs[v] + "%", cys[v] + "%", "hidden"));

    }

    let heapVals = [null];
    for (let v = 1; v <= size; v++) {
      heapVals.push(
      //((this.state.inputMode) ? arr[v-1] :
      new Number(this.ref, circNumIds[v], cxs[v] + "%", cys[v] + "%", arr[v], "white", "hidden")
      );
    }
    //console.log(arr)
    this.setState({
      heapCircs: heapCircs,
      heapLines: heapLines,
      heapVals: heapVals,
      vals: vals,
    });
  }

  flushBuffer() {
    this.steps.push(this.stepBuffer);
    this.stepBuffer = [];
  }

  addStep(step) {
    this.stepBuffer.push(step);
  }

  sort(arr, size, steps, heapLines, heapCircs, heapVals, vals, stepTime) {
    var messages = [];
    messages.push("<h1>Begin by building a heap from the bottom up.</h1>");
    steps.push([new EmptyStep()]);

    var stepBuffer = [];
    var currentMessage = "";
    function flushBuffer() {
      messages.push(currentMessage);
      steps.push(stepBuffer);
      stepBuffer = [];
    }

    function addStep(step) {
      stepBuffer.push(step);
    }

    function swapVals(ref, i, j) {
      addStep(new SwapXStep(ref, stepTime, vals[i].attr.id, vals[j].attr.id));
      // swap x's for vals and the vals themselves
      [vals[i].attr.x, vals[j].attr.x] = [vals[j].attr.x, vals[i].attr.x];
      [vals[i], vals[j]] = [vals[j], vals[i]];
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    function swapHeapVals(ref, i, j) {
      addStep(new SwapXYStep(ref, stepTime, heapVals[i].attr.id, heapVals[j].attr.id));
      // swap x's and y's for heap vals and the heap vals themselves
      [heapVals[i].attr.x, heapVals[j].attr.x] = [heapVals[j].attr.x, heapVals[i].attr.x];
      [heapVals[i].attr.y, heapVals[j].attr.y] = [heapVals[j].attr.y, heapVals[i].attr.y];
      [heapVals[i], heapVals[j]] = [heapVals[j], heapVals[i]];
    }

    function swap(ref, i, j) {
      swapVals(ref, i, j);
      swapHeapVals(ref, i, j);
    }

    // heapify

    // All the leaves are heaps
    for (let i = size; i > size / 2; i--) {
      currentMessage = "<h1>Insert " + arr[i] + ".</h1>";
      addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapVals[i].attr.id));
      addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapCircs[i].attr.id));
      addStep(
        new ChangeNumberColorStep(this.ref.current, stepTime, vals[i].attr.id, "gray", "#FFCE36")
      );
      flushBuffer();
      currentMessage = "<h1>This node has no children.</h1>";
      addStep(
        new ChangeNumberColorStep(
          this.ref.current,
          stepTime,
          heapVals[i].attr.id,
          "white",
          "#FFCE36"
        )
      );
      flushBuffer();
    }
    for (let i = Math.floor(size / 2); i >= 1; i--) {
      currentMessage = "<h1>Insert " + arr[i] + ".</h1>";
      
      addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapCircs[i].attr.id));
     
      addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapVals[i].attr.id));
      addStep(
        new ChangeNumberColorStep(this.ref.current, stepTime, vals[i].attr.id, "gray", "#FFCE36")
      );

      let l = i * 2;
      let r = i * 2 + 1;
      if (l <= size)
        addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapLines[l].attr.id));
      if (r <= size)
        addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapLines[r].attr.id));

      flushBuffer();

      let v = i;
      while (true) {
        l = v * 2;
        r = v * 2 + 1;

        if (l > size) {
          currentMessage = "<h1>" + arr[v] + " has no children.</h1>";
          break;
        }

        let c = -1;
        if (r > size) c = l;
        else if (arr[l] > arr[r]) c = l;
        else c = r;

        if (arr[c] > arr[v]) {
          currentMessage =
            "<h1>Swap " + arr[v] + " with it's largest child: " + arr[c] + ".</h1>";
          swap(this.ref.current, v, c);
          flushBuffer();
          v = c;
        } else {
          currentMessage = "<h1>" + arr[v] + " doesn't have a child larger than it.</h1>";
          break;
        }
      }
      addStep(
        new ChangeNumberColorStep(
          this.ref.current,
          stepTime,
          heapVals[v].attr.id,
          "white",
          "#FFCE36"
        )
      );
      flushBuffer();
    }

    // sort
    for (let i = size; i > 1; i--) {
      // change this vvv
      currentMessage = "<h1>Swap the first and last positions of the heap.</h1>";
      addStep(
        new TranslateXYStep(
          this.ref.current,
          stepTime,
          heapVals[1].attr.id,
          vals[i].attr.x,
          vals[i].attr.y,
          heapVals[1].attr.x,
          heapVals[1].attr.y
        )
      );
      addStep(
        new TranslateXYStep(
          this.ref.current,
          stepTime,
          heapVals[i].attr.id,
          heapVals[1].attr.x,
          heapVals[1].attr.y,
          heapVals[i].attr.x,
          heapVals[i].attr.y
        )
      );
      addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapCircs[i].attr.id));
      addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapLines[i].attr.id));
      swapVals(this.ref.current, 1, i);
      flushBuffer();
      addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapVals[1].attr.id));
      heapVals[i].attr.x = heapVals[1].attr.x;
      heapVals[i].attr.y = heapVals[1].attr.y;
      heapVals[1].attr.x = vals[i].attr.x;
      heapVals[1].attr.y = vals[i].attr.y;
      [heapVals[1], heapVals[i]] = [heapVals[i], heapVals[1]];
      // addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapVals[1].attr.id));
      // addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapCircs[i].attr.id));
      // addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapLines[i].attr.id));
      // swap(this.ref.current, 1, i);
      // flushBuffer();
      // change this ^^^
      currentMessage = "<h1>" + arr[i] + " is now in it's sorted position.</h1>";
      addStep(
        new ChangeNumberColorStep(this.ref.current, stepTime, vals[i].attr.id, "#FFCE36", "#1ACA1E")
      );
      flushBuffer();

      let v = 1;
      currentMessage =
        "<h1>" +
        "Swap " +
        arr[1] +
        " with children until it has no larger children or no children at all.</h1>";
      addStep(
        new ChangeNumberColorStep(
          this.ref.current,
          stepTime,
          heapVals[1].attr.id,
          "#FFCE36",
          "white"
        )
      );
      flushBuffer();
      while (true) {
        if (v * 2 >= i) {
          currentMessage = "<h1>" + arr[v] + " has no children.</h1>";
          break;
        }

        let c = -1;
        let l = v * 2;
        let r = v * 2 + 1;

        if (r >= i) c = l;
        else if (arr[l] > arr[r]) c = l;
        else c = r;

        if (arr[c] > arr[v]) {
          currentMessage =
            "<h1>Swap " + arr[v] + " with it's largest child: " + arr[c] + ".</h1>";
          swap(this.ref.current, v, c);
          flushBuffer();
          v = c;
        } else {
          currentMessage = "<h1>" + arr[v] + " doesn't have a child larger than it.</h1>";
          break;
        }
      }
      addStep(
        new ChangeNumberColorStep(
          this.ref.current,
          stepTime,
          heapVals[v].attr.id,
          "white",
          "#FFCE36"
        )
      );
      flushBuffer();
    }

    currentMessage = "<h1>Since " + arr[1] + " is the last number, it is in sorted position.</h1>";

    addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapVals[1].attr.id));
    addStep(new FlipVisibilityStep(this.ref.current, stepTime, heapCircs[1].attr.id));
    addStep(
      new ChangeNumberColorStep(this.ref.current, stepTime, vals[1].attr.id, "#FFCE36", "#1ACA1E")
    );
    flushBuffer();

    // addStep(new FlipVisibilityStep(this.ref.current, stepTime, circNumIds[1]));
    // addStep(new FlipVisibilityStep(this.ref.current, stepTime, circIds[1]));
    // addStep(new ChangeNumberColorStep(this.ref.current, stepTime, numIds[1], "#FFCE36", "#1ACA1E"));
    // flushBuffer();

    currentMessage = "<h1>Finished Heap Sort!</h1>";
    addStep(new EmptyStep());
    flushBuffer();

    this.setState({
      size: size,
      steps: steps,
      messages: messages,
    });
  }

  turnOffRunning() {
    this.setState({ running: false });
  }

  forward() {
    console.log("FORWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId === this.state.steps.length) return;

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.fastForward();
    // this.state.steps[this.state.stepId].forward();
    //console.log(this.state.steps[this.state.stepId]);
    this.setState({ stepId: this.state.stepId + 1 });

    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  backward() {
    console.log("BACKWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId - 1 < 0) return;

    var stepId = this.state.stepId - 1;

    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Heap Sort!</h1>" : this.state.messages[stepId - 1];
    for (const step of this.state.steps[stepId]) step.backward();
    // this.state.steps[--stepId].backward();
    this.setState({ stepId: stepId });
    d3.timeout(this.turnOffRunning, this.props.waitTime);
  }

  run() {
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }
    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward();
    this.setState({ stepId: this.state.stepId + 1 });
    d3.timeout(this.run, this.props.waitTime);
  }

  play() {
    console.log("PLAY CLICKED");
    if (this.state.running) return;
    this.setState({ running: true });
    this.run();
  }

  pause() {
    console.log("PAUSE CLICKED");
    this.setState({ running: false });
  }

  restart() {
    console.log("SIZE:" + this.state.steps.length);
    console.log("RESTART CLICKED");
    if (this.state.stepId - 1 < 0) return;

    let stepId = this.state.stepId;
    document.getElementById("message").innerHTML = "<h1>Welcome to Heap Sort!</h1>";
    while (stepId - 1 >= 0) {
      for (const step of this.state.steps[--stepId]) step.backward();
      d3.timeout(this.turnOffRunning, this.props.waitTime);
    }
    this.setState({ running: false});
    this.setState({ stepId: 0 });
    
  }

  componentDidMount() {
    this.dataInit(this.state.size);
  }
  dataInit(size) {
		let arr =  Array.from({ length: size + 1 }, () => randInRange(1, 100));
		this.setState({arr: arr, inputMode: false});
	}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.inputMode) {
			if (JSON.stringify(this.state.arr)!==JSON.stringify(prevState.arr)) {
          console.log("1");
          d3.select(this.ref.current).select("svg").remove();
          this.initialize();
			}
			else if (this.state.heapCircs.length > prevState.heapCircs.length) {
          d3.select(this.ref.current).select("svg").attr("visibility", "visible");
          console.log("2");
          this.sort(this.state.arr,
                        this.state.arr.length - 1,
                        this.state.steps,
                        this.state.heapLines,
                        this.state.heapCircs,
                        this.state.heapVals,
                        this.state.vals,
                        this.state.stepTime
                    );
          //console.log("Hello!")
          this.play();
          this.setState({inputMode: false});
			}
			else if (this.state.running !== prevState.running && this.state.running === true)
			{
				this.run();
				console.log("4");
				this.setState({inputMode: false});
			}
		}
    else {
        if (this.state.arr.length > prevState.arr.length) {
          console.log("1a");
          this.initialize();
        } else if (this.state.heapCircs.length > prevState.heapCircs.length) {
          d3.select(this.ref.current).select("svg").attr("visibility", "visible");
          this.sort(
            this.state.arr,
            this.state.size,
            this.state.steps,
            this.state.heapLines,
            this.state.heapCircs,
            this.state.heapVals,
            this.state.vals,
            this.state.stepTime
          );
          console.log("2a");
        
        } else if (this.state.running !== prevState.running) {
          this.run();
          console.log("3a");
        }
    }
  }

  handleInsert() {
		if (this.state.running || this.state.inputMode) {
			return;
		}
		let input = document.getElementById("insertVal").value;
		let arr = input.split(',');
		if (arr.length < 2 || arr.length > 10) {
			document.getElementById("message").innerHTML = "<h1>Array size must be between 2 and 10</h1>";
			return;
		}

		let i = 0;
		for (let value of arr) {
			if (!this.isNum(value)) {
				document.getElementById("message").innerHTML = "<h1>Incorrect format.</h1>";
				return;
			}
			arr[i++] = parseInt(value);
		}
   
    arr.splice(0, 0, 0);
    
		// Must input pass all the requirements..
		// Set state for running, inputmode, and array
		this.setState({inputMode: true, flag: true, arr:arr, running: false, steps: [], messages: [], stepId: 0,
                  heapCircs: [], heapLines: [], heapVals: [], vals: []});
	}

	isNum(value) {
		// Short circuit parsing & validation
		let x;
		if (isNaN(value)) return false;
		x = parseFloat(value);
		return (x | 0) === x;
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
        <div class="center-screen">
					<input class="sortInput"type="text" id="insertVal" placeholder="3,5,2,3,4,5"></input>
					<button class="button" id="insertBut" onClick={this.handleInsert}>Insert</button>
				</div>
        <div class="center-screen">
          <span id="message"><h1>Welcome to Heap Sort!</h1></span>
        </div>
        <div class="parent-svg">
					<div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"heapsort"} lines={this.props.lines} 
								handleLinesChange={this.props.handleLinesChange} code={this.props.code} 
								handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} 
								handleCodeStepsChange={this.handleCodeStepsChange}>
					</Pseudocode>
				</div>
      </div>
    );
  }
}