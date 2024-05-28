<?php
/*
Author: Ellen Bajcar
Date: Summer 2021
Version: 8.1
Copyright: 
	This work is the intellectual property of Sheridan College. 
	Any further copying and distribution outside of class must be within 
	the copyright law. Posting to commercial sites for profit is prohibited.
Purpose: code provided for web programming Assignment 8
*/
$moves = array("rock", "paper", "scissors");
$output = "<h4>Results</h4>";
$winner = array( "rock" => "paper", 
				 "paper" => "scissors", 
				 "scissors" => "rock");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$player = $_POST['move'];
	$machine = $moves[array_rand($moves)];
	$output .= "<p>Your board<br><kbd>$player</kbd></p>";
	$output .= "<p>Computer's board<br><kbd>$machine</kbd></p>";
	if ($machine == $player) 
		$output .= "<p>IT IS A TIE.</p>";
	else 
		$output .= ($winner[$machine] == $player)
						? "<p>YOU WIN.</p>"
						: "<p>YOU LOSE.</p>";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>RPS</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width" />	
<style>
body {
    width: 680px;
    margin: 0 auto;
    text-align: center;
} 
</style>
</head>
<body>
<form method="POST">
	<h4>Your Move</h4>
	<select size="3" name="move" required>
		<option value="rock">rock</option>
		<option value="paper">paper</option>
		<option value="scissors">scissors</option>
	</select>
    <br><br>
	<input type="submit" value="Select And Play" />
</form>
<aside><?= $output ?></aside>

</body>
</html>




