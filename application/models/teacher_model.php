<?php

Class Teacher_model extends CI_Model{


	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}
	
	function teacher_list(){
		
		$action = $this->input->post('action');
		$sess_id = $this->session->userdata('sess_id');	

		if($action == "specific_teacher"){
				$where = "id='$sess_id' AND";
		}else{
				$where = "";
		}


		$query = $this->db->query("SELECT id,fname,lname FROM users WHERE $where user_type='1'");
		$this->MM->result_encode($query);
	}

	function subjects(){
		$user_id = $this->input->post('user_id');
		$query = $this->db->query("SELECT * FROM teachers WHERE user_id='$user_id'");
		$this->MM->result_encode($query);

	}

	function sections(){
		$user_id = $this->input->post('user_id');
		$query = $this->db->query("SELECT sections,user_id,id FROM teachers WHERE user_id='$user_id'");
		$this->MM->result_encode($query);

	}


	function process_teacher(){

		$action = $this->input->post('action');
		$user_id = $this->input->post('user_id');
		$subject_id = $this->input->post('subject_id');
		$section_id = $this->input->post('section_id');

		switch($action){
			
			//=================================== SECTION ===================================	
			case "check_section":
			$a = $this->find_data('sections',$user_id);

				if(strpos($a, $section_id) !== false) {//subject exist
				   return FALSE;
				}else{//subject does not exist;
				    return TRUE;
				}

			break;

			case "save_section":
			$new_sections = $this->find_data('sections',$user_id)."|".$section_id."";
	 		
	 		$save_array = array(
			 	'sections' => $new_sections
			 );

			 $this->db->where('user_id',$user_id);
			 $query = $this->db->update('teachers',$save_array);

			break;

			case "remove_section":
				
			$pieces = explode("_", $user_id);
			$section_id =  $pieces[0];
			$user_id = $pieces[1];

			 $new_sections = str_replace("|".$section_id."","","".$this->find_data('sections',$user_id)."");
			  $save_array = array(
			 	'sections' => $new_sections
			 	);

			 $this->db->where('user_id',$user_id);
			 $query = $this->db->update('teachers',$save_array);

			break;
			
			//=================================== SUBJECT ===================================
			case "check_subject":
			$a = $this->find_data('subjects',$user_id);

				if(strpos($a, $subject_id) !== false) {//subject exist
				   return FALSE;
				}else{//subject does not exist;
				    return TRUE;
				}

			break;

			case "save_subject":
			$new_subjects = $this->find_data('subjects',$user_id)."|".$subject_id."";
	 		
	 		$save_array = array(
			 	'subjects' => $new_subjects
			 );

			 $this->db->where('user_id',$user_id);
			 $query = $this->db->update('teachers',$save_array);

			break;

			case "remove_subject":
				
			$pieces = explode("_", $user_id);
			$subject_id =  $pieces[0];
			$user_id = $pieces[1];

			 $new_subjects = str_replace("|".$subject_id."","","".$this->find_data('subjects',$user_id)."");
			  $save_array = array(
			 	'subjects' => $new_subjects
			 	);

			 $this->db->where('user_id',$user_id);
			 $query = $this->db->update('teachers',$save_array);

			break;
		}//end of switch


		if($query){
			return TRUE;
		}else{
			return FALSE;
		}

	}


	function find_data($action,$user_id){

		$query = $this->db->query("SELECT * FROM teachers WHERE user_id='$user_id'");

		foreach($query->result_array() as $row){
		
			switch($action){
				
				case "subjects":
					return $row['subjects'];
				break;
				
				case "sections":
					return $row['sections'];
				break;

				case "user":
					return $row['user_id'];
				break;
			}
			
		}	
	}




}//end of class