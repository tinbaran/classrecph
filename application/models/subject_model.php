<?php 

Class Subject_model extends CI_Model{


	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model',"MM");
	}

	function my_subjects(){

		$sess_id = $this->session->userdata('sess_id');

		$query = $this->db->query("SELECT ad.id,ad.user_id,ad.subject,sub.id,sub.name FROM advisories as ad LEFT JOIN subjects as sub ON sub.id=ad.subject WHERE ad.user_id='$sess_id' AND ad.status='0' GROUP BY subject ORDER BY sub.name");

		$this->MM->result_encode($query);

	}


	function my_sections(){
		$subject_id = $this->input->post('subject_id');
		$sess_id = $this->session->userdata('sess_id');

		$query = $this->db->query("SELECT ad.status,ad.section,ad.id,ad.user_id,sec.id, sec.name as section_name FROM advisories as ad LEFT JOIN sections as sec ON sec.id=ad.section WHERE ad.user_id='$sess_id' AND ad.subject='$subject_id' AND ad.status='0'");
		$this->MM->result_encode($query);
	}

	function section_grade_final(){
		$subject_id = $this->input->post('subject_id');
		$sess_id = $this->session->userdata('sess_id');

		$query = $this->db->query("SELECT ad.status,ad.section,ad.id,ad.user_id,sec.id, sec.name as section_name FROM advisories as ad LEFT JOIN sections as sec ON sec.id=ad.section WHERE ad.user_id='$sess_id' AND ad.subject='$subject_id' AND ad.status='0' AND section_info='0'");
		$this->MM->result_encode($query);
	}

	function subject_list(){

		$id = $this->input->post('id');
		if(empty($id)){
			$where = "";
		}else{
			$where = "id='$id' AND ";
		}

		$query = $this->db->query("SELECT * FROM subjects WHERE ".$where." status='0' ORDER BY name");
		$this->MM->result_encode($query);
	}

	function summary_subjects(){

		$id = $this->input->post('id');
		if(empty($id)){
			$where = "";
		}else{
			$where = "id='$id' AND ";
		}

		$query = $this->db->query("SELECT * FROM subjects WHERE ".$where." status='0' ORDER BY name");
		$this->MM->result_encode($query);
	}


	function process_subject(){
		$sess_id = $this->session->userdata('sess_id');
		$action = $this->input->post('action');
		$id = $this->input->post('id');
		$name = $this->input->post('name');
		$section = $this->input->post('section');
		$subject = $this->input->post('subject');
		
		$wc_ww = $this->input->post('wc_ww') / 100;
		$wc_pt = $this->input->post('wc_pt') / 100;
		$wc_qa = $this->input->post('wc_qa') / 100;

		switch($action){

			case "remove_my_subject":

				$this->db->where('subject',$subject);
				$this->db->where('user_id',$sess_id);
				$query = $this->db->update('advisories',array('status'=>'1'));

			break;

			case "archive":

				$this->db->where('subject',$subject);
				$this->db->where('user_id',$sess_id);
				$query = $this->db->update('advisories',array('status'=>'1'));

			break;


			case "check_section":
			$a = $this->find_data('sections',$user_id);

				if(strpos($a, $section_id) !== false) {//subject exist
				   return FALSE;
				}else{//subject does not exist;
				    return TRUE;
				}

			break;

			case "remove_section_to_my_subject":

				$this->db->where('section',$section);
				$this->db->where('subject',$subject);
				$this->db->where('user_id',$sess_id);
				$query = $this->db->update('advisories',array('status'=>'1'));

			break;


			case "save_my_subject":

				$save_array = array(
					'user_id' => $this->session->userdata('sess_id'),
					'section' => $subject,
					'subject' => $section
					);
				if(empty($id)){
					$query = $this->db->insert('advisories',$save_array);

				}else{
					$this->db->where('id',$id);
					$query = $this->db->update("advisories",$save_array);
				}

			break;


			case "save":

				$save_array = array(
					'wc_ww' => $wc_ww,
					'wc_pt' => $wc_pt,
					'wc_qa' => $wc_qa,
					'name' => $name
					);

				if(empty($id)){//do insert

					$query = $this->db->insert('subjects',$save_array);

				}else{//do update
					$this->db->where('id',$id);
					$query = $this->db->update('subjects',$save_array);
				}

			break;

			case "remove":
				$this->db->where('id',$id);
				$query = $this->db->update('subjects',array('status'=>'1'));
			break;

		}//end of switch


		if($query){
			return TRUE;
		}else{
			return FALSE;
		}


	}
















}//end of class