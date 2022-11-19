# Overview

AVL Trees are a type of Binary Search Tree that can rebalance themselves to ensure an even distribution of values between its left and right subtrees. Because AVL trees can rebalance themselves, all traversal functions are guaranteed to run in logarithmic time.

# How does it work?

AVL trees work exactly as Binary Search Tree does, however it will have an extra level value to take care of, the balance of each node. This balance is the difference between the height of its right node subtree and the left node subtree, if it is greater than 1, then the nodes need to be rotated to rebalance it. There are two rotations that can be done that end up creating four different cases. So basically, the algorithm will insert as a BST would and then it would go up the three checking and updating the balances of each node and if it finds one unbalanced then it performs any of the rotations with it.

1. Right-Right Rotation

![right-right case](./images/avlAssets/right-right.gif)

In this tree, Node 4's balance factor is -2 because its right subtree is two node levels higher than its left, and its right subtree is right heavy. This is a Right-Right case scenario and only requires a left rotation on node 4. The subtree at node 6 is made the new right subtree of node 4, and node 4 is made node 8's left subtree.

2. Left-Left Rotation

![Left-Left case](./images/avlAssets/left-left.gif)

In this tree, Node 12's balance factor is 2 because its left subtree is two node levels higher than its right, and its left subtree is left heavy. This is a Left-Left case scenario and only requires a right rotation on node 12. The subtree at node 10 is made the new left subtree of node 12, and node 12 is made node 8's right subtree.

3. Left-Right Rotation

![Left-Right Rotation](./images/avlAssets/left-right.gif)

In this tree, Node 12's balance factor is 2 because its left subtree is two node levels higher than its right, and its left subtree is right heavy. This is a Left-Right case scenario, and requires a left rotation on node 4 and then a right rotation on node 12. To make the left rotation, the subtree at node 6 is made the new right subtree of node 4, and node 4 is made the new left subtree of node 8. To make the right rotation, the subtree at node 10 is made the new left subtree of node 12, and node 12 is made node 8's right subtree.

4. Right-Left Rotation

![Right-Left Rotation](./images/avlAssets/right-left.gif)

In this tree, Node 4's balance factor is -2 because its right subtree is two node levels higher than its left, and its right subtree is left heavy. This is a Right-Left case scenario, and requires a right rotation on node 12 and then a left rotation on node 4. To make the right rotation, the subtree at node 10 is made the new left subtree of node 12, and node 12 is made the new right subtree of node 8. To make the left rotation, the subtree at node 6 is made the new right subtree of node 4, and node 4 is made node 8's left subtree.

# Runtimes

| Time Complexity | Worst Case | Average Case |
|-----------------|------------|--------------|
| Space           | O(n)       | O(n)         |
| Search          | O(log(n))  | O(log(n))    |
| Insert          | O(log(n))  | O(log(n))    |
| Delete          | O(log(n))  | O(log(n))    |

# Further information

For more information about AVL trees, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/avl-tree)
- [Wikipedia](https://en.wikipedia.org/wiki/AVL_tree)
- [GeeksforGeeks](https://www.geeksforgeeks.org/insertion-in-an-avl-tree/)