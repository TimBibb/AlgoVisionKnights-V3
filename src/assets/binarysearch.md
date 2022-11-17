# Overview

Binary Search is a searching algorithm to find an element in a list, however the only condition that has to be met to use it, is that the list has to be sorted. It compares the target value to the middle of the sorted list, if they are not equal, the half of the list, in which the element is not in, is "eliminated" and we check the middle of the half that remains. We continue repeating until we find it or the half we are supposed to check is empty, meaning the target value is not in the list.

A good illustration for Binary Search is done in the [CS50](https://www.youtube.com/watch?v=YzT8zDPihmc) class at Hardvard University.

# How does it work?

Given a certain target and a sorted list of elements, the algorithm calculates the middle of the array and compares the element there with the target, if the element is not the target value, then we check if it is bigger or smaller than the middle. Depending of which, it then calculates a new middle in the sub-array in which the target might be in.

It will continue the process until it either finds the value or completes the search and not finding it, meaning the target is not in the list.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(log(n))  | O(log(n))    | O(1)      |

# Further information

For more information about binary search, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/binary-search)
- [Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- [GeeksforGeeks](https://www.geeksforgeeks.org/binary-search/)