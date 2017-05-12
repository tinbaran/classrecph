

<!DOCTYPE html>
<html>
<head>
<title>Home | ClassRecPH</title>
<link rel="shortcut icon" href="<?php echo base_url();?>assets/images/logo.png">



<!-- Custom-Stylesheet-Links -->
	<link rel="stylesheet" href="assets/font-awesome/css/bootstrap.min.css" type="text/css" media="all"/>
	<link rel="stylesheet" href="assets/css/styles.css" type="text/css" media="all" />
	<link rel="stylesheet" href="assets/css/flexslider.css" type="text/css" media="screen" />
<!-- //Custom-Stylesheet-Links -->
<!-- Web-Fonts -->
	<link href='//fonts.googleapis.com/css?family=Hammersmith+One' rel='stylesheet' type='text/css'>
	<link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
	<link href='//fonts.googleapis.com/css?family=Oswald:400,700,300' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="<?php echo base_url();?>assets/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" href="<?php echo base_url();?>assets/font-awesome/css/font-awesome.min.css">
<!-- //Web-Fonts -->
 <script type="text/javascript" src="assets/js/angular/jquery.min.js"></script>
<script type="text/javascript" src="assets/js/angular/bootstrap.min.js"></script>
<!--gallery-->
<!--JS for animate-->
	<link href="assets/css/animate.css" rel="stylesheet" type="text/css" media="all">
	<script src="assets/js/wow.min.js"></script>
		<script>
			new WOW().init();
		</script>


		
	<!--//end-animate-->


</head>
<body>


<!-- Banner -->
	<div class="banner" id="home">
		<!-- Header -->
		<input type="hidden" id="type_sess" value="<?php echo $this->session->userdata('sess_type');?>">
	
	<div class="container">
			<div class="banner-info">
				<section class="slider1">
					<div class="flexslider">
						<ul class="slides">
							<li>
								<div class="banner-info1">
									<h1>ClassRecPH</h1>
									<p>It is a Software-As-A-Service class-recording platform for Philippine K+12 teachers that is simple and easy  to manage and monitor student's record</p>
									
								</div>
							<li>
							<li>
								<div class="banner-info1">
									<h1>Class Record Management and Monitoring</h1>
									<p>Makes it simple to track progress and manage student's class record</p>
									
								</div>
							<li>
								<div class="banner-info1">
									<h1>User-friendly design and usability</h1>
									<p>Convenience on usability with data synchronization between devices</p>
									
								</div>
							</li>
							<li>
								<div class="banner-info1">
									<h1>Online storage of data</h1>
									<p>Storing of data for easy access and retrieval</p>
									
								</div>
							</li>
						</ul>
					</div>
				</section>
			
							<!-- FlexSlider -->
									  <script defer="" src="assets/js/jquery.flexslider.js"></script>
									  <script type="text/javascript">
										$(function(){
										 
										});
										$(window).load(function(){
										  $('.flexslider').flexslider({
											animation: "slide",
											start: function(slider){
											  $('body').removeClass('loading');
											}
										  });
										});
									  </script>
								<!-- FlexSlider -->
			</div>
		</div>


		</div>
	<!-- //Header -->
		<!-- //Banner -->

	<!-- w3l -->
	<div class="w3l" id="register" style="padding-top: 90px">
	<section class="posts">
	<div class="container" style="border: 0.5px solid; padding-top: 15px; padding-bottom: 10px; border-color: #215954; background-color: #ffffff;">		
		

		<?php if(empty($sess_id)){ ?>
							
			 <div ng-controller="RegisterCtrl" >
			 	<h3 class="page-header">Register</h3>
			 <div class="container">
				<form class="form-horizontal" role="form">
					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="email">Profile:</label>
					    <div class="col-lg-8">
					      <input type="file" id="file_upload" onchange="loadFile(event)">
					    </div>
					  </div>
					  
					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Email:</label>
					    <div class="col-lg-8">
					      <input type="text" class="form-control" id="email">
					    </div>
					  </div>


					  
					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Password:</label>
					    <div class="col-lg-8">
					      <input type="password" class="form-control" id="password">
					    </div>
					  </div>

					   <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Gender:</label>
					    <div class="col-lg-8">
					    	<div  style="display:inline;margin-right: 10px;">
								<input type="radio" name="gender" value="Female" id="gender">&nbsp;Female
								<input type="radio" name="gender" value="Male" id="gender">&nbsp;Male
							</div>	
					    </div>
					  </div>


					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">First Name:</label>
					    <div class="col-lg-8">
					      <input type="text" class="form-control" id="fname">
					    </div>
					  </div>


					  
					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Middle Name:</label>
					    <div class="col-lg-8">
					      <input type="text" class="form-control" id="mname">
					    </div>
					  </div>


					  
					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Last Name:</label>
					    <div class="col-lg-8">
					      <input type="text" class="form-control" id="lname">
					    </div>
					  </div>

					  
					  
				<!--	  <div class="form-group">
					  	
					          <label class="col-lg-3 control-label" for="pwd">Grade Level:</label>
					          <div class="col-lg-8">
					            <div class="ui-select" >
					              <select class="form-control" id="grade_here" name="grade_here" >

					              	<option ng-repeat="x in year_list" value="{{x.id}}">{{x.level}}</option>
					                
					              </select>
					            </div>
					          </div>
					  </div> -->
	

					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Grade Level:</label>
					    <div class="col-lg-8">
					    	<div ng-repeat="x in year_list" style="display:inline;margin-right: 2px;">
								<input type="radio" id="grade_here" name="grade_here" value="{{x.id}}">&nbsp;{{x.level}}
							</div>	
					    </div>
					  </div> 
					  
					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Address:</label>
					    <div class="col-lg-8">
					      <input type="text" class="form-control" id="address">
					    </div>
					  </div>

				<!--	  <div class="form-group">
				          <label class="col-lg-3 control-label" for="pwd">Recovery <br> Question:</label>
				          <div class="col-lg-8" >
				          		<div >
					              <select class="form-control" id="question_id" name="question_here" ng-repeat="x in question_list">

					              	<option ng-repeat="x in question_list" value="{{x.id}}">{{x.question}}</option>
					                 
					              </select>
					            </div>
				          </div>
				      </div> -->

					  <div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Recovery <br> Question:</label>
							  <div class="container">  
							    <div class="col-lg-8" style="">
							    	<div class="" ng-repeat="x in question_list" style="margin-bottom: 10px;">
										<input type="radio" id="question_id" name="question_here" value="{{x.id}}">&nbsp;{{x.question}}
									</div>	
							    </div>
							</div>  
					  </div> 

					<div class="form-group">
					    <label class="col-lg-3 control-label" for="pwd">Answer:</label>
					    <div class="col-lg-8">
					    	<div style="display:inline;margin-right: 10px;">
								<textarea id="answer" style="width:500px;"></textarea>
							</div>	
					    </div>
					  </div>


					  <div class="form-group">
					    <div class="col-lg-offset-3 col-lg-8">
					      <button type="button" onclick="account_process('save','')" class="btn btn-lg btn-primary"><i class="fa fa-save"></i> SIGN UP</button>
					    </div>
					  </div>
				</form>
				</div>

		</div>

					<?php }else{ ?>
						<ng-view></ng-view>
					<?php }?>
		<!-- / container -->

					

