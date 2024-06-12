
/*
	Author: Ellen Bajcar
	Program: ticTacToe.js 
	Date: Summer 2016 
	Date Updated: 8:25 AM June-09-16
	Version: 5.0 (Week 5 stage)
	Purpose: learning Javascript programming
	Copyright: This work is the intellectual property of Sheridan College. 
		Any further copying and distribution outside of class must be within 
		the copyright law. Posting to commercial sites for profit is prohibited.
	Description:
		A two-player game. 
		The players are presented with a board of three-by-three table and a reset button.
		The reset button starts a game where players take turns selecting one of the nine
		available empty cells with the goal of completing a row, a column, or a diagonal to
		win the game.
		A message specifying which player's turn is presented during the same.
		When a winning state occurs, a message is presented that the game is over.
	TODO: need a function to "unload" the game's DOM nodes
*/

// delay loading javascript until page is loaded
// ADDED: game functionality placed in function playTicTac
function playTicTac() {
    /*
		Tic Tac Toe Game functionality
		self-contained, the function can be called any time anywhere
		will create the playing environment, including the board...
	*/
    function createBoard() {
            // MOVED declarations inside the function - used only here
            var myTable, myRow, myCell, myData, myBoard, myTitle;
            var gameTitle = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
            myBoard = document.getElementById("game");
            //myTitle = document.createElement("h2");
            //myTitle.appendChild(document.createTextNode("Tic Tac Toe"));
            //myBoard.appendChild(myTitle);
            myTable = document.createElement("table");
            myBoard.appendChild(myTable);
            for (var i = 0; i < 3; i++) {
                myRow = document.createElement("tr");
                myTable.appendChild(myRow);
                for (var j = 0; j < 3; j++) {
                    myCell = document.createElement("td");
                    myRow.appendChild(myCell);
                    myData = document.createTextNode(gameTitle[j + (i * 3)]);
                    myCell.appendChild(myData);
                }
            }
            var par = myBoard.appendChild(document.createElement("p"));
            var elSpanMsg = document.createElement("span");
            elSpanMsg.setAttribute("id", "msg");
            elSpanMsg.style.fontFamily = "monospace";
            elSpanMsg.appendChild(document.createTextNode("Player "));
            var elSpan = document.createElement("span");
            elSpan.setAttribute("id", "player");
            elSpanMsg.appendChild(elSpan);
            elSpanMsg.appendChild(document.createTextNode(""));
            elSpanMsg.appendChild(document.createTextNode(" go! "));
            par.appendChild(elSpanMsg);
            var elButton = document.createElement("button");
            // TODO: need to change to "Reset Game" at some point
            elButton.appendChild(document.createTextNode(
                "Click to start a game"));
            elButton.setAttribute("id", "reset");
            par.appendChild(elButton);
        }
        /* 
		function checkWin() is called to check all winning combinations
	*/

    function checkWin() {
        // check all eight winning sets, if one found, display game over 
        for (var i = 0; i < winSets.length; i++) {
            if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML &&
                board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML &&
                board[winSets[i][0]].innerHTML != "") {
                // MOVED **		
                // highlight the winning combo on screen
                for (var j = 0; j < 3; j++) {
                    board[winSets[i][j]].style.color = "red";
                }
                // MOVED from ** 
                displayWin(); // display  game over, current player wins
            }
        }
        // check if there are any remaining empty cells, if no empty cells, display game over
        // !gameover needs to be checked in case the winning combo occurs at the same time
        if (empty == 0 && !gameover) {
            player = "No one ";
            displayWin();
        }
    }

    function displayWin() {
            gameover = true;
            document.getElementById("winner").innerHTML = player +
                "  wins!";
            // ADDED display layover
            popup.style.display = "block";
            olay.style.display = "block";
            msg.style.display = "none";
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
            if (!gameover && cell.innerHTML == "") {
                cell.innerHTML = player; // place the user character
                empty--; // one less cells is available
                checkWin(); // check if there is a winning combination
                (player == "X") ? player = "O": player = "X";
                document.getElementById("player").innerHTML = player;
                // change the background of the last cell played to indicate what was the last move 
                // ADDED highlight current move, reset previous move
                prev.style.backgroundColor = "white";
                prev = cell;
                cell.style.backgroundColor = "lightblue";
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
            for (var i = 0; i < board.length; i++) {
                board[i].innerHTML = "";
                board[i].style.backgroundColor = "white"; // ADDED reset all backgrounds (prev)
            }
            player = "X";
            document.getElementById("player").innerHTML = "X";
            empty = 9;
            gameover = false;
            // added resetting font color
            for (var j = 0; j < board.length; j++) {
                board[j].style.color = "black";
            }
            btn.innerHTML = "Reset Game";
            msg.style.display = "inline";
        }
        // set up all variable and data structures
    var player = "X"; // current player
    var board = document.getElementsByTagName("td"); //array (collection) of 9 objects
    var winSets = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]; //all winning combinations, 3 rows, 3 columns, 2 diagonals
    var empty = 9; // number of available (empty) cells
    var gameover = false; // game not in session (false if in process)
    // create the game board
    createBoard();
    /*
		Set up event listeners
		1. when user clicks on the reset button (id="reset")
		2. when user clicks on the the 9 cells of the board
	*/
    //document.getElementById("reset").addEventListener("click", gameReset);
	document.getElementById("reset").addEventListener("click", 
		function() {
				gameReset();
			});
    for (var i = 0; i < board.length; i++) board[i].addEventListener(
        "click", function() {
            cellClick(this);
        });
    /*
		ADDED
		display and style overlays with messages 
	*/
    var prev = board[0]; // to flag the previous move for background highlight
    var btn = document.getElementById("reset");
    var popup = document.getElementById("messg");
    var olay = document.getElementById("overlay");
    var winner = document.getElementById("winner");
    // dismiss overlay message when user clicks anywhere on the message 
    popup.addEventListener("click", function() {
        popup.style.display = "none";
        olay.style.display = "none";
    }, false);
    msg.style.display = "none"; // unhide in gameReset
    /*
		Further enhancements
		- make the starting player random (optional)
		- keep track of statistics (how many times X wins ) (optional)
	*/
}