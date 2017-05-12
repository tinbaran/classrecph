<?php 
Class Manage_model extends CI_Model{

	function __construct(){
		$this->load->database();
	}

	function result_encode($query){
		$arrayindex=array();
			
			foreach($query->result_array() as $r){
			$arrayindex[] = $r;
			}

		echo json_encode($arrayindex);
	}

	function login_validate(){

		$email = $this->input->post('email');
		$password = $this->input->post('password');

		$query = $this->db->query("SELECT id,email,password,user_type FROM users WHERE email='$email' AND password='$password' AND status='0'");


		if($query->num_rows() > 0){
			$row = $query->row_array();
			$email = $row['email'];
			$id = $row['id'];
			$password = $row['password'];
			$user_type = $row['user_type'];

			$this->create_session($id,$email,$password,$user_type);
			return TRUE;

		}else{
			return FALSE;
		}
	}//end of function


	function create_session($id,$email,$password,$user_type){

		$sess_array = array(
			'sess_id' => $id,
			'sess_pass' => $password,
			'sess_type' => $user_type,
			'sess_email' => $email, 
			);
		$this->session->set_userdata($sess_array);
	}

	public function login($data)
    {
        $email = $data['email'];
        $password = $data['password'];
        
        $query = $this->db->query("SELECT * FROM users where email = '$email' and password = '$password'" );
        
        $result = $query->result_array();
		
		return $result;
    }

    

	function whos_in($sess_id){
		$query = $this->db->query("SELECT id,fname,lname FROM users WHERE id='$sess_id'");
		return $query->row_array();
	}



	function list_question(){
		$query = $this->db->query("SELECT * FROM secret_questions");
		$this->result_encode($query);
	}

	






}//end of class