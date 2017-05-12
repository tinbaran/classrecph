
class_rec.controller("SectionCtrl",function($scope,$http){
	loader('on');
	$scope.page_title = "Section List";
	
	$http.get(getBaseURL()+"sections/lists").success(function(data){
		$scope.list = data;
		loader('off');
	});

	$scope.process = function(action,id){
		section_process(action,id);
	}

	
});


class_rec.controller("ReportCtrl",function($scope,$http){

	loader('on');
	$type_sess = $("#type_sess").val();

	if($type_sess == "0"){
	
		$title = "List of Users";
	}

	var year_levels = function(id,target){
			grade_process('year_levels','grade_lvl');
	}


	$scope.page_title = $title;
	$http.get(getBaseURL()+"accounts/lists").success(function(data){
	    year_levels('','');
		$scope.accounts = data;
		loader('off');
	});

	$scope.process = function(action,id){
		account_process(action,id);
	}



});


class_rec.controller("GradeCtrl",function($scope,$http){
	loader('on');
	$http.get(getBaseURL()+"subjects/advisories").success(function(data){
		$scope.subject_list = data;
		loader('off');
	});
});

class_rec.controller("FinalCtrl",function($scope,$http){
	loader('on');
	$http.get(getBaseURL()+"subjects/advisories").success(function(data){
		$scope.subject_list = data;
		loader('off');
	});
});


