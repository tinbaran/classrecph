<?php 

Class Advisory_model extends CI_Model{

	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}




	function advisory_list(){

		$sess_type = $this->session->userdata('sess_type');
		$sess_id = $this->session->userdata('sess_id');

		$section = $this->my_section($sess_id);

		$query = $this->db->query("SELECT id,section_id,lname,mname,fname,age,CASE WHEN gender ='0' THEN 'Male' WHEN gender='1' THEN 'Female' end sex,address,father_name,mother_name,status,parent_contact FROM students WHERE section_id='$section' AND status='0'");

		$this->MM->result_encode($query);

	}



	function my_section($adviser){

		$query = $this->db->query("SELECT adviser_id,id FROM sections WHERE adviser_id='$adviser'");

		foreach($query->result_array() as $row){
			return $row['id'];
		}

	}






}//end of class