<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String targetId = (String)request.getParameter("targetId"); %>
<% String targetType = (String)request.getParameter("targetType"); %>
<% String qrCode = (String)request.getParameter("qrCode"); %>
<% String clickYn = (String)request.getParameter("clickYn"); %>


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
	<!-- bootstrap datepicker -->
  <link rel="stylesheet" href="../../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  
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
<!-- 	<script src="../../dist/js/demo.js"></script> -->

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
<!--  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
	<script src="/resources/crypt/sha.js"></script>
	<!-- bootstrap datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
	
	<style>
		@media only screen and (max-width: 760px){
		   
         	table, thead, tbody, th, td, tr {display: revert;}
        	
	   }
		th {padding-left: 0px !important;}
		td {padding-left: 5px !important;}
	</style>
	
	<script src="../../js/qrcode/jquery.qrcode.js"></script>
 	<script src="../../js/qrcode/qrcode.js"></script>
 
	<script type="text/javascript">
		
	</script>
</head>

<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	  상세 정보
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
    <section class="content">
      <!-- Default box -->
        <div class="box-body box box-default">
               <div id="target_detail_area" class="form-group">
				</div>
				<div style="text-align:center">
                <button type="button" class="btn btn-back w150" id="back" onclick="onBack()">뒤로</button>
             </div>
		</div>
		<!-- /.box-body -->
		
   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess" style="margin-bottom:0px;">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
   <form name="alarmDetail" id="alarmDetail" style="margin-bottom:0px;">
  	  <input type="hidden"  name="alarmId" id="f_alarm_id">
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
	//Date picker
	$('#datepicker').datepicker({
	  autoclose: true 
	})  
	$('#datepicker2').datepicker({
	  autoclose: true 
	})  
	
	start();
});

function start(){
	var site_id = null;
	var siteId = localStorage.siteId;
	var targetId = "<%=targetId%>"=="null"?null:"<%=targetId%>";
	var targetType = "<%=targetType%>"=="null"?null:"<%=targetType%>";
	var qrCode = "<%=qrCode%>"=="null"?null:"<%=qrCode%>";
	var clickYn = "<%=clickYn%>"=="null"?null:"<%=clickYn%>";
	
	
	var param = {};
	param.siteId=siteId;
	param.targetId=targetId;
	param.targetType=targetType;
	param.qrCode= qrCode;
	if(clickYn == "N"){
		findTargetDetail(param);
	}else{
		if(targetType == "vehicle"){
			findVehicleDetail(param);
		}else{
			if(qrCode){
				param.targetId = qrCode;
			}
			findWorkerDetail(param);
		}
	}
}

