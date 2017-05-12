<?php

Class Class_record_model extends CI_Model{


	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}

	function subject_list(){
		$sess_id = $this->session->userdata('sess_id');
		$query = $this->db->query("SELECT ads.user_id,ads.id as advisory_id,ads.subject,ads.status,ss.id as subject_id,ss.id as id_subject,ss.name as subjectname FROM advisories as ads LEFT JOIN subjects as ss ON ads.subject=ss.id WHERE user_id = '$sess_id' AND ads.status='0' GROUP BY ads.subject ORDER BY ss.name");

		$this->MM->result_encode($query);

	}

	function section_list(){
		$sess_id = $this->session->userdata('sess_id');
		$subject_id = $this->input->post('subject_id');

		$query = $this->db->query("SELECT ads.user_id,ads.status,ads.section,ads.subject,sec.id,sec.name as section_name FROM advisories as ads LEFT JOIN sections as sec ON sec.id=ads.section WHERE ads.user_id='$sess_id' AND ads.subject='$subject_id' AND ads.status='0' ORDER BY sec.name");
		$this->MM->result_encode($query);
	}

	function score_list(){
		$module = $this->input->post('module');
		$teacher = $this->input->post('teacher');
		$subject = $this->input->post('subject');
		$section = $this->input->post('section');
		$record_id = $this->input->post('record_id');

		$query = $this->db->query("SELECT * FROM grade_highest_score WHERE module='$module' AND teacher='$teacher' AND subject='$subject' AND section='$section' AND record_id='$record_id'");

		$this->MM->result_encode($query);

	}

	function quarter_list(){
		$query = $this->db->query("SELECT * FROM tbl_quarter");

		$this->MM->result_encode($query);
	}

	function record_list(){
		$record_id = $this->input->post('record_id');
		$teacher_id = $this->input->post('teacher_id');
		$subject_id = $this->input->post('subject_id');
		$grade_section = $this->input->post('grade_section');

		if(empty($record_id)){
			$where = "subject='$subject_id' AND teacher='$teacher_id' AND grade_section='$grade_section'";
		}else{
			$where = "id='$record_id'";
		}

		$query = $this->db->query("SELECT * FROM class_record WHERE $where GROUP BY quarter");
		$this->MM->result_encode($query);

	}

	function record_list2(){
		$record_id = $this->input->post('record_id');
		$teacher_id = $this->input->post('teacher_id');
		$subject_id = $this->input->post('subject_id');
		$grade_section = $this->input->post('grade_section');

		if(empty($record_id)){
			$where = "cr.subject='$subject_id' AND cr.teacher='$teacher_id' AND cr.grade_section='$grade_section'";
		}else{
			$where = "cr.id='$record_id'";
		}

	
		$query = $this->db->query("SELECT cr.id as record_id,cr.region,cr.division,cr.district,cr.school_name,cr.school_id,cr.school_year,cr.quarter,cr.grade_section,cr.teacher,cr.subject,us.fname,us.lname,ss.name as section_name,ss.year_level,sub.name as subject_name FROM class_record as cr LEFT JOIN users as us ON us.id=cr.teacher LEFT JOIN sections as ss ON ss.id=cr.grade_section LEFT JOIN subjects as sub ON sub.id=cr.subject WHERE $where GROUP BY cr.quarter");
		$this->MM->result_encode($query);

	}

	function record_first(){
		$teacher = $this->input->post('teacher');
		$section = $this->input->post('section');
		$subject = $this->input->post('subject');
		$quarter = $this->input->post('quarter');

		$query = $this->db->query("SELECT id,quarter,grade_section,teacher,subject FROM class_record WHERE quarter='$quarter' AND grade_section='$section' AND subject='$subject' AND teacher='$teacher'");
		$this->MM->result_encode($query);

	}

	function process_class_record(){
		$action = $this->input->post('action');
		$current_teacher = $this->input->post('current_teacher');
		$current_subject = $this->input->post('current_subject');
		$current_section = $this->input->post('current_section');
		$current_module = $this->input->post('current_module');
		$student_count = $this->input->post('student_count');


		$current_record = $this->input->post('current_record');
		$region = $this->input->post('region');
		$division = $this->input->post('division');
		$district = $this->input->post('district');
		$school_name = $this->input->post('school_name');
		$school_id = $this->input->post('school_id');
		$school_year = $this->input->post('school_year');
		$quarter = $this->input->post('quarter');
		$grade_section = $this->input->post('grade_section');
		$teacher = $this->input->post('teacher');
		$subject = $this->input->post('subject');

		$save_record = array(
			'region' => $region,
			'division' => $division,
			'district' => $district,
			'school_name' => $school_name,
			'school_id' => $school_id,
			'school_year' => $school_year,
			'quarter' => $quarter,
			'grade_section' => $grade_section,
			'teacher' => $teacher,
			'subject' => $subject
		);



		if(empty($current_record)){//do insert
			$class_record = $this->db->insert('class_record',$save_record);
			$record_id = $this->db->insert_id();

		}else{//do update
			$this->db->where('id',$current_record);
			$class_record = $this->db->update('class_record',$save_record);
			$record_id = $current_record;
		}

		// print_r($record_id); exit;

		$student_id = explode(",",$this->input->post('student_id'));

		$pt_1 = explode(",",$this->input->post('pt_1'));
		$pt_2 = explode(",",$this->input->post('pt_2'));
		$pt_3 = explode(",",$this->input->post('pt_3'));
		$pt_4 = explode(",",$this->input->post('pt_4'));
		$pt_5 = explode(",",$this->input->post('pt_5'));
		$pt_6 = explode(",",$this->input->post('pt_6'));
		$pt_7 = explode(",",$this->input->post('pt_7'));
		$pt_8 = explode(",",$this->input->post('pt_8'));
		$pt_9 = explode(",",$this->input->post('pt_9'));
		$pt_10 = explode(",",$this->input->post('pt_10'));
		$pt_total = explode(",",$this->input->post('pt_total'));
		$pt_ps = explode(",",$this->input->post('pt_ps'));
		$pt_ws = explode(",",$this->input->post('pt_ws'));


		$ww_1 = explode(",",$this->input->post('ww_1'));
		$ww_2 = explode(",",$this->input->post('ww_2'));
		$ww_3 = explode(",",$this->input->post('ww_3'));
		$ww_4 = explode(",",$this->input->post('ww_4'));
		$ww_5 = explode(",",$this->input->post('ww_5'));
		$ww_6 = explode(",",$this->input->post('ww_6'));
		$ww_7 = explode(",",$this->input->post('ww_7'));
		$ww_8 = explode(",",$this->input->post('ww_8'));
		$ww_9 = explode(",",$this->input->post('ww_9'));
		$ww_10 = explode(",",$this->input->post('ww_10'));
		$ww_total = explode(",",$this->input->post('ww_total'));
		$ww_ps = explode(",",$this->input->post('ww_ps'));
		$ww_ws = explode(",",$this->input->post('ww_ws'));

		$qa_1 = explode(",",$this->input->post('qa_1'));
		$qa_ps = explode(",",$this->input->post('qa_ps'));
		$qa_ws = explode(",",$this->input->post('qa_ws'));

		$hs_1 =  $this->input->post('hs_'.$current_module.'_1');
		$hs_2 =  $this->input->post('hs_'.$current_module.'_2');
		$hs_3 =  $this->input->post('hs_'.$current_module.'_3');
		$hs_4 =  $this->input->post('hs_'.$current_module.'_4');
		$hs_5 =  $this->input->post('hs_'.$current_module.'_5');
		$hs_6 =  $this->input->post('hs_'.$current_module.'_6');
		$hs_7 =  $this->input->post('hs_'.$current_module.'_7');
		$hs_8 =  $this->input->post('hs_'.$current_module.'_8');
		$hs_9 =  $this->input->post('hs_'.$current_module.'_9');
		$hs_10 = $this->input->post('hs_'.$current_module.'_10');
		$hs_total = $this->input->post('hs_'.$current_module.'_total');


			switch($current_module){
				case "ww":
					$target_qi = $ww_ws;
				break;
				
				case "pt":
					$target_qi = $pt_ws;
				break;

				case "qa":
					$target_qi = $qa_ws;
				break;
			}

			for($x=0; $x < $student_count; $x++){
					$save_qi = array(
						'record_id' => $record_id,
						'subject_id' => $current_subject,
						'section_id' => $current_section,
						'teacher_id' => $current_teacher,
						'student_id' => $student_id[$x],
						'quarter' => $quarter,
						'academic_year' => $school_year,
						''.$current_module.'' => $target_qi[$x]
					);


					$verify_qi = $this->check_score($current_subject,$current_section,$current_teacher,$student_id[$x],'qi',$record_id);

					if(!$verify_qi){//no record found insert
						$query_x = $this->db->insert('grade_quarterly_initials',$save_qi);
					}else{//record found update
						$this->db->where('subject_id',$current_subject);
						$this->db->where('section_id',$current_section);
						$this->db->where('teacher_id',$current_teacher);
						$this->db->where('student_id',$student_id[$x]);
						$this->db->where('record_id',$current_record);
						$query_x = $this->db->update('grade_quarterly_initials',$save_qi);
					}		

			}


			$save_hs = array(
				'module' => $current_module,
				'subject' => $current_subject,
				'section' => $current_section,
				'teacher' => $current_teacher,
				'hs_1' => $hs_1,
				'hs_2' => $hs_2,
				'hs_3' => $hs_3,
				'hs_4' => $hs_4,
				'hs_5' => $hs_5,
				'hs_6' => $hs_6,
				'hs_7' => $hs_7,
				'hs_8' => $hs_8,
				'hs_9' => $hs_9,
				'hs_10' => $hs_10,
				'hs_total' => $hs_total,
				'record_id' => $record_id
			);
			$verify_hs = $this->check_hs($current_module,$current_subject,$current_section,$current_teacher,$record_id);

			if(!$verify_hs){//record not found
				$qry = $this->db->insert('grade_highest_score',$save_hs);
			}else{//record found
				$this->db->where('module',$current_module);
				$this->db->where('subject',$current_subject);
				$this->db->where('section',$current_section);
				$this->db->where('teacher',$current_teacher);
				$this->db->where('record_id',$record_id);
				$qry = $this->db->update('grade_highest_score',$save_hs);
			}


			for($z=0; $z < $student_count; $z++){
				$query_z = $this->db->query("SELECT (ww+pt+qa) AS total_initial FROM grade_quarterly_initials WHERE subject_id='$current_subject' AND teacher_id='$current_teacher' AND section_id='$current_section' AND student_id='$student_id[$z]' AND record_id='$record_id'");

				$row_z = $query_z->row_array();
				$total_initial = $row_z['total_initial'];
				$quarter_grade  = $this->transmuted($total_initial);

				$save_z = array('initial_grade'=>$total_initial,'quarterly_grade'=>$quarter_grade);

				$this->db->where('subject_id',$current_subject);
				$this->db->where('section_id',$current_section);
				$this->db->where('teacher_id',$current_teacher);
				$this->db->where('student_id',$student_id[$z]);
				$this->db->where('record_id',$record_id);
				$qry_z = $this->db->update('grade_quarterly_initials',$save_z);

			}

		switch($action){
			case "save":
				switch($current_module){
						
					case "qa":
				
						for($i=0; $i < $student_count; $i++){
									$save_score = array(
											'subject_id' => $current_subject,
											'section_id' => $current_section,
											'teacher_id' => $current_teacher,
											'student_id' => $student_id[$i],
											'qs_1' => $qa_1[$i],
											'qs_ps' => $qa_ps[$i],
											'qs_ws' => $qa_ws[$i],
											'record_id' => $record_id
										);


							$verify = $this->check_score($current_subject,$current_section,$current_teacher,$student_id[$i],$current_module,$record_id);

							if(!$verify){//no record found insert
									$query = $this->db->insert('grade_quarterly_assestments',$save_score);
							
							}else{//record found update
								$this->db->where('subject_id',$current_subject);
								$this->db->where('section_id',$current_section);
								$this->db->where('teacher_id',$current_teacher);
								$this->db->where('record_id',$current_record);
								$this->db->where('student_id',$student_id[$i]);
								$query = $this->db->update('grade_quarterly_assestments',$save_score);
							}			

						}//end of loop
								
					break;

					case "pt":
						for($i=0; $i < $student_count; $i++){
								$save_score = array(
									'subject_id' => $current_subject,
									'section_id' => $current_section,
									'teacher_id' => $current_teacher,
									'student_id' => $student_id[$i],
									'ps_1' => $pt_1[$i],
									'ps_2' => $pt_2[$i],
									'ps_3' => $pt_3[$i],
									'ps_4' => $pt_4[$i],
									'ps_5' => $pt_5[$i],
									'ps_6' => $pt_6[$i],
									'ps_7' => $pt_7[$i],
									'ps_8' => $pt_8[$i],
									'ps_9' => $pt_9[$i],
									'ps_10'	 => $pt_10[$i],
									'ps_total' => $pt_total[$i],
									'ps_ps' => $pt_ps[$i],
									'ps_ws' => $pt_ws[$i],
									'record_id' => $record_id	
								);

								$verify = $this->check_score($current_subject,$current_section,$current_teacher,$student_id[$i],$current_module,$record_id);

								if(!$verify){//no record found insert
									$query = $this->db->insert('grade_performance_tasks',$save_score);
								}else{//record found update
									$this->db->where('subject_id',$current_subject);
									$this->db->where('section_id',$current_section);
									$this->db->where('teacher_id',$current_teacher);
									$this->db->where('student_id',$student_id[$i]);
									$this->db->where('record_id',$current_record);
									$query = $this->db->update('grade_performance_tasks',$save_score);
								}
			
						}//end of for loop

					break;

					case "ww":
						for($i=0; $i < $student_count; $i++){

								$save_score = array(
									'subject_id' => $current_subject,
									'section_id' => $current_section,
									'teacher_id' => $current_teacher,
									'student_id' => $student_id[$i],
									'ww_1' => $ww_1[$i],
									'ww_2' => $ww_2[$i],
									'ww_3' => $ww_3[$i],
									'ww_4' => $ww_4[$i],
									'ww_5' => $ww_5[$i],
									'ww_6' => $ww_6[$i],
									'ww_7' => $ww_7[$i],
									'ww_8' => $ww_8[$i],
									'ww_9' => $ww_9[$i],
									'ww_10'	 => $ww_10[$i],
									'ww_total' => $ww_total[$i],
									'ww_ps' => $ww_ps[$i],
									'ww_ws' => $ww_ws[$i],	
									'record_id' => $record_id
								);

								$verify = $this->check_score($current_subject,$current_section,$current_teacher,$student_id[$i],$current_module,$record_id);

								if(!$verify){//no record found insert
									$query = $this->db->insert('grade_written_works',$save_score);
								}else{//record found update
									$this->db->where('subject_id',$current_subject);
									$this->db->where('section_id',$current_section);
									$this->db->where('teacher_id',$current_teacher);
									$this->db->where('student_id',$student_id[$i]);
									$this->db->where('record_id',$current_record);

									$query = $this->db->update('grade_written_works',$save_score);

								}

			
						}//end of for loop
						exit;			

					break;



				}//end of save switch

			break;
		}//end of outer switch

		if($query){
			return TRUE;
		}else{
			return FALSE;
		}


	}


	function check_hs($module,$subject,$section,$teacher,$record_id){
		$query = $this->db->query("SELECT module,subject,section,teacher FROM grade_highest_score WHERE module='$module' AND subject='$subject' AND section='$section' AND teacher='$teacher' AND record_id='$record_id'");
		$num = $query->num_rows();

		if($num > 0){
			return TRUE;
		}else{
			return FALSE;
		}

	}


	function check_score($subject_id,$section_id,$teacher_id,$student_id,$module,$record_id){
		switch($module){
			case "ww":
				$tbl = "grade_written_works";
			break;
			
			case "pt":
				$tbl = "grade_performance_tasks";
			break;
			
			case "qi":
				$tbl = "grade_quarterly_initials";
			break;

			case "qa":
				$tbl = "grade_quarterly_assestments";
			break;
		}


		$query = $this->db->query("SELECT subject_id,section_id,teacher_id,student_id FROM ".$tbl." WHERE subject_id='$subject_id' AND section_id='$section_id' AND teacher_id ='$teacher_id' AND student_id='$student_id' AND record_id='$record_id'");
		$num = $query->num_rows();
		if($num > 0){
			return TRUE;
		}else{
			return FALSE;
		}

	}


	function data_list(){
		$module =  $this->input->post('module');
		$teacher = $this->input->post('teacher');
		$subject = $this->input->post('subject');
		$section = $this->input->post('section');
		$record_id = $this->input->post('record_id');
			
			switch($module){
			case "qa":
				$tbl = "grade_quarterly_assestments";
				$tbl_status = "qs_status";
			break;

			case "qi":
				$tbl = "grade_quarterly_initials";
				$tbl_status = "qi_status";

			break;

			case "pt":
				$tbl = "grade_performance_tasks";
				$tbl_status = "ps_status";

			break;

			case "ww":
				$tbl = "grade_written_works";
				$tbl_status = "ww_status";

			break;
								
			}

			$query = $this->db->query("SELECT * FROM ".$tbl." WHERE subject_id='$subject' AND section_id='$section' AND teacher_id='$teacher' AND record_id='$record_id' AND ".$tbl_status."='0'");

			$this->MM->result_encode($query);

	}




	function transmuted($initial){

		if($initial >= 0 && $initial<=3.99){
			$transmuted = 60;
		}else if($initial >=4 && $initial <= 7.99){
			$transmuted = 61;
		}else if($initial >= 8 && $initial <= 11.99){
			$transmuted =  62;
		}else if($initial >= 12 && $initial <= 15.99 ){
			$transmuted =  63;
		}else if($initial >= 16 && $initial <= 19.99 ){
			$transmuted =  64;
		}else if($initial >= 20 && $initial <= 23.99){
			$transmuted =  65;
		}else if($initial >= 24 && $initial <= 27.99 ){
			$transmuted =  66;
		}else if($initial >= 28 && $initial <= 31.99 ){
			$transmuted =  67;
		}else if($initial >= 32 && $initial <= 35.99 ){
			$transmuted =  68;
		}else if($initial >= 36 && $initial <= 39.99 ){
			$transmuted =  69;
		}else if($initial >= 40 && $initial <= 43.99 ){
			$transmuted = 70;
		}else if($initial >= 44 && $initial <= 47.99 ){
			$transmuted =  71;
		}else if($initial >= 48 && $initial <= 51.99 ){
			$transmuted =  72;
		}else if($initial >= 52 && $initial <= 55.99 ){
			$transmuted =  73;
		}else if($initial >= 56 && $initial <= 59.99 ){
			$transmuted =  74;
		}else if($initial >= 60 && $initial <= 61.59 ){
			$transmuted = 75;
		}else if($initial >= 61.60 && $initial <= 63.19 ){
			$transmuted =  76;
		}else if($initial >= 63.20  && $initial <= 64.79 ){
			$transmuted =  77;
		}else if($initial >= 64.80 && $initial <= 66.39 ){
			$transmuted =  78;
		}else if($initial >= 66.40  && $initial <= 67.99 ){
			$transmuted =  79;
		}else if($initial >= 68 && $initial <= 69.59 ){
			$transmuted =  80;
		}else if($initial >= 69.60 && $initial <= 71.19 ){
			$transmuted =  81;
		}else if($initial >= 71.20 && $initial <= 72.79 ){
			$transmuted = 82;
		}else if($initial >= 72.80 && $initial <= 74.39 ){
			$transmuted =  83;
		}else if($initial >= 74.40 && $initial <= 75.99){
			$transmuted =  84;
		}else if($initial >= 76.00 && $initial <= 77.59){
			$transmuted =  85;
		}else if($initial >= 77.60 && $initial <= 79.19){
			$transmuted =  86;
		}else if($initial >= 79.20 && $initial <= 80.79){
			$transmuted =  87;
		}else if($initial >= 80.80 && $initial <= 82.39){
			$transmuted = 88;
		}else if($initial >= 82.40 && $initial <= 83.99){
			$transmuted =  89;
		}else if($initial >= 84 && $initial <= 85.59){
			$transmuted =  90;
		}else if($initial >= 85.60 && $initial <= 87.19){
			$transmuted = 91;
		}else if($initial >= 87.20 && $initial <= 88.79){
			$transmuted =  92;
		}else if($initial >= 88.80  && $initial <= 90.39){
			$transmuted =  93;
		}else if($initial >= 90.40 && $initial <= 91.99){
			$transmuted =  94;
		}else if($initial >= 92 && $initial <= 93.59 ){
			$transmuted =  95;
		}else if($initial >= 93.60 && $initial <= 95.19){
			$transmuted =  96;
		}else if($initial >= 95.20 && $initial <= 96.79){
			$transmuted = 97;
		}else if($initial >= 96.80 && $initial <= 98.39){
			$transmuted =  98;
		}else if($initial >= 98.40 && $initial <= 99.99){
			$transmuted =  99;
		}else if($initial >= 100){
			$transmuted =  100;
		}


		return $transmuted;
	}

}//end of class