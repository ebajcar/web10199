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
		OO version
	TODO: need a function to "unload" the game's DOM nodes
*/
// delay loading javascript until page is loaded
// ADDED: game functionality placed in function playTicTac
function playTicTac() {

        /* 
		function checkWin() is called to check all winning combinations
	*/

    function checkWin() {
        // check all eight winning sets, if one found, display game over 
        for (var i = 0; i < curGame.winSets.length; i++) {
            if (curGame.board[curGame.winSets[i][0]].innerHTML == 
				curGame.board[curGame.winSets[i][1]].innerHTML &&
                curGame.board[curGame.winSets[i][1]].innerHTML == 
				curGame.board[curGame.winSets[i][2]].innerHTML &&
                curGame.board[curGame.winSets[i][0]].innerHTML != "") {
                // MOVED **		
                // highlight the winning combo on screen
                for (var j = 0; j < 3; j++) {
                    curGame.board[curGame.winSets[i][j]].style.color = "red";
                }
                // MOVED from ** 
                displayWin(); // display  game over, current player wins
            }
        }
        // check if there are any remaining empty cells, if no empty cells, display game over
        // !gameover needs to be checked in case the winning combo occurs at the same time
        if (curGame.empty == 0 && !gameover) {
            curGame.player = "No one ";
            displayWin();
        }
    }

    function displayWin() {
            curGame.gameover = true;
            document.getElementById("winner").innerHTML = curGame.player +
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

	
 
 

	
	/*
    for (var i = 0; i < curGame.boardLen; i++) 
		curGame.board[i].addEventListener("click", function() { cellClick(this); });	
 function cellClick(cell) {
			console.log(cell);
            // added conditional on game not being over and cells available
            if (!curGame.gameover && cell.innerHTML == "") {
                cell.innerHTML = player; // place the user character
                curGame.empty--; // one less cells is available
                checkWin(); // check if there is a winning combination
                (curGame.player == "X") ? curGame.player = "O": curGame.player = "X";
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
            for (var i = 0; i < curGame.board.length; i++) {
                curGame.board[i].innerHTML = "";
                curGame.board[i].style.backgroundColor = "white"; // ADDED reset all backgrounds (prev)
            }
            curGame.player = "X";
            document.getElementById("player").innerHTML = "X";
            curGame.empty = 9;
            curGame.gameover = false;
            // added resetting font color
            for (var j = 0; j < curGame.board.length; j++) {
                curGame.board[j].style.color = "black";
            }
            btn.innerHTML = "Reset Game";
            msg.style.display = "inline";
        }
        // set up all variable and data structures
		
	function Game() {
		this.player = "X";		
		this.winSets = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]		
		];
		this.empty = 9;
		this.gameover = false;
		this.createBoard = function createBoard() {
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
			
			this.board = document.getElementsByTagName("td");
			this.boardLen = this.board.length;
        }
	}	
	var curGame = new Game();
	curGame.createBoard();
    for (var i = 0; i < curGame.boardLen; i++) 
		curGame.board[i].addEventListener("click", function() { 
            if (!curGame.gameover && this.innerHTML == "") {
                this.innerHTML = player; 
                curGame.empty--; 
                checkWin(); 
                (curGame.player == "X") ? curGame.player = "O": curGame.player = "X";
                document.getElementById("player").innerHTML = player;
                prev.style.backgroundColor = "white";
                prev = this;
                this.style.backgroundColor = "lightblue";
            }
	});	
	
	document.getElementById("reset").addEventListener("click", gameReset );
	
    for (var i = 0; i < curGame.boardLen; i++) 
		curGame.board[i].addEventListener("click", function() { cellClick(this); });
    /*
		ADDED
		display and style overlays with messages 
	*/
    var prev = curGame.board[0]; // to flag the previous move for background highlight
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