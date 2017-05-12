<?php 

Class Class_records extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Class_record_model','CRM');
	}


	function index(){
		
		$pieces = explode("|", $this->globalcall->priviledge('class_records'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];


		$this->load->view('management/class_record',$data);

	}

	function first_record(){

		$this->CRM->record_first();
	}

	function scores(){
		$this->CRM->score_list();
	}

	function lists(){
		$this->CRM->subject_list();
	}

	function quarters(){
		$this->CRM->quarter_list();
	}

	function sections(){

		$this->CRM->section_list();
	}

	function datas(){
		$this->CRM->data_list();
	}

	function records(){
		$this->CRM->record_list();
	}

	function records2(){
		$this->CRM->record_list2();
	}

	function process(){

		$res = $this->CRM->process_class_record();
		$this->globalcall->result_callback($res);
	}











}//end of class