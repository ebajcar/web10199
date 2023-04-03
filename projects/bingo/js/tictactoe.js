/* 
 * JavaScript for a mobile tic tac toe app
 * Sam Scott, May 2012
 */

// the internal reprsentation of the board
var board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];

// next player to play
var player = 'X';

// empty slots remaining
var empty = 9;

// game on or not
var gameOver = false;

// reset the game
function reset() {
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    player = 'X';
    empty = 9;
    gameOver = false;
    drawBoard(-1, -1);
}

// draws the current board
function drawBoard(prow, pcol) {
    for (var row = 0; row < 3; row++)
        for (var col = 0; col < 3; col++) {
            var cell = document.getElementById("cell" + row + col);
            cell.innerHTML = board[row][col];
            cell.style["color"] = "black";
            if (row == prow && col == pcol)
                cell.style["backgroundColor"] = "lightBlue";
            else
                cell.style["backgroundColor"] = "";
        }
    document.getElementById("player").innerHTML = player;
    document.getElementById("message").style["visibility"] = "visible";
}

// called when the user clicks a cell, to place a piece
function place(row, col) {
    if (!gameOver && board[row][col] == " ") {
        board[row][col] = player;
        if (player == "X")
            player = "O";
        else
            player = "X";
        empty--;
        drawBoard(row, col);
        checkWin();
    }
}

// checks for a win
function checkWin() {
    for (var row = 0; row < 3; row++)
        if (board[row][0] != " " && board[row][0] == board[row][1] && board[row][0] == board[row][2]) {
            highlightWinRow(row);
            endGame();
            return;
        }
    for (var col = 0; col < 3; col++)
        if (board[0][col] != " " && board[0][col] == board[1][col] && board[0][col] == board[2][col]) {
            highlightWinCol(col);
            endGame();
            return;
        }
    if (board[0][0] != " " && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
        highlightWinDiag(1);
        endGame();
        return;
    }
    if (board[0][2] != " " && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
        highlightWinDiag(-1);
        endGame();
        return;
    }
    if (empty == 0) {
        endGame();
    }
}

// ends the game
function endGame() {
    gameOver = true;
    document.getElementById("message").style["visibility"] = "hidden";
}

// highlight a winning row
function highlightWinRow(row) {
    for (var col = 0; col < 3; col++) {
        var cell = document.getElementById("cell" + row + col);
        cell.style["color"] = "red";
        cell.style["backgroundColor"] = "";
    }
}

// highlight a winning column
function highlightWinCol(col) {
    for (var row = 0; row < 3; row++) {
        var cell = document.getElementById("cell" + row + col);
        cell.style["color"] = "red";
        cell.style["backgroundColor"] = "";
    }
}

// highlight a winning diagonal
function highlightWinDiag(diag) {
    var col = 0;
    if (diag == -1)
        col = 2;
    for (var row = 0; row < 3; row++, col += diag) {
        var cell = document.getElementById("cell" + row + col);
        cell.style["color"] = "red";
        cell.style["backgroundColor"] = "";
    }
}