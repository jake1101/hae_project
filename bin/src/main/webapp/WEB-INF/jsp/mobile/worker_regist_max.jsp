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
	<!-- bootstrap datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>

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
        	 ?????? ????????? ??????
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
                <label style="width: 100px; align-self: center;">?????????</label>
                <select id="vendorId" class="form-control"></select>
            </div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">??????</label>
                <select id="jobTypeId" class="form-control"></select>               	                  			
            </div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">??????</label>
                <input type="text" class="form-control" id="name" maxlength="50">
            </div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">????????????</label>
                <select id="birthdayYear" class="form-control"  style="width: 39%; margin-right:1%;" onchange="changeYear()">
					</select>
		          	<select id="birthdayMonth" class="form-control" style="width: 29%; margin-right:1%; padding:0px;" onchange="changeMonth()">
					</select>
		          	<select id="birthdayDay" class="form-control"  style="width: 29%; padding:0px;">
					</select>	                  			
            </div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px; align-self: center;">?????????</label>
                 <select id="firstNum" class="form-control"  style="width: 30%; margin-right:1%;">
		          		<option value="010">010</option>
		          		<option value="011">011</option>
		          		<option value="016">016</option>
		          		<option value="017">017</option>
		          		<option value="018">018</option>
		          		<option value="019">019</option>
					</select>
					<input type="number" class="form-control" id="secNum"  maxlength="4" style="width: 32%; margin-right:1%;"  oninput="maxLengthCheck(this)"/>
		            <input type="number" class="form-control" id="thirdNum"   maxlength="4" style="width: 32%;"  oninput="maxLengthCheck(this)"/>                  			
            </div>
<!-- 			<div class="form-group"> -->
<!-- 					????????????????????? ?????? ?????? ??? ?????? ????????? ?????????. -->
<!-- 	           <div class="timeline-body"> -->
<!--                   <img src="http://placehold.it/150x100" alt="..." class="margin"> -->
<!--                 </div> -->
<!-- 			</div> -->
<!-- 			<div class="form-group"> -->
<!-- 				<div class="input-group"> -->
<!-- 		           	<span class="input-group-addon">?????? ??? ??? </span> -->
<!-- 		            <input type="text" class="form-control" id="checkNum" > -->
<!-- 		        </div> -->
<!-- 			</div> -->
		</div>
		<div style="text-align:center">				
		  <button type="button" class="btn btn-resist w150" id="back" onclick="onEnter()">??????</button>
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
  Copyright &copy; (???)??????.All rights reserved.
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
	$('#datepicker').datepicker("update",new Date());
	
	
});

$(document).ready(function(){
	start();
});

  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=localStorage.siteId;
	findVendorList(param);
	findJobTypeList(param);
	
	var yearList = [];
	var monthList = [];
	var dayList = [];
	var year =new Date().getFullYear();
	for(var i =1930 ; i<= year ; i++){
		yearList.push(i + "???");
	}
	
	for(var i = 1 ; i<=12 ; i ++){
		monthList.push(i + "???");
	}
	for(var i = 1 ; i<=31 ; i ++){
		dayList.push(i + "???");
	}
	
	
	for(var i = 0 ; i < yearList.length ; i++){
           $('#birthdayYear').append( $("<option>"+yearList[i]+"</option>"));
           $("#birthdayYear option:eq("+(i)+")").attr("value",yearList[i]);
	}
	for(var i = 0 ; i < monthList.length ; i++){
           $('#birthdayMonth').append( $("<option>"+monthList[i]+"</option>"));
           $("#birthdayMonth option:eq("+(i)+")").attr("value",monthList[i]);
	}
	for(var i = 0 ; i < dayList.length ; i++){
           $('#birthdayDay').append( $("<option>"+dayList[i]+"</option>"));
           $("#birthdayDay option:eq("+(i)+")").attr("value",dayList[i]);
	}
	
}

function changeYear(){
	$("#birthdayMonth").val("1???");
	changeMonth();
}

function changeMonth(){
	var year = Number($("#birthdayYear").val().substr(0,4));
	var dayList=[];
	var monArr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var lastDay;
	var month;
	
	if($("#birthdayMonth").val().length == 2){
		month = Number($("#birthdayMonth").val().substr(0,1));
	}else{
		month = Number($("#birthdayMonth").val().substr(0,2));
	}
	
	if($("#birthdayMonth").val() != "2???"){
		lastDay = monArr[month-1];
	}else{
		if((year%4 == 0 && year%100 !=0) || year%400 == 0){
			lastDay=29;
		}else{
			lastDay=28;
		}
	}
	
	for(var i = 1; i <= lastDay ; i++){
		dayList.push(i+"???");
	}
	 $('#birthdayDay option').remove();
	for(var i = 0 ; i < dayList.length ; i++){
        $('#birthdayDay').append( $("<option>"+dayList[i]+"</option>"));
        $("#birthdayDay option:eq("+(i)+")").attr("value",dayList[i]);
	}
}

