<!DOCTYPE html>
<!-- 
Author: Ellen Bajcar
Program: hangman.html
Date: Summer 2016
Date Updated: 8:25 AM June-09-16
Version: 5.0 (Week 5 stage)
Purpose: learning Javascript programming
Copyright: 
    This work is the intellectual property of Sheridan College. 
    Any further copying and distribution outside of class must be within 
    the copyright law. Posting to commercial sites for profit is prohibited.
Description:
    Example for SYST10199 Web Programming, Summer 2016, Ellen Bajcar 
    http://codepen.io/ebajcar/pen/EyxZyx
    https://simple.wikipedia.org/wiki/List_of_countries_by_continents   
    https://www.codecademy.com/courses/javascript-intermediate-tpoPb/0/1    
-->

<html>
<head><?php
//make sure you update the credentials appropriately
$USRID="root";
$PASSWD="";
$error = "";


//OPEN DATABASE
//select table, use your username and password
// "localhost" assuming the php and database are on the same server
	try {
		$dbh = new PDO("mysql:host=localhost;dbname=ellen", $USRID, $PASSWD);
	} catch (Exception $e) {
		error_log("Cannot connect to MySQL: $e\n", 3, "myErrors.log");
	}
	
//OUTPUT TO HTML
// prepare statement, select all columns for a given player
$query = "SELECT * FROM hangman";

// result variable holds the entire dataset returned 
$result  = $dbh -> prepare($query);
if ( $result->execute() ) {
	echo '<table>
	<tr><th>Category</th><th>Phrase</th></tr>';
	$tally = 0;
	$total = 0;
	while ($myrow = $result->fetch()) {
		echo "<pre>";
		print_r($myrow);
		echo "</pre>";
		echo "<tr>
				<td>".$myrow['category']."</td>
				<td>".$myrow['phrase']."</td>
			  </tr>\n";
	}
	echo '</table>';
} else {
	error_log("Sorry could not retrieve gamers... \n", 3, "myErrors.log");
}
$dbh = null;
?>
    <meta charset="utf-8">
    <title>hangman</title>
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <link href=
    "http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
    rel="stylesheet">
    <link href="css/hangman.css" rel="stylesheet">
    <style>
    </style>
</head>
<body>
    <header class="wrapper"><h1>Hangman</h1></header>
    <div class="wrapper">
        <canvas id="stickman">
            Your browser does not support HTML5 Canvas tag
        </canvas>
        <p id="catagoryName"></p>
        <div id="hold"></div>
        <p id="mylives"></p>
        <p>Select your guess by clicking on the corresponding letter</p>
        <div id="buttons"></div>
        <div class="container">
            <button id="reset">Play again</button>
        </div>
    </div>
	<script src="js/canvas.js" type="text/javascript"></script>
    <script src="js/oHangma2.js" type="text/javascript"></script>
</body>
</html>