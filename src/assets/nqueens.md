# Overview

The NQueens problem requires finding a way to place n Queen chess pieces on an n-by-n board such that no queen can attack another. One way to find a solution is through backtracking.

# How does it work?

The solution for NQueens is found recursively. Starting at row 0 of an n-by-n array, we place a Queen at the first space on the row. Then we go to the next row and for each cell in the row, we check if a previously placed Queen can attack that space. If it cannot, we place the new Queen on that cell.

If a Queen cannot be placed on any cell in a certain row, we return to the previous row, undo any changes made and check the next cell. Repeat until a QUeen has been placed on 1 cell in every row.

# Step by Step Example

For this example, we'll solve for N = 4. A Q represents where a Queen has been placed. An x represents a space where a Queen could move.


![](./images/NQueensAssets/empty.png)

Begin with an empty array. The first queen will be inserted into the top-left space. Any space in the same row, column or along the diagonal is no longer safe.

![](./images/NQueensAssets/0.png)

In the second row, the third cell is the first safe cell found. A Queen is placed there and all other cells along the same row, column, and diagonals are unsafe.

![](./images/NQueensAssets/02.png)

The third row does not have any safe cells left so we return to the second row and undo the previous changes.

![](./images/NQueensAssets/0.png)

We now place a Queen in the final cell of the second row.

![](./images/NQueensAssets/03.png)

In the third row, we place a Queen at the second cell.

![](./images/NQueensAssets/031.png)

There are no cells in the fourth row where a Queen can be placed so we return to row 3 and undo any changes made.

![](./images/NQueensAssets/03.png)

There are no remaining safe spots in row three so we return to row two.

![](./images/NQueensAssets/0.png)

There are no remaining safe spots on row 2 so we return to row one.

![](./images/NQueensAssets/empty.png)

Now we'll place our first Queen on the second cell in row one and go to row 2.

![](./images/NQueensAssets/1.png)

The final cell in row two is the first safe spot found. We place a Queen there and move to row 3.

![](./images/NQueensAssets/13.png)

The first cell in row three is the first safe spot found. We place a Queen there and move to row 4.

![](./images/NQueensAssets/130.png)

The third cell in row 4 is the first safe spot found. We place a Queen there

![](./images/NQueensAssets/1302.png)

In the next recursive call, we return true because we've placed every Queen on the board.