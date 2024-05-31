<?php
session_start();
// initial values
$alpha = $bravo = $sum = NULL;
// get values from session variables if available
isset($_SESSION['point']) ? $point = $_SESSION['point'] : $point = 0;
isset($_SESSION['wins']) ? $wins = $_SESSION['wins'] : $wins = 0;
isset($_SESSION['losses']) ? $losses = $_SESSION['losses'] : $losses = 0;
$output = "";
   
// if "roll the dice" is clicked, start the game    
if(isset($_GET['roll'])) {
    rollBoth();
    updateSession();
}


// if "Reset game" is clicked, start the game    
if(isset($_GET['clear'])) {
    $wins = $losses = 0;
    session_destroy();
}

//	update session variables so we can access it next time with current game roll
function updateSession() {
	global $point, $wins, $losses ;
	$_SESSION['point'] = $point;
	$_SESSION['wins'] = $wins;
	$_SESSION['losses'] = $losses;
}
    
// no changes from previous versions    
// TODO: count wins and losses    
function roll(){
  return rand(1,6);
}
function rollBoth() {
    global $alpha, $bravo, $sum;
    $alpha = roll();  
    $bravo = roll(); 
    $sum = $alpha + $bravo;
    determineOutcome($sum);
}
function determineOutcome($total) {
  global $point, $output, $wins, $losses;  // ADDED
	if ( $point == 0 ) {       
		if ($total == 7 || $total == 11) {
      $wins++;    // ADDED
      display("natural");
		} else if ($total == 2 || $total == 3 || $total == 12) {
      $losses++;   // ADDED 
      display("craps");
		} else {
		  $point = $total;
		  $output = "Your point is $point.";
      display("reroll");      
		}
	} else {
      if ($total == $point) {       
        $wins++;    // ADDED
        display("point");
        $point = 0;
      } else if ($total == 7) {
        $losses++;   // ADDED
        display("seven");	
        $point = 0;
      } else {
		    $output = "Your point is $point."; 
        display("reroll");        
		}        
	}
}
function display($msg) {
   global $output;
   $message = array(
	  "natural" => " That's a natural. You win! <br><br>NEW GAME ",
	  "craps" 	=> " That's craps. You lose! <br><br>NEW GAME ",
	  "point" 	=> " You made your point. You win! <br><br>NEW GAME ",
	  "seven"	  => " That's a seven. You lose! <br><br>NEW GAME ",
    "reroll" 	=> " ...Roll again!"
	);
	$output .= $message[$msg];
}

require 'cc_ver21_800html.php';
?>
