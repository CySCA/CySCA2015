<?php

$title="Hash Cracking" ;
#header
include_once( '../Utils/header.inc');
# include functions
function __autoload($className) {
    require_once "../Utils/{$className}.inc";
}
    $flag1=trim(file_get_contents("../flags/flag1.txt"));
    $flag2=trim(file_get_contents("../flags/flag2.txt"));
    $flag3=trim(file_get_contents("../flags/flag3.txt"));
    $flag4=trim(file_get_contents("../flags/flag4.txt"));
    $pass1=trim(file_get_contents("../pass/pass1.txt"));
    $pass2=trim(file_get_contents("../pass/pass2.txt"));
    $pass3=trim(file_get_contents("../pass/pass3.txt"));
    $pass4=trim(file_get_contents("../pass/pass4.txt"));
    $hash1=trim(file_get_contents("../hashs/hash1.txt"));
    $hash2=trim(file_get_contents("../hashs/hash2.txt"));
    $hash3=trim(file_get_contents("../hashs/hash3.txt"));
    $hash4=trim(file_get_contents("../hashs/hash4.txt"));

    if ($_SERVER[ 'REQUEST_METHOD']==='POST' ){
        if(isset($_POST['chal1'])){
            $chal1=$_POST['chal1'];
            if ($chal1===$pass1){
                $display1='<h4 class="alert_success">Flag: '.$flag1.'</h4>';
              } else {
                $display1='<h4 class="alert_error">Ah no!, your princess is in another castle</h4>' ;
            }
        } else{
            $display1='';
            $chal1='';
        }
        if(isset($_POST['chal2'])){
          $chal2=$_POST['chal2'];
              if ($chal2==$pass2){
                  $display2='<h4 class="alert_success">Flag: '.$flag2.'</h4>';
              } else {
                  $display2='<h4 class="alert_error">Ah no!, your princess is in another castle</h4>' ;
              }
        } else{
            $display2='';
            $chal2='';
        }
        if(isset($_POST['chal3'])){
            $chal3=$_POST['chal3'];
            if ($chal3==$pass3){
                  $display3='<h4 class="alert_success">Flag: '.$flag3.'</h4>';
              } else {
                  $display3='<h4 class="alert_error">Ah no!, your princess is in another castle</h4>' ;
              }
        } else{
            $display3='';
            $chal3='';
        }
        if(isset($_POST['chal4'])){
            $chal4=$_POST['chal4'];
            if ($chal4==$pass4){
                  $display4='<h4 class="alert_success">Flag: '.$flag4.'</h4>';
              } else {
                  $display4='<h4 class="alert_error">Ah no!, your princess is in another castle</h4>' ;
               }
        } else{
            $display4='';
            $chal4='';
        }
    }
?>

<article class="module width_3_quarter">
    <header>
        <h3>Challenge 1</h3>
    </header>
    <div class="module_content">
        <h4>Hint:</h4>
        <ul class="toggle">
            <p>
                <center><img src="../images/challenge-1.PNG"></center>
            </p>
	</ul>
        <p>
            Here is a heat map image of someone entering their pin, which is  16 digits long.
  I wonder what it is?</p>
        <p>Crack this hash:
            <?php echo $hash1 ?>
        </p>
        <h4>Submit:</h4>
        <p>
            <div class="sp-input">
                <form method="POST" action="hash-cracking.php">
                    <input name="chal1" id="chal1" type="text" />
                    <input type="submit" value="Check" />
                </form>
            </div>
            <div class="module_content">
                <?php if(isset($chal1)){ echo $display1;} ?>
            </div>
        </p>
    </div>
</article>
<article class="module width_quarter">
    <header>
        <h3>Messages</h3></header>
    <div class="message_list ">
        <div class="module_content">
            <div class="message ">
                <p><strong>Message From: JohnDelgado@ecwi.cysca</strong></p>
                <p><strong>Subject: Hash Cracking Testing</strong></p>
            </div>
            <P>Hi there,</P>
            <P>These challenges are set up to test your ability to crack Hashs using common methods to shorten the keyspace and processesing time.</P>
            <P>All the Hashs have been created with a salt prepended to the password.
                <h4>The salt is: cysca2015 </h4></P>
            <p>Regards, John Delgado.</p>
        </div>
    </div>
</article>
<article class="module width_3_quarter">
    <header>
        <h3>Challenge 2</h3>
    </header>
    <div class="module_content">
        <h4>Hint:</h4>
        <ul class="toggle">
            <p>
                <center><img src="../images/challenge-2.PNG"></center>
            </p>
        </ul>
        <p>
            Dictionaries make easy pray for password cracking!
        </p>

        <p>Crack this hash:
            <?php echo $hash2 ?>
        </p>
        <h4>submit:</h4>
        <div class="sp-input">
            <form method="POST" action="hash-cracking.php">
                <input name="chal2" id="chal2" type="text" />
                <input type="submit" value="Check" />
            </form>
        </div>
        <div class="module_content">
            <?php if(isset($chal2)){ echo $display2;} ?>
        </div>
    </div>
</article>
<article class="module width_3_quarter">
    <header>
        <h3>Challenge 3</h3>
    </header>
    <div class="module_content">
        <h4>Hint:</h4>
        <ul class="toggle">
            <p>
                <center><img src="../images/challenge-3.png"></center>
            </p>
        </ul>
        <p>
            Maybe substitution is too simple with today's password crackers.
        </p>
        <p>Crack this hash:
            <?php echo $hash3 ?> with this <a href="../dictionary/dictionary.txt">Dictionary</a></p>
        </p>
        <h4>submit:</h4>
        <div class="sp-input">
            <form method="POST" action="hash-cracking.php">
                <input name="chal3" id="chal3" type="text" />
                <input type="submit" value="Check" />
            </form>
        </div>
        <div class="module_content">
            <?php if(isset($chal3)){ echo $display3;} ?>
        </div>
    </div>
</article>
<article class="module width_3_quarter">
    <header>
        <h3>Challenge 4</h3>
    </header>
    <div class="module_content">
        <h4>Hint:</h4>
        <ul class="toggle">
            <p>
                <center><img src="../images/challenge-4.png"></center>
            </p>
        </ul>
        <p>
            26 lowercase chars or 26^25 = 236773830007967588876795164938469376 combinations, im sure its easier than that.
        </p>
        <p>Crack this hash:
            <?php echo $hash4 ?> with this <a href="../dictionary/dictionary.txt">Dictionary</a></p>
        <h4>submit:</h4>
        <div class="sp-input">
            <form method="POST" action="hash-cracking.php">
                <input name="chal4" id="chal4" type="text" />
                <input type="submit" value="Check" />
            </form>
        </div>
        <div class="module_content">
            <?php if(isset($chal4)){ echo $display4;} ?>
        </div>
    </div>
</article>

    <?php include_once( '../Utils/footer.inc'); ?>
