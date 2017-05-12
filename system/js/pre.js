// $(function(){
// 	account_process('year_levels','');
// })


var class_rec = angular.module('class_rec',['ngRoute','angularUtils.directives.dirPagination']);


class_rec.controller("RegisterCtrl",function($scope,$http){

	
	$http.get(getBaseURL()+"summary_quarterly/year_levels").success(function(data){
	 	$scope.year_list = data;
	});

	$http.get(getBaseURL()+"manage/question_list").success(function(data){
		console.log(data);
	 	$scope.question_list = data;
	});

});

class_rec.controller("NavbarCtrl",function($scope,$http){

	$scope.login = function(){

		$("#fancy-title").text('Login')
		$("#fancy-body").html('<form action="#" style="padding:30px">\n\
				<div class="input-group" style="width:30em;"><span class="input-group-addon" style="width:4em;"><i class="fa fa-user"></i></span><input class="form-control" id="email2" placeholder="Email" type="text" style="border: 1px solid #cccccc;" autofocus ></div>\n\
				<div class="input-group" style="width:30em;"><span class="input-group-addon" style="width:4em"><i class="fa fa-key"></i></span><input class="form-control" id="password2" placeholder="Password" type="password" style="border: 1px solid #cccccc;"></div>\n\
			<div class="btn-holder">\n\
				 <button class="btn btn-lg btn-primary" type="button" onclick="validate(\'\',\'\')">SIGN IN</button>\n\
			</div>\n\
			<div class="btn-holder">\n\
	      			<a href="#" onclick="account_process(\'forgot_password\',\'\')" > Forgot password?</a>\n\
    		</div>\n\
		</form>');

		$("#pancy").click();


	}



});