function findWorkerDetail(param){
	var successCallback = function(data){
		var resultInfo = data.body;
		$('.targetInfo').remove();
		var html = '';
			
		var	targetName = resultInfo.name ? resultInfo.name : ""; 
		var vendorName = resultInfo.vendorName? resultInfo.vendorName : ""; 
		var jobTypeName = resultInfo.jobTypeName ? resultInfo.jobTypeName : ""; 
		var phoneNumber = resultInfo.phoneNumber ? resultInfo.phoneNumber : ""; 
		var tag = resultInfo.tag ? resultInfo.tag : ""; 
		var sensorName = resultInfo.sensorName ? resultInfo.sensorName : "없음"; 
		var targetImage = resultInfo.property&&resultInfo.property.workerFace ? "/repository/"+resultInfo.property.workerFace[0].attFilePath : "../../img/empty.png";
		var qrCode = resultInfo.id ? "RAYCOM;WORKER;"+resultInfo.id  : "";
		
		var html = "<div id='targetInfo"+resultInfo.workerId+"' class=' targetInfo'>"
			+"<div  style='width:100%; font-size:16px; padding:3px; font-weight:bold; color:black; text-align:left;'>"
			+"<table class='table table-bordered' style='border-spacing: 3px; width : 100%;'>"
			+"<colgroup>"
			+"<col width='30%'/>"
			+"<col width='70%'/>"
			+"</colgroup>"
			+"<tr><th style='text-align:center; vertical :middle;'>이름</th><td>"+targetName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>협력사</th><td>"+vendorName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>직종</th><td>"+jobTypeName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>전화번호</th><td>"+phoneNumber+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>고유번호</th><td>"+tag+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>태그번호</th><td>"+sensorName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>사진</th><td style='text-align:center; height:200px;'><img style='height:100%; width:100%;'  id='targetImg' src='"+targetImage+"'></img></td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>qrCode</th><td id='qrDiv' style='text-align: center; margin: 30px;'></td></tr>"
			+"</table></div></div>"
		
		$('#target_detail_area').append(html);
			
		jQuery('#qrDiv').qrcode({
	 		width : 100,
	 		height : 100,
	 		text	: qrCode
	 	 });	
	}
	failCallback = function(){
		var html;
		if(param.targetType == "worker"){
			html = "<h4>작업자 정보가 없습니다.</h4>"
		}else if(param.targetType == "vehicle"){
			html = "<h4>이동장비 정보가 없습니다.</h4>"
		}
		$('#target_detail_area').append(html);  
	}
	mobileUtil.callApi(conf.raycomApiUrl+"location/target/detail",param,'post', successCallback, failCallback);

}
function findVehicleDetail(param){
	var successCallback = function(data){
		var resultInfo = data.body;
		$('.targetInfo').remove();
		var html = '';
			

		var	vehicleName = resultInfo.name  ? resultInfo.name  : ""; 
		var	workerName = resultInfo.workerName  ? resultInfo.workerName  : ""; 
		var vehicleType = resultInfo.typeName  ? resultInfo.typeName  : ""; 
		var vehicleVendor = resultInfo.vendorName  ? resultInfo.vendorName  : ""; 
		var sensorName = resultInfo.sensorName ? resultInfo.sensorName : "없음"; 
		var vehicleImage = resultInfo.image ? "/repository/"+resultInfo.image[0].attFilePath : "../../img/empty.png";
		
		var html = "<div id='targetInfo"+resultInfo.id+"' class=' targetInfo'>"
			+"<div  style='width:100%; font-size:16px; padding:3px; font-weight:bold; color:black; text-align:left;'>"
			+"<table class='table table-bordered' style='border-spacing: 3px; width : 100%;'>"
			+"<colgroup>"
			+"<col width='30%'/>"
			+"<col width='70%'/>"
			+"</colgroup>"
			+"<tr><th style='text-align:center; vertical :middle;'>장비명</th><td>"+vehicleName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>협력사</th><td>"+vehicleVendor+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>유형</th><td>"+vehicleType+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>태그번호</th><td>"+sensorName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>사진</th><td style='text-align:center; height:200px;'><img style='height:100%; width:100%;'  id='targetImg' src='"+vehicleImage+"'></img></td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>운전자</th><td>"+workerName+"</td></tr>"
			+"</table></div></div>"
			
		
			if(resultInfo.driver){
				var	workerName ; 
				var workerVendor ;
				var workerJobType;
				var phoneNumber ;
				var tag ;
				var targetImage;
				var qrCode ;
				
				 workerName = resultInfo.driver.name ? resultInfo.driver.name : ""; 
				 workerVendor = resultInfo.driver.vendorName? resultInfo.driver.vendorName : ""; 
				 workerJobType = resultInfo.driver.jobTypeName ? resultInfo.driver.jobTypeName : ""; 
				 phoneNumber = resultInfo.driver.phoneNumber ? resultInfo.driver.phoneNumber : ""; 
				 tag = resultInfo.driver.tag ? resultInfo.driver.tag : ""; 
				 targetImage = resultInfo.driver.property&&resultInfo.driver.property.workerFace ? "/repository/"+resultInfo.driver.property.workerFace[0].attFilePath : "../../img/empty.png";
				 qrCode = resultInfo.driver.id ? "RAYCOM;WORKER;"+resultInfo.driver.id  : "";
				 
				 html +=
					 "<div id='targetInfo"+resultInfo.driver.id+"' class=' targetInfo'>"
						+"<div  style='width:100%; font-size:16px; padding:3px; font-weight:bold; color:black; text-align:left;'>"
						+"<table class='table table-bordered' style='border-spacing: 3px; width : 100%;'>"
						+"<colgroup>"
						+"<col width='30%'/>"
						+"<col width='70%'/>"
						+"</colgroup>"
						+"<tr><th style='text-align:center; vertical :middle;'>이름</th><td>"+workerName+"</td></tr>"
						+"<tr><th style='text-align:center; vertical :middle;'>협력사</th><td>"+workerVendor+"</td></tr>"
						+"<tr><th style='text-align:center; vertical :middle;'>직종</th><td>"+workerJobType+"</td></tr>"
						+"<tr><th style='text-align:center; vertical :middle;'>전화번호</th><td>"+phoneNumber+"</td></tr>"
						+"<tr><th style='text-align:center; vertical :middle;'>고유번호</th><td>"+tag+"</td></tr>"
						+"<tr><th style='text-align:center; vertical :middle;'>사진</th><td style='text-align:center; height:200px;'><img style='height:100%; width:100%;'  id='targetImg' src='"+targetImage+"'></img></td></tr>"
						+"<tr><th style='text-align:center; vertical :middle;'>qrCode</th><td id='qrDiv' style='text-align: center; margin: 30px;'></td></tr>"
						+"</table></div></div>"
			}
			
			
		$('#target_detail_area').append(html);
			
		jQuery('#qrDiv').qrcode({
	 		width : 100,
	 		height : 100,
	 		text	: qrCode
	 	 });	
	}
	failCallback = function(){
		var html;
		if(param.targetType == "worker"){
			html = "<h4>작업자 정보가 없습니다.</h4>"
		}else if(param.targetType == "vehicle"){
			html = "<h4>이동장비 정보가 없습니다.</h4>"
		}
		$('#target_detail_area').append(html);  
	}
	mobileUtil.callApi(conf.raycomApiUrl+"location/target/detail",param,'post', successCallback, failCallback);
}

