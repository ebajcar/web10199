# Algorithm: first pass

1. start game with a three-by-three grid of nine empty cells and two players named x and o

2. x marks an empty cell    // turn 1, 8 cells left
3. check if winner          // no need to check [x]
4. x passes marker to o

5. o marks an empty cell    // turn 2, 7 cells left
6. check if winner          // no need to check [xo]
7. o passes marker to x

8. x marks an empty cell    // turn 3, 6 cells left
9. check if winner          // no need to check [xox]
10. x passes marker to o

11. o marks an empty cell   // turn 4, 5 cells left
12. check if winner         // no need to check [xoxo]
13. o passes marker to x

14. x marks an empty cell   // turn 5, 4 cells left
15. check if winner         // three x's can be in a row, col, or diag [xoxox]; 
                            // if yes, declare winner and end game.
16. x passes marker to o    // if no, continue

17. o marks an empty cell   // turn 6, 3 cells left
18. check if winner         // if yes, declare winner and end game.
19. o passes marker to x    // if no, continue

20. x marks an empty cell   // turn 7, 2 cells left
21. check if winner         // if yes, declare winner and end game.
22. x passes marker to o    // if no, continue


23. o marks an empty cell   // turn 8, 1 cell left
24. check if winner         // if yes, declare winner and end game.
25. o passes marker to x    // if no, continue

26. x marks an empty cell   // turn 9, 0 cells left
27. check if winner         // if yes, declare winner and end game.
                            // if no winner declare a TIE and end game.
28. end game                // start new game?     


# Algorithm: second pass
1. start game
2. current player marks an empty cell   // decrement or increment a counter to track turns 
3. we check if we have a winner            // TODO: add condition, when turn > 4
4. if yes, declare a winner and end the game.
5. if no empty cells  left and no winner, declare a tie and end the game.
6. flip to other player, return to 2    // NOTE:  game must end in step 4 or 5 only!!!

