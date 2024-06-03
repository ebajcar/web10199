<?php
echo "example of using global keywords<br>";
$one = 5;
$two = 7;
function sum() {
    global $one, $two;
    $together =  $one +  $two;
    return $together;
}
$newone = sum();
echo $newone;
?>