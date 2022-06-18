# Overview

Breadth First Search (BFS) is a traversal or search algorithm for graphs and trees. This tutorial will discuss BFS for graphs that are represented by an adjacency matrix and list. Unlike Depth First Search, BFS starts at the initial node and explores all nodes that are in the current depth of the initial node.

# How does it work?

Let's say we are given this undirected graph with the starting node being **`A`** and we want to perform a BFS traversal on it:

![undirected](./images/graphAssets/graphs.png)

### Preparation:

The algorithm would first need to use 2 data structures that are important for this traversal:

1. **Queue**: A First-in-First-out (FIFO) data structure that only performs tail insertions and head deletions.We're going to use this queue to cache all the neighboring nodes of our current node.
2. **Array**: To keep track of all the nodes we have visited.
    - The array is of size **\|V\|** where **\|V\|** is the total number of nodes in our graph. Each element in this array is going to be a **boolean** with an initial value of **False**.
    - **True**: We have visited this node.
    - **False**: We have not visited this node.
    - We're going to call this array **visited**.

**Queue:**

| Queue |     |
| ----- | --- |

**Visited:**

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| False | False | False | False | False | False |

Since our starting node is **`A`**, we're going to enqueue **`A`** into our queue and mark it as visited in our boolean array:

| Queue | A   |
| ----- | --- |

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | False | False | False | False | False |

### Step 1:

Let's dequeue the next node, **`A`**, from our queue. This is our current node.

Now that we have node **`A`** in our hands, this is a perfect time to process this value and find its neighbors.

We are going to print out node **`A`**.

| Output | A   |
| ------ | --- |

**NOTE**: You can process the node in different ways, like storing it in another data structure for later use.

![undirected](./images/graphAssets/graphs.png)

According to the graph above, the neighboring nodes of **`A`** are nodes **`B`** and **`C`**. In the visited array, nodes **`B`** and **`C`** are marked as "unvisited".

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | False | False | False | False | False |

So we're going to store them into our queue and mark the nodes as "visited".

| Queue | B   | C   |
| ----- | --- | --- |

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | False | False | False |

### Step 2:

Dequeue node **`B`** from the queue and print it out.

| Output | A, B |
| ------ | ---- |

Look for **`B's`** neighboring nodes.

![undirected](./images/graphAssets/graphs.png)

Since we're dealing with an undirected graph, the nodes we see are **`A`**, **`C`**, and **`E`**. Nodes **`A`** and **`C`** are marked as "visited" so we won't store those in our queue.

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | False | False | False |

However, the only node we see that is marked as "unvisited" is node **`E`**, so we'll store that into our queue and mark it as "visited".

| Queue | C   | E   |
| ----- | --- | --- |

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | False | True  | False |

### Step 3:

Dequeue node **`C`** from the queue and print it out.

| Output | A, B, C |
| ------ | ------- |

Look for **`C's`** neighboring nodes.

![undirected](./images/graphAssets/graphs.png)

Here nodes **`A`**, **`B`**, and **`E`** are all marked as "visited", so we will move on to the next node in our queue.

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | False | True  | False |

| Queue | E   |
| ----- | --- |

### Step 4:

Dequeue **`E`** and print it:

| Output | A, B, C, E |
| ------ | ---------- |

Look for **`E's`** neighboring nodes.

![undirected](./images/graphAssets/graphs.png)

We found nodes **`B`**, **`C`**, **`D`**, and **`F`**.

**`B`** and **`C`** are marked "visited" and **`D`** and **`F`** are marked as "unvisited".

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | False | True  | False |

Store **`D`** and **`F`** into our queue and mark them as "visited":

| Queue | D   | F   |
| ----- | --- | --- |

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | True  | True  | True  |

### Step 5:

Dequeue **`D`** and print it:

| Output | A, B, C, E, D |
| ------ | ------------- |

**`D's`** neigboring node is **`E`** and is marked as "visited":

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | True  | True  | True  |

So we move on to the next queue item.

### Step 6:

Dequeue **`F`** and print it:

| Output | A, B, C, E, D, F |
| ------ | ---------------- |

**`F's`** neigboring node is **`E`** and is marked as "visited":

| 0 (A) | 1 (B) | 2 (C) | 3 (D) | 4 (E) | 5 (F) |
| ----- | ----- | ----- | ----- | ----- | ----- |
| True  | True  | True  | True  | True  | True  |

### Step 7:

Our queue is finally empty!!

| Queue |     |
| ----- | --- |

This means we have searched through every single node in our graph and our final BFS traversal output is:

| Output | A, B, C, E, D, F |
| ------ | ---------------- |

# Different Valid BFS Traversals

Let's take another look at our graph.

![undirected](./images/graphAssets/graphs.png)

In the previous section, we managed to get BFS traversal of:

| A, B, C, E, D, F |
| ---------------- |

There are other valid BFS traversals we can get from this graph, assuming node **`A`** is still our starting node:

| Valid BFS Traversals |
| -------------------- |
| A, B, C, E, D, F     |
| A, B, C, E, F, D     |
| A, C, B, E, D, F     |
| A, C, B, E, F, D     |

That is total of 4 valid traversals!

# Time and Space Complexities

The time and space complexities can differ depending on how the traversal is implemented.

### Time Complexity

| Implementation       | Worst Case       |
| -------------------- | ---------------- |
| **Adjacency List**   | O(\|V\| + \|E\|) |
| **Adjacenct Matrix** | O(\|V\|^2)       |

### Space Complexity

| Implementation       | Worst Case |
| -------------------- | ---------- |
| **Adjacency List**   | O(\|V\|)   |
| **Adjacenct Matrix** | O(\|V\|)   |

-   **\|V\|**: Total number of nodes in a given graph.
-   **\|E\|**: Total number of edges in a given graph.

# References

GIF pulled from:

[https://www.codeabbey.com/index/task_view/breadth-first-search](https://www.codeabbey.com/index/task_view/breadth-first-search)
