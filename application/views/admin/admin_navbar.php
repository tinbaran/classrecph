
			<input type="hidden" id="type_sess" value="<?php echo $this->session->userdata('sess_type');?>">		
	<header id="header" ng-controller="NavbarCtrl">
			<a href="<?php echo base_url();?>" id="logo" title="ClassRecPH">ClassRecPH</a>
			<div class="menu-trigger"></div>
			<nav id="menu">
				<?php 
					$sess_id = $this->session->userdata('sess_id');
					$sess_type = $this->session->userdata('sess_type');
					if(empty($sess_id)){
						$accounts = 'href="javascript:void(0);" ng-click="login()"';
						$class_record = 'href="javascript:void(0);" ng-click="login()"';
						$works = 'href="javascript:void(0);" ng-click="login()"';
						$students = 'href="javascript:void(0);" ng-click="login()"';
						$reports = 'href="javascript:void(0);" ng-click="login()"';
						$subjects = 'href="javascript:void(0);" ng-click="login()"';
						$grades = 'href="javascript:void(0);" ng-click="login()"';
						$advisory = 'href="javascript:void(0);" ng-click="login()"';
						$sections = 'href="javascript:void(0);" ng-click="login()"';
						// $teachers = 'href="javascript:void(0);" ng-click="login()"';
					}else{
						$accounts = 'href="#/accounts" onclick="set_active(\'accounts\')"';
						$class_record = 'href="#/class_records" onclick="set_active(\'class_records\')"';
						$works = 'href="#/works" onclick="set_active(\'works\')"';
						$students = 'href="#/students" onclick="set_active(\'students\')"';
						$reports = 'href="#/reports" onclick="set_active(\'reports\')"';
						$subjects = 'href="#/subjects" onclick="set_active(\'subjects\')"';
						$grades = 'href="#/grades" onclick="set_active(\'grades\')"';
						$advisory = 'href="#/advisory" onclick="set_active(\'advisory\')"';
						$sections = 'href="#/sections" onclick="set_active(\'sections\')"';
						// $teachers = 'href="#/teachers" onclick="set_active(\'teachers\')"';
					}
				?>

				<ul style="padding-left: 13%; ">
					<li><a class="menu_a" id="accounts_a" <?php echo $accounts;?>><i class="fa fa-lock fa-fw"></i> Accounts</a></li>
					
					<li ><a class="menu_a" i="subjects_a" <?php echo $subjects;?>><i class='fa fa-book fa-fw'></i> Components Percentage</a></li>
					<!-- <li><a class="menu_a" id="students_a" <?php echo $students;?>>Student List</a></li> -->
					
					
				</ul>
				<ul style="padding-left: 16%;">
					
				<!--	<li class="dropdown"><a class="menu_a dropbtn" id="reports_a"><i class="fa fa-archive fa-fw"></i> Reports</a></i>
						<?php 
							if($sess_type=="0"){
								echo"<div class='dropdown-content'>
								    <a class='menu_a' id='reports_a' <?php echo $reports;?>Users List</a>
								    <a class='menu_a' id='sections_a' <?php echo $sections;?> Sections List</a>
								 </div>";
								}
							
						?>
						  
					</li> -->
					
					<?php 
					$sess_id = $this->session->userdata('sess_id');
					if(empty($sess_id)){
				        
					echo'<li><a href="javascript:void(0);" ng-click="login()">Login</a></li>';
 					}else{
					echo'<li><a href="manage/logout">Logout</a></li>';
 					}
 					?>
 				</ul>
				
			<!-- / navigation -->
	
		<!-- / container -->
	
	</header>
	<!-- / header -->
