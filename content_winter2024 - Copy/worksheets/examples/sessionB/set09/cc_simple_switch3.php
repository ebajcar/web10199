<?php
$alpha = $bravo = $total = NULL;
$output = "";
$point = 0;  
if(isset($_GET['roll'])) {
    rollBoth();
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
?>
<!DOCTYPE html>
<html>
<body>
 <main style="font-size:2em;">
    <form method="get" action="https://bajcar.dev.fast.sheridanc.on.ca/php10199/set09/cc_simple_switch3.php">             
      <table>
        <tr>
          <td><?= $alpha ?> + </td>
          <td><?= $bravo ?></td>
        </tr>
      </table>                   
      <p>
        <small>You rolled&hellip;</small>            
        <samp id="total"><?= $total ?></samp>
      </p>
      <p class="output"><?= $output ?></p>        
      <input type="submit" name="roll" value="Roll the dice!">	
      <input type="reset" name="clear" value="Reset game">
    </form>            
  </main>      
</body>
</html>
