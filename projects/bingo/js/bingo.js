/* 
 * JavaScript for 
 */
var newRow = new Object;
var usedNums = new Array(76);
var nor = 5, noc = 5;
var gameOver = 5;

function place(row, col) {
	var currCell = document.getElementById("cell"+row+col);
	//if cell already picked, reverse and reset
	console.log("reset: cell"+row+col+currCell.className);
	if (currCell.className == "picked")  {
		
		currCell.style.color = "black";
		currCell.className = "empty";
		return;
	}	
	if (currCell.className == "empty") {
		//console.log("process: cell"+row+col+currCell.className);
		currCell.style.color = "blue";
		currCell.className = "picked";	
		var x = checkWinner(row,col);
		//TODO: disable onclick event;
		if ( x == 0 ) {
			console.log(row, col, gameOver, x);
			for (var r=0; r< nor; r++)
				for (var c=0; c< noc; c++) 
					document.getElementById("cell"+r+c).setAttribute("onclick", "");
		}
			return ;
	} 
	return;
}
function checkWinner(row,col) {
	 //After each click check if winner
	 //check col column
	 //console.log("winner: cell"+row+col);
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
	 //console.log(r, c, gameOver);
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
		console.log("className " + output + " for " + this.id);
	}

function initAll() {
	//create
	for (var r=0; r< nor; r++){
		newRow[r] = document.createElement("tr");
		document.getElementById("myBoard").appendChild(newRow[r]);
		for (var c=0; c< noc; c++) {
				var newData = document.createElement("td");
				newRow[r].appendChild(newData);
				newData.setAttribute("id", "cell"+r+c);
				newData.setAttribute("class", "empty");
				newData.className == "empty";
				if ( "cell"+r+c != "cell22") {
				//	newData.setAttribute("onclick", "place("+r+","+c+");"); 
				//	console.log("adding event " + r + c);
					newData.addEventListener ("click",  this.handleClick, false);
				}
			}
	}
	

//	for (var r=0; r< nor; r++)
//		for (var c=0; c< noc; c++) {
//			var curr = document.getElementById("cell"+r+c);
			//console.log("an event detected " + curr);
			//curr.onclick = place(r,c);
//			curr.addEventListener ("click",  this.place(r,c), false);
//	}

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
	
window.onload = initAll();