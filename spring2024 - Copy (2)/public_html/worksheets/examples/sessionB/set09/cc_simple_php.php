<!DOCTYPE html>
<html>
<body>

<?php
$point = 0;
rollBoth();

function roll() {
  return rand(1, 6);
}
function rollBoth() {
	$alpha = roll();     
	$bravo = roll();   
  $total = $alpha + $bravo;
  echo ("<br>".$alpha."+".$bravo."=".$total." ");
  determineOutcome($total);
}    
function determineOutcome($total) {
    global $point;
	if ( $point == 0 ) {
		if ($total == 7 || $total == 11) {
			display("natural");
		} elseif ($total == 2 || $total == 3 || $total == 12) {
			display("craps");		  
		} else {
		  $point = $total;  
          echo " Your point is ".$point." ".$message[$msg];
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
            display("reroll");
            rollBoth();
        }
	}
  // add stats - how many wins and losses
}
function display($msg) {
   $message = array(
	  "natural" => " That's a natural. You win! <br><br>NEW GAME ",
	  "craps" 	=> " That's craps. You lose! <br><br>NEW GAME ",
	  "point" 	=> " You made your point. You win! <br><br>NEW GAME ",
	  "seven"	  => " That's a seven. You lose! <br><br>NEW GAME ",
    "reroll" 	=> " ...Roll again!"
	);
	echo $message[$msg];
}
?>

</body>
</html>
