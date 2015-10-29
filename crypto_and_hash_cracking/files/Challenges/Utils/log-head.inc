<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>ECWI - Login Form</title>
<link rel="stylesheet" href="css/ecwi.css">
<!--[if lt IE 9]><script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<script TYPE="text/javascript">
function pwencode() {
var pass = document.getElementById('Password').value;
var newpasswd = window.btoa(pass);
document.getElementById('Password').value = newpasswd;
return true;
}

</script>

<?php
error_reporting(0);
ini_set('display_errors', 0);

function __autoload($className) {
require_once "./Utils/{$className}.inc";
}

?>

</head>
