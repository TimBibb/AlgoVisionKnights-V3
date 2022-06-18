# Overview

Quick Sort is a unique type of sorting algorithm compared to most other sorting algorithms. This is because quick sort is a divide and conquer algorithm. This means that quick sort separates the main probelm into several smaller problems such that when all of the smaller problems are solveed the larger problem is also solved.

# How does it work?

Quick sort is done by using several pivot points. The main idea is that a pivot point is set in an unsorted array at the end of the array (pivot points can be set anywhere in the array but the ideal pivot is the end of the array). Then low and high pointers are set at the beginning and second-to-last elements of the array respectively. Once this is done, the low pointer increments until a value greater than the pivot is found and the high pointer decrements until a value less than the pivot is found. Once the 2 pointers are found, the values of each pointer are swapped. The pointers then continue to go through the array, swapping each time an instance is found. This process continues until the low and high pointers cross over each other. Once the pointers cross over each other, the low pointer is swapped with the pivot. At this point, the array will have all the values less than the pivot to the left of the pivot and all of the values larger than the pivot to the right of the pivot. Now, each of the partitions to the left and right of the pivot will undergo quick sort as well. This recursive process continues until the entire array is sorted.

# Big O Stats
|            | Worst Case | Average Case | Best Case |
|------------|------------|--------------|-----------|
| Runtime    | O(n^2)     | O(nlog(n))   |  O(nlog(n)) |

# Step by Step Example

Let's take a look at the following array:

| 9 | 8 | 4 | 2 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Now we will use quick sort to sort the array.

## Step 1

First we will set the pivot point to the last element in the array. Then we will set the start of the low and high pointers.

| 9 | 8 | 2 | 4 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

|**Pointer**|**Index**|
|-----------|---------|
| Pivot     | 4       |
| Low       | 0       |
| High      | 3       |

Since the value at the low pointer is greater than the pivot and the value at the high pointer is less than the pivot, the values of the 2 pointers are swapped. This creates the following array:

| 4 | 8 | 2 | 9 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

## Step 2

Now the low pointer must go to the next element that is greater than the pivot and the high point must go to the next element that is less than the pivot. In the case of our array, the next element which is greater than the pivot is at index 1 and the next element which is less than the pivot is at index 2. Hence, the low pointer is now set to index 1 and the high pointer is set to index 2.

| 4 | 8 | 2 | 9 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

|**Pointer**|**Index**|
|-----------|---------|
| Pivot     | 4       |
| Low       | 1       |
| High      | 2       |

Now since both low and high pointers have reached values greater than and less than the pivot respectively, the values of the pointers will swap. This gives the following array:

| 4 | 2 | 8 | 9 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

## Step 3

Now the low pointer must go to the next element that is greater than the pivot and the high point must go to the next element that is less than the pivot. However, now when the low and high pointers increment and decrement respectively, the low and high pointers will cross over. This will cause the pointers to be in this current state:

| 4 | 2 | 8 | 9 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

|**Pointer**|**Index**|
|-----------|---------|
| Pivot     | 4       |
| Low       | 2       |
| High      | 1       |

Since the pointers have now crossed over, the pivot is swapped with the low pointer (since the element at the low pointer would be greater than the pivot). This produces the following array:

| 4 | 2 | 6 | 9 | 8 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

## Step 4

Now the element at index 2 is sorted and the array can be split into 2 partitions. The first partition is all of the values less than the previous pivot:

| 4 | 2 | 
|---|---|
|[0]|[1]|

The second partition would be all of the values greater than the previous pivot:

| 9 | 8 |
|---|---|
|[3]|[4]|

These 2 partitions will then both undergo quick sort. Hence, repeating steps 1 through 4 until the entire array is sorted.

# Further Information

For more information about quick sort, click [here](https://en.wikipedia.org/wiki/Quicksort).
