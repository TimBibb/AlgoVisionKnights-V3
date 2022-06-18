import randInRange from "../../utils/RandInRange";
import DirectedEdge from "./DirectedEdge";
import LabeledNode from "./LabeledNode";
import UndirectedEdge from "./UndirectedEdge";
import WeightedDirectedEdge from "./WeightedDirectedEdge";
import WeightedUndirectedEdge from "./WeightedUndirectedEdge";

// Creates the default graph that can be used for any graph algorithm
// Used the booleans isWeighted and isDirected to give each property
// Directed edges don't exist yet, so leave it as false
function createDefaultGraph(ref, isWeighted = false, isDirected = false) {
  let numberOfNodes = 6;
  let numberOfEdges = 9;
  var edges = [
    [5, 3],
    [4, 5],
    [2, 4],
    [3, 4],
    [1, 3],
    [1, 2],
    [0, 1],
    [3, 2],
    [2, 0],
  ];

  let graph = {
    numberOfNodes: numberOfNodes,
    numberOfEdges: numberOfEdges,
    adjacencyList: Array.from({ length: numberOfNodes }, () => []),
    edges: edges,
    edgeInfo: [],
    nodeInfo: [],
  };

  // these are percentages
  var xs = [20, 35, 35, 65, 65, 80];
  var ys = [50, 15, 85, 15, 85, 50];

  for (let i = 0; i < numberOfEdges; i++) {
    let [node1, node2] = edges[i];
    let [x1, y1] = [xs[node1], ys[node1]];
    let [x2, y2] = [xs[node2], ys[node2]];
    let weight = randInRange(1, 20);

    let edge = null;

    if (isWeighted) {
      if (isDirected) {
        // weighted directed graph

        edge = new WeightedDirectedEdge(
          ref,
          "edge" + i,
          "weightback" + i,
          "weight" + i,
          "wing1_" + i,
          "wing2_" + i,
          x1 + "%",
          y1 + "%",
          x2 + "%",
          y2 + "%",
          weight
        );

        graph.adjacencyList[node1].push([node1, node2, weight, i]);
        edges[i].push(weight);
        edges[i].push(i);
      } else {
        // weighted undirected graph

        edge = new WeightedUndirectedEdge(
          ref,
          "edge" + i,
          "weightback" + i,
          "weight" + i,
          x1 + "%",
          y1 + "%",
          x2 + "%",
          y2 + "%",
          weight
        );

        graph.adjacencyList[node1].push([node1, node2, weight, i]);
        graph.adjacencyList[node2].push([node2, node1, weight, i]);
        edges[i].push(weight);
        edges[i].push(i);
      }
    } else {
      if (isDirected) {
        // unweighted directed graph

        edge = new DirectedEdge(
          ref,
          "edge" + i,
          "wing1_" + i,
          "wing2_" + i,
          x1 + "%",
          y1 + "%",
          x2 + "%",
          y2 + "%",
          "visible"
        );

        graph.adjacencyList[node1].push([node1, node2, i]);
        edges[i].push(i);
      } else {
        // unweighted undirected graph

        edge = new UndirectedEdge(
          ref,
          "edge" + i,
          x1 + "%",
          y1 + "%",
          x2 + "%",
          y2 + "%",
          "visible"
        );

        graph.adjacencyList[node1].push([node1, node2, i]);
        graph.adjacencyList[node2].push([node2, node1, i]);
        edges[i].push(i);
      }
    }
    graph.edgeInfo.push(edge);
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
    graph.nodeInfo.push(node);
  }

  return graph;
}

export default createDefaultGraph;
