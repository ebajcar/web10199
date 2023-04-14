<?php 
session_start();
/*
$game = array(
  "output" =>  "",
  "outwho" =>  "",
  "message" =>  "",
  "who" => 0,
  "board" => "222222222",
  "win" => -1,
  "playToken" => "XOT",
  "endGame" => false,
  "clicked" => 9,
  "available" => array("0","1","2","3","4","5","6","7","8")
);	
while (!$game["endGame"]) {
    play();    
    echo "<pre>";
    print_r($game); echo "<br><br>"; 
    echo "</pre>";
}
*/
if(isset($_POST['reset'])) { 
	session_destroy();
	$game = array(
      "output" =>  "",
      "outwho" =>  "",
      "message" =>  "",
      "who" => 0,
      "board" => "222222222",
      "win" => -1,
      "playToken" => "XOT",
      "endGame" => false,
      "clicked" => 9,
      "available" => array("0","1","2","3","4","5","6","7","8")
	);	
} else {	
    $game["output"] = (isset($_POST['output'])) ? $_POST['output'] :  "";
    $game["outwho"] = (isset($_POST['outwho'])) ? $_POST['outwho'] :  "";
    $game["message"] = (isset($_POST['message'])) ? $_POST['message'] :  "";
    $game["who"] = (isset($_SESSION['who'])) ? $_SESSION['who'] :   0;
    $game["board"] = (isset($_SESSION['board']))   ? $_SESSION['board'] : "222222222";
    $game["win"] = (isset($_SESSION['win'])) ? $_SESSION['win'] : -1;
    $game["playToken"] = (isset($_SESSION['playToken'])) ? $_SESSION['playToken'] : "XOT";
    $game["endGame"] = (isset($_SESSION['endGame'])) ? $_SESSION['endGame'] : false;
    $game["clicked"] = (isset($_POST['clicked'])) ? $_POST['clicked'] : 9;	
	//$game["available"] = (isset($_SESSION['available'])) ? $_SESSION['available']  : array("0","1","2","3","4","5","6","7","8");
}
play();
	
function play() {
	global $game;
    //$game['clicked'] = array_rand($game["available"]);
    //removeUsed($game['clicked']);
    if(!$game["endGame"]) {
        updateBoard();
        displayBoard();	
        updateSession();	
    }
} 

//	update session variables so we can access it next time with current game info...
function updateSession() {
	global $game;
    $_SESSION['output'] = $game["output"];
    $_SESSION['outwho'] = $game["outwho"];
    $_SESSION['message'] = $game["message"];
    $_SESSION['who'] = $game["who"];
	$_SESSION['board'] = $game["board"];
	$_SESSION['win'] = $game["win"];
	$_SESSION['playToken'] = $game["playToken"];
    $_SESSION['endGame'] = $game["endGame"];
	$_SESSION['clicked'] = $game["clicked"];
	//$_SESSION['available'] = $game["available"];    
}

/*
function removeUsed($playedCell) {
    global $game;
    if (($key = array_search($playedCell, $game["available"])) !== false){
        unset($game["available"][$key]);
    }      
}
*/

function updateBoard() {
	global $game;
    $game["outwho"] = "";
	$cellClicked = $game['clicked'];   	
	if ($cellClicked != 9 ) {
		$game["board"][$cellClicked] = $game["who"];  
		$game["who"] = ($game["who"]+1) % 2;
	} else {
		$game["who"] = 0;
	}
	$game["outwho"] .= "Player ".substr($game["playToken"],$game["who"],1)." go!";   
	return $game["outwho"];
}

function displayBoard() {
	global $game;	
    $game["output"] = "";    
	$board = $game["board"];
	if ($game["clicked"] == 9) {
		for( $i = 0; $i < 9; $i++ ) {
            // display input to submit this particular cell
			$game["output"] .= '<td><input  class="available" type="submit" name="clicked" placeholder="-" value="' . $i . '"></td>';          
			if(($i+1)% 3 == 0  && $i < 8)
				$game["output"] .= "</tr><tr>";	
		}		
	}
	if ($game["clicked"] != 9) {
		$curWinner = checkWinner(); 
        //print_r($curWinner);						
		for( $i = 0; $i < 9; $i++ ) {		
			switch ($board[$i]) {
				case 2:
                    // input still available on unplayed cells
					$game["output"] .= ($curWinner > 990)
						? '<td><input  class="available" type="submit" name="clicked" placeholder="-" value="' . $i . '"></td>'
                        : "<td class='played'> </td>";
					break;
				case 0:
					$game["output"] .=  (substr_count($curWinner, $i)) 
						? "<td class='winner'>X</td>"
					 	: "<td class='played'>X</td>";	
					break;
				case 1:
					$game["output"] .= (substr_count($curWinner, $i)) 
						? "<td class='winner'>O</td>"
                      	: "<td class='played'>O</td>";	
					break;			
			}	
			if(($i+1)% 3 == 0  && $i < 8)
				$game["output"] .= "</tr><tr>";	
		}
	} 
	return $game["output"];
}	
function checkWinner() {
	global $game ;
	$winner = "999";
	$board = $game["board"];
	$cellClicked = $game["clicked"];
	if ($game["clicked"] !== 9) {
		settype($cellClicked, "string");
		$winCombo = array("012","345","678","036","147","258","840","246");
		for( $row = 0; $row < 8; $row++ ) {	
			($cellClicked < 9) 
				? $idx = substr_count($winCombo[$row], $cellClicked)
				: $idx = -1;
			if ($idx == 1) { 
				if ( $board[$winCombo[$row][0]] == $board[$winCombo[$row][1]] && 
					 $board[$winCombo[$row][1]] == $board[$winCombo[$row][2]] ) 	{	
						$game["win"] = $board[$winCombo[$row][0]];
						$winner = $winCombo[$row];
                        $game["endGame"] = true;
                       
				}
			}
		}			
		if ($game["win"] != -1) {
			$game["message"] = "<p>".substr($game["playToken"],$game["win"],1)." wins</p>";
			$game["outwho"] = "";
		}
		elseif (count_chars($board,3) == "01") {
			$game["message"] = "<p>Game over. No winner</p>";
			$game["outwho"] = "";
            $game["endGame"] = true;
		}
	} 
	return $winner;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Tic Tac Toe (procedural)</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width" />
<style>
body {
    width: 680px;
    margin: 0 auto;
    text-align: center;
} 
table {
     margin: auto;
} 
td {
    width:50px;
    height:50px;
    border: 1px solid blue;
    font-size:40px;
    text-align:center;
    font-family:arial, helvetica, sans-serif;
} 
td input, form{
    background-color: white;
    border: none;
    margin-bottom: 10px;
}
tr:first-child td {
    border-top: none;
}
tr:nth-child(3) td {
    border-bottom: none;
}
td:first-child {
    border-left: none;
}
td:last-child {
    border-right: none;
}
.winner {
    color: red;
}
</style>
</head>
<body>
    <h3>A Game of Tic Tac Toe</h3>
    <pre hidden><?php print_r($game); ?></pre>
	<form method="POST"> 		
		<table class="ttt">
			<tr>
				<?= $game["output"] ?>
			</tr>
		</table>	
        <p><?= $game["message"] ?></p>
        <input type="submit" value="Start over" name="reset">        
	</form>	
    <footer><address>SYST10199 Web Programming &copy; Sheridan College</address></footer> 	  
</body>
</html>
