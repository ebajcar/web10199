<?php
/*
  https://www.w3schools.com/php/php_exception.asp
*/

// https://www.php.net/manual/en/class.exception.php
class customException extends Exception {
  public function errorMessage() {
    //error message
    $errorMsg = 'Error on line '.$this->getLine().' in '.$this->getFile()
    .': <b>'.$this->getMessage().'</b> is not a valid E-Mail address';
    return $errorMsg;
  }
}

$email = "someone@example...com";

// filter_var — Filters a variable with a specified filter
// https://www.php.net/manual/en/function.filter-var
// https://www.php.net/manual/en/filter.filters.validate.php
try {
  //check if
  if(filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
    //throw exception if email is not valid
    throw new customException($email);
  }
}

catch (customException $e) {
  //display custom message
  echo $e->errorMessage();
}
?>