function findVendorList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
			if(i==0){
	             $('#vendorId').append( $("<option>?????? ??????</option>"));
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
function findJobTypeList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
			if(i==0){
             $('#jobTypeId').append( $("<option>?????? ??????</option>"));
             $("#jobTypeId option:eq(0)").attr("selected", "selected");
             $("#jobTypeId option:eq("+i+")").attr("jobtype_id",null);
             $("#jobTypeId option:eq("+i+")").attr("value",null);
				
			}
			
             $('#jobTypeId').append( $("<option>"+resultList[i].jobTypeName+"</option>"));
             $("#jobTypeId option:eq("+(i+1)+")").attr("jobtype_id",resultList[i].id);
             $("#jobTypeId option:eq("+(i+1)+")").attr("value",resultList[i].id);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"worker/jobtype/list",param,'post', successCallback);
}


function onEnter()
{
	
		if($('#name').val() == "" ){
			alert("????????? ?????? ??? ?????????.");
			$('#name').focus();
			return;
		}
		if( $('#birthdayYear').val() == "" || $('#birthdayMonth').val() == "" || $('#birthdayDay').val() == ""){
			alert("??????????????? ?????? ??? ?????????.");
			$('#birthdayYear').focus();
			return;
		}
		if( $('#firstNum').val() == "" || $('#secNum').val() == "" || $('#thirdNum').val() == ""){
			alert("???????????? ?????? ??? ?????????.");
			$('#secNum').focus();
			return;
		}
		
	   try{
			if(checkMobile()=="ios"){
				var message = {  message: "?????? ???????????????????" , tag : "onEnter" };
				window.webkit.messageHandlers.confirmMessage.postMessage(message);
			}else{
				window.LexaApp.confirmMessage("?????? ???????????????????" , "onEnter");
			}
		}catch(e){
			var result = confirm("?????? ???????????????????");
			if(result){
				returnConfirm(true , "onEnter");
			}else{
				return;
			}
		}
		
} // checkConfirm  

function onEnterConfirm(){
	var vendorId = $('#vendorId').val();
	var jobTypeId= $('#jobTypeId').val();
	var name = $('#name').val();
	var phoneNumber = $('#firstNum').val()+$('#secNum').val()+$('#thirdNum').val();
	
	var birthdayYear = $("#birthdayYear").val().substr(0,4);
	var birthdayMonth;
	if($("#birthdayMonth").val().length == 2){
		birthdayMonth ="0"+ $("#birthdayMonth").val().substr(0,1);
	}else{
		birthdayMonth = $("#birthdayMonth").val().substr(0,2);
	}
	var birthdayDay;
	if($("#birthdayDay").val().length == 2){
		birthdayDay ="0"+  $("#birthdayDay").val().substr(0,1);
	}else{
		birthdayDay = $("#birthdayDay").val().substr(0,2);
	}
	
	var birthDt =birthdayYear+"-"+birthdayMonth+"-"+birthdayDay;
	
	
	if($('#vendorId').val() == "?????? ??????"){
		vendorId = null;
	}
	if($('#jobTypeId').val() == "?????? ??????"){
		jobTypeId = null;
	}
	
	var param = {
		"vendorId" : vendorId , 
		"jobTypeId" : jobTypeId, 
		"name" : name, 
		"birthDt" : birthDt, 
		"phoneNumber" : phoneNumber 
	}
	
	//////////////////////////////////////////////////////////////////////////////
	//validation
	//////////////////////////////////////////////////////////////////////////////
	param.siteId=localStorage.siteId;
	var successCallback = function(data){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "?????? ????????? ????????? ?????? ???????????????." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("?????? ????????? ????????? ?????? ???????????????.");      
			}
		}catch(e) {
			alert("?????? ????????? ????????? ?????? ???????????????.");        			
		}
		var $enterSuccess = $("#enterSuccess");
   	     $enterSuccess.attr('action', '/mobile/enterSuccess.do');
   	     $enterSuccess.attr('method', 'get');
   	     $("#f_api_body").val(data.body);
   	     $("#param").val("max");
   	     $enterSuccess.submit();
    }
    param.siteId= localStorage.siteId;
	mobileUtil.callApi(conf.raycomApiUrl+"worker/temp/upsert/array",[param],'post', successCallback);
}



function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
