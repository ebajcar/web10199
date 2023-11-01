Development notes:
July 20, 2018

1. Create project directory inside the webspace.
2. Create an HTML5 template with internal CSS3.
3. Create subdirectories css/ images/ includes/ content/ and js/
4. Create index.php
5. Create includes footer.php, header.php, and navigation.php
6. Copy php version of rps under content/ and modify to display on index.php
7. Copy and create rpsls.php and include to display on index.php
8. Create register.php file and include the registration form
9. will need to add HTML5, CSS3, and Javascript validation
10 Create login.php file and include the login form
11 will need to create a members database table
12 will need to create members class
...


// ...
$_SESSION['previous'] = basename($_SERVER['PHP_SELF']);
if (isset($_SESSION['previous'])) {
   if (basename($_SERVER['PHP_SELF']) != $_SESSION['previous']) {
        session_destroy();
        ### or alternatively, you can use this for specific variables:
        ### unset($_SESSION['varname']);
   }
}
