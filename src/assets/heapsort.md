# Overview
Heapsort is an application of a data structure called heaps. Refer to our page on heaps to learn more about heaps. Heapsort takes advantage of the fact that the top element of a max-heap is the biggest number. If we take the top element out and put it to the side, and percolate down to remake a heap, we can repeat the process until the heap is gone, and this leaves us a collection of elements in decending order. We can use this to produce an array of sorted elements.

# How does it work?
Because heaps can be applied directly to an array, we start by heapifying the array we want to sort. Once the array is in a max-heap, we swap the element at the top of the heap with the element at he bottom of the heap. This leaves the biggest element of the array in the last index. Lets consider this index out of the heap for the moment and fix the rest of the array back into a heap by percolating down. Now that we have a heap again, we swap the element at the top of the heap with the element on the bottom of the heap. Now we have the biggest element in the last index and the second biggest element in the second to last index. We consider that index out of the heap too and continue this process until a sorted array is produced.


# Big-O stats

|            | Worst Case | Average Case | Best Case |
|------------|------------|--------------|-----------|
| Runtime    | O(n log n) | O(n log n)   | O(n log n)|
| Comparisons| O(n log n) | O(n log n)   | O(n log n)|
| Heapify    | O(n log n) | O(n log n)   | O(n)      |
| Space      | O(n)       | O(n)         | O(n)      |
