# Overview
Prim's Algorithm turns a graph into a minimum spanning tree. A minimum spanning tree is a graph with the minimum number of edges needed to connect all the nodes together and whose sum value of all the edges is the smallest possible.

Prim's Algorithm is a greedy algorithm, meaning it uses the most optimal solution at a given moment when finding a solution.

# How does it work?
Prim's Algorithm uses a priority queue. At the start of the algorithm, all nodes are marked as unvisited. An arbitrary node is then selected and all the edges connected to it are inserted into the queue. The node is then marked as visited.

In each loop of the algorithm, the edge with the smallest value is dequeued and the two nodes it connects are checked. If both nodes have previously been visited, the edge is discarded. Otherwise, the node which has not been visited will be checked, its edges are inserted into the priority queue, and the node will be marked as visited.

This process repeats until the queue is empty.

# Step by Step Example

Let's look at the following graph.

![graph](./images/graphAssets/graph.png)

We want to create a minimum spanning tree. The nodes will all be initially unvisited and the priority queue will be empty.

The initial values will look like this:

|  | visited |
|---|---|
|A|false|
|B|false|
|C|false|
|D|false|

Priority queue: (empty)

We'll arbitrarily begin at node D. We'll insert the edges connecting D to B and C into the queue and then mark D as visited.

![graph](./images/graphAssets/prim1.png)


|  | visited |
|---|---|
|A|false|
|B|false|
|C|false|
|D|true|

Priority queue: (B,D), (C,D)

Next, we'll dequeue the edge connecting B and D. B is unvisited so we will enqueue the edges connecting to B and then mark B as visited.

![graph](./images/graphAssets/prim2.png)


|  | visited |
|---|---|
|A|false|
|B|true|
|C|false|
|D|true|

Priority queue: (A,B), (B,C), (C,D)

Next, we dequeue the edge connecting A and B. A is unvisited so we enqueue its edges and mark A as visited.

![graph](./images/graphAssets/prim3.png)


|  | visited |
|---|---|
|A|true|
|B|true|
|C|false|
|D|true|

Priority queue: (B,C), (C,D), (A,C)

Next, we dequeue the edge connecting B and C. C is unvisited so we enqueue its edges and mark it as visited.

![graph](./images/graphAssets/prim4.png)


|  | visited |
|---|---|
|A|true|
|B|true|
|C|true|
|D|true|

Priority queue: (C,D), (A,C)

In the next loop, we dequeue the edge connecting C and D. Both nodes were previously visited so the edge is discarded. In the final loop, the edge connecting A and C is dequeued. Both nodes were also visited so the edge is also discarded.

![graph](./images/graphAssets/prim5.png)

# References

Gif pulled from:

[https://gfycat.com/fortunateshrillhen](https://gfycat.com/fortunateshrillhen)