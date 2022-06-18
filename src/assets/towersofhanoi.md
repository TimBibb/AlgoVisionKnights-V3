# Overview

The Tower of Hanoi is a puzzle of trying to move all disks from the starting tower to the final tower. However, all the disks are a different size and disks cannot be placed on top of disks that are smaller than itself. There are 3 total towers, the 0<sup>th</sup> tower has all the disks, with the largest at the bottom and getting smaller from there. There can be any amount of disks on the starting tower and can always be done with 3 towers. 

### Quick rules
* Only one disk can be moved at one time
* Only the top disk of each tower can be moved at once
* A disk cannot be on top of a disk smaller than itself

# How does it work?

There are three towers, each with a different purpose (which change over time, depending on which disk needs to be moved and where). There is the source tower, the auxillary tower, and the destination tower. The source tower is where you move a disk from, the auxillary tower is the temporary tower for a disk, and the destination tower is where the disk will end up. There is a simple algorithm for completing this puzzle for any amount of disks. The minimum amount of moves to complete this is equal to 2<sup>n</sup>-1, where n = the amount of disks. 

## The basic algorithm
* Move n-1 disks from tower source to auxillary
* Move n<sup>th</sup> disk from source to destination
* Move n-1 disks from tower auxillary to destination

### Psuedo code
> function move(n, source, target, auxillary)
>> if n > 0:
>>> move(n - 1, source, auxillary, target)<br>
>>> remove disk from source, add to target<br>
>>> move(n - 1, auxillary, target, source)<br>
> move(3, source, target, auxillary)

# Step by Step Example
An example where n = 3 (there are 3 disks)
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|    =1=    |--------------|-------------------|
|   ==2==   |--------------|-------------------|
|  ===3===  |--------------|-------------------|

## Move 1
Move disk from Source to Destination
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|-----------|--------------|-------------------|
|   ==2==   |--------------|-------------------|
|  ===3===  |--------------|        =1=        |

## Move 2
Move disk from Source to Auxillary
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|-----------|--------------|-------------------|
|-----------|--------------|-------------------|
|  ===3===  |     ==2==    |        =1=        |

## Move 3
Move disk from Destination to Auxillary
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|-----------|--------------|-------------------|
|-----------|     =1=      |-------------------|
|  ===3===  |    ==2==     |-------------------|

## Move 4
Move disk from Source to Destination
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|-----------|--------------|-------------------|
|-----------|     =1=      |-------------------|
|-----------|    ==2==     |      ===3===      |

## Move 5
Move disk from Auxillary to Source
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|-----------|--------------|-------------------|
|-----------|--------------|-------------------|
|    =1=    |    ==2==     |      ===3===      |

## Move 6
Move disk from Auxillary to Destination
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|-----------|--------------|-------------------|
|-----------|--------------|       ==2==       |
|    =1=    |--------------|      ===3===      |

## Move 7
Move disk from Source to Destination
|   Source  |   Auxillary  |    Destination    |
|:---------:|:------------:|:-----------------:|
|-----------|--------------|        =1=        |
|-----------|--------------|       ==2==       |
|-----------|--------------|      ===3===      |

# Further Information

For further information about the Tower of Hanoi problem, please click [here](https://en.wikipedia.org/wiki/Tower_of_Hanoi).