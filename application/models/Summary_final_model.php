<?php 
Class Summary_final_model extends CI_Model{

	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model','MM');
	}


	function final_grade_list(){

		$teacher = $this->input->post('teacher');
		$subject = $this->input->post('subject');
		$section = $this->input->post('section');
		$academic_year = $this->input->post('academic_year');

		$query = $this->db->query("SELECT (ww+pt+qa) AS total_initial,quarter,student_id,quarterly_grade FROM grade_quarterly_initials WHERE subject_id='$subject' AND teacher_id='$teacher' AND section_id='$section' AND academic_year='$academic_year'");
		
		$this->MM->result_encode($query);
	}

	function quarter_list(){
		$teacher = $this->input->post('teacher');
		$subject = $this->input->post('subject');
		$section = $this->input->post('section');

		$query = $this->db->query("SELECT id,school_year,quarter,grade_section,teacher,subject FROM class_record WHERE grade_section='$section' AND teacher='$teacher' AND subject='$subject'");
		$this->MM->result_encode($query);
	}


	function grade_year_lvl(){

		$id = $this->input->post('grade_id');

		if(empty($id)){
			$where = "";
		}else{
			$where = "WHERE id='$id'";
		}

		$query = $this->db->query("SELECT * FROM year_levels ".$where."");
		$this->MM->result_encode($query);
	}



	function process_ranking(){
		$student_count = $this->input->post('student_count');
		$current_teacher = $this->input->post('current_teacher');
		$current_subject = $this->input->post('current_subject');
		$current_section = $this->input->post('current_section');
		$current_year = $this->input->post('current_year');
		$final_score = explode(",",$this->input->post('final_score'));
		$student_id = explode(",",$this->input->post('student_id'));

		for($x=0; $x < $student_count; $x++){
					$save_qi = array(
						'subject_id' => $current_subject,
						'section_id' => $current_section,
						'teacher_id' => $current_teacher,
						'academic_year' => $current_year,
						'student_id' => $student_id[$x],
						'final_grade' => $final_score[$x]
					);

					$verify_qi = $this->check_score($current_subject,$current_section,$current_teacher,$student_id[$x]);

					if(!$verify_qi){//no record found insert
						$query = $this->db->insert('grade_final_score',$save_qi);
					}else{//record found update
						$this->db->where('subject_id',$current_subject);
						$this->db->where('section_id',$current_section);
						$this->db->where('teacher_id',$current_teacher);
						$this->db->where('student_id',$student_id[$x]);
						$query = $this->db->update('grade_final_score',$save_qi);
					}		
		}

		if($query){
			return TRUE;
		}else{
			return FALSE;
		}
	}


	function check_score($subject,$section,$teacher,$student){

		$query = $this->db->query("SELECT * FROM grade_final_score WHERE subject_id='$subject' AND section_id='$section' AND teacher_id='$teacher' AND student_id='$student'");
		$num = $query->num_rows();
		if($num > 0){
			return TRUE;
		}else{
			return FALSE;
		}

	}


	function list_ranking(){
		$current_teacher = $this->input->post('current_teacher');
		$current_subject = $this->input->post('current_subject');
		$current_section = $this->input->post('current_section');

		$query = $this->db->query("SELECT gfs.subject_id,gfs.section_id,gfs.teacher_id,gfs.student_id,gfs.final_grade,ss.fname,ss.lname FROM grade_final_score AS gfs LEFT JOIN students AS ss ON ss.id=gfs.student_id WHERE gfs.subject_id='$current_subject' AND gfs.section_id='$current_section' AND gfs.teacher_id='$current_teacher' ORDER BY gfs.final_grade DESC");
		$this->MM->result_encode($query);
	}


	function year_finds(){
		$teacher = $this->input->post('teacher');
		$subject = $this->input->post('subject');
		$section = $this->input->post('section');

		$query = $this->db->query("SELECT subject_id,section_id,teacher_id,academic_year FROM grade_quarterly_initials WHERE subject_id='$subject' AND section_id='$section' AND teacher_id='$teacher' GROUP BY academic_year ORDER BY academic_year");

		$this->MM->result_encode($query);

	}


}