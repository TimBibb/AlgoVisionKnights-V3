# Overview

The Fibonacci Sequence is a sequence of numbers where each number is the sum of the previous two numbers. The sequence starts with 0 and 1. With F<sub>0</sub> and F<sub>1</sub> being 0 and 1 respectively, F<sub>n</sub> can be calculated by the formula F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>. The implementation here is the recursive version of the sequence, calling itself until the base cases are met. In this case, the base cases are when n = 0 and n = 1. This version of the Fibonacci is naive and can be sped up significantly using a Dynamic Programming approach.

# How does it work?

For a number, n, the Fibonacci sequence will call F<sub>n</sub>. The function will return the sum of two more function calls, F<sub>n-1</sub> and F<sub>n-2</sub>. When F<sub>n-1</sub> is called, it will then call the function for the two values before itself, F<sub>n-2</sub> and F<sub>n-3</sub>. This will continue until F<sub>0</sub> and/or F<sub>1</sub> are called, in which it will start to add all the numbers it called until it gets to the starting F<sub>n-2</sub> and do it all over again. When the original F<sub>n-2</sub> is done being called, it finally returns the sum of both recursive calls. 

# Further information

For more information about the Fibonacci Sequence problem, we have the following resources:
- [Programiz](https://www.programiz.com/c-programming/examples/fibonacci-series)
- [Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_number)
- [GeeksforGeeks](https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/)