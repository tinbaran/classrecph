<input type="hidden" id="current_id" value="<?php echo $this->session->userdata('sess_id');?>">

<div ng-controller="AccountCtrl">
     <h3 class="page-header container"> {{page_title}} </h3>
      <div class="container" align="right">
            <form class="form-inline">
               <?php if($create){?> 
                <div class="form-group system_retrieve">
                    <label for="pwd">Search:</label>
                    <input type="text" class="form-control" ng-model="filter_here" placeholder="Account">
                </div>
                <?php } ?>
                <?php if($create){?>
                <button type="button" style="z-index:0;height:36px;"  ng-click="process('create','')" class="btn btn-success system_create"><i class="fa fa-plus"></i> Add admin account</button>
                <?php }?> 
            </form>
 </div>

       <div class="row page-header" style="display: none; padding-left: 30px;" id="inline_create_0">
    <!-- left column -->
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="text-center">
        <input type="hidden" id="account_id">
        <img onclick="upload_file()" id="img_here" class="avatar img-circle img-thumbnail" alt="avatar">
        <input type="file" id="file_upload" onchange="loadFile(event)" class="text-center center-block well well-sm">
      </div>
    </div>
    <!-- edit form column -->
    <div class="col-md-8 col-sm-6 col-xs-12 personal-info" >
      
      <h3>Personal Information</h3>
      <form class="form-horizontal" role="form" >

        
        <div class="form-group">
          <label class="col-lg-3 control-label">First name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" id="fname" placeholder="Enter First Name" autofocus>
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Middle name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" id="mname" placeholder="Enter Middle Name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Last name:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" id="lname" placeholder="Enter Last Name">
          </div>
        </div>
        
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:</label>
          <div class="col-lg-8">
            <input id="email" class="form-control" type="text" placeholder="Enter Email">
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Password:</label>
          <div class="col-md-8">
            <input class="form-control" id="password" type="password" placeholder="Enter Password">
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Address:</label>
          <div class="col-md-8">
            <input class="form-control" id="address" type="text" placeholder="Enter Address">
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
        <input type="hidden" id="grade_lvl">
        
        <div class="form-group">
          <label class="col-lg-3 control-label">User Type:</label>
          <div class="col-lg-8">
            <select id="user_type" class="form-control">
                <option value="0">Super Admin</option></select>
                
            </select>
            
          </div>
        </div>
        
        <?php if($update){ ?>
        <div class="form-group" >
          <label class="col-md-3 control-label"></label>
          <div class="col-md-8">
            <button class="btn btn-success" href="javascript:void(0)" onclick="account_process('save','');" href="#"><i class="fa fa-save fa-lg"></i> Save </button>
            <span></span>
            <button class="btn btn-danger" href="javascript:void(0)" id="cancel_account" onclick="account_process('cancel','0');">Cancel</button>
          </div>
        </div>
        <?php } ?>
      </form>
    </div>
  </div>




 <br>
 <div class="container table-responsive" >
      <table class="table table-striped table-bordered table-condensed table-hover ">
        <thead class="bg-primary" style="font-size: 14px; padding: 20em">
          <tr>
            <th>&nbsp;</th>
            <th><strong>Email</strong></th>
            <th><strong>Password</strong></th>
            <th><strong>Name</strong></th>
            <th><strong>Address</strong></th>
            <th><strong>Gender</strong></th>
            <th><strong>Grade Level</strong></th>
            <th><strong>Type</strong></th>
             <?php if($update || $delete){ ?>
            <th colspan="2"><strong>Action</strong></th>
            <?php } ?>
          </tr>
        </thead>
        <tbody>

 
<div class="page-header" >
          

          <tr ng-repeat="x in accounts|filter:filter_here" id="inline_create_{{x.us_id}}">
            <td><img src="<?php echo base_url();?>assets/{{x.img}}" style="width:50px;height:50px;"></td>
            <td>{{x.email}}</td>
            <td>{{x.password}}</td>
            <td>{{x.lname}}, {{x.fname}}</td>
            <td>{{x.address}}</td>
            <td>{{x.gender}}</td>
            <td>{{x.level}}</td>
            <td><div>{{x.user_type == '1' ? 'Teacher' : 'Super Admin'}}</div></td>
            <td>
        <!--    <?php if($update){ ?>
            <button class="btn btn-primary" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('update',x.us_id)" type="button"> <i class="fa fa-pencil"></i> Update</button>
            <?php } ?> 
            
            <span></span>
            <?php if($delete){ ?>
            <button class="btn btn-md btn-danger" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('remove',x.us_id)" type="button"> <i class="fa fa-trash-o"></i> Delete</button> -->
            <button class="btn btn-danger" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('deactivate',x.us_id)" type="button"><i class="fa fa-times-circle"></i> Deactivate</button>
            <?php } ?>
            </td>
            


          </tr>
          </div>
        </tbody>
      </table>
</div>
</div>