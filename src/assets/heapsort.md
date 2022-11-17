# Overview

Heap Sort is a popular algorithm used in computer science. This algorithm uses knowledge of trees and their array visualization to make it work and how the heaps work as well.

It is similar to the Selection Sort in that the elements are divided into unsorted and sorted sub-arrays, but instead of scanning the unsorted sub-array linearly, we use the unsorted sub-array to create a max heap, in which we would only have to grab the element at its root since it is the biggest in the tree and add it to our sorted sub-array.

# How does it work?

Given an array of elements, we start with the first step of this algorithm, we create a max heap with the elements of the array, which basically is organizing the elements with the largest one at its root and each of the child nodes smaller than its parent. Then having the array visualization of that heap since it is essentially a binary tree, we grab the value at the root of the heap and swap it with the value at the last place of the array and remove it from the tree and reduce the size of the heap by 1, making this the first element of the sorted sub-array.

We then heapify the root so the tree maintains the structure of the max heap so the root goes back to being the largest element in the tree and then repeat the process until each element is sorted in the array.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(nlog(n)) | O(nlog(n))   | O(nlog(n))|

# Further information

For more information about heap sort, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/heap-sort)
- [Wikipedia](https://en.wikipedia.org/wiki/Heapsort)
- [GeeksforGeeks](https://www.geeksforgeeks.org/heap-sort/?ref=lbp)