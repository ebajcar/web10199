# Worksheet 8

#### SYST10199 Web Programming

Continue exploring the solutions in PHP to problems described in Worksheet 2:

- Problem A: Fibonacci numbers
- Problem B: Convert temperature
- Problem C: Calculate the area of a circle
- Problem D: Calculate roots of a quadratic equation
- Problem E: Calculate prime numbers

Explore, study, and make notes on material for Week 8 on SLATE Content.

Share and discuss on Piazza Q&A.

## Exercises
Using the [https://www.w3schools.com/php/phptryit.asp?filename=tryphp_intro](https://www.w3schools.com/php/phptryit.asp?filename=tryphp_intro), add the given PHP code to the <body> element (to replace any existing PHP code), run, and note the output and explain:

#### Exercise 1
What is the output?

```php
<?php
$txt = "Hello world!";
$x = 5;
$y = 10.5;
echo $txt;
echo "<br>";
echo $x;
echo "<br>";
echo $y;
?>
```

#### Exercise 2
What is the output?

```php
<?php 
$arr = 10;
$x = 7;
$_mystuff = 34;
echo $arr $x $_mystuff;
?>
```

#### Exercise 3
What is the output?

```php
<?php 
$arr = 10;
$x = 7;
$_mystuff = 34;
echo $arr, $x, $_mystuff;
?>
```


#### Exercise 4
What is the output?

```php
<?php 
$arr = 10;
$x = 7;
$_mystuff = 34;
echo $arr + $x + $_mystuff;
?>
```



#### Exercise 5
What is the output?

```php
<?php 
$arr = $x = $y = 10;
echo $arr + $x + $y;
?>
```


#### Exercise 6
What is the output?

```php
<?php 
$A = 10;
$B = 7;
$C = 3;
echo $a $B $C;
?>
```




#### Exercise 7
What is the output?

```php
<?php 
$A = 10;
$B = 7;
$C = 3;
echo $a;
?>
```
Add the statement `var_dump($a);` What is returned?




#### Exercise 8
What is the output?

```php
<?php 
function setHeight($minheight = 50) {
  echo "The height is : $minheight <br>";
}
setHeight(350);
setHeight();
?>
```
Compare to Javascript. 

---

> Web Programming @ Sheridan College

