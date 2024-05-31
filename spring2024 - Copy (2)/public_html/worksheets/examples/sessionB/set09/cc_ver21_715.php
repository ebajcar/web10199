<?php
session_start();
// initial values
$alpha = $bravo = $sum = NULL;
// get values from session variables if available
isset($_SESSION['point']) ? $point = $_SESSION['point'] : $point = 0;
isset($_SESSION['wins']) ? $wins = $_SESSION['wins'] : $wins = 0;
isset($_SESSION['losses']) ? $losses = $_SESSION['losses'] : $losses = 0;

$output = "";
$message = array(
	"natural" => "That's a natural. You win!<br>NEW GAME. Roll the dice!",
	"craps" => "That's craps. You lose!<br>NEW GAME. Roll the dice!",
	"point" => "You made your point. You win!<br>NEW GAME. Roll the dice!",
	"seven" => "That's a seven. You lose!<br>NEW GAME. Roll the dice!"
	);
    
// if "roll the dice" is clicked, start the game    
if(isset($_GET['roll'])) {
    rollBoth();
    updateSession();
}

// if "Reset game" is clicked, start the game    
if(isset($_GET['clear'])) {
    session_destroy();
}
    
function roll(){
  // https://www.w3schools.com/php/func_math_rand.asp
  $random = mt_rand(1,6);
  return $random;
}

function rollBoth() {
    global $alpha, $bravo, $sum;
    $alpha = roll();  
    $bravo = roll(); 
    $sum = $alpha + $bravo;
    determineOutcome($sum);
}
 
function determineOutcome($total) {
    global $point, $output, $wins, $losses;
	if ( $point == 0 ) {       
		if ($total == 7 || $total == 11) {
            $wins++;
			$output = display("natural");
            $point = 0;	
		} else if ($total == 2 || $total == 3 || $total == 12) {
            $losses++;
			$output = display("craps");	
            $point = 0;	  
		} else {
		  $point = $total;
		  $output = "Your point is ".$point.". Roll again!<br>";  
		}
	} else {
        if ($total == $point) {
			$wins++;
			$output = display("point");
			$point = 0;
        } else if ($total == 7) {
			$losses++;
			$output = display("seven");			
			$point = 0;
        } else {
		  $output = "Your point is ".$point.". Roll again!<br>";  
		}        
	}
}

function display($msg) {
    global $message, $wins, $losses;
    $o = $message[$msg].
        '<p>Wins: <span id="wins">'.$wins.
        '</span>&nbsp;&nbsp;&nbsp;Losses: <span id="losses">'.$losses.
        '</span></p>'; 
    return $o;
}

//	update session variables so we can access it next time with current game roll
function updateSession() {
	global $point, $wins, $losses ;
	$_SESSION['point'] = $point;
	$_SESSION['wins'] = $wins;
	$_SESSION['losses'] = $losses;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Casino Craps</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--
Author: 		Ellen Bajcar
File name: 		cc_ver21_715.php
Date Created:	Summer 2021
Date Updated: 
Version: 		21_715
Purpose: 		learning Javascript programming; assignment requirements
Copyright: 
    This work is the intellectual property of Sheridan College. 
    Any further copying and distribution outside of class must be within 
    the copyright law. Posting to commercial sites for profit is prohibited.
Description:
    See README.md file, located in this project's root directory
-->
<style>
body {
  width: 50%;
  margin: auto;
}
table {
    margin: auto;
    text-align: center;
}
.dice {
	height: 80px;
	width: 80px;
	margin: 10px;
	background-color: #ff5C10;
	color: white;
	border-radius: 4px;
	border: 1px solid #ebebeb;
	box-shadow: 5px 5px 5px gray;
	font-size: 60px;
    
}
button {
	color: tomato;
	background: #fff;
	border-radius: 5px;
	border: 1px solid tomato;
	font-size: 30px;
	outline: 0 solid white;
}

samp {
  font-size: 6rem;
}

.roll {
  width: 100%;
  margin: 5px 0;
}

.output {
  height: 200px;
}
</style>
</head>

<body>
	<header>
		<h1>Casino Craps</h1>
	</header>
    <div class="flex-container">        
		<main>
      <form method="get" action="https://bajcar.dev.fast.sheridanc.on.ca/php10199/set09/cc_ver21_715.php">             
        <table>
            <tr>
                <td class="dice"><?= $alpha ?></td>
                <td class="dice"><?= $bravo ?></td>
            </tr>
        </table>                   
        <p>
            <small>You rolled&hellip;</small>            
            <samp id="total"><?= $sum ?></samp>
        </p>
        <p class="output"><?= $output ?></p>        
        <input type="submit" name="roll" class="roll" value="Roll the dice!">	
        <input type="submit" name="clear" class="roll" value="Reset game">


      </form>            
		</main>
        
    <aside>
        <h4>How to play...</h4>
        <ul>
            <li>At the beginning of the game, the player rolls a pair of dice and the computer computes the total.</li>
            <li>If the total is 2, 3, or 12 (called "craps"), the player loses. </li>
            <li>If the total is 7 or 11 (called a "natural"), the player wins.</li>
            <li>If the total is any other number, that number becomes the "point". </li> 
        </ul>
        <ul>
            <li> From here, the player keeps rolling the dice until 
            <li>(a) the point comes up again, in which case the player wins, or </li>
            <li>(b) a 7 appears, in which case the player loses. </li>
            <li>The numbers 2,3,11, and 12 no longer have special significance after the first rolls.</li>         
        </ul>  		
    </aside>
    <footer>
        <address>SYST10199 Web Programming &copy; Sheridan College</address>
    </footer>  
</body>
</html>