function account_process(action,id){
	switch(action){

		case "forgot_password":

			$("#fancy-title").text('Reset Password')
			$("#fancy-body").html('<form action="#" style="padding:30px">\n\
					<fieldset class="mail" id="email_field"><input id="email_sub" placeholder="Enter your email address" type="text" style="border: 1px solid #cccccc;"></fieldset>\n\
				</div>\n\
				<div id="details_here"></div><div class="btn-holder" id="details_btn">\n\
					<button class="btn btn-lg btn-primary" type="button" onclick="account_process(\'submit_email\')">Submit</button>\n\
				</div>\n\
			</form>');

			$("#pancy").click();
		break;

		case "submit_email":
			$.ajax({
				url: getBaseURL()+"accounts/request_password",
				type: "POST",
				data:{'email':$("#email_sub").val()},
				success:function(data){
					data = $.parseJSON(data);
					console.log(data);
					if(data == ""){
						notice('danger','Email is not registered in the system');
					}else{
						$("#email_field").remove();
						$("#details_here").html('<input type="hidden" id="id_user" value="'+data[0]['user_id']+'"><input type="hidden" id="id_question" value="'+data[0]['question_id']+'"><br><strong> <i style="color:red;">*</i> '+data[0]['question']+'</strong><br><br><fieldset class="mail"><input id="answer_key" placeholder="Enter your answer" type="text" style="border: 1px solid #cccccc;"></fieldset>');

						$("#fancy-title").text('Please answer your secret question:');

						$("#details_btn").html('<button class="btn btn-primary" type="button" onclick="account_process(\'password_request\')">Request Password</button>');
					}
					loader('off');
				}
			})
		break;

		case "password_request":
			loader('on');
			$id_user = $("#id_user").val();
			$id_question = $("#id_question").val();
			$answer_key = $("#answer_key").val();
			$.ajax({
				url: getBaseURL()+"accounts/validate_answer",
				type: "POST",
				data:{'id_user':$id_user,'id_question':$id_question,'answer_key':$answer_key},
				success:function(data){
					console.log(data);
					if(data != "success"){
						notice('danger','Answer is incorrect!');
					}else{
						notice('success','Answer is correct!');
						$("#details_here").html('<br><input type="hidden" id="id_user" value="'+$id_user+'"><fieldset class="mail"><input id="new_pass" placeholder="Enter new password" type="password" style="border: 1px solid #cccccc;"></fieldset><br><fieldset class="mail"><input id="new_pass2" placeholder="Enter confirm new password.." type="password"></fieldset>');

						$("#fancy-title").text('Request new password:');

						$("#details_btn").html('<button class="btn btn-primary" type="button" onclick="account_process(\'change_password\')">Change Password</button>');
					}
					loader('off');
				}
			});	
		break;

		case "change_password":

			$id_user = $("#id_user").val();
			$new_pass = $("#new_pass").val();
			$new_pass2 = $("#new_pass2").val();

			if($new_pass2!=$new_pass){
				notice('danger','Password does not match!');
			}else{
				loader('on');
				$.ajax({
					url: getBaseURL()+"accounts/change_password",
					type: "POST",
					data:{'id_user':$id_user,'new_pass':$new_pass},
					success:function(data){
							loader('off');
						if(data == "success"){
							notice('success','Successfully changed password');
							$(".fancybox-close").click();
						}else{
							notice('danger','Error has been encountered while trying to change password!');
						}
					},error:function(data){
							notice('danger','Error has been encountered while trying to change password!');
							loader('off');
					}
				})
			}

		break;

		case "save":
				loader('on');
				var data_post = new FormData();	

				$file_upload = $("#file_upload").prop('files')[0];
				if(!$file_upload){$upload_stat='dont_upload';}else{$upload_stat='upload';}
				$id = $("#account_id").val();
				$email = $("#email").val();
				$password = $("#password").val();
				$fname = $("#fname").val();
				$mname = $("#mname").val();
				$lname = $("#lname").val();
				$address = $("#address").val();
				$answer = $("#answer").val();
				$question_id = $("#question_id:checked").val();
				$gender = $("#gender:checked").val();
				$grade_lvl = $('#grade_here:checked').val()
				data_post.append('action','save');
				data_post.append('id','');
				data_post.append('email',$email);
				data_post.append('password',$password);
				data_post.append('fname',$fname);
				data_post.append('mname',$mname);
				data_post.append('lname',$lname);
				data_post.append('address',$address);
				data_post.append('gender',$gender);
				data_post.append('answer',$answer);
				data_post.append('question_id',$question_id);
				data_post.append('user_type','1');
				data_post.append('grade_lvl',$grade_lvl);
				data_post.append('upload_status',$upload_stat);
				data_post.append('file_upload',$file_upload);

				$.ajax({
					
						url: getBaseURL()+"accounts/process",
						type: "POST",
						processData: false,
						contentType: false,
						data: data_post,
						success:function(data){
							if(data == "success"){
								validate($email,$password);
							}else{
								$message = "Error while trying to save account.";
								notice('danger',$message);
								loader('off');
							}

						},error:function(data){
								$message = "Error while trying to save account.";
								loader('off');
								notice('danger',$message);
						}

				});

		break;

		case "year_levels":

			$.ajax({
				url: getBaseURL()+"summary_quarterly/year_levels",
				type: "POST",
				success:function(data){
					data = $.parseJSON(data);
					for(var i=0; i < data.length; i++){
						console.log(''+data[i]['id']+'');
						$("#grade_lvl").append('<option value="'+data[i]['id']+'">'+data[i]['level']+'</option>');
					}
				},error:function(data){

				}

			})

		break;

	}	
}

function validate(email,password){
	loader('on');

	if(email == "" && password==""){
		$email = $("#email2").val();
		$password = $("#password2").val();
	}else{
		$email = email;
		$password = password;
	}
	$.ajax({
		url: getBaseURL()+"manage/login",
		type: "POST",
		data:{'email':$email,'password':$password},
		success:function(data){
			if(data == "success"){
				loader('on');
				location.reload();
			}else{
				notice('danger','Invalid username/password');
				loader('off');	
			}
		},error:function(data){

			notice('danger','Error has been encountered while trying to login.');
			loader('off');
		}
	});

}
