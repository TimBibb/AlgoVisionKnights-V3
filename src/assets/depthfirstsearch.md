# Overview
Depth-First Search(DFS) is an algorithm for searching through a tree or graph. It will start at the root node and traverse as far as it can before returning to the previous node

# How does it work?
Depth-First search is a recursive function. Starting at the root node, it checks all nodes it can travel to. DFS is recusively called on each child node.

Recursive calls are made until DFS reaches a node with no children. At that point, DFS returns to the previous node and then recursively calls itself on the next child.

# Differences between trees and graphs
In trees and graphs, a node's value can be checked either before (preorder), during (inorder), or after (postorder) the recursive call to its children. 

Trees don't typcially need to track if they've been visited or discovered unless multiple tree nodes point to the same child nodes.

Graphs need to track if they were visited because nodes can potentially loop in a cycle.

# References

Gif pulled from:

[https://commons.wikimedia.org/wiki/File:Depth-First-Search.gif](https://commons.wikimedia.org/wiki/File:Depth-First-Search.gif)