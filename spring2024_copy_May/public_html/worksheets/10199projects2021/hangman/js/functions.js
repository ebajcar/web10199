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
     var showClue = document.getElementById("clue");
         showClue.innerHTML = "";
     var getHint = document.getElementById("hint");
     var getHint; // Word getHint
    hint.onclick = function() {
        hints = [
            ["Based in Mersyside", "Based in Mersyside",
                "First Welsh team to reach the Premier Leauge",
                "Owned by A russian Billionaire",
                "Once managed by Phil Brown",
                "2013 FA Cup runners up", "Gazza's first club"
            ],
            ["Science-Fiction horror film",
                "1971 American action film", "Historical drama",
                "Anamated Fish", "Giant great white shark"
            ],
            ["Northern city in the UK", "Home of AC and Inter",
                "Spanish capital", "Netherlands capital",
                "Czech Republic capital"
            ]
        ];
        var catagoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue&mdash; " + hints[catagoryIndex][
            hintIndex
        ];
    };
	