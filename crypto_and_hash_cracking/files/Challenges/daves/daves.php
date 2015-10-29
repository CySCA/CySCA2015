<?php
function __autoload($className) {
require_once "../Utils/{$className}.inc";
}

$RSG = new RSG();
$DHG = new DHG();

$secret=file_get_contents("../hashs/hash5.txt");
$compare = $DHG->generate(filter_input(INPUT_POST, 'hash'));
$string = filter_input(INPUT_POST, 'hash');
$result = $DHG->compare($compare, $secret);

$title = "Daves Secret Hash Algorithm";
$user = "Dave Davington";

?>
<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8" />
<title>ECWI - Web Admin</title>
<link rel="stylesheet" href="../css/ecwi.css" type="text/css" media="screen" />
<!--[if lt IE 9]>
<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
<![endif]-->
<script src="../js/jquery-1.5.2.min.js" type="text/javascript"></script>
<script src="../js/hideshow.js" type="text/javascript"></script>
<script src="../js/jquery.tablesorter.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/jquery.equalHeight.js"></script>
</head>

<body>
<header id="header">
<hgroup>
<h1 class="site_title"><a href="../index.php"><img src="../images/logo/EWCI - Logo.png" width="85"></a></h1>
<h2 class="site_title"><?php echo $title ?></h2>
</hgroup>
</header>
<!-- end of header bar -->

<?php
if (strpos($result, 'FLAG') !== false) {
echo '<h4 class="alert_success">Congratulations. ' . $result . '</h4>';
}
if (strpos($result, 'Sorry') !== false) {
echo '<h4 class="alert_error">' . $result . '</h4>';
} 
else { 

}
?>
<article class="module width_full">
<header>
<h3>Daves Secret Hash Algorithm</h3></header>
<div class="module_content">
<h2>Check your Hash:</h2>
<div class="sp-input">
<form action="#" method="post">
<input name="hash" id="hash" type="text" />
<input type="submit" value="Check" />
</form>
</div>
<div class="module_content">
<p> Your input was: <strong><?php echo $string; ?> </strong></p>
<p> Generated Hash:
<?php echo $compare; ?>
</p>
<P> Original Hash :
<?php echo $secret; ?>
</p>
</h2>
</div>
</div>
</article>
<!-- end of styles article -->
<article class="module width_3_quarter ">
<header>
<h3>Daves Secret Hash Algorithm</h3></header>
<div class="module_content">
<h1>Details on my hash</h1>
<img src="../images/daveshash.png" alt="daves_hash " style="width:100%; ">
</div>
</article>
<!-- end of styles article -->

<article class="module width_quarter ">
<header>
<h3>essages</h3></header>
<div class="message_list ">
<div class="module_content ">
<div class="message ">
<p><strong>Message From: CherrylRamset@ecwi.cysca</strong></p>
<p><strong>Subject: Secret Hash Algorithm</strong></p>
</div>
<P>Hi Dave Davington,</P><br>
<P>This idea of yours is great! </P>
<P>I still cannot believe, no one else has considered combining multiple hashingalgorithms to make a greater, stronger, hash.</P>
<br><p>regards</p>
<p>Cherry.</p>
</div>
</div>

</article>
<!-- end of styles article -->
<!-- end of styles article -->

<?php include_once('../Utils/footer.inc'); ?>
