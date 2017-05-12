$(function(){
	$("#remove_alert").click(function(){
		$("#alert").hide();		
	});


}); //end of document ready function 

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function date_current(action){
  var currentTime = new Date();
  
  switch(action){
    case "year":
       // returns the year (four digits)
      $datex = currentTime.getFullYear();
    break;

    case "month":
       // returns the month (from 0 to 12)
      $datex = currentTime.getMonth() + 1;
    break;

    case "day":
      // returns the day of the month (from 1 to 31)
      $datex = currentTime.getDate();
    break;

    case "all":
      $datex = ""+currentTime.getFullYear()+"-"+currentTime.getMonth()+"-"+currentTime.getDate()+"";
    break;

  }  

 
  return $datex;
}


function upload_file(){
    $("#file_upload").click();
}

function set_active(module){

  console.log(module)
  $(".menu_a").removeAttr('style');

  $("#"+module+"_a").css({'color':'#008bc4','text-decoration':'underline'});

}

function notice(alert,msg){
		
		switch(alert){
			case "success":
				$background = "#7FC682";
			break;
      case "danger":
        $background = "#FF3A3A";
      break;
      case "error":
        $background = "#FF3A3A";
      break;
		}
	$(".alert").css({'background-color':$background});
	$("#alert_msg").html(msg);
	$("#alert").show();

	setTimeout(function(){
		$("#alert").fadeOut(4000);
	},2000);	

}

function loader(action){

	switch(action){
		case "on":
			$(".pre_blocker").show();
		break;

		case "off":
			$(".pre_blocker").hide();
		break;
	}
}

function addStylePath(path){        
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = getBaseURL()+path;
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link); 
}

function addScriptPath(path){

    var scr=document.createElement('script');
    scr.type = 'text/javascript';
    scr.src = getBaseURL()+path;
    document.getElementsByTagName('head')[0].appendChild(scr);  
}

function getBaseURL() {
    var origin = window.location.origin+'/';
    var pathArray = window.location.pathname.split( '/' );
    var base_url = '';
    base_url = origin+pathArray[1];

    return base_url+'/';
}

function getURIstring(){
    var pathArray = window.location.pathname.split( '/' ),
        uri = '';
    pathArray.splice(0,2);
    if( pathArray.length > 0 ){
        uri = pathArray.join('/');
    }
    return uri;
}

function getFolder( pathname ){
    switch( pathname ){
        case 'base': id = 1; break;
        case 'sub': id = 3; break;
        default: id = 2; break;
    }

    // check if error
    var error = ( (id == 2 && pathname != 'main') && pathname == '' ) ? true:false;
    if( error )
        return false;
    // end check error

    var origin = window.location.origin+'/';
    var pathArray = window.location.pathname.split( '/' );
    
    return pathArray[id];
}



function decimalonly(e, decimal) {
var key;
var keychar;

if (window.event) {
   key = window.event.keyCode;
}
else if (e) {
   key = e.which;
}
else {
   return true;
}
keychar = String.fromCharCode(key);

if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {
   return true;
}
else if ((("0123456789").indexOf(keychar) > -1)) {
   return true;
}
else if (decimal && (keychar == ".")) { 
  return true;
}
else
   return false;
}




function letra(e, decimal) {

var key;
var keychar;

if (window.event) {
   key = window.event.keyCode;
}
else if (e) {
   key = e.which;
}
else {
   return true;
}
keychar = String.fromCharCode(key);

if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {
   return true;
}
else if ((("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz").indexOf(keychar) > -1)) {
   return true;
}
else if (decimal && (keychar == ".")) { 
  return true;
}
else
   return false;
}