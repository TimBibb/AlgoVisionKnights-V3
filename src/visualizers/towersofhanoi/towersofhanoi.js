import React from "react";
import * as d3 from "d3";
import "./towersofhanoi.css";
import Disk from "../../foundation/recursion/Disk";
import Number from "../../foundation/Number";
import "../css/button.css";
import "../css/messages.css";

class EmptyStep {
  forward(svg) {}
  backward(svg) {}
}

class MoveDiskStep {
  constructor(disk, newDiskPos, oldDiskPos, newTextPos, oldTextPos) {
    this.disk = disk;
    this.newDiskPos = newDiskPos;
    this.oldDiskPos = oldDiskPos;
    this.newTextPos = newTextPos;
    this.oldTextPos = oldTextPos;
  }
  forward(svg) {
    svg
      .select("#" + this.disk.rect.attr.id)
      .attr("x", this.newDiskPos.x)
      .attr("y", this.newDiskPos.y);
    svg
      .select("#" + this.disk.text.attr.id)
      .attr("x", this.newTextPos.x)
      .attr("y", this.newTextPos.y);
  }
  backward(svg) {
    d3.select("#" + this.disk.rect.attr.id)
      .attr("x", this.oldDiskPos.x)
      .attr("y", this.oldDiskPos.y);
    d3.select("#" + this.disk.text.attr.id)
      .attr("x", this.oldTextPos.x)
      .attr("y", this.oldTextPos.y);
  }
}

class ChangeOpacityStep {
  constructor(id, newOpac, oldOpac) {
    this.id = id;
    this.newOpac = newOpac;
    this.oldOpac = oldOpac;
  }
  forward(svg) {
    svg.select("#" + this.id).style("fill-opacity", this.newOpac);
  }
  backward(svg) {
    svg.select("#" + this.id).style("fill-opacity", this.oldOpac);
  }
}

class SetPegsStep {
  constructor(newPegs, oldPegs) {
    this.newPegs = newPegs;
    this.oldPegs = oldPegs;
  }
  forward(svg) {
    svg.select("#peg" + this.newPegs[0]).text("Source");
    svg.select("#peg" + this.newPegs[1]).text("Auxillary");
    svg.select("#peg" + this.newPegs[2]).text("Destination");
  }
  backward(svg) {
    svg.select("#peg" + this.oldPegs[0]).text("Source");
    svg.select("#peg" + this.oldPegs[1]).text("Auxillary");
    svg.select("#peg" + this.oldPegs[2]).text("Destination");
  }
}

