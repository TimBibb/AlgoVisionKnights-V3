# Overview

A hash table maps keys to values. Hash Tables use hash functions to create an index for where the value should be stored in an array. 

# How does it work?

The hash table functions the same in each different way, it grabs the value that wants to be input it in the table and passes it through a hash function in which returns the index in which the value will be in the hash table. The same does for deletion and searching. However, hash tables are not perfect so two different values can have the same index, this is considered a collition. In here we will explain you the Open Adressing Linear Probing method.

This method basically as the name shows it searches for the next available space in the table linearly and then inputs the value into that open space in the table. It does this method as well when deleting and searching for the value in the table.

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