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

function analyzeResults() {
	var arrOutput = document.getElementsByTagName("output")[0];
	var whichOne = [null, "ace", "deuce", "threes", "fours", "fives", "sixes"];
	arrOutput.innerHTML = result;	
	var y = result.indexOf(5);
	console.log("y ", y);
	if ( y > 0 ) arrOutput.innerHTML += " * YATZY! " + whichOne[y];	
	var a = result.indexOf(4);
	console.log("a ", a);
	if ( a > 0 ) arrOutput.innerHTML += " * four of a kind " + whichOne[a];
	var b = result.indexOf(3);
	console.log("b ", b);
	if ( b > 0 ) arrOutput.innerHTML += " * three of a kind " + whichOne[b];
	var c = result.indexOf(2);
	if ( b > 0 && c > 0 ) arrOutput.innerHTML += " * full house " + whichOne[b] + " and " + whichOne[c];
	var arrStretch = result.slice(1,6);
	var d = arrStretch.every(checkStretch);
	if ( d ) arrOutput.innerHTML += " * stretch! "; 
	console.log(d);
	console.log(arrStretch);
		var arrStraight = result.slice(2,7);
	var e = arrStraight.every(checkStretch);
	if ( e ) arrOutput.innerHTML += " Straight! ";
	console.log(e);
	console.log(arrStraight);
}

function checkStretch(num) {
    return num == 1;
}

  window.onload = rollDice;

  window.addEventListener('click', rollDice);
})()