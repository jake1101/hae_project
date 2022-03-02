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
	<!-- Pace style -->
	<link rel="stylesheet" href="../../plugins/pace/pace.min.css">
	
	<!-- bootstrap datepicker -->
	<link rel="stylesheet" href="../../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
	<sec:csrfMetaTags/>
	
	
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

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
	<!-- bootstrap datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
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
        	 이동장비 등록
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
            <div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">협력사<label style="color:red">*</label></label>
                <select id="vendorId" class="form-control"></select>
            </div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">유형<label style="color:red">*</label></label>
                <select id="typeId" class="form-control"></select>               	                  			
            </div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">장비명<label style="color:red">*</label></label>
                <input type="text" class="form-control" id="name" maxlength="50">
            </div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">등록번호<label style="color:red">*</label></label>
                <input type="text" class="form-control" id="enrollNum" maxlength="50">
            </div>
            <div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">운전자<label style="color:red">*</label></label>
                <select id="workerId" class="form-control"></select>
            </div>
<!-- 			<div class="form-group" style="display:flex; margin-bottom:5px;"> -->
<!--                 <label style="width: 100px; align-self: center;">제원</label> -->
<!--                 <input type="text" class="form-control" id="specification" maxlength="50"> -->
<!--             </div> -->
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">면허번호</label>
                <input type="text" class="form-control" id="licenseNum" maxlength="50">
            </div>
            <div class="form-group" style="display:flex; margin-bottom:5px;">
                 <label style="width: 100px; align-self: center;">보험<br>기간</label>
                 <div class="input-group date"  style="width: 100%; float: left">
				  <div class="input-group-addon">
					<i class="fa fa-calendar"></i>
				  </div>
				  <input type="text" class="form-control pull-right" id="datepicker" readonly >
			    </div>
                 <div class="input-group date"  style="width: 100%; float: left">
				  <div class="input-group-addon">
					<i class="fa fa-calendar"></i>
				  </div>
				  <input type="text" class="form-control pull-right" id="datepicker2" readonly >
			    </div>
            </div>
		</div>
		<div style="text-align:center">				
		  <button type="button" class="btn btn-resist" id="back" onclick="onEnter()">등록</button>
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
   <form name="enterSuccess" id="enterSuccess" style="margin-bottom:0px;">
  	  <input type="hidden"  name="api_body" id="f_api_body">
  	  <input type="hidden"  name="param" id="param">
  	  <input type="hidden"  value="max" name="side_bar_type" id="side_bar_type">
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
	
// 	$('#datepicker').datepicker("update",new Date());
// 	$('#datepicker2').datepicker("update",new Date());
	
	
});

$(document).ready(function(){
	start();
});

  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=localStorage.siteId;
	param.grpCd = "IOT004";
	findVendorList(param);
	findDriverList(param);
	findTypeList(param);
	
}


function findVendorList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
			if(i==0){
	             $('#vendorId').append( $("<option>선택 안함</option>"));
	             $("#vendorId option:eq(0)").attr("selected", "selected");
	             $("#vendorId option:eq("+i+")").attr("vendor_id",null);
	             $("#vendorId option:eq("+i+")").attr("value",null);
				
			}
             $('#vendorId').append( $("<option>"+resultList[i].name+"</option>"));
             $("#vendorId option:eq("+(i+1)+")").attr("vendor_id",resultList[i].id);
             $("#vendorId option:eq("+(i+1)+")").attr("value",resultList[i].id);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"vendor/list",param,'post', successCallback);
}
function findDriverList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
			if(i==0){
	             $('#workerId').append( $("<option>선택 안함</option>"));
	             $("#workerId option:eq(0)").attr("selected", "selected");
	             $("#workerId option:eq("+i+")").attr("worker_id",null);
	             $("#workerId option:eq("+i+")").attr("value",null);
				
			}
             $('#workerId').append( $("<option>"+resultList[i].name+"</option>"));
             $("#workerId option:eq("+(i+1)+")").attr("worker_id",resultList[i].id);
             $("#workerId option:eq("+(i+1)+")").attr("value",resultList[i].id);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"worker/list",param,'post', successCallback);
}
function findTypeList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
			if(i==0){
             $('#typeId').append( $("<option>선택 안함</option>"));
             $("#typeId option:eq(0)").attr("selected", "selected");
             $("#typeId option:eq("+i+")").attr("type_id",null);
             $("#typeId option:eq("+i+")").attr("value",null);
				
			}
			
             $('#typeId').append( $("<option>"+resultList[i].label+"</option>"));
             $("#typeId option:eq("+(i+1)+")").attr("type_id",resultList[i].data);
             $("#typeId option:eq("+(i+1)+")").attr("value",resultList[i].data);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
}


