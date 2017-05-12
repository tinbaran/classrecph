<?php 

Class Reports extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Account_model','AM');
	}


	function index(){
		
		$pieces = explode("|", $this->globalcall->priviledge('reports'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];

		$this->load->view('management/report',$data);

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











}//end of class