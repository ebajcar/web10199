<!DOCTYPE html>
<html lang="en">
<head>
<title>Casino Craps</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!--
Author: 		Ellen Bajcar
File name: 		cc_ver21_800.php
Date Created:	Summer 2021
Date Updated: 
Version: 		21_800
Purpose: 		learning Javascript programming; assignment requirements
Copyright: 
    This work is the intellectual property of Sheridan College. 
    Any further copying and distribution outside of class must be within 
    the copyright law. Posting to commercial sites for profit is prohibited.
Description:
    See README.md file, located in this project's root directory
-->
<style>
body {
  width: 50%;
  margin: auto;
  text-align: center;
  color: white;
  background-color: #222;
}
h1 {
  font-family: Papyrus;
}
table {
  margin: auto;
  text-align: center;
  border-collapse: separate;
  border-spacing: 15px 5px;    
}
.dice {
	height: 80px;
	width: 80px;
	background-color: teal;
	color: white;
	border-radius: 4px;
	border: 1px solid white;
	box-shadow: 5px 5px 5px gray;
	font-size: 60px;
    
}
[type=submit] {
  display: block;
  background: #fff;
  border-radius: 4px;
  border: 1px solid teal;
  color: teal;
  font-size: 1.5em;
  margin: auto;
  margin-bottom: 5px;
  width: 10em;
}
ul {
  list-style-type: none;
}
samp {
  font-size: 6rem;
}
.output {
  height: 70px;
}

</style>
</head>

<body>
	<header><h1>Casino Craps</h1></header>      
	<main>
    <form method="get" action="<?= $_SERVER[PHP_SELF] ?>">
      <table>
        <tr>
          <td class="dice"><?= $alpha ?></td>
          <td class="dice"><?= $bravo ?></td>
        </tr>
      </table>                   
      <p>
        <small>You rolled&hellip;</small>            
        <samp id="total"><?= $total ?></samp>
      </p>
      <p class="output"><?= $output ?></p> 
      <p>
        Wins: <span id="wins"><?= $wins ?></span>&nbsp;&nbsp;&nbsp;
        Losses: <span id="losses"><?= $losses ?></span>
      </p>         
      <input type="submit" name="roll" value="Roll the dice!">	
      <input type="submit" name="clear" value="Reset game">
    </form>            
  </main>
        
  <aside>
    <h4>How to play...</h4>
    <ul>
        <li>At the beginning of the game, the player rolls a pair of dice and the computer computes the total.</li>
        <li>If the total is 2, 3, or 12 (called "craps"), the player loses. </li>
        <li>If the total is 7 or 11 (called a "natural"), the player wins.</li>
        <li>If the total is any other number, that number becomes the "point". </li> 
    </ul>
    <ul>
        <li> From here, the player keeps rolling the dice until 
        <li>(a) the point comes up again, in which case the player wins, or </li>
        <li>(b) a 7 appears, in which case the player loses. </li>
        <li>The numbers 2,3,11, and 12 no longer have special significance after the first rolls.</li>
    </ul>  		
  </aside>
  <footer><address>SYST10199 Web Programming &copy; Sheridan College</address></footer>  
</body>
</html>


