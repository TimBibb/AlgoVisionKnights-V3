# Overview

Pre-order traversal is an important tree traversal method. It is the method used when wanting to make a copy of a binary search tree. This is due to the fact that pre-order obtains the current node first, followed by the left and right sub-trees respectively. Hence, if the output of pre-order traversal is used to create a binary search tree, an exact copy of the tree will be created. 

# How does it work?

Pre-order traversal works by initially taking the value of the node. After the value of the node has been taken, the entire left sub-tree is traversed using pre-order traversal. Then the entire right sub-tree of the node is traversed. Hence, the following recursive function can be used to complete the pre-order traversal of a tree:

- Take value of node
- Traverse left sub-tree of a node pre-order
- Traverse right sub-tree of a node pre-order

The iterative process for completing the pre-order traversal is less efficient and more complex.

# Big O Stats

|                   | Worst Case | Average Case | Best Case |
|-------------------|------------|--------------|-----------|
| Iterative Runtime | O(n)       | O(n)         |  O(n)     |
| Recursive Runtime | O(n)       | O(n)         |  O(n)     |

# Tips

When attemping to traverse a tree by hand using pre-order, there is a simple and easy-to-use technique. The main idea behind the technique is to place points on the left of each node of the tree. For instance, lets say we have the following binary search tree:

![tree](./images/preorderAssets/sample-tree.png)

Now we place points at the left of each of the nodes. This can be seen with the following example:

![preorder](./images/preorderAssets/preorder-d1.png)

After we place the points, we draw a line starting from the left of the root node and continuously draw around the tree following around the nodes. This can be seen on the following example:

![preorder2](./images/preorderAssets/preorder-d2.png)

As we draw the line, any time we pass a point, we write down the value of the node. If we use this method on the example above, we get the following output:

10 3 2 7 13 23

# Further Information

For more information about pre-order traversal, click [here](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR).

# References

Gif pulled from:

[https://commons.wikimedia.org/wiki/File:Preorder-traversal.gif](https://commons.wikimedia.org/wiki/File:Preorder-traversal.gif)