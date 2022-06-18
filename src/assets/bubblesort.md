# Overview

Bubble sort is one of the more simple sorting algorithms. Due to the simplicity of the algorithm, the Big O runtime suffers heavily. One way to view bubble sort is to compare it to king of the hill. In terms of bubble sort, we can act as though we start from the beginning of the array and as we go through the array, 2 numbers compete with each other. The larger number is the winning number and the number that wins gets to continue going through the array until the end of the array is reached.

# How does it work?

Bubble sort is done by completing one simple step. Compare 2 adjacent values and whichever value is smaller is moved to the left, then proceed to the next element. This comparison is done along the entire array until the end is reached. A second pass of the algorithm is done to make sure that there are no more conflictions. If during the second pass a confliction is found, then the algorithm swaps the values and another pass of bubble sort will be made. A pass will keep being made until the algorithm goes through the entire array without finding any conflicts.

# Big O Stats

|            | Worst Case | Average Case | Best Case |
|------------|------------|--------------|-----------|
| Runtime    | O(n^2)     | O(n^2)       |  O(n)     |
| Comparisons| O(n^2)     | O(n^2)       |  O(n)     |
| Swaps      | O(n^2)     | O(n^2)       |  O(1)     |

# Step by Step Example

Let's take a look at the following array:


| 2 | 4 | 9 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|


Now we will use bubble sort to sort the array.

## Pass 1

| 2 | 4 | 9 | 8 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

We begin the algorithm by comparing index 0 and 1. As we can see the values are 2 and 4 respectively. Since these 2 values are already sorted, the algorithm will continue to the next elements of the array. Now we will compare indicies 1 and 2. Once again, since the elements are already in order, the algorithm continues through the array. Comparing index 2 and 3, we can see that the the value at index 2 is greater than the vaue at index 3. Since this is the case, we will swap the values at those indicies to get the following new array:

| 2 | 4 | 8 | 9 | 6 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

We then move on through the array to compare index 3 and 4. Since the value at index 3 is greater than the value at index 4, we swap the values to get the following new array:

| 2 | 4 | 8 | 6 | 9 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

Once we have reached the end of the array, we have completed one pass of bubble sort.

## Pass 2

We now repeat the process, starting at index 0 of the array obtained after the first pass.

| 2 | 4 | 8 | 6 | 9 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

We first compare index 0 and 1 to see that they do not swap since index 1 is greater than index 0. We then continue through the array to compare index 1 and 2. Again, since the indicies are already in order, the algorithm continues through the array. Now comparing index 2 and 3, we see that the value at index 2 is greater than the value at index 3. Hence, a swap of the elements occurs to get the following new array:

| 2 | 4 | 6 | 8 | 9 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

After swapping the elements, we now compare the values at index 3 and 4. As we can see, the elements are already in order as the value at index 3 is less than the value at index 4. Now we have completed the second pass of bubble sort.

## Pass 3

Even though we can physically see that the array is already in order, we still must make one more pass. This is because, bubble sort does not stop until it goes through the entire array one time without any swaps occuring.

On this third pass, bubble sort will compare the values at each of the indicies (as done previously) and no swaps will occur since the array is already sorted at this point. This leaves the following array to be the final outcome of bubble sort on the initial starting array:

| 2 | 4 | 6 | 8 | 9 |
|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|

# Further Information

For more information about bubble sort, click [here](https://en.wikipedia.org/wiki/Bubble_sort).