<div class="container" ng-controller="SectionCtrl">
	
   <h3 class="page-header"> {{page_title}} </h3>
      <div align="right">
            <form class="form-inline">
               <?php if($create){?> 
                <div class="form-group system_retrieve">
                    <label for="pwd">Search:</label>
                    <input type="text" class="form-control" ng-model="filter_here" placeholder="" autofocus>
                </div>
                <?php } ?>
                
          <!--      <?php if($create){?>
                <button type="button" style="z-index:0;height:36px;"  ng-click="process('create','')" class="btn btn-success system_create">Add</button>
                <?php }?> -->
            </form>
 </div>
 <br>
 <br>
 <br>
 <br>
 <div class="table table-responsive">
      <table class="table table-striped table-bordered table-condensed table-hover">
        <thead class="bg-primary" style="font-size: 14px; padding: 20em;">
          <tr>
          	<th><strong>Section Name</strong></th>
          	<th><strong>Year Level</strong></th>
          	<th><strong>Teacher</strong></th>
          	<th><strong>Building Details</strong></th>
          	<th><strong>Room</strong></th>
            <th><strong>School</strong></th>
            <th><strong>Section Info</strong></th>
      <!--    	<?php if($update || $delete){?>
            <th colspan="2"><strong>Action</strong></th>
            <?php } ?> -->
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="x in list|filter:filter_here" id="inline_{{x.id}}">
            <td>{{x.name}}</td>
            <td id="year_level_{{x.id}}">Grade {{x.year_level}}</td>
            <td id="adviser_{{x.id}}">{{x.fname}} {{x.lname}}</td>
            <td>{{x.bldg_details}}</td>
            <td>{{x.room}}</td>
            <td>{{x.school_name}}</td>
            <td>{{x.section_info}}</td>

      <!--      <?php if($update){ ?>
            <td>
            <a  href="javascript:void(0)" style="z-index:0;"  ng-click="process('update',x.id)"><i class="fa fa-pencil"></i> Update</a>
            </td>
            <?php } ?>

            <?php if($delete){ ?>
            <td>
            <a  href="javascript:void(0)"  style="z-index:0;" ng-click="process('remove',x.id)" ><i class="fa fa-remove"></i> Delete</a>
            </td>
            <?php } ?> -->


          </tr>
        </tbody>
      </table>

</div>

</div>