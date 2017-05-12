<?php

Class Sections extends CI_Controller{

	function __construct(){
		parent::__construct();
		$this->load->model('Section_model','SM');
		$this->load->library('globalcall');
	}

	function index(){
		$sess_id = $this->session->userdata('sess_id');
		$sess_type = $this->session->userdata('sess_type');
		$id = $this->input->post('id');

		
		$pieces = explode("|", $this->globalcall->priviledge('sections'));
		
		$data['create'] = $pieces[0];
		$data['retrive'] = $pieces[1];
		$data['update'] = $pieces[2];
		$data['delete'] = $pieces[3];


		if($this->session->userdata('sess_id'))
		{
				if($sess_type=="1"){

					
					$this->load->view('management/sections_list',$data);					
			}
			else{
					$this->load->view('management/sections',$data);

			}
					
						
		}

		

	}

	function lists(){
		$this->SM->section_list();
	}

	function details(){
		$this->SM->section_details();
	}

	function year_levels(){
		$this->SM->level_list();
	}

	function process(){
		$res = $this->SM->process_section();
		$this->globalcall->result_callback($res);
	}






}//end of class