<!DOCTYPE html>

<!--- William Casely-Seaman -->
<!--- March 30,2023 -->
<!--- Rock,Paper,Scissors game with php -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,
                   initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Rock,Paper,Scissors</title>
	<style>
	</style>
</head>
<body>
    <section class="game">
       
        <div class="title">Rock,Paper,Scissors</div>
                

		
     Take your Pick:<br>
    <button onclick="RPSLS(0)">Rock</button>
    <button onclick="RPSLS(1)">Paper</button>
    <button onclick="RPSLS(2)">Scissors</button>
    <button onclick="RPSLS(Math.floor(Math.random()*3))">Random Game</button><P>
    <textarea id="txt1"></textarea><textarea id="txt1"></textarea>
         
         
        <button class="reload"></button>
 
    </section>
<?php

$message = "";
$choices = array("rock", "paper", "scissors");
$humanWins = array(
	"rock" => "paper",
	"paper" => "scissors",
	"scissors" => "rock"
);
$human = $choices[array_rand($choices)];
$machine = $choices[array_rand($choices)];
$message = "human choice: $human <br>machine choice: $machine" ; 

if ($machine == $human) {
	$message .= "<p>IT'S A TIE.</p>";
}else 
	$message .= ($humanWins[$machine] == $human)
		? "<p> Human Wins.</p>"
		: "<p> Computer Wins.</p>";
  echo $message;
  ?>

</body>

</html>