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
window.onload = function() {
    //TODO when run out of lives, stop accepting clicks and complete what the user did not have
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'
    ];
    var categories; // Array of topics
    var chosenCategory; // Selected category
    var getHint; // Word getHint
    var word; // Selected word
    var guess; // current guess
    var guesses = []; // stored guesses
    var lives; // lives left
    var counter; // Count correct guesses
    var space; // Number of spaces in word '_'
    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");
    // create alphabet ul
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
        // Select Catagory
    var selectCat = function() {
            if (chosenCategory === categories[0]) {
                catagoryName.innerHTML =
                    "The Chosen Category Is Premier League Football Teams";
            } else if (chosenCategory === categories[1]) {
                catagoryName.innerHTML = "The Chosen Category Is Films";
            } else if (chosenCategory === categories[2]) {
                catagoryName.innerHTML = "The Chosen Category Is Cities";
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
                } else {
                    guess.innerHTML = "_";
                }
                guesses.push(guess);
                wordHolder.appendChild(correct);
                correct.appendChild(guess);
            }
        }
        // Show lives
    comments = function() {
            showLives.innerHTML = "You have " + lives + " lives";
            if (lives < 1) {
                showLives.innerHTML = "Game Over";
            }
            for (var i = 0; i < guesses.length; i++) {
                if (counter + space === guesses.length) {
                    showLives.innerHTML = "You Win!";
                }
            }
        }
        // Animate man
    var animate = function() {
            var drawMe = lives;
            drawArray[drawMe]();
        }
        // Hangman
    canvas = function() {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };
    head = function() {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }
    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }
    frame1 = function() {
        draw(0, 150, 150, 150);
    };
    frame2 = function() {
        draw(10, 0, 10, 600);
    };
    frame3 = function() {
        draw(0, 5, 70, 5);
    };
    frame4 = function() {
        draw(60, 5, 60, 15);
    };
    torso = function() {
        draw(60, 36, 60, 70);
    };
    rightArm = function() {
        draw(60, 46, 100, 50);
    };
    leftArm = function() {
        draw(60, 46, 20, 50);
    };
    rightLeg = function() {
        draw(60, 70, 100, 100);
    };
    leftLeg = function() {
        draw(60, 70, 20, 100);
    };
    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4,
        frame3, frame2, frame1
    ];
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
                    comments();
                    animate();
                } else {
                    comments();
                }
            }
        }
        // Play
    play = function() {
        categories = [
            ["everton", "liverpool", "swansea", "chelsea", "hull",
                "manchester_city", "newcastle_united"
            ],
            ["alien", "dirty_harry", "gladiator", "finding_nemo",
                "jaws"
            ],
            ["manchester", "milan", "madrid", "amsterdam", "prague"]
        ];
        chosenCategory = categories[Math.floor(Math.random() *
            categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory
            .length)];
        word = word.replace(/\s/g, "_");
        console.log(word);
        buttons();
        guesses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
    }
    play();
    // Hint
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
    // Reset
    document.getElementById('reset').onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    }
}