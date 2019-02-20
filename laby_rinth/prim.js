/*
* js注釋：
Randomized Prim's algorithm
This algorithm is a randomized version of Prim's algorithm.

    A1.Start with a grid full of walls.
    A2.Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
    A3.While there are walls in the list:
        B1.Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
            C1.Make the wall a passage and mark the unvisited cell as part of the maze.
            C2.Add the neighboring walls of the cell to the wall list.
        B2.Remove the wall from the list.

It will usually be relatively easy to find the way to the starting cell, but hard to find the way anywhere else.

Note that simply running classical Prim's on a graph with random edge weights would create mazes stylistically identical to Kruskal's, because they are both minimal spanning tree algorithms.
*/
