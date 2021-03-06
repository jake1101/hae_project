<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String workerId = (String)request.getParameter("worker_id"); %>
<% String workerName = (String)request.getParameter("worker_name"); %>
<% String birthDt = (String)request.getParameter("birth_dt"); %>
<% String phoneNumber = (String)request.getParameter("phone_number"); %>
<% String docNumber = (String)request.getParameter("doc_number"); %>
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
		.selectedRow {
		   background : blue;
		}
		.selectedDiv {
		   height : 600px;
		}
		.box-body {
	       margin-top: 12%;
		}
	</style>
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
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	 ????????? ?????? ??????(?????? ????????????)
      </a>
      
	  
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

  <section class="content" id="section">
     	<!-- Default box -->
        <div class="box-body" >
         <div class="box box-info">
        	<div class="box">
	            <div class="box-header with-border">
	             <h2 class="tt_7">?????? ????????? ??????</h2>
	             <span style="float:right"><h3 class="box-title">???????????? <%=docNumber%></h3></span>
	            </div>
	            <!-- /.box-header -->
         		<div style="padding: 20px;">
	              <table style="width:100%;">
	              	<colgroup>
		               <col />
		           </colgroup>
	                <tr>
	                	<td>
		                ??? ????????? ??????  <button style="float:right;" type="button" onclick="sendMessage()"  class="btn btn-danger ">?????? ??????</button>
		                </td>
	                </tr>
	                <tr >
	                	<td style="text-align:center">
		               		<div class="fs18" id="workerCode">
								????????? ?????? : <%=workerName%> <br> ????????? ?????? : <%=code%>
					        </div>
				        </td>
	                </tr>
	                <tr>
	                <td>
	               	<br>  ??? ????????? ????????? ??????????????????. ??????????????? ?????? ?????? ?????? ????????? ?????? ??? ??? ????????????.<br>
<!-- 	               	  ???   ??????????????? ??? ????????? QRCode??? ?????? ???????????????. ????????? ????????? ???????????? ????????? QRCode??? ????????? ??? ????????????. -->
	               	  
	                 </td>
	                </tr>
	                <tr>
	                </tr>
	              </table>
	            </div>
         </div>
         	
		</div>
		<!-- /.box-body -->
	    <div	style="text-align:center">
		 <button type="button" onclick="onBack()"  class="btn btn-default2 mr5">????????????</button>
       	 <button type="button" onclick="goMapping()" class="btn btn-default3">??????????????????</button>       	 
       	</div>
	   </section>
	  
  </div>
  <!-- /.content-wrapper -->

  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
   <form name="resgistSuccess" id="resgistSuccess">
  	  <input type="hidden"  name="code" id="f_code">
  	  <input type="hidden"  name="worker_name" id="f_worker_name">
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
	start();
	
});


  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId= localStorage.siteId;
}


function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}

function sendMessage(){
	var phoneNumber ="<%=phoneNumber%>";
	var workerName ="<%=workerName%>";
	var workerCode ="<%=code%>";
	 var siteId = localStorage.siteId;
	var param = {};
	param.title="????????? ?????? ?????? ?????? ["+siteName+"]";
	param.body= "["+siteName+"] ????????? ?????? ?????? ??????\r\n"+workerName+"?????? ????????? ????????? "+workerCode+"?????????. \r\n" +'?????????????????? ???????????? ?????? : \r\n' +location.protocol + '//' + location.host + '/mdownload.do   \r\n' ;
	param.smsType="input";
	param.phoneNumber=phoneNumber;
	
	var successCallback = function(data){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "??????????????? ?????? ???????????????." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("??????????????? ?????? ???????????????.");
			}
		}catch(e) {
			alert("??????????????? ?????? ???????????????.");
		}
    }
	var failCallback = function(data){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "?????? ????????? ?????? ???????????????." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("?????? ????????? ?????? ???????????????.");
			}
		}catch(e) {
			alert("?????? ????????? ?????? ???????????????.");
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"message/send/sms",param,'post', successCallback,failCallback);
}
function onBack(){
	
	window.location.href="/mobile/smartTagSiteMapping.do";
}

function goMapping(){
	$("#f_code").val('<%=code%>');
	$("#f_worker_name").val('<%=workerName%>');
	var $resgistSuccessFrm = $("#resgistSuccess");
    $resgistSuccessFrm.attr('action', '/mobile/registMapping.do');
    $resgistSuccessFrm.attr('method', 'get');
    $resgistSuccessFrm.submit();
	
}
</script>
</body>
</html>
