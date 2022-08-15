import React from "react";
import * as d3 from "d3";
import "./avl.css";
import createDefaultGraph from "../../foundation/graph/CreateDefaultGraph";
import "../css/button.css";
import "../css/messages.css";
import Tree from 'react-d3-tree';

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
