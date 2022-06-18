# Overview

Binary Search Trees are data structures that store data, called "keys", within nodes in a way that makes searching, inserting and deleting faster than arrays if you are not constantly keeping track of indices. It does this by its node structure, which follows these 3 rules:

1. A node has at least three elements: a key, a "left" subtree, and a "right" subtree.
2. The key is greater than any key stored within its "left" subtree.
3. The key is less than any key stored in its "right" subtree.

The topmost node in a binary search tree is called a "root", and any nodes that are descended from a node are called its "children" or "subtrees", and nodes that share the same predecessor, or "parent" are called "siblings". A node with no children is called a "leaf", "external", or "terminal" node, while nodes that have children are called "internal" nodes.

# Node Structure

A binary search tree node is a structure with three main parts. The first part is a number called the key. When creating a node, the key is always initialized to whatever number you're storing in the node. The left and right subtrees for a node are stored as pointers to two other nodes, which serve as the roots to their respective subtrees. When initializing a new leaf node, make the pointers to the left and right children null to signify that the leaf node has no children.

# Search

Searching through a binary search tree is a simple algorithm that follows the following steps, starting with the tree's root:

SearchNode:
1. If the current node's key is null, the key you are searching for is not in the tree.
2. If the current node's key is equal to the key your searching for, return the node.
3. If the current node's key is greater than the key you are searching for, repeat the previous steps with the current node's left child.
4. If the current node's key is less than the key you are searching for, repeat the previous steps with the current node's right child.

# Insertion

When inserting a new key into a binary search tree, here is the algorithm for insertion, starting with the tree's root:

InsertNode:
1. If the current node is null, initialize a new node with the inserted key as its key and make it the new current node.
2. If the current node's key is greater than the key you are inserting, repeat the previous steps with the current node's left child.
3. If the current node's key is less than the key you are inserting, repeat the previous steps with the current node's right child.

In terms of inserting a key into a binary search tree that already contains the key, you could just divert it to its right or left subtree, or not insert the key at all. However, inserting duplicates can have unwanted returns for searching and unwanted results from deletion, so this overview and the visualizer assumes that duplicate keys are not allowed.

# Deletion

When deleting a key, three algorithms are needed. The initial delete algorithm is as follows, starting with the root node:

1. If the current node's key is null, the key you are deleting is not in the tree.
2. If the current node's key is equal to the key your deleting, change the current node's key to the value of the current node's leftmost node in the right tree (via findLeftmostNode), then replace the original node with the new value for the current node with it right subtree (via removeLeftmostNode).
3. If the current node's key is greater than the key you are deleting, repeat the previous steps with the current node's left child.
4. If the current node's key is less than the key you are deleting, repeat the previous steps with the current node's right child.

Once you find the node you need to delete, you need to find its leftmost node in its right subtree, which can be achieved with the following algorithm, starting with the current node's right child:

findLeftMostNode:
1. If the current node has not left child, return its key.
2. If the current node has a left child, repeat the previous step on the current node's left child.

Once you have replaced the key of the node with the deleted key with a new key, you need to remove the leftmost node of the current node and replace it with its right subtree, which can be achieved with the following algorithm, starting with the current node's right child:

removeLeftmostNode:
1. If the current node has no left child, return its right child.
2. If the current node has a left child, repeat the previous step on the current node's left child.

# Big O Stats

|        | Worst Case | Average Case |
| ------ | ---------- | ------------ |
| Insert | O(n)       | O(log n)     |
| Delete | O(n)       | O(log n)     |
| Search | O(n)       | O(log n)     |

# References

Gif pulled from:

[https://daankolthof.com/2020/01/05/trees-and-binary-search-trees/](https://daankolthof.com/2020/01/05/trees-and-binary-search-trees/)
