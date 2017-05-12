	$(function(){
		record_details();
		student_list();
		highest_score('ww');
		highest_score('pt');
		highest_score('qa');
	})

	function record_details(){
		
		$record_id = $("#record_id").val();
		$teacher_id = $("#teacher").val();
		$subject_id = $("#subject_id").val();
		$grade_section = $("#section_id").val();

		$.ajax({
			url: getBaseURL()+"class_records/records2",
			type: "POST",
			data:{'record_id':$record_id,'teacher_id':$teacher_id,'subject_id':$subject_id,'grade_section':$grade_section},
			success:function(data){
				data = $.parseJSON(data);
				
				$("#quarter_here").html(data[0]['quarter']);
				$("#region_here").html(data[0]['region']);
				$("#school_name_here").html(data[0]['school_name']);
				$("#division_here").html(data[0]['division']);
				$("#district_here").html(data[0]['district']);
				$("#school_id_here").html(data[0]['school_id']);
				$("#grade_section_here").html(data[0]['section_name']+' - Grade '+data[0]['year_level']);
				$("#teacher_name_here").html(data[0]['fname']+' '+data[0]['lname']);
				$("#school_year_here").html(data[0]['school_year']);
				$("#subject_name_here").html(data[0]['subject_name']);



	
			}
		})
	}
	

	function print_page(){
		$("#span_print").remove();
		window.print();
	}

	function get_section(section){
	$subject_id = $("#subject_id").val();
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
		}

	function get_suject(subject){
		$subject_id = $("#subject_id").val();
			$.ajax({
				url: getBaseURL()+"subjects/lists",
				type: "POST",
				data:{'id':id},
				success:function(data){
					data = $.parseJSON(data);
						$("#record_subject_name_"+$subject_id).html(data[0]['name'])
				}//end of success
					
			});
	}
	
	function load_grades(teacher, subject,section,academic_year){
				$teacher = $("#teacher").val();
				$subject_id = $("#subject_id").val();
				$section_id = $("#section_id").val();
				$academic_year = $("#academic_year").val();

				$.ajax({
					url: getBaseURL()+"Printing/lists",
					type: "POST",
					data:{'teacher':$teacher,'subject':$subject_id,'section':$section_id,'academic_year':$academic_year},
					success:function(data){
						data = $.parseJSON(data);
						console.log(data);
						for(var x=0; x < data.length; x++){
							console.log("#quarter_"+data[x]['quarter']+"_"+data[x]['student_id']+"");
							// $final_grade = Math.round(data[x]['total_initial']);
							$("#quarter_"+data[x]['quarter']+"_"+data[x]['student_id']).html(data[x]['quarterly_grade']);

						}

						final_list('final_list',$section_id);
					}
				});
			}	
	
	function student_list(){
		loader('on');
		$section_id = $("#section_id").val();
		$.ajax({
			url: getBaseURL()+"students/lists",
			type: "POST",
			data:{'section':$section_id},
			success:function(data){
			//	$numx = 1;
				data = $.parseJSON(data);
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

							load_grades('load_grades','');
							$("#student_list_tbl").removeAttr('style');

				
		
				loader('off');
			}//end of success
		})
	}

	function final_list(section){
			$.ajax({
				url: getBaseURL()+"students/lists",
				type: "POST",
				data:{'section':$section_id},
				success:function(data){
					data = $.parseJSON(data);


							for(var i=0; i < data.length; i++){

								$quarter_1 = $('#quarter_I_'+data[i]['student_id']+'').html();
								$quarter_2 = $('#quarter_II_'+data[i]['student_id']+'').html();
								$quarter_3 = $('#quarter_III_'+data[i]['student_id']+'').html();
								$quarter_4 = $('#quarter_IV_'+data[i]['student_id']+'').html();


								$sum = parseFloat($quarter_1) + parseFloat($quarter_2) + parseFloat($quarter_3) + parseFloat($quarter_4)
								
								// console.log('Sum: '+$sum);
								$final = $sum / 4;
								$('.student_x_'+data[i]['student_id']).val($final);	
								$('#final_'+data[i]['student_id']+'').html($final);

								if($quarter_1 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
									}
							//		$('.student_x_'+data[i]['student_id']).val($quarter_1);	
							//		$('#quarter_I_'+data[i]['student_id']+'').html($quarter_1);
						//		}
						//		else if($quarter_2 == $('#quarter_II_'+data[i]['student_id']+'').html()){
									if($quarter_1 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
									}
							//		$('.student_x_'+data[i]['student_id']).val($quarter_2);	
							//		$('#quarter_II_'+data[i]['student_id']+'').html($quarter_2);
						//		}
						//		else if($quarter_3 == $('#quarter_III_'+data[i]['student_id']+'').html()){
									if($quarter_3 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
									}
							//		$('.student_x_'+data[i]['student_id']).val($quarter_3);	
							//		$('#quarter_III_'+data[i]['student_id']+'').html($quarter_3);
						//		}
						//		else if($quarter_4 == $('#quarter_IV_'+data[i]['student_id']+'').html()){
									if($quarter_4 < 75){
										$status = '<strong style="color:red;">Failed</strong>'
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
									}
							//		$('.student_x_'+data[i]['student_id']).val($quarter_4);	
							//		$('#quarter_IV_'+data[i]['student_id']+'').html($quarter_4);
						//		}
						//		else if($final == $('#final_'+data[i]['student_id']+'').html()){ 
									 
									
									if($final < 75){
										$status = '<strong style="color:red;">Failed</strong>'
									}else{
										$status = '<strong style="color:green;">Passed</strong>';
									}
									
							//		$('.student_x_'+data[i]['student_id']).val($final);	
							//		$('#final_'+data[i]['student_id']+'').html($final);
						//		}

									$("#status_"+data[i]['student_id']).html($status);

							}//end of forloop	
					



				}
			});
	}

	function quarterly_grades(subject,section,teacher,record_id){
		$.ajax({
			url: getBaseURL()+"Printing/quarterly_grade",
			type: "POST",
			data:{'subject':subject,'section':section,'teacher':teacher,'record_id':record_id},
			success:function(data){
				data = $.parseJSON(data);
				for(var i=0; i < data.length; i++){
					$("#student_initial_grade_"+data[i]['student_id']).html(data[i]['initial_grade'])
					$("#student_quarterly_grade_"+data[i]['student_id']).html(data[i]['quarterly_grade'])
				}
			}
		});
	}

	function get_scores(subject,section,teacher,record_id,module){
		$.ajax({
			url: getBaseURL()+"Printing/score_list",
			type: "POST",
			data:{'subject':subject,'section':section,'teacher':teacher,'record_id':record_id,'module':module},
			success:function(data){
				data = $.parseJSON(data);
				switch(module){
					case "ww":
						for(var i=0; i < data.length; i++){
							$("#student_ww_1_"+data[i]['student_id']).html(data[i]['ww_1']);
							$("#student_ww_2_"+data[i]['student_id']).html(data[i]['ww_2']);
							$("#student_ww_3_"+data[i]['student_id']).html(data[i]['ww_3']);
							$("#student_ww_4_"+data[i]['student_id']).html(data[i]['ww_4']);
							$("#student_ww_5_"+data[i]['student_id']).html(data[i]['ww_5']);
							$("#student_ww_6_"+data[i]['student_id']).html(data[i]['ww_6']);
							$("#student_ww_7_"+data[i]['student_id']).html(data[i]['ww_7']);
							$("#student_ww_8_"+data[i]['student_id']).html(data[i]['ww_8']);
							$("#student_ww_9_"+data[i]['student_id']).html(data[i]['ww_9']);
							$("#student_ww_10_"+data[i]['student_id']).html(data[i]['ww_10']);
							$("#student_ww_total_"+data[i]['student_id']).html(data[i]['ww_total']);
							$("#student_ww_ps_"+data[i]['student_id']).html(data[i]['ww_ps']);
							$("#student_ww_ws_"+data[i]['student_id']).html(data[i]['ww_ws']);
						}
					break;

					case "pt":
						for(var j=0; j < data.length; j++){
							$("#student_pt_1_"+data[j]['student_id']).html(data[j]['ps_1']);
							$("#student_pt_2_"+data[j]['student_id']).html(data[j]['ps_2']);
							$("#student_pt_3_"+data[j]['student_id']).html(data[j]['ps_3']);
							$("#student_pt_4_"+data[j]['student_id']).html(data[j]['ps_4']);
							$("#student_pt_5_"+data[j]['student_id']).html(data[j]['ps_5']);
							$("#student_pt_6_"+data[j]['student_id']).html(data[j]['ps_6']);
							$("#student_pt_7_"+data[j]['student_id']).html(data[j]['ps_7']);
							$("#student_pt_8_"+data[j]['student_id']).html(data[j]['ps_8']);
							$("#student_pt_9_"+data[j]['student_id']).html(data[j]['ps_9']);
							$("#student_pt_10_"+data[j]['student_id']).html(data[j]['ps_10']);
							$("#student_pt_total_"+data[j]['student_id']).html(data[j]['ps_total']);
							$("#student_pt_ps_"+data[j]['student_id']).html(data[j]['ps_ps']);
							$("#student_pt_ws_"+data[j]['student_id']).html(data[j]['ps_ws']);
						}
					break;

					case "qa":
						for(var k=0; k < data.length; k++){
							$("#student_qa_1_"+data[k]['student_id']).html(data[k]['qs_1']);
							$("#student_qa_ps_"+data[k]['student_id']).html(data[k]['qs_ps']);
							$("#student_qa_ws_"+data[k]['student_id']).html(data[k]['qs_ws']);
						}
					break;

				}//end of switch

			}//end of success
		})
	}


	function highest_score(module){
		$subject_id = $("#subject_id").val();
		$section_id = $("#section_id").val();
		$teacher = $("#teacher").val();
		$record_id = $("#record_id").val();
		$.ajax({
				url: getBaseURL()+"Printing/highest_score",
				type: "POST",
				data:{'section':$section_id,'teacher':$teacher,'subject':$subject_id,'module':module,'record_id':$record_id},
				success:function(data){
					data = $.parseJSON(data);
					switch(module){
						case "ww":
							$hs_ww_total = parseFloat(data[0]['hs_1']) + parseFloat(data[0]['hs_2']) + parseFloat(data[0]['hs_3']) + parseFloat(data[0]['hs_4']) + parseFloat(data[0]['hs_5']) + parseFloat(data[0]['hs_6']) + parseFloat(data[0]['hs_7']) + parseFloat(data[0]['hs_8']) + parseFloat(data[0]['hs_9']) + parseFloat(data[0]['hs_10']);

							$("#highest_ww_1").html(data[0]['hs_1']);
							$("#highest_ww_2").html(data[0]['hs_2']);
							$("#highest_ww_3").html(data[0]['hs_3']);
							$("#highest_ww_4").html(data[0]['hs_4']);
							$("#highest_ww_5").html(data[0]['hs_5']);
							$("#highest_ww_6").html(data[0]['hs_6']);
							$("#highest_ww_7").html(data[0]['hs_7']);
							$("#highest_ww_8").html(data[0]['hs_8']);
							$("#highest_ww_9").html(data[0]['hs_9']);
							$("#highest_ww_10").html(data[0]['hs_10']);
							$("#highest_ww_total").html($hs_ww_total);
						break;	

						case "pt":

							$hs_pt_total = parseFloat(data[0]['hs_1']) + parseFloat(data[0]['hs_2']) + parseFloat(data[0]['hs_3']) + parseFloat(data[0]['hs_4']) + parseFloat(data[0]['hs_5']) + parseFloat(data[0]['hs_6']) + parseFloat(data[0]['hs_7']) + parseFloat(data[0]['hs_8']) + parseFloat(data[0]['hs_9']) + parseFloat(data[0]['hs_10']);
							
							$("#highest_pt_1").html(data[0]['hs_1']);
							$("#highest_pt_2").html(data[0]['hs_2']);
							$("#highest_pt_3").html(data[0]['hs_3']);
							$("#highest_pt_4").html(data[0]['hs_4']);
							$("#highest_pt_5").html(data[0]['hs_5']);
							$("#highest_pt_6").html(data[0]['hs_6']);
							$("#highest_pt_7").html(data[0]['hs_7']);
							$("#highest_pt_8").html(data[0]['hs_8']);
							$("#highest_pt_9").html(data[0]['hs_9']);
							$("#highest_pt_10").html(data[0]['hs_10']);
							$("#highest_pt_total").html($hs_pt_total);

						break;

						case "qa":
							$("#highest_qa_1").html(data[0]['hs_1']);
						break;
					}//end of switch

				}//end of success
		})
	}