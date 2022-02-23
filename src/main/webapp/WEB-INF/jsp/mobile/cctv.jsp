<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	 <!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
	<!-- AdminLTE Skins. Choose a skin from the css/skins
	     folder instead of downloading all of them to reduce the load. -->
	<link rel="stylesheet" href="../../dist/css/skins/_all-skins.min.css">
	
	<link rel="stylesheet" href="../../css/reset.css">
	<link rel="stylesheet" href="../../css/video-js.css">
	<!-- Pace style -->
	<link rel="stylesheet" href="../../plugins/pace/pace.min.css">
	
	<sec:csrfMetaTags/>
<!-- 	<script type="text/javascript" src="/js/main/mobile.js"></script> -->
	
	
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->


	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
	<!-- Bootstrap 3.3.7 -->
	<script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<!-- PACE -->
	<script src="../../bower_components/PACE/pace.min.js"></script>
	<!-- SlimScroll -->
	<script src="../../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
	<!-- FastClick -->
	<script src="../../bower_components/fastclick/lib/fastclick.js"></script>
	<!-- AdminLTE App -->
	<script src="../../dist/js/adminlte.min.js"></script>
	<!-- AdminLTE for demo purposes -->
	<!-- <script src="../../dist/js/demo.js"></script> -->

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
<!--  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
	<script src="/resources/crypt/sha.js"></script>
	
	<script src="../../js/cctv/video.min.js"></script>
	<script src="../../js/cctv/videojs-contrib-hls.js"></script>
	
	<style>
		.container {
			background-color: white;
		}
		.text-input {
			width : 250px;
			height : 30px;
			font-size : 20px !important;
		}
		.content {
			margin-top: 40px; 
			height: calc(100% - 91px);
		}
		
		.box-body{
			height:100%;
		}
	</style>
	<script type="text/javascript">
 	</script>
</head>

<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header" style="position: fixed;   width: 100%;">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	CCTV
      </a>
      
<!-- 	  <a class="sidebar-toggle"></a> -->
	  
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
<!--           <li> -->
<!--             <a onclick="checkConfirm()" data-toggle="control-sidebar"><i class="fa fa-sign-out"></i></a> -->
<!--           </li> -->
          <form id="logoutFormMobile" action="<c:url value="/logoutProcess.do" />" method="POST" hidden>
			<sec:csrfInput/>
		  </form>
        </ul>
      </div>
    </nav>
  </header>

  <!-- =============================================== -->

<%@ include file="/WEB-INF/jsp/mobile/sidebar.jsp" %>

  <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">

    <!-- Main content -->
    <section class="content" >
      <!-- Default box -->
        <div class="box-body">
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">CCTV</label>
                <select id="cctvId" class="form-control" onchange="start()"></select>
            </div>
	         <div style="height:10px"></div>
              <div id="cctv_area" class="form-group" style="height: calc(100% - 90px);background: white;">
					 <video style='width:100%; height:100%' id='example-video0' class='video-js vjs-default-skin four' controls preload='auto'>
						 <source src="" type='application/x-mpegURL'>
					 </video>
			  </div>
			  <div class="bottom_layout">
                <button type="button" name="search" class="btn btn_new_resist w150" id="back" onclick="onAll()">전체화면</button>
              </div>
			
            </div>
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <div class="control-sidebar-bg"></div>
</div>

<footer class="footer_wrap">
   Copyright &copy; (주)한라.All rights reserved.
</footer>
<script>


var tagList;
var player;
$(document).ready(function(){
	findcctvList();
});
  
function findcctvList(){
	var param = {};
	param.siteId= localStorage.siteId;
	
	var successCallback = function(data){
		var resultList = data.body;
		if(resultList == null || resultList.length  == 0){
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "연동된 cctv가 존재하지 않습니다." };
					window.webkit.messageHandlers.showMessage.postMessage(message);
				}else{
					window.LexaApp.showMessage("연동된 cctv가 존재하지 않습니다."); 
				}
			}catch(e) {
				alert("연동된 cctv가 존재하지 않습니다.");        			
			}
			
			return;
		}
		
		player = videojs('example-video0', {
			autoplay: true,
			muted: true,
			loop: true
	
	    });
		for(var i = 0 ; i < resultList.length ; i++){
             $('#cctvId').append( $("<option>"+resultList[i].mediaDeviceName+"</option>"));
             $("#cctvId option:eq("+(i)+")").attr("value",resultList[i].externalHlsUrl);
		}
			
//			player.src([
//		        {type: "application/x-mpegURL", src: resultList[0].externalHlsUrl}
//		    ]);
			
		var tempSrc = resultList[0].externalHlsUrl;
// 			var tempSrc = location.protocol=='https:'?(resultList[0].externalHlsUrl.replace("http","https")):resultList[0].externalHlsUrl;
		player.src([
		   {type: "application/x-mpegURL", 
		   src: tempSrc}
		 ]);
	    player.play();
    }
	mobileUtil.callApi(conf.raycomApiUrl+"mobile/cctv/list",param,'post', successCallback);
}


function start(){
	  var src = $('#cctvId').val();
// 	  src = location.protocol=='https:'?(src.replace("http","https")):src;
	  player.pause();
	  player.src([
		        {type: "application/x-mpegURL", "src": src}
		    ]);
	  player.play();
}


	


function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}

function onAll(){
	 var src = $('#cctvId').val();
// 	  src = location.protocol=='https:'?(src.replace("http","https")):src;
	try{
		if(checkMobile()=="ios"){
			var message = {  url: src };
			window.webkit.messageHandlers.openBrowser.postMessage(message);
		}else{
			window.LexaApp.openBrowser(src) ;
		}
	}catch(e){
		console.log(e);
	}
}

</script>
</body>
</html>
