# Overview

The nQueens problem requires finding a way to place n Queen chess pieces on an n-by-n board such that no queen can attack another one. One way to find a solution is through backtracking which explores possible solution paths and backtracks when it is clear that a path is incorrect.

# How does it work?

The solution for nQueens is found recursively. We start by placing a queen in the 0th row and column of an n-by-n array. We then move to the next column and try placing the queen at each row in the column until we find a space where the queen is not under attack. If a Queen cannot be placed on any cell in a certain row, we return to the previous row, undo any changes made and check the next cell. This process continues until all columns contain a queen.

# Further information

For more information about the nQueens problem, we have the following resources:
- [Wikipedia](https://en.wikipedia.org/wiki/Eight_queens_puzzle)
- [GeeksforGeeks](https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/)