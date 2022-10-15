import React from "react";
import * as d3 from "d3";
import "./avl.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import "../css/button.css";
import "../css/messages.css";
import Tree from 'react-d3-tree';

class HighlightNodeStep {
	constructor(value) {
		this.value = value;
	}
	forward(svg) {
		svg.select("#" + this.ids[this.id1]).selectAll("rect, text, line, #arrow").attr("visibility", "visible");
		svg.select("#" + this.ids[this.id1]).selectAll("text").text(this.element);
	}
	fastForward(svg) {
		this.forward(svg);
	}
	backward(svg) {
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#EF3F88");
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "gray");
		svg.selectAll(".qTxt").attr("visibility", "hidden");

		if (this.id1 !== this.id2) {
			svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		}
	}
}

export default class avl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      injectedNodesCount: 0,
      data:
      {
        "name": 15,
        "parent": "null",
        "visible": true,
        "children": [
          {
            "name": 10,
            "parent": "Top Level",
            "visible": true,
            "children": [{"visible": false},{"visible": false}]
          },
          {
            "name": 20,
            "parent": "Top Level",
            "visible": true,
            "children": [{"visible": false},{"visible": false}]
          }
        ]
      }
    };

    this.addRandom = this.addRandom.bind(this);
    this.pathClassChanger = this.pathClassChanger.bind(this)
  }

  addRandom() {
    const nextData = JSON.parse(JSON.stringify(this.state.data));
    var target = nextData;
    var newVal = Math.floor(Math.random() * 25);
    if (!('children' in this.state.data)) {
      target.push({
        "name": newVal,
        "parent": "null",
        "visible": true,
        "children": [{"visible": false}, {"visible": false}]
      });
      this.setState({
        data: nextData
      });
      return;
    }

    while (true) {
      console.log(target);
      if (target.name > newVal) {
        // set target to the left child
        if ("name" in target.children[0]) {
          target = target.children[0];
        } else {
          target.children[0] = {
            "name": newVal,
            "parent": target.name,
            "visible": true,
            "children": [{"visible": false}, {"visible": false}]
          };
          break;
        }
      } else if (target.name < newVal) {
        // set target to right child
        if ("name" in target.children[1]) {
          target = target.children[1];
        } else {
          target.children[1] = {
            "name": newVal,
            "parent": target.name,
            "visible": true,
            "children": [{"visible": false}, {"visible": false}]
          };
          break;
        }
      } else {
        return;
      }
    }
    this.setState({
      data: nextData
    });
  }

  pathClassChanger({ source, target }, orientation) {
    // hide any links for phantom nodes
    if (target.data.visible == false) {
      return "hidden-link";
    } else {
      return "custom-link"
    }
  }

  // restart(){
  //   console.log("RESTART CLICKED");
  //   d3.select(this.ref.current).select("svg").remove();
  //   document.getElementById("message").innerHTML = "<h1>Welcome to Binary Search Tree!</h1>";
  //   i = 0;
  //   j = 0;
  //   this.setState({maxLevel: -1})
  //   this.root = null;
  //   this.initialize();
  // }

  // backward(){
  //     console.log("BACKWARDS CLICKED");
  // }

  // forward(){
  //     console.log("FORWARD CLICKED");
  // }

  // run(){
  //     console.log("RUN CLICKED");

  // }

  // turnOffRunning(){
  //     console.log("TURNOFF CLICKED");
  // }

  // componentDidMount() {
  //     this.initialize();
  // }

  render() {
    return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
        <button onClick={this.addRandom}>
          Add random
        </button>
        <Tree data={this.state.data}
          pathClassFunc={this.pathClassChanger}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          collapsible={false}
          orientation='vertical' />
      </div>
    );
  }
}
