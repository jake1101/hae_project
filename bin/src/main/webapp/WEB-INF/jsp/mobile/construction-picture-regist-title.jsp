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
	
	<sec:csrfMetaTags/>
	
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
	<script src="../../bower_components/jquery-ui/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="../../bower_components/jquery-ui/jquery-ui.min.css">
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

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	<script src="/resources/crypt/sha.js"></script>

	<!--  한글 자음모음 분리 하는 라이브러리. -->
	<script type="text/javascript" src="/js/hangul/hangul.js"></script>
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
        	 시공사진 등록
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
        <div class="box-body" >
         <div class="box box-info">
         	<h2 class="tt_8">제목 (작업명)</h2>
        	<div  class="form-group">
        		<div class="input-group" style="width:100%; padding-bottom: 20px;">
	                <input type="text" class="form-control" id="workTitle" maxlength="50">
		        </div>
        		
	       		<label>
	               <input type="checkbox" id="preTitle" name ="preTitleYn" class="minimal" >
	             	이전 제목으로 계속 등록 하기
	            </label>
        	
        		
            </div>
        	</div>
			
			<div style="text-align:center; margin-top: 50px;">
                <button type="submit" onclick = "onNext()" class="btn btn-next w150">다음</button>
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
   <form name="pictureDetail" id="pictureDetail">
  	  <input type="hidden"  name="pictureParamTitle" id="pictureParamTitle">
  	  <input type="hidden"  name="pictureParamPicId" id="pictureParamPicId">
	  <sec:csrfInput/>
  </form>	
</div>

<footer class="footer_wrap">
  Copyright &copy; (주)한라.All rights reserved.
</footer>
<!-- ./wrapper -->

<script>
var preTitle = ""; 
var constPicId = ""; 

$(document).ready(function(){
		
//   	if(checkMobile()=="ios"){
// 		var message = {  message: "" };
// 		window.webkit.messageHandlers.getPreTitle.postMessage(message);
// 	}else{
// 		window.LexaApp.getPreTitle();  
// 	}
	
	$("#preTitle").change(function(){
        if($("#preTitle").is(":checked")){
//         	$("#workTitle").val(preTitle);
        	if(checkMobile()=="ios"){
    			var message = {  message: "" };
    			window.webkit.messageHandlers.getPreTitle.postMessage(message);
    		}else{
    			window.LexaApp.getPreTitle();  
    		}
        }else{
        	$("#workTitle").val("");
        	$("#pictureParamTitle").val("");
        	$("#pictureParamPicId").val("");
        }
    });
});

function onNext() {
	
// 	if($("input:checkbox[name=preTitleYn]").is(":checked") == true) {
// 	  	if(checkMobile()=="ios"){
// 			var message = {  message: "" };
// 			window.webkit.messageHandlers.getPreTitle.postMessage(message);
// 		}else{
// 			window.LexaApp.getPreTitle();  
// 		}
// 	}else{
		if(!$("#workTitle").val()){
			if(checkMobile()=="ios"){
				var message = {  message: "제목을 입력하세요." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("제목을 입력하세요.");  
			}
			
			return;
		}
// 	}
	
	$("#pictureParamTitle").val($("#workTitle").val());
	$("#pictureParamPicId").val(constPicId);
	var $pictureDetailFrm = $("#pictureDetail");
    $pictureDetailFrm.attr('action', '/mobile/pictureRegistDetail.do');
    $pictureDetailFrm.attr('method', 'get');
    $pictureDetailFrm.submit();
	
	
}

function setPreTitle(id,title){
	preTitle = title;
	constPicId = id;
	if(id == -1){
		if(checkMobile()=="ios"){
			var message = {  message: "이전 제목이 없습니다" };
			window.webkit.messageHandlers.showToast.postMessage(message);
		}else{
			window.LexaApp.showToast("이전 제목이 없습니다");  
		}
		return;
	}
	$("#workTitle").val(title);
	
}
 
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
