# Overview

A linked list is a linear collection of data that is not represented contiguously in memory like an array. Each node in a linked list has a piece of data and a “next” pointer that points to the next node in the list. This allows linked lists to shrink and grow without the need for creating a new array and copying all of the values, like a traditional array.

## Variants

Doubly-Linked List: Along with a reference to the next node, each node has a reference to the previous node. This structure lets the linked list travel in both directions. This structure is useful when you expect to have to travel freely along the list.

Circular-Linked List: The first and last nodes in the linked list connect to each other. This structure is useful when you don't need a specific starting point.

Along with referencing the head, you can also have a linked list reference to the last node, called the tail.

# How does it work?

A standard linked list has a head value that works as the initial reference point. If the linked list is empty, the head will be null. The very last node will also point to null.

To traverse the list, you start at the head and jump to the next node referenced by the head. This process repeats until you find the data you're looking for or the next node is null.

Whenever a new data element is going to be added to the list, a new node is created which stores the data and has a pointer to the next node, initialized to null. Starting at the head node, you traverse through the list until you find the spot the new node will be inserted. Then the new node is set to point to the next value in the list, and then the node that would point to the new node will be set.

To remove a node from the list, you have to find the node pointing to the one you want to delete. Then that node must point to the node the soon-to-be deleted node is pointing to.

# Runtimes

| Time Complexity |   Worst Case   | Average Case |
|-----------------|----------------|--------------|
| Search          | O(n)           | O(n)         |
| Insert          | O(1)           | O(1)         |
| Deletion        | O(1)           | O(1)         |

# Further information

For more information Singly Linked List, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/linked-list-types#singly)
- [Wikipedia](https://en.wikipedia.org/wiki/Linked_list)
- [GeeksforGeeks](https://www.geeksforgeeks.org/what-is-linked-list/)