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
 // This is how it works: First we have a single expression n (most often a variable), that is evaluated once. The value of the expression is then compared with the values for each case in the structure. If there is a match, the block of code associated with that case is executed. Use break to prevent the code from running into the next case automatically. The default statement is used if no match is found.       
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
                display("seven"); $point = 0; break;
            default:
                display("reroll", $point);
                rollBoth();
        }
    }
}
function display($msg, $point = 0) {
    $message = array(
        "natural" => " That's a natural. You win! <br><br>NEW GAME ",
        "craps" => " That's craps. You lose! <br><br>NEW GAME ",
        "point" => " You made your point. You win! <br><br>NEW GAME ",
        "seven" => " That's a seven. You lose! <br><br>NEW GAME ",
        "reroll" => " Your point is $point!...Roll again!"
    );
    echo $message[$msg];
}
?>

</body>
</html>
