# Overview

Floodfill algorithm takes three parameters: a start node, a target color, and a replacement color. The algorithm looks for all nodes in the array that are connected to the start node by a path of the target color and changes them to the replacement color. It can be useful to think of floodfill like the "bucket" tool in painting apps, which allows you to replace segments of a specific color with another color.

# How does it work?

As we know floodfill needs a 2D array, a target color, the replacement color, and the coordinates of the first position. It first takes the position of the start position. Depending on your decision of which direction you want to take, it will go either in 4 directions (__N, S, W, E__) or it will go in 8 directions (__N, S, W, E, NW, NE, SW, SE__). When it travels in the directions it will land in a new position in which it will check if it has the target color we want to replace, if it is then replaces and continues checking in the directions until it does not find anymore places to check or replace color.

# Further information

For more information about the floodfill algorithm, we have the following resources:
- [Wikipedia](https://en.wikipedia.org/wiki/Flood_fill)
- [GeeksforGeeks](https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/?ref=lbp)