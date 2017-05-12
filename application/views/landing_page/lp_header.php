<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-type" content="text/html" charset="utf-8">
<title><?php echo $page_title;?> | ClassRecPH</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<!-- Custom-Stylesheet-Links -->
	<link rel="stylesheet" media="all" href="<?php echo base_url();?>assets/css/style.css">
	<link rel="stylesheet" media="all" href="<?php echo base_url();?>assets/css/notification.css">
	<link rel="shortcut icon" href="<?php echo base_url();?>assets/images/logo.png">
	<script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/bootstrap.min.css">
	<script src="<?php echo base_url();?>assets/js/bootstrap.min.js"></script>
	
	<script src="<?php echo base_url();?>assets/js/angular/angular.min.js"></script>
	<script src="<?php echo base_url();?>assets/js/angular/angular-route.js"></script>
	<script src="<?php echo base_url();?>assets/js/angular/dirPagination.js"></script>
	<script src="<?php echo base_url();?>assets/system/js/default.js"></script>
	<script src="<?php echo base_url();?>assets/system/js/pre.js"></script>

	<link rel="stylesheet" href="<?php echo base_url();?>assets/font-awesome/css/bootstrap.min.css" type="text/css"> 
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/styles.css" type="text/css" media="all" >


	<!--//end-animate-->
</head>
<div id="alert" style="display:none;position:fixed;width:100%;">
    <a class="alert" href="#" style="text-decoration: none;background-color: #7FC682;color:white;" id="remove_alert">
    	<div id="alert_msg"></div>
 </a>
    	
</div>
<body ng-app="class_rec">
