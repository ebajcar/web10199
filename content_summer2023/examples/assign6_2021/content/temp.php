<?php
$moves = array("rock", "paper", "scissors", "lizard", "spock");
$output = "";
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
		$output .= ( $winner[$machine][0] == $player || $winner[$machine][1] == $player ) 
				? "<p>YOU WIN!</p>" 
				: "<p>COMPUTER WINS!</p>";
	}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>increment an integer</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"> 
<link rel="stylesheet" href="../css/style.css"> 
<link rel="stylesheet" href="../css/component.css">
<style>
select, input, form, div {
    display: block;
}
</style>
</head>

<body>
	<header>
		<h1>Class exercises</h1>
	</header>
  <nav>
    <a href="../index_members.html">Home</a>
  </nav>
  
 
  <main>  
    <form method="POST">
        
        <select size="5" name="move" required id="choice" >
            <option value="rock">rock</option>
            <option value="paper">paper</option>
            <option value="scissors">scissors</option>
            <option value="lizard">lizard</option>
            <option value="spock">spock</option>
        </select>
        
        
        <input type="submit" id="human" value="Select And Play" title="You must choose one of the items in the list">
    </form>
    
    <h4>Your Move</h4>
    <div><?= $output ?></div>		
  </main>
  
  
  
  <footer>
      <address>SYST10199 Web Programming &copy; Sheridan College</address>
  </footer>
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
</body>
</html>