<!DOCTYPE html>
<html lang="en">
<head>
<?php
$pagetitle = (isset($_GET['pagetitle'])) 
	? $_GET['pagetitle'] 
	: "Home Page";
?>
    <title><?=$pagetitle?></title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">	
    <link rel="stylesheet" href="https://unpkg.com/missing.css@1.0.9/dist/missing.min.css">
	<link href="css/extra.css" rel="stylesheet">
    <style>
		:root {
			--main-font: "Source Sans 3", -apple-system, system-ui, sans-serif;
            --line-length: 60rem; /* Maximum line length for prose. */
		}
        .current {
            font-weight: bold;
        }
        footer {
            position: fixed;
            bottom: 50px;
            width: 100%;
        }
    </style>
</head>
<body>
	<header>
        <h1>🎲<span class="allcaps">Game<wbr>Works<v-h>:</v-h></span> <sub-title><?=$pagetitle?></sub-title></h1>

	
<?php 
/*
File name: header.php
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
	HTML5 document up to and including <main> opening tag
	component common to all pages in the web app
*/
?>