<?php
// http://bajcar.dev.fast.sheridanc.on.ca/php10199/set06/say_hello.php?name=Ellen
// try it with other values for name and password
// note that both values are clear text - readable by the human eye
//some changes made through Notepad++

echo '<h1>Hello ' . htmlspecialchars($_GET["name"]) . '!</h1>';
echo "<br>";
echo 'Your password is ' . htmlspecialchars($_GET["password"]) . '!';
?>