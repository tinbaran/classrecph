<input type="hidden" id="current_teacher" value="<?php echo $this->session->userdata('sess_id');?>">
<input type="hidden" id="current_subject">
<input type="hidden" id="current_section">
<input type="hidden" id="student_count">

<div class="container">
<h3 class="page-header"> {{page_title}} </h3>
<div class="panel panel-primary" ng-controller="FinalCtrl">
  <div class="panel-heading">&nbsp;</div>
  <div class="panel-body">

	<ul class="nav nav-tabs" id="module_ul">
	  <li class="active" id="student_grade"><a href="javascript:void(0);" onclick="summary_final_process('module_tabs','student_grade')">STUDENTS GRADES</a></li>
	 
	  <li class="" id="student_ranking"><a href="javascript:void(0);" onclick="summary_final_process('module_tabs','student_ranking')">SUBJECT RANKING <span id="subject_here"></span></a></li>
	  
	</ul>
	<br>

		<div id="final_list">
				<div class="row">
					<div class="col-md-4">&nbsp;</div>
					<div class="col-md-5" align="right">	
						<table>
							<tr>
								<td valign="top" width="25%">
									<div class="input-group" style="padding-right:10px;">
										<span class="input-group-addon"><i class="fa fa-book"></i></span>
										<select style="width:140px;" onchange ="summary_final_process('find_sections','')" id="selected_subject" class="form-control btn btn-primary" title="Please select subject">
										<option value="">Select Subject:</option>
										<option ng-repeat="sub in subject_list" value="{{sub.id}}">{{sub.name}}</option>
										</select>
									</div>
								</td>
								<td valign="top" width="25%">
									<div class="input-group" style="padding-right:10px;">
										<span class="input-group-addon"><i class="fa fa-group"></i></span>
										<select style="width:140px;" id="selected_section" onchange="summary_final_process('find_years',this)" disabled="disabled" class="form-control btn btn-primary" title="Please select section">
										<option value="">Select Section:</option>
										</select>
									</div>
								</td>
								<td valign="top" width="25%">
									<div class="input-group" style="padding-right:10px;">
										<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
										<select style="width:130px;" id="selected_year" disabled="disabled" class="form-control btn btn-primary" title="Please select academic year">
										<option value="">Select Year:</option>
										</select>
									</div>
								</td>
								<td valign="top">
								<div style="padding-right:10px;">
									<button class="btn btn-md btn-primary" disabled="disabled" id="selected_btn" onClick="summary_final_process('find_records','')" style="height:35px;"><i class="fa fa-paper-plane"></i> Select</button>
									&nbsp;&nbsp;
								</div>
									
								</td>
									
								<!-- <td valign="top">
									<button class="btn btn-success" disabled="disabled"  style="height:35px;" id="rank_btn" onClick="grade_process('rank','')"><i class="fa fa-list"></i> Rank</button>
									&nbsp;&nbsp;	&nbsp;&nbsp;
								</td>	 -->
							</tr>
						</table>		
		      		</div>
		      		
		  		</div>	
		  	<br>
		  	<br>

			<table class="table table-striped table-bordered table-condensed table-hover" id="student_list_tbl" style="pointer-events: none;opacity: 0.6;">
				<thead class="bg-primary" style="font-size: 14px; padding: 20em">
					<tr id="subject_details">
						<th><strong>LEARNER'S NAME</strong></th>
						<th><strong>QUARTER I</strong></th>
						<th><strong>QUARTER II</strong></th>
						<th><strong>QUARTER III</strong></th>
						<th><strong>QUARTER IV</strong></th>
						<th><strong>FINAL GRADE</strong></th>
						<th><strong>REMARK</strong></th>
					</tr>
				</thead>
				<tbody id="student_list"></tbody>

			
			</table>

			<br>
			<br>
			<br>

			<div class="col-md-3">

				<button class="btn btn-md btn-success" disabled="disabled" id="btn_print" onClick="summary_final_process('print_record','')" style="height:55px; "><i class="fa fa-print fa-lg"></i> Print <br> Summary of Final Grade</button>
				&nbsp;
			</div>
			<br>
			<br>
			<br>
			<br>

								


		</div><!-- final list -->	

		<div id="ranking_student">
			
			<table class="table table-striped table-bordered table-condensed table-hover" id="student_ranking_list" style="pointer-events: none;opacity: 0.6;">
				<thead class="bg-primary" style="font-size: 14px; padding: 20em">
					<tr id="subject_details">
						<th><strong>LEARNER'S NAME</strong></th>
						<th><strong>ACADEMIC YEAR</strong></th>
						<th><strong>FINAL GRADE</strong></th>
						<th><strong>RANK</strong></th>
					</tr>
				</thead>
				<tbody id="rank_list"></tbody>
			</table>

		</div>




  </div>
</div>
</div>