<?php
 //
 // $count_styles = count($set_styles);
 // for($r=0;$i < $count_styles; $r++){
 // }
 if(isset($set_styles) && is_array($set_styles)){
foreach($set_styles as $key2 => $val2){
  echo'<link rel="stylesheet" href="'.base_url().'assets/'.$val2.'" />';

}
  }
 ?>
