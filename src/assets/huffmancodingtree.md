# Overview

Huffman Coding is a technique of compressing data to reduce its size without losing any of the details. It is mostly used to compress data in which there are frequently ocurring characters.

It will produce variable-lenght codes for each of characters in the input.

# How does it work?

The tecnique requires an input which might be string or it might be a full text, then it grabs this string and grabs the frequencies in which each character appears in it, thus reducing the original size of the string. After getting the frequencies of the characters it will sort them in ascending order in a priority queue. Keep in mind that each of the characters that are in the queue will become leaf nodes in the tree. It will them grab(dequeue) the first two elements of the queue and assign them as the left and right node of a newly created node in which the value is the addition of both frequencies of the characters. We then add this newly created node with the value of the sum of both frequencies into the priority queue. 

It will then continue repeating grabbing the first two elements in the priority queue and adding it as children to a parent node and then adding it to the queue again until there exist only one which is our newly created tree, with the characters as its leaf nodes. For each of the non-leaf nodes we assign a 0 to left edge and 1 to the right edge. If we read this 0's and 1's from the root to one of the characters then we will have our code value for that character.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(nlog(n)) | O(nlog(n))   | O(nlog(n))|


# Further information

For more information about Huffman Coding tree, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/huffman-coding)
- [Wikipedia](https://en.wikipedia.org/wiki/Huffman_coding)
- [GeeksforGeeks](https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/)