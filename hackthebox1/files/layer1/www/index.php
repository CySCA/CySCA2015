<html>
<script TYPE="text/javascript">
function pwencode(){
        var pass = document.getElementById('password').value;
        var newpasswd = window.btoa(pass);
        document.getElementById('password').value=newpasswd;
        return true;
}

</script>
<body>
<center><h1>Business Excellence File Server</h2></center>
<?php

$valid_user="jimsmith";
$valid_passwd="ohl5eidaseiP";
$valid_b64passwd="b2hsNWVpZGFzZWlQ";


if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $username=$_POST['username'];
        $password=$_POST['password'];
        if ($valid_user == $username){
                if ($password==$valid_b64passwd){
                        echo "Hi ".$valid_user."<br><br>";
                        echo "<div style='width:50em'>Welcome to the SSH key management system<br><br><br>You have already added a new key recently, you can not add another.<br>";
                        echo "Below is your key history, Only the newest key per system is kept active<br><br>";
                        echo "<table border=1 styple='width:100%'>";
                        echo "<tr><th>Fingerprint RandomArt</th><th>Details</th><th>Date Added</th></tr>";
                        echo "<tr><td style=text-align:center><pre>".file_get_contents('/var/www/key0.txt')."</pre></td><td>".$valid_user."@DebianDesktop</td><td>03 Feb 2006</td></tr>";
                        echo "<tr><td style=text-align:center><pre>".file_get_contents('/var/www/key1.txt')."</pre></td><td>".$valid_user."@DebianDesktop</td><td>11 Sep 2007</td></tr>";
                        echo "<tr><td style=text-align:center><pre>".file_get_contents('/var/www/key2.txt')."</pre></td><td>".$valid_user."@JSDebianDesktop</td><td>15 May 2008</td></tr>";
                        echo "<tr><td style=text-align:center><pre>".file_get_contents('/var/www/key3.txt')."</pre></td><td>".$valid_user."@JSDebianDesktop</td><td>30 Jan 2010</td></tr>";
                        echo "<tr><td style=text-align:center><pre>".file_get_contents('/var/www/key4.txt')."</pre></td><td>".$valid_user."@JSLaptop</td><td>22 Nov 2012</td></tr>";
                        echo "<tr><td style=text-align:center><pre>".file_get_contents('/var/www/key5.txt')."</pre></td><td>".$valid_user."@JSLaptop</td><td>29 Sep 2015</td></tr>";
                        echo "</table></div>";
                        echo "<br><br><br><br><br><br>FLAG: ";
                        echo file_get_contents("/var/www/flag.txt");
                        echo "</body></html>";
                        die();
                } else {
                        $error="<h2 style=color:red>Username or Password incorrect</h2>";
                }
        } else {
                $error="<h2 style=color:red>Username or Password incorrect</h2>";
        }
}

echo "<center>";
echo "<form method=post name=login action=index.php onSubmit=\"return pwencode()\">";
echo "<table border=1>";
echo "<tr><th style=width:10em>Username</th><td><input style=width:100% name=username></td></tr>";
echo "<tr><th style=width:10em>Password</th><td><input style=width:100% name=password type=password id=password>";
echo "<tr><th style=text-align:center colspan=2><input type=submit value=Login></th></tr>";

if(isset($error)){
        echo $error;
}

?>
</body>
</html>
