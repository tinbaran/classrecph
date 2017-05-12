<?php 
Class Printing_model extends CI_Model{

	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}

	function grade_quarterly(){

		$record_id  = $this->input->post('record_id');
		$subject_id = $this->input->post('subject');
		$section_id = $this->input->post('section');
		$teacher_id = $this->input->post('teacher');
		
		$query = $this->db->query("SELECT * FROM grade_quarterly_initials WHERE record_id='$record_id' AND subject_id='$subject_id' AND section_id='$section_id' AND teacher_id='$teacher_id'");
		$this->MM->result_encode($query);
	}

	function score_highest(){
		$module = $this->input->post('module');
		$teacher = $this->input->post('teacher');
		$subject = $this->input->post('subject');
		$section = $this->input->post('section');
		$record_id = $this->input->post('record_id');

		$query = $this->db->query("SELECT * FROM grade_highest_score WHERE module='$module' AND teacher='$teacher' AND subject='$subject' AND section='$section' AND record_id='$record_id'");

		$this->MM->result_encode($query);
	}

	function list_score(){
		$record_id  = $this->input->post('record_id');
		$subject_id = $this->input->post('subject');
		$section_id = $this->input->post('section');
		$teacher_id = $this->input->post('teacher');
		$module = $this->input->post('module');

		switch($module){
			case "ww":
				$tbl = "grade_written_works";
			break;
			case "pt":
				$tbl = "grade_performance_tasks";
			break;
			case "qa":
				$tbl = "grade_quarterly_assestments";
			break;
		}
		$query = $this->db->query("SELECT * FROM $tbl WHERE record_id='$record_id' AND subject_id='$subject_id' AND section_id='$section_id' AND teacher_id='$teacher_id'");
		$this->MM->result_encode($query);

	}

	function grade_list(){

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


	function subject_list(){
		$sess_id = $this->session->userdata('sess_id');
		$query = $this->db->query("SELECT ads.user_id,ads.id as advisory_id,ads.subject,ads.status,ss.id as subject_id,ss.id as id_subject,ss.name as subjectname FROM advisories as ads LEFT JOIN subjects as ss ON ads.subject=ss.id WHERE user_id = '$sess_id' AND ads.status='0' GROUP BY ads.subject");

		$this->MM->result_encode($query);

	}


}