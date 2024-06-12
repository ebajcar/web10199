/*
	Author: Ellen Bajcar
	Program: ooTTT.js 
	Date: Summer 2016 
	Date Updated: 8:25 AM June-09-16
	Version: 5.0 (Week 5 stage)
	Purpose: learning Javascript programming
	Copyright: This work is the intellectual property of Sheridan College. 
		Any further copying and distribution outside of class must be within 
		the copyright law. Posting to commercial sites for profit is prohibited.
	Description:
		object-oriented version of the classic tic-tac-toe game
		with local storage and overlay result display
*/

var Game = function () {
	this.player = "X";
	this.winSets = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
					[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
	this.empty = 9;
	this.gameover = false;
	this.board = document.getElementsByTagName("td");
	this.prev = this.board[0];
}
Game.prototype.checkWinner = function() {
	for (var i = 0; i < this.winSets.length; i++) {
		if (this.board[this.winSets[i][0]].innerHTML == 
					this.board[this.winSets[i][1]].innerHTML &&
			this.board[this.winSets[i][1]].innerHTML == 
					this.board[this.winSets[i][2]].innerHTML &&
			this.board[this.winSets[i][0]].innerHTML != "") {
			for (var j = 0; j < 3; j++) 
				this.board[this.winSets[i][j]].style.color = "red";
			this.displayWinner(); 
		}
	}
	if (this.empty == 0 && !this.gameover) {
		player = "No one";
		this.displayWinner();
	}
};
Game.prototype.displayWinner = function() {	
	this.gameover = true;
	document.getElementById("winner").innerHTML = player +"  wins!";
	document.getElementById("overlay").style.display = "block";
	playerMsg.style.display = "none";	
	
	// MOVED: dismiss overlay on click
	document.getElementById("overlay").addEventListener("click", function() {
		this.style.display = "none";
	}, true);	
	document.getElementById("clearstats").addEventListener("click", function(){					
		clearStorage();	 //localStorage.clear(); 
		}, false);
		
	// ADDED: update local storage	
	if(!localStorage.getItem('ttt_count')) {
	  populateStorage();
	} else {
	  updateStats();
	}
	document.getElementById("total").innerHTML = localStorage.ttt_count;
};
Game.prototype.cellClick = function(curr) {	
	if (!this.gameover && curr.innerHTML == "") {
		curr.innerHTML = player; // place the user character
		this.empty--; // one less cells is available
		this.checkWinner(); // check if there is a winning combination
		(player == "X") ? player = "O": player = "X";
		document.getElementById("playerMsg").innerHTML = "Player " + player + " go! ";
		this.prev.style.backgroundColor = "transparent";
		this.prev = curr;
		curr.style.backgroundColor = "lightblue";
    }  
};
Game.prototype.resetGame = function() {	
	this.prev = this.board[0];
	for (var i = 0; i < this.board.length; i++) {
		this.board[i].innerHTML = "";
		this.board[i].style.backgroundColor = "transparent"; 
	}
	player = "X";
	document.getElementById("playerMsg").innerHTML = "Player " + player + " go! ";
	this.empty = 9;
	this.gameover = false;
	for (var j = 0; j < this.board.length; j++) this.board[j].style.color = "black";
	document.getElementById("reset").innerHTML = "Reset Game";
	playerMsg.style.display = "inline";	  
};
Game.prototype.createBoard = function() {
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
Game.prototype.removeBoard = function() {
	var parent = document.getElementById("game");
	while(parent.hasChildNodes()) 
	   parent.removeChild(parent.lastChild);
	delete curGame;
	parent.style.display = "none";
}	

function populateStorage() {	
	localStorage.setItem("ttt_count", 0 );
	localStorage.setItem("ttt_x", 0 );
	localStorage.setItem("ttt_y", 0 );
	localStorage.setItem("ttt_ties", 0 );
	updateStats();
}
function updateStats() {
	localStorage.ttt_count++;
	if ( player == "No one" ) 
			localStorage.ttt_ties++;
	if ( player == "X" )
			localStorage.ttt_x++;
	else
			localStorage.ttt_y++;
}	
function clearStorage() {
	if(localStorage.getItem('ttt_count')) 
		localStorage.removeItem("ttt_count");
	if(localStorage.getItem('ttt_x'))
		localStorage.removeItem("ttt_x");
	if(localStorage.getItem('ttt_y'))
		localStorage.removeItem("ttt_y");
	if(localStorage.getItem('ttt_ties'))
		localStorage.removeItem("ttt_ties");
}	

/*
 *	main set up board, start game, set up event listeners
 */
function playTicTac() {
	// create the game object
	var curGame = new Game();
	// initialize the playing board
	curGame.createBoard();
	// initialize the event listeners
	document.getElementById("reset").addEventListener("click", function() {
			curGame.resetGame();
		});
	for (var i = 0; i < curGame.board.length; i++) 
		curGame.board[i].addEventListener("click", function() {
			curGame.cellClick(this);
		});
}
// the end

