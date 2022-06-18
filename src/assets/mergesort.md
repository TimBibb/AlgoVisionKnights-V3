# Overview
Merge sort takes an idea where if there are two sorted arrays, they can be merged into a single sorted array by comparing the first value in each array and placing the smaller value into the combined array then repeating with the smallest value in both arrays which have not been placed in the combined array.

Merge sort takes an array, divides it in half, recursively sorts each half, and merges them back together.

Merge sort has an O(n log n) runtime because it doesn't have to compare every value to each other, but it has to use O(n) space for auxiliary data.

# How does it work?
Merge sort uses recursion to sort an array. Each function call needs a value for the low and high indices of the partition of the array.

The first function call to merge sort will pass 0 and array size - 1 as the low and high indices. a midpoint is calculated where midpoint = (high + low) / 2.

Merge sort is then called on the left partition with low and midpoint as the partition range. Then it calls merge sort on the right partition, using midpoint + 1 and high as the range.

Recursive calls are made until the partition is a single index. A one-index array is sorted. Once the left and right partitions are sorted, the merging process begins.

Two auxiliary arrays are made. The left array copies the values in the left partition. The right array copies the right partition. Three pointers are then made. The first points at the first index of the left array, the second pointer points at the first index of the right array, and the third pointer points at the low index of the main array.

The values of the left and right pointer are compared. The smaller value is copied into the main array pointer. The main pointer and the pointer of the array with the smaller value is incremented. Then the left and right pointer are compared again.

Once all the elements of an auxiliary array are written into the main array, the remaining elements in the other array are written in.

# Big-O stats
|            | Worst Case | Average Case | Best Case |
|------------|------------|--------------|-----------|
| Runtime    | O(n log n) | O(n log n)   | O(n log n)|
| Comparisons| O(n log n) | O(n log n)   | O(n log n)|
| Space      | O(n)       | O(n)         | O(n)      |
