# Overview

Selection Sort is a simple sorting algorithm which sorts by finding what value goes into each index. While it doesn't do many swaps, it has a high runtime.

# How does it work?

For each index in the array, Selection Sort will find the smallest unsorted element and swap it into the index. It does this by first setting the value at the index as the smallest value found. Selection Sort then compares each remaining index to that value. If any value is less than the current-smallest value, that one becomes the new smallest value. Once every value has been compared, the index with the smallest value swaps with the index 9it should be placed into.

# Big O Stats

|            | Worst Case | Average Case | Best Case |
|------------|------------|--------------|-----------|
| Runtime    | O(n^2)     | O(n^2)       |  O(n^2)   |
| Comparisons| O(n^2)     | O(n^2)       |  O(n^2)   |
| Swaps      | O(n)       | O(n)         |  O(n)     |

# Step by Step Example

Let's take a look at the following array:


| 8 | 4 | 9 | 2 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|


Now we will use selection sort to sort the array.

## Pass 1

| 8 | 4 | 9 | 2 | 6 | 
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

int smallestIndex = 0

We first want to find the smallest value which will be inserted into index 0. We begin by setting the variable smallestIndex to 0 because that index is storing the smallest value selection sort has found so far.

| 8 | 4 | 9 | 2 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

int smallestIndex = 1

We then compare array[smallestIndex] to array[1]. Because the value at array[1] is smaller, smallestIndex is now 1.

| 8 | 4 | 9 | 2 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

int smallestIndex = 3

When it compares array[smallestIndex] and array[2], nothing changes because array[smallestIndex] is still the smallest value found. However smallestIndex will update after comparing array[smallestIndex] and array[3]. In the end, array[3] has the smallest value.

| 2 | 4 | 9 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

int smallestIndex = 3

After reaching the end of the array, array[0] swaps values with array[smallestIndex].

## Pass 2

We now repeat the process, starting at index 1 of the array obtained after the first pass.

| 2 | 4 | 9 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

int smallestIndex = 1

We first set smallestIndex to 1 and will compare array[smallestIndex] with each reamining value. Because array[1] is already the smallest value, nothing will change this pass.

## Remaining passes

| 2 | 4 | 6 | 8 | 9 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Selection Sort will continue this process for each index in the array. It will stop after setting the value that would go into array[3]. There's no need to check for the value that would go into array[4] because there is only one single value left.

# Further Information

For further information about selection sort, please click [here](https://en.wikipedia.org/wiki/Selection_sort).