<?php

$output = "";
$player = $machine = NULL;
	
if(isset($_GET['move'])) {
    play();
}
if(isset($_GET['clear'])) {
    global $output, $player, $machine;
    $output = "";
    $player = $machine = NULL;
}                 
function play() {
    global $output;
    $moves = array("rock", "paper", "scissors", "lizard", "spock");
    $winner = array(     "rock" => array("paper", "spock"), 
                        "paper" => array("scissors", "lizard"), 
                     "scissors" => array("spock", "rock" ),
                       "lizard" => array("rock","scissors" ),
                        "spock" => array("lizard", "paper" )
    );
    $player = $_GET['move'];
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
<title>RPSLS</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"> 
<link rel="stylesheet" href="../css/style.css"> 
<link rel="stylesheet" href="../css/component.css">
<style>
main {
    flex-direction: column;
}
.reset {
    width: 336px;
    height: 48px;
    margin-bottom: 10px;
    
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
    <form method="GET" action="<?= $_SERVER["PHP_SELF"] ?>">
        <input type="submit" class="reset" name="clear" value="Reset game"><br>
        <button type="submit" name="move" value="rock"><img src="../images/rock.png" width="48" height="48"></button>
        <button type="submit" name="move" value="paper"><img src="../images/paper.png" width="48" height="48"></button>
        <button type="submit" name="move" value="scissors"><img src="../images/scissors.png" width="48" height="48"></button>
        <button type="submit" name="move" value="lizard"><img src="../images/lizard.png" width="48" height="48"></button>
        <button type="submit" name="move" value="spock"><img src="../images/spock.png" width="48" height="48"></button>
    </form>
    
    <h4>Your Move</h4>
    <div><?= $output ?></div>		
  </main>
  
  
  
  <footer>
      <address>SYST10199 Web Programming &copy; Sheridan College</address>
  </footer>
		
</body>
</html>