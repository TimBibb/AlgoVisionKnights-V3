# Overview

The Fibonacci sequence is a sequence of numbers where each number if the sum of the previous two numbers. The sequence starts with 0 and 1. With F<sub>0</sub> and F<sub>1</sub> being 0 and 1 respectively, F<sub>n</sub> can be calculated by the formula F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>. The implementation here is the recursive version of the sequence, calling itself until the base cases are met. In this case, the base cases are when n = 0 and n = 1. 

# How does it work?

For a number, n, the Fibonacci sequence will call F<sub>n</sub>. The function will return the sum of two more function calls, F<sub>n-1</sub> and F<sub>n-2</sub>. When F<sub>n-1</sub> is called, it will then call the function for the two values before itself, F<sub>n-2</sub> and F<sub>n-3</sub>. This will continue until F<sub>0</sub> and/or F<sub>1</sub> are called, in which it will start to add all the numbers it called until it gets to the starting F<sub>n-2</sub> and do it all over again. When the original F<sub>n-2</sub> is done being called, it finally returns the sum of both recursive calls. 

# Step by Step Example

Let's do an example for n = 4. 

## Calling F(4)

Start off by calling F(4). Inside this function, we call F(4-1) and F(4-2).

### Left hand side F(4-1)

F(4-1) = F(3). 3 does not equal 0 nor 1, so call the function again on 3. This results in F(3-1) and F(3-2).

#### Left hand side (3-1)

F(3-1) = F(2), which does not lead to the base case. We call the function again, but on F(2 - 1) and F(2 - 2).

#### Left hand side (2-1)

F(2-1) = F(1), which is a base case. This results in returning 1. 

#### Right hand side (2-2)

F(2-2) = F(0), which is a base case. This results in returning 0. 

#### Adding F(3-1) LHS and RHS

With F(3-1)'s LHS and RHS calculated as 1 and 0, we add both and return the sum, 1. 

#### Right hand side (3-2)
F(3-2) = F(1), which is a base case. This results in returning 1. 

#### Adding (4-1) LHS and RHS

With F(4-1)'s LHS and RHS calculated as 1 and 1, we add both and return the sum, 2. 
We can now start on the right hand side of F(4). Luckily, this will be quicker.

### Right hand side F(4-2)

F(4-2) = F(2), which does not lead to the base case. We call the function again, but on F(2 - 1) and F(2 - 2). For the purposes of space, it is implied that the rest of the calculations are performed and F(2) returns 1. 

## Finally adding both sides
F(4-1) was calculated to be 2, and F(4-2) was calculated to be 1. F(4) will return the sum of both sides, so F(4) = 2 + 1 = 3. 

# Further Information

For further information about Fibonacci numbers, please click [here](https://en.wikipedia.org/wiki/Fibonacci_number).