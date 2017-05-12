<!DOCTYPE html>
<html>
<head>

</head>
<body>
<div ng-controller="ClassRecordCtrl">
	<div class="container">
	  <h3 class="page-header"> {{page_title}} </h3>
	  </div>
	  	<input type="hidden" id="current_teacher" value="<?php echo $this->session->userdata('sess_id');?>">
	  	<input type="hidden" id="current_subject">
	  	<input type="hidden" id="current_section">
	  	<input type="hidden" id="current_module" value="ww">

		<input type="hidden" id="student_count">
		<input type="hidden" id="current_wc_ww">
		<input type="hidden" id="current_wc_pt">
		<input type="hidden" id="current_wc_qa">

		<input type="hidden" id="current_record">
		<div class="container">
			
			<div align="right">
              <form class="form-inline">
         <?php if($create){?> 
              
                <div class="form-group system_retrieve">
                    <label for="pwd">Search:</label>
                    <input type="text" class="form-control" ng-model="filter_here" placeholder="Subject Record">
                </div>
                
                &nbsp;&nbsp;
         <?php }?>
              </form>
        </div>
         
		</div>
		
         <br>

		<div class="panel-group container panel-responsive" ng-repeat="x in subjects|filter:filter_here">
				  <div class="panel panel-primary">
				    <div class="panel-heading" style="height: 50px; border: 1px solid">
				    
				      <h4 class="panel-title"><i class="fa fa-book fa-lg"></i>
				        <a data-toggle="collapse" href="javascript:void(0)" ng-click="process('find_sections',x.subject)">{{x.subjectname}} <i class="fa fa-caret-down"></i></a>
				      </h4>
				      
				    </div>
				    <div id="collapse_{{x.subject}}" class="panel-collapse collapse">
				      <div class="panel-body panel-responsive" id="section_here_{{x.subject}}"></div>
				    	
				      <div id="student_list_{{x.subject}}">
						
						<div class="table table-responsive">
							<div class="col-md-4">&nbsp;</div>
							<div class="col-md-7" align="right">	
								<table>
									<tr>
										<td valign="top" width="30%">
											<div class="input-group" style="padding-right:10px;">
												<span class="input-group-addon"><i class="fa fa-group"></i></span>
												<select id="section_list_{{x.subject}}" style="width:150px;" class="form-control btn btn-primary" title="Please select section" onchange="class_record_process('class_record','')">
												<option value="">Select Section:</option>
												</select>
											</div>
										</td>
										<td valign="top" width="30%">
											<div class="input-group" style="padding-right:10px;">
												<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
												<select id="acad_year_{{x.subject}}" style="width:150px;" class="form-control btn btn-primary" title="Please select school year">
												<option value="">School Year:</option>
												</select>
											</div>
										</td>
										<td valign="top" width="30%">
											<div class="input-group" style="padding-right:10px;">
												<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
												<select id="quarter_list_{{x.subject}}" style="width:150px;" class="form-control btn btn-primary" title="Please select quarter">
												<option value="">Select Quarter:</option>
												<option value="">ADD NEW QUARTER</option>
												</select>
											</div>
										</td>
										<td valign="top">
											<button class="btn btn-primary" onClick="class_record_process('select_section','')" style="height:35px;"><i class="fa fa-paper-plane"></i> Select</button>
											&nbsp;&nbsp;&nbsp;&nbsp;
										</td>	
									</tr>
								</table>		
				      		</div>
			      		</div>	
