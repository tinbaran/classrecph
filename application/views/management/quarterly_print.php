<div ng-controller="ClassRecordCtrl">
<link rel="shortcut icon" href="<?php echo base_url();?>assets/images/logo.png">
<link rel="stylesheet" href="<?php echo base_url();?>assets/css/bootstrap.min.css">
<script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
<script src="<?php echo base_url();?>assets/system/js/default.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/system/js/quarterly_printing.js"></script>
<link rel="stylesheet" href="<?php echo base_url();?>assets/font-awesome/css/font-awesome.css">
<link rel="stylesheet" href="<?php echo base_url();?>assets/font-awesome/css/font-awesome.min.css">

<input type="hidden" value="<?php echo $subject;?>" id="subject_id">
<input type="hidden" value="<?php echo $section;?>" id="section_id">
<input type="hidden" value="<?php echo $academic_year;?>" id="academic_year">
<input type="hidden" value="<?php echo $record_id;?>" id="record_id">

<input type="hidden" id="teacher" value="<?php echo $this->session->userdata('sess_id');?>">


				<div class="row"><!-- First Inner Row-->
					<div class="col-md-12">
						<center>
							<h3>SUMMARY OF QUARTERLY GRADES</h3>
								<hr style="width: 1140px">
						</center>
					</div>
				</div>

<div class="container" style="padding-left:2%;" align="center">
	<table style="width:95%;">
		<tr>
			<td valign="top">
				<img style="width:100px;height:100px;" src="<?php echo base_url();?>/assets/images/kagawaran.png">
				<br><br>
				
			</td>
			<td valign="top">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
			<td valign="top" style="padding-top:2%;">
				<strong>REGION:</strong> <span id="region_here"></span>
				<br><br>
				<strong>SCHOOL NAME:</strong> <span id="school_name_here"></span>
				<br><br>
				<strong>GRADE & SECTION:</strong> <span id="grade_section_here"></span>
				<br><br>
				<strong>QUARTER #:</strong> <span id="quarter_here"></span>
			</td>
			<td valign="top">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
			<td valign="top" style="padding-top:2%;">
				<strong>DIVISION:</strong> <span id="division_here"></span>
				<br><br>
				<strong>DISTRICT:</strong> <span id="district_here"></span>
				<br><br>
			</td>
			<td valign="top">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
			<td valign="top" style="padding-top:2%;">
				
				<strong>SCHOOL ID:</strong> <span id="school_id_here"></span>
				<br><br>
				<strong>TEACHER:</strong> <span id="teacher_name_here"></span>
			</td>
			<td valign="top">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
			<td valign="top">
				<img style="width:100px;height:100px;" src="<?php echo base_url();?>assets/images/deped.jpg">
	
				<br><br>
				<strong>SCHOOL YEAR:</strong> <span id="school_year_here"></span>
				<br><br>
				<strong>SUBJECT:</strong> <span id="subject_name_here"></span>
			</td>
		</tr>
	</table>
</div>


<div class="row" ng-repeat="x in subjects" style="padding-left:2%;">




<hr style="width: 1140px">

<div class="container" id="final_list">
				
		  	<br>
		  	<table class="table table-bordered" id="student_list_tbl"  style="width:95%;">
			
				<thead>
					<tr id="subject_details">
						<th>LEARNER'S NAME</th>
						<th>QUARTER I</th>
						<th>QUARTER II</th>
						<th>QUARTER III</th>
						<th>QUARTER IV</th>
						<th>FINAL GRADE</th>
						<th>REMARK</th>
					</tr>
				</thead>
				<tbody id="student_list"></tbody>
			</table>

</div><!-- final list -->


<br>
<br>
<br>

<div class="container">

<button class="btn btn-lg btn-success" id="span_print" href="javascript:void(0)" onClick="print_page()" style="z-index:0;height:50px;width: 120px"><i class="fa fa-print fa-md"></i> Print</button>
&nbsp;
</div>


</div>
	

