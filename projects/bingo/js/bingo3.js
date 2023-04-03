/* 
 * JavaScript for 
 */
var newRow = new Object;
var usedNums = new Array(76);
var nor = 5, noc = 5;
var gameOver = 5;
var calledNums = [];
var availNums = [];
for (var j=1; j<76; j++) 
		availNums[j-1] = j;



// check all winning combinations
function checkWinner(row,col) {
	 //After each click check if winner
	 gameOver = 5;
	 for (var r=0; r< nor; r++)
		if (document.getElementById("cell"+r+col).className == "picked") 
			gameOver += -1;
		if (gameOver == 0 ) {
			for (var r=0; r< nor; r++)
				document.getElementById("cell"+r+col).style.backgroundColor = "red";
			return gameOver;
		}
	 //check row row
	gameOver = 5;
	 for (var c=0; c< noc; c++)
		if (document.getElementById("cell"+row+c).className == "picked") 
			gameOver += -1;
		if (gameOver == 0 ) {
			for (var c=0; c< noc; c++)
				document.getElementById("cell"+row+c).style.backgroundColor = "red";
			return gameOver;
		}	
	 //check diagonal 1
	gameOver = 5;
	for (var c=0, r=0; c< noc, r< nor; c++, r++)
		if (document.getElementById("cell"+r+c).className == "picked") 
			gameOver += -1;
	if (gameOver == 0 ) {
		for (var c=0, r=0; c< noc, r< nor; c++, r++)
				document.getElementById("cell"+r+c).style.backgroundColor = "red";
		return gameOver;
	}	
	 //check diagonal bottom-left to top-right
	gameOver = 5;
	for (var c=0, r=4; c< noc, r >= 0; c++, r--) {
		if (document.getElementById("cell"+r+c).className == "picked") 
			gameOver += -1;
	}
	if (gameOver == 0 ) {
		for (var c=0, r=nor-1; c< noc, r >= 0; c++, r--)
			document.getElementById("cell"+r+c).style.backgroundColor = "red";
		return gameOver;
	}
	return 1;
}


function getNewNumber() {
		return Math.floor(Math.random() * 15);
}


function handleClick() {
	var output = this.className;
	//console.log("className " + output + " for " + this.id + " " + this.row);
	if (this.className == "picked")  {
		this.style.color = "black";
		this.className = "empty";
		return;
	}	
	if (this.className == "empty") {
		this.style.color = "blue";
		this.className = "picked";	
		var x = checkWinner(this.row,this.col);
		if ( x == 0 ) {
			console.log(this.row, this.col, gameOver, x);
			for (var r=0; r< nor; r++)
				for (var c=0; c< noc; c++) 
					document.getElementById("cell"+r+c).removeEventListener('click', handleClick, false);
		}
		return ;
	} 
	return;		
}


//create card and populate
function initAll() {
	for (var r=0; r< nor; r++){
		newRow[r] = document.createElement("tr");
		document.getElementById("myBoard").appendChild(newRow[r]);
		for (var c=0; c< noc; c++) {
			var newData = document.createElement("td");
			newRow[r].appendChild(newData);
			newData.setAttribute("id", "cell"+r+c);
			newData.setAttribute("class", "empty");
			newData.row = r; newData.col = c;  //save the cell coordinates as part of the object
			if ( "cell"+r+c != "cell22") {
				newData.addEventListener ("click",  this.handleClick, false);
			}
		}
	}
	//populate
	var newNum;
	for (var r=0; r< nor; r++){
		for (var c=0; c< noc; c++) {
			//A statement that is executed at least once and 
			//is re-executed each time the condition evaluates to true.
			do {
				newNum = (c*15) + getNewNumber() + 1;
			}
			while (usedNums[newNum]);
			usedNums[newNum] = true;
			var currCell = document.getElementById("cell"+r+c);
			if ( "cell"+r+c != "cell22") {
				currCell.innerHTML = newNum;
			} else {
				currCell.innerHTML = "FREE";
				currCell.style.fontSize = "16px";
				currCell.className = "picked";
			}
		}
	}
}


function reloadPage() {
    location.reload();
}
//for older browsers - TODO: update to event listener	
window.onload = initAll();

document.getElementById("next").onclick = function() {
	//choose a number from available
	var num = availNums[Math.floor(Math.random() * availNums.length)]; 
	if (num in calledNums) console.log("duplicate? "+num+" in "+calledNums.sort());
	removeFromArray(availNums, num); //remove used number
	
	document.getElementById("called").innerHTML = num;
	document.getElementById("usedlist").innerHTML = "Numbers already called <br>" + calledNums.valueOf();
	var count = calledNums.push(num);

	document.getElementById("past").innerHTML = "";
	for (var i=0;i < availNums.length; i++) {
		document.getElementById("past").innerHTML += availNums[i] + " ";
	}
	
	//check if number on the card
	 for (var r=0; r< nor; r++)
		 for (var c=0; c< noc; c++)
			if (document.getElementById("cell"+r+c).innerHTML == num)
				document.getElementById("cell"+r+c).style.backgroundColor = "blue";
		
	/*
	 * Remove item from array
	 *
	 * Modifies the array “in place”, i.e. the array passed as an argument
	 * is modified as opposed to creating a new array. Also returns the modified
	 * array for your convenience.
	 * http://stackoverflow.com/questions/5767325/remove-a-particular-element-from-an-array-in-javascript
	 */
	function removeFromArray(array, item) {
		var itemIndex;

		// Look for the item (the item can have multiple indices)
		itemIndex = array.indexOf(item);

		while (itemIndex !== -1) {
			// Remove the item, then return the modified array
			array.splice(itemIndex, 1);

			itemIndex = array.indexOf(item);
		}

		// Return the modified array
		return array;
	}		
		
}


