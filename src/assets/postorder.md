# Overview

Post-order traversal is one  of the important tree traversal methods. Post-order traversal is mainly used to delete a tree. This is because post-order traversal obtains the left and right sub-tree of a node before looking at the node itself.

# How does it work?

Post-order traversal works by initially looking at the left sub-tree of a node. After the entire left sub-tree of the node has been traversed, the entire right sub-tree of the node is also traversed. Then the value of the node is then taken. Hence, the following recursive function can be used to complete the post-order traversal of a tree:

- Traverse left sub-tree of the node post-order
- Traverse right sub-tree of the node post-order
- Take value of the node

The iterative process for completing the post-order traversal is less efficient and more complex.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(n)       | O(n)         | O(n)      |

# Further information

For more information about postorder traversal, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/tree-traversal)
- [Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)
- [GeeksforGeeks](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder//)