<?php 
/*
File name: navigation.php
Author: Ellen Bajcar
Date created: Summer 2018
Date modified: 
Version: 1.0
Copyright: 
	This work is the intellectual property of Sheridan College. 
	Any further copying and distribution outside of class must be within 
	the copyright law. Posting to commercial sites for profit is prohibited.
Purpose: summer 2018 web programming
Description:
	navigation component accessible to members on successful login
    $members variable is set to true since user successfully logged in
*/
?>
    <nav>
      <p class="tool-bar">
        <a class="active" 
           href="index.php?page=content/home_members.php&members=false">
           Home
        </a>
        <a href="index.php?page=content/rps.php&pagetitle=Rock-Paper-Scissors&members=false"
           title="Rock-Paper-Scissors">
           Casino craps
        </a>
        <a href="index.php?page=content/rpsls.php&pagetitle=Rock-Paper-Scissors-Lizard-Spock&members=false" 
           title="Rock-Paper-Scissors-Lizard-Spock">
           RPSLS
        </a>
        <a href="index.php?page=content/ttt.php&pagetitle=Tic-Tac-Toe&members=false" 
           title="Tic-Tac-Toe">
           Tic tac toe
        </a>
        <a href="index.php">
           Sign out
        </a>
      </p>
    </nav>
</header>
					