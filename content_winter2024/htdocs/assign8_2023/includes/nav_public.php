<?php 
/*
File name: nav_public.php
Author: Ellen Bajcar
Date created: Summer 2018
Date modified: Summer 2023
Version: 23.0
Copyright: 
	This work is the intellectual property of Sheridan College. 
	Any further copying and distribution outside of class must be within 
	the copyright law. Posting to commercial sites for profit is prohibited.
Purpose: summer 2018 web programming
Description:
	navigation component accessible to general public (everyone)
    $members variable is NOT set since user has not logged in (yet)
*/
?>
    <nav>
        <p class="tool-bar">
            <a class="active" 
               href="index.php?page=content/home_public.php">
               Home
            </a>
            <a href="index.php?page=content/login.php&pagetitle=Member%20Login">
               Login
            </a>
            <a href="index.php?page=content/register.php&pagetitle=Become%20A%20Member">
               Become a member
            </a>
        </p>
    </nav>
</header>					