
<div class="container" ng-controller="AdvisoryCtrl">
<input type="hidden" value="<?php echo $this->session->userdata('sess_id');?>" id="current_adviser_id">
     <h3 class="page-header"> {{page_title}} </h3>

        <div align="right">
            <form class="form-inline">
               <?php if($create){?> 
                <div class="form-group system_retrieve">
                    <label for="pwd">Search:</label>
                    <input type="text" class="form-control" ng-model="filter_here" placeholder="">
                </div>
                <?php } ?>
                <?php if($create){?>
                <button type="button" style="z-index:0;height:36px;"  ng-click="process('create','')" class="btn btn-success system_create"><i class="fa fa-plus"></i> Add Student</button>

                <button type="button" style="z-index:0;height:36px;" ng-click="process('create_section','')" class="btn btn-info system_create"><i class="fa fa-plus"></i> Add Section</button>
                <?php }?>
            </form>
         </div>

    <ul class="nav nav-tabs" id="advisory_ul">
        <li ng-repeat="y in list" id="section_{{y.id}}"><a ng-click="student_list(y.id)" href="javascript:void(0);" onclick="">{{y.name}}</a></li>

    </ul>
<br><br>
<!-- <div class="container" align="center">
    <table style="width:100%;" >
        <tr>
            <td valign="top">
                <strong>Grade level:</strong> <span id="grade_section_here"></span>
                <br><br>
                <strong>Section info:</strong> <span id="quarter_here"></span>
            </td>
   
            <td valign="top" >
                <strong>Building details:</strong> <span id="division_here"></span>
                <br><br>
                <strong>Room:</strong> <span id="district_here"></span>
            </td>
        
            <td valign="top">
                <strong>School year:</strong> <span id="school_year_here"></span>
                <br><br>
                <strong>Subject:</strong> <span id="subject_name_here"></span>
            </td>
        </tr>
    </table>
</div> -->
<button class="btn btn-info" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('view','')"><i class="fa fa-eye"></i> Section Details</button>
<br><br>
<div class="table table-responsive">
      <table class="table table-striped table-bordered table-condensed table-hover ">
        <thead class="bg-primary" style="font-size: 14px; padding: 20em">
          <tr style="padding: 20px">
            <th><strong>Last Name</strong></th>
            <th><strong>Middle Name</strong></th>
            <th><strong>First Name</strong></th>
            <th><strong>Age</strong></th>
            <th><strong>Gender</strong></th>
            <th><strong>Address</strong></th>
            <th><strong>Father</strong></th>
            <th><strong>Mother</strong></th>
            <th><strong>Contact</strong></th>
            <th><strong>Action</strong></th>
          </tr>
        </thead>
        <tbody>

          <tr ng-repeat="x in students|filter:filter_here" id="inline_data_{{x.student_id}}">

                <input type="hidden" id="section" value="{{x.section_id}}">
            <td id="lname_{{x.student_id}}">{{x.lname}}</td>
            <td id="mname_{{x.student_id}}">{{x.mname}}</td>
            <td id="fname_{{x.student_id}}">{{x.fname}}</td>
            <td id="age_{{x.student_id}}">{{x.age}}</td>
            <td id="sex_{{x.student_id}}">{{x.sex}}</td>
            <td id="address_{{x.student_id}}">{{x.address}}</td>
            <td id="father_name_{{x.student_id}}">{{x.father_name}}</td>
            <td id="mother_name_{{x.student_id}}">{{x.mother_name}}</td>
            <td id="parent_contact_{{x.student_id}}">{{x.parent_contact}}</td>

            <?php if($update){ ?>
            <td>
            <button class="btn btn-primary" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('update',x.student_id)" type="button"> <i class="fa fa-pencil"></i> Update</button>
            <?php } ?>

            <span></span>
            <?php if($delete){ ?>
            <button class="btn btn-md btn-danger" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('remove',x.student_id)" type="button"> <i class="fa fa-trash-o"></i> Delete</button>
            <?php } ?>
             
            </td>

          </tr>
        </tbody>
      </table>
</div>
</div>




<!--  <br>
 <div class="table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Contact</th>
             <?php if($update || $delete){ ?>
            <th colspan="2">Action</th>
            <?php } ?>
          </tr>
        </thead>
        <tbody>

          <tr ng-repeat="x in students|filter:filter_here" id="inline_data_{{x.student_id}}">

                <input type="hidden" id="section" value="{{x.section_id}}">
            <td id="fname_{{x.student_id}}">
                {{x.fname}}
            </td>
            <td id="mname_{{x.student_id}}">{{x.fname}}</td>
            <td id="lname_{{x.student_id}}">{{x.lname}}</td>
            <td id="age_{{x.student_id}}">{{x.age}}</td>
            <td id="sex_{{x.student_id}}">{{x.sex}}</td>
            <td id="address_{{x.student_id}}">{{x.address}}</td>
            <td id="father_name_{{x.student_id}}">{{x.father_name}}</td>
            <td id="mother_name_{{x.student_id}}">{{x.mother_name}}</td>
            <td id="parent_contact_{{x.student_id}}">{{x.parent_contact}}</td>
            <?php if($update){ ?>
            <td>
            <a  href="javascript:void(0)" style="z-index:0;"  ng-click="process('update',x.student_id)"><i class="fa fa-pencil"></i> Update</a>
            </td>
            <?php } ?>

            <?php if($delete){ ?>
            <td>
            <a  href="javascript:void(0)"  style="z-index:0;" ng-click="process('remove',x.student_id)" ><i class="fa fa-remove"></i> Delete</a>
            </td>
            <?php } ?>


          </tr>
        </tbody>
      </table>
</div> -->
</div>