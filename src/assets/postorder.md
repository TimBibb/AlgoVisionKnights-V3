# Overview

Post-order traversal is mainly used to delete a tree. This is because post-order traversal obtains the left and right sub-tree of a node before looking at the node itself.

# How does it work?

Post-order traversal works by initially looking at the left sub-tree of a node. After the entire left sub-tree of the node has been traversed, the entire right sub-tree of the node is also traversed. Then the value of the node is then taken. Hence, the following recursive function can be used to complete the post-order traversal of a tree:

- Traverse left sub-tree of the node post-order
- Traverse right sub-tree of the node post-order
- Take value of the node

The iterative process for completing the post-order traversal is less efficient and more complex.

# Big O Stats

|                   | Worst Case | Average Case | Best Case |
|-------------------|------------|--------------|-----------|
| Iterative Runtime | O(n)       | O(n)         |  O(n)     |
| Recursive Runtime | O(n)       | O(n)         |  O(n)     |

# Tips

When attemping to traverse a tree by hand using pre-order, there is a simple and easy-to-use technique. The main idea behind the technique is to place points on the right of each node of the tree. For instance, lets say we have the following binary search tree:

![tree](./images/postorderAssets/sample-tree.png)

Now we place points at the right of each of the nodes. This can be seen with the following example:

![preorder](./images/postorderAssets/postorder-d1.png)

After we place the points, we draw a line starting from the left of the root node and continuously draw around the tree following around the nodes. This can be seen on the following example:

![preorder2](./images/postorderAssets/postorder-d2.png)

As we draw the line, any time we pass a point, we write down the value of the node. If we use this method on the example above, we get the following output:

2 7 3 23 13 10

# Further Information

For more information about post-order traversal, click [here](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR).

# References

Gif pulled from:

[https://commons.wikimedia.org/wiki/File:Postorder-traversal.gif](https://commons.wikimedia.org/wiki/File:Postorder-traversal.gif)