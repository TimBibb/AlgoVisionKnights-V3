# Overview

Breadth-First Search (BFS) is a traversal or search algorithm for graphs and trees. Unlike Depth-First Search (DFS), Breadth-First Search (BFS) starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. Extra memory, usually a queue, is needed to keep track of the child nodes that were encountered but not yet explored. 

# How does it work?

Graph traversal requires the algorithm to visit, check, and/or update every single un-visited node in a tree-like structure. Graph traversals are categorized by the order in which they visit the nodes on the graph.

BFS algorithm starts the operation from the first or starting node in a graph and traverses it thoroughly. Once it successfully traverses the initial node, then the next non-traversed vertex in the graph is visited and marked.

Hence, you can say that all the nodes adjacent to the current vertex are visited and traversed in the first iteration.

We continue until each node in the graph have been visited and updated.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(E + V)   |              |           |

# Further information

For more information about Breadth First Search, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/graph-bfs)
- [Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)
- [GeeksforGeeks](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/)