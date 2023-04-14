var secondsRemaining;
var intervalHandle;

function resetPage() {
	document.getElementById("inputArea").style.display = "block";
}

function tick() {	
	var timeDisplay = document.getElementById("time");	
	var min = Math.floor(secondsRemaining / 60);
    console.log(min);
	var sec = secondsRemaining - (min * 60);	
	if (sec < 10) 
		sec = "0" + sec;

	
	var message = min.toString() + ":" + sec;	
	timeDisplay.innerHTML = message;
	
	if (secondsRemaining <= 59 && secondsRemaining > 30) {
		timeDisplay.style.color = "green";
	}else if (secondsRemaining <= 30 && secondsRemaining > 15) {
		timeDisplay.style.color = "orange";
	}else if (secondsRemaining <= 15) {
		timeDisplay.style.color = "red";
	}
		
	if (secondsRemaining === 0) {
		alert("Done!");
		document.getElementById("Pause").style.display = "none";
		clearInterval(intervalHandle);
		resetPage();
	}
	
	secondsRemaining--;
	
	
}

function startCountdown() {
	var minutes = document.getElementById("minutes").value;	
	if (isNaN(minutes)) {
		alert("Please enter a number!");
		return;
	}	
	if (minutes < 0.1 || minutes > 100.0) {
		alert("Please enter a number between 0.1 and 100.0");
		return;
	}
	secondsRemaining = minutes * 60;	
	intervalHandle = setInterval(tick, 1000);	
	document.getElementById("inputArea").style.display = "none";
}
function pause() {
	clearTimeout(intervalHandle);
	isPaused = true;
}

function resume() {
	intervalHandle = setInterval(tick, 1000);
	isPaused = false;
}
function addInput(value){
	var element = document.createElement("input");
	element.setAttribute("id", value);
	element.setAttribute("type", "button");
	element.setAttribute("value", value);    
    document.getElementById("container").appendChild(element);
}

window.onload = function () {	
	var inputMinutes = document.createElement("input");
	inputMinutes.setAttribute("id", "minutes");
	inputMinutes.setAttribute("type", "number");	
	var startButton = document.createElement("input");
	startButton.setAttribute("type", "button");
	startButton.setAttribute("value", "Start Countdown");	
	startButton.onclick = function () {
		startCountdown();
		addInput("Pause");
		document.getElementById("Pause").onclick = function () {
			Pause.setAttribute("value", "Resume");
			pause();
			document.getElementById("Pause").onclick = function () {
				Pause.setAttribute("value", "Pause");
				resume();
			}
		}
		
	}	
	document.getElementById("inputArea").appendChild(inputMinutes);
	document.getElementById("inputArea").appendChild(startButton);	
}


