<?php 

Class Subjects extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Subject_model','SM');
	}


	function index(){
		
		$pieces = explode("|", $this->globalcall->priviledge('subjects'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];
		$this->load->view('management/subject',$data);

	}

	function lists(){
		$this->SM->subject_list();
	}

	function advisories(){
		$this->SM->my_subjects();
	}

	function my_sections(){
		$this->SM->my_sections();
	}

	function sections_finals(){
		$this->SM->section_grade_final();
	}

	function process(){

		$res = $this->SM->process_subject();

		if($res){
			echo"success";
		}else{
			echo"error";
		}

	}











}//end of class