class_rec.controller("StudentCtrl",function($http,$scope){

	$scope.page_title = "Student List";
	$current_adviser_id = $("#current_adviser_id").val();

	$scope.student_list = function(section){
		loader('on');
		$http({
			url: getBaseURL()+"Students/lists",
			method: "POST",
			data:$.param({'section':section}),
			headers: {'Content-Type':'application/x-www-form-urlencoded'}
		}).success(function(data){
			$scope.students = data;

			$("#xxx li").removeAttr('class');
			$("#section_"+section).attr('class','active');
			loader('off');
		});

	}

	$scope.section_list = function(){
			$http({
				url: getBaseURL()+"sections/lists",
				method: "POST",
				data: $.param({'adviser_id':$current_adviser_id}),
				headers: {'Content-Type':'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.list = data;
				$first = data[0]['id'];


				$scope.student_list($first);

			});
	}
	
	$scope.section_list();
});

	

class_rec.controller("ClassRecordCtrl",function($http,$scope){
	class_record_process('clear_data','');
	$scope.page_title = "My Class Record"

	$http.get(getBaseURL()+"class_records/lists").success(function(data){

		$scope.subjects = data;

	});

	$scope.process = function(action,id){
		class_record_process(action,id)
	}


});


class_rec.controller("AdvisoryCtrl",function($scope,$http){
	$current_adviser_id = $("#current_adviser_id").val();
	$type_sess = $("#type_sess").val();

	if($type_sess == "1"){
		$title = "List of Students";
	}

	$scope.page_title = $title;

	// $http.get(getBaseURL()+"advisories/lists").success(function(data){
	
	// 	$scope.students = data;
	// })

	$scope.process = function(action,id){
		if(action == "create_section"){
			section_process('create',id);
		}
		else if(action == "view"){

			$http({
				url: getBaseURL()+"sections/details",
				method: "POST",
				data: $.param({'adviser_id':$current_adviser_id}),
				headers: {'Content-Type':'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.list = data;

				loader('off');
			});

			section_process('view_details',id);
		}
		else{
				student_process(action,id);
		}
	}
	
	

	$scope.student_list = function(section){
		loader('on');
		$http({
			url: getBaseURL()+"Students/lists",
			method: "POST",
			data:$.param({'section':section}),
			headers: {'Content-Type':'application/x-www-form-urlencoded'}
		}).success(function(data){
			$scope.students = data;
			console.log(data);
			$("#advisory_ul li").removeAttr('class');
			$("#section_"+section).attr('class','active');
			loader('off');
		});

	}

	$http({
		url: getBaseURL()+"sections/lists",
		method: "POST",
		data: $.param({'adviser_id':$current_adviser_id}),
		headers: {'Content-Type':'application/x-www-form-urlencoded'}
	}).success(function(data){
		$scope.list = data;
		$first = data[0]['id'];

		$scope.student_list($first);

	});
	

	

});

class_rec.controller("HandledCtrl",function($scope,$http){
	
	$current_adviser_id = $("#current_adviser_id").val();	

	$scope.page_title = "Section Lists";
	loader('on');
	$http({
		url: getBaseURL()+"sections/lists",
		method: "POST",
		data: $.param({'adviser_id':$current_adviser_id}),
		headers: {'Content-Type':'application/x-www-form-urlencoded'}
	}).success(function(data){
		$scope.list = data;

		loader('off');
	});

	$scope.process = function(action,id){
		section_process(action,id);
	}

	


});


class_rec.controller("SubjectCtrl",function($scope,$http){

	$type_sess = $("#type_sess").val();
	$current_adviser_id = $("#current_adviser_id").val();

	$scope.process = function(action,id){
		loader('on');
		$http({
			url: getBaseURL()+"sections/lists",
			method: "POST",
			data: $.param({'adviser_id':$current_adviser_id}),
			headers: {'Content-Type':'application/x-www-form-urlencoded'}
		}).success(function(data){
			$scope.list = data;

			loader('off');
		});

		advisory_process(action,id)

	}
	
	switch($type_sess){

	case "1":

			$scope.section_list = function(subject_id){
				advisory_process('my_sections',subject_id);
			}

			loader('on');
			$http.get(getBaseURL()+"subjects/advisories").success(function(data){
				$scope.subject_list = data;
				loader('off');
			});
			$scope.my_subjects = true;
			$title = "My Subjects";
		
	break;
	case "0":
		$scope.subject_management = true;
		$title = "Subject List";
		$http.get(getBaseURL()+"subjects/lists/").success(function(data){
		  
			$scope.subjects = data;
			loader('off');
		});
		$scope.process = function(action,id){
			subject_process(action,id);
		}
   break;
	

	}	
	
	$scope.page_title = $title;


});


class_rec.controller("AccountCtrl",function($scope,$http){
	loader('on');
	$type_sess = $("#type_sess").val();

	if($type_sess == "1"){
		$title = "My Account";
	}else{
		$title = "Accounts";
	}

	var year_levels = function(id,target){
			grade_process('year_levels','grade_lvl');
	}


	$scope.page_title = $title;
	$http.get(getBaseURL()+"accounts/lists").success(function(data){
	    year_levels('','');
		$scope.accounts = data;
		loader('off');
	});

	$scope.process = function(action,id){
		account_process(action,id);
	}


});

class_rec.controller("TeacherCtrl",function($scope,$http){
	loader('on');
	
	var year_levels = function(id,target){
			grade_process('year_levels','grade_lvl');
	}

	$scope.page_title = 'Teacher List';
	$http.get(getBaseURL()+"accounts/lists/teachers").success(function(data){
	  
		year_levels('','');
		$scope.accounts = data;
		loader('off');
	});

	$scope.process = function(action,id){
		teacher_process(action,id);
	}


});







class_rec.config(function($routeProvider){
	$routeProvider
	.when("/accounts",{
		templateUrl: getBaseURL()+"accounts"
	})
	.when("/class_records",{
		templateUrl: getBaseURL()+"class_records"
	})
	.when("/works",{
		templateUrl: getBaseURL()+"works"
	})
	.when("/students",{
		templateUrl: getBaseURL()+"students"
	})
	.when("/reports",{
		templateUrl: getBaseURL()+"reports"
	})
	.when("/subjects",{
		templateUrl: getBaseURL()+"subjects"
	})
	.when("/summary_quarterly",{
		templateUrl: getBaseURL()+"summary_quarterly"
	})
	
	.when("/advisory",{
		templateUrl: getBaseURL()+"advisories"
	})
	.when("/teachers",{
		templateUrl: getBaseURL()+"teachers"
	})
	.when("/sections",{
		templateUrl: getBaseURL()+"sections"
	})
	.when("/sections_list",{
		templateUrl: getBaseURL()+"sections_list"
	})
	.when("/summary_final",{
		templateUrl: getBaseURL()+"summary_final"
	})
	
	
	.otherwise({
		templateUrl: getBaseURL()+"manage/dashboard"
	});



});