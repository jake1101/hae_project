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
	
	<script type="text/javascript">
 	</script>
</head>

<body class="hold-transition skin-blue sidebar-collapse sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 3px;
   			 font-family: fontAwesome; color:white">
        	 ????????? ?????? ??????(????????????)
      </a>
      
<!-- 	  <a class="sidebar-toggle"></a> -->
	  
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
<!--           <li> -->
<!--             <a style='padding-left:10px;padding-right:10px;' onclick="checkConfirm()" data-toggle="control-sidebar"><i class="fa fa-sign-out"></i></a> -->
<!--           </li> -->
          <form id="logoutFormMobile" action="<c:url value="/logoutProcess.do" />" method="POST" hidden>
			<sec:csrfInput/>
		  </form>
        </ul>
      </div>
    </nav>
  </header>

  <!-- =============================================== -->

<%@ include file="/WEB-INF/jsp/mobile/sidebar_min.jsp" %>

  <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" >

    <!-- Main content -->
    <section class="content">
     	<!-- Default box -->
        <div class="box-body" >
         <div class="box box-info">
			<h2 class="tt_7">????????? ????????? ?????????????????????</h2>
         	
        	<div  class="form-group">        	  
				
		      <!-- Attachment -->
              <div class="attachment-block clearfix" style="margin-bottom:0px">
				  
                <div class="input-group">
                  <div class="input_frame">
                  <div class="container-1">
                      <span class="icon"><i class="fa fa-search" onclick="start()"></i></span>
                      <input type="search" id="search" placeholder="???????????????" />
                  </div>
                  </div>
                  <span id="batteryBtn" class="input-group-btn va_bottom" style="padding-left : 10px;">
                      <button class="btn btn-5" onclick="openQrcode('worker')">
                          ??????
                      </button>
                  </span>
                </div>
				<div style="padding-top:10px;">  
                  <img class="attachment-img" src="../img/qrCode.png" alt="Attachment Image">
                  <div class="attachment-pushed">
                    <div class="attachment-text" style="padding : 10px;">
                          ????????? ????????? ???????????? ????????? ??????????????? ?????? ???????????? ????????? QRCode??? ???????????? ???????????? ?????????.   
                    </div>
                  </div>
				</div>
              </div>
        	
        		
		      <!-- Attachment -->
              <div class="attachment-block clearfix">
	            <div class="input-group">
                  <div class="input_frame">
                  <div class="container-1">
                      <span class="icon"><i class="fa fa-search" onclick="start()"></i></span>
                      <input type="search" id="search" placeholder="??????????????? ??????" />
                  </div>
                  </div>
                  <span id="batteryBtn" class="input-group-btn va_bottom" style="padding-left : 10px;">
                      <button class="btn btn-5" onclick="openQrcode('tag')">
                          ??????
                      </button>
                  </span>
                </div>
				
				<div style="padding-top:10px;">  
                  <img class="attachment-img" src="../img/qrCode.png" alt="Attachment Image">
                  <div class="attachment-pushed">
                    <div class="attachment-text" style="padding : 10px;">
                          ?????? ????????? ?????????, QRCode ?????? ???????????? ???????????????.  <br>
                          ??????????????? ?????? ??????????????? ????????? QRCode??? ?????????????????????.
                    </div>
                  </div>
				</div>		
              </div>
        	</div>
			 <div style="text-align:center">
			 	<button type="button" id="save" class="btn btn-ok w150" onclick="onSave()">??????</button>
             </div>
			
       	 	<br>
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
	if('<%=code%>' != 'null'){
		$("#workerCode").val('<%=code%>');
	}else if(localStorage.tag != 'null'){
		$("#workerCode").val(localStorage.tag);
	}
	$("#regist").click(function(){
		window.location.href="/mobile/registMapping.do";
		
	})// end of click
	$("#regist_no").click(function(){
		window.location.href="/mobile/registNoMapping.do";
		
	})// end of click
	$("#return").click(function(){
// 		window.location.href="/mobile/home.do?type=worker";
		
	})// end of click
	
	
	$("#workerId").val(localStorage.loginUser);
	if(localStorage.leaderYn != "Y"){
		$("#workerQr").css("display","none");
	}
});


function openQrcode(param){
	try{
		if(checkMobile()=="ios"){
			var message = {  type: param, tag: param};
			window.webkit.messageHandlers.getQRCode.postMessage(message);
		}else{
			window.LexaApp.getQRCode(param, param)
		}
	}catch(e){
		console.log(e);
	}
}


function setAppShootQRCode(qrcode, tag){
	var qrArray = qrcode.split(";");
	if(qrArray[0]!="RAYCOM"){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "???????????? ?????? qrCode?????????."};
				window.webkit.messageHandlers.showMessage.postMessage(message);
			}else{
				window.LexaApp.showMessage("???????????? ?????? qrCode?????????.");
			}
			
		}catch(e){
			console.log(e);
		}
		return ;
	}
	
	var param = {};
	
	
	
	param.siteId = localStorage.siteId;
	//////// ????????? ??????
	if(tag == "worker"){
		if(qrArray[1] == "WORKER") {
			
			param.workerId =qrArray[2];
			$("#workerId").val(param.workerId);
			var successCallback = function(data){
				$("#workerCode").val(data.body.tag);				        			
				$("#workerName").val(data.body.name);	
		    }
			mobileUtil.callApi(conf.raycomApiUrl+"worker/search/mobile",param,'post', successCallback);
	  
		}else{
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "????????? qrCode??? ????????????." };
					window.webkit.messageHandlers.showMessage.postMessage(message);
				}else{
					window.LexaApp.showMessage("????????? qrCode??? ????????????."); 
				}
			}catch(e) {
				alert("????????? qrCode??? ????????????.");        			
			}
		}
		
	}else if(tag =="tag"){
		$("#sensorCode").val(qrArray[2]);		
	}

}
  
function onSave() {

	try{
		if(checkMobile()=="ios"){
			var message = {  message: "?????????????????????????" , tag :"registMapping"};
			window.webkit.messageHandlers.confirmMessage.postMessage(message);
		}else{
			window.LexaApp.confirmMessage("?????????????????????????","registMapping");
		}
	}catch(e){
		var result = confirm("?????????????????????????");
		if(result){
			returnConfirm(true , "registMapping");
		}else{
			return;
		}
	}
	
}
  
  
function registMappingConfirm(){
	var param = {};
	param.tag =$("#workerCode").val();
	param.workerId = $("#workerId").val();
	param.nodeId =$("#sensorCode").val();
	param.siteId = localStorage.siteId;
	var successCallback = function(data){
		if(data.body.result){
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "????????? ?????????????????????." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
    				window.LexaApp.showToast("????????? ?????????????????????.");
				}
			}catch(e){
				console.log(e);
			}
			
			if(localStorage.leaderYn == "Y"){
				$("#workerCode").val("");
			}
   			$("#sensorCode").val("");
		}else{
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "????????? ?????????????????????. ????????? ?????? ????????? ?????????." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
					window.LexaApp.showToast("????????? ?????????????????????. ????????? ?????? ????????? ?????????.");
				}
			}catch(e){
				console.log(e);
			}
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"sensor/mapping/target/mobile",param,'post', successCallback);
	
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
