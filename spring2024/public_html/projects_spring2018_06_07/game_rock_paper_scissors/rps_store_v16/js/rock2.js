/* 
	rockLocStore.html, SYST10199 Web Programming, Summer 2015, Ellen Bajcar 
	external css and js
*/

	var machine;
	var message = "";
	//var choices = new Array( "paper", "scissors", "rock" );
	var choices = ["paper", "scissors", "rock" ];
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
					localStorage.ties++;
				} else {
					winner[csel] == hsel ? message = " YOU WIN! " : message = " MACHINE WINS! ";
					winner[csel] == hsel ? localStorage.wins++ : localStorage.losses++ ;
				}
				//console.log( "machine selected " + csel + " you selected " + hsel );
				displayResults(csel, hsel);
			}, 100);				
		}, true);
		
	// 	display results
	function displayResults(csel, hsel) {
		// TODO fix - no elements in innerHTML!
		document.getElementById("cmove").innerHTML = "<br>Computer chose:<br> <img src='images/"+csel+".png' alt='' > <br>" + csel;
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