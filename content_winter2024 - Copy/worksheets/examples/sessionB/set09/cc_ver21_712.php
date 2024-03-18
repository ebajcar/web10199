<?php
// initial values
$alpha = $bravo = $sum = NULL; //using global variables
$output = "";
$point = 0;
rollBoth();

function roll(){
  return rand(1,6);
}
function rollBoth() {
    global $alpha, $bravo, $sum; //using global variables
    $alpha = roll();  
    $bravo = roll(); 
    $sum = $alpha + $bravo;
    //$output .= "<br>".$alpha."+".$bravo."=".$total." ";
    determineOutcome($sum);
}
function determineOutcome($total) {
  global $point, $output;
	if ( $point == 0 ) {       
		if ($total == 7 || $total == 11) {
			display("natural");
		} else if ($total == 2 || $total == 3 || $total == 12) {
			display("craps");	     
		} else {
		  $point = $total;
		  $output = "Your point is $point.";
      display("reroll");  
      rollBoth();      
		}
	} else {
    if ($total == $point) {
      display("point");
      $point = 0;
    } else if ($total == 7) {
      display("seven");		
      $point = 0;
    } else {
      $output = "Your point is $point."; 
      display("reroll");  
      rollBoth();        
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
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Casino Craps</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--
Author: 		Ellen Bajcar
File name: 		cc_ver21_712.php
Date Created:	Summer 2021
Date Updated: 
Version: 		21_712
Purpose: 		learning Javascript programming; assignment requirements
Copyright: 
    This work is the intellectual property of Sheridan College. 
    Any further copying and distribution outside of class must be within 
    the copyright law. Posting to commercial sites for profit is prohibited.
Description:
    README.md file, located in this project's root directory
-->
<style>
body {
  width: 50%;
  margin: auto;
  text-align: center;
}
table {
    margin: auto;
    text-align: center;
}
td {
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
[type=submit] {
  display: block;
	color: tomato;
	background: #fff;
	border-radius: 5px;
	border: 1px solid tomato;
	font-size: 30px;
	outline: 0 solid white;
  width: 300px;
  text-align: center;
  margin: auto;
  margin-bottom: 5px;
}
samp {
  font-size: 6rem;
}
.output {
  min-height: 100px;
}
</style>
</head>
<body>
	<header><h1>Casino Craps</h1></header>     
  <main>
    <form method="get" action="cc_ver21_712.php">             
      <table>
        <tr>
          <td><?= $alpha ?></td>
          <td><?= $bravo ?></td>
        </tr>
      </table>                   
      <p>
        <small>You rolled&hellip;</small>            
        <samp id="total"><?= $sum ?></samp>
      </p>
      <p class="output"><?= $output ?></p>        
      <input type="submit" name="roll" value="Roll the dice!">	
      <input type="submit" name="clear" value="Reset game">
    </form>            
  </main>       
  <footer><address>SYST10199 Web Programming &copy; Sheridan College</address></footer>  
</body>
</html>


