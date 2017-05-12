<?php 

Class Sections_list_model extends CI_Model{

	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}


	function handled_list(){
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

		$query = $this->db->query("SELECT ss.id,ss.name,ss.year_level,ss.adviser_id,ss.bldg_details,ss.room,ss.status,ss.adviser_name, CASE WHEN ss.section_info ='0' THEN 'Advisory' WHEN ss.section_info='1' THEN 'Sections Handled' end section_info, yl.id as level_id,yl.level,us.id as user_id,us.fname,us.lname FROM sections as ss LEFT JOIN year_levels as yl ON yl.id=ss.year_level LEFT JOIN users as us ON us.id=ss.adviser_id WHERE $where ss.status='0' ORDER BY ss.name");
		$this->MM->result_encode($query);
	}




	function my_section($adviser){

		$query = $this->db->query("SELECT section_info FROM sections WHERE section_info='1'");

		foreach($query->result_array() as $row){
			return $row['id'];
		}

	}






}//end of class