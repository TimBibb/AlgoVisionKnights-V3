# Overview

Insertion sort is a sorting algorithm which sorts an array by using a section of the unsorted array as a partially sorted array. This is done by making comparisons and swaps of different elements within the array.

# How does it work?

Insertion sort uses a pointer to go through each element in an unsorted array. It starts off by looking at the first element in the array and setting that element as sorted. Then it looks at the element at index 1. The element at index 1 is then compared with the first sorted element. If the value at index 1 is less then index 0, the elements will swap. Otherwise, they will stay the same and the element at index 1 will be counted as sorted. Insertion sort will then look at the next element and sort that element in comparison to the first 2 sorted elements. Hence, the general idea of insertion sort is that it goes through the array, creating a partially sorted array to the left of the "current element" pointer, and sorting the current element being viewed within the partially sorted array. This is done until the end of the array is reached and a sorted array has been produced.

# Big O Stats

|            | Worst Case | Average Case | Best Case |
|------------|------------|--------------|-----------|
| Runtime    | O(n^2)     | O(n^2)       |  O(n)     |
| Comparisons| O(n^2)     | O(n^2)       |  O(n)     |
| Swaps      | O(n^2)     | O(n^2)       |  O(1)     |

# Step by Step Example

Let's take a look at the following array:


| 2 | 9 | 4 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|


Now we will use insertion sort to sort the array.

## Step 1

current pointer: index 1
| 2 | 9 | 4 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

We start with the current pointer being at index 1 and the value at index 0 being sorted. The value at the pointer is then compared to index 0. Since the element at index 1 is greater than the element at index 0, the element stays at the current index and the pointer moves to the next value.

## Step 2

current pointer: index 2
| 2 | 9 | 4 | 8 | 6 |  
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now since we are at index 2, we must place the element in the partially sorted array. In order to do so, we compare the element at index 2 with the already sorted elements. We compare index 2 with index 1. Since the value at index 2 is less than index 1 the elements are swapped to get the following array:

current pointer: index 2
| 2 | 4 | 9 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now we compare the new value at index 1 with index 0 to make sure that it is still sorted. Since the value at index 1 is greater than the value at index 0, nothing is changed.

## Step 3

current pointer: index 3
| 2 | 4 | 9 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now we are at index 3. We take the value of index 3 and insert it into the sorted partition of the array. The element at index 3 is comared with index 2. Since the value at index 3 is less than the value at index 2, the elements are swapped to get the following array:

current pointer: index 3
| 2 | 4 | 8 | 9 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now we compare the new value at index 2 with index 1 to make sure that it is still sorted. Since the value at index 2 is greater than the value at index 1, nothing is changed.

## Step 4

current pointer: index 4
| 2 | 4 | 8 | 9 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now we are at index 4. We then insert the value at index 4 into the sorted partition of the array. The elements at index 3 and 4 are compared. Since the element at index 4 is less than the element at index 3, the elements are swapped to form the following array:

current pointer: index 4
| 2 | 4 | 8 | 6 | 9 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now we compare the new value at index 3 with index 2 to make sure that it is still sorted. Since the value at index 3 is less than the value at index 2, the elements are swapped to get the following array:

current pointer: index 4
| 2 | 4 | 6 | 8 | 9 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now we compare the new value at index 2 with index 1 to make sure that it is still sorted. Since the value at index 2 is greater than the value at index 1, nothing is changed. Now we have reached the end of the array and are left with the sorted version of the intial array.

# Further Information

For more information about inserstion sort, click [here](https://en.wikipedia.org/wiki/Insertion_sort).