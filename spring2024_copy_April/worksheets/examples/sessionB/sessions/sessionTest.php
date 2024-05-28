<?php
session_start();
?>
<html>
<head>
<title>sessionTest.php</title>
</head>
<body>

<?php
/* 
 * sessionTest.php
 * A tiny standalone diagnostic script to test that sessions are working
 */
if (!isset($_SESSION["test"])) {
    echo "<p>No session found - starting a session now.</p>";
    $_SESSION["test"] = "welcome back";
    
} else {
    echo "Session found " . $_SESSION["test"];
    echo "<p>Sessions are working correctly.</p>";
    
}
if (isset($_GET["cancel"])) {
    echo "clearing session now";
         session_destroy();
}
echo "<p><a href=\"sessionTest.php?random=\".rand(1,10000).&cancel=no\">Reload this page</a></p>";
echo "<p><a href=\"sessionTest.php?cancel=yes\" target=\"_self\">Destroy session</a></p>";
?>

</body>
</html>