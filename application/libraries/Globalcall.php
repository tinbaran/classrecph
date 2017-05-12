<?php 

defined('BASEPATH') OR exit('No direct script access allowed');


class Globalcall{

	function __construct(){

		$this->CI =& get_instance();
		$this->CI->load->helper('url');
		$this->CI->load->library('session');
		$this->CI->config->item('base_url');
		$this->CI->load->library('encrypt');
		
	}
	
	function result_encode($data){
		$xxx = $this->CI->encrypt->encode($data);
		return $xxx;
	}

	function result_decode($data){
		$xxx = $this->CI->encrypt->decode($data);
		return $xxx;
	}
		
	function result_callback($res){
		if($res){
			echo"success";
		}else{
			echo"error";
		}
	}	

	function upper_lp($data){
		$this->CI->load->view('landing_page/lp_header',$data);
		$this->script_calls($data);
		$this->CI->load->view('landing_page/lp_navbar',$data);

	}	

	function upper_admin($data){
		$this->CI->load->view('defaults/header',$data);
		$this->script_calls($data);
		$this->CI->load->view('admin/admin_navbar',$data);
		$this->CI->load->view('defaults/sliders',$data);

	}

	function upper_call($data){
		$this->CI->load->view('defaults/header',$data);
		$this->script_calls($data);
		$this->CI->load->view('defaults/navbar',$data);
		$this->CI->load->view('defaults/sliders',$data);
	}	

	function lower_call($data){
		$this->CI->load->view('defaults/footer',$data);
	}


	function script_calls($data){
		$this->CI->load->view('defaults/scripts',$data);
		$this->CI->load->view('defaults/styles',$data);
	}


	function priviledge($module){
		$pieces = explode("|", $this->priviledge_list($module));
		
		$create_get = $pieces[0];
		$retrive_get = $pieces[1];
		$update_get = $pieces[2];
		$delete_get = $pieces[3];

		if($create_get == "0"){
			$create = TRUE;
		}else{
			$create = FALSE;
		}
		if($retrive_get == "0"){
			$retrive = TRUE;
		}else{
			$retrive = FALSE;
		}
		if($update_get == "0"){
			$update = TRUE;
		}else{
			$update = FALSE;
		}
		if($delete_get == "0"){
			$delete = TRUE;
		}else{
			$delete = FALSE;
		}

		$priviledge = "".$create."|".$retrive."|".$update."|".$delete."";

		return $priviledge;
	}
	
	function priviledge_list($module){
		// 0 - WITH RIGHTS | 1 - WITHOUT RIGHTS
		
		$access = $this->CI->session->userdata('sess_type');

		switch($module){

			case "accounts":

				switch($access){
					case "0":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "class_records":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "works":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "sections":

				switch($access){
					case "0":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				
					case "1":
						$create = "1";
						$retrive = "0";
						$update = "1";
						$delete = "1";
					break;
				}	

			break;

			case "students":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "reports":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "subjects":

				switch($access){
					case "0":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "summary_quarterly":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "summary_final":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;


			case "advisory":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "teachers":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;

			case "sections_list":

				switch($access){
					case "0":
						$create = "1";
						$retrive = "1";
						$update = "1";
						$delete = "1";
					break;
				
					case "1":
						$create = "0";
						$retrive = "0";
						$update = "0";
						$delete = "0";
					break;
				}	

			break;
		}//end of module switch


		$priviledge = "".$create."|".$retrive."|".$update."|".$delete."|";

		return $priviledge;
	}//end of function















}//end of class