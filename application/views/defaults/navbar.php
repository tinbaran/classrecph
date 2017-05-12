
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
						$summary_quarterly = 'href="javascript:void(0);" ng-click="login()"';
					//	$summary_final = 'href="javascript:void(0);" ng-click="login()"';
						$advisory = 'href="javascript:void(0);" ng-click="login()"';
						$sections = 'href="javascript:void(0);" ng-click="login()"';
						// $teachers = 'href="javascript:void(0);" ng-click="login()"';
						$sections_list = 'href="javascript:void(0);" ng-click="login()"';
					}else{
						$accounts = 'href="#/accounts" onclick="set_active(\'accounts\')"';
						$class_record = 'href="#/class_records" onclick="set_active(\'class_records\')"';
						$works = 'href="#/works" onclick="set_active(\'works\')"';
						$students = 'href="#/students" onclick="set_active(\'students\')"';
						$reports = 'href="#/reports" onclick="set_active(\'reports\')"';
						$subjects = 'href="#/subjects" onclick="set_active(\'subjects\')"';
						$summary_quarterly = 'href="#/summary_quarterly" onclick="set_active(\'summary_quarterly\')"';
					//	$summary_final = 'href="#/summary_final" onclick="set_active(\'summary_final\')"';
						$advisory = 'href="#/advisory" onclick="set_active(\'advisory\')"';
						$sections = 'href="#/sections" onclick="set_active(\'sections\')"';
						// $teachers = 'href="#/teachers" onclick="set_active(\'teachers\')"';
						$sections_list = 'href="#/sections_list" onclick="set_active(\'sections_list\')"';
					}
				?>

				<ul style="padding-left: 11%; ">
					<li><a class="menu_a" id="accounts_a" <?php echo $accounts;?>><i class="fa fa-lock fa-fw"></i> <?php if($sess_type=="0"){echo "User Accounts";}else{echo "My Account";}?></a></li>
					<li><a class="menu_a" id="sections_list_a" <?php echo $sections_list;?>><i class="fa fa-list-alt fa-fw"></i> <?php if($sess_type=="1"){echo "Sections";}?></a></li>
					<li><a class="menu_a" id="advisory_a" <?php echo $advisory;?>><?php if($sess_type=="0"){echo "";}else{echo "<i class='fa fa-group fa-fw'></i> My Advisory";}?></a></li>
					<!-- <li><a class="menu_a" id="students_a" <?php echo $students;?>>Student List</a></li> -->
					
					
				</ul>
				<ul style="padding-left: 11%;">
					<li ><a class="menu_a" i="subjects_a" <?php echo $subjects;?>><?php 
							if($sess_type == "0"){
								echo "<i class='fa fa-book fa-fw'></i> Subject Management";
							}else{
								echo"<i class='fa fa-book fa-fw'></i> Subjects";
							}
						?>
					</a></li>
					<li><a class="menu_a" id="class_records_a" <?php echo $class_record;?>> <?php if($sess_type=="0"){echo "";}else{echo "<i class='fa fa-table fa-fw'></i> Class Record";}?></a></li>
				<!--	<li ><a class='menu_a' id='grades_a' <?php echo $grades;?>><i class="fa fa-eye fa-fw"></i> Monitoring</a></li> -->
					<li class="dropdown"><a class="menu_a dropbtn" id="reports_a"><i class="fa fa-archive fa-fw"></i> Reports</a></i>
						<?php 
							if($sess_type=="1"){
								
								echo"<div class='dropdown-content'>
								    <a class='menu_a' id='students_a' <?php echo $students;?>Student List</a>
								    <a class='menu_a' id='summary_quarterly_a' <?php echo $summary_quarterly;?>Summary Quarterly</a>
								
								 </div>";

								}
						?>
						  
					</li>
					
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
