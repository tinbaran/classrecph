

		<!-- Header -->
		<input type="hidden" id="type_sess" value="<?php echo $this->session->userdata('sess_type');?>">
<header class="header" id="header" ng-controller="NavbarCtrl">
		<div class="container">
		<!-- Navbar -->
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="container-fluid">

				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand wow fadeInLeft animated animated" data-wow-delay=".5s" href="index.php" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInLeft;"></a><img src="<?php echo base_url();?>assets/images/ClassRecPH_Logo(text).png" style="width: 172px; height: 65px"/>
				</div>

				<div class="navbar-collapse collapse hover-effect wow fadeInRight animated" data-wow-delay=".5s" id="navbar">
					<ul>
						<li><a href="<?= base_url('#home') ?>" class="active"><i class="fa fa-home fa-fw"></i> HOME</a></li>
						<li><a href="<?= base_url('#features') ?>"><span data-hover="FEATURES"><i class="fa fa-newspaper-o fa-fw"></i> FEATURES</span></a></li>
						<li><a href="<?= base_url('#about') ?>"><span data-hover="ABOUT"><i class="fa fa-info-circle fa-fw"></i> ABOUT</span></a></li>
						<li><a href="<?= base_url('#team') ?>"><span data-hover="TEAM"><i class="fa fa-group fa-fw"></i> TEAM</span></a></li>
						<li><a href="<?= base_url('#contact') ?>"><span data-hover="CONTACT"><i class="fa fa-phone-square fa-fw"></i> CONTACT</span></a></li>
						<li><a href="<?= base_url('#register') ?>"><span data-hover="REGISTER"><i class="fa fa-user-plus fa-fw"></i> REGISTER</span></a></li>
						<?php 
						$sess_id = $this->session->userdata('sess_id');
						if(empty($sess_id)){
						echo'<li><a href="javascript:void(0);" ng-click="login()"><span data-hover="LOGIN"><i class="fa fa-sign-in fa-fw"></i>LOGIN</span></a></li>';
	 					}else{
						echo'<li><a href="manage/logout">Logout</a></li>';
	 					}
	 					?>
					</ul>
				</div>

			</div>
		</nav>
		<!-- //Navbar -->
		
	</div>
	</header>
