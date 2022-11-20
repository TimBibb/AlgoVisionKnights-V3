# Overview

Heaps are a type of binary search tree built in a complete structure. In a maxheap, the largest value is the root and every node has a greater or equal value to its children. In a minheap, the smallest value is the root and every node has a value less than or equal to its children.

# How does it work?

Heaps are complete trees, meaning values are inserted at the lowest levels from left to right until the row is full.

When a new value is inserted into a heap, the value is inserted at the left-most available spot on the lowest row of the tree. It is then swapped upward in an action called percolation. The new value percolates up until it is in a spot that satisfies the heap structure. In a min heap, this means the new value's parent is less than the new value. In a max heap, this means the new value's parent is greater than the new value.

Because of a heap's structure, the only thing you can be certain about is the root is the smallest value in the set for a minheap and it is the largest value for a maxheap. Therefore, you cannot search through a heap to check if it has any particular value.

The only value you can remove from a heap is the root value. When the root is removed, the rightmost, lowest node is swapped into the root position. It is then percolated down until it forms a proper heap structure again.

In a minheap, downward percolation is done by comparing the parent's value to its childrens' values. If a child has a smaller value than the parent, the parent swaps with the child with the lesser value. This process repeats until the parent value is less than both of its children values.

In a maxheap, downward percolation uses the same general logic. The only difference is the parent will swap with the child with the greater value until the parent value is greater than both of its children values.

# Runtimes

| Time Complexity | Worst Case | Average Case | Best Case  |
|-----------------|------------|--------------|------------|
| Get min/Get max | O(1)       | O(1)         | O(1)       |
| Insert          | O(log(n))  | O(log(n))    | O(1)       |
| Delete          | O(log(n))  | O(log(n))    | O(1)       |

# Further information

For more information about heaps, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/heap-data-structure)
- [Wikipedia](https://en.wikipedia.org/wiki/Heap_(data_structure))
- [GeeksforGeeks](https://www.geeksforgeeks.org/heap-data-structure/)