<!-- 			    		 style="pointer-events: none;opacity: 0.4;" -->
							<div class="container" style="pointer-events: none;opacity: 0.4;"  id="record_content_{{x.subject}}"><!-- Container Start-->
								<div class="container"><!-- Outer Row-->

									<div class="row"><!-- First Inner Row-->
										<div class="col-md-12">
											<center>
												<h3>Class Record</h3>
												<em>(Pursuant to Deped Order 8 series of 2015)</em><hr class="table table-responsive" style="width: 950px">
											</center>
										</div>
									</div>

									<div class="row" align="center"><!-- Inserted Inner Row-->	
										<div class="col-md-2" align="center">
											<img style="width:50%;height:50%;" src="<?php echo base_url();?>/assets/images/kagawaran.png">
										</div>

										<div class="col-md-3">

											<table class="table table-responsive" style="">
												<tr>
													<td style="border-top: none !important;">
														<strong>REGION:</strong> <input placeholder="Region Here" type="text" style="border:none;" autofocus="" id="selected_region_{{x.subject}}">
													</td>
												</tr>
												<tr>
													<td style="border-top: none !important;"><strong>DIVISION:</strong> <input placeholder="Division Here" type="text" style="border:none;" autofocus=""  id="selected_division_{{x.subject}}"></td>
													
												</tr>
												<tr>
													<td style="border-top: none !important;"><strong>DISTRICT:</strong> <input placeholder="District Here" type="text" id="selected_district_{{x.subject}}" style="border:none;" autofocus=""></td>
												</tr>
												
											</table>
											  
										</div>

										<div class="col-md-4">

											<table class="table table-responsive">
												<tr>
													<td style="border-top: none !important; "><strong>SCHOOL NAME:</strong> <br><input placeholder="School Name Here" id="selected_school_name_{{x.subject}}" type="text" style="border:none; width: 280px" autofocus=""></td>
													
												</tr>
												<tr>
													<td style="border-top: none !important;"><strong>SCHOOL ID:</strong> <input placeholder="School ID Here" type="text" style="border:none;" id="selected_school_id_{{x.subject}}" autofocus=""></td>

												</tr>
												
												
												
											</table>
										</div>
										
										<div class="col-md-2">
											<table class="table table-responsive">
												<tr>
													<td style="border-top: none !important; "><img src="<?php echo base_url();?>assets/images/deped.jpg" style="width:70px;height:80px;">
													</td>
												</tr>
												<tr>
													<td style="border-top: none !important; "><strong>SCHOOL YEAR:</strong> <input placeholder="School Year Here" type="text" style="border:none;" id="selected_school_year_{{x.subject}}" autofocus=""></td>
												</tr>
												
	
											</table>
										</div>

									</div><!-- Inserted Inner Row-->

									<div class="container table table-responsive" align="left" style="padding-left: 15px"><!-- Second Inner Row-->
											
										<div class="col-md-2">
												<strong>QUARTER:</strong> <input placeholder="#" type="text" style="border:none;" autofocus="" onkeyup="class_record_process('new_quarter','')" id="selected_quarter_{{x.subject}}">
										</div>

										<div class="col-md-4">
												<strong>GRADE & SECTION:</strong> &nbsp;&nbsp; <span id="selected_grade_section_{{x.subject}}">
										</div>
										<div class="col-md-3">

												<strong>TEACHER:</strong>&nbsp;&nbsp;<span id="record_teacher_name_{{x.subject}}"></span>
										</div>
										<div class="col-md-2">

												<strong>SUBJECT:</strong>&nbsp;&nbsp;<span id="record_subject_name_{{x.subject}}"></span>
										</div>
									</div><!-- Second Inner Row-->
									<hr class="table table-responsive" style="width: 950px">
									<div class="container table table-responsive"><!-- Student List Row-->
											<div class="row ">	

											<table class="table table-bordered " style="width: 10px">
												<thead>
													<tr>
														<!-- <th width="10%;"><strong>LEARNER'S NAME</strong></th> -->
														<th width="100%;">&nbsp;</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<!-- <td></td> -->
														<td>
															
														<ul class="nav nav-tabs">
														  <li class="active"><a data-toggle="tab" onclick="class_record_process('open_module','ww')">WRITTEN WORKS</a></li>
														  <li><a data-toggle="tab" onclick="class_record_process('open_module','pt')">PERFORMANCE TASK</a></li>
														  <li><a data-toggle="tab" onclick="class_record_process('open_module','qa')">QUARTERLY ASSESTMENT</a></li>
														  <li><a data-toggle="tab" onclick="class_record_process('open_module','qi')"> SUMMARY OF INITIAL GRADE & QUARTERLY GRADE <span id="quarter_here_{{x.subject}}"></span></a></li>
														</ul>

														<div class="tab-content" style="width:1090px;overflow: auto;">
														    <br>


														    <table class="table table-striped module " id="qi_{{x.subject}}" style="display:none;">
														    		<thead >
														  			<tr>
														  				<th><strong>LEARNER'S NAME</strong></th>
														  				<th><strong>WRITTEN <br>WORKS</strong></th>
														  				<th><strong>PERFORMANCE <br>TASK</strong></th>
														  				<th><strong>QUARTERLY <br>ASSESTMENT</strong></th>
														  				<th><strong>INITIAL</strong></th>
														  				<th><strong>QUARTERLY</strong></th>

														  			</tr>
														  		</thead>
														  		<tbody class="tbody_qi_{{x.subject}}" id="tbody_qi_{{x.subject}}"></tbody>
														    </table>

														    <table class="table table-striped module" id="qa_{{x.subject}}" style="display:none;">
														    	<thead id="thead_qa_{{x.subject}}">
																	<tr>
														  				<th><strong>LEARNER'S NAME</strong></th>
														  				<th><strong>1</strong></th>
														  				<th><strong>PS</strong></th>
														  				<th><strong>WS</strong></th>

														  			</tr>
														  		</thead>
														  		<tbody  class="tbody_qa_{{x.subject}}" id="tbody_qa_{{x.subject}}"></tbody>
														    </table>

														  	<table class="table table-striped module" id="pt_{{x.subject}}" style="display:none;">
														  		<thead id="thead_pt_{{x.subject}}">
														  			<tr>
														  				<th style="position:absolute; width:400px; height: 52px; background:#fff;">&nbsp;</th>
														  				<th style="padding-left: 400px;"><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Oral Work</option>
																			<option value=""> Group Presentation</option>
																			<option value=""> Skills Demonstration</option>
																			<option value=""> Multimedia Presentation</option>
																			<option value=""> Research Project</option>
																			</select></strong></th>
														  				

														  			</tr>
														  			<tr>
														  				<th style="position:absolute; width:400px; background:#fff;"><strong>LEARNER'S NAME</strong></th>
														  				<th style="padding-left: 400px;"><strong>1</strong></th>
														  				<th><strong>2</strong></th>
														  				<th><strong>3</strong></th>
														  				<th><strong>4</strong></th>
														  				<th><strong>5</strong></th>
														  				<th><strong>6</strong></th>
														  				<th><strong>7</strong></th>
														  				<th><strong>8</strong></th>
														  				<th><strong>9</strong></th>
														  				<th><strong>10</strong></th>
														  				<th><strong>TOTAL</strong></th>
														  				<th><strong>PS</strong></th>
														  				<th><strong>WS</strong></th>

														  			</tr>
														  		</thead>
														  		<tbody class="tbody_pt_{{x.subject}}" id="tbody_pt_{{x.subject}}"></tbody>
														  	</table>

														  	<table class="table table-striped module" id="ww_{{x.subject}}" >
														  		<thead id="thead_ww_{{x.subject}}">

														  			<tr>
														  				<th style="position:absolute; width:400px; height: 52px; background:#fff;">&nbsp;</th>
														  				<th style="padding-left: 400px;"><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				<th><strong><select id="" style="width:100px;" class="form-control btn btn-primary" title="Please select assessment name">
																			<option value=""> Quiz</option>
																			<option value=""> Unit test</option>
																			<option value=""> Essay</option>
																			<option value=""> Written Report</option>
																			</select></strong></th>
														  				

														  			</tr>
														  		
														  			<tr>
														  				
														  				<th style="position:absolute; width:400px; background:#fff;"><strong>LEARNER'S NAME</strong></th>
														  				<th style="padding-left:400px;"><strong>1</strong></th>
														  				<th><strong>2</strong></th>
														  				<th><strong>3</strong></th>
														  				<th><strong>4</strong></th>
														  				<th><strong>5</strong></th>
														  				<th><strong>6</strong></th>
														  				<th><strong>7</strong></th>
														  				<th><strong>8</strong></th>
														  				<th><strong>9</strong></th>
														  				<th><strong>10</strong></th>
														  				<th><strong>TOTAL</strong></th>
														  				<th><strong>PS</strong></th>
														  				<th><strong>WS</strong></th>

														  			</tr>
														  		</thead>
														  		<tbody class="tbody_ww_{{x.subject}}" id="tbody_ww_{{x.subject}}"></tbody>
														  	</table>

														</div>


														</td>
													</tr>
												</tbody>
											</table>	
											</div>

										<div class="row">
											<div class="col-md-10">
												<em style="color:red;font-weight: bold;">*Enter first the highest possible score before typing student's raw score.</em>
											</div>
											<div class="col-md-1" align="right">
												<button style="width:100px;" class="btn btn-success save_btn" id="save_score_btn_{{x.subject}}"><i class="fa fa-save fa-lg"></i> Save</button>
											</div>
										</div>
													<br><br>
									</div><!-- Student List Row-->

								</div><!-- Outer Row-->
							</div><!-- Container Row-->

				      </div>


				    </div>
				  </div>
				</div>
		</div>

</body>
</html>

