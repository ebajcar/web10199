<?php
session_start();
if (isset($_GET["width"])) {
    $_SESSION['width'] = $_GET['width'];
    $width = $_GET['width'];
}
if (isset($_GET["height"])) {
    $_SESSION['height'] = $_GET['height'];
    $height = $_GET['height'];
}
echo "<html><head><title>getStuff</title>";
echo "</head><body>";
echo "<h1>Screen Resolution:</h1><hr>";
echo "<h2>&nbsp;Width : ".$_GET['width']."<br /></h2><hr>";
echo "<h2>&nbsp;Height : ".$_GET['height']."<br /><h2><hr>";


?>


<script>
// https://developer.mozilla.org/en-US/docs/Web/API/Window.open
function myFunction() {
    width = screen.width;
    height = screen.height;
    window.open("sessionTest.php", "_blank", "toolbar=no, scrollbars=no, resizable=no, top="+height/3+", left="+width/3+", width="+width/4+", height="+height/4+"=");
}
</script>  