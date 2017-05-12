
<div ng-controller="ReportCtrl">
     <h3 class="page-header container"> {{page_title}} </h3>
      <div class="container" align="right">
            <form class="form-inline">
               <?php if($create){?> 
                <div class="form-group system_retrieve">
                    <label for="pwd">Search:</label>
                    <input type="text" class="form-control" ng-model="filter_here" placeholder="Account">
                </div>
                <?php } ?>
       <!--         <?php if($create){?>
                <button type="button" style="z-index:0;height:36px;"  ng-click="process('create','')" class="btn btn-success system_create"><i class="fa fa-plus"></i> Add admin</button>
                <?php }?> -->
            </form>
 </div>

       
 <br>
 <div class="container table table-responsive" >
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
       <!--      <?php if($update || $delete){ ?>
            <th colspan="2"><strong>Action</strong></th>
            <?php } ?> -->
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
      <!--      <?php if($update){ ?>
            <button class="btn btn-primary" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('update',x.us_id)" type="button"> <i class="fa fa-pencil"></i> Update</button>
            <?php } ?> 
            
            <span></span>
            <?php if($delete){ ?>
            <button class="btn btn-md btn-danger" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('remove',x.us_id)" type="button"> <i class="fa fa-trash-o"></i> Delete</button> 
            &nbsp;&nbsp;
            <button class="btn btn-md btn-danger" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('deactivate',x.us_id)" type="button"><i class="fa fa-times-circle fa-fw"></i> Deactivate</a>
            <?php } ?>
            </td> -->
            


          </tr>
          </div>
        </tbody>
      </table>
</div>
</div>