</div>
</section>
</div>


			<div class="clearfix"></div>

<!-- //w3l -->

<div class="services wthree-4" id="features">
	<div class="container" style="border: 0.5px solid; padding-top: 15px; padding-bottom: 10px; border-color: #215954; background-color: #f4f4f4;">
	<div class="feature" >
							<h2 class="page-header">Features</h2>
							<div class="feature-grids">
								<div class="col-md-3 feature-grid agileits-5 wow fadeInLeft animated" data-wow-delay=".5s">
									<div class="feature-icon">
									<i class="hovicon effect-2 sub-a"><span class="fa fa-mortar-board fa-fw" aria-hidden="true"></span></i>
									</div>
									<h4>Track and Manage</h4>
									<p>A class record management through online to make teacher's work easier and convenient.</p>
								</div>
								<div class="col-md-3 feature-grid agileits-5 wow fadeInLeft animated" data-wow-delay=".5s">
									<div class="feature-icon">
										<i class="hovicon effect-2 sub-a"><span class="fa fa-eye fa-fw" aria-hidden="true"></span></i>
									</div>
								
									<h4>Monitoring</h4>
									<p>Monitor student grades and their academic status in class.</p>
								</div>
								<div class="col-md-3 feature-grid agileits-5 wow fadeInRight animated" data-wow-delay=".5s">
									<div class="feature-icon">
										<i class="hovicon effect-2 sub-a"><span class="fa fa-archive fa-fw" aria-hidden="true"></span></i>
									</div>
									<h4>Record Keeping</h4>
									<p>Less hassle for file storage and retrieval.</p>
								</div>
								<div class="col-md-3 feature-grid agileits-5 wow fadeInRight animated" data-wow-delay=".5s">
									<div class="feature-icon">
										<i class="hovicon effect-2 sub-a"><span class="fa fa-globe fa-fw" aria-hidden="true"></span></i>
									</div>
									<h4>Anytime, Anywhere</h4>
									<p>Keeps the class record on-the-go with data synchronization from mobile devices.</p>
								</div>
									<div class="clearfix"></div>
							</div>
						</div>
					</div>
