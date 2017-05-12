<?php 

Class Printing extends CI_Controller{


	function __construct(){
		parent::__construct();
		$this->load->library('globalcall');
		$this->load->model('Printing_model','PM');
	}

	function highest_score(){
		$this->PM->score_highest();
	}

	function score_list(){
		$this->PM->list_score();
	}

	function quarterly_grade(){
		$this->PM->grade_quarterly();
	}

	function subj_lists(){
		$this->PM->subject_list();
	}

	function lists(){
		$this->PM->grade_list();
	}

	function list_quarters(){
		$this->PM->quarter_list();
	}

}	