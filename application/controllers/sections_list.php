<?php 

Class Sections_list extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Sections_list_model','SLM');
	}


	function index(){
		
		$pieces = explode("|", $this->globalcall->priviledge('sections_list'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];

		$this->load->view('management/sections_list',$data);

	}

	function lists(){
		$this->SLM->handled_list();
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