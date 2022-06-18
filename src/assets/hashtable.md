# Overview
A hash table is a data structure that uses a *hash function* to map out where an item would go into a fixed-sized array. It effectively maps one value to another value. The result of the hash function is sometimes called the *key*, while the input to the hash function is the *value*. The purpose of a hash table is to make, on average, instant speed searches for values instead of going through all of the array to find a value. 

## Hash function
Hash functions are functions that, given an input, return a pseudo-unique value for that input. It is pseudo-unique because with enough values, some may be repeated. 

# How does it work?
A value is put into a hash function and it returns a number. That number is used as the index for the hash table. The original value is then put into the hash table at that index. Now if you want to search the hash table for a specific value, put the new value in the hash function and check the new index for the value you are looking for. 

## But how does a hash function work?

A hash function works by converting the input value into (usually) an integer value that is pseudo-unique. A simple hash function can be f(x) = len(x) % 5. This function will be used in the example later on.


# Big-O stats

|            | Worst Case | Average Case | Best Case |
|:----------:|:----------:|:------------:|:---------:|
| Space      | O(n)       | O(n)         | O(n)      |
| Search     | O(n)       | O(1)         | O(1)      |
| Insert     | O(n)       | O(1)         | O(1)      |
| Delete     | O(n)       | O(1)         | O(1)      |

# Example

Let our hash function be f(x) = len(x) % 5 (the length of the input value, x, modulo 5). Start with a hash table of size 5<br>
The top row of the table is the index, the bottom row is the value stored there. 
|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|NULL|NULL|NULL|NULL|

## Adding a value ("Rin")
Put the string "Rin" into the hash function. f("Rin") = len("Rin") % 5 = 3 % 5 = 3. The index for "Rin" is 3, so we insert "Rin" into the hash table at index 3. 
|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|NULL|NULL|Rin|NULL|

## Adding a value ("Kaalia")
Put the string "Kaalia" into the hash function. f("Kaalia") = len("Kaalia") % 5 = 6 % 5 = 1. The index for "Kaalia" is 1, so we insert "Kaalia" into the hash table at index 1. 
|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|Kaalia|NULL|Rin|NULL|

## Adding a value ("Seri")
Put the string "Seri" into the hash function. f("Seri") = len("Seri") % 5 = 4 % 5 = 4. The index for "Seri" is 4, so we insert "Seri" into the hash table at index 4. 
|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|Kaalia|NULL|Rin|Seri|

## Searching for a value ("Bolas")
Put the string "Bolas" into the hash function. f("Bolas") = len("Bolas") % 5 = 5 % 5 = 0. The index for "Bolas" is 0, so we check for the value "Bolas" at index 0.
|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|Kaalia|NULL|Rin|Seri|

The value "Bolas" is not at index 0, and it is the only place it can be, so we can confirm that "Bolas" is not here. 

## Removing a value ("Vorinclex")
Put the string "Vorinclex" into the hash function. f("Vorinclex") = len("Vorinclex") % 5 = 9 % 5 = 4. The index for "Vorinclex" is 4, so we check for the value "Vorinclex" at index 4.
|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|Kaalia|NULL|Rin|Seri|

While index 4 does have an actual value in it, the value is not "Vorinclex" so we do not remove that value. Since that index was the only place it could of been, we are now sure that the hash table does not have "Vorinclex" in it. 


# Collisions
What if you tried to insert a value into index 4, but there was already a value there? When we try that, we have what is called a collision, two values in the same spot. The better than hash function, the less likely you are to have a collision, but in a case where a collision is inevitable, there is still something we can do to add that new value and keep the old one. 

## Linear probing
In linear probing, if the index is taken already, we take the next valid index. So if we tried to add "Vorinclex" into the example table, it would collide with "Seri". The next valid index for "Vorinclex" would be 0, so we would add "Vorinclex" to index 0. 

## Quadratic probing
In quadratic probing, if the index is taken already, we take the next valid index plus the amount of collisions so far to the power of itself. If we try to add "Myr" to the example table, the index would be 3. Inserting into 3 would cause a collision.<br>
The next index we try is 3 + amount of collisions<sup>amount of collisions</sup>, or in this case so far, 3 + 1<sup>1</sup>, or 4. When we try to insert into index 4, we collide again, this time with "Seri".<br>
We try again, but with the new index being 3 + 2<sup>2</sup>, because we have collided twice. This results in index 7, which is equivalent to 2. We try to insert into index 2 and succeed, as there is nothing there yet. 

## Searching with collision techniques
When searching for a value in a hash table that uses these techniques, we cannot stop the search at the first index if the first index is not what we want. If the index we check is empty, that would mean that the value is not actually in the hash table (it actually may be, we will get to that point soon)<br>
Let's use the table from the quadratic probing example. In this case, the hash table will be using quadratic probing for collision detection and mitigation.
|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|Kaalia|Myr|Rin|Seri|

If we were to search for "Myr" we would start off at index 3. "Rin" is at index 3 already, and "Rin" does not equal "Myr" so we have to keep looking just in case. If we gave up now, we would say "Myr" is not in the table, but it is in the table. We quadraticly probe with "Myr", so we check 3 + 1<sup>1</sup>. Index 4 is taken by "Seri" which is not equal to "Myr" so we try again. This time, we check index 3 + 2<sup>2</sup> = 7, which is equivalent to 2. We check index 2 and find the match! 

## Removing and then searching with collision techniques
If probing is used and then we remove a value, it could mess up the probing search. If we remove "Seri" from the previous table, and then search for "Myr", we would think it is not there because the index it would of checked had the value NULL, meaning "Myr" did not reach that point, and therefore not in the table. To counteract this, when we create the initial table, we have all indices set as "clean". When we remove a value, we mark that index as "dirty" because something used to be there. <br>
Now, if we were to probe search for "Myr", where "Seri" was removed and it's index marked as "dirty", when we get to checking 3 + 1<sup>1</sup>, we will see that the index has no value, but is dirty, so we consider that as a collision and continue the search. 

|0|1|2|3|4|
|:----------:|:----------:|:------------:|:---------:|:---------:|
|NULL|Kaalia|Myr|Rin|NULL|
|Clean|Clean|Clean|Clean|Dirty|

# Further Information

For further information about Hash Tables, please click [here](https://en.wikipedia.org/wiki/Hash_table).