
function section_process(action,id){

	switch(action){

		case "create":

			$("#fancy-title").text('Section:');
			$("#fancy-body").html('<br><fieldset class="mail">\n\
				<input type="hidden" id="section_id" value="">\n\
				<input id="section_name" placeholder="Section Name" type="text" value="" style="border: 1px solid #cccccc;" autofocus></fieldset><br>\n\
				<strong>Teacher: </strong><br><select  style="width:100%;" id="adviser_list" class="btn btn-primary"></select><br><br>\n\
				<strong>Grade Level: <br> </strong><select id="level_list" style="width:100%;" class="btn btn-primary"><option value="">Select Grade Level:</option></select><br><br>\n\
				<fieldset class="mail"><input id="bldg_details" placeholder="Building Details" type="text" value="" style="border: 1px solid #cccccc;"></fieldset><br>\n\
				<fieldset class="mail"><input id="room" placeholder="Room" type="text" value="" style="border: 1px solid #cccccc;"></fieldset><br>\n\
				<strong>Section Status: <br> </strong><select style="width:100%;" id="section_info" class="btn btn-primary" ><option value="0">Advisory</option><option value="1">Section Handled</option></select>\n\
				<div class="btn-holder">\n\
					<button class="btn btn-success" type="button" onclick="section_process(\'save\',\'\')"><i class="fa fa-save fa-lg"></i> Save</button></div>');
			
			section_process('adviser_list','');
			section_process('year_levels','');
			$("#pancy").click();


		break;

		case "update":
			loader('on');
			$.ajax({
				url: getBaseURL()+"sections/lists",
				type: "POST",
				data:{'id':id},
				success:function(data){
					data = $.parseJSON(data);
					section_process('create','');

					$("#section_id").val(id);
					
					$section_name = data[0]['name'];
					$("#section_name").val($section_name);
					
					$adviser_list = data[0]['adviser_id'];
					$selected_adviser = $("#adviser_"+id).html();
					$("#adviser_list").prepend('<label value="'+$adviser_list+'" >'+$selected_adviser+'</label>');

					$selected_year = $("#year_level_"+id).html()
					$level_list = data[0]['year_level']; 
					$("#level_list").prepend('<option value="'+$level_list+'" selected="selected">'+$selected_year+'</option>');
					
					$bldg_details = data[0]['bldg_details'];
					$("#bldg_details").val($bldg_details);

					$room = data[0]['room'];
					$("#room").val($room);

					$section_info = $("#section_info_"+id).html();
				//	$section_info = data[0]['section_info'];
					$("#section_info option[text="+$section_info+"]").attr('selected','selected');

					loader('off');
				}
			})

		break;

		case "view_details":
			$section = $("#section_"+id).html();
			$current_adviser_id = $("#current_adviser_id").val();
			loader('on');	
			$.ajax({
				url: getBaseURL()+"sections/details",
				type: "POST",
				data:{'id':id, 'adviser_id':$current_adviser_id},
				success:function(data){
					data = $.parseJSON(data);

						if(data == ""){
							loader('off');
							notice('danger','No details found!');
						}else{
												
								$("#fancy-title").text('Section details')
									$("#fancy-body").html('<table class="table table-striped table-bordered table-condensed table-hover " style="width:100%;">\n\
											<thead class="bg-primary" style="font-size: 14px; padding: 20em">\n\
												<tr style="padding: 20px">\n\
													<th>Section name</th>\n\
													<th>Grade level</th>\n\
													<th>Building details</th>\n\
													<th>Room</th>\n\
													<th>Section Info</th>\n\
												</tr>\n\
											</thead>\n\
											<tbody id="section_'+id+'"></tbody>\n\
										</table>');

						    for(var i=0; i < data.length;i++){

						    	$("#section_"+id).append('<tr>\n\
						    		<td>'+data[i]['name']+'</td>\n\
						    		<td>'+data[i]['year_level']+'</td>\n\
						    		<td>'+data[i]['bldg_details']+'</td>\n\
						    		<td>'+data[i]['room']+'</td>\n\
						    		<td>'+data[i]['section_info']+'</td>\n\
						    		</tr>');
						    }//end of for_loop								

							$("#pancy").click();

							loader('off');
						}//end of success

					},error:function(data){
							$message = "Error while trying to fetch data.";
							loader('off');
							notice('danger',$message);
				}
			});//end of ajax
		break;


		case "save":
			loader('on');
			$section_id = $("#section_id").val();
			$section_name = $("#section_name").val();
			$adviser_list = $("#adviser_list").val();
			$level_list = $("#level_list").val();
			$bldg_details = $("#bldg_details").val();
			$room = $("#room").val();
			$section_info = $("#section_info").val();

			$.ajax({
				url: getBaseURL()+"sections/process",
				type: "POST",
				data:{'action':action,'section_id':$section_id,'section_name':$section_name,'adviser_list':$adviser_list,'level_list':$level_list,'bldg_details':$bldg_details,'room':$room,'section_info':$section_info},
				success:function(data){
					if(data == "success"){
						location.reload();
					}else{
						notice('error','Error has been encountered while trying to save section');
						loader('off')
					}
				},error:function(data){
					notice('error','Error has been encountered while trying to save section');
					loader('off')
				}
			});

		break;

		break; 

		case "remove":

			if(confirm('Are you sure to remove this section?')){
							$.ajax({
								url: getBaseURL()+"sections/process",
								type: "POST",
								data:{'action':action,'section_id':id},
								success:function(data){
									if(data == "success"){
										notice('success','Successfully removed section');
										$("#inline_"+id).remove();
									}else{
										notice('error','Error has been encountered while trying to remove section');
									}
									loader('off')
								},error:function(data){
									notice('error','Error has been encountered while trying to remove section');
									loader('off')
								}
							})
			}
		break;

		case "list":
			$current_adviser_id = $("#current_adviser_id").val();
			$.ajax({
				url: getBaseURL()+"sections/lists",
				type: "POST",
				data:{'id':id, 'adviser_id':$current_adviser_id},
				success:function(data){
					
					data = $.parseJSON(data);

					if(id==""){
						for(var i=0; i < data.length; i++){
							
							$("#subject_list").append('<td>'+data[i]['name']+'</td>\n\
											<td><a href="javascript:void(0);" onclick="section_process(\'teacher_sub_remove\',\''+id+'\')"> <i class="fa fa-remove"></i> Remove</a></td>\n\
											');					
						}//end of for
					
					}
					else if(id=="0"){
						for(var i=0; i < data.length; i++){
							$("#section_list").append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>');			
					}//end of for
					
					}else{
						$("#my_section_"+id).html(data[0]['name']);
					}	


				}//end of success
					
			});
	
		break;

		case "year_levels":
			$.ajax({
				url: getBaseURL()+"sections/year_levels",
				success:function(data){
					data = $.parseJSON(data);
					for(var i=0; i < data.length; i++){
						$("#level_list").append('<option value="'+data[i]['id']+'">'+data[i]['level']+'</option>');
					}
				}
			})
		break;

		case "adviser_list":
			$.ajax({
				url: getBaseURL()+"teachers/lists",
				type: "POST",
				data:{'action':'specific_teacher'},
				success:function(data){
					data = $.parseJSON(data);
					for(var i=0; i < data.length; i++){
						$("#adviser_list").append('<option value="'+data[i]['id']+'">'+data[i]['fname']+' '+data[i]['lname']+'</option>');
					}
				}
			});
		break;

	}			
}

