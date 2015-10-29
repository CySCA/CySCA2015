<?php

// get client ip
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
$ip = $_SERVER['HTTP_CLIENT_IP'];
} 
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} 
else {
$ip = $_SERVER['REMOTE_ADDR'];
}

// variables
$file = "../logs.txt";
$ctime = time();
$farray = [];
$bruteforcing = false;
$warn = false;
// Add each line to an array
if (filesize($file)>0){ $fp = @fopen($file, 'r');}
if (isset($fp)) {$temp = explode("\n", fread($fp, filesize($file))); }
if (isset($temp)) {
$array = array_reverse($temp);
$age = substr($temp[0], 0, 10);
}
if (isset($age)){
if (($ctime - $age) > 3600 ){
$f = "";
file_put_contents($file, $f);
}
}
if (isset($array)) {
foreach ($array as &$a) {
 if (strpos($a,$ip) !== false) {
array_push($farray, $a);
 }
}
}
// last 3 entrys
if (sizeof($farray) >= 3) {
$time1 =substr($farray[0], 0, 10);
$time2 =substr($farray[1], 0, 10);
$time3 =substr($farray[2], 0, 10);
}
elseif(sizeof($farray) == 2) {
$time1 =substr($farray[0], 0, 10);
$time2 =substr($farray[1], 0, 10);
$time3 =$ctime;
}
elseif(sizeof($farray) == 1) {
$time1 =substr($farray[0], 0, 10);
$time2 =$ctime;
$time3 =$ctime;
}
else{
$time1 = $ctime;
$time2 = $ctime;
$time3 = $ctime;
}

$lockout = $ctime - $time3;
$warning = $ctime - $time2;
$test = $ctime - $time1;

if ($lockout > 0 && $lockout < 60) {
$bruteforcing=true;
 }
if ($warning > 0 && $warning < 60) {
$warn=true;
 }
$valid_pin = file_get_contents("../pass/pass5.txt");
$valid_user="davedavington@ecwi.cysca";
$valid_passwd="asfjbv459dQA";
$display_main = false; 
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
$username=$_POST['Username'];
$password=$_POST['Password'];
$pin=$_POST['Pin'];
if($bruteforcing==true){
$error="<h4 class='alert_error'>Locked out,Try again in <br>". abs($lockout-60) ." Seconds...</h4>";
}
else{
if($warn==true){ 
$error="<h4 class='alert_error'>To many Failed Attempts within 3 minutes, if you fail 1 more time you will be locked out</h4>";
$display_main = false;
}
else{ 
$error="<h4 class='alert_info'>Read-Only access with default pin</h4>";
$display_main = false;
}
if ($valid_user == $username){
if ($password == $valid_passwd){
if ($pin == $valid_pin){
$display_main = true;
$correct = true;
$title = "Two-Factor Pin anagement";
$name ="Dave davington";
}
elseif ($pin == 000000){
$display_main = true;
$correct = false;
$title = "Two-Factor Pin anagement";
$name ="Dave davington";
} 
else {
$f = file_get_contents($file);
$f .= $ctime."-".$ip."\n";
file_put_contents($file, $f);
$display_main = false;
$error="<h4 class='alert_error'>Username, Pin or Password is incorrect</h4>";
}
} 
else {
$error="<h4 class='alert_error'>Username, Pin or Password is incorrect</h4>";
$display_main = false;
}
} 
else {
$error="<h4 class='alert_info'>Read-Only access with default pin</h4>";
$display_main = false;
}
}
}
else {
$error="<h4 class='alert_info'>Read-Only access with default pin</h4>";
 $display_main = false;
}
if($display_main==true){
#create an array for pins
include_once('../Utils/header.inc');
include_once('linear-main.php');
} 
else {
echo'<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>ECWI - Login Form</title>
<link rel="stylesheet" href="../css/ecwi.css">
<!--[if lt IE 9]><![endif]-->
<script TYPE="text/javascript">
function pwencode() {
var pass = document.getElementById("Password").value;
var newpasswd = window.btoa(pass);
document.getElementById("Password").value = newpasswd;
return true;
}

</script>
</head>

<body>
<section class="login-container">
<div class="login">
<center>
<h1><img src="../images/logo/EWCI - Logo.png" width="200" ><br>Login- Portal</h1>
<label>';
if(isset($error)){
echo $error;
}
echo '</label>
</p>
<div>
<form method="POST" action="linear.php" onSubmit="return pwencode()">
<p>
<input type="text" name="Username" value="" placeholder="Username">
</p>
<p>
<input type="password" name="Password" value="" placeholder="Password">
</p> <p>
<input type="text" name="Pin" value="000000" placeholder="Pin">
</p>

</center>
<p class="submit">
<input type="submit" name="commit" value="Login">
</p>
</form>
</div>
</div>
</section>
</body>

</html>'; 
} 
?>