function findTargetDetail(param){
	var successCallback = function(data){
		var resultInfo = data.body;
		$('.targetInfo').remove();
		var html = '';
			
		var	targetName = resultInfo.name ? resultInfo.name : ""; 
		var vendorName = resultInfo.vendorName? resultInfo.vendorName : ""; 
		var jobTypeName = resultInfo.jobTypeName ? resultInfo.jobTypeName : ""; 
		var phoneNumber = resultInfo.phoneNumber ? resultInfo.phoneNumber : ""; 
		var tag = resultInfo.tag ? resultInfo.tag : ""; 
		var targetImage = resultInfo.property&&resultInfo.property.workerFace ? "/repository/"+resultInfo.property.workerFace[0].attFilePath : "../../img/empty.png";
		var qrCode = resultInfo.id ? "RAYCOM;WORKER;"+resultInfo.id  : "";
		
		var html = "<div id='targetInfo"+resultInfo.workerId+"' class=' targetInfo'>"
			+"<div  style='width:100%; font-size:16px; padding:3px; font-weight:bold; color:black; text-align:left;'>"
			+"<table class='table table-bordered' style='border-spacing: 3px; width : 100%;'>"
			+"<colgroup>"
			+"<col width='30%'/>"
			+"<col width='70%'/>"
			+"</colgroup>"
			+"<tr><th style='text-align:center; vertical :middle;'>이름</th><td>"+targetName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>협력사</th><td>"+vendorName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>직종</th><td>"+jobTypeName+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>전화번호</th><td>"+phoneNumber+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>태그</th><td>"+tag+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>사진</th><td style='text-align:center; height:200px;'><img style='height:100%; width:100%;'  id='targetImg' src='"+targetImage+"'></img></td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>qrCode</th><td id='qrDiv' style='text-align: center; margin: 30px;'></td></tr>"
			+"</table></div></div>"
		
		$('#target_detail_area').append(html);
		
		jQuery('#qrDiv').qrcode({
	 		width : 100,
	 		height : 100,
	 		text	: qrCode
	 	 });	
			
	}
	failCallback = function(){
		var html;
		if(param.targetType == "worker"){
			html = "<h4>작업자 정보가 없습니다.</h4>"
		}else if(param.targetType == "vehicle"){
			html = "<h4>이동장비 정보가 없습니다.</h4>"
		}else if(param.targetType == "tag"){
			html = "<h4>맵핑된 작업자가 없습니다.</h4>"
		}
		$('#target_detail_area').append(html);   
	}
	mobileUtil.callApi(conf.raycomApiUrl+"worker/mobile/search",param,'post', successCallback, failCallback);
}


function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



function openDetail(param){
	 	$("#f_alarm_id").val(param);
		var $alarmDetailFrm = $("#alarmDetail");
	    $alarmDetailFrm.attr('action', '/mobile/alarmDetail.do');
	    $alarmDetailFrm.attr('method', 'get');
	    $alarmDetailFrm.submit();
} 



function setAppPhotoFile(callback,tag){
	var callbackData =JSON.parse(callback);
	var grpCd = callbackData.body.grp_cd;
	
	if(tag == "answerImg1"){
		$("#answerImg1").attr("data",grpCd);
		var resource = callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
//	 	var resource = callbackData.body.idSetArray[0].path_file_nm + "-thumb";
		resource = resource.split("\\").join("/");
		$("#answerImg1").attr("src", "/repository/"+resource);
		$("#answerImg1").css("width","80px");
	}
}


function onBack(){
// 	window.location.href="/mobile/alarmHistory.do";
	var reffer = document.referrer;
	if(reffer.indexOf("/mobile/mLoginSuccess.do") >=  0){
		window.location.href = "/mobile/smartTagLocationState.do";		
	}else{
		history.back();
	}	
		
}

  
</script>
</body>
</html>
