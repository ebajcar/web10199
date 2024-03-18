# Data and data structures

* a 2D array can hold the candidate winning combinations
* when currPlayer selects a cell, we know 
    * who the player is (x or o)
    * which was the last cell they selected
    * for example, when they select the first cell (index 0), we can check the first member of the winLines:

~~~
var winLines = [
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
];
~~~


PROBLEM: Write a program that calculates roots of a quadratic equation

	Implicit equation of a line, when $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$ 
    
    1. Display and check your calculations in the console.log.
    2. Present the results in a 10x10 table for values of a and c between 0 and 9.
    