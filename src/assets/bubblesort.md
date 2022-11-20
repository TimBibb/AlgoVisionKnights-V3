# Overview

Bubble Sort is a simple sorting algorithm that compares adjacent elements and swaps them if they are out of order until the entire sequence is arranged in order.

The name of the algorithm comes from the movement of a bubble rising to the surface, the same happens with either the smallest or largest value in the array which occurs each iteration until it is fully arranged.

# How does it work?

Given an array of elements in a random order, we would want to arrange them either from smallest to largest or viceversa. We start comparing the first element of the arrat to the second and check if they are in the correct order, if not then we swap them. We continue comparing and swapping if needed until the end of the array, and we continue again until we get one iteration without any swaps made, which would indicate the array is sorted as desired.

# Runtimes

| Time Complexity | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
|   Comparisons   | O(n^2)     | O(n^2)       | O(n)      |
|      Swaps      | O(n^2)     | O(n^2)       | O(1)      |

# Further information

For more information about bubble sort, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/bubble-sort)
- [Wikipedia](https://en.wikipedia.org/wiki/Bubble_sort)
- [GeeksforGeeks](https://www.geeksforgeeks.org/bubble-sort/)