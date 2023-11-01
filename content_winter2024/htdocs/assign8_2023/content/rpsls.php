<?php
$moves = array("rock", "paper", "scissors", "lizard", "spock");
$output = "<h4>Results</h4>";
$winner = array(     "rock" => array("paper", "spock"), 
				    "paper" => array("scissors", "lizard"), 
				 "scissors" => array("spock", "rock" ),
				   "lizard" => array("rock","scissors" ),
				    "spock" => array("lizard", "paper" )
				 );		
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$player = $_POST['move'];
	$machine = $moves[array_rand($moves)];
	$output .= "<p>Your board<br><kbd>$player</kbd></p>";
	$output .= "<p>Computer's board<br><kbd>$machine</kbd></p>";	
	if ($machine == $player) {
		$output .= "<p>IT IS A TIE.</p>";
	} else {
		( $winner[$machine][0] == $player || $winner[$machine][1] == $player ) 
				? $output .= "<p>YOU WIN!</p>" 
				: $output .= "<p>COMPUTER WINS!</p>";
	}
}
?>
<form method="POST">
	<h4>Your Move</h4>
	<select size="5" name="move" required id="choice" >
		<option value="rock">rock</option>
		<option value="paper">paper</option>
		<option value="scissors">scissors</option>
		<option value="lizard">lizard</option>
		<option value="spock">spock</option>
	</select>
	<input type="submit" id="human" value="Select And Play" title="You must choose one of the items in the list">
</form>
<aside><?= $output ?></aside>



<script>
// will add later, when validating...
var items = document.getElementById("human");
var choice = document.getElementById("choice");
items.addEventListener("input", function (event) {
  if (choice.validity) {
    items.setCustomValidity("I expect you to choose one of these first, darling!");
  } else {
    items.setCustomValidity("");
  }
});
</script>