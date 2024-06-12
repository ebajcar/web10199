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
		overlay
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
		var myTable, myRow, myCell, myData, myBoard, myTitle;
		var gameTitle = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
		myBoard = document.getElementById("game");
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
		var elementSpan = document.createElement("span");
		elementSpan.setAttribute("id", "playerMsg");
		elementSpan.appendChild(document.createTextNode(""));
		par.appendChild(elementSpan);
		var elementButton = document.createElement("button");
		elementButton.appendChild(document.createTextNode("Start New Game"));
		elementButton.setAttribute("id", "reset");
		par.appendChild(elementButton);
    }
		
    /* 
		function checkWin() is called to check all winning combinations
	*/
    function checkWin() {
        for (var i = 0; i < winSets.length; i++) {
            if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML &&
                board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML &&
                board[winSets[i][0]].innerHTML != "") {
                for (var j = 0; j < 3; j++) 
                    board[winSets[i][j]].style.color = "red";
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
            olay.style.display = "block";
            playerMsg.style.display = "none";
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
    var prev = board[0]; // to flag the previous move for background highlight
    	
	
    /*
		document.getElementById("reset").addEventListener("click", gameReset);
	*/
	var btn = document.getElementById("reset");
	btn.addEventListener("click", 
		function() {
			prev = board[0]; // to flag the previous move for background highlight
            for (var i = 0; i < board.length; i++) {
                board[i].innerHTML = "";
                board[i].style.backgroundColor = "transparent"; // ADDED reset all backgrounds (prev)
            }
            player = "X";
            document.getElementById("playerMsg").innerHTML = "Player " + player + " go! ";
            empty = 9;
            gameover = false;
            for (var j = 0; j < board.length; j++) board[j].style.color = "black";
            btn.innerHTML = "Reset Game";
            playerMsg.style.display = "inline";
		});
			
			
    for (var i = 0; i < board.length; i++) board[i].addEventListener("click", 
		function() {
            if (!gameover && this.innerHTML == "") {
                this.innerHTML = player; // place the user character
                empty--; // one less cells is available
                checkWin(); // check if there is a winning combination
                (player == "X") ? player = "O": player = "X";
                document.getElementById("playerMsg").innerHTML = "Player " + player + " go! ";
                prev.style.backgroundColor = "transparent";
                prev = this;
                this.style.backgroundColor = "lightblue";
            }
        });
		
		
    /*
		display and style overlays with messages 
	*/
    var popup = document.getElementById("messg");
    var olay = document.getElementById("overlay");
    var winner = document.getElementById("winner");	
    // dismiss overlay message when user clicks anywhere on the message 
    olay.addEventListener("click", function() {
        olay.style.display = "none";
    }, false);
}