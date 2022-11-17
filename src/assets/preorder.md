# Overview

Pre-order traversal is one of the three important tree traversal methods. It is considered the method used when wanting to make a copy of a binary search tree. This is due to the fact that pre-order obtains the current node first, followed by the left and right sub-trees respectively. Hence, if the output of pre-order traversal is used to create a binary search tree, an exact copy of the tree will be created. 

# How does it work?

Pre-order traversal works by initially taking the value of the node. After the value of the node has been taken, the entire left sub-tree is traversed using pre-order traversal. Then the entire right sub-tree of the node is traversed. Hence, the following recursive function can be used to complete the pre-order traversal of a tree:

- Take value of node
- Traverse left sub-tree of a node pre-order
- Traverse right sub-tree of a node pre-order

The iterative process for completing the pre-order traversal is less efficient and more complex.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(n)       | O(n)         | O(n)      |


# Further information

For more information about preorder traversal, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/tree-traversal)
- [Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)
- [GeeksforGeeks](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder//)