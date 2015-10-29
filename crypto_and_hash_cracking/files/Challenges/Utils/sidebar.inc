<section id="secondary_bar">
<div class="user">
<p>
<?php echo $user; ?> (<a href="#">1 essages</a>)</p>
<a class="logout_user" href="<?php echo $logout; ?>" title="Logout">Logout</a>
</div>
<div class="breadcrumbs_container">
<article class="breadcrumbs"><a href="#">Website Admin</a>
<div class="breadcrumb_divider"></div>
<a class="current">
<?php echo $title; ?>
</a>
</article>
</div>
</section>
<!-- end of secondary bar -->

<aside id="sidebar" class="column">
<form class="quick_search">
<input type="text" value="Quick Search" onfocus="if (!this._haschanged) {
this.value = ''
}
;
this._haschanged = true;">
</form>
<hr/>

<h3>Users</h3>
<ul class="toggle">
<li class="icn_profile"><a href="#">Your Profile</a></li>
<li class="icn_security"><a href="#">Pin anagerment</a></li>
</ul>
<h3>Administration</h3>
<ul class="toggle">
<li class="icn_settings"><a href="#">Options</a></li>
<li class="icn_jump_back"><a href="<?php echo $logout; ?>">Logout</a></li>
</ul>
<footer>
<hr />
<p><strong>Copyright &copy; 2015 Enterprise Cloud Wellness Initiative</strong></p>
</footer>
</aside>
<!-- end of sidebar -->
