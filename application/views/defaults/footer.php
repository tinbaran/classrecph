<style type="text/css">
	/* Dropdown Button */
.dropbtn {
/*    background-color: #4CAF50;
    color: white;*/
/*    padding: 16px;*/
/*    font-size: 16px;*/
    border: none;
    cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    min-width: 180px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
    color: black;
    padding: 3px;
    text-decoration: none;
    display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
	
    display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
/*    background-color: #3e8e41;*/
}
</style>



<br><br><br><br><br><br><br>
<div class="pre_blocker" style="display: none;">
		<svg xmlns="" version="1.1">
		  <defs>
		    <filter id="gooey">
		      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
		      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
		      <feBlend in="SourceGraphic" in2="goo"></feBlend>
		    </filter>
		  </defs>
		</svg>
		<div class="blob blob-0"></div>
		<div class="blob blob-1"></div>
		<div class="blob blob-2"></div>
		<div class="blob blob-3"></div>
		<div class="blob blob-4"></div>
		<div class="blob blob-5"></div>
</div>


<a href="#fancy" id="pancy" style="display:none;" class="get-contact">
</a>
<div id="fancy">
		<h4 id="fancy-title"></h4>
		<div id="fancy-body"></div>
</div>		
		<!-- <form action="#">
			<div class="left">
				<fieldset class="mail"><input placeholder="Email address..." type="text"></fieldset>
				<fieldset class="name"><input placeholder="Name..." type="text"></fieldset>
				<fieldset class="subject"><select><option>Choose subject...</option><option>Choose subject...</option><option>Choose subject...</option></select></fieldset>
			</div>
			<div class="right">
				<fieldset class="question"><textarea placeholder="Question..."></textarea></fieldset>
			</div>
			<div class="btn-holder">
				<button class="btn blue" type="submit">Send request</button>
			</div>
		</form> -->
	</div>
<style>
.pre_blocker{
   position:fixed;
   left:0;
   top:0;
   z-index:99999999999;
   width:100%;
   height:100%;
   overflow:visible;
   background: rgba(0,0,0,0.8);
   color: #fff;
   display: table;
}
</style>
	<footer id="footer" style="height:20%;">
			<p class="copy">Copyright 2017  <a href="<?= base_url('#home') ?>">ClassRecPH</a> | All rights reserved.</p>
		<!-- / container -->
	</footer>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/loader.css">
	<!-- / footer -->
	<script src="<?php echo base_url();?>assets/js/plugins.js"></script>
	<script src="<?php echo base_url();?>assets/js/main.js"></script>
</body>
</html>
