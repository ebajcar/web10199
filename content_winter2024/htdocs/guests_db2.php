<!DOCTYPE html>
<html lang="en">
<head>
<style>
body {
    width: 100%;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    background-color: linen;
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
// source https://www.w3schools.com/php/showphpfile.asp?filename=demo_db_select_pdo

/*
    RecursiveIteratorIterator class
    Can be used to iterate through recursive iterators.
    https://www.php.net/manual/en/class.recursiveiteratoriterator.php
*/
class GuestTable extends RecursiveIteratorIterator { 
    public $firstname = "First Name";
    public $lastname = "Last Name";
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
    
    // added method to create the beginning of table markup and column headings
    function startTable() {
        echo "<table>";
        echo "<tr><th>Id</th><th>".$this->firstname."</th><th>".$this->lastname."</th></tr>";
    }
    // added method to complete the table markup
    function endTable() {
        echo "</table>";
    }
} 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bajcar_syst10199";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    /*
        PDO::ATTR_ERRMODE: Error reporting.
        PDO::ERRMODE_EXCEPTION: Throw exceptions.
        PDO::prepare ? Prepares a statement for execution and returns a statement object
        PDOStatement::execute ? Executes a prepared statement
        SQL statements (https://www.w3schools.com/sql/sql_select.asp)
    */
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT id, firstname, lastname FROM MyGuests"); 
    $stmt->execute();

    /*
        set the resulting array to associative
        PDOStatement::setFetchMode ? Set the default fetch mode for this statement 
        PDO::FETCH_ASSOC: returns an array indexed by column name as returned in your result set
    */
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 

     /*
        PDOStatement::fetchAll ? Returns an array containing all of the result set rows
        
        RecursiveArrayIterator class
        This iterator allows to unset and modify values and keys while iterating over Arrays and Objects 
        in the same way as the ArrayIterator. Additionally it is possible to iterate over the current iterator entry.
        https://www.php.net/manual/en/class.recursivearrayiterator.php
     */    
    $MyNewObj = new GuestTable(new RecursiveArrayIterator($stmt->fetchAll()));
    
    $MyNewObj->startTable();  
    foreach ($MyNewObj as $k=>$v) {
        echo $v;
    }
    $MyNewObj->endTable();
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