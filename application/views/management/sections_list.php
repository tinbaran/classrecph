<div class="container" ng-controller="HandledCtrl">
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
                
            <!--    <?php if($create){?>
                <button type="button" style="z-index:0;height:36px;" ng-click="process('create','')" class="btn btn-success system_create"><i class="fa fa-plus"></i> Add Section</button>
                
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
          <!--  <th><strong>Teacher</strong></th> -->
            <th><strong>Building Details</strong></th>
            <th><strong>Room</strong></th>
            <th><strong>Section Info</strong></th>
            <?php if($update || $delete){?>
            <th colspan="2"><strong>Action</strong></th>
            <?php } ?>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="x in list|filter:filter_here" id="inline_{{x.id}}">
            <td>{{x.name}}</td>
            <td id="year_level_{{x.id}}">Grade {{x.year_level}}</td>
            <input type="hidden" id="adviser_{{x.id}}">
         <!--   <td id="adviser_{{x.id}}">{{x.fname}} {{x.lname}}</td> -->
            <td>{{x.bldg_details}}</td>
            <td>{{x.room}}</td>
            <td>{{x.section_info}}</td>

            <?php if($update){ ?>
            <td>
            <button class="btn btn-primary" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('update',x.id)" type="button"> <i class="fa fa-pencil"></i> Update</button>
            <?php } ?>

            <span></span>
            <?php if($delete){ ?>
            <button class="btn btn-md btn-danger" href="javascript:void(0)" style="z-index:0;height:36px;"  ng-click="process('remove',x.id)" type="button"> <i class="fa fa-trash-o"></i> Delete</button>
            <?php } ?>
             </td>


          </tr>
        </tbody>
      </table>

</div>

</div>