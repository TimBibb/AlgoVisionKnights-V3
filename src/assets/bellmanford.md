# Overview

The Bellman-Ford Algorithm finds the shortest path from a specific node in a graph, called the source node, to all other nodes in the graph (weighted digraph). The algorithm does not use a greedy approach. Instead, it continuously updates information across all nodes until none of them update anymore.

# How does it work?

Every node in the graph is given a distance from the source node and a parent node. The distance is the sum of all edge values that must be traversed to reach the source node. The parent node is the first node that would have to be traveled to on the way to the source node.

At the beginning of the algorithm, every node's parent is set to null and distance is set to infinity. The source node's distance is set to 0 however. 

On each loop, every node is visited. If the visited node can reach the source node, the visited node's neighbors are checked. Otherwise, it is skipped. If the distance from the visited node plus the value of the edge connecting it to its neighbor is less than the current distance the neighbor has, the neighbor's distance is updated to the visited node's distance + the edge value and its parent node is updated to the visited node.

If any nodes are updated during a loop, the loop repeats. Repeat until a loop makes no changes.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(V*E)     |              |   O(E)    |

# Further information

For more information about Bellman-Ford algorithm, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/bellman-ford-algorithm)
- [Wikipedia](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm)
- [GeeksforGeeks](https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/)