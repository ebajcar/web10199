<!DOCTYPE html>
<html>
<body>

<?php
$moves = array("rock", "paper", "scissors");
$output = "";
$winner = array( "rock" => "paper", "paper" => "scissors", "scissors" => "rock");
$player = $moves[array_rand($moves)];
$machine = $moves[array_rand($moves)];
$output = "your board: $player <br> computer's board: $machine";
$output .= ($machine == $player) 
			? "<p>IT IS A TIE.</p>"
            : ($winner[$machine] == $player)
              ? "<p> YOU WIN.</p>"
              : "<p> YOU LOOSE. </p>";
echo $output;
?>

</body>
</html>
