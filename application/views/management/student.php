
<div class="container" ng-controller="StudentCtrl">

	<input type="hidden" value="<?php echo $this->session->userdata('sess_id');?>" id="current_adviser_id">
	
        <h3 class="page-header">{{page_title}}</h3>
        <div align="right">
            <form class="form-inline">
               
                <div class="form-group system_retrieve">
                    <label for="pwd">Search:</label>
                    <input type="text" class="form-control" ng-model="filter_here" placeholder="">
                </div>
                
            </form>
            
 </div>

	<ul id="xxx" class="nav nav-tabs">
		<li ng-repeat="y in list" id="section_{{y.id}}"><a ng-click="student_list(y.id)" href="javascript:void(0);" onclick="">{{y.name}}</a></li>

	</ul>
<br><br>



<div class="table table-responsive">
      <table class="table table-striped table-bordered table-condensed table-hover" >
        <thead class="bg-primary" style="font-size: 14px; padding: 20em">
          <tr>
            <th><strong>Last Name</strong></th>  
            <th><strong>Middle Name</strong></th>
            <th><strong>First Name</strong></th>
            <th><strong>Age</strong></th>
            <th><strong>Gender</strong></th>
            <th><strong>Address</strong></th>
            <th><strong>Father</strong></th>
            <th><strong>Mother</strong></th>
            <th><strong>Contact</strong></th>
          </tr>
        </thead>
        <tbody>

          <tr ng-repeat="x in students|filter:filter_here" id="inline_data_{{x.id}}">

                <input type="hidden" id="section" value="{{x.section_id}}">
            <td id="lname_{{x.id}}">{{x.lname}}</td>         
            <td id="mname_{{x.id}}">{{x.mname}}</td>
            <td id="fname_{{x.id}}">{{x.fname}}</td>
            <td id="age_{{x.id}}">{{x.age}}</td>
            <td id="sex_{{x.id}}">{{x.sex}}</td>
            <td id="address_{{x.id}}">{{x.address}}</td>
            <td id="father_name_{{x.id}}">{{x.father_name}}</td>
            <td id="mother_name_{{x.id}}">{{x.mother_name}}</td>
            <td id="parent_contact_{{x.id}}">{{x.parent_contact}}</td>



          </tr>
        </tbody>
      </table>
</div>

</div>