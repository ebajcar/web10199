<?php
session_start();
$alpha = $bravo = $total = NULL;
$output = "";
isset($_SESSION['point']) ? $point = $_SESSION['point'] : $point = 0;
if(isset($_GET['roll'])) {
    rollBoth();
    updateSession();
}
if(isset($_GET['clear'])) {
    session_destroy();
    $alpha = $bravo = $total = NULL;
}
function updateSession() {
	global $point;
	$_SESSION['point'] = $point;
}
function roll() {
  return rand(1, 6);
}
function rollBoth() {
    global $alpha, $bravo, $total;
    $alpha = roll();     
    $bravo = roll();   
    $total = $alpha + $bravo;
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
        }
    } else {
        switch ($total) {
            case $point:
                display("point"); $point = 0; break;
            case 7:
                display("nopoint"); $point = 0; break;
            default:
                display("reroll", $point);
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
require 'cc_ver21_800html.php';
?>
