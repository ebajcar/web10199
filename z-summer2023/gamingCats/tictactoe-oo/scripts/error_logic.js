// this version contains a logic error
// TOFIX:  no one wins when a win occurs on filling the last cell (this can occur when x completes a win combo using the last available cell


/*
    Tic Tac Toe Game functionality
	
	set up all variable and data structures
	- current player: X or O	
	- array (collection) of 9 objects
	- all winning combinations, 3 rows, 3 columns, 2 diagonals
	- number of available (empty) cells
	- game not in session (false if in process)
	- handle to <span id="player">
	- no handle to <button id="reset"> USED only once
	- handle to <div id="message">
*/
var player = "X";  
var board = document.getElementsByTagName("td"); 
var winSets = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; 
var empty = 9; 
var gameover = false;
var message = document.getElementById("message");
var hndlPlayer = document.getElementById("player"); 
/* 
	function displayWin() is called when the game is over and
	the results are displayed: "Game Over! " + player  + " wins."
*/	
function displayWin() {
	gameover = true;
	message.innerHTML = "Game Over! " + player  + " wins.";
}
/* 
	function checkWin() is called to check all winning combinations
	TODO: if one of them is found true, 
*/
function checkWin() {
    for (var i = 0; i < winSets.length; i++) {
        if ( board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML &&
             board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML &&
              board[winSets[i][0]].innerHTML != "" ) {
			// TODO: display the end of the game message - game over
			displayWin();			
			// highlight the winning combo on screen
			for (var j = 0; j < 3; j++) {
				board[winSets[i][j]].style.color = "red";
			}
        }
    }
	// if no empty cells, display game over
	// check if there are any remaining empty cells
	if ( empty == 0 ) {
		// TODO: display the end of the game message - game over
		player = "No one ";
		displayWin();
	}
}
/*
		Function cellClick() is called 
			when the event listeners for the "td" cells fire which occurs
			when the user clicks on one of the nine cells of the board
		1. sets the content of the clicked cell to the current player's mark
		2. checks whether or not there is a winner
		3. flips (changes) the current player
		4. updates the message tot he current player
		TODO: 1-4 should occur only when the selected cell is empty !!	
*/
function cellClick(cell) {
	// added conditional on game not being over and cells available
	if ( !gameover && cell.innerText == "" ) {
		cell.innerText = player; // place the user character
		empty--; // one less cells is available
		checkWin(); // check if there is a winning combination
		( player == "X" ) ? player = "O" : player = "X";
		hndlPlayer.innerText = player;
	}
}
/*
	function gameReset() is called when user clicks on the "game reset" button
	1. sets content of all 9 cells to nothing
	2. sets the starting player (this version, X always starts the game)
	3. updates the message to the current player
	4. resets the number of empty cells to 9
	5. sets the game over flag to false to indicate that the game is in progress
*/
function gameReset() {    
    for (var i=0; i < board.length; i++) 
        board[i].innerText = "";
    player = "X";
    hndlPlayer.innerText = "X";
    empty = 9;
    gameover = false;
	// added resetting font color
	for (var j = 0; j < board.length; j++) {
		board[j].style.color = "black";
	}	
}
/*
	Set up event listeners
	1. when user clicks on the reset button (id="reset")
	2. when user clicks on the the 9 cells of the board
*/
document.getElementById("greset").addEventListener("click", gameReset);
for (var i=0; i < board.length; i++) 
    board[i].addEventListener("click", function(){cellClick(this);});
	
/*
	Further enhancements
	- TODO: change the background of the last cell played to indicate what was the last move ( in class 3 )
	- TODO: display and style overlays with messages ( in class 3 )
	- TODO: create the board (table) with Javascript ( in class 3 )
	- TODO: load and initialize entire game on "DOMContentLoaded" event ( in class 3 )
	- make the starting player random
	- keep track of statistics (how many times X wins )
	- TODO: display who is the winner ( in class 3 )
*/	