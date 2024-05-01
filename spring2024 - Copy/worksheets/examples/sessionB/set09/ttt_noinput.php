<?php 
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
    echo "<code>";
    print_r($game); echo "<br><br>"; 
    echo "</code>";
}
	
function play() {
	global $game;
    $game['clicked'] = array_rand($game["available"]);
    removeUsed($game['clicked']);
    updateBoard();
    displayBoard();		
} 

function removeUsed($playedCell) {
    global $game;
    if (($key = array_search($playedCell, $game["available"])) !== false){
        unset($game["available"][$key]);
    }      
}

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
			$game["output"] .= "<td class='available'>-</td>";          
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
					$game["output"] .= ($curWinner > 990)
						? "<td class='available'>-</td>"
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
<title>Tic Tac Toe (no input)</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width" />
<style>
body, table {
    margin: auto;
    text-align: center;
} 
td {
    width:50px;
    height:50px;
    border: 1px solid blue;
    font-size:40px;
    text-align:center;
    font-family:sans-serif;
} 
</style>
</head>
<body>
    <table class="ttt">
      <tr>
        <?= $game["output"] ?>
      </tr>
    </table>		
	<p><?= $game["message"] ?></p>
	<h5><?= $game["outwho"] ?></h5>	
</body>
</html>