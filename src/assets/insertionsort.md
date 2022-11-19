# Overview

Insertion Sort is a simple sorting algorithm that builds the arranged data set one item at a time. It functions very well in smaller data sets, but if the amount of data to sort is larger then it would be really slow.

We split the array into an unsorted part and a sorted part, and we take each item and place it at its suitable spot in the sorted segment upon each iteration of the algorithm.

# How does it work?

Given an array of elements, we assume the first element in the array is sorted, then we grab the second element of the array and compare it with the first element and if the element is lower than the first one then we move it to the front of the array, if not then we leave it on the second position.

Now that the first two elements are sorted in the sub-array, we then move to the next element in the unsorted sub-array. This element is then compared to each of the elements in the sorted sub-array, and when it is no longer greater than an element, we insert it in that position. We continue this process until the unsorted sub-array is empty.

# Runtimes

| Time Complexity | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
|   Comparisons   | O(n^2)     | O(n^2)       | O(n)      |
|      Swaps      | O(n^2)     | O(n^2)       | O(1)      |

# Further information

For more information about insertion sort, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/insertion-sort)
- [Wikipedia](https://en.wikipedia.org/wiki/Insertion_sort)
- [GeeksforGeeks](https://www.geeksforgeeks.org/insertion-sort/?ref=lbp)