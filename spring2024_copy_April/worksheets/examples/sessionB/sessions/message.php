<?php
session_start();
// store session data
//if (!$_SESSION['views']) $_SESSION['views']=0;
?>

<html>
<head>
<title>message.php</title>
</head>
<body>

<?php
//retrieve session data
if ( isset($_SESSION['views'] ))
	echo "Pageviews=". $_SESSION['views'];
else	
	echo "Pageviews= Not Set";
?>



<?php
if(isset($_SESSION['views']))
    $_SESSION['views']=$_SESSION['views']+1;
else
    $_SESSION['views']=1;
echo '<h3>Same page</h3>';
echo "Views=". $_SESSION['views'];  

if (isset($_GET["cancel"])) {
    echo "clearing session no";
	$_SESSION = array();
    session_destroy();
}

if (isset($_SESSION["width"])) {
    echo "<p>The screen width is " . $_SESSION['width'] . "</p>";
}

if (isset($_SESSION["height"])) {
    echo "<p>The screen height is " . $_SESSION['height'] . "</p>";
}
?>

</body>
</html>
