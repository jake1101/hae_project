<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String stopYn = (String)request.getParameter("stopYn"); %>

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
        	메시지 전송
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
                <label style="width: 100px;">구분</label>
                <select id="alarmType" class="form-control"  style="width: 100%;" onchange="changeType(event)">
		          		<option selected="selected" value="general">일반</option>
                 		<option value="stop">작업중지</option>
				</select>
            </div>
			
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px;">사유</label>
                <select id="reason" class="form-control"  style="width: 49%; margin-right: 1%;" onchange="changeReason(event)">
					</select>
	                <input type="text" class="form-control" style="width: 50%;" id="reasonWrite" maxlength="50">
		    </div>
            
			
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px;">중지시간</label>
                <input type="time" id="startTime"> 〜 <input type="time" id="endTime">
            </div>
	  
		    <div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 100px;">내용</label>
                <textarea id="content" class="form-control" rows="5" placeholder="Enter ..."></textarea>
            </div>
		    <br>
		    <br>
		    <label>
               <input type="checkbox" id="sendAllYn" class="minimal" >
             	모든 작업자에게 sms 전송	
             </label>
             <br>
             <br>
			<div style="text-align:center">
                <button type="button" class="btn btn-back w130 mr5" id="back" onclick="onBack()">뒤로</button>
                <button type="button" class="btn btn-send w130" onclick="onSend()">알림 발송</button>
            </div>
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
   <form name="enterSuccess" id="enterSuccess" style="margin-bottom:0px;">
  	  <input type="hidden"  name="api_body" id="f_api_body">
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
	start();
	$("#startTime").val(make_time(new Date(),0));
	$("#endTime").val(make_time(new Date(),1));
	
	if("<%=stopYn%>" == "stopYn"){
		$("option:selected").removeAttr("selected");
		$("#alarmType").val("stop").prop("selected", true);
		
		$(".hiddenYn").css("display","block");
	} 
});

  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId= localStorage.siteId;
	findReasonList(param);
	
}

function findReasonList(param){
	 var successCallback = function(data){
		var responseData = data.body;
		for(var i = 0 ; i < responseData.length ; i++){
				 var reason_id = responseData[i].data;
				 var reason_name = responseData[i].label;
	 			
			 $('#reason').append( $("<option>"+reason_name+"</option>"));
          $("#reason option:eq(0)").attr("selected", "selected");
          $("#reason option:eq("+i+")").attr("nation_id",reason_id);
          $("#reason option:eq("+i+")").attr("nation_name",reason_name);
          $("#reason option:eq("+i+")").attr("value",reason_name);
		}
    }
	param.grpCd='IOT021';
	mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
}
function date_to_str2(format)

{

    var year = format.getFullYear();

    var month = format.getMonth() + 1;

    if(month<10) month = '0' + month;

    var date = format.getDate();

    if(date<10) date = '0' + date;

    return year + "-" + month + "-" + date+ " ";

}

function make_time(format,plusHour)

{
    var hour = format.getHours() + plusHour;

    if(hour<10) hour = '0' + hour;

    var min = format.getMinutes();

    if(min<10) min = '0' + min;

    return  hour + ":" + min;

}


function onSend()
{
	   try{
			if(checkMobile()=="ios"){
				var message = {  message: "알림 발송 하시겠습니까?" , tag : "onSend" };
				window.webkit.messageHandlers.confirmMessage.postMessage(message);
			}else{
				window.LexaApp.confirmMessage("알림 발송 하시겠습니까?" , "onSend");
			}
		}catch(e){
			var result = confirm("알림 발송 하시겠습니까?");
			if(result){
				returnConfirm(true , "onSend");
			}else{
				return;
			}
		}
		
} // checkConfirm  

function onSendConfirm(){
	
	if($("#alarmType").val() == "stop"){
		var dateStr = date_to_str2(new Date());
		
		var reasonVal;
		if($('#reason').val() == "직접입력"){
			reasonVal = $('#reasonWrite').val();
		}else{
			reasonVal = $('#reason').val();
		}
		var param = {
			"reason" :reasonVal, 
			"startTime" :  dateStr+ $('#startTime').val(), 
			"endTime" :dateStr+ $('#endTime').val(), 
			"content" : $('#content').val(), 
			"sendAllYn" :$("#sendAllYn").is(":checked") ? "Y" : "N" 
		}
		
		param.siteId= localStorage.siteId;
		var successCallback = function(data){
			try{
				if(checkMobile()=="ios"){
					var message = {  message: data.header.message };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
	        		window.LexaApp.showToast(data.header.message);
				}
    		}catch(e) {
        		alert(data.header.message);
    		}
    		
    		history.back();
	    }
		mobileUtil.callApi(conf.raycomApiUrl+"message/interrupt",param,'post', successCallback);
	}else if($("#alarmType").val() == "general"){
		
		var param = {
			"content" : $('#content').val(), 
			"sendAllYn" :$("#sendAllYn").is(":checked") ? "Y" : "N" 
		}
		
		param.siteId= localStorage.siteId;
		
		var successCallback = function(data){
			try{
				if(checkMobile()=="ios"){
					var message = {  message: data.header.message };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
	        		window.LexaApp.showToast(data.header.message);
				}
    		}catch(e) {
        		alert(data.header.message);
    		}
	    }
		mobileUtil.callApi(conf.raycomApiUrl+"message/notify",param,'post', successCallback);
	}
	
}



function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}


function onBack(){
	history.back();
}

function changeReason(e){
	if(e.target.value == "직접입력"){
		$("#reasonWrite").css("display","block");
	}else{
		$("#reasonWrite").css("display","none");
	}
}
function changeType(e){
	if(e.target.value == "general"){
		$(".hiddenYn").css("display","none");
	}else{
		$(".hiddenYn").css("display","block");
	}
}

function nativeBack() {
	history.back();
}

</script>
</body>
</html>
