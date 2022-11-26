# Overview

A hash table maps keys to values. Hash Tables use hash functions to create an index for where the value should be stored in an array. 

# How does it work?

The hash table functions the same in each different way, it grabs the value that wants to be input it in the table and passes it through a hash function in which returns the index in which the value will be in the hash table. The same does for deletion and searching. However, hash tables are not perfect so two different values can have the same index, this is considered a collition. In here we will explain you the Chaining method.

This method as its name suggest it chains together the values, in the same spot, in better terms, it creates, in the index in which the values are having a collision, a linked list so the value is still in the same index as expected from the hash function.

# Runtimes

| Time Complexity |   Worst Case   | Average Case | Best Case |
|-----------------|----------------|--------------|-----------|
| Search          | O(n)           | O(1)         | O(1)      |
| Insert          | O(n)           | O(1)         | O(1)      |
| Deletion        | O(n)           | O(1)         | O(1)      |

# Further information

For more information Hash Table, we have the following resources:
- [Programiz](https://www.programiz.com/dsa/hash-table)
- [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)
- [GeeksforGeeks](https://www.geeksforgeeks.org/open-addressing-collision-handling-technique-in-hashing/)