export default class Prims extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDisks: 0,
      running: false,
      steps: [],
      messages: [],
      stepId: 0,
      stepTime: 400,
      waitTime: 4000,
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
    d3.select(this.ref.current).append("svg").attr("width", "1500px").attr("height", "750px");

    let colors = [
      "#DE3163",
      "#FF7F50",
      "#FFBF00",
      "#DFFF00",
      "#9FE2BF",
      "#40E0D0",
      "#6495ED",
      "#CCCCFF",
    ];

    let disks = [[], [], []];
    let ys = [];
    let textxys = [[], [], []];

    let numberOfDisks = 5;
    let smallWidth = 10.0;
    let largeWidth = 25.0;
    let diffWidth = (largeWidth - smallWidth) / (numberOfDisks - 1.0);

    let smallY = 30.0;
    let largeY = 70.0;
    let diffY = (largeY - smallY) / (numberOfDisks * 1.0);

    let xs = [16.0, 50.0, 84.0];

    // Draw Pegs
    for (let i = 0; i < 3; i++) {
      d3.select(this.ref.current)
        .select("svg")
        .append("line")
        .attr("x1", xs[i] + "%")
        .attr("y1", "25%")
        .attr("x2", xs[i] + "%")
        .attr("y2", "71%")
        .style("stroke", "white")
        .style("stroke-width", "5%");
    }
    new Number(this.ref, "peg0", xs[0] + "%", "80%", "Source", "white", "visible", "3em");
    new Number(this.ref, "peg1", xs[1] + "%", "80%", "Auxillary", "white", "visible", "3em");
    new Number(this.ref, "peg2", xs[2] + "%", "80%", "Destination", "white", "visible", "3em");

    for (let i = 0; i < 3; i++) {
      let curWidth = smallWidth;
      let curY = smallY;

      for (let j = 0; j < numberOfDisks; j++) {
        let cy = curY + diffY / 2.0;
        let cx = xs[i];

        let width = curWidth;
        let height = diffY;

        textxys[i].push({ x: cx + "%", y: cy + "%" });

        if (i === 0) {
          disks[i].push(
            new Disk(
              this.ref,
              "disk" + (j + 1),
              "disknum" + (j + 1),
              cx + "%",
              cy + "%",
              width + "%",
              height + "%",
              colors[j % colors.length],
              j + 1
            )
          );
          ys.push(disks[i][j].rect.attr.y);
        } else {
          disks[i].push(null);
        }

        curWidth += diffWidth;
        curY += diffY;
      }
      disks[i] = disks[i].reverse();
      ys = ys.reverse();
      textxys[i] = textxys[i].reverse();
      console.log(disks[i]);
    }

    // Bottom portion of the pegs
    d3.select(this.ref.current)
      .select("svg")
      .append("rect")
      .attr("x", "0%")
      .attr("y", "70%")
      .attr("width", "100%")
      .attr("height", "5%")
      .style("fill", "white")
      .style("stroke", "white");

    console.log(ys);

    this.setState({ numberOfDisks: numberOfDisks, disks: disks, ys: ys, textxys });
  }

  towersOfHanoi(numberOfDisks, disks, ys, textxys) {
    var messages = [];
    var currentMessage = "";
    function createMessage(msg) {
      currentMessage = "<h1>" + msg + "</h1>";
    }
    createMessage("placeholder text");

    var steps = [];
    var stepBuffer = [];
    function flushBuffer() {
      if (stepBuffer.length === 0) return;
      steps.push(stepBuffer);
      stepBuffer = [];
      messages.push(currentMessage);
    }
    function addStep(step) {
      stepBuffer.push(step);
    }

    function calcDeltaX(peg1, peg2) {
      // moving to the right is +34 in x
      // moving to the left is -34 in x
      // get difference in pegs should tell which direction to go in
      // and how many times
      return (peg2 - peg1) * 34.0;
    }

    // Number of disks on each peg
    // starts with all disks on the left peg
    let cnts = [numberOfDisks, 0, 0];

    console.log(disks);
    console.log(cnts);

    let oldDisks = [0, 1, 2];
    
    addStep(new EmptyStep());
    createMessage(`The goal is to move all the disks from the Source peg to the Destination peg.`);
    flushBuffer();

    addStep(new EmptyStep());
    createMessage(`You can take a disk at the top of any peg and place it on any other peg.`);
    flushBuffer();

    addStep(new EmptyStep());
    createMessage(`However, you cannot place a disk on top of another disk smaller than itself.`);
    flushBuffer();

    // hanoi(# of disks, peg 1, peg 2, peg 3)
    function hanoi(n, source, auxillary, destination) {
      if (n === 0) return;

      addStep(new SetPegsStep([source, auxillary, destination], oldDisks));
      createMessage(`Move the top ${n} disk(s) from the Source to the Destination.`);
      addStep(new EmptyStep());
      flushBuffer();

      if (n > 1) {
        createMessage(
          `First, focus on moving the top ${
            n - 1
          } disk(s) to the Auxillary via recursive call.`
        );
        addStep(new ChangeOpacityStep("disk" + n, 0.25, 1.0));
        flushBuffer();
      }

      oldDisks = [source, auxillary, destination];
      hanoi(n - 1, source, destination, auxillary);

      if (n > 1) {
        createMessage(`The top ${n - 1} disk(s) have successfully moved to the Auxillary.`);
        addStep(new SetPegsStep([source, auxillary, destination], oldDisks));
        addStep(new ChangeOpacityStep("disk" + n, 1.0, 0.25));
        flushBuffer();
      }

      // disk n goes from peg source to peg destination

      let oldDiskPos = {
        x: disks[source][cnts[source] - 1].rect.attr.x,
        y: disks[source][cnts[source] - 1].rect.attr.y,
      };
      let newDiskPos = {
        x:
          parseFloat(oldDiskPos.x.substring(0, oldDiskPos.x.length - 1)) +
          calcDeltaX(source, destination) +
          "%",
        y: ys[cnts[destination]],
      };

      let oldTextPos = textxys[source][cnts[source] - 1];
      let newTextPos = textxys[destination][cnts[destination]];

      createMessage(`Move disk ${n} from the Source to the Destination.`);

      addStep(
        new MoveDiskStep(
          disks[source][cnts[source] - 1],
          newDiskPos,
          oldDiskPos,
          newTextPos,
          oldTextPos
        )
      );
      flushBuffer();

      disks[source][cnts[source] - 1].rect.attr.x = newDiskPos.x;
      disks[source][cnts[source] - 1].rect.attr.y = newDiskPos.y;
      console.log("disk " + n + ": " + source + " -> " + destination);
      [disks[source][cnts[source] - 1], disks[destination][cnts[destination]]] = [
        disks[destination][cnts[destination]],
        disks[source][cnts[source] - 1],
      ];
      cnts[source] = cnts[source] - 1;
      cnts[destination] = cnts[destination] + 1;

      if (n > 1) {
        createMessage(
          `Move the top ${
            n - 1
          } disk(s) to the Destination via recursive call.`
        );
        addStep(new ChangeOpacityStep("disk" + n, 0.25, 1.0));
        flushBuffer();
      }

      oldDisks = [source, auxillary, destination];
      hanoi(n - 1, auxillary, source, destination);

      if (n > 1) {
        createMessage(`The top ${n} disk(s) have successfully moved to the Destination.`);
        addStep(new ChangeOpacityStep("disk" + n, 1.0, 0.25));
        flushBuffer();
      }

      oldDisks = [source, auxillary, destination];
    }

    hanoi(numberOfDisks, 0, 1, 2);
    console.log(disks);
    console.log(cnts);

    createMessage(`All 5 disks have made it to the Destination!`);
    addStep(new EmptyStep());
    flushBuffer();

    this.setState({ steps: steps, messages: messages });
  }

  turnOffRunning() {
    this.setState({ running: false });
  }

  forward() {
    console.log("FORWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId === this.state.steps.length) return;

    let svg = d3.select(this.ref.current).select("svg");

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward(svg);

    this.setState({ stepId: this.state.stepId + 1 });

    d3.timeout(this.turnOffRunning, this.state.waitTime);
  }

  backward() {
    console.log("BACKWARD CLICKED");
    if (this.state.running) return;
    if (this.state.stepId - 1 < 0) return;

    let svg = d3.select(this.ref.current).select("svg");

    var stepId = this.state.stepId - 1;
    document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Towers of Hanoi!</h1>" : this.state.messages[stepId - 1];
    for (const step of this.state.steps[stepId]) step.backward(svg);

    this.setState({ stepId: stepId });
    d3.timeout(this.turnOffRunning, this.state.waitTime);
  }

  run() {
    if (!this.state.running) return;
    if (this.state.stepId === this.state.steps.length) {
      this.setState({ running: false });
      return;
    }

    let svg = d3.select(this.ref.current).select("svg");

    document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
    for (const step of this.state.steps[this.state.stepId]) step.forward(svg);

    this.setState({ stepId: this.state.stepId + 1 });
    d3.timeout(this.run, this.state.waitTime);
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
    console.log("RESTART CLICKED");
    if (this.state.stepId - 1 < 0) return;

    let svg = d3.select(this.ref.current).select("svg");

    var stepId = this.state.stepId;
    document.getElementById("message").innerHTML = "<h1>Welcome to Towers of Hanoi!</h1>";
    while (stepId - 1 >= 0) {
      for (const step of this.state.steps[--stepId]) step.backward(svg);
    }

    this.setState({ running: false });
    this.setState({ stepId: 0 });
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.size !== prevState.size) {
      console.log("SIZE CHANGED");
      this.initialize();
    } else if (this.state.numberOfDisks !== prevState.numberOfDisks) {
      this.towersOfHanoi(
        this.state.numberOfDisks,
        this.state.disks,
        this.state.ys,
        this.state.textxys
      );
      console.log("Sorted");
    } else if (this.state.running !== prevState.running) {
      this.run();
      console.log("We ran");
    }
  }

  render() {
    return (
      <div>
        <div class="center-screen">
          <button class="button" onClick={this.play}>Play</button>
          <button class="button" onClick={this.pause}>Pause</button>
          <button class="button" onClick={this.restart}>Restart</button>
          <button class="button" onClick={this.backward}>Step Backward</button>
          <button class="button" onClick={this.forward}>Step Forward</button>
        </div>
        <div class="center-screen">
          <span id="message">
            <h1>Welcome to Towers of Hanoi!</h1>
          </span>
        </div>
        <div ref={this.ref} class="center-screen"></div>
      </div>
    );
  }
}
