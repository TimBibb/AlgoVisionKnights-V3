# Overview

The Tower of Hanoi is a puzzle of trying to move all disks from the starting tower to the final tower. However, all the disks are a different size and disks cannot be placed on top of disks that are smaller than itself. There are 3 total towers, the 0<sup>th</sup> tower has all the disks, with the largest at the bottom and getting smaller from there. There can be any amount of disks on the starting tower and can always be done with 3 towers. 

## Quick rules
* Only one disk can be moved at one time
* Only the top disk of each tower can be moved at once
* A disk cannot be on top of a disk smaller than itself

# How does it work?

There are three towers, each with a different purpose (which change over time, depending on which disk needs to be moved and where). There is the source tower, the auxillary tower, and the destination tower. The source tower is where you move a disk from, the auxillary tower is the temporary tower for a disk, and the destination tower is where the disk will end up. There is a simple algorithm for completing this puzzle for any amount of disks. The minimum amount of moves to complete this is equal to 2<sup>n</sup>-1, where n = the amount of disks. 

# Further information

For more information about the Towers of Hanoi problem, we have the following resources:
- [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
- [GeeksforGeeks](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/)