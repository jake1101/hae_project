<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String side_bar_type = (String)request.getAttribute("side_bar_type"); %>
<% String typeParam = (String)request.getParameter("param"); %>
<% String key = (String)request.getParameter("key"); %>


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
      
    
        <c:set var="side_bar_type" value="<%=side_bar_type%>" />
 
		<c:if test="${side_bar_type eq 'max'}">
		  <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
     	  </a>
		</c:if>
		<c:if test="${side_bar_type eq 'min'}">
		  <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
     	  </a>
		</c:if>
      
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	 사전 작업자 등록 완료
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
  <c:set var="side_bar_type" value="<%=side_bar_type%>" />
 
<c:if test="${side_bar_type eq 'max'}">
<%@ include file="/WEB-INF/jsp/mobile/sidebar.jsp" %>
</c:if>
<c:if test="${side_bar_type eq 'min'}">
<%@ include file="/WEB-INF/jsp/mobile/sidebar_min.jsp" %>
</c:if>
  <!-- =============================================== -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
        <div class="massage-ok">
			사전 작업자 등록 완료
		</div>
		<!-- /.box-body -->
		
		 <div	style="text-align:center">
		 <button type="button" onclick="onBack()"  class="btn btn-back w150">뒤로</button>
       	</div>
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess">
  	  <input type="hidden"  name="siteId" id="f_siteId">
  	  <input type="hidden"  name="type" id="type">
  	  <input type="hidden"  name="key" id="key">
	  <sec:csrfInput/>
  </form>	
   <form name="enterSuccess" id="enterSuccess">
  	  <input type="hidden"  name="api_body" id="f_api_body">
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
	$('#datepicker').datepicker("update",new Date());
	
	
});

$(document).ready(function(){
	start();
});

  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId= localStorage.siteId;
}

function onBack(){
	if("<%=typeParam%>" == "max"){
		window.location.href="/mobile/registrationmax.do";
	}else if("<%=typeParam%>" == "min"){
		window.location.href="/mobile/registrationmin.do";
	}else if("<%=typeParam%>" == "no"){
		var $afterLoginFrm = $("#loginSuccess");
		 $afterLoginFrm.attr('action', '/mobile/registration.do');
   	     $afterLoginFrm.attr('method', 'get');
   	     $("#type").val("worker_regist");
   	 	 var key = '<%=key%>';
   	     $("#key").val(key);
   	     $afterLoginFrm.submit();
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
