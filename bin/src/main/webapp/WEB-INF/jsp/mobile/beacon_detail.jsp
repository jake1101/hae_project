<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String beaconParam = (String)request.getParameter("beaconParam"); %>

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
	<!-- <script src="../../dist/js/demo.js"></script> -->

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
<!--  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
	<script src="/resources/crypt/sha.js"></script>
	<!-- bootstrap datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
	
	<style>
		.container {
			background-color: white;
		}
		.text-input {
			width : 250px;
			height : 30px;
			font-size : 20px !important;
		}
	</style>
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
        	  비콘 상세 정보
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
        <div class="box-body">
        
        	<div class="form-group">
				<div class="input-group" style="width: 100% !important;">
		           	<span class="input-group-addon w80">major</span>
					<input type="text" class="form-control" id="major" maxlength="50">
					</select>
		        </div>
			</div>
			<div class="form-group">
				<div class="input-group" style="width: 100% !important;">
		           	<span class="input-group-addon w80">minor</span>
					<input type="text" class="form-control" id="minor" maxlength="50">
		        </div>
			</div>
			<div class="form-group">
				<div class="input-group" style="width: 100% !important;">
		           	<span class="input-group-addon w80">타입</span>
	                <select id="beaconType" class="form-control" style="width: 100% !important;" >
					</select>
		        </div>
			</div>
			<div class="form-group"  id="beaconTagDiv">
				<div class="input-group">
		           	<span class="input-group-addon w80">태그</span>
	                <input type="text" class="form-control" id="tag" maxlength="50" readonly>
	                <span class="input-group-btn" style="padding-left : 10px;">
						<button type="submit" name="search" id="search-btn" class="btn btn-5" onclick="settingBeacon()">
                          비콘 세팅
                        </button>
		            </span>
		        </div>
			</div>
			<div class="form-group">
				<div class="input-group">
		           	<span class="input-group-addon w80">위치</span>
	                <input type="text" class="form-control" id="lat" maxlength="50" readonly>
	                <input type="text" class="form-control" id="lon" maxlength="50" readonly>
	                 <span class="input-group-btn" style="padding-left : 10px;">
						 <button type="submit" name="search" id="search-btn" class="btn btn-5" onclick="settingLocation()" style="height: 80px;"> 
                          위치 설정
                        </button>
		            </span>
		        </div>
			</div>
			<div class="form-group">
				<div class="input-group">
		           	<span class="input-group-addon w80">표시명<br>대,중,소</span>
	                <input type="text" class="form-control" id="displayName1" onclick='openKeyboard(displayName1)' maxlength="50"/>
	                <input type="text" class="form-control" id="displayName2" onclick='openKeyboard(displayName2)' maxlength="50"/>
	                <input type="text" class="form-control" id="displayName3" onclick='openKeyboard(displayName3)' maxlength="50"/>
		        </div>
			</div>
			<div class="form-group">
				<div class="input-group" style="width: 100% !important;">
		           	<span class="input-group-addon w80">추가<br>기능</span>
		           	<label class="form-control">
						위험지역 여부
		               <input type="checkbox" id="isDanger" class="minimal" >
	             	</label>
		           	<label class="form-control">
						회수용비콘 여부
		               <input type="checkbox" id="isReturn" class="minimal" > 
	             	</label>
		        </div>
				
			</div>
			
			<div style="text-align:center; margin-top: 50px;">
                <button type="button" class="btn btn-back w130 mr5" id="back" onclick="onBack()">뒤로</button>
                <button type="button" id="save" class="btn btn-ok w130" onclick="onSave()">저장</button>
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
var beaconParam ;
if('<%=beaconParam%>' != 'null'){
	beaconParam = JSON.parse('<%=beaconParam%>');
}
$(document).ready(function(){
	var param = {};
	param.siteId= localStorage.siteId;
	findReasonList(param);
	
	if(checkMobile()=="ios"){
		$("#beaconTagDiv").css("display","none");
	}
});
function findReasonList(param){
	param.grpCd='IOT013';
	
	var successCallback = function(data){
		var responseData = data.body;
		for(var i = 0 ; i < responseData.length ; i++){
			 var data = responseData[i].data;
			 var label = responseData[i].label;
 			
		 $('#beaconType').append( $("<option value="+data+">"+label+"</option>"));
		}
		start();
    }
	mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
}

function start(){
	console.log(beaconParam);
	$("#major").val(beaconParam.major);
	$("#minor").val(beaconParam.minor);
	$("#beaconType").val(beaconParam.type);
	$("#tag").val(beaconParam.tag);
	$("#displayName1").val(beaconParam.displayName1);
	$("#displayName2").val(beaconParam.displayName2);
	$("#displayName3").val(beaconParam.displayName3);
	if(beaconParam.lat){
		$("#lat").val("lat : "+(beaconParam.lat).toFixed(6));
	}
	if(beaconParam.lon){
		$("#lon").val("lon : "+(beaconParam.lon).toFixed(6));
	}
	
	if(beaconParam.isDanger == "Y"){
		$("#isDanger").attr("checked",true);
	}else{
		$("#isDanger").attr("checked",false);
	}
	if(beaconParam.isReturn == "Y"){
		$("#isReturn").attr("checked",true);
	}else{
		$("#isReturn").attr("checked",false);
	}
	
	
}

