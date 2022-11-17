# Overview

When you have a sorted array, binary search can be used to search for a stored value by dividing the array in half, checking which half the value would be in, dividing that half in half, checking where the value would be in, and repeating until the value is found or is conclusively not in the array.

# How does it work?

Binary search begins with the whole array. It calculates the midpoint and compares that to the value you're looking for. If your value is less than what is at the midpoint, the binary search will calculate a new midpoint of the first half of the array and compare the value you're looking for with that value. If your value is greater than the midpoint value, the binary search will calculate a new midpoint of the second half of the array.

For each comparison made, the binary search can conclude that the value you're looking for is not located in half of the current range. This is because the array is sorted.

Binary Search continues this process until it either finds the value it's looking for or the range is down to a single index which is not what you’re looking for. If that happens, Binary returns the element that is not in the array.

# Runtimes

| Time Complexity | Worst Case | Average Case |
|-----------------|------------|--------------|
| Space           | O(n)       | O(n)         |
| Search          | O(n)       | O(log(n))    |
| Insert          | O(n)       | O(log(n))    |
| Delete          | O(n)       | O(log(n))    |

# Further information

For more information about binary search tree, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/binary-search-tree)
- [Wikipedia](https://en.wikipedia.org/wiki/Binary_search_tree)
- [GeeksforGeeks](https://www.geeksforgeeks.org/binary-search-tree-data-structure/)