function grade_process(action,id){

	switch(action){

		case "module_tabs":
			loader('on');
			$current_teacher = $("#current_teacher").val();
			$current_subject = $("#current_subject").val();
			$current_section = $("#current_section").val();
			$selected_year = $("#selected_year").val();
			
			$("#module_ul li").removeAttr('class');

			switch(id){
				case "student_grade":
					$("#final_list").show();
					$("#ranking_student").hide();
				break;

				case "student_ranking":

				if($current_teacher =="" || $current_subject=="" || $current_section=="" || $selected_year==""){
					notice('danger','Please select subject, academic year and section first!');
				}else{
					grade_process('do_ranking','');
				}

					$("#ranking_student").show();		
					$("#final_list").hide();
				break;
			}

			$("#"+id).attr('class','active');
			loader('off');
		break;

		case "do_ranking":
			loader('on');
			grade_process('rank','');

			$selected_year = $("#selected_year").val();
			$("#rank_list").html('');
			$num = 1;
			$.ajax({
				url: getBaseURL()+"summary_quarterly/ranking_list",
				type: "POST",
				data:{'current_subject':$current_subject,'current_section':$current_section,'current_teacher':$current_teacher},
				success:function(data){
					data = $.parseJSON(data);
					
					console.log(data.length);

					for(var i=0; i < data.length; i++){
						$("#rank_list").append('<tr>\n\
							<td>'+data[i]['lname']+', '+data[i]['fname']+'</td>\n\
							<td>'+$selected_year+'</td>\n\
							<td>'+data[i]['final_grade']+'</td>\n\
							<td><strong>'+ordinal_suffix_of($num)+'</strong></td>\n\
							</tr>');
						$num++;
					}//end of for loop
				
					$("#student_ranking_list").removeAttr('style');
					loader('off');
				}
			})

		break;

		case "rank":
			$num = $("input[name='final_score[]']").length;

			var data_post = new FormData();	
			data_post.append('student_count',$num);
			data_post.append('current_teacher',$("#current_teacher").val());
			data_post.append('current_subject',$("#current_subject").val());
			data_post.append('current_section',$("#current_section").val());
			data_post.append('current_year',$("#selected_year").val());

			var final_score_values = []; 		
				$("input[name='final_score[]']").each(function() {
				final_score_values.push($(this).val()); 
			});
			data_post.append('final_score',final_score_values);

			var id_student_values = []; 		
				$("input[name='id_student[]']").each(function() {
				id_student_values.push($(this).val()); 
			});
			data_post.append('student_id',id_student_values);
			$.ajax({
					url: getBaseURL()+"summary_quarterly/ranking",
					type: "POST",
					processData: false,
					contentType: false,
					data: data_post,
					success:function(data){
						loader('off');
					},error:function(data){
							$message = "Error while trying to rank final grade.";
							loader('off');
							notice('danger',$message);
					}

			});


		break;

		case "find_years":
			
			$teacher = $("#current_teacher").val();
			$subject = $("#current_subject").val();
			$section = id.value;

			$.ajax({
				url: getBaseURL()+"summary_quarterly/find_years",
				type: "POST",
				data:{'teacher':$teacher,'subject':$subject,'section':$section},
				success:function(data){
					data = $.parseJSON(data);

					if(data.length > 0){
						$("#selected_year").empty();
						for(var i=0; i < data.length; i++){
							$("#selected_year").append('<option value="'+data[i]['academic_year']+'">'+data[i]['academic_year']+'</option>');
						}

						$("#selected_btn,#selected_year").attr('disabled',false);
					}	

				}
			});

		break;

		case "find_sections":
			loader('on');
			$subject = $("#selected_subject").val();
			$("#current_subject").val($subject);
			$.ajax({
				url: getBaseURL()+"subjects/my_sections",
				type: "POST",
				data:{'subject_id':$subject},
				success:function(data){

					
					data = $.parseJSON(data);
					$("#selected_section").empty();
					for(var i=0; i < data.length; i++){
						$("#selected_section").append('<option value="'+data[i]['section']+'">'+data[i]['section_name']+'</option>');
					}
					loader('off');
					$("#selected_section").attr('disabled',false);
				}
			});


		break;

		case "find_records":
				$teacher_id = $("#current_teacher").val();
				$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();

				$("#current_section").val($section);
				loader('on');
				grade_process('student_list',$section);
				loader('off');
		break;
		
		case "load_grades":
				$teacher_id = $("#current_teacher").val();
				$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();
				$academic_year = $("#selected_year").val();

				$.ajax({
					url: getBaseURL()+"summary_quarterly/lists",
					type: "POST",
					data:{'teacher':$teacher_id,'subject':$subject,'section':$section,'academic_year':$academic_year},
					success:function(data){
						data = $.parseJSON(data);
						console.log(data);
						for(var x=0; x < data.length; x++){
							console.log("#quarter_"+data[x]['quarter']+"_"+data[x]['student_id']+"");
							// $final_grade = Math.round(data[x]['total_initial']);
							$("#quarter_"+data[x]['quarter']+"_"+data[x]['student_id']).html(data[x]['quarterly_grade']);

						}

						grade_process('final_list',$section);
					}
				});

		break;

		case "final_list":

			$.ajax({
				url: getBaseURL()+"students/lists",
				type: "POST",
				data:{'section':id},
				success:function(data){
					data = $.parseJSON(data);


							for(var i=0; i < data.length; i++){

								$quarter_1 = $('#quarter_I_'+data[i]['student_id']+'').html();
								$quarter_2 = $('#quarter_II_'+data[i]['student_id']+'').html();
								$quarter_3 = $('#quarter_III_'+data[i]['student_id']+'').html();
								$quarter_4 = $('#quarter_IV_'+data[i]['student_id']+'').html();
								$final = $('#final_'+data[i]['student_id']+'').html();

								$sum = parseFloat($quarter_1) + parseFloat($quarter_2) + parseFloat($quarter_3) + parseFloat($quarter_4)
								

							/*	$('.student_x_'+data[i]['student_id']).val($quarter_1);	
								$('#quarter_I_'+data[i]['student_id']+'').html($quarter_1);
								$('.student_x_'+data[i]['student_id']).val($quarter_2);	
								$('#quarter_II_'+data[i]['student_id']+'').html($quarter_2);
								$('.student_x_'+data[i]['student_id']).val($quarter_3);	
								$('#quarter_III_'+data[i]['student_id']+'').html($quarter_3);
								$('.student_x_'+data[i]['student_id']).val($quarter_4);	
								$('#quarter_IV_'+data[i]['student_id']+'').html($quarter_4); */
								// console.log('Sum: '+$sum);
									
								
								

								if($quarter_1 == $('#quarter_I_'+data[i]['student_id']+'').html()){
									if($quarter_1 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_1);	
									$('#quarter_I_'+data[i]['student_id']+'').html($quarter_1);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($quarter_2 == $('#quarter_II_'+data[i]['student_id']+'').html()){
									if($quarter_1 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_2);	
									$('#quarter_II_'+data[i]['student_id']+'').html($quarter_2);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($quarter_3 == $('#quarter_III_'+data[i]['student_id']+'').html()){
									if($quarter_3 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_3);	
									$('#quarter_III_'+data[i]['student_id']+'').html($quarter_3);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($quarter_4 == $('#quarter_IV_'+data[i]['student_id']+'').html()){
									if($quarter_4 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_4);	
									$('#quarter_IV_'+data[i]['student_id']+'').html($quarter_4);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($final == $('#final_'+data[i]['student_id']+'').html()){ 
									 $final = $sum / 4;
									
									if($final < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										

									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($final);	
									$('#final_'+data[i]['student_id']+'').html($final);
									$("#status_"+data[i]['student_id']).html($status);
									
								}
								
								
						//		$("#status_"+data[i]['student_id']).html($status);
									

							}//end of forloop	
					



				}
			});		
		break;


		case "print_record":
				$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();
				$academic_year = $("#selected_year").val();
		$("#fancy-title").text('Print Quarterly Grade:');
		$("#fancy-body").html('<form method="POST" action="'+getBaseURL()+'manage/quarterly_print" target="_blank">\n\
				<input type="hidden" name="subject" value="'+$subject+'"><input type="hidden" name="section" value="'+$section+'"><input type="hidden" name="academic_year" value="'+$academic_year+'"><select id="quarter_list" name="record_id" class="btn btn-primary"><option value="">Select Quarter:</option></select>\n\
			</div>\n\
			<div class="btn-holder">\n\
				<button class="btn blue" type="submit">Print</button>\n\
			</div>\n\
		</form>');
		grade_process('find_quarters','')
		$("#pancy").click();
		break;

		case "find_quarters":
				$(".appended_quarters").remove();
				$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();
				$teacher = $("#current_teacher").val();
				$.ajax({
						url: getBaseURL()+"summary_quarterly/list_quarters",
						type: "POST",
						data:{'section':$section,'teacher':$teacher,'subject':$subject},
						success:function(data){
							data = $.parseJSON(data);
							for(var i=0; i < data.length; i++){
								$("#quarter_list").append('<option class="appended_quarters" value="'+data[i]['id']+'">'+data[i]['quarter']+' - '+data[i]['school_year']+'</option>')
							}
						}
				});	
		break;



		case "student_list":
			$subject = $("#selected_subject").val();
			$section = $("#selected_section").val();
			$academic_year = $("#selected_year").val();
			$("#student_list").html('');
			$.ajax({
				url: getBaseURL()+"students/lists",
				type: "POST",
				data:{'section':id},
				success:function(data){
					data = $.parseJSON(data);
						if(data == ""){
							loader('off');
							notice('danger','No student(s) found in this section!');
						}else{
							$("#btn_print").attr('disabled',false);
							var xa = 1;	
							for(var i=0; i < data.length; i++){
									$("#student_list").append('<tr id="list_stud">\n\
															<td id="student_name_'+data[i]['student_id']+'">'+data[i]['lname']+', '+data[i]['fname']+'\n\
															<input name="final_score[]" id="student_count_x" type="hidden" class="student_x_'+data[i]['student_id']+'"><input name="id_student[]" type="hidden" value="'+data[i]['student_id']+'">\n\
															</td>\n\
															<td id="quarter_I_'+data[i]['student_id']+'">0</td>\n\
															<td id="quarter_II_'+data[i]['student_id']+'">0</td>\n\
															<td id="quarter_III_'+data[i]['student_id']+'">0</td>\n\
															<td id="quarter_IV_'+data[i]['student_id']+'">0</td>\n\
															<td id="final_'+data[i]['student_id']+'">0</td>\n\
															<td id="status_'+data[i]['student_id']+'"></td>\n\
														</tr>');
								xa++;
							}//end of for loop


									grade_process('load_grades','');
									$("#student_list_tbl").removeAttr('style');
									$("#rank_btn").attr('disabled',false);
						}

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
						$("#"+id).append('<option value="'+data[i]['id']+'">'+data[i]['level']+'</option>');
					}
				},error:function(data){

				}

			})

		break;

	}//end of switch

}

function summary_final_process(action,id){

	switch(action){

		case "module_tabs":
			
			$current_teacher = $("#current_teacher").val();
			$current_subject = $("#current_subject").val();
			$current_section = $("#current_section").val();
			$selected_year = $("#selected_year").val();
			
			$("#module_ul li").removeAttr('class');

			switch(id){
				case "student_grade":
					$("#final_list").show();
					$("#ranking_student").hide();
				break;

				case "student_ranking":

				if($current_teacher =="" || $current_subject=="" || $current_section=="" || $selected_year==""){
					notice('danger','Please select subject, academic year and section first!');
				}else{
					summary_final_process('do_ranking','');
				}

					$("#ranking_student").show();		
					$("#final_list").hide();
				break;
			}

			$("#"+id).attr('class','active');
		break;

		case "do_ranking":
			loader('on');
			summary_final_process('rank','');

			$selected_year = $("#selected_year").val();
			$("#rank_list").html('');
			$num = 1;
			$.ajax({
				url: getBaseURL()+"summary_final/ranking_list",
				type: "POST",
				data:{'current_subject':$current_subject,'current_section':$current_section,'current_teacher':$current_teacher},
				success:function(data){
					data = $.parseJSON(data);
					
					console.log(data.length);

					for(var i=0; i < data.length; i++){
						$("#rank_list").append('<tr>\n\
							<td>'+data[i]['lname']+', '+data[i]['fname']+'</td>\n\
							<td>'+$selected_year+'</td>\n\
							<td>'+data[i]['final_grade']+'</td>\n\
							<td><strong>'+ordinal_suffix_of($num)+'</strong></td>\n\
							</tr>');
						$num++;
					}//end of for loop
				
					$("#student_ranking_list").removeAttr('style');
					loader('off');
				}
			})

		break;

		case "rank":
			$num = $("input[name='final_score[]']").length;

			var data_post = new FormData();	
			data_post.append('student_count',$num);
			data_post.append('current_teacher',$("#current_teacher").val());
			data_post.append('current_subject',$("#current_subject").val());
			data_post.append('current_section',$("#current_section").val());
			data_post.append('current_year',$("#selected_year").val());

			var final_score_values = []; 		
				$("input[name='final_score[]']").each(function() {
				final_score_values.push($(this).val()); 
			});
			data_post.append('final_score',final_score_values);

			var id_student_values = []; 		
				$("input[name='id_student[]']").each(function() {
				id_student_values.push($(this).val()); 
			});
			data_post.append('student_id',id_student_values);
			$.ajax({
					url: getBaseURL()+"summary_final/ranking",
					type: "POST",
					processData: false,
					contentType: false,
					data: data_post,
					success:function(data){
						loader('off');
					},error:function(data){
							$message = "Error while trying to rank final grade.";
							loader('off');
							notice('danger',$message);
					}

			});


		break;

		case "find_years":
			$teacher = $("#current_teacher").val();
			$subject = $("#current_subject").val();
			$section = id.value;

			$.ajax({
				url: getBaseURL()+"summary_final/find_years",
				type: "POST",
				data:{'teacher':$teacher,'subject':$subject,'section':$section},
				success:function(data){
					data = $.parseJSON(data);

					if(data.length > 0){

						for(var i=0; i < data.length; i++){
							$("#selected_year").append('<option value="'+data[i]['academic_year']+'">'+data[i]['academic_year']+'</option>');
						}
						$("#selected_btn,#selected_year").attr('disabled',false);

					}	

				}
			});

		break;

		case "find_sections":
			$subject = $("#selected_subject").val();
			$("#current_subject").val($subject);
			loader('on');
			$.ajax({
				url: getBaseURL()+"subjects/sections_finals",
				type: "POST",
				data:{'subject_id':$subject},
				success:function(data){
					data = $.parseJSON(data);
						
						for(var i=0; i < data.length; i++){
							$("#selected_section").append('<option value="'+data[i]['section']+'">'+data[i]['section_name']+'</option>');
						}
						$("#selected_section").attr('disabled',false);
						loader('off');
				}
			});


		break;

		case "find_records":
				$teacher_id = $("#current_teacher").val();
				$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();

				$("#current_section").val($section);
				loader('on');
				summary_final_process('student_list',$section);
				loader('off');
		break;
		
		case "load_grades":
				$teacher_id = $("#current_teacher").val();
				$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();
				$academic_year = $("#selected_year").val();

				$.ajax({
					url: getBaseURL()+"summary_final/lists",
					type: "POST",
					data:{'teacher':$teacher_id,'subject':$subject,'section':$section,'academic_year':$academic_year},
					success:function(data){
						data = $.parseJSON(data);
						console.log(data);
						for(var x=0; x < data.length; x++){
							console.log("#quarter_"+data[x]['quarter']+"_"+data[x]['student_id']+"");
							// $final_grade = Math.round(data[x]['total_initial']);
							$("#quarter_"+data[x]['quarter']+"_"+data[x]['student_id']).html(data[x]['quarterly_grade']);

						}

						summary_final_process('final_list',$section);
					}
				});

		break;

		case "final_list":

			$.ajax({
				url: getBaseURL()+"students/lists",
				type: "POST",
				data:{'section':id},
				success:function(data){
					data = $.parseJSON(data);


							for(var i=0; i < data.length; i++){

								$quarter_1 = $('#quarter_I_'+data[i]['student_id']+'').html();
								$quarter_2 = $('#quarter_II_'+data[i]['student_id']+'').html();
								$quarter_3 = $('#quarter_III_'+data[i]['student_id']+'').html();
								$quarter_4 = $('#quarter_IV_'+data[i]['student_id']+'').html();

								$sum = parseFloat($quarter_1) + parseFloat($quarter_2) + parseFloat($quarter_3) + parseFloat($quarter_4)
								
								// console.log('Sum: '+$sum);
							//		$final = $sum / 4;
						//		$('.student_x_'+data[i]['student_id']).val($final);	
						//		$('#final_'+data[i]['student_id']+'').html($final);
								

						if($quarter_1 == $('#quarter_I_'+data[i]['student_id']+'').html()){
									if($quarter_1 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_1);	
									$('#quarter_I_'+data[i]['student_id']+'').html($quarter_1);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($quarter_2 == $('#quarter_II_'+data[i]['student_id']+'').html()){
									if($quarter_1 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_2);	
									$('#quarter_II_'+data[i]['student_id']+'').html($quarter_2);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($quarter_3 == $('#quarter_III_'+data[i]['student_id']+'').html()){
									if($quarter_3 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_3);	
									$('#quarter_III_'+data[i]['student_id']+'').html($quarter_3);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($quarter_4 == $('#quarter_IV_'+data[i]['student_id']+'').html()){
									if($quarter_4 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($quarter_4);	
									$('#quarter_IV_'+data[i]['student_id']+'').html($quarter_4);
									$("#status_"+data[i]['student_id']).html($status);
								}
								if($final == $('#final_'+data[i]['student_id']+'').html()){ 
								//	 $final = $sum / 4;
									
									if($final < 75){
										$status = '<strong style="color:red;">Failed</strong>'
										

									}else{
										$status = '<strong style="color:green;">Passed</strong>';
										
									}
									$('.student_x_'+data[i]['student_id']).val($final);	
									$('#final_'+data[i]['student_id']+'').html($final);
									$("#status_"+data[i]['student_id']).html($status);
									
								}
								
								

							//		$("#status_"+data[i]['student_id']).html($status);

							}//end of forloop	
					



				}
			});		
		break;


		case "print_record":
			$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();
				$academic_year = $("#selected_year").val();
		$("#fancy-title").text('Print Quarterly Grade:');
		$("#fancy-body").html('<form method="POST" action="'+getBaseURL()+'manage/quarterly_print" target="_blank">\n\
				<input type="hidden" name="subject" value="'+$subject+'"><input type="hidden" name="section" value="'+$section+'"><input type="hidden" name="academic_year" value="'+$academic_year+'"><select id="quarter_list" name="record_id" class="btn btn-primary"><option value="">Select Quarter:</option></select>\n\
			</div>\n\
			<div class="btn-holder">\n\
				<button class="btn blue" type="submit">Print</button>\n\
			</div>\n\
		</form>');
		summary_final_process('find_quarters','')
		$("#pancy").click();
		break;

		case "find_quarters":
				$(".appended_quarters").remove();
				$subject = $("#selected_subject").val();
				$section = $("#selected_section").val();
				$teacher = $("#current_teacher").val();
				$.ajax({
						url: getBaseURL()+"summary_final/list_quarters",
						type: "POST",
						data:{'section':$section,'teacher':$teacher,'subject':$subject},
						success:function(data){
							data = $.parseJSON(data);
							for(var i=0; i < data.length; i++){
								$("#quarter_list").append('<option class="appended_quarters" value="'+data[i]['id']+'">'+data[i]['quarter']+' - '+data[i]['school_year']+'</option>')
							}
						}
				});	
		break;



		case "student_list":
			$subject = $("#selected_subject").val();
			$section = $("#selected_section").val();
			$academic_year = $("#selected_year").val();
			$("#student_list").html('');
			$.ajax({
				url: getBaseURL()+"students/lists",
				type: "POST",
				data:{'section':id},
				success:function(data){
					data = $.parseJSON(data);
						if(data == ""){
							loader('off');
							notice('danger','No student(s) found in this section!');
						}else{
							$("#btn_print").attr('disabled',false);
							var xa = 1;	
							for(var i=0; i < data.length; i++){
									$("#student_list").append('<tr id="list_stud">\n\
															<td id="student_name_'+data[i]['student_id']+'">'+data[i]['lname']+', '+data[i]['fname']+'\n\
															<input name="final_score[]" id="student_count_x" type="hidden" class="student_x_'+data[i]['student_id']+'"><input name="id_student[]" type="hidden" value="'+data[i]['student_id']+'">\n\
															</td>\n\
															<td id="quarter_I_'+data[i]['student_id']+'">0</td>\n\
															<td id="quarter_II_'+data[i]['student_id']+'">0</td>\n\
															<td id="quarter_III_'+data[i]['student_id']+'">0</td>\n\
															<td id="quarter_IV_'+data[i]['student_id']+'">0</td>\n\
															<td id="final_'+data[i]['student_id']+'">0</td>\n\
															<td id="status_'+data[i]['student_id']+'"></td>\n\
														</tr>');
								xa++;
							}//end of for loop


									summary_final_process('load_grades','');
									$("#student_list_tbl").removeAttr('style');
									$("#rank_btn").attr('disabled',false);
						}

				}
			});

		break;


		case "year_levels":

			$.ajax({
				url: getBaseURL()+"summary_final/year_levels",
				type: "POST",
				success:function(data){
					data = $.parseJSON(data);
					for(var i=0; i < data.length; i++){
						$("#"+id).append('<option value="'+data[i]['id']+'">'+data[i]['level']+'</option>');
					}
				},error:function(data){

				}

			})

		break;

	}//end of switch

}






function calculate_highest(){
	$current_module = $("#current_module").val();	
	$current_subject = $("#current_subject").val();	

	$one = $("#highest_"+$current_module+"_1_"+$current_subject).val();
	$two = $("#highest_"+$current_module+"_2_"+$current_subject).val();
	$three = $("#highest_"+$current_module+"_3_"+$current_subject).val();
	$four = $("#highest_"+$current_module+"_4_"+$current_subject).val();
	$five = $("#highest_"+$current_module+"_5_"+$current_subject).val();
	$six = $("#highest_"+$current_module+"_6_"+$current_subject).val();
	$seven = $("#highest_"+$current_module+"_7_"+$current_subject).val();
	$eight = $("#highest_"+$current_module+"_8_"+$current_subject).val();
	$nine = $("#highest_"+$current_module+"_9_"+$current_subject).val();
	$ten = $("#highest_"+$current_module+"_10_"+$current_subject).val();
		
	if($one == "" || $one == undefined){$one = 0;}
	if($two == "" || $two == undefined){$two = 0;}
	if($three == "" || $three == undefined){$three = 0;}
	if($four == "" || $four == undefined){$four = 0;}
	if($five == "" || $five == undefined){$five = 0;}
	if($six == "" || $six == undefined){$six = 0;}
	if($seven == "" || $seven == undefined){$seven = 0;}
	if($eight == "" || $eight == undefined){$eight = 0;}
	if($nine == "" || $nine == undefined){$nine = 0;}
	if($ten == "" || $ten == undefined){$ten = 0;}

	console.log('One: '+$one);
	console.log('Two: '+$two);
	console.log('Three: '+$three);
	console.log('Four: '+$four);
	console.log('Five: '+$five);
	console.log('Six: '+$six);
	console.log('Seven: '+$seven);
	console.log('Eight: '+$eight);
	console.log('Nine: '+$nine);
	console.log('Ten: '+$ten);


	$highest_score = parseFloat($one) + parseFloat($two) + parseFloat($three) + parseFloat($four) + parseFloat($five) + parseFloat($six) + parseFloat($seven) + parseFloat($eight) + parseFloat($nine) + parseFloat($ten)

	$("#highest_"+$current_module+"_total_"+$current_subject).val($highest_score.toFixed(2));

	// $ps = $total / $highest_score * 100;
	// $total_wc = $ps * parseFloat($wc);
	// $("#"+$current_subject+"_"+module+"_"+student_id+'_ps').val($ps);
	// $('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_ws').val($total_wc);

}

function calculate_score(module,student_id,num){
	$current_subject = $("#current_subject").val();	
	$current_teacher = $("#current_teacher").val();
	$current_module = $("#current_module").val();	
	$current_section = $("#current_section").val();

	// $highest_score = $("#highest_"+$current_module+"_"+num+"_"+$current_subject).val();
	$highest_score = $("#highest_"+module+"_total_"+$current_subject).val();
	$wc_ww = $("#current_wc_ww").val();	
	$wc_pt = $("#current_wc_pt").val();
	$wc_qa = $("#current_wc_qa").val();	

	switch(module){
		case "pt":
		$wc = $wc_pt;
		break;

		case "ww":
		$wc = $wc_ww;
		break;

		case "qa":
		$wc = $wc_qa;
		break;
	}

	
	$one = $("#"+$current_subject+"_"+module+"_"+student_id+'_1').val();
	$two = $("#"+$current_subject+"_"+module+"_"+student_id+'_2').val();
	$three = $("#"+$current_subject+"_"+module+"_"+student_id+'_3').val();
	$four = $("#"+$current_subject+"_"+module+"_"+student_id+'_4').val();
	$five = $("#"+$current_subject+"_"+module+"_"+student_id+'_5').val();
	$six = $("#"+$current_subject+"_"+module+"_"+student_id+'_6').val();
	$seven = $("#"+$current_subject+"_"+module+"_"+student_id+'_7').val();
	$eight = $("#"+$current_subject+"_"+module+"_"+student_id+'_8').val();
	$nine = $("#"+$current_subject+"_"+module+"_"+student_id+'_9').val();
	$ten = $("#"+$current_subject+"_"+module+"_"+student_id+'_10').val();

	if($one == ""){$one = 0;}
	if($two == ""){$two = 0;}
	if($three == ""){$three = 0;}
	if($four == ""){$four = 0;}
	if($five == ""){$five = 0;}
	if($six == ""){$six = 0;}
	if($seven == ""){$seven = 0;}
	if($eight == ""){$eight = 0;}
	if($nine == ""){$nine = 0;}
	if($ten == ""){$ten = 0;}




	$total = parseFloat($one) + parseFloat($two) + parseFloat($three) + parseFloat($four) + parseFloat($five) + parseFloat($six) + parseFloat($seven) + parseFloat($eight) + parseFloat($nine) + parseFloat($ten);
	$ps = $total / $highest_score * 100;
	$total_wc = $ps * parseFloat($wc);

	$("#"+$current_subject+"_"+module+"_"+student_id+'_total').val($total.toFixed(2));
	$("#"+$current_subject+"_"+module+"_"+student_id+'_ps').val($ps.toFixed(2));
	$('#'+$current_subject+'_'+module+'_'+student_id+'_ws').val($total_wc.toFixed(2));


}


function class_record_process(action,id){
	switch(action){

			case "new_quarter":

				$current_subject = $("#current_subject").val();

				$quarter = $("#selected_quarter_"+$current_subject).val();

				$("#quarter_here_"+$current_subject).html("<strong>( QUARTER "+$quarter+" )</strong>");	

			break;



			case "save_score":
					
					$current_subject_x = $("#current_subject").val();

					$region = $("#selected_region_"+$current_subject_x).val()
					$division = $("#selected_division_"+$current_subject_x).val()
					$district = $("#selected_district_"+$current_subject_x).val()
					$school_name = $("#selected_school_name_"+$current_subject_x).val()
					$school_id = $("#selected_school_id_"+$current_subject_x).val()
					$school_year = $("#selected_school_year_"+$current_subject_x).val()
						
					if($region == ""){
						notice('danger','Region should not be empty!');
					}else if($division == ""){
						notice('danger','Division should not be empty!');
					}else if($district == ""){
						notice('danger','District should not be empty!');
					}else if($school_name == ""){
						notice('danger','School Name should not be empty!');
					}else if($school_id == ""){
						notice('danger','School ID should not be empty!');
					}else if($school_year == ""){
						notice('danger','School Year should not be empty!');
					}else{

					loader('on');

					var data_post = new FormData();	

					data_post.append('action','save');
					data_post.append('student_count',$("#student_count").val());
					data_post.append('current_teacher',$("#current_teacher").val());
					data_post.append('current_subject',$("#current_subject").val());
					data_post.append('current_section',$("#current_section").val());
					data_post.append('current_module',$("#current_module").val());
					data_post.append('current_record',$("#current_record").val());

					data_post.append('region',$region);
					data_post.append('division',$division);
					data_post.append('district',$district);
					data_post.append('school_name',$school_name);
					data_post.append('school_id',$school_id);
					data_post.append('school_year',$school_year);
					data_post.append('quarter',$("#selected_quarter_"+$current_subject_x).val());
					data_post.append('grade_section',$("#current_section").val());
					data_post.append('teacher',$("#current_teacher").val());
					data_post.append('subject',$("#current_subject").val());



					var student_id_values = []; 		
					$("input[name='student_id[]']").each(function() {
						 student_id_values.push($(this).val()); 		
					});

					data_post.append('student_id',student_id_values);


					switch(id){
						case "ww":
							
							var ww_1_values = []; 		
								$("input[name='ww_1[]']").each(function() {
								ww_1_values.push($(this).val()); 
							});
							data_post.append('ww_1',ww_1_values);
							console.log('ww1: '+ww_1_values);
							//==============================================
							var ww_2_values = []; 		
								$("input[name='ww_2[]']").each(function() {
								ww_2_values.push($(this).val()); 		
							});
							data_post.append('ww_2',ww_2_values);
							//==============================================	
							var ww_3_values = []; 		
								$("input[name='ww_3[]']").each(function() {
								ww_3_values.push($(this).val()); 		
							});
							data_post.append('ww_3',ww_3_values);
							//==============================================
							var ww_4_values = []; 		
								$("input[name='ww_4[]']").each(function() {
								ww_4_values.push($(this).val()); 		
							});
							data_post.append('ww_4',ww_4_values);
							//==============================================
							var ww_5_values = []; 		
								$("input[name='ww_5[]']").each(function() {
								ww_5_values.push($(this).val()); 		
							});
							data_post.append('ww_5',ww_5_values);
							//==============================================
							var ww_6_values = []; 		
								$("input[name='ww_6[]']").each(function() {
								ww_6_values.push($(this).val()); 		
							});
							data_post.append('ww_6',ww_6_values);
							//==============================================
							var ww_7_values = []; 		
								$("input[name='ww_7[]']").each(function() {
								ww_7_values.push($(this).val()); 		
							});
							data_post.append('ww_7',ww_7_values);
							//==============================================
							var ww_8_values = []; 		
								$("input[name='ww_8[]']").each(function() {
								ww_8_values.push($(this).val()); 		
							});
							data_post.append('ww_8',ww_8_values);
							//==============================================
							var ww_9_values = []; 		
								$("input[name='ww_9[]']").each(function() {
								ww_9_values.push($(this).val()); 		
							});
							data_post.append('ww_9',ww_9_values);
							//==============================================
							var ww_10_values = []; 		
								$("input[name='ww_10[]']").each(function() {
								ww_10_values.push($(this).val()); 		
							});
							data_post.append('ww_10',ww_10_values);
							//==============================================
							var ww_total_values = []; 		
								$("input[name='ww_total[]']").each(function() {
								ww_total_values.push($(this).val()); 		
							});
							data_post.append('ww_total',ww_total_values);
							//==============================================
							var ww_ps_values = []; 		
								$("input[name='ww_ps[]']").each(function() {
								ww_ps_values.push($(this).val()); 		
							});
							data_post.append('ww_ps',ww_ps_values);
							//==============================================
							var ww_ws_values = []; 		
								$("input[name='ww_ws[]']").each(function() {
								ww_ws_values.push($(this).val()); 		
							});
							data_post.append('ww_ws',ww_ws_values);

						break;

						case "pt":
							var pt_1_values = []; 		
							$("input[name='pt_1[]']").each(function() {
							 pt_1_values.push($(this).val()); 		
							 });

							console.log(pt_1_values);
							
							data_post.append('pt_1',pt_1_values);							
							//==============================================

							var pt_2_values = []; 		
							$("input[name='pt_2[]']").each(function() {
							 pt_2_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_2',pt_2_values);							
							//==============================================

							var pt_3_values = []; 		
							$("input[name='pt_3[]']").each(function() {
							 pt_3_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_3',pt_3_values);							
							//==============================================

							var pt_4_values = []; 		
							$("input[name='pt_4[]']").each(function() {
							 pt_4_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_4',pt_4_values);							
							//==============================================

							var pt_5_values = []; 		
							$("input[name='pt_5[]']").each(function() {
							 pt_5_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_5',pt_5_values);							
							//==============================================

							var pt_6_values = []; 		
							$("input[name='pt_6[]']").each(function() {
							 pt_6_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_6',pt_6_values);							
							//==============================================

							var pt_7_values = []; 		
							$("input[name='pt_7[]']").each(function() {
							 pt_7_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_7',pt_7_values);							
							//==============================================

							var pt_8_values = []; 		
							$("input[name='pt_8[]']").each(function() {
							 pt_8_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_8',pt_8_values);							
							//==============================================

							var pt_9_values = []; 		
							$("input[name='pt_9[]']").each(function() {
							 pt_9_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_9',pt_9_values);							
							//==============================================

							var pt_10_values = []; 		
							$("input[name='pt_10[]']").each(function() {
							 pt_10_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_10',pt_10_values);							
							//==============================================

							var pt_total_values = []; 		
							$("input[name='pt_total[]']").each(function() {
							 pt_total_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_total',pt_total_values);							
							//==============================================

							var pt_ps_values = []; 		
							$("input[name='pt_ps[]']").each(function() {
							 pt_ps_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_ps',pt_ps_values);							
							//==============================================

							var pt_ws_values = []; 		
							$("input[name='pt_ws[]']").each(function() {
							 pt_ws_values.push($(this).val()); 		
							 });
							
							data_post.append('pt_ws',pt_ws_values);							
							//==============================================
							

						break;

						case "qa":

							var qa_1_values = []; 		
							$("input[name='qa_1[]']").each(function() {
							 qa_1_values.push($(this).val()); 		
							 });
							
							data_post.append('qa_1',qa_1_values);							
							//==============================================

							var qa_ps_values = []; 		
							$("input[name='qa_ps[]']").each(function() {
							 qa_ps_values.push($(this).val()); 		
							 });
							
							data_post.append('qa_ps',qa_ps_values);							
							//==============================================

							var qa_ws_values = []; 		
							$("input[name='qa_ws[]']").each(function() {
							 qa_ws_values.push($(this).val()); 		
							 });
							
							data_post.append('qa_ws',qa_ws_values);		
						break;

						case "qi":

						break;
					}

					var hs_1_values = []; 		
					$("input[name='hs_"+id+"_1[]']").each(function() {
					 hs_1_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_1',hs_1_values);
					//==============================================
					var hs_2_values = []; 		
					$("input[name='hs_"+id+"_2[]']").each(function() {
					 hs_2_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_2',hs_2_values);
					//==============================================
					var hs_3_values = []; 		
					$("input[name='hs_"+id+"_3[]']").each(function() {
					 hs_3_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_3',hs_3_values);
					//==============================================
					var hs_4_values = []; 		
					$("input[name='hs_"+id+"_4[]']").each(function() {
					 hs_4_values.push($(this).val()); 		
					 });

					data_post.append('hs_'+id+'_4',hs_4_values);
					//==============================================
					var hs_5_values = []; 		
					$("input[name='hs_"+id+"_5[]']").each(function() {
					 hs_5_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_5',hs_5_values);
					//==============================================
					var hs_6_values = []; 		
					$("input[name='hs_"+id+"_6[]']").each(function() {
					 hs_6_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_6',hs_6_values);
					//==============================================
					var hs_7_values = []; 		
					$("input[name='hs_"+id+"_7[]']").each(function() {
					 hs_7_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_7',hs_7_values);
					//==============================================
					var hs_8_values = []; 		
					$("input[name='hs_"+id+"_8[]']").each(function() {
					 hs_8_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_8',hs_8_values);
					//==============================================
					var hs_9_values = []; 		
					$("input[name='hs_"+id+"_9[]']").each(function() {
					 hs_9_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_9',hs_9_values);
					//==============================================
					var hs_10_values = []; 		
					$("input[name='hs_"+id+"_10[]']").each(function() {
					 hs_10_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_10',hs_10_values);
					//==============================================
					var hs_total_values = []; 		
					$("input[name='hs_"+id+"_total[]']").each(function() {
					 hs_total_values.push($(this).val()); 		
					 });
					data_post.append('hs_'+id+'_total',hs_total_values);
					//==============================================

					

					$.ajax({
							url: getBaseURL()+"class_records/process",
							type: "POST",
							processData: false,
							contentType: false,
							data: data_post,
							success:function(data){

								switch(id){
									case "ww":
										$module = "written works";
									break;
									case "pt":
										$module = "performance task";
									break;
									case "qa":
										$module = "quarterly assessment";
									break;
									case "qi":
										$module = "quarterly initial";
									break;
								}
								
								loader('off');
								notice('success','Successfully saved <strong>'+$module+'</strong>');
								
							},error:function(data){
									
									$message = "Error while trying to save scores.";
									loader('off');
									notice('danger',$message);
							}

					});
					
				}//end of else

				if($("#current_record").val() == ""){
						class_record_process('find_first_record','');
					}

		break;


		case "highest_score":
			$("#hs_tr_here").remove();
			$current_teacher = id.split("_")[0];
			$current_subject = id.split("_")[1];
			$current_section = id.split("_")[2];
			$current_module =  id.split("_")[3];
			$current_record =  id.split("_")[4];

			$.ajax({
				url: getBaseURL()+"class_records/scores",
				type: "POST",
				data:{'section':$current_section,'teacher':$current_teacher,'subject':$current_subject,'module':$current_module,'record_id':$current_record},
				success:function(data){
					data = $.parseJSON(data);
					$num = data.length;
					if($num > 0){
								switch($current_module){
									case "ww":

										$total = parseFloat(data[0]['hs_1']) + parseFloat(data[0]['hs_2']) + parseFloat(data[0]['hs_3']) + parseFloat(data[0]['hs_4']) + parseFloat(data[0]['hs_5']) + parseFloat(data[0]['hs_6']) + parseFloat(data[0]['hs_7']) + parseFloat(data[0]['hs_8']) + parseFloat(data[0]['hs_9']) + parseFloat(data[0]['hs_10']) 

										$("#thead_ww_"+$current_subject).prepend('</tr> \n\
																		<tr id="hs_tr_here">\n\
														  				<th style="position:absolute; width: 400px; background:#fff;"><strong>HIGHEST POSSIBLE SCORE</strong></th>\n\
														  				<th style="padding-left:400px">\n\
														  					<center><input name="hs_ww_1[]"style="width:100px" class="wwinput" value="'+data[0]['hs_1']+'" onkeyup="calculate_highest()" type="text" id="highest_ww_1_'+$current_subject+'" onkeypress="return decimalonly(event,false)" ></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_2[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_2']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_2_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_3[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_3']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_3_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_4[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_4']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_4_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_5[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_5']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_5_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_6[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_6']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_6_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_7[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_7']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_7_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_8[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_8']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_8_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_9[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_9']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_9_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_10[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+data[0]['hs_10']+'" type="text" onkeyup="calculate_highest()" id="highest_ww_10_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_total[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+$total+'" type="text" id="highest_ww_total_'+$current_subject+'" disabled="disabled"></center>\n\
														  				</th>\n\
														  			</tr>');

									break;
									
									case "pt":

										$total = parseFloat(data[0]['hs_1']) + parseFloat(data[0]['hs_2']) + parseFloat(data[0]['hs_3']) + parseFloat(data[0]['hs_4']) + parseFloat(data[0]['hs_5']) + parseFloat(data[0]['hs_6']) + parseFloat(data[0]['hs_7']) + parseFloat(data[0]['hs_8']) + parseFloat(data[0]['hs_9']) + parseFloat(data[0]['hs_10']) 


										$("#thead_pt_"+$current_subject).prepend('<tr id="hs_tr_here">\n\
														  				<th style="position:absolute; width: 400px; background:#fff;"><strong>HIGHEST POSSIBLE SCORE</strong></th>\n\
														  				<th style="padding-left:400px">\n\
														  					<center><input name="hs_pt_1[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_1']+'" type="text" id="highest_pt_1_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_2[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_2']+'" type="text" id="highest_pt_2_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_3[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_3']+'" type="text" id="highest_pt_3_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_4[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_4']+'" type="text" id="highest_pt_4_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_5[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_5']+'" type="text" id="highest_pt_5_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_6[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_6']+'" type="text" id="highest_pt_6_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_7[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_7']+'" type="text" id="highest_pt_7_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_8[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_8']+'" type="text" id="highest_pt_8_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_9[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_9']+'" type="text" id="highest_pt_9_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_10[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_10']+'" type="text" id="highest_pt_10_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_total[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+$total+'" type="text" id="highest_pt_total_'+$current_subject+'" disabled="disabled"></center>\n\
														  				</th>\n\
														  			</tr>');		


									break;
	
									case "qa":
													$total = parseFloat(data[0]['hs_1']) + parseFloat(data[0]['hs_2']) + parseFloat(data[0]['hs_3']) + parseFloat(data[0]['hs_4']) + parseFloat(data[0]['hs_5']) + parseFloat(data[0]['hs_6']) + parseFloat(data[0]['hs_7']) + parseFloat(data[0]['hs_8']) + parseFloat(data[0]['hs_9']) + parseFloat(data[0]['hs_10']);

														$("#thead_qa_"+$current_subject).prepend('<tr id="hs_tr_here">\n\
															<th><strong>HIGHEST POSSIBLE SCORE</strong></th>\n\
														  				<th>\n\
														  					<center><input name="hs_qa_1[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="'+data[0]['hs_1']+'" type="text" id="highest_qa_1_'+$current_subject+'"></center>\n\
														  				</th>\n\
																		<th>\n\
														  					<center><input name="hs_qa_total[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+$total+'" type="text" id="highest_qa_total_'+$current_subject+'" disabled="disabled"></center>\n\
														  				</th>\n\
															');
										$("#highest_qa_1_"+$current_subject).val(data[0]['hs_1']);
									break;
	
									case "qi":
	
									break;
	
								}//end of switch
							}
							else{
										switch($current_module){
			
									case "ww":

										$total = 0;

										$("#thead_ww_"+$current_subject).prepend('<tr id="hs_tr_here">\n\
														  				<th style="position:absolute; width: 400px; background:#fff;"><strong>HIGHEST POSSIBLE SCORE</strong></th>\n\
														  				<th style="padding-left:400px">\n\
														  					<center><input name="hs_ww_1[]" id="highestscore" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" onkeyup="calculate_highest()" type="text" id="highest_ww_1_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_2[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_2_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_3[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_3_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_4[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_4_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_5[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_5_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_6[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_6_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_7[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_7_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_8[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_8_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_9[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_9_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_10[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="0" type="text" onkeyup="calculate_highest()" id="highest_ww_10_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_ww_total[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+$total+'" type="text" id="highest_ww_total_'+$current_subject+'" disabled="disabled"></center>\n\
														  				</th>\n\
														  			</tr>');

									break;
									
									case "pt":

										$total = 0;


										$("#thead_pt_"+$current_subject).prepend('<tr id="hs_tr_here">\n\
														  				<th style="position:absolute; width: 400px; background:#fff;"><strong>HIGHEST POSSIBLE SCORE</strong></th>\n\
														  				<th style="padding-left:400px">\n\
														  					<center><input name="hs_pt_1[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_1_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_2[]" onkeyup="calculate_highest()" style="width:100px" onkeypress="return decimalonly(event,false)" value="0" type="text" id="highest_pt_2_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_3[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_3_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_4[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_4_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_5[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_5_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_6[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_6_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_7[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_7_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_8[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_8_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_9[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_9_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_10[]" onkeypress="return decimalonly(event,false)" style="width:100px" onkeyup="calculate_highest()" value="0" type="text" id="highest_pt_10_'+$current_subject+'"></center>\n\
														  				</th>\n\
														  				<th>\n\
														  					<center><input name="hs_pt_total[]" onkeypress="return decimalonly(event,false)" style="width:100px" value="'+$total+'" type="text" id="highest_pt_total_'+$current_subject+'" disabled="disabled"></center>\n\
														  				</th>\n\
														  			</tr>');		


									break;
	
									case "qa":
														$("#thead_qa_"+$current_subject).prepend('<tr id="hs_tr_here">\n\
															<input type="hidden" value="0" id="highest_qa_2_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_3_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_4_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_5_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_6_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_7_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_8_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_9_'+$current_subject+'">\n\
															<input type="hidden" value="0" id="highest_qa_10_'+$current_subject+'">\n\
															\n\
															<th><strong>HIGHEST POSSIBLE SCORE</strong></th>\n\
														  				<th>\n\
														  					<center><input name="hs_qa_1[]" style="width: 100px;" onkeypress="return decimalonly(event,false)" onkeyup="calculate_highest()" value="0" type="text" id="highest_qa_1_'+$current_subject+'"></center>\n\
														  				</th>\n\
																		<th>\n\
														  					<center><input name="hs_qa_total[]" style="width: 100px;" onkeypress="return decimalonly(event,false)" value="0" type="text" id="highest_qa_total_'+$current_subject+'" disabled="disabled"></center>\n\
														  				</th>\n\
															</tr>');
									break;
	
									case "qi":
	
									break;
								}//end of switch
							}//end of else	
				}//end of success call back
			});

		break;	

		case "clear_data":
			$(".tbody_qa,.tbody_qi,.tbody_pt,.tbody_ww").html('');
		break;	

		case "student_data":

			$current_teacher = id.split("_")[0];
			$current_subject = id.split("_")[1];
			$current_section = id.split("_")[2];
			$current_module =  id.split("_")[3];
			$current_record =  id.split("_")[4];

						$.ajax({
						url: getBaseURL()+"class_records/datas",
						type: "POST",
						data:{'module':$module,'teacher':$current_teacher,'subject':$current_subject,'section':$current_section,'record_id':$current_record},
						success:function(data){
								data = $.parseJSON(data);
								if(data!=""){
									for(var i=0; i < data.length; i++){
										$student_id = data[i]['student_id'];
									switch($current_module){
	
										case "qi":
	
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_initial_ww').val(data[i]['ww']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_initial_pt').val(data[i]['pt']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_initial_qa').val(data[i]['qa']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_initial').val(data[i]['initial_grade']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_quarterly').val(data[i]['quarterly_grade']);
										break;	
	
	
										case "qa":
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_1').val(data[i]['qs_1']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_ps').val(data[i]['qs_ps']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_ws').val(data[i]['qs_ws']);
	
										break;
	
										case "pt":
	
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_1').val(data[i]['ps_1']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_2').val(data[i]['ps_2']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_3').val(data[i]['ps_3']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_4').val(data[i]['ps_4']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_5').val(data[i]['ps_5']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_6').val(data[i]['ps_6']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_7').val(data[i]['ps_7']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_8').val(data[i]['ps_8']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_9').val(data[i]['ps_9']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_10').val(data[i]['ps_10']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_total').val(data[i]['ps_total']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_ps').val(data[i]['ps_ps']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_ws').val(data[i]['ps_ws']);
	
										break;
	
										case "ww":
	
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_1').val(data[i]['ww_1']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_2').val(data[i]['ww_2']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_3').val(data[i]['ww_3']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_4').val(data[i]['ww_4']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_5').val(data[i]['ww_5']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_6').val(data[i]['ww_6']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_7').val(data[i]['ww_7']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_8').val(data[i]['ww_8']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_9').val(data[i]['ww_9']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_10').val(data[i]['ww_10']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_total').val(data[i]['ww_total']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_ps').val(data[i]['ww_ps']);
											$('#'+$current_subject+'_'+$current_module+'_'+$student_id+'_ws').val(data[i]['ww_ws']);
	
										break;
	
										}//end of switch									
	
									}//end of for loop
								}else{
									switch($current_module){

									case "qi":
										$('input[name="qi_ww[]"]').val(0);
										$('input[name="qi_pt[]"]').val(0);
										$('input[name="qi_qa[]"]').val(0);
										$('input[name="qi_initial[]"]').val(0);
										$('input[name="qi_quarterly[]"]').val(0);
									break;	


									case "qa":
										$('input[name="qa_1[]"]').val(0);
										$('input[name="qa_ps[]"]').val(0);
										$('input[name="qa_ws[]"]').val(0);

									break;

									case "pt":

										$('input[name="pt_1[]"]').val(0);
										$('input[name="pt_2[]"]').val(0);
										$('input[name="pt_3[]"]').val(0);
										$('input[name="pt_4[]"]').val(0);
										$('input[name="pt_5[]"]').val(0);
										$('input[name="pt_6[]"]').val(0);
										$('input[name="pt_7[]"]').val(0);
										$('input[name="pt_8[]"]').val(0);
										$('input[name="pt_9[]"]').val(0);
										$('input[name="pt_10[]"]').val(0);
										$('input[name="pt_total[]"]').val(0);
										$('input[name="pt_ps[]"]').val(0);
										$('input[name="pt_ws[]"]').val(0);

									break;

									case "ww":

										$('input[name="ww_1[]"]').val(0);
										$('input[name="ww_2[]"]').val(0);
										$('input[name="ww_3[]"]').val(0);
										$('input[name="ww_4[]"]').val(0);
										$('input[name="ww_5[]"]').val(0);
										$('input[name="ww_6[]"]').val(0);
										$('input[name="ww_7[]"]').val(0);
										$('input[name="ww_8[]"]').val(0);
										$('input[name="ww_9[]"]').val(0);
										$('input[name="ww_10[]"]').val(0);
										$('input[name="ww_total[]"]').val(0);
										$('input[name="ww_ps[]"]').val(0);
										$('input[name="ww_ws[]"]').val(0);

									break;

									}//end of switch	
								}//end of else
						}//end of success callback


					});
	

		break;

		case "load_section":
			$(".module_inline").remove();
			class_record_process('clear_data','');
			loader('on');
			$current_teacher = $("#current_teacher").val();
			$current_subject = $("#current_subject").val(); 	
			$current_module = $("#current_module").val();	
			$current_section = $("#current_section").val();
			$current_record = $("#current_record").val();

			$.ajax({
				url: getBaseURL()+"students/lists",
				type: "POST",
				data:{'section':id},
				success:function(data){
					data = $.parseJSON(data);
					if(data == ""){
							notice('danger','No students for this section.');
					}else{
						
						$("#student_count").val(data.length);
						for(var i=0; i < data.length; i++){
							$module_details = ""+$current_module+"_"+data[i]['student_id']+"_"+data[i]['lname']+"_"+data[i]['fname']+"_"+$current_record+"";
							$module_content = class_record_process('module_content',$module_details);
							$("#tbody_"+$current_module+"_"+$current_subject).prepend($module_content);
							
						}

						$combo_params = ""+$current_teacher+"_"+$current_subject+"_"+$current_section+"_"+$current_module+"_"+$current_record+"";
						class_record_process('student_data',$combo_params)
						class_record_process('highest_score',$combo_params)
						$("#record_content_"+$current_subject).removeAttr('style');
					}

					$("#"+$current_module).show();
					loader('off');

				}//end of success call back
			});

			
		break;

		case "module_content":
			$current_subject = $("#current_subject").val();
			$module = id.split("_")[0];
			$student_id = id.split("_")[1];
			$lname = id.split("_")[2];
			$fname = id.split("_")[3];
			$current_record = id.split("_")[4];
			switch($module){

				case "qa":

					$modulex = '<tr class="module_inline" id="inline_'+$module+'_'+$current_subject+'">\n\
									<input type="hidden" name="student_id[]" value="'+$student_id+'">\n\
									<td>\n\
										<input type="hidden" id="'+$current_subject+'_'+$module+'_'+$student_id+'" value="'+$student_id+'">\n\
										<label>'+$lname+', '+$fname+'</label>\n\
									</td>\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_2" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_3" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_4" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_5" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_6" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_7" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_8" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_9" value="0">\n\
									<input type="hidden"  style="width: 100px;" id="'+$current_subject+'_'+$module+'_'+$student_id+'_10" value="0">\n\
									<td><input name="qa_1[]" style="width: 100px;" onkeypress="return decimalonly(event,false)" onchange="computationqa(\'qa\',\''+$student_id+'\',\'1\',\''+$current_subject+'_'+$module+'_'+$student_id+'_1\')" type="text" id="'+$current_subject+'_'+$module+'_'+$student_id+'_1"></td>\n\
									<td><input type="text" style="width: 100px;" disabled="disabled" name="qa_ps[]" id="'+$current_subject+'_'+$module+'_'+$student_id+'_ps"></td>\n\
									<td><input type="text" style="width: 100px;" disabled="disabled" name="qa_ws[]" id="'+$current_subject+'_'+$module+'_'+$student_id+'_ws"></td>\n\
								</tr>';

				break;

				case "qi":
					$modulex = '<tr class="module_inline" id="inline_'+$module+'_'+$current_subject+'">\n\
									<input type="hidden" name="student_id[]" value="'+$student_id+'">\n\
									<td>\n\
										<input type="hidden" id="'+$current_subject+'_'+$module+'_'+$student_id+'" value="'+$student_id+'">\n\
										<label style="width: 250px;" >'+$lname+', '+$fname+'</label>\n\
									</td>\n\
									<td><input name="qi_ww[]" disabled="disabled" style="width: 100px;" type="text" id="'+$current_subject+'_'+$module+'_'+$student_id+'_initial_ww"></td>\n\
									<td><input name="qi_pt[]" disabled="disabled" style="width: 100px;" type="text" id="'+$current_subject+'_'+$module+'_'+$student_id+'_initial_pt"></td>\n\
									<td><input name="qi_qa[]" disabled="disabled" style="width: 100px;" type="text" id="'+$current_subject+'_'+$module+'_'+$student_id+'_initial_qa"></td>\n\
									<td><input name="qi_initial[]" disabled="disabled" style="width: 100px;" type="text" id="'+$current_subject+'_'+$module+'_'+$student_id+'_initial"></td>\n\
									<td><input type="text" style="width: 100px;" onkeypress="return decimalonly(event,false)" name="qi_quarterly[]" disabled="disabled" id="'+$current_subject+'_'+$module+'_'+$student_id+'_quarterly"></td>\n\
								</tr>';
				break;

				case "pt":
						$modulex = '<tr class="module_inline" id="inline_'+$module+'_'+$current_subject+'">\n\
										<input type="hidden" name="student_id[]" value="'+$student_id+'">\n\
									<td style="position:absolute; width: 400px; background:#fff;">\n\
										<input type="hidden" id="'+$current_subject+'_'+$module+'_'+$student_id+'" value="'+$student_id+'">\n\
										<label>'+$lname+', '+$fname+'</label>\n\
									</td>\n\
									<div>\n\
									<td style="padding-left:200px"><input type="text" style="width: 100px; margin-left: 200px;"  onkeypress="return decimalonly(event,false)" name="pt_1[]" onchange="computationpt1(\'pt\',\''+$student_id+'\',\'1\',\''+$current_subject+'_'+$module+'_'+$student_id+'_1\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_1"></td>\n\
									<td><input type="text" style="width: 100px;" onkeypress="return decimalonly(event,false)" name="pt_2[]" onchange="computationpt2(\'pt\',\''+$student_id+'\',\'2\',\''+$current_subject+'_'+$module+'_'+$student_id+'_2\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_2"></td>\n\
									<td><input type="text" style="width: 100px;" onkeypress="return decimalonly(event,false)" name="pt_3[]" onchange="computationpt3(\'pt\',\''+$student_id+'\',\'3\',\''+$current_subject+'_'+$module+'_'+$student_id+'_3\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_3"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_4[]" onkeypress="return decimalonly(event,false)" onchange="computationpt4(\'pt\',\''+$student_id+'\',\'4\',\''+$current_subject+'_'+$module+'_'+$student_id+'_4\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_4"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_5[]" onkeypress="return decimalonly(event,false)" onchange="computationpt5(\'pt\',\''+$student_id+'\',\'5\',\''+$current_subject+'_'+$module+'_'+$student_id+'_5\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_5"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_6[]" onkeypress="return decimalonly(event,false)" onchange="computationpt6(\'pt\',\''+$student_id+'\',\'6\',\''+$current_subject+'_'+$module+'_'+$student_id+'_6\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_6"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_7[]" onkeypress="return decimalonly(event,false)" onchange="computationpt7(\'pt\',\''+$student_id+'\',\'7\',\''+$current_subject+'_'+$module+'_'+$student_id+'_7\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_7"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_8[]" onkeypress="return decimalonly(event,false)" onchange="computationpt8(\'pt\',\''+$student_id+'\',\'8\',\''+$current_subject+'_'+$module+'_'+$student_id+'_8\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_8"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_9[]" onkeypress="return decimalonly(event,false)" onchange="computationpt9(\'pt\',\''+$student_id+'\',\'9\',\''+$current_subject+'_'+$module+'_'+$student_id+'_9\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_9"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_10[]" onkeypress="return decimalonly(event,false)" onchange="computationpt10(\'pt\',\''+$student_id+'\',\'10\',\''+$current_subject+'_'+$module+'_'+$student_id+'_10\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_10"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_total[]" onkeypress="return decimalonly(event,false)" id="'+$current_subject+'_'+$module+'_'+$student_id+'_total" disabled="disabled"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_ps[]" id="'+$current_subject+'_'+$module+'_'+$student_id+'_ps" disabled="disabled"></td>\n\
									<td><input type="text" style="width: 100px;" name="pt_ws[]" id="'+$current_subject+'_'+$module+'_'+$student_id+'_ws" disabled="disabled"></td>\n\
									</div>\n\
								</tr>';
				break;

				case "ww":
					$modulex = '<tr class="module_inline" id="inline_'+$module+'_'+$current_subject+'">\n\
									<td style="position:absolute; width: 400px; background:#fff;">\n\
										<input type="hidden" name="student_id[]" value="'+$student_id+'">\n\
										<input type="hidden" id="'+$current_subject+'_'+$module+'_'+$student_id+'" value="'+$student_id+'">\n\
										<label>'+$lname+', '+$fname+'</label> \n\
									</td>\n\
									<td style="padding-left:200px"><input type="text" style="width: 100px; margin-left: 200px;" name="ww_1[]" onkeypress="return decimalonly(event,false)" onchange="computationww1(\'ww\',\''+$student_id+'\',\'1\',\''+$current_subject+'_'+$module+'_'+$student_id+'_1\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_1"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_2[]" onkeypress="return decimalonly(event,false)" onchange="computationww2(\'ww\',\''+$student_id+'\',\'2\',\''+$current_subject+'_'+$module+'_'+$student_id+'_2\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_2"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_3[]" onkeypress="return decimalonly(event,false)" onchange="computationww3(\'ww\',\''+$student_id+'\',\'3\',\''+$current_subject+'_'+$module+'_'+$student_id+'_3\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_3"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_4[]" onkeypress="return decimalonly(event,false)" onchange="computationww4(\'ww\',\''+$student_id+'\',\'4\',\''+$current_subject+'_'+$module+'_'+$student_id+'_4\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_4"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_5[]" onkeypress="return decimalonly(event,false)" onchange="computationww5(\'ww\',\''+$student_id+'\',\'5\',\''+$current_subject+'_'+$module+'_'+$student_id+'_5\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_5"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_6[]" onkeypress="return decimalonly(event,false)" onchange="computationww6(\'ww\',\''+$student_id+'\',\'6\',\''+$current_subject+'_'+$module+'_'+$student_id+'_6\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_6"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_7[]" onkeypress="return decimalonly(event,false)" onchange="computationww7(\'ww\',\''+$student_id+'\',\'7\',\''+$current_subject+'_'+$module+'_'+$student_id+'_7\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_7"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_8[]" onkeypress="return decimalonly(event,false)" onchange="computationww8(\'ww\',\''+$student_id+'\',\'8\',\''+$current_subject+'_'+$module+'_'+$student_id+'_8\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_8"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_9[]" onkeypress="return decimalonly(event,false)" onchange="computationww9(\'ww\',\''+$student_id+'\',\'9\',\''+$current_subject+'_'+$module+'_'+$student_id+'_9\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_9"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_10[]" onkeypress="return decimalonly(event,false)" onchange="computationww10(\'ww\',\''+$student_id+'\',\'10\',\''+$current_subject+'_'+$module+'_'+$student_id+'_10\')" id="'+$current_subject+'_'+$module+'_'+$student_id+'_10"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_total[]" onkeypress="return decimalonly(event,false)" id="'+$current_subject+'_'+$module+'_'+$student_id+'_total" disabled="disabled"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_ps[]" id="'+$current_subject+'_'+$module+'_'+$student_id+'_ps" disabled="disabled"></td>\n\
									<td><input type="text" style="width: 100px;" name="ww_ws[]" id="'+$current_subject+'_'+$module+'_'+$student_id+'_ws" disabled="disabled"></td>\n\
								</tr>';
				break;
			}

			return $modulex;
				
		break;

		case "find_first_record":
			
			$current_teacher = $("#current_teacher").val();
			$current_section = $("#current_section").val();
			$current_subject = $("#current_subject").val();
			$selected_quarter = $("#selected_quarter_"+$current_subject).val();

			$.ajax({
				url: getBaseURL()+"class_records/first_record",
				type: "POST",
				data:{'teacher':$current_teacher,'section':$current_section,'subject':$current_subject,'quarter':$selected_quarter},
				success:function(data){
					data = $.parseJSON(data);
					console.log(data);
					$("#current_record").val(data[0]['id']);
				}
			})

		break;

		case "open_module":
			// console.log('Module is: '+id);
			$current_module = $("#current_module").val();
			//class_record_process('save_score',$current_module);
			$current_subject = $("#current_subject").val();
			$(".module").hide();
			$("#"+id+"_"+$current_subject).show();
			$("#current_module").val(id);
			$section = $("#section_list_"+$current_subject).val();
			class_record_process('load_section',$section);
			$("#save_score_btn_"+$current_subject).attr('onclick','class_record_process(\'save_score\',\''+id+'\')');
		break;

		case "select_section":

			$current_subject = $("#current_subject").val();
			$section = $("#section_list_"+$current_subject).val();
			$record = $("#quarter_list_"+$current_subject).val();

			$("#current_section").val($section);
			$("#current_record").val($record);

			if($record!=""){
				class_record_process('record_details',$record);
			}

			class_record_process('get_section',$section);
			class_record_process('load_section',$section);
			$(".module").hide();
			$("#ww_"+$current_subject).show();
			$(".save_btn").attr('onclick','class_record_process(\'save_score\',\'ww\')');
		break;

		case "subject_wc":

			$.ajax({
				url: getBaseURL()+"subjects/lists",
				type: "POST",
				data:{'id':id},
				success:function(data){
					data = $.parseJSON(data);
					$("#current_wc_ww").val(data[0]['wc_ww']);
					$("#current_wc_pt").val(data[0]['wc_pt']);
					$("#current_wc_qa").val(data[0]['wc_qa']);
				}
			})

		break;

		case "record_details":
			$current_subject = $("#current_subject").val();
			$.ajax({
				url: getBaseURL()+"class_records/records",
				type: "POST",
				data:{'record_id':id},
				success:function(data){
					data = $.parseJSON(data);

					$region = data[0]['region'];
					$division = data[0]['division'];
					$district = data[0]['district'];
					$school_name = data[0]['school_name'];
					$school_id = data[0]['school_id'];
					$school_year = data[0]['school_year'];
					$quarter = data[0]['quarter'];

					$("#selected_region_"+$current_subject).val($region);
					$("#selected_division_"+$current_subject).val($division);
					$("#selected_school_name_"+$current_subject).val($school_name);
					$("#selected_district_"+$current_subject).val($district);
					$("#selected_school_id_"+$current_subject).val($school_id);
					$("#selected_school_year_"+$current_subject).val($school_year);
					$("#selected_quarter_"+$current_subject).val($quarter);

					$("#quarter_here_"+$current_subject).html("<strong>( QUARTER "+$quarter+" )</strong>");	
				}
			});
		break;

		case "class_record":
			loader('on');
			$teacher_id = $("#current_teacher").val();
			var id = $("#current_subject").val();
			$grade_section = $("#section_list_"+id).val();
			$("#quarter_list_"+id+" option[class='appended_li']").remove();
			$("#acad_year_"+id+" option[class='appended_li']").remove();
			$.ajax({
				url: getBaseURL()+"class_records/records",
				type: "POST",
				data:{'subject_id':id,'teacher_id':$teacher_id,'grade_section':$grade_section},
				success:function(data){
					data = $.parseJSON(data);
					console.log(data);
					if(data.length > 0){
						$("#acad_year_").empty();
						for(var i=0; i < data.length; i++){
							$("#acad_year_"+id).append('<option class="appended_li" value="'+data[i]['id']+'">'+data[i]['school_year']+'</option>');
						}//end of for loop
						for(var i=0; i < data.length; i++){
							$("#quarter_list_"+id).append('<option class="appended_li" value="'+data[i]['id']+'">Quarter '+data[i]['quarter']+'</option>');
						}//end of for loop
						$("#quarter_list_"+id).attr('disabled',false);
					}else{
						$("#selected_school_year_"+id).val(date_current('year'));
						$("#selected_quarter_"+id).val('I');
						$("#quarter_list_"+id).append('<option class="appended_li" value="" selected="selected">Quarter I </option>');
					}
					loader('off');
				}
			});
		break;

		case "get_section":
			$current_subject = $("#current_subject").val();
			$.ajax({
				url: getBaseURL()+"sections/lists",
				type: "POST",
				data:{'id':id},
				success:function(data){
					data = $.parseJSON(data);
					console.log('Section is: '+data[0]['name']+' - '+data[0]['level'])
					$("#selected_grade_section_"+$current_subject).html(data[0]['name']+' - '+data[0]['level']);
				}
			});

		break;

		case "get_subject":
			$current_subject = $("#current_subject").val();
			$.ajax({
				url: getBaseURL()+"subjects/lists",
				type: "POST",
				data:{'id':id},
				success:function(data){
					data = $.parseJSON(data);
						$("#record_subject_name_"+$current_subject).html(data[0]['name'])
				}//end of success
					
			});
	
		break;

		case "get_teacher":

			$current_subject = $("#current_subject").val();
			$.ajax({
			url: getBaseURL()+"accounts/lists",
			type: "POST",
			data:{'id':id},
			success:function(data){
				data = $.parseJSON(data);	
				$("#record_teacher_name_"+$current_subject).html(data[0]['fname']+" "+data[0]['lname']);	
			}

		});

		break;

		case "find_sections":
			$("#current_subject").val(id);

			class_record_process('subject_wc',id);
			$(".panel-collapse").attr("class","panel-collapse collapse");

			$("#record_content_"+id).css({'pointer-events': 'none','opacity': '0.4'});	
			loader('on');
			$("#collapse_"+id).attr('class','panel-collapse collapsing');
			$.ajax({
				url: getBaseURL()+"class_records/sections",
				type: "POST",
				data:{'subject_id':id},
				success:function(data){

					data = $.parseJSON(data);
					for(var i=0; i < data.length; i++){
						$section_id = data[i]['section'];
      					$("#section_list_"+id).append('<option value="'+data[i]['section']+'">'+data[i]['section_name']+'</option>');

					}

					// class_record_process('class_record',id);
					$("#collapse_"+id).attr('class','panel-collapse collapse in');
					loader('off');
				}

			});
					class_record_process('get_subject',id);
					class_record_process('get_teacher',$("#current_teacher").val());
		break;
	}
}



function advisory_process(action,id){
	switch(action){

		case "weighted_scores":
			loader('on');
			$.ajax({	
				url: getBaseURL()+"subjects/lists",
				type: "POST",
				data:{'id':id},
				success:function(data){
					data = $.parseJSON(data);
						$subject = $("#name_sub_"+id).html();

						$ww = parseFloat(data[0]['wc_ww']) * 100;

						$pt = parseFloat(data[0]['wc_pt']) * 100;

						$qa = parseFloat(data[0]['wc_qa']) * 100;

						$("#fancy-title").text('Weighted Scores:');
						$("#fancy-body").html('<br><div class="form-group">\n\
							<label>Written Works:</label>\n\
							'+$ww+'%\n\
							</div><div class="form-group">\n\
							<label>Performance Task:</label>\n\
							'+$pt+'%\n\
							</div><div class="form-group">\n\
							<label>Quarterly Assessment:</label>\n\
							'+$qa+'%\n\
							</div>');

					$("#pancy").click();
					loader('off');
				}
			})

		
		break;


		case "create_my_subject":
		
		$("#fancy-title").text('Subject/Section Handled:')
		$("#fancy-body").html('<form class="form-horizontal" action="#" id="create_subject" style="width: 350px; height: 250px;">\n\
				<div class="form-group">\n\
			          <div class="col-lg-9">\n\
			            <div class="ui-select">\n\
			              <select id="subject_list" class="form-control btn btn-primary" style="width: 350px;">\n\
			                <option value="">Select Subject: </option>\n\
			              </select>\n\
			            </div>\n\
			          </div>\n\
			      </div>\n\
			      <div class="form-group">\n\
			      <div class="col-lg-8">\n\
			            <div class="ui-select">\n\
			              <select id="section_list" class="form-control btn btn-primary" style="width: 350px;">\n\
			                <option value="">Select Section: </option>\n\
			              </select>\n\
			            </div>\n\
			          </div>\n\
			      </div>\n\
			      </div>\n\
			<div class="btn-holder">\n\
				<button class="btn btn-success" type="button" onclick="advisory_process(\'save_my_subject\',\'\')"><i class="fa fa-save fa-lg"></i> Save</button>\n\
			</div>\n\
		</form>');
		subject_process('list','0');
		section_process('list','0');

		$("#pancy").click();


		break;

		case "save_my_subject":
//			loader('on');

			$section = $("#subject_list").val();
			$subject = $("#section_list").val();

			$.ajax({
				url: getBaseURL()+"subjects/process",
				type: "POST",
				data:{'action':action,'section':$section,'subject':$subject,'id':id},
				success:function(data){

				if(data == "success"){
							location.reload();
						}else{
							$message = "Error while trying to save details.";
							loader('off');
							notice('danger',$message);
						}

					},error:function(data){
							$message = "Error while trying to save details.";
							loader('off');
							notice('danger',$message);
					}
			});


		break;

		case "add_section_to_my_subject":
			advisory_process('create_my_subject','');
			$("#subject_list").remove();
			$("#create_subject").prepend('<select class="btn btn-primary" disabled="disabled" id="subject_list" style="width: 350px;"><option selected="selected" value="'+id+'">'+$("#name_sub_"+id).html()+'</option></select>');
		break;


		case "remove_section_to_my_subject":

			$section = id.split("_")[0];
			$subject = id.split("_")[1];

			console.log('Section: '+$section+' Subject:'+$subject);
			if(confirm('Are you sure to remove this section?')){

						loader('on');

						$.ajax({
							url: getBaseURL()+"subjects/process",
							type: "POST",
							data:{'action':action,'section':$section,'subject':$subject},
							success:function(data){
							if(data == "success"){
								$("#my_section_"+$section+'_'+$subject).remove();
							}		
							else{//subject exist
									notice('danger','Error has been encountered while trying to remove section');
								}

							loader('off');
							},error:function(data){
										$message = "Error has been encountered while trying to remove section";
										loader('off');
										notice('danger',$message);
							}

						});


			}

		break;

		case "remove_my_subject":
		
		if(confirm('Are you sure to remove this subject?')){

					loader('on');

					$.ajax({
						url: getBaseURL()+"subjects/process",
						type: "POST",
						data:{'action':action,'subject':id},
						success:function(data){
						if(data == "success"){
							$("#my_subject_"+id).remove();
						}		
						else{//subject exist
								notice('danger','Error has been encountered while trying to remove subject');
							}

						loader('off');
						},error:function(data){
									$message = "Error has been encountered while trying to remove subject";
									loader('off');
									notice('danger',$message);
						}

					});


		}

		break;

		case "archive":
		
		if(confirm('Do you want to archive this subject?')){

					loader('on');

					$.ajax({
						url: getBaseURL()+"subjects/process",
						type: "POST",
						data:{'action':action,'subject':id},
						success:function(data){
						if(data == "success"){
							$("#my_subject_"+id).hide();
							
							//$("#my_subject_"+id).remove();
						}		
						else{//subject exist
								notice('danger','Error has been encountered while trying to archive the subject');
							}

						loader('off');
						},error:function(data){
									$message = "Error has been encountered while trying to archive the subject";
									loader('off');
									notice('danger',$message);
						}

					});


		}

		break;

		case "view_students":

			student_process('student_list',id)

		break;


		case "my_sections":
			loader('on')
			$.ajax({
				url: getBaseURL()+"subjects/my_sections",
				type: "POST",
				data:{'subject_id':id},
				success:function(data){
					data = $.parseJSON(data);
					for(var i=0; i < data.length; i++){

						$section_id = ''+data[i]['section']+'_'+id+'';

      					$("#section_here_"+id).append('<div class="col-md-3" id="my_section_'+data[i]['section']+'_'+id+'">\n\
      							<div class="input-group">\n\
      								<span class="input-group-addon">\n\
      									<a href="javascript:void(0)" style="color:green;text-decoration:none;" onclick="advisory_process(\'view_students\',\''+$section_id+'\')"> <i class="fa fa-list"></i> </a>&nbsp;\n\
      									<a href="javascript:void(0)" style="color:red;text-decoration:none;" onclick="advisory_process(\'remove_section_to_my_subject\',\''+$section_id+'\')"><i class="fa fa-remove"></i> </a>\n\
      								</span>\n\
      								<input type="text" readonly="readonly" value="Section '+data[i]['section_name']+'" class="form-control">\n\
      							</div>\n\
      						</div>');

					}

					$("#details_"+id).remove();
					loader('off');
				}

			});


		break;
	}
}

function teacher_process(action,id){

	switch(action){

		case "create":
			account_process('create','');
		break;

		case "save":
			account_process('save','');
		break;

		case "remove":
			account_process('save',id);
		break;

		case "update":
			account_process('update',id);
		break;

		case "subjects":

			loader('on');

			$.ajax({
				url: getBaseURL()+"teachers/subject_list",
				type: "POST",
				data:{'user_id':id},
				success:function(data){
					data = $.parseJSON(data);
					$("#fancy-body").html('<div class="row" style="width:500px;">\n\
						<table class="table table-striped">\n\
					        <thead>\n\
					          <tr>\n\
					            <th>Name</th>\n\
					            <th>Action</th>\n\
					      	  </tr>\n\
					      	</thead>\n\
					      	<tbody id="my_subjects">\n\
					      	<tr>\n\
					      		<td><input type="hidden" id="sub_user_id" value="'+id+'"><select id="subject_list" style="height:54px;"><option>Select Subject:</option></select></td>\n\
					      		<td><button class="btn btn-primary btn-xs"  onclick="teacher_process(\'check_subject\',\'\')"><i class="fa fa-plus"></i> Save</button></td>\n\
					      	</tr>\n\
					      	</tbody>\n\
					    </table></div>');
					$("#pancy").click();

					subject_process('list','0');
					
					if(data!=""){
						$subjects = data[0]['subjects'].split("|");
						$count_subject = $subjects.length;
						if($count_subject!=0){

								for(var i=0; i < $subjects.length; i++){
									
									$subject_name = subject_process('list',$subjects[i]);
									if($subject_name==undefined){
										$name = "";
									}else{
										$name = $subject_name;
									}					

									$("#my_subjects").append('<tr id="tr_sub_'+$subjects[i]+'"><td id="my_subject_'+$subjects[i]+'">'+$name+'</td><td><button onclick="teacher_process(\'remove_subject\',\''+$subjects[i]+'_'+id+'\')" class="btn btn-danger btn-xs"><i class="fa fa-remove"></i> Remove</button></td></tr>');

									$("#tr_sub_").remove();

								}//end of for loop
						}//end of inner if
					
					}//end of outer if

					loader('off');
				}
		
			});

		break;


		case "check_subject":

			$user_id = $("#sub_user_id").val();
			$subject_id = $("#subject_list").val();
			
			$.ajax({
				url: getBaseURL()+"teachers/process",
				type: "POST",
				data:{'action':action,'user_id':$user_id,'subject_id':$subject_id},
				success:function(data){
					
					if(data == "success"){//subject not exist
						teacher_process('save_subject','');
					}else{//subject exist
						alert('You already have that subject!');
					}

				},error:function(data){
							$message = "Error while trying to save subject.";
							loader('off');
							notice('danger',$message);
				}
			});//end of ajax

		break;

		case "save_subject":

			loader('on');

			$user_id = $("#sub_user_id").val();
			$subject_id = $("#subject_list").val();

			$.ajax({
				url: getBaseURL()+"teachers/process",
				type: "POST",
				data:{'action':action,'user_id':$user_id,'subject_id':$subject_id},
				success:function(data){
					teacher_process('subjects',$user_id);
				},error:function(data){
							$message = "Error while trying to save subject.";
							loader('off');
							notice('danger',$message);
				}
			});//end of ajax


		break;

		case "remove_subject":
			
			if(confirm('Are you sure to remove this subject?')){
				$.ajax({
					url: getBaseURL()+"teachers/process",
					type: "POST",
					data:{'action':'remove_subject','user_id':id},
					success:function(data){
						if(data == "success"){

							$subject_id = id.split("_")[0];	
							$("#tr_sub_"+$subject_id).remove();
							loader('off')
						}else{
							$message = "Error while trying to remove subject.";
							loader('off');
							notice('danger',$message);
						}

					},error:function(data){
							$message = "Error while trying to remove subject.";
							loader('off');
							notice('danger',$message);
					}
				});
			}	

		break;

		case "sections":

			loader('on');

			$.ajax({
				url: getBaseURL()+"teachers/section_list",
				type: "POST",
				data:{'user_id':id},
				success:function(data){
					data = $.parseJSON(data);
					$("#fancy-body").html('<div class="row" style="width:500px;">\n\
						<table class="table table-striped">\n\
					        <thead>\n\
					          <tr>\n\
					            <th>Section</th>\n\
					            <th>Action</th>\n\
					      	  </tr>\n\
					      	</thead>\n\
					      	<tbody id="my_sections">\n\
					      	<tr>\n\
					      		<td><input type="hidden" id="sec_user_id" value="'+id+'"><select id="section_list" style="height:54px;"><option>Select Section:</option></select></td>\n\
					      		<td><button class="btn btn-primary btn-xs"  onclick="teacher_process(\'check_section\',\'\')"><i class="fa fa-plus"></i> Save</button></td>\n\
					      	</tr>\n\
					      	</tbody>\n\
					    </table></div>');
					$("#pancy").click();

					section_process('list','0');
					
					if(data!=""){
						$sections = data[0]['sections'].split("|");
						$count_section = $sections.length;
						if($count_section!=0){

								for(var i=0; i < $sections.length; i++){
									
									$section_name = section_process('list',$sections[i]);
									if($section_name==undefined){
										$name = "";
									}else{
										$name = $section_name;
									}					

									$("#my_sections").append('<tr id="tr_sec_'+$sections[i]+'"><td id="my_section_'+$sections[i]+'">'+$name+'</td><td><button onclick="teacher_process(\'remove_section\',\''+$sections[i]+'_'+id+'\')" class="btn btn-danger btn-xs"><i class="fa fa-remove"></i> Remove</button></td></tr>');

									$("#tr_sec_").remove();

								}//end of for loop
						}//end of inner if
					
					}//end of outer if

					loader('off');
				}
		
			});

		break;


		case "check_section":

			$user_id = $("#sec_user_id").val();
			$section_id = $("#section_list").val();
			
			$.ajax({
				url: getBaseURL()+"teachers/process",
				type: "POST",
				data:{'action':action,'user_id':$user_id,'section_id':$section_id},
				success:function(data){
					
					if(data == "success"){//subject not exist
						teacher_process('save_section','');
					}else{//subject exist
						alert('You already have that section!');
					}

				},error:function(data){
							$message = "Error while trying to save section.";
							loader('off');
							notice('danger',$message);
				}
			});//end of ajax

		break;

		case "save_section":

			loader('on');

			$user_id = $("#sec_user_id").val();
			$section_id = $("#section_list").val();

			$.ajax({
				url: getBaseURL()+"teachers/process",
				type: "POST",
				data:{'action':action,'user_id':$user_id,'section_id':$section_id},
				success:function(data){
					teacher_process('sections',$user_id);
				},error:function(data){
							$message = "Error while trying to save section.";
							loader('off');
							notice('danger',$message);
				}
			});//end of ajax


		break;

		case "remove_section":
			
			if(confirm('Are you sure to remove this section?')){
				$.ajax({
					url: getBaseURL()+"teachers/process",
					type: "POST",
					data:{'action':action,'user_id':id},
					success:function(data){
						if(data == "success"){

							$section_id = id.split("_")[0];	
							$("#tr_sec_"+$section_id).remove();
							loader('off')
						}else{
							$message = "Error while trying to remove section.";
							loader('off');
							notice('danger',$message);
						}

					},error:function(data){
							$message = "Error while trying to remove section.";
							loader('off');
							notice('danger',$message);
					}
				});
			}	

		break;

	}//end of switch

}



function student_process(action,id){

	switch(action){

		case "create":
				$("#fancy-title").text('Student');
				$("#fancy-body").html(' <form class="form-horizontal" style="width: 550px; height: 500px; padding:30px">\n\
				  <input type="hidden" id="student_id" value="'+id+'">\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">First Name:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="text" id="first_name" placeholder="Enter First Name" style="border: 1px solid #cccccc;" autofocus>\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Middle Name:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="text" id="middle_name" placeholder="Enter Middle Name" style="border: 1px solid #cccccc;">\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Last Name:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="text" id="last_name" placeholder="Enter Last Name" style="border: 1px solid #cccccc;">\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Age:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="number" id="age" placeholder="Enter Age" style="border: 1px solid #cccccc;">\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Gender:</label>\n\
			          <div class="col-lg-8">\n\
			            <div class="ui-select">\n\
			              <select id="gender" class="form-control btn btn-primary" style="width:100%;">\n\
			                <option value="0">Male</option>\n\
			                <option value="1">Female</option>\n\
			              </select>\n\
			            </div>\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Address:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="text" id="address" placeholder="Enter Address" style="border: 1px solid #cccccc;">\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Mother Name:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="text" id="mother_name" placeholder="Enter Mother Name" style="border: 1px solid #cccccc;">\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Father Name:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="text" id="father_name" placeholder="Enter Father Name" style="border: 1px solid #cccccc;">\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label" for="email">Parent Contact:</label>\n\
			          <div class="col-lg-8">\n\
			            <input class="form-control" type="number" id="parent_contact" placeholder="Enter Parent Contact" style="border: 1px solid #cccccc;">\n\
			          </div>\n\
			      </div>\n\
				  <div class="form-group">\n\
			          <label class="col-lg-3 control-label " for="email">My Advisories:</label>\n\
			          <div class="col-lg-8">\n\
			            <div class="ui-select">\n\
			              <select id="selected_advisory" class="form-control advisory_list btn btn-primary" style="width:100%;">\n\
			              </select>\n\
			            </div>\n\
			          </div>\n\
			      </div>\n\
			      <div class="btn-holder">\n\
					<button class="btn btn-success" type="submit" onclick="student_process(\'save\',\'\')"><i class="fa fa-save fa-lg"></i> Save</button></div>\n\
				</form>');

				$current_adviser_id = $("#current_adviser_id").val();

				student_process('my_advisories',$current_adviser_id);
				$("#pancy").click();

		break;

		case "my_advisories":

			$.ajax({
				url: getBaseURL()+"sections/lists",
				type: "POST",
				data:{'adviser_id':id},
				success:function(data){
					data = $.parseJSON(data);

					for(var i=0; i < data.length; i++){
						$(".advisory_list").append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>');
					}

				}
			});


		break;

		case "update":
			loader('on');
			student_process('create',id);

			$first_name = $("#fname_"+id).html();
			$middle_name = $("#mname_"+id).html();
			$last_name = $("#lname_"+id).html();
			$age = $("#age_"+id).html();
			$gender = $("#sex_"+id).html();
			$address = $("#address_"+id).html();
			$mother_name = $("#father_name_"+id).html();
			$father_name = $("#mother_name_"+id).html();
			$parent_contact = $("#parent_contact_"+id).html();
			$section_id = $("#selected_advisory").val();

			$("#first_name").val($first_name);
			$("#middle_name").val($middle_name);
			$("#last_name").val($last_name);
			$("#age").val($age);
			// $("#gender").find('option[text="'+$gender+'"]').val();
			$("#gender option[text="+$gender+"]").attr('selected','selected');
			$("#address").val($address);
			$("#mother_name").val($mother_name);
			$("#father_name").val($father_name);
			$("#parent_contact").val($parent_contact);
			$("#section_id").val($section_id);

			loader('off');
		break;

		case "save":

			loader('on');

			form_init('advisory');

			$.ajax({

				url: getBaseURL()+"students/process",
				type: "POST",
				data:{'action':action,'section_id': $section_id,'student_id': $student_id,'first_name': $first_name,'middle_name': $middle_name,'last_name': $last_name,'age': $age,'gender': $gender,'address': $address,'mother_name': $mother_name,'father_name': $father_name,'parent_contact': $parent_contact},
				success:function(data){
					if(data =="success"){
						location.reload();
					}else{
							$message = "Error while trying to save data.";
							loader('off');
							notice('danger',$message);
					}

				},error:function(data){
							$message = "Error while trying to save data.";
							loader('off');
							notice('danger',$message);
				}

			});


		break;

		case "remove":
			if(confirm('Are you sure you want to remove this student?')){

					loader('on');

					$.ajax({
						url: getBaseURL()+"students/process",
						type: "POST",
						data:{'action':action,'student_id': id},
						success:function(data){
							if(data =="success"){
									$("#inline_data_"+id).remove();
							}else{
									$message = "Error while trying to remove student.";
									notice('danger',$message);
							}
									loader('off');
						},error:function(data){
									$message = "Error while trying to remove student.";
									loader('off');
									notice('danger',$message);
						}

					});
			}

		break;

		case "student_list":
			loader('on');	
			$.ajax({
				url: getBaseURL()+"students/lists",
				type: "POST",
				data:{'section':id},
				success:function(data){
					data = $.parseJSON(data);

						if(data == ""){
							loader('off');
							notice('danger','No student(s) found in this section!');
						}else{
												
								$("#fancy-title").text('Students List:')
									$("#fancy-body").html('<table class="table table-striped table-bordered table-condensed table-hover " style="width:100%;">\n\
											<thead class="bg-primary" style="font-size: 14px; padding: 20em">\n\
												<tr>\n\
													<th>Name</th>\n\
													<th>Age</th>\n\
													<th>Gender</th>\n\
													<th>Address</th>\n\
													<th>Father</th>\n\
													<th>Mother</th>\n\
													<th>Contact</th>\n\
												</tr>\n\
											</thead>\n\
											<tbody id="student_list_'+id+'"></tbody>\n\
										</table>');

						    for(var i=0; i < data.length;i++){

						    	$("#student_list_"+id).append('<tr>\n\
						    		<td>'+data[i]['lname']+', '+data[i]['fname']+'</td>\n\
						    		<td>'+data[i]['age']+'</td>\n\
						    		<td>'+data[i]['sex']+'</td>\n\
						    		<td>'+data[i]['address']+'</td>\n\
						    		<td>'+data[i]['father_name']+'</td>\n\
						    		<td>'+data[i]['mother_name']+'</td>\n\
						    		<td>'+data[i]['parent_contact']+'</td>\n\
						    		</tr>');
						    }//end of for_loop								

							$("#pancy").click();

							loader('off');
						}//end of success

					},error:function(data){
							$message = "Error while trying to fetch data.";
							loader('off');
							notice('danger',$message);
				}
			});//end of ajax
		break;

	}
}



function subject_process(action,id){

	switch(action){

		case "list":
			$.ajax({
				url: getBaseURL()+"subjects/lists",
				type: "POST",
				data:{'id':id},
				success:function(data){
					
					data = $.parseJSON(data);

					if(id==""){
						for(var i=0; i < data.length; i++){
							
							$("#subject_list").append('<td>'+data[i]['name']+'</td>\n\
											<td><a href="javascript:void(0);" onclick="subject_process(\'teacher_sub_remove\',\''+id+'\')"> <i class="fa fa-trash-o"></i> Delete</a></td>\n\
											');					
						}//end of for
					
					}
					else if(id=="0"){
						for(var i=0; i < data.length; i++){
							$("#subject_list").append('<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>');			
					}//end of for
					
					}else{
						$("#record_subject_name").html(data[0]['name'])
						$("#my_subject_"+id).html(data[0]['name']);
					}	


				}//end of success
					
			});
	
		break;
	
		case "save":
			loader('on');
			$id = $("#subject_id").val();
			$name = $("#subject_name").val();
			$wc_ww = $("#wc_ww").val();
			$wc_pt = $("#wc_pt").val();
			$wc_qa = $("#wc_qa").val();

			$.ajax({
				url: getBaseURL()+"subjects/process",
				type: "POST",
				data:{'id':$id,'name':$name,'wc_ww':$wc_ww,'wc_pt':$wc_pt,'wc_qa':$wc_qa,'action':'save'},
				success:function(data){
					if(data == "success"){
						location.reload();
						// $("#inline_create_"+id).remove();
						loader('off')
					}else{
						$message = "Error while trying to save subject.";
						loader('off');
						notice('danger',$message);
					}

				},error:function(data){
						$message = "Error while trying to save subject.";
						loader('off');
						notice('danger',$message);
				}

			});


		break;


		case "update":

			loader('on');
			subject_process('create',id);
			// subject_process('list',id);


			// $("#subject_name").val($name);
			// $("#wc_ww").val($wc_ww);
			// $("#wc_pt").val($wc_pt);
			// $("#wc_qa").val($wc_qa);

			loader('off');

		break;

		case "remove":

			if(confirm('Are you sure to remove this subject?')){
				loader('on');
				$.ajax({
					url: getBaseURL()+"subjects/process",
					type: "POST",
					data:{'id':id,'action':'remove'},
					success:function(data){
					if(data == "success"){
						$("#inline_tr_"+id).remove();
						loader('off');
					}else{
						$message = "Error while trying to remove subject.";
						loader('off');
						notice('danger',$message);
					}

				},error:function(data){
						$message = "Error while trying to remove subject.";
						loader('off');
						notice('danger',$message);
				}

				});				
			}

		break;


		case "create":

			$name = $("#subject_name_"+id).html();
			$wc_ww = $("#wc_ww_"+id).val() * 100;
			$wc_pt = $("#wc_pt_"+id).val() * 100;
			$wc_qa = $("#wc_qa_"+id).val() * 100;

			console.log($wc_qa);

			$("#fancy-title").text('Save Subject:');
			$("#fancy-body").html('<br><form action="#" style="padding:30px">\n\
				<input type="hidden" id="subject_id" value="'+id+'">\n\
				<strong>Subject </strong><div class="input-group" style="width:30em;"><span class="input-group-addon" style="width:4em;"><i class="fa fa-book"></i></span><input class="form-control" id="subject_name" placeholder="Subject Name" type="text" value="'+$name+'" style="border: 1px solid #cccccc;" autofocus ></div><br>\n\
				<strong>Percentage </strong><div class="input-group" style="width:30em;"><span class="input-group-addon" style="width:4em;"><i class="fa fa-percent"></i></span><input class="form-control" id="wc_ww" placeholder="Weight Component Written Works" type="text" value="'+$wc_ww+'" style="border: 1px solid #cccccc;"></div><br>\n\
				<strong>Percentage </strong><div class="input-group" style="width:30em;"><span class="input-group-addon" style="width:4em;"><i class="fa fa-percent"></i></span><input class="form-control" id="wc_pt" placeholder="Weight Component Performance Task" type="text" value="'+$wc_pt+'" style="border: 1px solid #cccccc;"></div><br>\n\
				<strong>Percentage </strong><div class="input-group" style="width:30em;"><span class="input-group-addon" style="width:4em;"><i class="fa fa-percent"></i></span><input class="form-control" id="wc_qa" placeholder="Weight Component Quarterly Assessment" type="text" value="'+$wc_qa+'" style="border: 1px solid #cccccc;"></div><br>\n\
				<div class="btn-holder">\n\
					<button class="btn btn-success" type="button" onclick="subject_process(\'save\',\'\')"><i class="fa fa-save fa-lg"></i> Save</button></div></form>');
			$("#pancy").click();


		break;


	}//end of switch

}


function account_process(action,id){
	switch(action){

		case "deactivate":
			if(confirm('Are you sure to deactivate this account?')){

					loader('on');
					$.ajax({
						url: getBaseURL()+"accounts/process",
						type: "POST",
						data:{'action':action,'id':id},
						success:function(data){
							if(data == "success"){
								if(id == $("#current_id").val()){
									window.location.href = "manage/logout";
								}else{
									$("#inline_create_"+id).remove();
									loader('off');
									$type="success";
									$message = "Successfully deactivated account!";
								}
							}else{
								loader('off');
								$type="danger";
								$message = "Error has been encountered while trying to deactivate this account!";
							}

	
							notice($type,$message);
						},error:function(data){
							loader('off');
							notice('danger','Error has been encountered while trying to deactivate this account!');
						}
					})
			}		
		break;


		case "user_details":
			$.ajax({
			url: getBaseURL()+"accounts/lists",
			type: "POST",
			data:{'id':id},
			success:function(data){
				data = $.parseJSON(data);	
				console.log('Name: '+data[0]['fname']+" "+data[0]['lname']);
				$("#record_teacher_name").html(data[0]['fname']+" "+data[0]['lname']);	
			}

		});

		break;

		case "create":
		$("#inline_create_0").show();
		
		break;

		case "update":
		$account_id = $("#account_id").val();
		loader('on');
		$("#inline_create_0").hide();

		if($account_id!=""){
			$("#inline_create_"+$account_id).show();
		}

		console.log('ID: '+id);	
		$("#cance_account").attr('onclick','account_process(\'cancel\',\''+id+'\')')
		$("#inline_create_"+id).hide();

		$.ajax({

			url: getBaseURL()+"accounts/lists",
			type: "POST",
			data:{'id':id},
			success:function(data){
				data = $.parseJSON(data);

				$id = $("#account_id").val(data[0]['us_id']);
				$email = $("#email").val(data[0]['email']);
				$password = $("#password").val(data[0]['password']);
				$fname = $("#fname").val(data[0]['fname']);
				$mname = $("#mname").val(data[0]['mname']);
				$lname = $("#lname").val(data[0]['lname']);
				$address = $("#address").val(data[0]['address']);
				$gender = $("#gender").val(data[0]['gender']);

				$("#grade_lvl option[value='"+data[0]['grade_lvl']+"']").attr('selected','selected');
				$("#user_type option[value='"+data[0]['user_type']+"']").attr('selected','selected');

				$("#img_here").attr('src',getBaseURL()+'assets/'+data[0]['img']).show();
				$("#file_upload").hide();
				$("#inline_create_0").show();
				$("#cancel_account").attr('onclick','account_process(\'cancel\',\''+id+'\')');
				
				loader('off');
			}

		});


		break;

		case "save":
				loader('on');
				form_init('account');
				var data_post = new FormData();	
				data_post.append('action','save');
				data_post.append('id',$id);
				data_post.append('email',$email);
				data_post.append('password',$password);
				data_post.append('fname',$fname);
				data_post.append('mname',$mname);
				data_post.append('lname',$lname);
				data_post.append('address',$address);
				data_post.append('gender',$gender);
				data_post.append('grade_lvl',$grade_lvl);
				data_post.append('user_type',$user_type);
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
								location.reload();
							}else{
								$message = "Error while trying to save account.";
								loader('off');
								notice('danger',$message);
							}

						},error:function(data){
								$message = "Error while trying to save account.";
								loader('off');
								notice('danger',$message);
						}

				});


		break;

		case "remove":

			if(confirm('Are you sure to remove this user?')){
				loader('on');
				$.ajax({
					url: getBaseURL()+"accounts/process",
					type: "POST",
					data:{'id':id,'action':'remove'},
					success:function(data){
							if(data == "success"){
								$("#inline_create_"+id).remove();
								loader('off')
							}else{
								$message = "Error while trying to remove account.";
								loader('off');
								notice('danger',$message);
							}

						},error:function(data){
								$message = "Error while trying to remove account.";
								loader('off');
								notice('danger',$message);
						}
				});
			}

		break;

		case "cancel":
				$("#inline_create_0").hide();
				if(id!="0"){
					$("#inline_create_"+id).show();
				}
		break;
	}//end of switch

}




function form_init(module){

	switch(module){
	 	case "account":
			$file_upload = $("#file_upload").prop('files')[0];
			if(!$file_upload){$upload_stat='dont_upload';}else{$upload_stat='upload';}
			$id = $("#account_id").val();
			$email = $("#email").val();
			$password = $("#password").val();
			$fname = $("#fname").val();
			$mname = $("#mname").val();
			$lname = $("#lname").val();
			$address = $("#address").val();
			$gender = $("#gender").val();
			$grade_lvl = $("#grade_lvl").val();
			$user_type = $("#user_type").val();
			break;

		case "advisory":
			$student_id = $("#student_id").val();
			$first_name = $("#first_name").val();
			$middle_name = $("#middle_name").val();
			$last_name = $("#last_name").val();
			$age = $("#age").val();
			$gender = $("#gender").val();
			$address = $("#address").val();
			$mother_name = $("#mother_name").val();
			$father_name = $("#father_name").val();
			$parent_contact = $("#parent_contact").val();
			$section_id = $("#selected_advisory").val();
		break;

	}//end of switch
}



function computationww1(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var id = $("#current_subject").val();
var wwhighestscore = $('input[name="hs_ww_1[]"]').val();
	

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}

function computationww2(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_2[]"]').val();

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww3(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_3[]"]').val();

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww4(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_4[]"]').val();

	
	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww5(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_5[]"]').val();
	
	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww6(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_6[]"]').val();

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highestscore');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww7(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_7[]"]').val();

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww8(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_8[]"]').val();

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww9(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_9[]"]').val();

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationww10(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var wwinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var wwhighestscore = $('input[name="hs_ww_10[]"]').val();

	if(wwinputedscore > wwhighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();

	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}

function computationpt1(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var id = $("#current_subject").val();
var pthighestscore = $('input[name="hs_pt_1[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}

function computationpt2(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_2[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt3(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_3[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt4(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_4[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt5(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_5[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt6(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_6[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt7(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_7[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt8(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_8[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt9(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_9[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}
function computationpt10(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var ptinputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var pthighestscore = $('input[name="hs_pt_10[]"]').val();

	if(ptinputedscore > pthighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();

	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}

function computationqa(pm1,pm2,pm3,inputid){
//	alert('pm1 = '+pm1+ 'pm2 = '+ pm2+ 'pm3 = '+ pm3);
var qainputedscore = $('#'+inputid+'').val();

// alert(wwinputedscore);
var id = $("#current_subject").val();
var qahighestscore = $('input[name="hs_qa_1[]"]').val();

	if(qainputedscore > qahighestscore){

		alert('raw score must be lesser than or equal to highest score');
		$("#save_score_btn_"+id).attr('disabled',true);
		// $("input[name='ww_1[]']").focus();
	}
	else{
		calculate_score(pm1,pm2,pm3);
		$("#save_score_btn_"+id).attr('disabled',false);
	}


}


// $(function(){

// 	$('.wwinputted').on('change',function(){

// 		alert('Value : '+ $('.wwinputted').val());
// 	});

// });

 var loadFile = function(event) {
    var output = document.getElementById('img_here');
    output.src = URL.createObjectURL(event.target.files[0]);
  };