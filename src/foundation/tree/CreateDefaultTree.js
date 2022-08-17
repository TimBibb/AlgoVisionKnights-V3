import randInRange from "../../utils/RandInRange";
import Edge from "./Edge";
import LabeledNode from "../graph/LabeledNode";

function createDefaultTree(ref){
    let numberOfNodes = 6;
    let numberOfEdges = 5;
    var edges = [
        [0, 1],
        [0, 2],
        [1, 3],
        [1, 4],
        [2, 5],
    ];

    let tree = {
        numberOfNodes: numberOfNodes,
        numberOfEdges: numberOfEdges,
        adjacencyList: Array.from({length: numberOfNodes}, () => []),
        edges: edges,
        nodeInfo: [],
    };

    var xs = [50, 30, 70, 15, 45, 85];
    var ys = [10, 20, 20, 40, 40, 40];

    for (let i = 0; i < numberOfEdges; i++) {
        let [node1, node2] = edges[i];
        let [x1, y1] = [xs[node1], ys[node1]];
        let [x2, y2] = [xs[node2], ys[node2]];
    
        let edge = null;
    
        edge = new Edge(
              ref,
              "edge" + i,
              x1 + "%",
              y1 + "%",
              x2 + "%",
              y2 + "%",
              "visible"
        );
    
        tree.adjacencyList[node1].push([node1, node2, i]);
        tree.adjacencyList[node2].push([node2, node1, i]);
        edges[i].push(i);
    }
      
    
    for (let i = 0; i < numberOfNodes; i++) {
        let node = new LabeledNode(
          ref,
          "node" + i,
          "label" + i,
          xs[i] + "%",
          ys[i] + "%",
          i,
          "visible",
          "gray"
        );
        tree.nodeInfo.push(node);
    }
    
    return tree;
}
    
export default createDefaultTree;