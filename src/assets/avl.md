# Overview

AVL Trees are a type of Binary Search Tree which can rebalance itself to ensure an even distribution of values between its left and right subtrees. Because AVL trees can rebalance themselves, all traversal functions are guaranteed to run in logarithmic time.

# How does it work?

Along with the value and a left and right child, each tree node also has a balance factor. The balance factor is the difference in height between the node's left and right subtrees. If the difference is greater than 1, nodes are rotated to rebalance it. There are two types of rotations and four rotation cases depending on how the unbalanced nodes are arranged. As an insert function goes back up the tree, it updates the balance factor of all the nodes it visited in the initial insertion, and checks if the factor requires a rotation.

# Rotations

![Rotation Examples](./images/avlAssets/avlRotations.gif)

When we start a rotation, we choose a node to be the pivot. This node is the root of the subtree we are rotating. The type of rotation executed depends on the way you want to rebalance it. If you want to make the subtree more right heavy, you perform a right rotation, and vice versa with a left rotation. A tree in rotation is divided into 5 parts, the old root, the new root, the subtree of the old root and the two subtrees of the new root. For an example, lets go over the process for a right rotation. First, we take the left subtree of the root and make a copy of it. This will be the new root. We then take the right subtree of the new root and make it the old root's left subtree. We then make the old root the right subtree for the new root and then return the new root to the old position of the old root.

In addition to the two types of rotations, there are four cases where you would need to use them. The names of these cases take the form of X-Y rotation case, where X is the balance factor of the tree's subtrees and Y is the balance factor of the deepest subtree of the root. For example, A tree that is a Right-Left rotation case means that the tree is right heavy and the right subtree is left heavy.

## Right-Right Case

![right-right case](./images/avlAssets/right-right.gif)

In this tree, Node 4's balance factor is -2 because its right subtree is two node levels higher than its left, and its right subtree is right heavy. This is a Right-Right case scenario and only requires a left rotation on node 4. The subtree at node 6 is made the new right subtree of node 4, and node 4 is made node 8's left subtree.

## Left-Left Case

![Left-Left case](./images/avlAssets/left-left.gif)

In this tree, Node 12's balance factor is 2 because its left subtree is two node levels higher than its right, and its left subtree is left heavy. This is a Left-Left case scenario and only requires a right rotation on node 12. The subtree at node 10 is made the new left subtree of node 12, and node 12 is made node 8's right subtree.

## Right-Left Case

![Right-Left Rotation](./images/avlAssets/right-left.gif)

In this tree, Node 4's balance factor is -2 because its right subtree is two node levels higher than its left, and its right subtree is left heavy. This is a Right-Left case scenario, and requires a right rotation on node 12 and then a left rotation on node 4. To make the right rotation, the subtree at node 10 is made the new left subtree of node 12, and node 12 is made the new right subtree of node 8. To make the left rotation, the subtree at node 6 is made the new right subtree of node 4, and node 4 is made node 8's left subtree.

## Left-Right Case

![Left-Right Rotation](./images/avlAssets/left-right.gif)

In this tree, Node 12's balance factor is 2 because its left subtree is two node levels higher than its right, and its left subtree is right heavy. This is a Left-Right case scenario, and requires a left rotation on node 4 and then a right rotation on node 12. To make the left rotation, the subtree at node 6 is made the new right subtree of node 4, and node 4 is made the new left subtree of node 8. To make the right rotation, the subtree at node 10 is made the new left subtree of node 12, and node 12 is made node 8's right subtree.

# Why AVL?

The main advantage to using AVL trees over Binary Search Trees is that AVL reduces the worse case runtime for operations from O(n) to O(log n). BSTs can devolve into essentially linked lists if given the right conditions, but AVL trees can rotate linear sections of BSTs into more complete trees. This reduces the amount of nodes an operation needs to traverse to get to the bottom nodes of a tree.

# Big O Stats

|        | Worst Case | Average Case |
| ------ | ---------- | ------------ |
| Insert | O(log n)   | O(log n)     |
| Delete | O(log n)   | O(log n)     |
| Search | O(log n)   | O(log n)     |

# References

Gif pulled from:

[https://commons.wikimedia.org/wiki/File:AVL_Tree_Example.gif](https://commons.wikimedia.org/wiki/File:AVL_Tree_Example.gif)
