# Overview

Depth-First Search (DFS) is an algorithm for searching through a tree or graph. It will start at the root node and traverse as far as it can before returning to the previous node

Depth-first search (DFS) is an algorithm for traversing or searching trees or graphs. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before returning to the previous node (backtracking).

# How does it work?

Depth-First Search (DFS) is a recursive function. It starts at the root (top) node of a tree and goes as far as it can down a given branch (path), then backtracks until it finds an unexplored path, and then explores it. The algorithm does this until the entire graph has been explored. This is done recursively, where it checks all nodes it can travel to, and once it reaches a node with no children, it will return to the previous node through backtracking.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(E + V)   |              |           |

# Further information

For more information about Depth First Search, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/graph-dfs)
- [Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)
- [GeeksforGeeks](https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/?ref=lbp)