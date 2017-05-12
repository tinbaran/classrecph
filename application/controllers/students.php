<?php 

Class Students extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Student_model','SM');
	}


	function index(){
		

		$pieces = explode("|", $this->globalcall->priviledge('students'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];

		$this->load->view('management/student',$data);

	}

	function lists(){
		$this->SM->student_list();
	}

	function process(){

		$res = $this->SM->process_student();

		if($res){
			echo"success";
		}else{
			echo"error";
		}

	}











}//end of class