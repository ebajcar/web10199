<!DOCTYPE html>
<html>
<body>
/*
In this example, if the input n is equal to 0, the function returns 1, which serves as the base case. Otherwise, it recursively calls itself with 
  the argument n - 1 and multiplies the result by n. The recursion continues until the base case is reached, and the function returns the final result.

For instance, factorial(5) would be calculated as 5 * factorial(4), then 5 * 4 * factorial(3), and so on, until factorial(0) is reached, 
  which returns 1. The final result is the product of all the numbers, yielding 5 * 4 * 3 * 2 * 1 = 120, which is the factorial of 5.
*/
<?php
function factorial($n) {
  if ($n == 0)
  	return 1;
  else {
  	echo $n."*";
    return $n * factorial($n-1);
    }
}

$five = factorial(5);
echo "1 = ".$five."<br>";
$two = factorial(2);
echo "1 = ".$two."<br>";
?> 

</body>
</html>
