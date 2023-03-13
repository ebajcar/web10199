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
// source https://tryphp.w3schools.com/showphpfile.php?filename=demo_db_select_pdo

/*
    https://www.php.net/manual/en/book.pdo.php
    PDO ? The PDO class
        PDO::beginTransaction ? Initiates a transaction
        PDO::commit ? Commits a transaction
        PDO::__construct ? Creates a PDO instance representing a connection to a database
        PDO::errorCode ? Fetch the SQLSTATE associated with the last operation on the database handle
        PDO::errorInfo ? Fetch extended error information associated with the last operation on the database handle
        PDO::exec ? Execute an SQL statement and return the number of affected rows
        PDO::getAttribute ? Retrieve a database connection attribute
        PDO::getAvailableDrivers ? Return an array of available PDO drivers
        PDO::inTransaction ? Checks if inside a transaction
        PDO::lastInsertId ? Returns the ID of the last inserted row or sequence value
        PDO::prepare ? Prepares a statement for execution and returns a statement object
        PDO::query ? Executes an SQL statement, returning a result set as a PDOStatement object
        PDO::quote ? Quotes a string for use in a query
        PDO::rollBack ? Rolls back a transaction
        PDO::setAttribute ? Set an attribute
    
    PDOStatement ? The PDOStatement class
        PDOStatement::bindColumn ? Bind a column to a PHP variable
        PDOStatement::bindParam ? Binds a parameter to the specified variable name
        PDOStatement::bindValue ? Binds a value to a parameter
        PDOStatement::closeCursor ? Closes the cursor, enabling the statement to be executed again
        PDOStatement::columnCount ? Returns the number of columns in the result set
        PDOStatement::debugDumpParams ? Dump an SQL prepared command
        PDOStatement::errorCode ? Fetch the SQLSTATE associated with the last operation on the statement handle
        PDOStatement::errorInfo ? Fetch extended error information associated with the last operation on the statement handle
        PDOStatement::execute ? Executes a prepared statement
        PDOStatement::fetch ? Fetches the next row from a result set
        PDOStatement::fetchAll ? Returns an array containing all of the result set rows
        PDOStatement::fetchColumn ? Returns a single column from the next row of a result set
        PDOStatement::fetchObject ? Fetches the next row and returns it as an object
        PDOStatement::getAttribute ? Retrieve a statement attribute
        PDOStatement::getColumnMeta ? Returns metadata for a column in a result set
        PDOStatement::nextRowset ? Advances to the next rowset in a multi-rowset statement handle
        PDOStatement::rowCount ? Returns the number of rows affected by the last SQL statement
        PDOStatement::setAttribute ? Set a statement attribute
        PDOStatement::setFetchMode ? Set the default fetch mode for this statement   

    Iterators ( https://www.php.net/manual/en/class.recursivearrayiterator.php )
    PHP already provides a number of iterators for many day to day tasks. See SPL iterators for a list.
*/


echo "<table>";
echo "<tr><th>Id</th><th>Firstname</th><th>Lastname</th></tr>";

 /*
    RecursiveIteratorIterator class
    Can be used to iterate through recursive iterators.
    https://www.php.net/manual/en/class.recursiveiteratoriterator.php
 */
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

require('relativepath/info.php');

try {
    $conn = new PDO("mysql:host=$SERVERNAME;dbname=$DATABASENAME", $USERNAME, $PASSWORD);
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