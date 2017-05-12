<?php 

Class Accounts extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Account_model','AM');
	}


	function index(){

		$sess_id = $this->session->userdata('sess_id');
		$sess_type = $this->session->userdata('sess_type');
		$id = $this->input->post('id');

		
		$pieces = explode("|", $this->globalcall->priviledge('accounts'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];


		if($this->session->userdata('sess_id'))
		{

			if($sess_type=="1"){

					
						$this->load->view('management/account',$data);
					
			}

			if($sess_type=="0"){
					
						$this->load->view('admin/admin_account',$data);
			}
		}
		

	}

	function lists(){
		$this->AM->account_list();
	}

	function process(){

		$res = $this->AM->process_account();

		if($res){
			echo"success";
		}else{
			echo"error";
		}

	}

	function request_password(){
		$this->AM->password_request();
	}

	function validate_answer(){
		$res = $this->AM->answer_validate();
		$this->globalcall->result_callback($res);
	}


	function change_password(){
		$res = $this->AM->password_change();
		$this->globalcall->result_callback($res);
	}






}//end of class