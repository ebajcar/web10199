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
/* 
 * function initAll() initializes the board, populates with numbers
 * and initializes the calling of new numbers in a random number
 */

//TODO when run out of lives, stop accepting clicks and complete what the user did not have
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
	'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
	'y', 'z'];
var catPhrases = [
	{ "category" : "Authors", "phrase" : "stephen_king"}, 
	{ "category" : "Authors", "phrase" : "james_patterson"}, 
	{ "category" : "Authors", "phrase" : "margaret_atwood"}, 
	{ "category" : "Authors", "phrase" : "dan_brown"}, 
	{ "category" : "Authors", "phrase" : "arthur_conan_doyle"},
	{ "category" : "Films", "phrase" : "alien"},
	{ "category" : "Films", "phrase" : "dirty_harry"},
	{ "category" : "Films", "phrase" : "gladiator"},
	{ "category" : "Films", "phrase" : "finding_nemo"},
	{ "category" : "Films", "phrase" : "jaws"},
	{ "category" : "Cities", "phrase" : "toronto"},
	{ "category" : "Cities", "phrase" : "manchester"},
	{ "category" : "Cities", "phrase" : "milan"},
	{ "category" : "Cities", "phrase" : "amsterdam"},
	{ "category" : "Cities", "phrase" : "oakville"}
];
var chosenCategory; // Selected category
var word; // Selected word
var guess; // current guess
var guesses = []; // stored guesses
var lives; // lives left
var counter; // Count correct guesses
var space; // Number of spaces in word '_'
// Get elements
var showLives = document.getElementById("mylives");
var showCatagory = document.getElementById("scatagory");

var buttons = function() {
	myButtons = document.getElementById('buttons');
	letters = document.createElement('ul');
	for (var i = 0; i < alphabet.length; i++) {
		letters.id = 'alphabet';
		list = document.createElement('li');
		list.id = 'letter';
		list.innerHTML = alphabet[i];
		check();
		myButtons.appendChild(letters);
		letters.appendChild(list);
	}
}

// Create guesses ul
result = function() {
		wordHolder = document.getElementById('hold');
		correct = document.createElement('ul');
		for (var i = 0; i < word.length; i++) {
			correct.setAttribute('id', 'my-word');
			guess = document.createElement('li');
			guess.setAttribute('class', 'guess');
			if (word[i] === "_") {
				guess.innerHTML = "&nbsp;&nbsp;";
				space = 1;
			} else 
				guess.innerHTML = "_";
			guesses.push(guess);
			wordHolder.appendChild(correct);
			correct.appendChild(guess);
		}
	}
   
// Show lives
comments = function() {
	showLives.innerHTML = "You have " + lives + " lives";
	if (lives < 1) showLives.innerHTML = "Game Over";
	for (var i = 0; i < guesses.length; i++) 
		if (counter + space === guesses.length) 
			showLives.innerHTML = "You Win!";
}
		
// OnClick Function
check = function() {
		list.onclick = function() {
			var geuss = (this.innerHTML);
			this.setAttribute("class", "active");
			this.onclick = null;
			for (var i = 0; i < word.length; i++) {
				if (word[i] === geuss) {
					guesses[i].innerHTML = geuss;
					counter += 1;
				}
			}
			var j = (word.indexOf(geuss));
			if (j === -1) {
				lives -= 1;
				animate();
			} 
			comments();
		}
	}
		
	// Play
play = function() {
	chosenItem = catPhrases[Math.floor(Math.random()*catPhrases.length)];
	console.log(chosenItem);
	catagoryName.innerHTML = "The Chosen Category "+ chosenItem["category"];
	word = chosenItem["phrase"];
	word = word.replace(/\s/g, "_");
	buttons();
	guesses = [];
	lives = 10;
	counter = 0;
	space = 0;
	result();
	comments();	
	canvas();
}

// Reset
document.getElementById('reset').onclick = function() {
	correct.parentNode.removeChild(correct);
	letters.parentNode.removeChild(letters);
	context.clearRect(0, 0, 400, 400);
	play();
}

play();