<input type="hidden" value="<?php echo $this->session->userdata('sess_id');?>" id="current_adviser_id">                    
<div class="container" ng-controller="SubjectCtrl">
  <h3 class="page-header"> {{page_title}} </h3>
    <div ng-show="my_subjects">
    
        <form class="form-inline">
   <!--       <div align="left">
            <div class="form-group system_retrieve">
                    <strong>Academic Year:</strong> &nbsp;&nbsp; <span id="selected_school_year_{{sub.subject}}">
            </div>

          </div> -->

          <div align="right">
                
           <?php if($create){?> 
                
                  <div class="form-group system_retrieve">
                      <label for="pwd">Search:</label>
                      <input type="text" class="form-control" ng-model="filter_here" placeholder="Subject">
                  </div>
                  <button type="button" style="z-index:0;height:36px;" class="btn btn-success" ng-click="process('create_my_subject','')"><i class="fa fa-plus"></i> Add Subject</button>
                  &nbsp;&nbsp;
          <?php }?>
                
          </div>
        </form>
         <br>

         <div ng-repeat="sub in subject_list|filter:filter_here" id="my_subject_{{sub.subject}}">
<button type="button" style="z-index:0;height:36px;"  ng-click="process('archive',sub.subject)" class="btn btn-info system_create"><i class="fa fa-archive"></i> Archive</button>
                
          <div class="panel panel-primary">
            <div class="panel-heading" style="height: 50px; border: 1px solid">
              <i class="fa fa-book fa-lg"></i> 
              <span id="subject_name_{{sub.id}}">
                 <strong id="name_sub_{{sub.subject}}"> {{sub.name}} </strong>
              </span>

              <div style="display:inline;float:right;clear:right;" id="archive">
              <!--     <a href="javascript:void(0);" ng-click="process('remove_my_subject',sub.subject)">  </a> -->
                 <button style="height:auto;" id="section" class="btn btn-info btn-md" ng-click="process('add_section_to_my_subject',sub.subject)"> <i class="fa fa-plus"></i> Add Section</button>
                 <button style="height:auto;" id="removesub" class="btn btn-danger btn-md" ng-click="process('remove_my_subject',sub.subject)"> <i class="fa fa-trash-o"></i> Delete</button>
              </div>
            </div>
            <div class="panel-body" id="subject_sec_{{sub.id}}">
               <button class="btn btn-info show_details" id="details_{{sub.subject}}" ng-click="process('my_sections',sub.subject)"><i class="fa fa-eye fa-fw"></i> View Section Details</button>
                  <button class="btn btn-primary show_details" id="details_{{sub.subject}}" ng-click="process('weighted_scores',sub.subject)"><i class="fa fa-eye fa-fw"></i> View Subject Details</button>

                  <div id="section_here_{{sub.subject}}" style="padding-top: 5px"></div>
            </div>  
          </div>
          <hr>
        </div>  


    </div><!-- My Subjeects-->


    <div ng-show="subject_management">  
                <div align="right">
                      <form class="form-inline">
                         <?php if($create){?> 
                          <div class="form-group system_retrieve">
                              <label for="pwd">Search:</label>
                              <input type="text" class="form-control" ng-model="filter_here" placeholder="Subject">
                          </div>
                          <button type="button" style="z-index:0;height:36px;"  ng-click="process('create','')" class="btn btn-success system_create"><i class="fa fa-plus"></i> Add Subject</button>
                          <?php }?>
                      </form>
           </div>
           <div>
             
           </div>
           <br>
           <br>
           <br>
           <br>
           <div class="table table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                  <thead class="bg-primary" style="font-size: 14px; padding: 20em">
                    <tr>
                      <th>Subject Name</th>
                      <th>Weight Component <strong><br>(Written Work)</stong></th>
                      <th>Weight Component <strong><br>(Performance Task)</stong></th>
                      <th>Weight Component <strong><br>(Quarterly Assessment)</stong></th>
                       <?php if($update || $delete){ ?>
                      <th colspan="2">Action</th>
                      <?php } ?>
                    </tr>
                  </thead>
                  <tbody>

                    <tr ng-repeat="x in subjects|filter:filter_here" id="inline_tr_{{x.id}}">
                      <td id="subject_name_{{x.id}}">
                        {{x.name}}
                      </td>
                      <td>
                        {{x.wc_ww * 100}}%
                        <input type="hidden"  id="wc_ww_{{x.id}}" value="{{x.wc_ww}}">
                      </td>
                      <td>
                        {{x.wc_pt * 100}}%
                        <input type="hidden"  id="wc_pt_{{x.id}}" value="{{x.wc_pt}}">
                      </td>
                      <td>
                        {{x.wc_qa * 100}}%
                        <input type="hidden"  id="wc_qa_{{x.id}}" value="{{x.wc_qa}}">
                      </td>
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

</div>