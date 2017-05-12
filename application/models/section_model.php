<?php

Class Section_model extends CI_Model{


	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}

	function section_list(){
		$id = $this->input->post('id');
		$adviser_id = $this->input->post('adviser_id');
		if(!empty($id)){
			$where = "ss.id='$id' AND ";
		}
		elseif(!empty($adviser_id)){
			$where = "ss.adviser_id='$adviser_id' AND ";
		}
		else{
			$where = "";
		}

		$query = $this->db->query("SELECT ss.id,ss.name,ss.year_level,ss.adviser_id,ss.bldg_details,ss.room,ss.status,ss.adviser_name, CASE WHEN ss.section_info ='0' THEN 'Advisory' WHEN ss.section_info='1' THEN 'Section Handled' end section_info, yl.id as level_id,yl.level,us.id as user_id,us.fname,us.lname FROM sections as ss LEFT JOIN year_levels as yl ON yl.id=ss.year_level LEFT JOIN users as us ON us.id=ss.adviser_id WHERE $where ss.status='0' ORDER BY ss.name");
		$this->MM->result_encode($query);
	}	

	function section_details(){
		$id = $this->input->post('id');
		$adviser_id = $this->input->post('adviser_id');
		if(!empty($id)){
			$where = "ss.id='$id' AND ";
		}
		elseif(!empty($adviser_id)){
			$where = "ss.adviser_id='$adviser_id' AND ";
		}
		else{
			$where = "";
		}

		$query = $this->db->query("SELECT ss.id,ss.name,ss.year_level,ss.adviser_id,ss.bldg_details,ss.room,ss.status,ss.adviser_name, CASE WHEN ss.section_info ='0' THEN 'Advisory' WHEN ss.section_info='1' THEN 'Section Handled' end section_info, yl.id as level_id,yl.level,us.id as user_id,us.fname,us.lname FROM sections as ss LEFT JOIN year_levels as yl ON yl.id=ss.year_level LEFT JOIN users as us ON us.id=ss.adviser_id WHERE $where ss.status='0' ORDER BY ss.name");
		$this->MM->result_encode($query);
	}

	function level_list(){
		$query = $this->db->query("SELECT * FROM year_levels");

		$this->MM->result_encode($query);
	}



	function process_section(){
		$action = $this->input->post('action');
		$section_id = $this->input->post('section_id');
		$section_name = $this->input->post('section_name');
		$adviser_list = $this->input->post('adviser_list');
		$level_list = $this->input->post('level_list');
		$bldg_details = $this->input->post('bldg_details');
		$room = $this->input->post('room');
		$section_info = $this->input->post('section_info');

		switch($action){
			case "save":
				$save_array = array(
					'name' => $section_name,
					'year_level' => $level_list,
					'adviser_id' => $adviser_list,
					'bldg_details' => $bldg_details,
					'room' => $room,
					'section_info' => $section_info
					);

				if(empty($section_id)){
					$query = $this->db->insert('sections',$save_array);
				}else{
					$this->db->where('id',$section_id);
					$query = $this->db->update('sections',$save_array);
				}
			break;

			case "remove":

				$this->db->where('id',$section_id);
				$query = $this->db->update('sections',array('status'=>'1'));

			break;
		}//end of switch

		if($query){
			return TRUE;
		}else{
			return FALSE;
		}

	}









}//end of class