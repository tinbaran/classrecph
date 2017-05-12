<?php 


Class Student_model extends CI_Model{


	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}


	function process_student(){

		$action = $this->input->post('action');
		$section_id = $this->input->post('section_id');
		$student_id = $this->input->post('student_id');
		$first_name = $this->input->post('first_name');
		$middle_name = $this->input->post('middle_name');
		$last_name = $this->input->post('last_name');
		$age = $this->input->post('age');
		$gender = $this->input->post('gender');
		$address = $this->input->post('address');
		$mother_name = $this->input->post('mother_name');
		$father_name = $this->input->post('father_name');
		$parent_contact = $this->input->post('parent_contact');

		switch($action){

			case "save":

				$save_array = array(
					'section_id' => $section_id,
					'fname' => $first_name,
					'mname' => $middle_name,
					'lname' => $last_name,
					'age' => $age,
					'gender' => $gender,
					'address' => $address,
					'mother_name' => $mother_name,
					'father_name' => $father_name,
					'parent_contact' => $parent_contact
					);


				if(empty($student_id)){//do insert
					$query = $this->db->insert('students',$save_array);
				}else{//do update
						$this->db->where('id',$student_id);
					$query = $this->db->update('students',$save_array);
				}

			break;

			case "remove":
				$this->db->where('id',$student_id);
				$query = $this->db->update('students',array('status'=>'1'));
			break;

		}//end of switch

		if($query){
			return TRUE;
		}else{
			return FALSE;
		}

	}//end of function


	function student_list(){
		$section = $this->input->post('section');
		$adviser_id = $this->input->post('adviser_id');

		if(!empty($section)){
			$where = " AND ss.section_id='$section'";
		}elseif(!empty($adviser_id)){
			$where = " AND sec.adviser_id='$adviser_id'";
		}else{
			$where = "";
		}


		$query = $this->db->query("SELECT ss.id as student_id,ss.section_id,ss.lname,ss.mname,ss.fname,ss.age,CASE WHEN ss.gender ='0' THEN 'Male' WHEN ss.gender='1' THEN 'Female' end sex,ss.address,ss.father_name,ss.mother_name,ss.status,ss.parent_contact,sec.id,sec.name,sec.adviser_id FROM students as ss LEFT JOIN sections as sec ON sec.id=ss.section_id WHERE ss.status='0' $where ORDER BY ss.gender, ss.lname");
		$this->MM->result_encode($query);

	}









}//end of class//