# Overview

Dijkstra's Algorithm finds the shortest path from a specific node in a graph, called the source node, to all other nodes in the graph. Dijkstra's Algorithm is a greedy algorithm that finds the most optimal solution at each step, but might not necessarily find the most optimal solution at the end.

# How does it work?

Every node in the graph is given a distance from the source node and a parent node. The distance is the sum of all edge values that must be traversed to reach the source node. The parent node is the first node that would have to be traveled to on the way to the source node.

At the beginning of the algorithm, every node in the graph is marked as unvisited, each node's parent is set to null and each node's distance to the source is set to infinity. The source node's distance is set to 0 however.

Each node is placed in a priority queue based on its distance from the source node. In each loop through the algorithm, the unvisited node with the shortest distance from the source is selected and all its unvisited neighbors are checked. If the sum of the distance of the current node + the edge value connecting it to its neighbor is less than the current distance the neighbor has, the neighbor's distance becomes that sum and its parent becomes the current node. Once all neighbors have been checked, the current node is marked as visited and is removed from the priority queue.

This process repeats until the priority queue is empty.

# Runtimes

|                 |     Worst Case     | 
|-----------------|--------------------|
| Time Complexity | O(E + V log(V))    | 

# Further information

For more information about Dijkstras algorithm, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/dijkstra-algorithm)
- [Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [GeeksforGeeks](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/)