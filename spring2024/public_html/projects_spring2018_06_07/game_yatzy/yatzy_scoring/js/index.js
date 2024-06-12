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
Three Of A Kind	At least three dice the same	Sum of all dice	 scores 17
Four Of A Kind	At least four dice the same	Sum of all dice	scores 24
Full House	Three of one number and two of another	25	 scores 25
Small Straight	Four sequential dice (1-2-3-4, 2-3-4-5, or 3-4-5-6)	30	 scores 30
Large Straight	Five sequential dice (1-2-3-4-5 or 2-3-4-5-6)	40	 scores 40
Yahtzee	All five dice the same	50	 scores 50
Chance	Any combination	Sum of all dice	 scores 13
*/
// TODO: let the user choose which one they want, when multiple available
// TODO: once the user chose, freeze it by disabling and checking the choice
function analyzeResults() {
	var arrOutput = document.getElementsByTagName("output")[0];
	arrOutput.innerHTML = result;
	var topHalf = document.getElementsByTagName("table")[0];
	var bottomHalf = document.getElementsByTagName("table")[1];
	var outTop = topHalf.getElementsByTagName("kbd");
	var outBottom = bottomHalf.getElementsByTagName("kbd");
	console.log(outTop);
	// TODO: convert to a loop
	outTop[0].innerText = 1 * result[1];
	outTop[1].innerText = 2 * result[2];
	outTop[2].innerText = 3 * result[3];
	outTop[3].innerText = 4 * result[4];
	outTop[4].innerText = 5 * result[5];
	outTop[5].innerText = 6 * result[6];
	var whichOne = [null, "ace", "deuce", "threes", "fours", "fives", "sixes"];
	var whichTwo = [null, "pair1", "pair2", "three", "quads", "full", "stretch", "straight", "yatzee", "chance"];	
	var y = result.indexOf(5);
	console.log("y ", y);
	if ( y > 0 ) arrOutput.innerHTML += " * YATZY! " + whichOne[y];	
	var a = result.indexOf(4);
	console.log("a ", a);
	if ( a > 0 ) {
		arrOutput.innerHTML += " * four of a kind " + whichOne[a];
		document.getElementsByName("quads")[0].disabled = true;
		document.getElementsByName("quads")[0].checked = true;
	}
	var b = result.indexOf(3);
	console.log("b ", b);
	if ( b > 0 ) {
		arrOutput.innerHTML += " * three of a kind " + whichOne[b];
		document.getElementsByName("three")[0].disabled = true;
		document.getElementsByName("three")[0].checked = true;
		outBottom[2].innerText = b * 3;
		console.log(outBottom[2].innerText);
	} 
	var c = result.indexOf(2);
	if ( b > 0 && c > 0 ) {
		arrOutput.innerHTML += " * full house " + whichOne[b] + " and " + whichOne[c];
		//document.getElementsByName("full")[0].disabled = false;
		document.getElementsByName("full")[0].checked = true;
	}  
		
	var arrStretch = result.slice(1,6);
	var d = arrStretch.every(checkStretch);
	if ( d ) {
		arrOutput.innerHTML += " * stretch! "; 
		console.log(d);
		console.log(arrStretch);
		//document.getElementsByName("stretch")[0].disabled = false;
		document.getElementsByName("stretch")[0].checked = true;
	} 
		
	var arrStraight = result.slice(2,7);
	var e = arrStraight.every(checkStretch);
	if ( e ) {
		arrOutput.innerHTML += " Straight! ";
		//document.getElementsByName("straight")[0].disabled = false;
		document.getElementsByName("straight")[0].checked = true;
		console.log(e);
		console.log(arrStraight);
	}
}

function checkStretch(num) {
    return num == 1;
}

  //window.onload = rollDice;

  document.getElementsByTagName("h6")[0].addEventListener('click', rollDice);
})()