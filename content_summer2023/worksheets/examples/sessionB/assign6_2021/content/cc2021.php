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
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Casino Craps</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"> 
<link rel="stylesheet" href="../css/style.css"> 
<link rel="stylesheet" href="../css/components.css">
<style>
table {
  margin: auto;
  text-align: center;
  border-collapse: separate;
  border-spacing: 15px 5px;    
}
.dice {
	height: 80px;
	width: 80px;
	background-color: teal;
	color: white;
	border-radius: 4px;
	border: 1px solid white;
	box-shadow: 5px 5px 5px gray;
	font-size: 60px;
    
}
[type=submit] {
  display: block;
  background: #fff;
  border-radius: 4px;
  border: 1px solid teal;
  color: teal;
  font-size: 1.5em;
  margin: auto;
  margin-bottom: 5px;
  width: 10em;
}
ul {
  list-style-type: none;
}
samp {
  font-size: 6rem;
}
.output {
  height: 86px;
}

</style>
</head>

<body>
	<header><h1>Casino Craps</h1></header>      
     
    <nav>
        <a href="../index_members.html">Home</a>
    </nav>     
	<main>
    <form method="get" action="<?= $_SERVER["PHP_SELF"] ?>">
      <table>
        <tr>
          <td class="dice"><?= $alpha ?></td>
          <td class="dice"><?= $bravo ?></td>
        </tr>
      </table>                   
      <p>
        <small>You rolled&hellip;</small>            
        <samp id="total"><?= $total ?></samp>
      </p>
      <p class="output"><?= $output ?></p> 
      <p hidden>
        Wins: <span id="wins"><?= $wins ?></span>&nbsp;&nbsp;&nbsp;
        Losses: <span id="losses"><?= $losses ?></span>
      </p>         
      <input type="submit" name="roll" value="Roll the dice!">	
      <input type="submit" name="clear" value="Reset game">
    </form>            
  </main>
        
  <aside hidden>
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
  <footer><address>SYST10199 Web Programming &copy; Sheridan College</address></footer>  
</body>
</html>