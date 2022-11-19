# Overview

Quick Sort is based on the divide and conquer approach, it divides the array into two sub-arrays while choosing a pivot, and these sub-arrays are divided until each sub-array contains only one element, and at this point, they are combined to form the sorted array. We have to make sure that the pivot selected is positioned in a way that elements smaller than it are on the left and elements bigger than it are on the right.

# How does it work?

Given an array of elements, we select an element of the array to be the pivot and then we compare the pivot to the elements of the array and we stat putting the smallest ones on one side and the bigger ones on the other side of the pivot until each element is positioned where it needs to. After that first iteration, then we select a pibot to each of the sub-arrays and again compare it to the other elements of that array and position them on the correct side of the pivot. We continue this process until each element is its own sub-array, which at that point we combine them again since they are sorted.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(n^2)     | O(nlog(n))   | O(nlog(n))|

# Further information

For more information about quick sort, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/quick-sort)
- [Wikipedia](https://en.wikipedia.org/wiki/Quicksort)
- [GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/?ref=lbp)