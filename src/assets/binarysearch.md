# Overview 
When you have a sorted array, binary search can be used to search for a stored value by dividing the array in half, checking which half the value would be in, dividing that half in half, checking where the value would be in, and repeating until the value is found or is conclusively not in the array.

# How does it work?
Binary search begins with the whole array. It calculates the midpoint and compares that to the value you're looking for. If your value is less than what is at the midpoint, binary search will calculate a new midpoint of the first half of the array and compare the value you're looking for with that value. If your value is greater than the midpoint value, binary search will calculate a new midpoint of the second half of the array.

For each comparison made, binary search can conclude the value you're looking for is not in half of the current range. This is because the array is sorted.

Binary Search continues this process until it either finds the value it's looking for or the range is down to a single index which is not what you'e looking for. If that happens, Binary returns the element is not in the array.

# Big O Stats
|        | Worst Case | Average Case | Best Case |
| ------ | ---------- | ------------ | --------- |
| Search | O(log n)   | O(log n)     | O(1)      |

# Step by Step Example
Let's look at the following array:

| 2 | 3 | 4| 7 | 9 | 11| 17 |
|---|---|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|[5]|[6]|

Let's say we wanted to find 9. The range for min and max indices are initially 0 and 6. Using those values, the midpoint becomes 3. index 3 has a 7 which is greater than 9.

| <s>2|<s> 3 |<s> 4|<s> 7| 9 | 11| 17 |
|---|---|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|[5]|[6]|

We can conclue 9 is not within indices 0 through 3 because index 3 has a 7 and every value before it would have to be less than or equal to 7 because the array is sorted.

Now we'll check the midpoint along the range 4 through 6. The midpoint is 5. Index 5 has 11 which is greater than 9.

| <s>2|<s> 3 |<s> 4|<s> 7| 9 |<s> 11|<s> 17 |
|---|---|---|---|---|---|---|
|[0]|[1]|[2]|[3]|[4]|[5]|[6]|

Now the range is only a single index. Because 9 is in that index, we'll return index 4 as the location of 9. Alternately, if we were instead searching for 10, binary would return that it did not find the value.