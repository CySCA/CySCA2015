<?php

function __autoload($className) {
require_once "Utils/{$className}.inc";
}

$title = "Challenge List";
$user = "Dave Davington";

?>
<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8" />
<title>ECWI - Challenge List</title>
<link rel="stylesheet" href="css/ecwi.css" type="text/css" media="screen" />
<!--[if lt IE 9]>
<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
<![endif]-->
</head>

<body>
<header id="header">
<hgroup>
<h1 class="site_title"><a href="index.php"><img src="images/logo/EWCI - Logo.png" width="85"></a></h1>
<h2 class="site_title"><?php echo $title ?></h2>
</hgroup>
</header>
<!-- end of header bar -->

 
<article class="module width_full">
<header>
<h3>Challenge List</h3></header>
<div class="module_content">
 <br> <h1>Challenge 1 - Daves Secret Hashing Algorithm</h1>
 <ul >

<h3>Task</h3>
 <li><a href="daves/daves.php">Daves Secret Hashing Algorithm</a></li></ul>
<p>Players are given a site were one of the employees has created their own Hashing algorithm. however this hash algorithm is vulnerable to hash clashing.

players are required to create a script that can solve the problem.

Requirements
some programming skills
</p><br>
 
<h1>Challenge 2 - Password Hash Cracking Challenges</h1>


<h3>Task</h3>
<ul > <li><a href="hash/hash-cracking.php">Password Hash Cracking Challenges</a></li></ul>
<p>players are given 4 different hash cracking challenges. 1. Numeric PIN (16 digits) or fixed length custom char set challenge 2. Single word (lowercase only) - custom dictionary building 3. Complex word (1 upper, 1 substitution, ending with punctuation + digit) -custom substitution and custom char ruleset 4. Multi-Word (lowercase only) - combination dictionary attack
</p>
<br>
<h1>Challenge 3 - 2-Factor Pin System</h1>


<h3>Task</h3>
<ul ><li><a href="linear/linear.php">Two-Factor Challenge</a></li>
<li>username = davedavington@ecwi.cysca</li>
<li>password = asfjbv459dQA</li></ul>
<p>log in with the default pin (000000) will allow read-only access to non-sensitive data.
</p><p>Can you log in with todays pin to show that not enough information was listed as sensitive and the 2-factor pin system is compromisable .</p>

</div>
</article>

<?php include_once('Utils/footer.inc'); ?>
