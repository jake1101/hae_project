<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%
	response.setHeader("Cache-Control","no-store");   
	response.setHeader("Pragma","no-cache");   
	response.setDateHeader("Expires",0);   
	if (request.getProtocol().equals("HTTP/1.1")) 
	        response.setHeader("Cache-Control", "no-cache"); 

 %>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	
	
	<!-- cache 방지-->
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="-1">
	
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
			padding : 0px;
		}
		
		.container-extender::before {
		    content: url(../img/custom/ico_arrow_down.png);
		}
		.container-extender.active::before {
		    content: url(../img/custom/ico_arrow_down.png);
		    transform:rotate(180deg);
		    display:inline-block;
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
        	 배포 현황
      </a>
      
<!-- 	  <a class="sidebar-toggle"></a> -->
	  
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
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
        	<div id="extend-cont"class="" style="margin-bottom:5px; height : 70px; display:none;">
<!-- 	        	<span  class="input-group-btn" > -->
<!-- 	                <button style=" width: 49%; margin-right:2%;" type="button" onclick="searchWorker()" class="btn btn-default">작업자 QR 찾기</button> -->
<!-- 		       	 	<button  style=" width: 49%;" type="button"  onclick="searchTag()" class="btn btn-default">스마트태그 QR 찾기</button> -->
<!-- 	            </span> -->
          	</div>
			
			<div class="input_frame">
                <div class="container-1">
                    <span class="icon"><i class="fa fa-search" onclick="start()"></i></span>
                    <input type="submit" name="search" id="search" placeholder="검색" />
                </div>
              </div>
	          
	        <div style="height:5px"></div>
            <div id="tag_area" class="form-group" style="height: calc(100% - 80px); overflow:scroll;">
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
<!-- ./wrapper -->

	<div class="modal modal-warning fade" id="modal-qr">
         <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">경고 메세지</h4>
              </div>
              <div class="modal-body">
                <h4 id="qrMessage"></h4>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
       </div>
       <!-- /.modal -->  

<script>

// $(document).ajaxStart(function () {
//    Pace.restart()
//  })

var tagList;

$(document).ready(function(){
	start();
	
	
	$(".container-extender").click(function(event){
		
		toggleSearchContainer(!$(this).hasClass("active"));
	});
	
	
});
function toggleSearchContainer(bool){
	if(bool==true){
		$("#extend-cont").show(300);
		$("#extend-cont").addClass("active"); 
	}else{
		$("#extend-cont").hide(300);
		$("#extend-cont").removeClass("active");
	}
	
}

  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId= localStorage.siteId;
	findtagList(param);
}




function findtagList(param){
	var successCallback = function(data){
		var resultList = data.body;
		$('.tagInfo').remove();
		var html = '';
		tagList = data.body;
		for(var i = 0 ; i< resultList.length ; i++){
			
			var html = "<div style='margin-bottom:0px ; background:white; border-top:1px solid #f4f4f4;' id='tagInfo"+resultList[i].id+"' class='tagInfo'>"
				+"<div  style='width:100%; font-size:16px; padding:10px; font-weight:bold; color:black; text-align:left;'>"
				+"<table style='border-spacing: 3px; width : 100%;'>"
				+"<colgroup>"
				+"<col width='30%'/>"
				+"<col width='70%'/>"
				+"</colgroup>"
				+"<tr><th>작업자</th><td colspan='3'>"+resultList[i].vendorName+"["+resultList[i].targetJobName+"] "+resultList[i].targetName+"</td></tr>"
				+"<tr><th>태그 번호</th><td>"+ resultList[i].name+"</td></tr>"
				+"<tr><th>태그 ID</th><td >"+ resultList[i].nodeId+"</td></tr>"
				+"</table></div></div>";
			
			$('#tag_area').append(html);
			
		}    
    }
	param.allSearch = $("#searchParam").val();
	param.mappingYn="Y";
	mobileUtil.callApi(conf.raycomApiUrl+"sensor/list",param,'post', successCallback);
	
} 


function searchWorker(){
	
	var type = "worker";
	var include= false;
	var tag="worker";
	var target_json_array = tagList.map(s=> "RAYCOM;WORKER;"+s.targetId);
	try{
		if(checkMobile()=="ios"){
			var message = {  type: type, include: include , target_json_array: JSON.stringify(target_json_array) , tag: tag};
			window.webkit.messageHandlers.findQRCodeSeries.postMessage(message);
		}else{
			window.LexaApp.findQRCodeSeries(type, include, JSON.stringify(target_json_array), tag);
		}
	}catch (e) {
		alert("앱에서만 사용 가능합니다.");
	}
	
}

function searchTag(){
	var type = "tag";
	var include= false;
	var tag="tag";
	var target_json_array = tagList.map(s=> "RAYCOM;TAG;"+s.nodeId);
	try{
		if(checkMobile()=="ios"){
			var message = {  type: type, include: include , target_json_array: JSON.stringify(target_json_array) , tag: tag};
			window.webkit.messageHandlers.findQRCodeSeries.postMessage(message);
		}else{
			window.LexaApp.findQRCodeSeries(type, include, JSON.stringify(target_json_array), tag);
		}
	}catch (e) {
		alert("앱에서만 사용 가능합니다.");
	}
	
}

function setAppFindQRCode(qrcode, tag){
	if(tag == "worker"){
		$("#qrMessage").html("스마트태그가 교부되지 않은 작업자입니다.");
	}else if(tag == "tag"){ 
		$("#qrMessage").html("미교부된 스마트태그입니다.");
	}
	 $('#modal-qr').modal();
}

</script>
</body>
</html>
