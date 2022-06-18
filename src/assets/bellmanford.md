# Overview
The Bellman-FDord Algorithm finds the shortest path from a specific node in a graph, called the source node, to all other nodes in the graph. The algorithm does not use a greedy aprroach. Instead, it continuously updates information across all nodes until none of them update anymore.

# How does it work?

Every node in the graph is given a distance from the source node and a parent node. The distance is the sum of all edge values that would have to be traversed in order to reach the source node. The parent node is the first node that would have to be traveled to on the way to the source node.

At the beginning of the algorithm, every node's parent is set to null and distance is set to infinity. The source node's distance is set to 0 however. 

On each loop, every node is visited. If the visited node can reach the source node, the visited node's neighbors are checked. Otherwise, it is skipped. If the distance from the visited node plus the value of the edge connecting it to its neighbor is less than the current distance the neighbor has, the neighbor's distance is updated to the visited node's distance + the edge value and its parent node is updated to the visited node.

If any nodes are updated during a loop, the loop repeats. Repeat until a loop makes no changes.

# Step by Step Example

Let's look at the following graph.

![graph](./images/graphAssets/graph.png)


We want to find the shortest path from node C to all other nodes in the graph.
The initial values will look like this:

|  | distance | parent |
|---|---|---|
|A|Infinity|null|
|B|Infinity|null|
|C|0|null|false|
|D|Infinity|null|

We'll visit each node in order, starting at A. Because there is no viable path for A to reach C, we'll skip it. The same will happen for B.

We'll next check C. Because it is the source node, it automatically has a valid path to itself. We then check all its neighbors and update them.
The new values will look like this:

![graph](./images/graphAssets/bf1.png)


|  | distance | parent |
|---|---|---|
|A|12|C|
|B|3|C|
|C|0|null|
|D|7|C|

Finally we'll check D. D does not update any of its neighbors because its distance plus the connecting edge value is greater than any of its neighbors' current distances.

Because a change happened this loop, we'll check each node again. This time, A has a route to C so we'll check its neighbors. The distance for B to reach C through A is greater than its current distance so nothing changes. Next we'll check B. It also has a route to C so we check its neighbors. The distance for A to reach C through B is less than the distance if A directly travels to C so A gets updated.

![graph](./images/graphAssets/bf2.png)


|  | distance | parent |
|---|---|---|
|A|5|B|
|B|3|C|
|C|0|null|
|D|7|C|

All other checks this loop do not make any changes.

We then loop again. In this third loop, no changes happen to any nodes, so we stop the algorithm.

# References

Gif pulled from:

[https://algorithms.discrete.ma.tum.de/graph-algorithms/spp-bellman-ford/index_en.html](https://algorithms.discrete.ma.tum.de/graph-algorithms/spp-bellman-ford/index_en.html)