function onEnter()
{
	
		if($('#vendorId').val() == "선택 안함" ){
			alert("협력사는 필수 값 입니다.");
			$('#vendorId').focus();
			return;
		}
		if($('#typeId').val() == "선택 안함" ){
			alert("유형은 필수 값 입니다.");
			$('#typeId').focus();
			return;
		}
		if($('#name').val() == "" ){
			alert("장비명은 필수 값 입니다.");
			$('#name').focus();
			return;
		}
		if($('#enrollNum').val() == "" ){
			alert("등록번호는 필수 값 입니다.");
			$('#enrollNum').focus();
			return;
		}
		if($('#workerId').val() == "선택 안함" ){
			alert("운전자는 필수 값 입니다.");
			$('#workerId').focus();
			return;
		}
		
		var param = {
				"vendorId":$('#vendorId').val(),
				"type":$('#typeId').val(),
				"name":$('#name').val(),
				"workerId":$('#workerId').val()
		};
		param.property={};
		
		param.property.enrollNum = $('#enrollNum').val();
// 		param.property.specification = $('#specification').val();
		param.property.licenseNum = $('#licenseNum').val();
		param.property.startDt = $('#datepicker').val().replaceAll("/","");
		param.property.endDt = $('#datepicker2').val().replaceAll("/","");
		param.useFlag = 'Y';
		param.siteId=localStorage.siteId;
			
		//api호출하여 db에 저장
		var successCallback = function(data){
			
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "이동장비 등록이 완료 되었습니다." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
					window.LexaApp.showToast("이동장비 등록이 완료 되었습니다.");      
				}
			}catch(e) {
				alert("이동장비 등록이 완료 되었습니다.");        			
			}
			
			
	    }
// 	   try{
// 			if(checkMobile()=="ios"){
// 				var message = {  message: "등록 하시겠습니까?" , tag : "onEnter" };
// 				window.webkit.messageHandlers.confirmMessage.postMessage(message);
// 			}else{
// 				window.LexaApp.confirmMessage("등록 하시겠습니까?" , "onEnter");
// 			}
// 		}catch(e){
// 			var result = confirm("등록 하시겠습니까?");
// 			if(result){
// 				returnConfirm(true , "onEnter");
// 			}else{
// 				return;
// 			}
// 		}
		
		mobileUtil.callApi(conf.raycomApiUrl+"vehicle/upsert/array",[param],'post', successCallback);

		
} // checkConfirm  

// function onEnterConfirm(){
// 	var vendorId = $('#vendorId').val();
// 	var typeId= $('#typeId').val();
// 	var name = $('#name').val();
// 	var phoneNumber = $('#firstNum').val()+$('#secNum').val()+$('#thirdNum').val();
	
// 	if($('#vendorId').val() == "선택 안함"){
// 		vendorId = null;
// 	}
// 	if($('#typeId').val() == "선택 안함"){
// 		typeId = null;
// 	}
	
// 	var param = {
// 		"vendorId" : vendorId , 
// 		"typeId" : typeId, 
// 		"name" : name, 
// 		"birthDt" : birthDt, 
// 		"phoneNumber" : phoneNumber 
// 	}
	
// 	//////////////////////////////////////////////////////////////////////////////
// 	//validation
// 	//////////////////////////////////////////////////////////////////////////////
// 	param.siteId=localStorage.siteId;
// 	var successCallback = function(data){
// 		try{
// 			if(checkMobile()=="ios"){
// 				var message = {  message: "사전 작업자 등록이 완료 되었습니다." };
// 				window.webkit.messageHandlers.showToast.postMessage(message);
// 			}else{
// 				window.LexaApp.showToast("사전 작업자 등록이 완료 되었습니다.");      
// 			}
// 		}catch(e) {
// 			alert("사전 작업자 등록이 완료 되었습니다.");        			
// 		}
// 		var $enterSuccess = $("#enterSuccess");
//    	     $enterSuccess.attr('action', '/mobile/enterSuccess.do');
//    	     $enterSuccess.attr('method', 'get');
//    	     $("#f_api_body").val(data.body);
//    	     $("#param").val("max");
//    	     $enterSuccess.submit();
//     }
//     param.siteId= localStorage.siteId;
// 	mobileUtil.callApi(conf.raycomApiUrl+"worker/temp/upsert/array",[param],'post', successCallback);
// }



function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
