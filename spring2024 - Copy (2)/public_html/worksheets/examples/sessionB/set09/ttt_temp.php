<?php 
session_start();
$output = "";
$message = "";
if(isset($_POST['reset'])) { 
	session_destroy();
	$game = array(
		"player" => 0,
		"board" => "222222222",
		"playToken" => "XOT",
		"gameOver" => -1,
		"clicked" => 9
	);	
} else {	
	$game["clicked"] = (isset($_POST['curCell'])) ? $_POST['curCell'] : 9;	
	$game["player"] = (isset($_SESSION['player'])) ? $_SESSION['player'] :   0;
	$game["board"] = (isset($_SESSION['board']))   ? $_SESSION['board'] : "222222222";
    $game["playToken"] = (isset($_SESSION['playToken'])) ? $_SESSION['playToken'] : "XOT";
	$game["gameOver"] = (isset($_SESSION['gameOver'])) ? $_SESSION['gameOver'] : -1;
}
play($game);
	
//	game is not over, prepare board for this turn, check winner, update session variables		
function play($game) {	
	if($game["gameOver"] == -1) {
		if ($game["clicked"] !== 9 )
			updateBoard(); //print_r($game); 
		displayBoard();		
		updateSession();		
	} 
} 
	
//	update session variables so we can access it next time with current game info...
function updateSession() {
	global $game;
	$_SESSION['board'] = $game["board"];
	$_SESSION['player'] = $game["player"];
	//$_SESSION['win'] = $game["win"];
	$_SESSION['playToken'] = $game["playToken"];
	$_SESSION['gameOver'] = $game["gameOver"];
}

// identify which cell was clicked and update game state
function updateBoard() {
	global $game, $message;
	$cellClicked = $game['clicked']; //identify which button was submitted 					
	if ($cellClicked !== 9 ) {
		$curPos = $cellClicked; // get the actual button clicked. 0 to 8 correspond to respective cell
		$game["board"][$curPos] = $game["player"]; // set our game's data with player mark
		$game["player"] = ($game["player"]+1)%2; // switch the player turn
		$_SESSION['player'] = $game["player"];
	} else {
		$game["player"] = 0;
		$_SESSION['player'] = $game["player"];
	}
	$message = "Player ".substr($game["playToken"],$game["player"],1)." go!";
}

// prepare board (table) for next move with current state data
function displayBoard() {
	global $game, $output;	
	$board = $game["board"];
	if ($game["clicked"] == 9) {
		for( $i = 0; $i < 9; $i++ ) {
			$output .= '<td><input  class="available" type="submit" name="curCell" placeholder="-" value="' . $i . '"></td>';
			if(($i+1)% 3 == 0  && $i < 8)
				$output .= "</tr><tr>";	
		}		
	}
	if ($game["clicked"] != 9) {
		$curWinner = checkWinner($game); //print_r($curWinner);						
		for( $i = 0; $i < 9; $i++ ) {		
			switch ($board[$i]) {
				case 2:
					$output .= ($curWinner > 990)
						? '<td><input  class="available" type="submit" name="curCell" placeholder="-" value="' . $i . '"></td>'
                        : "<td class='played'></td>";
					break;
				case 0:
					$output .= (substr_count($curWinner, $i)) 
						? "<td class='winner'>X</td>"
                        : "<td class='played'>X</td>";	
					break;
				case 1:
					$output .= (substr_count($curWinner, $i)) 
						? "<td class='winner'>O</td>"
                        : "<td class='played'>O</td>";	
					break;			
			}	
			if(($i+1)% 3 == 0  && $i < 8)
				$output .= "</tr><tr>";	
		}
	} 
	return $output;
}	

/*
	check all winning combinations, 
	declare a winner and 
	complete the game
	if: when a winner is identified, display player has won
	elseif: when no more "2" chars are found in the board string, all cells have been played (tie)
	else if there is no winner, display message playerse turn it is 	
		//print_r($winCombo[$row]);	//print_r($idx);
*/
function checkWinner($game) {
	global  $message ;
	$winner = "999";
	$board = $game["board"];
	$cellClicked = $game["clicked"];
	if ($game["clicked"] !== 9) {
		settype($cellClicked, "string");
		$winCombo = array("012","345","678","036","147","258","840","246");
		for( $row = 0; $row < 8; $row++ ) {	
			// identify which row, column, and diag has been changed by current selection
			($cellClicked < 9) 
				? $idx = substr_count($winCombo[$row], $cellClicked)
				: $idx = -1;
			// test only the changed row, columns, and diags
			if ($idx == 1) { 
				if ( $board[$winCombo[$row][0]] == $board[$winCombo[$row][1]] && 
					 $board[$winCombo[$row][1]] == $board[$winCombo[$row][2]] ) 	{	
						//$game["win"] = $board[$winCombo[$row][0]];
						$winner = $winCombo[$row];	
                     
				}
			}
		}			
		if ($game["gameOver"] != -1) {
			$message = substr($game["playToken"],$game["gameOver"],1) . " wins";
		}
		elseif (count_chars($board,3) == "01") {
			$message = "Game over. No winner";
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
</style>
</head>
<body>
    <h3>A Game of Tic Tac Toe</h3>
   <pre><?php print_r($game);   ?></pre>
	<form method="POST"> 		
		<table class="ttt">
			<tr>
				<?= $output ?>
			</tr>
		</table>	
        <p><?= $message ?></p>
        <input type="submit" value="Start over" name="reset">        
	</form>	
    <footer><address>SYST10199 Web Programming &copy; Sheridan College</address></footer> 	  
</body>
</html>