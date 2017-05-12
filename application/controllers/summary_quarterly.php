<?php 

Class Summary_quarterly extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Summary_quarterly_model','SQM');
	}


	function index(){
		
		$pieces = explode("|", $this->globalcall->priviledge('summary_quarterly'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];

		$this->load->view('management/summary_quarters',$data);

	}

	function lists(){
		$this->SQM->grade_list();
	}

	function process(){

		$res = $this->AM->process_account();

		if($res){
			echo"success";
		}else{
			echo"error";
		}

	}

	function list_quarters(){
		$this->SQM->quarter_list();
	}

	function find_years(){
		$this->SQM->year_finds();
	}

	function year_levels(){
		$this->SQM->grade_year_lvl();
	}

	function ranking(){

		$res = $this->SQM->process_ranking();
		if($res){
			echo"success";
		}else{
			echo"error";
		}
	}

	function ranking_list(){
		$this->SQM->list_ranking();
	}






}//end of class