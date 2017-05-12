<?php

Class Teachers extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Teacher_model','TM');
	}

	function index(){

		$pieces = explode("|", $this->globalcall->priviledge('teachers'));
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];

		$this->load->view('management/teacher',$data);
	}

	function lists(){
		$this->TM->teacher_list();
	}
	function subject_list(){

		$this->TM->subjects();
	}

	function section_list(){
		$this->TM->sections();
	}

	function process(){
		$res = $this->TM->process_teacher();

		if($res){
			echo "success";
		}else{
			echo "error";
		}

	}













}//end of class