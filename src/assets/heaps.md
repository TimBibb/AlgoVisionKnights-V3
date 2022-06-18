# Overview
Heaps are a type of binary search tree built in a complete structure. In a maxheap, the largest value is the root and every node has a greater or equal value to its children. In a minheap, the smallest value is the root and every node has a value less than or equal to its children.

# How does it work?
Heaps are complete trees, meaning values are inserted at the lowest levels from left to right until the row is full.

When a new value is inserted into a heap, the value is inserted at the left-most available spot on the lowest row of the tree. It is then swapped upward in an action called percolation. The new value percolates up until it is in a spot that satisfies the heap structure. In a min heap, this means the new value's parent is less than the new value. In a max heap, this means the new value's parent is greater than the new value.

Because of a heap's structure, the only thing you can be certain about is the root is the smallest value in the set for a minheap and it is the largest value for a maxheap. Therefore, you cannot search through a heap to check if it has any particular value.

The only value you can remove from a heap is the root value. When the root is removed, the rightmost, lowest node is swapped into the root position. It is then percolated down until it forms a proper heap structure again.

In a minheap, downward percolation is done by comparing the parent's value to its childrens' values. If a child has a smaller value than the parent, the parent swaps with the child with the lesser value. This process repeats until the parent value is less than both of its children values.

In a maxheap, downward percolation uses the same general logic. The only difference is the parent will swap with the child with the greater value until the parent value is greater than both of its children values.

# Step by Step Example

Let's look at the following maxheap.

![initialHeap](./images/heapsAssets/initialHeap.png)

Each node has a greater value than any of its children.

If we want to insert 14 into this heap, we have to insert it as the left child of 1.

![addNewNode](./images/heapsAssets/addNewNode.png)

After that we percolate up. Since 14 is greater than 1, we swap the two nodes.

![percUp1](./images/heapsAssets/percUp1.png)

Then we'll compare 14 to 4. We'll percolate up again.

![percUp2](./images/heapsAssets/percUp2.png)

Then we'll compare 14 to 10. Once again, we'll percolate up.

![percUp3](./images/heapsAssets/percUp3.png)

Now 14 is the child of 15. Since 14 is less than 15 we are finished with insertion.

Now if we want to delete a node, we can only delete 15. 1 will be inserted at the root since its the rightmost, bottom node.

![deleteRoot](./images/heapsAssets/deleteRoot.png)

Now we have to percolate 1 down. Since 14 is the greater of its children, 1 will swap with 14.

![percDown1](./images/heapsAssets/percDown1.png)

Now we compare 1 with its children again. 10 is the greater child so we swap 1 and 10.

![percDown2](./images/heapsAssets/percDown2.png)

Now we'll compare 1 with its children again. 4 is the greater child so we swap 1 and 4.

![percDown3](./images/heapsAssets/percDown3.png)

Since 1 has no children, we are done percolating.

# How heaps are stored

Despite visualizing a heap as a binary tree, heaps are actually stored as arrays.

![heapArray](./images/heapsAssets/heapArray.png)

To make calculating parents and children easier, a heap often starts at index 1.
A heap keeps track of which index the next value will be inserted. Finding parents and children use the following formulas:

Find the left child of index i: i*2
Find the right child of index i: i*2 + 1
Find the parent of index i: i / 2

# Big-O Stats

|        | Worst Case | Average Case | Best Case |
| ------ | ---------- | ------------ | --------- |
| Insert | O(log n)   | O(log n)     | O(1)      |
| Delete | O(log n)   | O(log n)     | O(1)      |
| Get min/Get max | O(1)   | O(1)     | O(1)      |