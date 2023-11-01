<!DOCTYPE html>
<html lang="en">
<head>
<style>
body {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    background-color: lightgray;
}
footer {
  position: -webkit-sticky; /* Safari */
  margin-top:100px;
  position: sticky;
  bottom: 0;
}
table {
    margin: auto;
    padding: 0;
    text-align: center;  
    border: solid 1px black;    
}
td {
    width: 150px; 
    border: 1px solid black;
}
tr:nth-child(odd) {
    background-color: orange;
}
tr:first-child {
    color: white;
    background-color: black;
}
</style>
</head>
<body>
    <h2>Using PHP Iterators to create and PDO to populate a table</h2>
<?php

echo "<table>";
echo "<tr>
        <th>Id</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Favouite colour</th>
        <th>Date</th>
      </tr>";

class TableRows extends RecursiveIteratorIterator { 
    function __construct($it) { 
        parent::__construct($it, self::LEAVES_ONLY); 
    }

    function current() {
        return "<td>" . parent::current(). "</td>";
    }

    function beginChildren() { 
        echo "<tr>"; 
    } 

    function endChildren() { 
        echo "</tr>" . "\n";
    } 
} 

// login credentials are included here
require('../assign8/includes/info.php');

try {
    $conn = new PDO("mysql:host=$SERVERNAME;dbname=$DATABASENAME", $USERNAME, $PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id, firstname, lastname,favcolor, date FROM MyGuests"); 
    $stmt->execute();

    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
   
    foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
        echo $v;
    }
}
catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
echo "</table>";
?> 
    <footer>Web Programming, 2018-<?php echo date('Y');?> &copy; Sheridan College</footer>
</body>
</html>