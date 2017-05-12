<!DOCTYPE html>
<!--[if IE 8]> <html class="ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<title><?php echo $page_title;?> | ClassRecPH</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
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

	<link rel="stylesheet" href="<?php echo base_url();?>assets/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" href="<?php echo base_url();?>assets/font-awesome/css/font-awesome.min.css">

	
</head>
<div id="alert" style="display:none;position:fixed;width:100%;">
    <a class="alert" href="#" style="text-decoration: none;background-color: #7FC682;color:white;" id="remove_alert">
    	<div id="alert_msg"></div>
 </a>
    	
</div>
<script type="text/javascript">
	//var class_rec = angular.module('class_rec',['ngRoute','angularUtils.directives.dirPagination']);
</script>
<body ng-app="class_rec">

