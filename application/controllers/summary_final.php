<?php 

Class Summary_final extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Summary_final_model','SFM');
	}

	function index(){
		
		$pieces = explode("|", $this->globalcall->priviledge('summary_final'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];

		$this->load->view('management/summary_finals',$data);

	}

	function lists(){
		$this->SFM->final_grade_list();
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
		$this->SFM->quarter_list();
	}

	function find_years(){
		$this->SFM->year_finds();
	}

	function year_levels(){
		$this->SFM->grade_year_lvl();
	}

	function ranking(){

		$res = $this->SFM->process_ranking();
		if($res){
			echo"success";
		}else{
			echo"error";
		}
	}

	function ranking_list(){
		$this->SFM->list_ranking();
	}




}	