<?php
/*
  https://www.php.net/manual/en/intro.json.php
  This extension implements the » JavaScript Object Notation (JSON) data-interchange format. 
  PHP comes with a parser that is specifically written for PHP and licensed under the PHP license.
  
  https://www.json.org/json-en.html
  
  https://www.w3schools.com/js/js_json_php.asp
*/

/*
class stdClass { 
}
*/

$myObj = new stdClass();
$myObj->name = "John";
$myObj->age = 30;
$myObj->city = "New York";

$myJSON = json_encode($myObj);

echo $myJSON;
?>
  