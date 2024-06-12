/* 
Author: Ellen Bajcar
Program: hangman.html
Date: Summer 2016
Date Updated: 8:25 AM June-09-16
Version: 5.0 (Week 5 stage)
Purpose: learning Javascript programming
Copyright: 
    This work is the intellectual property of Sheridan College. 
    Any further copying and distribution outside of class must be within 
    the copyright law. Posting to commercial sites for profit is prohibited.
Description:
    Example for SYST10199 Web Programming, Summer 2016, Ellen Bajcar 
 	http://codepen.io/ebajcar/pen/EyxZyx
	https://simple.wikipedia.org/wiki/List_of_countries_by_continents	
	https://www.codecademy.com/courses/javascript-intermediate-tpoPb/0/1
 */
document.addEventListener("DOMContentLoaded", init, false);

	var pics = new Array();
	for (var i = 0; i <= 18; i++) {
		pics[i] = new Image();
		pics[i].src = 'images/image' + i + '.png';
	}
	var map=new Array(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 
		10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18);
	var user = [];
	var temparray = new Array();
	var clickarray = new Array(0, 0);
	var ticker, sec, min, ctr, id, okToClick, finished, msg;

function init() {
	for (r = 0; r <= 5; r++) {
		var newRow = document.getElementById("myBoard").appendChild(document.createElement("tr"));
		for (c = 0; c <= 5; c++) {
			var newCell = newRow.appendChild(document.createElement("td"));
			var newLink = newCell.appendChild(document.createElement("a"));
			var newImg = newLink.appendChild(document.createElement("img"));
			newImg.setAttribute("src","images/image0.gif");
			newImg.setAttribute("name","img"+((6*r)+c));
			newLink.setAttribute("href","javascript:showimage("+((6*r)+c)+")");
			
			newLink.onClick = document.mForm.mButton.focus();
		}
	}

	// start timer...
	clearTimeout(id);
	for ( var i=0; i<36; i++ ) user[i] = 0;  // TODO:  ???
	ticker = 0;
	min = 0;
	sec = 0;
	ctr = 0;
	okToClick = true;
	finished = 0;
	document.mForm.mButton.value = ""; // TIMER: cleared
	scramble();
	runclk();
	for (i = 0; i <= 35; i++) {
		document.mForm[('img'+i)].src = "images/image0.gif";
	   }
}
	function runclk() {
		min = Math.floor(ticker/60);
		sec = (ticker-(min*60))+'';
		if(sec.length == 1) {sec = "0"+sec};
		ticker++;
		document.mForm.mButton.value = min+":"+sec; // TIMER: update display
		id = setTimeout('runclk()', 1000);
	}
	
	function scramble() {
		for (var z = 0; z < 5; z++) {
			for (var x = 0; x <= 35; x++) {
				temparray[0] = Math.floor(Math.random()*36);
				temparray[1] = map[temparray[0]];
				temparray[2] = map[x];
				map[x] = temparray[1];
				map[temparray[0]] = temparray[2];
		  }
	   }
	}
	
	function showimage(but) {
		if (okToClick) {
			okToClick = false; 
			//console.log("map "+but+' image'+map[but]+'.png');
			document.mForm[('img'+but)].src = 'images/image'+map[but]+'.png';//TODO:???			
			if (ctr == 0) {
				ctr++;
				clickarray[0] = but;
				okToClick = true;
			} else {
				clickarray[1] = but;
				ctr = 0;
				setTimeout('returntoold()', 500);
			}
		}
	}
	
	function returntoold() {
		if ((clickarray[0] == clickarray[1]) && (!user[clickarray[0]])) {
			document.mForm[('img'+clickarray[0])].src = "images/image0.gif";
			okToClick = true;
		} else {
			if (map[clickarray[0]] != map[clickarray[1]]) {
				if (user[clickarray[0]] == 0) 
					document.mForm[('img'+clickarray[0])].src = "images/image0.gif";
				if (user[clickarray[1]] == 0) 
					document.mForm[('img'+clickarray[1])].src = "images/image0.gif";
			}
			if (map[clickarray[0]] == map[clickarray[1]]) {
				if (user[clickarray[0]] == 0 && user[clickarray[1]] == 0) 
					finished++; 
				user[clickarray[0]] = 1;
				user[clickarray[1]] = 1;
			}
			if (finished >= 18) {
				winner.innerHTML = 'You did it in '+
						document.mForm.mButton.value+' !';
				// ADDED display layover
				popup.style.display = "block";
				olay.style.display = "block"; 
				// TODO: remove current board
				init();
			} else {
				okToClick = true;
			}
		}
	}  // end funcion returntoold()

	
    var popup = document.getElementById("messg");	
    var olay = document.getElementById("overlay");
    var winner = document.getElementById("winner");
    // dismiss overlay message when user clicks anywhere on the message 
    popup.addEventListener("click", function() {
        popup.style.display = "none";
        olay.style.display = "none";
    }, false );
	