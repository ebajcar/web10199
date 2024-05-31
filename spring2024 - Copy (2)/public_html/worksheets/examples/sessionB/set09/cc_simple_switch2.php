<!DOCTYPE html>
<html>
<body>

<?php
$output = "";
$point = 0;
rollBoth();

function roll() {
  return rand(1, 6);
}
function rollBoth() {
	global $output;
    $alpha = roll();     
    $bravo = roll();   
    $total = $alpha + $bravo;
    $output .= "<br>".$alpha."+".$bravo."=".$total." ";
    determineOutcome($total);
}    
function determineOutcome($total) {
    global $point;
    if ( $point == 0 ) {      
        switch ($total) {
            case 7:
            case 11:
                display("natural"); break;
            case 2:
            case 3:
            case 12:
                display("craps"); break;		  
            default:
                $point = $total;  
                display("reroll", $point);
                rollBoth();
        }
    } else {
        switch ($total) {
            case $point:
                display("point"); $point = 0; break;
            case 7:
                display("nopoint"); $point = 0; break;
            default:
                display("reroll", $point);
                rollBoth();
        }
    }
}
function display($msg, $point = 0) {
    global $output;
    $message = array(
        "natural" => " That's a natural. You win! <br><br>NEW GAME ",
        "craps" => " That's craps. You lose! <br><br>NEW GAME ",
        "point" => " You made your point. You win! <br><br>NEW GAME ",
        "seven" => " That's a seven. You lose! <br><br>NEW GAME ",
        "nopoint" => " That's a seven. You did not make your point! You lose! <br><br>NEW GAME ",
        "reroll" => " Your point is $point!...Roll again!"
    );
    $output .= $message[$msg];
}
?>
<output><?= $output ?></output>  
</body>
</html>
