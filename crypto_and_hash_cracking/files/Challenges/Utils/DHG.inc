<?php

class DHG {

public function generate($userin) {
$compare='';
if ($userin != "") {
if (isset($userin)) {
$hash_array = array("MD2", "MD5", "SHA1", "SHA256", "SHA384", "SHA512");
$arr = array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 
 "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
 "", "");
$i = 0;

for($k = 0;$k<5;$k++){
foreach ($hash_array as $hash) {
$temp = hash($hash, substr($userin, $i, 5));
}
$arr[$k] = substr($temp, $k, 1);
$arr[($k + 5 )] = substr($temp, $k + 5, 1);
$arr[($k + 10)] = substr($temp, $k + 10, 1);
$arr[($k + 15)] = substr($temp, $k + 15, 1);
$arr[($k + 20)] = substr($temp, $k + 20, 1);
$arr[($k + 25)] = substr($temp, $k + 25, 1);
$i+=5;
}
$compare = implode("", $arr);
}
}
return $compare;
}

public function compare($a, $b) {
if ($a == $b) {
$return = file_get_contents("../flags/flag6.txt");
} else if ($a == "") {
$return = "";
} else {
$return = "Sorry Incorrect Input, Try Again.";
}
return $return;
}
}