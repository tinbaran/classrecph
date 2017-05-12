
<div ng-controller="TeacherCtrl" class="container">

     <h3 class="page-header"> {{page_title}} </h3>

  <div class="row" style="display:none;" id="inline_create_0">
    <!-- left column -->
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="text-center">
        <input type="hidden" id="account_id">
        <img onclick="upload_file()" id="img_here" class="avatar img-circle img-thumbnail" alt="avatar">
        <input type="file" id="file_upload" onchange="loadFile(event)" class="text-center center-block well well-sm">
      </div>
    </div>
    <!-- edit form column -->
    <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
      
      <h3>Personal Information</h3>
      <form class="form-horizontal " role="form" >
        
        <div class="form-group">
          <label class="col-lg-3 control-label">First name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" id="fname">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Middle name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" id="mname">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Last name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" id="lname">
          </div>
        </div>
        
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:</label>
          <div class="col-lg-8">
            <input id="email" class="form-control" type="text">
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Password:</label>
          <div class="col-md-8">
            <input class="form-control" id="password" type="password">
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Address:</label>
          <div class="col-md-8">
            <input class="form-control" id="address" type="text">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Gender:</label>
          <div class="col-lg-8">
            <div class="ui-select">
              <select id="gender" class="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Grade Level:</label>
          <div class="col-lg-8">
            <div class="ui-select">
              <select id="grade_lvl" class="form-control">
                
              </select>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="col-md-3 control-label"></label>
          <div class="col-md-8">
            <button class="btn btn-primary" href="javascript:void(0)" onclick="account_process('save','');" href="#">Save Changes</button>
            <span></span>
            <button class="btn btn-danger" value="Cancel" type="button" href="javascript:void(0)" id="cancel_account" onclick="account_process('cancel','0');">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>



  <div class="row" ng-repeat="x in accounts|filter:filter_here" id="inline_create_{{x.us_id}}">
    <!-- left column -->
    <div class="col-md-4 col-sm-6 col-xs-12" >
      <div class="text-center">
        <img src="<?php echo base_url();?>assets/{{x.img}}" class="avatar img-circle img-thumbnail" alt="avatar">
      </div>
    </div>
    <!-- edit form column -->
    <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
      
      <h3>Personal Information</h3>
      <form class="form-horizontal" role="form">
        
        <div class="form-group">
          <label class="col-lg-3 control-label">First name:</label>
          <div class="col-lg-8">
            {{x.fname}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Last name:</label>
          <div class="col-lg-8">
            {{x.lname}}
          </div>
        </div>
        
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:</label>
          <div class="col-lg-8">
            {{x.email}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Password:</label>
          <div class="col-md-8">
            {{x.password}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Address:</label>
          <div class="col-md-8">
            {{x.address}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Gender:</label>
          <div class="col-lg-8">
            {{x.gender}}
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Grade Level:</label>
          <div class="col-lg-8">
            {{x.level}}
          </div>
        </div>
        <?php if($update){ ?>
        <div class="form-group">
          <label class="col-md-3 control-label"></label>
          <div class="col-md-8">
            <button class="btn btn-primary" href="javascript:void(0)" style="z-index:0;"  ng-click="process('update',x.us_id)" type="button"> <i class="fa fa-pencil"></i>UPDATE</button>
            <span></span> 
          </div>
        </div>
        <?php } ?>
      </form>
    </div>
  </div>

</div>


<div ng-controller="TeacherCtrl">

     <h3> {{page_title}} </h3>
      <div align="right">
            <form class="form-inline">
               <?php if($create){?> 
                <div class="form-group system_retrieve">
                    <label for="pwd">Search:</label>
                    <input type="text" class="form-control" ng-model="filter_here">
                </div>
                <?php } ?>
                <?php if($create){?>
                <button type="button" style="z-index:0;height:36px;"  ng-click="process('create','')" class="btn btn-default system_create">Add</button>
                <?php }?>
            </form>
 </div>
 <br>
 <div class="table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Email</th>
            <th>Password</th>
            <th>Name</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Grade Level</th>
             <?php if($update || $delete){ ?>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th colspan="2">Action</th>
            <?php } ?>
          </tr>
        </thead>
        <tbody>

          <tr style="display:none;" id="inline_create_0">
            <td><input type="hidden" id="account_id">
            <img onclick="upload_file()" id="img_here" style="width:50px;height:50px;display:none;">
              <input type="file" id="file_upload" onchange="loadFile(event)">
            </td>
            <td><input type="text" style="width:70%;" id="email"></td>
            <td> <input type="password" style="width:70%;"  id="password"></td>
            <td> <input type="text" style="width:70%;"  id="fname" placeholder="First Name"> <input  style="width:70%;" type="text" id="mname" placeholder="Middle Name"> <input type="text"  style="width:70%;" id="lname" placeholder="Last Name"></td>
            <td> <input type="text" id="address"></td>
            <td><select id="gender" style="width:70%;"><option value="Male">Male</option><option value="Female">Female</option></select></td>
            <td><select id="grade_lvl" style="width:70%;"></select></td>
            <td><select id="user_type" style="width:70%;"><option value="1">Teacher</option><option value="0">Super Admin</option></select></td>
            <td> <a  href="javascript:void(0)"  onclick="account_process('save','');" href="#">Save</a></td>
            <td> <a href="javascript:void(0)" id="cancel_account" onclick="account_process('cancel','0');">Cancel</a></td>
          </tr>

          <tr ng-repeat="x in accounts|filter:filter_here" id="inline_create_{{x.us_id}}">
            <td><img src="<?php echo base_url();?>assets/{{x.img}}" style="width:50px;height:50px;"></td>
            <td>{{x.email}}</td>
            <td>{{x.password}}</td>
            <td>{{x.lname}}, {{x.fname}}</td>
            <td>{{x.address}}</td>
            <td>{{x.gender}}</td>
            <td>{{x.level}}</td>

            <td>
                <a href="javascript:void(0)" style="z-index:0;"  ng-click="process('subjects',x.us_id)"><i class="fa fa-file"></i> View Subjects</a>
            </td>
            <td>
                <a href="javascript:void(0)" style="z-index:0;"  ng-click="process('sections',x.us_id)"><i class="fa fa-file"></i> View Sections</a>
            </td>

            <?php if($update){ ?>
            <td>
            <a  href="javascript:void(0)" style="z-index:0;"  ng-click="process('update',x.us_id)"><i class="fa fa-pencil"></i> Update</a>
            </td>
            <?php } ?>

            <?php if($delete){ ?>
            <td>
            <a  href="javascript:void(0)"  style="z-index:0;" ng-click="process('remove',x.us_id)" ><i class="fa fa-remove"></i> Delete</a>
            </td>
            <?php } ?>


          </tr>
        </tbody>
      </table>
</div>
</div>