# Overview

Selection Sort is a simple algorithm that selects the smallest element in an unsorted array and places it in the front of the arrau to the sorted part of it. Usually, the algorithm starts with the sorted sub-array empty since we would not know which element is the smallest in the array until the first iteration.

The algorithm works better on smaller data sets.

# How does it work?

Given an array of elements, we start at the first position of the array and compare it to the rest of the elements to find the smallest element in the unsorted array, after found we swap it with the first element of the array which then becomes the first element of out sorted sub-array. We continue with the next spot and find the next smallest value and swap it. This process will continue until each element is in its place.

# Runtimes

| Time Complexity | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
|   Comparisons   | O(n^2)     | O(n^2)       | O(n^2)    |
|      Swaps      | O(n)       | O(n)         | O(1)      |

# Further information

For more information about selection sort, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/selection-sort)
- [Wikipedia](https://en.wikipedia.org/wiki/Selection_sort)
- [GeeksforGeeks](https://www.geeksforgeeks.org/selection-sort/?ref=lbp)