function openKeyboard(param){
	try{
		if(checkMobile()=="ios"){
			var message = { type: "TEXT", text: $("#"+param.id).val() ,  tag: param.id };
			window.webkit.messageHandlers.showInputForm.postMessage(message);
		}else{
			window.LexaApp.showInputForm("TEXT", $("#"+param.id).val() ,param.id);
		}
	}catch(e){
		console.log(e);
	}
}

function setInputText(text, tag){
	if(tag == "displayName1"){
		$("#displayName1").val(text);
	}else if(tag == "displayName2"){
		$("#displayName2").val(text);
	}else if(tag == "displayName3"){
		$("#displayName3").val(text);
	}
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
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

function onSave()
{
	   try{
			if(checkMobile()=="ios"){
				var message = {  message: "저장 하시겠습니까?" , tag : "onSaveBeacon" };
				window.webkit.messageHandlers.confirmMessage.postMessage(message);
			}else{
				window.LexaApp.confirmMessage("저장 하시겠습니까?" , "onSaveBeacon");
			}
		}catch(e){
			var result = confirm("저장 하시겠습니까?");
			if(result){
				returnConfirm(true , "onSaveBeacon");
			}else{
				return;
			}
		}
		
} // checkConfirm  

function onSaveBeaconConfirm(){
	var param = {};
	
// 	var lat =  Number($("#lat").val().split(":")[1]);
// 	var lon = Number($("#lon").val().split(":")[1]);
	var lat = beaconParam.lat;
	var lon = beaconParam.lon;
	
	param.siteId= localStorage.siteId;
	param.id= beaconParam.id;
	param.major=$("#major").val();
	param.minor=$("#minor").val();
	param.tag=$("#tag").val();
	param.lat=lat;
	param.lon=lon;
	param.displayName1=$("#displayName1").val();
	param.displayName2=$("#displayName2").val();
	param.displayName3=$("#displayName3").val();
	param.property={};
	param.property.type=$("#beaconType").val();
	param.property.isDanger=$("#isDanger").is(":checked") ? "Y" : "N" ;
	param.property.isReturn=$("#isReturn").is(":checked") ? "Y" : "N" ;
	
	var successCallback = function(data){
		try{
			if(checkMobile()=="ios"){
				var message = {  message:  "저장되었습니다." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
	    		window.LexaApp.showToast("저장되었습니다.");
			}
		}catch(e) {
    		alert("저장되었습니다.");
		}
// 		history.back();
		changeTo('beaconMgnt.do');
    }
	mobileUtil.callApi(conf.raycomApiUrl+"beacon/upsert/array",[param],'post', successCallback);
}

function settingBeacon(){
	
	var major=Number($("#major").val());
	var minor=Number($("#minor").val());
	var isDanger =$("#isDanger").is(":checked") ? true : false 
			
	var param={};
	param.siteId= localStorage.siteId;
	
	var successCallback = function(data){
		try{
			if(checkMobile()=="ios"){
				var message = {  major: major , minor:minor , isDanger : isDanger , uuid : data.body.beaconUUID,dangerUuid : data.body.beaconUUID  };
				window.webkit.messageHandlers.setBeaconInfo.postMessage(message);
			}else{
				window.LexaApp.setBeaconInfo(major,minor,isDanger,data.body.beaconUUID,data.body.beaconUUID) 
			}
		}catch(e){
			console.log(e);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"sensor/environment",param,'post', successCallback);
}

function setAppBeacon(mac_address){
	$("#tag").val(mac_address);
}

function settingLocation(){
// 	var lat=$("#lat").val() ;
// 	var lon=$("#lon").val();
	var lat=beaconParam.lat;
	var lon=beaconParam.lon;
	var type = "beacon";
	var latlon = {};
	try{
		latlon = JSON.parse(localStorage.sitePinPoint);
	}catch(e){
		console.log(e);
	}
	
	
	try{
		
		if(checkMobile()=="ios"){
			var message = { displayTitle  :"비콘위치설정" , type : type , time : null, lat : lat , lon : lon, siteCenterLat : latlon.lat , siteCenterLon : latlon.lon };
			window.webkit.messageHandlers.showSelectMap.postMessage(message);
		}else{
			window.LexaApp.showSelectMap("비콘위치설정",type,null,lat,lon, latlon.lat, latlon.lon) ;
		}
	}catch(e){
		console.log(e);
	}
}

function setAppLocation(location){
	if(typeof location == "string"){
		location = JSON.parse(location);
	}
	beaconParam.lat = location.lat;
	beaconParam.lon = location.lon;
	$("#lat").val("lat : "+(beaconParam.lat).toFixed(6));
	$("#lon").val("lon : "+(beaconParam.lon).toFixed(6));
}

function onBack(){
	history.back();
}
</script>
</body>
</html>
