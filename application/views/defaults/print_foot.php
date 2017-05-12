<div class="pre_blocker" style="display: none;">
		<svg xmlns="" version="1.1">
		  <defs>
		    <filter id="gooey">
		      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
		      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
		      <feBlend in="SourceGraphic" in2="goo"></feBlend>
		    </filter>
		  </defs>
		</svg>
		<div class="blob blob-0"></div>
		<div class="blob blob-1"></div>
		<div class="blob blob-2"></div>
		<div class="blob blob-3"></div>
		<div class="blob blob-4"></div>
		<div class="blob blob-5"></div>
</div>
<style>
.pre_blocker{
   position:fixed;
   left:0;
   top:0;
   z-index:99999999999;
   width:100%;
   height:100%;
   overflow:visible;
   background: rgba(0,0,0,0.8);
   color: #fff;
   display: table;
}
</style>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/loader.css">