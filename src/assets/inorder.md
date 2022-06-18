# Overview

In-order traversal is used to print a tree in increasing order (when used on a binary search tree). It is the method used when wanting to obtain the values of the nodes in the increasing order.

# How does it work?

In-order traversal works by initially looking at the left sub-tree of a node. After the entire left sub-tree of the node has been traversed, the value of the node is then taken. Then the entire right sub-tree of the node is traversed. Hence, the following recursive function can be used to complete the in-order traversal of a tree:

- Traverse left sub-tree of a node in-order
- Take value of node
- Traverse right sub-tree of a node in-order

The iterative process for completing the in-order traversal is less efficient and more complex.

# Big O Stats

|                   | Worst Case | Average Case | Best Case |
|-------------------|------------|--------------|-----------|
| Iterative Runtime | O(n)       | O(n)         |  O(n)     |
| Recursive Runtime | O(n)       | O(n)         |  O(n)     |

# Tips

When attemping to traverse a tree by hand using pre-order, there is a simple and easy-to-use technique. The main idea behind the technique is to place points on the bottom of each node of the tree. For instance, lets say we have the following binary search tree:

![tree](./images/inorderAssets/sample-tree.png)

Now we place points at the bottom of each of the nodes. This can be seen with the following example:

![preorder](./images/inorderAssets/inorder-d1.png)

After we place the points, we draw a line starting from the left of the root node and continuously draw around the tree following around the nodes. This can be seen on the following example:

![preorder2](./images/inorderAssets/inorder-d2.png)

As we draw the line, any time we pass a point, we write down the value of the node. If we use this method on the example above, we get the following output:

2 3 7 10 13 23

# Further Information

For more information about in-order traversal, click [here](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR).

# References

Gif pulled from:

[https://commons.wikimedia.org/wiki/File:Inorder-traversal.gif](https://commons.wikimedia.org/wiki/File:Inorder-traversal.gif)