<main class="narrow">
	<form method="POST">
	<table style="width:100%">
		<tr>
			<td><input type="text" name="first" placeholder=" First Name(required)" class="w3-input w3-border"></td>
			<td><input type="text" name="last" placeholder=" Last Name(required)" class="w3-input w3-border"></td>
		</tr>	
		<tr>
			<td colspan="2" style="font-size:0.8em;color:gray"><label>Gender </label>
			<input type="radio" name="gender" value="male" checked>
			<label >Male</label>
			<input type="radio" name="gender" value="female">
			<label >Female</label></td>
		</tr>			
		<tr>
			<td><input type="email" name="email" placeholder=" Email (required)" class="w3-input w3-border"></td>
			<td><input type="tel" name="phone" placeholder=" Phone (required)" class="w3-input w3-border"></td>
		</tr>		
		<tr>
			<td colspan="2"><input type="text" name="address" class="w3-input w3-border" value="" placeholder=" Enter your address"></td>
</tr>			
	</table>	
	<fieldset>
		<legend>Choose a username and a password</legend>
		<p>
			<input type="text" name="username" class="w3-input w3-border" value="" placeholder=" Enter your user name">
		</p>
		<p>	
			<input type="password" name="password" id="pass1" class="w3-input w3-border" placeholder=" Enter your password">
		</p>
		<p>					
			<input type="password" id="pass2"  class="w3-input w3-border" placeholder=" Confirm your password">
		</p>		
	</fieldset>		
	<br>		
		<input type="submit" name="submit" class="w3-input w3-orange w3-margin-bottom w3-padding-16">
	</form>
	
</main>

<?php
// Function to clean up a data string (from w3schools.com)
function clean($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function initProcess() {
	$_SESSION['formAttemp'] = true;
	$_SESSION['id'] = session_id();
	$_SESSION['isLoggedIn'] = false;
	$_SESSION['password'] = $_POST['password'];
	$_SESSION['startDate'] = "";
	$_SESSION['address'] = $_POST['address'];	
}

function displayNo(){
	global $errMsg;
echo <<<_TRYAGAIN_
<div style="position:fixed;top:30%;left:30%;width:50%;height:300px;background:white;"><h3 class='w3-center w3-block w3-red w3-padding-16'>
	Registration was unsuccessful. $errMsg
</h3>
<a class='w3-button w3-gray' href='index.php?page=content/register.php'>TRY AGAIN</a></div>
_TRYAGAIN_;
}

function displayYes() {
echo <<<_PROCEED_
<h3 class='w3-center w3-block w3-green w3-padding-16'>
	Registration was successful.
</h3>
<a class='w3-button w3-gray' href='index.php?page=content/login.php'>LOGIN</a>
_PROCEED_;
}

function testUsername() {	
	global $errMsg, $safeuser;
	// PARAMETER username
	if (isset($_POST['username']))
		if (!empty($_POST['username'])) {
			$safeuser = clean($_POST["username"]);
			$_SESSION['firstName'] = $_POST['username'];
		} else {
			$errMsg = "username field is empty. You must choose a username.";
			//print_r($errMsg);
			return false;
		}
	return true;
}

function testPassword() {	
	global $password, $errMsg, $safeuser;
	// PARAMETER password
	if (isset($_POST["password"])) {
		$password=clean($_POST["password"]);
		//print_r($_POST);
		//database field length is set to 40; what would be the minimum?
		if (strlen($password) < 4 || strlen($password) > 40) {
			error_log("Password must be between 4 and 40 characters: $password\n", 3, "myErrors.log");
			$errMsg = 
				"Password parameter must be between 4 and 40 characters" . 
				" long. The length of $password is " . strlen($password);
			//print_r($_SESSION['unameLength']);
			return false;
		}
	} else {
		$errMsg = "Second parameter missing."; 
		// print_r($errMsg);
		error_log("$errMsg -missing.", 3, "myErrors.log");
		return false;
	}
	return true;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	//initialize all variables
	initProcess();
	$errMsg = '';
	global $safeuser, $password;

	require_once("includes/Member.class");
	$visitor = new Member;
	
	if (testUsername() && testPassword()) {
		//echo "returned true";
		//update (set) current session info
		if ($visitor->registerMember($safeuser, $password)) {
		//TODO: this can be on a separate page and include presentation
		//		of all user input for their verification prior to login
		// proceed to member site
			displayYes();
		} else {
			// return to registration
			session_destroy();
			displayNo();
		}			
	}else {
		echo "returned false line 102.";
		displayNo();
	}
/*	
TODO: if successful, need to decide where to send the user
	choice 1. log them in authomatically, similar to sucessful authentication
	choice 2. return them to the login for proper first-time login
	choice 3. send an email for verification and take them to index.thml
*/	

}
?>






