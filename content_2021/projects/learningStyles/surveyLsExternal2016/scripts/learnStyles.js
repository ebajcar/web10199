	/*
		create DOM nodes and populate with data from whenYou 
	*/
	// create title and table for the survey in the section id="questions"
	var newHeading = document.createElement("h1");
	var newTable = document.createElement("table");
	newTable.style.border = "3px navy solid";

	//create child nodes manually
	//and add them as child nodes to the new elements
	var h1Text = document.createTextNode("Take the survey ...");
	newHeading.appendChild(h1Text);

	//and we still need to attach them to the document!
	document.getElementById("questions").appendChild(newHeading);
	document.getElementById("questions").appendChild(newTable);

	//create and populate the table
	var mtable = document.getElementsByTagName("table")[0];
	var currow,curcell;
	for (var j = 0; j < whenYou.length; j++ ) {
		currow = document.createElement("tr");
		mtable.appendChild(currow);
		currow.setAttribute("id", "row"+j);
		for ( var curr in whenYou[j] ) {
			curcell = document.createElement("td");
			currow.appendChild(curcell);
			( whenYou[j][curr] == whenYou[j]["name"]) ? curcell.innerHTML = "When you "+whenYou[j][curr] : curcell.innerHTML = whenYou[j][curr];
			curcell.setAttribute("id", curr+j );
			curcell.setAttribute("name", curr );
			curcell.style.border = "1px navy dotted";
		}
	}


	var indx = 0; 
	var colname = new Array;
	for ( var curr in whenYou[1] ) {
		colname[indx] = curr;
		indx++;
	}
	
	function addup() {
		var theCount, first, second, prim, auxy;
		var cbutton, ulist;
		theCount = [ 0, 0, 0, 0 ];
		var col1 = document.getElementsByName(colname[1]);
		var col2 = document.getElementsByName(colname[2]);
		var col3 = document.getElementsByName(colname[3]);
		for (var i = 0; i < col1.length; i++) {
			if (col1[i].selected) theCount[1]++;
			if (col2[i].selected) theCount[2]++;
			if (col3[i].selected) theCount[3]++;	
		}
		if ( theCount[1]+theCount[2]+theCount[3] < whenYou.length ) {
			popup.appendChild(document.createElement("h1")).innerHTML = "Please complete all questions.<br><button>Close</button>"; 
			popup.style.display = "block"; 
			return false;
		} 
		first = Math.max.apply(null, theCount);  // find the highest value
		prim = colname[theCount.indexOf(first)]; // find equivalent name in parallel array
		theCount[theCount.indexOf(first)] = 0;  // set highest to 0 to find the next highest
		second = Math.max.apply(null, theCount);  // find new highest value
		auxy = colname[theCount.indexOf(second)]; // find equivalent name in parallel array
		
		var alearn = popup.appendChild(document.createElement("h1"));
		alearn.innerHTML = "Your primary style is:  " + prim +" ("+first+")";
		alearn.style.color = "orangered";
		
		var blearn = popup.appendChild(document.createElement("h2"));
		blearn.innerHTML = "Your secondary style is:  " + auxy +" ("+second+")";
		blearn.style.color = "orange";		
		
		popup.innerHTML += "<br>What helps " + prim + " learners like me...";
		ulist = document.createElement("ul");
		popup.appendChild(ulist);
		switch (prim) {
			case "visual":
				for (var i=0; i<visualLearner.length; i++) 
					ulist.appendChild(document.createElement("li")).innerHTML = visualLearner[i];
				break;
			case "auditory":
				for (var i=0; i<auditoryLearner.length; i++) 
					ulist.appendChild(document.createElement("li")).innerHTML = auditoryLearner[i];		
				break;
			case "tactile":
				for (var i=0; i<tactileLearner.length; i++) 
					ulist.appendChild(document.createElement("li")).innerHTML = tactileLearner[i];
				break;				
			default:
				var output = "Something has gone wrong. Try again."
		}
		cbutton = popup.appendChild(document.createElement("button"));
		cbutton.innerHTML += "Close";
		popup.style.display = "block";
	}

	/* 
		the next set of functions are set up to respond to user events 
	*/
	function visualClick (cell) {
	  cell.selected = true;
	  (cell.getAttribute("class") == "tdsel") ? cell.setAttribute("class","tdgray") : cell.setAttribute("class","tdsel");
	}
	function audioClick (cell) {
	  cell.selected = true;	
	  (cell.getAttribute("class") == "tdsel") ? cell.setAttribute("class","tdgray") : cell.setAttribute("class","tdsel");
	}
	function tactileClick (cell) {
	  cell.selected = true;	
	  (cell.getAttribute("class") == "tdsel") ? cell.setAttribute("class","tdgray") : cell.setAttribute("class","tdsel");
	}
	function rowUnClick (cell) {
		for (var k = 1; k < 4; k++) {
			cell.getElementsByTagName("td")[k].selected = false;
			cell.getElementsByTagName("td")[k].setAttribute("class","tdreset");
		}
	}
	function rowClick (cell) {
		for (var k = 1; k < 4; k++) {
			cell.getElementsByTagName("td")[k].selected = false;
			cell.getElementsByTagName("td")[k].setAttribute("class","tdgray");
		}
	}		
	for (var j = 0; j < whenYou.length; j++ ) {
		document.getElementById("row"+j).addEventListener("click", function(){ rowClick(this); }, true);
		document.getElementById(colname[0]+j).removeEventListener("click", function(){ rowClick(this.parentElement); }, false);
		document.getElementById(colname[0]+j).addEventListener("click", function(){ rowUnClick(this.parentElement); }, false);
		document.getElementById(colname[1]+j).addEventListener("click", function(){ visualClick(this); }, true);
		document.getElementById(colname[2]+j).addEventListener("click", function(){ audioClick(this); }, true);
		document.getElementById(colname[3]+j).addEventListener("click", function(){ tactileClick(this); }, true);
	}
	var popup = document.getElementById("message");
	document.getElementById("submit").addEventListener("click", addup, false);	
	document.getElementById("reset").addEventListener("click", function(){ location.reload();});
	document.getElementById("info").addEventListener("click", function() {
		var message = "<h3>Instructions:</h3> <p>Read the word(s) in the first column and select the description that best expresses how you usually handle each situation</p>  		<p>Many responses probably fall in one column, with several in another column, and very few in the remaining one. The column that represents your actions best is your primary processing style.  The second highest is your auxiliary style. Though this test is not very technical or complicated, most adults know how they respond to situations.</p><p> By spending time thinking about reactions, you can identify how you prefer to process information. This assessment looks at your modality preferences.	When you press the Submit button, your primary and auxiliary processing style will be displayed, together with some suggestions how to take advantage of your strengths.</p> <button>Close</button>";  	
		popup.innerHTML = message;
		popup.style.display = "block";
		} );
	document.getElementById("message").addEventListener("click", function() { this.innerHTML = ""; popup.style.display = "none";	} );