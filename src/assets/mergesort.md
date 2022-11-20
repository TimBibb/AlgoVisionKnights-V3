# Overview

Merge Sort is one quick algorithm that uses the divide and conquer strategy. It divides the problem into sub-problems and then merges the solutions for those problems to form the complete solution for our problem.

The entire list of elements is divided into sublists until we reach the base case of the size of the sublist is 1, and then the function merge is called to form sorted sublists until only one is left which would be the sorted list that we are looking for.

# How does it work?

Given an array of elements, we start by setting up the variables for our merge sort, we have the left set to 0 and the right set to n-1, which n is the size of the array, then we select the middle by following the formula (left+right)/2 and then we call the merge sort function from the left variable to the middle, and from the middle+1 to the right variable, we continue calling the merge sort function until the left variable is less than the right. Then we start merging the sub-arrays.

The merge step of the algorithm basically starts merging by comparing the size of elements of each sublist, until the final list is sorted.

# Runtimes

|                 | Worst Case | Average Case | Best Case |
|-----------------|------------|--------------|-----------|
| Time Complexity | O(nlog(n)) | O(nlog(n))   | O(nlog(n))|

# Further information

For more information about heap sort, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/merge-sort)
- [Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)
- [GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/?ref=lbp)