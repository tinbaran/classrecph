<?php

Class Manage extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Manage_model','MM');
	}



	function index(){
		$sess_type = $this->session->userdata('sess_type');
		$sess_id = $this->session->userdata('sess_id');
		if(empty($sess_id)){

			$data['page_title'] = "Home";
			$data['set_scripts'] = array('system/js/pre.js');

			$this->globalcall->upper_lp($data);

			$this->load->view('management/index',$data);
		}else{

			$data['page_title'] = "Dashboard";
			$data['set_scripts'] = array('system/js/post.js','system/js/post_process.js');

			$whos_in = $this->MM->whos_in($sess_id);
			$data['lname'] = $whos_in['lname'];
			$data['fname'] = $whos_in['fname'];

			if($sess_type=="1"){
				$this->globalcall->upper_call($data);

			}
			else{
				$this->globalcall->upper_admin($data);
			}
			

			$this->load->view('management/dashboard',$data);				
		}

		$this->globalcall->lower_call($data);

	}

	function dashboard(){
		$sess_id = $this->session->userdata('sess_id');
		$sess_type = $this->session->userdata('sess_type');
		// if(empty($sess_id)){
		// 	$this->load->view('management/index');
		// }else{
			$whos_in = $this->MM->whos_in($sess_id);
			$lname = $whos_in['lname'];
			$fname = $whos_in['fname'];
			
		// 	$this->load->view('management/dashboard',$data);				
		// }

			if($this->session->userdata('sess_id'))
		{

			if($sess_type=="1"){

					
						echo'<h3>Welcome '.$lname.', '.$fname.'</h3>
					<p>To learn more about ClassRecPH on how to use it. Below is the user guide.</p>';
					$this->load->view('management/user_dashboard');
					//Click the button for demo. <button class="btn btn-primary">DEMO</button> 
			}

			if($sess_type=="0"){
					
						echo'<h3>Welcome '.$lname.', '.$fname.'</h3>';
			}
		}
		
	}

	function login(){
		$res = $this->MM->login_validate();
		if($res){
			echo"success";
		}else{
			echo"error";
		}

	}


	function logout(){
		$this->session->sess_destroy();
		redirect(base_url());
	}

	
	function question_list(){
		$this->MM->list_question();
	}

	function quarterly_print(){

		$data['record_id'] = $this->input->post('record_id');
		$data['subject'] = $this->input->post('subject');
		$data['section'] = $this->input->post('section');
		$data['academic_year'] = $this->input->post('academic_year');
		$this->load->view('management/quarterly_print',$data);
		$this->load->view('defaults/print_foot');
	}











}//end of class