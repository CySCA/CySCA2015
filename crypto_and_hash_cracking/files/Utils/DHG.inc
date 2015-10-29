<?php

class DHG {

	public function generate($userin) {
		$compare='';
		if ($userin != "") {
			if (isset($userin)) {
				$hash_array = array("MD2", "MD5", "SHA1", "SHA256", "SHA384", "SHA512");
				$arr = array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 
			 		     "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
			 	             "", "", "", "", "", "");
				$i = 0;
				$k = 0;
			
				#for each hash
				foreach ($hash_array as $hash) {
					#generate a hash
					$temp = hash($hash, substr($userin, $i, 6));
					#change the section you use for pass
					$i+=6;
					
					#store the hash in the array 
					$arr[ $k ] = substr($temp, $k, 1);
					$arr[( $k + 6 )] = substr($temp, $k + 6, 1);
					$arr[( $k + 12 )] = substr($temp, $k + 12, 1);
					$arr[( $k + 18 )] = substr($temp, $k + 18, 1);
					$arr[( $k + 24 )] = substr($temp, $k + 24, 1);
					$arr[( $k + 30 )] = substr($temp, $k + 30, 1);					
					
					#change the store location by 1 
					$k+=1;
				}
			}
			$compare = implode("", $arr);
		}
	return $compare;	
	}

	public function compare($a, $b) {
		if ( $a == $b ) {
			$return = file_get_contents("../flags/flag6.txt");
		} 
		else if ($a == "") {
			$return = "";
		} 
		else {
			$return = "Sorry Incorrect Input, Try Again.";
		}
	return $return;
	}
}

?>
