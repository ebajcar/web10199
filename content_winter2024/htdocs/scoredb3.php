<!DOCTYPE html>
<html lang="en">
<head>
<title>Scores</title>
<meta charset="utf-9">
<style>
section, h1 {
	border: 0px;
	text-align: center;
	padding: 5px;
	margin: auto,
}
table, tr, td {
	text-align: center;
	margin: auto;
	width: 500px;
	border: 1px solid red;
	background-color: #eeeeee;
}
label {
	display: block;
    margin: 10px;
}
.back {
	font-size:14px;
	background-color: white;
	border:1px gray solid;
	padding: 5px 10px;
	border-radius:5px;
	box-shadow: 1px 1px 1px darkgray;	
}
p, details {
    font-size: 1.5em;
    text-align: center;
}
footer {
   position: fixed; 
   bottom: 0; 
   width: 100%;  
}
footer address {
    font-size: 1.5em;
    text-align: center;
    margin: auto;
}
</style>
</head>
<body>
	<h1>Learning PHP MySQL with PDO</h1>
	<section>
		<!-- note the use of the post method 
			  the action attribute determines which file is to be executed on
			  submission of the form; the path needs to be included if the file
			  is not located in the same directory -->
		<form name="form1" method="post" action="scoredb.php">
			<label> Player: <input name="player" type="text" id="player" required></label>
			<label>Score:
				<select name="score" id="score">
					<option disabled>Score</option>
					<option value="100">100 points</option>
					<option>200</option>
					<option>300</option>
          <option>400</option>
          <option>500</option>
					<option>600</option>
					<option>700</option>
				</select>
			</label>
			<div>
				<input type="submit" name="Submit" value="Click to submit">
				<input name="game" type="hidden" value="darts">
			</div>
		</form>
	</section>
    <h1>Results</h1>
    <footer><address>Web Programming | Sheridan College @Ellen Bajcar</address></footer>   

    
<?php
//  INCOMPLETE CODE


function collectValues() {
    $error = "<details><summary>You must submit a player and a score</summary>More details can be provided here.</details>";
    //COLLECT VARIABLES FROM HTML
    if (isset($_POST['player'])) {
        $player = $_POST['player'];
    } else {
        echo $error;  return;
    }
    if (isset($_POST['score'])) {
        $score = $_POST['score'];
    } else {
        echo $error;  return;
    }
    $date = date("Y-m-d");
    $error = 0;
}

function connectToDB() {
    /*
        connect to the database
        select database, use your username and password
        "localhost" assuming the php and database are on the same server
        http://localhost/phpmyadmin/index.php for xampp
        NOTE: if your password has a special char such as $, use the single quotation or escape the special char.    
    */
    try {
        // replace with require("info.php");
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "bajcar_syst10199";    

        // connect to the database
        $dbh = new PDO("mysql:host=localhost;dbname=$dbname", $username, $password);
        
        // set the PDO error mode to exception
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }
    catch(PDOException $e) {
        echo "<p>Could not connect " . $e->getMessage() . " </p>";
    }
}


function addRecord($dbh) {
	global $player, $score, $date;
   
	/*
		Write a new record to the database
		compose the SQL statement    
	*/
	try {
		// SQL statement
		$command = "INSERT INTO score_list ( player, score, date ) VALUES ( '$player','$score','$date')";
		
		// prepare the statement for execution
		$stmt = $dbh -> prepare($command);
		
		// execute the prepared statement
		if ( !$stmt->execute() ) {
		$error = "<p>Sorry, could not record score.</p>";  
		echo $error;  
		return $dbh;
		}   
	}
	catch(PDOException $e) {
		echo "<p>Could not update " . $e->getMessage() . " </p>";
	}
}


function getDataSet($dbh) {
    global $player, $score, $date;
/*
    Retrieve a dataset from the database
    compose the SQL statement    
*/
try {	
	// prepare statement, select all columns for a given player
	$query = "SELECT * FROM score_list WHERE player='$player' ORDER BY score DESC";
    
	// result variable holds the entire dataset returned 
	$result  = $dbh -> prepare($query);
    
    // execute the prepared statement    
    echo "<p>for ".$player."</p>"; 
	if ( $result->execute() ) {
		echo '<table>
		<tr><th>SCORE</th><th>DATE</th></tr>';
		$tally = 0;
		$total = 0;
        // fetch one record at a time from the dataset
		while ($myrow = $result->fetch()) {
			$tally = $tally + $myrow['score'];
			$total = $total + 1;
			echo "<tr>
					<td>".$myrow['score']."</td>
					<td>".$myrow['date']."</td>
				  </tr>\n";
		}
		$ave = $tally / $total;
		echo "</table> <p>total =".$tally."&nbsp;&nbsp;   average =".$ave."</p>";
	} else {
		$error = "Sorry could not retrieve scores";  echo $error;  return;
	}
	$dbh = null;
	exit;
    
}
catch(PDOException $e) {
    echo "<p>Could not connect " . $e->getMessage() . " </p>";
}
}
collectValues();
$dbh = connectToDB();
addRecord($dbh);
getDataSet($dbh);
?>


</body>
</html>
