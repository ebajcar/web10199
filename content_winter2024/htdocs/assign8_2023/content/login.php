<?php 
/*
File name: login.php
Author: Ellen Bajcar
Date created: Summer 2018
Date modified: Summer 2023
Version: 23.0
Copyright: 
	This work is the intellectual property of Sheridan College. 
	Any further copying and distribution outside of class must be within 
	the copyright law. Posting to commercial sites for profit is prohibited.
Purpose: 
    class activity for web programming
    create a website that provides pages/activities for members only
    implements sign-in, registration, and database access using PDO
Description:
	Home page content fragment for both public and members
    included/required by: index.php
    includes/requires: 
*/
?>
<main class="narrow">
	<form method="POST" autocomplete="off">
		<div>
			<label><b>Enter Username</b></label>
			<input type="text" class="w3-input w3-border w3-margin-bottom" placeholder="Enter your username (required)" name="username"  autocomplete="off">
			<label><b>Enter Password</b></label>
			<input  type="password" class="w3-input w3-border w3-margin-bottom" name="password" placeholder="Enter your password (required)" required autocomplete="off">
			<input type="hidden" name="curdate" value="<?php $date = date("Y-m-d"); echo $date;?>">
			<input type="submit" class="w3-input w3-orange w3-margin-bottom w3-padding-16" value="Login">
			<input type="reset" class="w3-input w3-gray w3-padding-16" value="Reset">
		</div>
	</form>		


<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	
	$_SESSION['formAttemp'] = true;
	$_SESSION['id'] = session_id();
	$_SESSION['isLoggedIn'] = false;

	if (isset($_POST['password']))
		if (!empty($_POST['password'])) 
			$_SESSION['password'] = $_POST['password'];

	// TODO: can be used to record last time the user logged in successfully
	$_SESSION['loginDate'] = $_POST['curdate'];

	if (isset($_POST['username']))
		if (!empty($_POST['username'])) {
			$safeuser = $_POST['username'];
			$_SESSION['player'] = $_POST['username'];
		} else
			echo "handle the bad name";
	
	require_once("includes/Member.class");
	$visitor = new Member;
	if ($visitor->authenticate($_POST['username'], $_POST['password'])) {	
		// proceed to member site
echo <<<_LOG_
<section>
<h3 class='w3-green w3-padding-16'>Authentication successful.</h3>
<a class='w3-button w3-gray'  
	href=index.php?page=content/home_members.php&members=true&pagetitle=Members-only%20Home%20Page>Proceed</a>
</section>
_LOG_;

	} else {
		// return to login
		session_destroy();
echo <<<_NOLOG_
<section>
<h3 class='w3-center w3-block w3-red w3-padding-16'>Authentication was unsuccessful.</h3>
<a class='w3-button w3-gray' href='index.php?page=content/login.php'>Try Again</a>
</section>
_NOLOG_;
		
	}
}
?>
</main>	


