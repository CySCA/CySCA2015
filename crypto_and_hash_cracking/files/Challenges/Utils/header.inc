<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8" />
<title>ECWI - <?php echo $title ?></title>
<link rel="stylesheet" href="../css/ecwi.css" type="text/css" media="screen" />
<!--[if lt IE 9]>
<link rel="stylesheet" href="../css/ie.css" type="text/css" media="screen" />
<![endif]-->
<script src="../js/jquery-1.5.2.min.js" type="text/javascript"></script>
<script src="../js/hideshow.js" type="text/javascript"></script>
<script src="../js/jquery.tablesorter.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/jquery.equalHeight.js"></script>
<script TYPE="text/javascript">
function pwencode() {
var pass = document.getElementById('password').value;
var newpasswd = window.btoa(pass);
document.getElementById('password').value = newpasswd;
return true;
}

</script>
<script type="text/javascript">
$(document).ready(function() {
$(".tablesorter").tablesorter();
});
$(document).ready(function() {
//When page loads...
$(".tab_content").hide(); //Hide all content
$("ul.tabs li:first").addClass("active").show(); //Activate first tab
$(".tab_content:first").show(); //Show first tab content
//On Click Event
$("ul.tabs li").click(function() {
$("ul.tabs li").removeClass("active"); //Remove any "active" class
$(this).addClass("active"); //Add "active" class to selected tab
$(".tab_content").hide(); //Hide all tab content
var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
$(activeTab).fadeIn(); //Fade in the active ID content
return false;
});
});

</script>
<script type="text/javascript">
$(function() {
$('.column').equalHeight();
});

</script>
</head>

<body>
<header id="header">
<hgroup>
<h1 class="site_title"><a href="../index.php"><img src="../images/logo/EWCI - Logo.png" width="85"></a></h1>
<h2 class="site_title"><?php echo $title ?></h2>
</hgroup>
</header>
<!-- end of header bar -->
