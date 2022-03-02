<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String code = (String)request.getParameter("code"); %>

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
		}
	</style>

	<script type="text/javascript">
	</script>
</head>

<body class="hold-transition skin-blue sidebar-collapse sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header" style="position: fixed;   width: 100%;">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 3px;
   			 font-family: fontAwesome; color:white">
        	장비 검색
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
  <div class="content-wrapper" >

    <!-- Main content -->
    <section class="content">
     	<!-- Default box -->
     	 <div class="box-body">
<!--      		 <div class="input-group" style="margin-bottom:5px;"> -->
<!-- 	        	<span class="input-group-btn" > -->
<!-- 	                <button style=" width: 49%;margin-right:2%;" type="button" onclick="openQrcode('vehicle')" class="btn btn-default">장비 QR 찾기</button> -->
<!-- 		       	 	<button style=" width: 49%;"  type="button"  onclick="openQrcode('tag')" class="btn btn-default">스마트태그 QR 찾기</button> -->
<!-- 	            </span> -->
<!-- 	          </div> -->
			 
			    <div class="input_frame">
                 <div class="container-1">
                    <button type="submit" name="search" id="search-btn" class="icon"><i class="fa fa-search" onclick="start()"></i></button>
                    <input type="search" id="search" placeholder="검색" />
                 </div>
                </div>
			 
	         <div style="height:5px"></div>
              <div id="vehicle_area" class="form-group" style="height: calc(100% - 25px); overflow:scroll;">
			  </div>
		</div>
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess" style="margin-bottom:0px">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
  <form name="targetDetail" id="targetDetail" style="margin-bottom:0px">
  	  <input type="hidden"  name="qrCode" id="qrCode">
  	  <input type="hidden"  name="targetId" id="targetId">
  	  <input type="hidden"  name="targetType" id="targetType">
  	  <input type="hidden"  name="clickYn" id="clickYn">
	  <sec:csrfInput/>
  </form>	
</div>


<footer class="footer_wrap">
  Copyright &copy; (주)한라.All rights reserved.
</footer>
<!-- ./wrapper -->

<script>

// $(document).ajaxStart(function () {
//    Pace.restart()
//  })


$(document).ready(function(){
	start();
});

function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=localStorage.siteId;
	findVehicleList(param);
}

function findVehicleList(param){
		var successCallback = function(data){
			var resultList = data.body;
			console.log(resultList);
			$('.vehicleInfo').remove();
			var html = '';
			tagList = data.body;
			for(var i = 0 ; i< resultList.length ; i++){
				var workerName = resultList[i].workerName ? resultList[i].workerName : '운전자 없음';
				var nodeId = resultList[i].nodeId ? resultList[i].nodeId : '미교부';
				var html = "<div style='margin-bottom:0px ; background:white; border-top:1px solid #f4f4f4;' id='vehicleInfo"+resultList[i].id+"' class='vehicleInfo'>"
					+"<div onclick='vehicleDetail("+JSON.stringify(resultList[i])+")' style='width:100%; font-size:16px; padding:10px; font-weight:bold; color:black; text-align:left;'>"
					+"<table style='border-spacing: 3px; width : 100%;'>"
					+"<colgroup>"
					+"<col width='30%'/>"
					+"<col width='70%'/>"
					+"</colgroup>"
					+"<tr><th>장비명</th><td colspan='3'>"+resultList[i].name+"</td></tr>"
					+"<tr><th>협력사</th><td>"+ resultList[i].vendorName+"</td></tr>"
					+"<tr><th>운전자</th><td >"+ workerName+"</td></tr>"
					+"<tr><th>태그 ID</th><td>"+nodeId +"</td></tr>"
					+"</table></div></div>";
				
    			$('#vehicle_area').append(html);
			}   
	    }
		param.allSearch = $("#searchParam").val();
		mobileUtil.callApi(conf.raycomApiUrl+"vehicle/list",param,'post', successCallback);
	
} 


function openQrcode(param){
	try{
		if(checkMobile()=="ios"){
			var message = {  type: param, tag: param};
			window.webkit.messageHandlers.getQRCode.postMessage(message);
		}else{
			window.LexaApp.getQRCode(param, param);
		}
		
	}catch(e){
		console.log(e);
	}
}

function vehicleDetail(param){
	// 디테일화면으로이동
	console.log(param);
// 	$("#qrCode").val(param.id);
	$("#targetId").val(param.id);
	$("#targetType").val("vehicle");
	var $targetDetailFrm = $("#targetDetail");
    $targetDetailFrm.attr('action', '/mobile/targetDetail.do');
    $targetDetailFrm.attr('method', 'get');
    $targetDetailFrm.submit();
}

function setAppShootQRCode(qrcode, tag){
	var qrArray = qrcode.split(";");
	if(qrArray[0]!="RAYCOM"){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "올바르지 않은 qrCode입니다."};
				window.webkit.messageHandlers.showMessage.postMessage(message);
			}else{
				window.LexaApp.showMessage("올바르지 않은 qrCode입니다.");
			}
			
		}catch(e){
			console.log(e);
		}
		return ;
	}
	
	var param = {};
	
	param.targetId =qrArray[2];
	//////// 데이터 처리
	if(tag == "vehicle"){
		// 디테일화면으로이동
		$("#clickYn").val("N");
		$("#qrCode").val(param.targetId);
		$("#targetType").val("vehicle");
		var $targetDetailFrm = $("#targetDetail");
	    $targetDetailFrm.attr('action', '/mobile/targetDetail.do');
	    $targetDetailFrm.attr('method', 'get');
	    $targetDetailFrm.submit();
	}else if(tag =="tag"){
		// 디테일화면으로이동
		$("#clickYn").val("N");
		$("#qrCode").val(param.targetId);
		$("#targetType").val("tag");
		var $targetDetailFrm = $("#targetDetail");
	    $targetDetailFrm.attr('action', '/mobile/targetDetail.do');
	    $targetDetailFrm.attr('method', 'get');
	    $targetDetailFrm.submit();
	}

}
  

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}

</script>
</body>
</html>
