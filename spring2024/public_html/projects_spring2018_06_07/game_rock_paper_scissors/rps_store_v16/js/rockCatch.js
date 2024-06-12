/* 
	rockLocStore.html, SYST10199 Web Programming, Summer 2015, Ellen Bajcar 
	external css and js
*/
	var machine;
	var message = "";	
	var choices = ["paper", "scissors", "rock" ]; //var choices = new Array( "paper", "scissors", "rock" );
	var winner = { rock : "paper", paper : "scissors", scissors : "rock" };
	document.getElementById("msg").innerHTML =  "Welcome!";
	document.getElementById("greset").style.display = "none";

	function init() {
		// event: when the user selects an option
		document.getElementById("move").addEventListener("click", function(){
			//machine selection
			machine = Math.floor((Math.random() * 3) + 1);
			var csel = choices[machine-1];
			
			//human selection
			var hsel = "";
			document.getElementById("rock").addEventListener("click", function(){ document.getElementById("move").style.display = "none"; hsel = "rock"; return hsel; });
			document.getElementById("paper").addEventListener("click", function(){ document.getElementById("move").style.display = "none"; hsel = "paper"; return hsel; });
			document.getElementById("scissors").addEventListener("click", function(){ document.getElementById("move").style.display = "none"; hsel = "scissors"; return hsel; });
			
			//a bit of a delay before displaying results
			setTimeout(function() {
				if ( csel == hsel ) {
					message = " IT'S A TIE! "; 
					try {
						localStorage.ties++;
						    }
					catch(err) {
						console.log("Problem with local storage - tries " + err);
					}
					finally {
						console.log("tries works fine " + localStorage.tries);
					}
				} else {
					winner[csel] == hsel ? message = " YOU WIN! " : message = " MACHINE WINS! ";
					try {
						winner[csel] == hsel ? localStorage.wins++ : localStorage.losses++ ;
						    }
					catch(err) {
						console.log("Problem with local storage - wins-losses " + err);
					}
					finally {
						console.log("tries works fine " + localStorage.wins + " " + localStorage.losses);
					}					
				}
				//console.log( "machine selected " + csel + " you selected " + hsel );
				displayResults(csel, hsel);
			}, 100);				
		}, true);
		
	// 	display results
	function displayResults(csel, hsel) {
		// TODO fix - no elements in innerHTML!
		var temp = document.getElementById("cmove");	// parent element where you want to place the image	
		temp.appendChild(document.createTextNode("Computer chose:"));
		temp.appendChild(document.createElement("br"));
		var newImg = temp.appendChild(document.createElement("img"));
		newImg.setAttribute("src","images/"+csel+".png");
		newImg.setAttribute("alt","an image of "+csel);
		temp.appendChild(document.createElement("br"));
		temp.appendChild(document.createTextNode(csel));
		//document.getElementById("cmove").innerHTML = "<br>Computer chose:<br> <img src='images/"+csel+".png' alt='' > <br>" + csel;
		document.getElementById("hmove").innerHTML += "<br>You chose:<br> <img src='images/"+hsel+".png' alt='' > <br>" + hsel;
		document.getElementById("msg").innerHTML = message;	
		curCount = ++localStorage.count;
		document.getElementById("stats").innerHTML = "Games played:"+curCount+" &mdash; wins:"+localStorage.wins+" &mdash; ties:"+localStorage.ties+" &mdash; losses:"+localStorage.losses;
		document.getElementById("greset").style.display = "block";
		//Seidelin, Jacob. HTML5 Games: Creating Fun with HTML5, CSS3, and WebGL (Kindle Location 10918). Wiley. Kindle Edition. 
	}
	var curCount;				
	// event: when the user clicks reset button
	document.getElementById("reset").addEventListener("click", function(){		
		localStorage.clear(); // remove all stored data	
		//then initialize all the items
		localStorage.setItem("count", 0 );
		localStorage.setItem("wins", 0 );
		localStorage.setItem("ties", 0 );
		localStorage.setItem("losses", 0 );
		//		if(typeof(localStorage.getItem("count"))=='undefined'){ localStorage.setItem("count", 0 ); }	
		//		
		}, false);	
	document.getElementById("greset").addEventListener("click", function(){		
		location.reload();		
		}, false);
	} // end of init function	
	document.addEventListener("DOMContentLoaded", init, false);
	
	
	
var parentEl = document.getElementById("cmove");	// parent element where you want to place the image	
parentEl.appendChild(document.createTextNode("Computer chose:")); // adding textual content to the
var newImg = parentEl.appendChild(document.createElement("img")); // create and append the img tag
newImg.setAttribute("src","images/"+csel+".png");  // will match rock.png, scissors.png, paper.png
newImg.setAttribute("alt","an image of "+csel);	 // don't forget the alt attribute!!!
