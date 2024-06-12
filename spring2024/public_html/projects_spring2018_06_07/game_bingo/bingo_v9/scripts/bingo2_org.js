/* 
Author: Ellen Bajcar
Program: bingo.js
Date: Summer 2016
Date Updated: 8:25 AM June-09-16
Version: 5.0 (Week 5 stage)
 *	Purpose: learning Javascript programming
 *	Copyright: 
 *		This work is the intellectual property of Sheridan College. 
 *		Any further copying and distribution outside of class must be within 
 *		the copyright law. Posting to commercial sites for profit is prohibited.
 *	Description:
 *		Functionality for a bingo card (game board) and calling numbers (caller)
 *			funtion createBoard() includes click event listener
 *			function populateCard()
 *			function createCaller()
 *			function initAll() calls createBoard, populateCard, createCaller
 *							   creates theCard
 *			function getNewNumber()
 *			function reloadPage()
 *			function checkWinningCombos()
 *			function handleClick()
 *			Event Listeners ... DOMContentLoaded, click (next, reset)
 *		Variables: 
 *				nor, noc, gameOver, theCard, usedNums, calledNums,availNums, winSets
 *		See also: 
 *			Javascript, Eighth Ed., Negrino & Smith
 *			https://piazza.com/class/inrun9m79bc5q2?cid=15
 *		Bingo terminology: 
 *			http://blog.casinocashjourney.com/2013/01/18/bingo-terms/
 * 	Future enhancements:
 *		TODO: resolve any conflicts between a number being called and user deselecting a called number
 *		TODO: !!! resolve if user clicks a number that has not been called
 *		DONE: what about the four-corners winning combo? 
 *		TODO: add full face winning, continue play until card full
 *		see http://textillate.js.org/ for text animation
 */
"use strict;"


/*
	variables
*/
var usedNums = new Array(76); // array of true/false to inidicate if a cell is occupied (picked)
var nor = 5,
    noc = 5; // alternate way to keep coordinates of a cell in a table
var gameOver = false; // game over state
var theCard; // the board, 5x5 table of td elements
var calledNums = []; // array containing all numbers that have been already called; starts empty
var availNums = []; // array containing all numbers that are available; starts with all 75 numbers
for (var j = 1; j < 76; j++) availNums[j - 1] = j;
var winSets = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
    [0, 4, 12, 20, 24]
]; // all winning combinations indexed cells 0 to 24


/*
	create a five row by five column table for a standard "face" bingo card
*/
function createBoard() {
    for (var i = 0; i < nor; i++) {
        var newRow = document.getElementById("myBoard").appendChild(document.createElement("tr"));
        for (var c = 0; c < noc; c++) {
            var newData = newRow.appendChild(document.createElement("td"));
            newData.setAttribute("class", "empty");
            if ((i * 5 + c) != 12) {
                newData.addEventListener("click", handleClick);
            }
        }
    }
}

/*
	The "face" (bingo card) is populated by random numbers
	each column has a range of 1-15 offset by column*15
	exception is the middle cell (cell22 or index 12) which is free (always "picked") and
	does not get an event listener (skip setting one up)
	random number is generated only for the other cells only, each gets event
	listener and the number is displayed.  
	the usedNums array is set to "true" to flag that the number is now on the board
*/
function populateCard() {
    var newNum;
    for (var r = 0; r < nor; r++) {
        for (var c = 0; c < noc; c++) {
			var currCell = theCard[r * 5 + c];
			if ((r * 5 + c) != 12) {
				do {
					newNum = (c * 15) + getNewNumber() + 1;
				}
				while (usedNums[newNum]);
				usedNums[newNum] = true;				
				currCell.innerHTML = newNum;
            } else {
                currCell.innerHTML = "FREE";
                currCell.className = "picked";
				currCell.setAttribute("id","cell22");			
            }
        }
    }
}


