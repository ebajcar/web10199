<?php 
session_start();  // http://php.net/manual/en/ref.session.php
// https://bajcar.dev.fast.sheridanc.on.ca/php10199/assign8/content/ttt.php
$output = "";
$outwho = "";
$message = "";
if(isset($_POST['reset'])) { 
	session_destroy();
	$game = array(
		"who" => 0,
		"board" => "222222222",
		"win" => -1,
		"playToken" => "XOT",
		"endGame" => -1,
		"clicked" => 9
	);	
} else {	
	isset($_POST['curCell']) 
        ? $game["clicked"] = $_POST['curCell'] 
        : $game["clicked"] = 9;	
	isset($_SESSION['who']) 
        ? $game["who"] = $_SESSION['who'] 
        : $game["who"] = 0;
	isset($_SESSION['board']) 
        ? $game["board"] = $_SESSION['board'] 
        : $game["board"] = "222222222";
	isset($_SESSION['win']) 
        ? $game["win"] = $_SESSION['win'] 
        : $game["win"] = -1;
	isset($_SESSION['playToken']) 
        ? $game["playToken"] = $_SESSION['playToken'] 
        : $game["playToken"] = "XOT";
	isset($_SESSION['endGame']) 
        ? $game["endGame"] = $_SESSION['win'] 
        : $game["endGame"] = -1;
}
play($game);
	
//	game is not over, prepare board for this turn, check winner, update session variables		
function play($game) {	
	if($game["endGame"] == -1) {
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
	$_SESSION['who'] = $game["who"];
	$_SESSION['win'] = $game["win"];
	$_SESSION['playToken'] = $game["playToken"];
	$_SESSION['endGame'] = $game["endGame"];
}

// identify which cell was clicked and update game state
function updateBoard() {
	global $game, $outwho;
	$cellClicked = $game['clicked']; //identify which button was submitted 					
	if ($cellClicked !== 9 ) {
		$curPos = $cellClicked; // get the actual button clicked. 0 to 8 correspond to respective cell
		$game["board"][$curPos] = $game["who"]; // set our game's data with player mark
		$game["who"] = ($game["who"]+1)%2; // switch the player turn
		$_SESSION['who'] = $game["who"];
	} else {
		$game["who"] = 0;
		$_SESSION['who'] = $game["who"];
	}
	$outwho .= "Player ".substr($game["playToken"],$game["who"],1)." go!";
	return $outwho;
}

// prepare board (table) for next move with current state data
function displayBoard() {
	global $game, $output, $outwho;	
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
					if ($curWinner > 990)
						$output .= '<td><input  class="available" type="submit" name="curCell" placeholder="-" value="' . $i . '"></td>';
					else
						$output .= "<td class='played'></td>";
					break;
				case 0:

					if (substr_count($curWinner, $i)) 
						$output .= "<td class='winner'>X</td>";
					else
						$output .= "<td class='played'>X</td>";	
					break;
				case 1:
					if (substr_count($curWinner, $i)) 
						$output .= "<td class='winner'>O</td>";
					else			
						$output .= "<td class='played'>O</td>";	
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
	if: when a winner is identified, display who has won
	elseif: when no more "2" chars are found in the board string, all cells have been played (tie)
	else if there is no winner, display message whose turn it is 	
		//print_r($winCombo[$row]);	//print_r($idx);
*/
function checkWinner($game) {
	global $_POST, $outwho, $message ;
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
						$game["win"] = $board[$winCombo[$row][0]];
						$winner = $winCombo[$row];					
				}
			}
		}			
		if ($game["win"] != -1) {
			$message = "<p>" . substr($game["playToken"],$game["win"],1) . " wins</p>";
			$outwho = "";
		}
		elseif (count_chars($board,3) == "01") {
			$message = "<p>Game over. No winner</p>";
			$outwho = "";
		}
	} 
	return $winner;
}
?>

	<form method="POST"> 
		<input type="submit" value="Start over" name="reset">
		<table class="ttt">
			<tr>
				<?= $output ?>
			</tr>
		</table>		
	</form>	
	<p><?= $message ?></p>
	<h5><?= $outwho ?></h5>	