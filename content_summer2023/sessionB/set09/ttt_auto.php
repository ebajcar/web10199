<?php 
$output = "";
$outwho = "";
$message = "";
$game = array(
  "who" => 0,
  "board" => "222222222",
  "win" => -1,
  "playToken" => "XOT",
  "endGame" => -1,
  "clicked" => 9,
  "available" => array("0","1","2","3","4","5","6","7","8")
);	
for ($turn = 0; $turn < 9; $turn++) {
  play($game);
}

	
//	game is not over, prepare board for this turn, check winner, update session variables		
function play($game) {	
      	$game['clicked'] = array_rand($game["available"]);
  		removeUsed($game['clicked']);
		if ($game["clicked"] !== 9 )
			updateBoard($game); //print_r($game); 
		displayBoard();		
        print_r($game); echo "<br><br>";
} 


function removeUsed($playedCell) {
    global $game;
    //Remove element by value using unset()
    if (($key = array_search($playedCell, $game["available"])) !== false){
        unset($game["available"][$key]);
    }      
}

// identify which cell was clicked and update game state
function updateBoard($game) {
	global $outwho;
    $outwho = "";
	$cellClicked = $game['clicked']; //identify which button was submitted 					
	if ($cellClicked !== 9 ) {
		$curPos = $cellClicked; // get the actual button clicked. 0 to 8 correspond to respective cell
		$game["board"][$curPos] = $game["who"]; // set our game's data with player mark
		$game["who"] = ($game["who"]+1)%2; // switch the player turn
	} else {
		$game["who"] = 0;
	}
	$outwho .= "Player ".substr($game["playToken"],$game["who"],1)." go!";
    var_dump($outwho);
	return $outwho;
}

// prepare board (table) for next move with current state data
function displayBoard() {
	global $game, $output, $outwho;	
            $output = "";    
	$board = $game["board"];
	if ($game["clicked"] == 9) {
		for( $i = 0; $i < 9; $i++ ) {
			$output .= "<td class='available'>-</td>";
            
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
						$output .= "<td class='available'>-</td>";
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
	// $cellClicked = $game["clicked"];
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
                        $game["endGame"] = 99;
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