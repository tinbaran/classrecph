<input type="hidden" id="current_id" value="<?php echo $this->session->userdata('sess_id');?>">
<div ng-controller="AccountCtrl" class="container">


     <h3 class="page-header"> {{page_title}} </h3>

  <div class="row" style="display:none; padding-left: 30px;" id="inline_create_0">
    <!-- left column -->
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="text-center">
        <input type="hidden" id="account_id">
        <img onclick="upload_file()" id="img_here" class="avatar img-circle img-thumbnail" alt="avatar">
        <input type="file" id="file_upload" onchange="loadFile(event)" class="text-center center-block well well-sm">
      </div>
    </div>
    <!-- edit form column -->
    <div class="col-md-8 col-sm-6 col-xs-12 personal-info" id="inline_create_0">
      
      <h3>Personal Information</h3>
      <form class="form-horizontal" role="form" >
        
        <div class="form-group">
          <label class="col-lg-3 control-label">First name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" id="fname" autofocus>
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
        <input type="hidden" id="user_type" value="1">
    <!--    <div class="form-group">
          <label class="col-lg-3 control-label">User Type:</label>
          <div class="col-lg-8">
            
            <select id="user_type" class="form-control">
                <option value="1">Teacher</option>
                
            </select> 
            
          </div>
        </div> -->
        
        <?php if($update){ ?>
        <div class="form-group">
          <label class="col-md-3 control-label"></label>
          <div class="col-md-8">
            <button class="btn btn-success" href="javascript:void(0)" onclick="account_process('save','');" href="#"><i class="fa fa-save fa-lg"></i> Save Changes</button>
            <span></span>
            <button class="btn btn-danger" href="javascript:void(0)" id="cancel_account" onclick="account_process('cancel','0');">Cancel</button>
          </div>
        </div>
        <?php } ?>
      </form>
    </div>
  </div>

  <div class="row" ng-repeat="x in accounts|filter:filter_here" id="inline_create_{{x.us_id}}" style="padding-left: 30px;">
    <!-- left column -->
    <div class="col-md-4 col-sm-6 col-xs-12" >
      <div class="text-center">
        <img src="<?php echo base_url();?>assets/{{x.img}}" class="avatar img-circle img-thumbnail" alt="avatar">
      </div>
    </div>
    <!-- edit form column -->
    <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
      
      <h3>Personal Information</h3>
      <form class="form-horizontal" role="form" >
        
        <div class="form-group">
          <label class="col-lg-3 control-label">First name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="{{x.fname}}" readonly style="background-color: #ffffff"> 
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Middle name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="{{x.mname}}" readonly style="background-color: #ffffff"> 
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Last name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="{{x.lname}}" readonly style="background-color: #ffffff"> 
          </div>
        </div>
        
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="{{x.email}}" readonly style="background-color: #ffffff">
          </div>
        </div>
        <input type="hidden" id="password">
        
        <div class="form-group">
          <label class="col-md-3 control-label">Address:</label>
          <div class="col-md-8">
            <input class="form-control" type="text" value="{{x.address}}" readonly style="background-color: #ffffff"> 
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Gender:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="{{x.gender}}" readonly style="background-color: #ffffff"> 
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Grade Level:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="{{x.level}}" readonly style="background-color: #ffffff">
          </div>
        </div>
        <input type="hidden" id="" value="{{x.user_type == '1' ? 'Teacher' : 'Super Admin'}}">
     <!--   <div class="form-group">
          <label class="col-lg-3 control-label">User Type:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="{{x.user_type == '1' ? 'Teacher' : 'Super Admin'}}" readonly style="background-color: #ffffff">
          </div>
        </div> -->
        <?php if($update){ ?>
        <div class="form-group">
          <label class="col-md-3 control-label"></label>
          <div class="col-md-8">
            <button class="btn btn-primary" href="javascript:void(0)" style="z-index:0;"  ng-click="process('update',x.us_id)" type="button"> <i class="fa fa-pencil"></i> Update</button>
            <span></span> 
         
        <?php } ?>
        <?php if($delete){ ?>
       
            <button class="btn btn-md btn-danger" href="javascript:void(0)" style="z-index:0;"  ng-click="process('deactivate',x.us_id)" type="button"><i class="fa fa-times-circle"></i> Deactivate</a>
            <?php } ?>
            <span></span> 
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</div>