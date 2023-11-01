<?php  
session_start();
include ('includes/header.php');  
require ('includes/nav.php'); 
// all content pages will be include here
// the value of $page is coming from the url in nav.php
// default is out home.php when $page is not set
if (isset($_GET['page'])) {   
	$includepage=$_GET['page'];
	include_once ($includepage);
} else {
	//home page content
	require_once ('content/home.php'); 
}
include_once ('includes/footer.php'); 
?>