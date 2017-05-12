<?php

Class Account_model extends CI_Model{


	function __construct(){
		$this->load->database();
		$this->load->model('Manage_model','MM');
		$this->load->library('globalcall');
	}

	function account_list(){
		$sess_id = $this->session->userdata('sess_id');
		$sess_type = $this->session->userdata('sess_type');
		$id = $this->input->post('id');
	
		
		if(empty($id)){
			if($sess_type=="0"){
				$where = "";
			}else{
				$where = "us.user_type = '1' AND us.id='$sess_id' AND";
			}
		}else{
		//	if($sess_type=="0"){
		//	$where = "us.id='$id' AND us.user_type = '0' AND ";
		//	}else{
				$where = "us.id='$id' AND";
		//	}
		}

		$query = $this->db->query("SELECT us.status,us.id as us_id,us.email,us.password,us.fname,us.mname,us.lname,us.address,us.gender,us.grade_lvl,us.user_type,us.img,yl.level,yl.id as yl_id,CASE WHEN us.user_type = '0' THEN 'Administrator'
  			 WHEN us.user_type='1' THEN 'Teacher' END as 'status_info' FROM users as us LEFT JOIN year_levels as yl ON us.grade_lvl=yl.id WHERE $where status='0' AND us.user_type='1' ORDER BY us.email");
		$this->MM->result_encode($query);
	}

	private function hash_password($password) {
		
		return password_hash($password, PASSWORD_BCRYPT);
		
	}


	function password_request(){
		$email = $this->input->post('email');
		$query = $this->db->query("SELECT us.email,us.question_id,us.id as user_id,sq.id,sq.question FROM users as us LEFT JOIN secret_questions as sq ON sq.id=us.question_id WHERE email='$email'");
		$this->MM->result_encode($query);

	}

	function answer_validate(){
		$id_user = $this->input->post('id_user');
		$id_question = $this->input->post('id_question');
		$answer_key = $this->input->post('answer_key');

		$answer = $this->db->query("SELECT id,answer,question_id FROM users WHERE id='$id_user' AND question_id='$id_question'");
		foreach($answer->result_array() as $row){
			$fetch_answer = $this->globalcall->result_decode($row['answer']);
			if($fetch_answer == $answer_key){
				return TRUE;
			}else{
				return FALSE;
			}
		}

	}

	function password_change(){
		$id_user = $this->input->post('id_user');
		$new_pass = $this->input->post('new_pass');

		$this->db->where('id',$id_user);
		$query = $this->db->update('users',array('password'=>$new_pass));
		if($query){
			return TRUE;
		}else{
			return FALSE;
		}
	}

	function process_account(){
		

		$action = $this->input->post('action');
		$id = $this->input->post('id');
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		$fname = $this->input->post('fname');
		$mname = $this->input->post('mname');
		$lname = $this->input->post('lname');
		$address = $this->input->post('address');
		$gender = $this->input->post('gender');
		$grade_lvl = $this->input->post('grade_lvl');
		$user_type = $this->input->post('user_type');
		$question_id = $this->input->post('question_id');
		$answer = $this->input->post('answer');
		$upload_status = $this->input->post('upload_status');


		$remove_avatar = $this->db->query("SELECT id,img FROM users WHERE id='$id' AND img!=''");

				if($upload_status=="dont_upload"){

					if($remove_avatar->num_rows() > 0){
						foreach($remove_avatar->result_array() as $row_avatar) {
						$avatar_location = $row_avatar['img'];
						}//end of foreach
					}//end of inner if
					else{$avatar_location='images/default.png';}//end of inner else


			}//end of outer if
			elseif($upload_status=="upload"){

			//DO THIS IF UPDATE
			if(!empty($sess_id)){
				
				if($remove_avatar->num_rows() > 0){
					foreach($remove_avatar->result_array() as $row_avatar) {
						$location_avatar = $row_avatar['img'];
					}//end of foreach
				}//end of inner if num rows
			
			 }
			//end of outer if not empty category id				
			//END OF DO THIS IF UPDATE
			$session_id = date('ymdhis');
			$file=$_FILES['file_upload']['tmp_name'];	
			$name=$_FILES['file_upload']['name'];
			$split_point = '.';
			$stringpos = strrpos($name, $split_point, -1);
			$finalstr = substr($name,0,$stringpos);
			$FinalName="".$session_id."_".$finalstr."";

			$image= addslashes(@file_get_contents($_FILES['file_upload']['tmp_name']));
			$image_name= addslashes($_FILES['file_upload']['name']);
			$image_size= @getimagesize($_FILES['file_upload']['tmp_name']);
			$splitName = explode(".", $image_name); //split the file name by the dot
			$fileExt = end($splitName); //get the file extension
			$newFileName  = ucwords($FinalName.'.'.$fileExt); //join file name and ext.
			move_uploaded_file($_FILES["file_upload"]["tmp_name"],"assets/system/images/users/".$newFileName);
	
			$avatar_location="system/images/users/".$newFileName;	

		}//end of outer else if
	

		switch($action){
			case "deactivate":
	
				$this->db->where('id',$id);
				$query = $this->db->update('users',array('status'=>'1'));
			break;


			case "save":

					if(!empty($question_id)){

						$save_array = array(
							'email' => $email,
							'password' => $password,
							'fname' => $fname,
							'mname' => $mname,
							'lname' => $lname,
							'address' => $address,
							'gender' => $gender,
							'grade_lvl' => $grade_lvl,
							'user_type' => $user_type,
							'img' => $avatar_location,
							'question_id' => $question_id,
							'answer' => $this->globalcall->result_encode($answer),
							'status' => '0',
						);

					}else{

						$save_array = array(
							'email' => $email,
							'password' => $password,
							'fname' => $fname,
							'mname' => $mname,
							'lname' => $lname,
							'address' => $address,
							'gender' => $gender,
							'grade_lvl' => $grade_lvl,
							'user_type' => $user_type,
							'img' => $avatar_location,
							'status' => '0'
						);
					}

				if(empty($id)){
				$query = $this->db->insert('users',$save_array);
				}else{
					$this->db->where('id',$id);
					$query = $this->db->update('users',$save_array);
				}
			break;

			case "remove":
				$this->db->where('id',$id);
				$query = $this->db->update('users',array('status'=>'1'));
			break;

		}//end of switch


		if($query){
			return TRUE;
		}else{
			return FALSE;
		}




	}



}//end class