/*
	Create the CALLER elements 
	createCaller() function functionality includes 
		the generation of a series of random numbers
		the display of the new number called
		the display of all numbers called in the called sequence
		the display of all numbers that have not been called
		demonstrates the use of insertBefore() method
		demonstrates the use of switch(expression)
    CALLER: The person who calls the bingo numbers as they are drawn.
    https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
    http://www.w3schools.com/jsref/met_node_insertbefore.asp		
*/
function createCaller() {
    var newEl = document.createElement("div");
    var targetEl = document.getElementsByTagName("main")[0];
    var parentDiv = targetEl.parentNode;
    //parentDiv.insertBefore(newEl, targetEl);
	parentDiv.appendChild(newEl, targetEl);
    parentDiv = newEl; 
    newEl = document.createElement("button");
    parentDiv.appendChild(newEl);
    newEl.setAttribute("id", "next");
    newEl.innerHTML = "Call next number";
    for (var k = 1; k < 6; k++) {
        targetEl = newEl;
        newEl = document.createElement("p");
        parentDiv.insertBefore(newEl, targetEl);
        switch (k) {
            case 1:
                newEl.setAttribute("id", "past");
                newEl.innerHTML = "&nbsp;";
                break;
            case 2:
                newEl.innerHTML = "Unused Numbers";
                for (var i = 0; i < availNums.length; i++) document.getElementById(
                    "past").innerHTML += availNums[i] + " ";
                break;
            case 3:
                newEl.setAttribute("id", "usedlist");
                newEl.innerHTML = "Numbers Called";
                break;
            case 4:
                newEl.setAttribute("id", "called");
                newEl.innerHTML = "&nbsp;";
                break;
            default:
                newEl.innerHTML = "NEW NUMBER";
        }
    }
}


/* 
 * function initAll() initializes the board, populates with numbers
 * and initializes the calling of new numbers in a random number
 */
function initAll() {
	createBoard();
	theCard = document.getElementsByTagName("td");
	populateCard();
	createCaller();
}
  
  
// generic random number between 0 and 14
function getNewNumber() {
	return Math.floor(Math.random() * 15);
}
    
	
// TODO: replace with unload function to remove all nodes used for this game
// reloads the page - everything is reset 
function reloadPage() {
    location.reload();
}



/*
	http://www.w3schools.com/jsref/jsref_forEach.asp
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach	
*/
function checkWinningCombos(element, index, array) {
	var flag = 5;
	for (var i = 0; i < element.length; i++) {
		if (theCard[element[i]].className == "picked") flag -= 1;
	}
	if (flag == 0) {
		for (var i = 0; i < element.length; i++) {
			theCard[element[i]].style.backgroundImage =
				"url(images/red5.png)";
			theCard[element[i]].style.color = "white";
		}
		for (var i = 0; i < 25; i++) {
			theCard[i].removeEventListener('click', handleClick, false);
		}
		gameOver = true;
	}
}
	
	
// toggle to keep track which cells are empty or picked
// TODO: check if all user selected cells were IN FACT CALLED
function handleClick() {
	if (this.className == "picked" && !gameOver) {
		this.style.color = "black";
		this.style.backgroundImage = "none";
		this.className = "empty";
		return;
	}
	if (this.className == "empty" && !gameOver) {
		//this.style.color = "blue";
		this.style.backgroundImage = "url(images/red2.png)";
		this.className = "picked";
		winSets.forEach(checkWinningCombos);
		// hide the button so no more numbers can be called
		if (gameOver == true) document.getElementById("next").style.display =
			"none";
	}
	return;
}


// set up all event listeners
// window.onload = initAll();  <<- this version used for older browsers
document.addEventListener("DOMContentLoaded", initAll(), false);

// set up the listener for "Generate New Card" button
document.getElementById("reset").addEventListener("click", reloadPage, false);

// set up the listener for "Call next number"
document.getElementById("next").addEventListener("click", function() {
    var num = availNums[Math.floor(Math.random() * availNums.length)];
    if (num in calledNums) console.log("duplicate? " + num + " in " +
        calledNums.sort());
    removeFromArray(availNums, num); //remove used number
    document.getElementById("called").innerHTML = num;
    document.getElementById("usedlist").innerHTML =
        "Numbers already called <br>" + calledNums.valueOf();
    calledNums.push(num);
    document.getElementById("past").innerHTML = "";
    for (var i = 0; i < availNums.length; i++) {
        document.getElementById("past").innerHTML += availNums[i] + " ";
    }
    for (var i = 0; i < 25; i++) {
        if (theCard[i].innerHTML == num) {
            theCard[i].style.backgroundImage =
                "url(images/orange1.png)";
            theCard[i].className = "picked";
            winSets.forEach(checkWinningCombos);
            if (gameOver == true) document.getElementById("next").style
                .display = "none";
        }
    }
    /*
     * Remove item from array
     * Modifies the array “in place”, i.e. the array passed as an argument
     * is modified as opposed to creating a new array. Also returns the modified
     * array for your convenience.
     * http://stackoverflow.com/questions/5767325/remove-a-particular-element-from-an-array-in-javascript
     */
    function removeFromArray(array, item) {
        var itemIndex;
        itemIndex = array.indexOf(item);
        while (itemIndex !== -1) {
            array.splice(itemIndex, 1);
            itemIndex = array.indexOf(item);
        }
        return array;
    }
}, false); // end next.onclick listener