</div>
		<!-- agile -->

	<div class="about wthree" id="about">
				<div class="container" style="border: 0.5px solid; padding-top: 15px; padding-bottom: 10px; border-color: #215954; background-color: #ffffff;">
					<div class="feature" >
					
					<div class="col-md-6 about-grid agileits-1">
						<div class="about-header">
							<h3 class="page-header">Why choose ClassRecPH?</h3>
						</div>
							<div class="about-1">
							 <h4>1. Hassle Free</h4>						 
							<h4>2. Efficient</h4>							 
							<h4>3. Portable</h4> 
							<h4>4. Time Saving</h4>
							<h4>4. Easy to Use</h4>
							 
							</div>
						</div>
					<div class="col-md-6 about-grid agileits-1">
						<div class="about-header">
						<h3 class="page-header">About us</h3>
						</div>
							<div class="about-1">
							 <img src="assets/images/landing_page/7.jpg" class="img-responsive" alt="/">
							 <h4>Team ClassRecPH</h4>
							 <p>We strive to offer the best for our users and we wish to reduce the workload of the teachers by eliminating the common problems encountered.</p>
							</div>
					</div>
				</div>
			</div>
	</div>
						<div class="clearfix"></div>
			<div class="about wthree-4" id="team">
			<div class="container" style="border: 0.5px solid; padding-top: 15px; padding-bottom: 10px; border-color: #215954; background-color: #f4f4f4;">
					<div class="feature" >
					<h1 class="page-header">Our Team</h1>
					
				<div class="team-info w3agile-1" >
					<div class="col-md-3 team-grids agileinfo-1">
						<a href="#">
							<img class="img-responsive" src="assets/images/team/tin.jpg" alt="" style="width: 250px; height: 290px">
							<div class="captn">
								<h4>Kristine</h4>
								<p>Project Manager</p>
									<ul class="social-icons1">
										<li><i class="fa fa-facebook"></i></li>
										<li><i class="fa fa-twitter"></i></li>
										<li><i class="fa fa-linkedin"></i></li>
									</ul>
							</div>
						</a>
					</div>					
					<div class="col-md-3 team-grids agileinfo-1">
						<a href="#">
							<img class="img-responsive" src="assets/images/team/jaypee.jpg" alt="" style="width: 250px; height: 290px">
							<div class="captn">
								<h4>Jaypee</h4>
								<p>System Analyst</p>
									<ul class="social-icons1">
										<li><i class="fa fa-facebook"></i></li>
										<li><i class="fa fa-twitter"></i></li>
										<li><i class="fa fa-linkedin"></i></li>
									</ul>
							</div>
						</a>
					</div>
					<div class="col-md-3 team-grids agileinfo-1">
						<a href="#">
							<img class="img-responsive" src="assets/images/team/rusty.jpg" alt="" style="width: 250px; height: 290px">
							<div class="captn">
								<h4>Rusty</h4>
								<p>UX Designer</p>
									<ul class="social-icons1">
										<li><i class="fa fa-facebook"></i></li>
										<li><i class="fa fa-twitter"></i></li>
										<li><i class="fa fa-linkedin"></i></li>
									</ul>
							</div>
						</a>
					</div>
					<div class="col-md-3 team-grids agileinfo-1">
						<a href="#">
							<img class="img-responsive" src="assets/images/team/nina.jpg" alt="" style="width: 250px; height: 290px">
							<div class="captn">
								<h4>Niña</h4>
								<p>Technical Writer</p>
									<ul class="social-icons1">
										<li><i class="fa fa-facebook"></i></li>
										<li><i class="fa fa-twitter"></i></li>
										<li><i class="fa fa-linkedin"></i></li>
									</ul>
							</div>
						</a>
					</div>

					<div class="col-md-3 col-md-push-4 team-grids agileinfo-1 team-info">
						<a href="#">
							<img class="img-responsive" src="assets/images/team/alce.jpg" alt="" style="width: 250px; height: 290px">
							<div class="captn">
								<h4>Jossie</h4>
								<p>Programmer</p>
									<ul class="social-icons1">
										<li><i class="fa fa-facebook"></i></li>
										<li><i class="fa fa-twitter"></i></li>
										<li><i class="fa fa-linkedin"></i></li>
									</ul>
							</div>
						</a>
					</div>
					<div class="clearfix"> </div>
				</div>
				</div>
			</div>
			</div>



<div class="contact wthree" id="contact">
	<div class="container" style="border: 0.5px solid; padding-top: 15px; padding-bottom: 10px; border-color: #215954; background-color: #ffffff;">
	<div class="contact-form" >
				<div class="col-md-4 contact-form-left agile-3">
					<h2>Address :</h2>
					<p>League of Legends Inc.</p>
					<p>Crossroad, Richstone City</p>
					<p>Telephone : 023 5525</p>
					<p>FAX : 213 5409</p>
					<a href="mailto:example@email.com">classrecph_info.com</a>
				</div>
				<div class="col-md-8 contact-form-right  agileits-3">
					<h3 class="page-header">Contact Form</h3>
					<form action="#" method="post">
						<input type="text" name="name" placeholder="Name">
						<input type="email" name="email" placeholder="Email">
						<input type="text" name="phone" placeholder="Phone">
						
						<textarea placeholder="Message" name="message" required=""></textarea>
						<input type="submit" value="Submit">
					</form>
				
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
	
	</body>
	</html>