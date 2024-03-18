<!DOCTYPE html>
<html>
<body>

<?php
$moves = array("paper", "scissors", "rock", "lizard", "spock");
$output = "";
$winner = array( "rock" => ["paper", "spock"], 
				 "paper" => ["scissors", "lizard"], 
                 "scissors" => ["spock", "rock"],
                 "lizard" => ["rock","scissors"],
    			 "spock" => ["lizard", "paper"]
    	);
$player = $moves[array_rand($moves)];
$machine = $moves[array_rand($moves)];
$output = "your board: $player <br> computer's board: $machine";
$output .= ($machine == $player) 
			? "<p>IT IS A TIE.</p>"
            : ($winner[$machine][0] == $player || 
               $winner[$machine][1] == $player )
              ? "<p> YOU WIN.</p>"
              : "<p> YOU LOOSE. </p>";
echo $output;
?>

</body>
</html>

