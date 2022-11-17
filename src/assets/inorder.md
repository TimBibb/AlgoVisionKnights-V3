# Overview

In-order traversal is one of the three important tree traversal methods. In-order traversal is used to print a tree in increasing order (when used on a binary search tree), thus it is used to obtain the values of the nodes in the respective order mentioned.

# How does it work?

In-order traversal works by initially looking at the left sub-tree of a node. After the entire left sub-tree of the node has been traversed, the value of the node is then taken. Then the entire right sub-tree of the node is traversed. Hence, the following recursive function can be used to complete the in-order traversal of a tree:

- Traverse left sub-tree of a node in-order
- Take value of node
- Traverse right sub-tree of a node in-order

The iterative process for completing the in-order traversal is less efficient and more complex.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(n)       | O(n)         | O(n)      |

# Further information

For more information about inorder traversal, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/tree-traversal)
- [Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)
- [GeeksforGeeks](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder//)