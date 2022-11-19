# Overview

Kruskal's Algorithm is one of the greedy algortihms we learn in Computer Science. This algorithm is used to find the Minimum Spanning Tree(MST) of a graph, which is the minimum amount of edges with the lowest weight while connecting to each node.

# How does it work?

The Kruskal's algorithm needs to have a graph that is connected with weighted undirected edges as its input. Once with the graph it will grab all the edges with its weights and put them in a priority queue (a sorted list going from lowest to highest). It then will dequeue from that list and grab the smallest edge in the graph and the two nodes that are connected with it and add them to the MST.

After the first run it will continue taking from the priority queue the smallest edge and checking it to see if by adding it to the MST it completes a cycle (A cycle or loop is when traversing from a node can come back to it), if it does then we do not add this edge into the MST. Once the queue is empty we would have created our MST which has "n" nodes and "n-1" edges.

# Runtimes

|                 |   Worst Case   | Average Case | Best Case |
|-----------------|----------------|--------------|-----------|
| Time Complexity | O(E log(E))    |              |           |

# Further information

For more information Kruskal's algorithm, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/kruskal-algorithm)
- [Wikipedia](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm)
- [GeeksforGeeks](https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/?ref=lbp)