(function() {
  var rollTimeout;
  var result = [ 0, 0, 0, 0, 0, 0, 0];
  
  
  function setVal(num, val) {
    var dices = document.querySelectorAll('.dice');
    var dice = dices.item(num - 1);
    if (!dice) return;
    dice.setAttribute('data-val', val);
	++result[val];
	//console.log(result);
  }
  
  function toggleRoll() {
    setVal(1, 0);
    setVal(2, 0);
	setVal(3, 0);
	setVal(4, 0);
	setVal(5, 0);
	result = [ 0, 0, 0, 0, 0, 0, 0];
  }

  function getRand() {
    return Math.round(Math.random() * 5 + 1);
  }
  
  function setVals() {
    setVal(1, getRand());
    setVal(2, getRand());
	setVal(3, getRand());
	setVal(4, getRand());
	setVal(5, getRand());
	console.log(result);
	analyzeResults();
  }

  function rollDice() {
    if (rollTimeout) clearTimeout(rollTimeout);
    toggleRoll();
    rollTimeout = setTimeout(function() {
      setVals();
    }, 1000);	
  }

  /*
Three Of A Kind	At least three dice the same		Sum of all dice	 	scores 17
Four Of A Kind	At least four dice the same			Sum of all dice		scores 24 (6x4)
Full House	Three of one number and two of another	25	 				scores 25 (6x3=18 + 5x2=10 28)
Small Straight	Four sequential dice (1-2-3-4, 2-3-4-5, or 3-4-5-6)	30	scores 30
Large Straight	Five sequential dice (1-2-3-4-5 or 2-3-4-5-6)	40	 	scores 40
Yahtzee		All five dice the same					50	 				scores 50
Chance	Any combination	Sum of all dice	 scores 13
*/
// TODO: let the user choose which one they want, when multiple available
// TODO: once the user chose, freeze it by disabling and checking the choice
function analyzeResults() {
	var arrOutput = document.getElementsByTagName("output")[0];
	arrOutput.innerHTML = result;
	var upperScores = document.getElementsByTagName("table")[0].getElementsByTagName("kbd");
	var lowerScores = document.getElementsByTagName("table")[1].getElementsByTagName("kbd");
	var lowerOutput = document.getElementsByName("two");
	var whichOne = [null, "ace", "deuce", "threes", "fours", "fives", "sixes"];
	var whichTwo = ["pair1", "pair2", "three", "quads", "full", "stretch", "straight", "yatzee", "chance"];		

	// calculate and display all scores
	
	// TODO: convert to a loop
	//upperScores[0].innerText = 1 * result[1];
	//upperScores[1].innerText = 2 * result[2];
	//upperScores[2].innerText = 3 * result[3];
	//upperScores[3].innerText = 4 * result[4];
	//upperScores[4].innerText = 5 * result[5];
	//upperScores[5].innerText = 6 * result[6];
    for (var j = 1; j < 7; j++)
		upperScores[j-1].innerText = j * result[j];
	// chance
	var ans = 0;
	for (var i = 1; i < 7; i++) 
		ans += result[i]*i;
	lowerScores[8].innerText = ans;
	
	// yatzee
	var y = result.indexOf(5);
	console.log("y ", y);	
	if ( y > 0 ) {
		console.log(whichTwo.indexOf("yatzee"));
		let curr = lowerOutput[whichTwo.indexOf("yatzee")];
		arrOutput.innerHTML += " * YATZEE! " + whichOne[y];
		if (!curr.disabled) {
			lowerScores[7].innerText = 50;
			lowerScores[7].style.color = "gray";
			curr.disabled = true;
			curr.checked = true;
		}
	}

	
	// one pair
	var a1 = result.indexOf(2);
	console.log("a1 ", a1);	
	if ( a1 > 0 ) {
		console.log(whichTwo.indexOf("pair1"));
		let curr = lowerOutput[whichTwo.indexOf("pair1")];
		arrOutput.innerHTML += " * one pair " + whichOne[a1];
		if (!curr.disabled) {
			lowerScores[0].innerText = a1 * 2;
			lowerScores[0].style.color = "gray";
			curr.disabled = true;
			curr.checked = true;
		}
	}

	// two pairs
	var a2 = getAllIndexes(result, 2);
	console.log(a2);	
	var a3 = result.indexOf(a2[0]);	
	if ( a2.length > 1 ) {
		console.log(whichTwo.indexOf("pair2"));
		let curr = lowerOutput[whichTwo.indexOf("pair2")];
		arrOutput.innerHTML += " * two pairs " + whichOne[a2[0]] + "," + whichOne[a2[1]];
		if (!curr.disabled) {
			lowerScores[1].innerText = (a2[0] * 2) + (a2[1] * 2);
			lowerScores[1].style.color = "gray";
			curr.disabled = true;
			curr.checked = true;
		}
	}		


	// four of a kind
	var a = result.indexOf(4);
	console.log("a ", a);	
	if ( a > 0 ) {
		console.log(whichTwo.indexOf("quads"));
		let curr = lowerOutput[whichTwo.indexOf("quads")];
		arrOutput.innerHTML += " * four of a kind " + whichOne[a];
		if (!curr.disabled) {
			lowerScores[3].style.color = "gray";
			lowerScores[3].innerText = a * 4;
			curr.disabled = true;
			curr.checked = true;
		}
	}
	
	//  three of a kind
	var b = result.indexOf(3);
	console.log("b ", b);
	if ( b > 0 ) {
		arrOutput.innerHTML += " * three of a kind " + whichOne[b];
		lowerOutput[whichTwo.indexOf("three")].disabled = true;
		lowerOutput[whichTwo.indexOf("three")].checked = true;
		lowerScores[2].innerText = b * 3;
		lowerScores[2].style.color = "gray";
		console.log(lowerScores[2].innerText);
	} 
	
	// full house scores 25
	var c = result.indexOf(2);
	if ( b > 0 && c > 0 ) {
		let curr = lowerOutput[whichTwo.indexOf("full")];
		arrOutput.innerHTML += " * full house " + whichOne[b] + " and " + whichOne[c];
		if (!curr.disabled) {
			lowerScores[4].innerText = 25;
			lowerScores[4].style.color = "gray";
			curr.disabled = true;
			curr.checked = true;
		}		
	}  
		
	// small straight
	var arrSmall1 = result.slice(1,6);
	var arrSmall2 = result.slice(2,7);
	var d = arrSmall1.every(checkStretch);
	var d2 = arrSmall2.every(checkStretch);
	if ( d || d2 ) {		
		console.log(d,d2);
		console.log(arrSmall1);
		let curr = lowerOutput[whichTwo.indexOf("stretch")];
		arrOutput.innerHTML += " * Small Straight! "; 
		if (!curr.disabled) {
			lowerScores[5].innerText = 30;
			lowerScores[5].style.color = "gray";
			curr.disabled = true;
			curr.checked = true;
		}
	} 
		
	// large straight
	var arrStraight = result.slice(1,7);
	var e = arrStraight.every(checkStretch);
	if ( e ) {
		console.log(e);	
		console.log(whichTwo.indexOf("straight"));
		let curr = lowerOutput[whichTwo.indexOf("straight")];
		arrOutput.innerHTML += " Large Straight! ";
		if (!curr.disabled) {
			lowerScores[6].innerText = 40;
			lowerScores[6].style.color = "gray";
			curr.disabled = true;
			curr.checked = true;
		}				
	}

	
}

function getAllIndexes(arr, val) {
	var indexes = [], i;
	for(i = 0; i < arr.length; i++)
		if (arr[i] === val)
			indexes.push(i);
	return indexes;
}
	
function checkStretch(num) {
    return num == 1;
}

  //window.onload = rollDice;

  document.getElementsByTagName("h6")[0].addEventListener('click', rollDice);
  document.getElementsByTagName("body")[0].addEventListener('keyup', rollDice);
})()