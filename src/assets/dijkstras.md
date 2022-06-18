# Overview

Dijkstra's Algorithm finds the shortest path from a specific node in a graph, called the source node, to all other nodes in the graph. Dijkstra's Algorithm is a greedy algorithm meaning it finds the most optimal solution at each step, but might not necessarily find the most optimal solution at the end.

# How does it work?

Every node in the graph is given a distance from the source node and a parent node. The distance is the sum of all edge values that would have to be traversed in order to reach the source node. The parent node is the first node that would have to be traveled to on the way to the source node.

At the beginning of the algorithm, every node in the graph is marked as unvisited, each node's parent is set to null and each node's distance to the source is set to infinity. The source node's distance is set to 0 however.

Each node is placed in a priority queue based on their distance from the source node. In each loop through the algorithm, the unvisited node with the shortest distance from the source is selected and all of its unvisited neighbors are checked. If the sum of the distance of the current node + the edge value connecting it to its neighbor is less than the current distance the neighbor has, the neighbor's distance becomes that sum and its parent becomes the current node. Once all neighbors have been checked, the current node is marked as visited and is removed from the priority queue.

This process repeats until the priority queue is empty.

# Step by Step Example

Let's look at the following graph.

![graph](./images/graphAssets/graph.png)


We want to find the shortest path from node A to all other nodes in the graph.
The initial values will look like this:

|  | distance | parent | visited |
|---|---|---|---|
|A|0|null|false|
|B|Infinity|null|false|
|C|Infinity|null|false|
|D|Infinity|null|false|

Because A has the shortest path, we'll select that node and check A's neighbors, B and C.
A's distance + the edge value connecting A and B is less than B's current distance so B will be updated. The same thing happens for C. 

After checking all of A's unvisited neighbors, the node values will look like this:

![graph](./images/graphAssets/dijkstra1.png)


|  | distance | parent | visited |
|---|---|---|---|
|A|0|null|true|
|B|2|A|false|
|C|12|A|false|
|D|Infinity|null|false|

In the next loop, we'll check B's neighbors because B is the unvisited node with the shortest distance. We will not check its neighbor A because that node was already visited. The sum of B's distance plus the edge connecting B and C is less than C's current distance so C will be updated. The same is true for D.

After checking all of B's unvisited neighbors, the node values will look like this:

![graph](./images/graphAssets/dijkstra2.png)


|  | distance | parent | visited |
|---|---|---|---|
|A|0|null|true|
|B|2|A|true|
|C|5|B|false|
|D|7|B|false|

In the next loop, C will be selected. The only unvisited neighbor it has is D, however C's distance plus the edge value connecting C and D is greater than D's current distance so nothing is changed.

![graph](./images/graphAssets/dijkstra3.png)

# References

Gif pulled from:

[https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)