
echo '
<!DOCTYPE html>
<!--
Interface for a bingo card
Ellen Bajcar @2014 Sheridan
See also: Javascript, Eighth Ed., Negrino & Smith
-->
<html>
<head>
   <title>Bingo Card</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <meta name="viewport" content="width=device-width" />
   <link rel="stylesheet" href="css/bingo.css"/>
        
</head>
<body>
   <h1>Bingo Card</h1>
	<input type="button" value="Generate New Card" id="reset" onclick="reloadPage();">
   <table  id="myBoard">
		<tr>
			<th>B</th>
			<th>I</th>
			<th>N</th>
			<th>G</th>
			<th>O</th>
		</tr>
   </table>
	<script type="text/javascript" src="js/bingo2.js"></script>
</body>
</html> ';
