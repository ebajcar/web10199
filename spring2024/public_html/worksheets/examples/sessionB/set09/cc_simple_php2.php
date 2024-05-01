<!DOCTYPE html>
<html>
<body style="font-size:2em;width:50%;margin:auto">

<?php
// PURPOSE: target specific element to display results
echo "Game of Casino Craps";
// ADDED: add global string for output, then replace all echo statements to assignments
$output = "";
$point = 0;
rollBoth();

function roll() {
  return rand(1, 6);
}
function rollBoth() {
  global $output;  // ADDED: global output
	$alpha = roll();     
	$bravo = roll();   
  $total = $alpha + $bravo;
  $output .= "<br>".$alpha."+".$bravo."=".$total." "; // ADDED: replaced echo to add  output
  determineOutcome($total);
}    
function determineOutcome($total) {
  global $point, $output; // ADDED: global output
	if ( $point == 0 ) {
		if ($total == 7 || $total == 11) {
			display("natural");
		} elseif ($total == 2 || $total == 3 || $total == 12) {
			display("craps");		  
		} else {
		  $point = $total;  
      $output .= " Your point is $point."; // ADDED: add to output, replaced echo
      display("reroll");
      rollBoth();
		}
	} else {
    if ($total == $point) {
      display("point");
      $point = 0;
    } elseif ($total == 7) {
      display("seven");			
      $point = 0; 
    } else {
      $output .= " Your point is $point."; 
      display("reroll");
      rollBoth();
    }
	}
}
function display($msg) {
   global $output;  // ADDED: use global variable
   $message = array(
	  "natural" => " That's a natural. You win! <br><br>NEW GAME ",
	  "craps" 	=> " That's craps. You lose! <br><br>NEW GAME ",
	  "point" 	=> " You made your point. You win! <br><br>NEW GAME ",
	  "seven"	  => " That's a seven. You lose! <br><br>NEW GAME ",
    "reroll" 	=> " ...Roll again!"
	);
	$output .= $message[$msg];  // ADDED: replaced echo by $output
}
?>
<output><?= $output ?></output>                                   <!-- target element to display output -->
</body>
</html>
