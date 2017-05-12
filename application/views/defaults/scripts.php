<?php
//
// $count_scripts = count($set_scripts);
// for($i=0;$i < $count_scripts; $i++){
// echo"<script src='".base_url()."assets/".$set_scripts[$i]."'></script>";
// // echo"".base_url()."assets/".$set_scripts[$i]."<br>";
// }

if(isset($set_scripts) && is_array($set_scripts)){
		foreach($set_scripts as $key => $val){
		  echo"<script type='text/javascript' src='".base_url()."assets/".$val."'></script>";
		}
 }
 ?>
