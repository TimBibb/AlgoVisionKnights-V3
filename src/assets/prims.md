# Overview

Prim's Algorithm is a greedy algorithm, meaning it uses the most optimal solution at a given moment when finding a solution. It is a minimum spanning tree algorithm that takes a graph as input and finds the subset of the edges of that graph which form a tree that includes every vertex or that has the minimum sum of weights among all the trees that can be formed from the graph.

For reference, a minimum spanning tree is a graph with the minimum number of edges needed to connect all the nodes together and whose sum value of all the edges is the smallest possible.

# How does it work?

Prim's Algorithm uses a priority queue. At the start of the algorithm, all nodes are marked as unvisited. An arbitrary node is then selected and all the edges connected to it are inserted into the queue. The node is then marked as visited.

In each loop of the algorithm, the edge with the smallest value is dequeued and the two nodes it connects are checked. If both nodes have previously been visited, the edge is discarded. Otherwise, the node which has not been visited will be checked, its edges are inserted into the priority queue, and the node will be marked as visited.

This process repeats until the queue is empty.

# Runtimes

|                 |   Worst Case   | Average Case | Best Case |
|-----------------|----------------|--------------|-----------|
| Time Complexity | O(E log(V))    |              |           |

# Further information

For more information Prim's algorithm, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/prim-algorithm)
- [Wikipedia](https://en.wikipedia.org/wiki/Prim%27s_algorithm)
- [GeeksforGeeks](https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/)