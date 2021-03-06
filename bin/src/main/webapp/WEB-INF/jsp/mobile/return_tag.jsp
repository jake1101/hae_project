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
	<link rel="stylesheet" href="../../css/tablet.css">

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
        	 ????????? ?????? ?????? ??????
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
		<h2 class="tt_8">????????? ?????? ??????</h2>
        <div class="box-body" >
         <div class="box box-info">
        	<div  class="form-group">        	  
				
			  <!-- Attachment -->
              <div class="attachment-block clearfix">
	            <div class="input-group">
                  <div class="input_frame">
                    <div class="container-1">
                        <input class="form-control" type="text" id="sensorCode" placeholder="??????????????? QRCode ??????" />
                    </div>
                  </div>
                  <span id="batteryBtn" class="input-group-btn" style="padding-left : 10px;">
                      <button class="btn btn-5" onclick="openQrcode('tag')">
                          ??????
                      </button>
                  </span>
                </div>
				
				<div style="padding-top:10px;">  
                  <img class="attachment-img" src="../img/qrCode.png" alt="Attachment Image">
                  <div class="attachment-pushed">
                    <div class="attachment-text" style="padding : 10px;">
                          ???????????? ?????????, QRCode ?????? ???????????? ???????????????.<br>
                     	??????????????? ?????? ??????????????? ????????? QRCode??? ?????????????????????.<br>
                     	?????? ????????? ????????? ?????? ?????? ?????????.
                    </div>
                  </div>
				</div>		
              </div>
				
		     
        	</div>
			 <div style="text-align:center">
                <button type="button" class="btn btn-back w130 mr5" id="back" onclick="onBack()">??????</button>
                <button type="submit" class="btn btn-camera w130" onclick="openQrcode('tag')">??????</button>
             </div>
       	 	<br>
       	 	<div class="massage_bye">
				<img src="../img/ico_bye.png" alt="?????????">
        		<p>?????? ????????? ?????? ??????????????????.<br>????????? ????????????.</p>
       		</div>
        	
         </div>
         
		</div>
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="pull-right hidden-xs">
    </div>
    <strong>Copyright &copy; (???)??????.</strong> All rights
    reserved.
  </footer>


  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess" style="margin-bottom:0px;">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
</div>
<!-- ./wrapper -->

<script>

// $(document).ajaxStart(function () {
//    Pace.restart()
//  })


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

function onBack(){
	window.location.href="/mobile/smartTagSiteMapping.do";
}

function nativeBack() {
	window.location.href="/mobile/smartTagSiteMapping.do";
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
	
	param.workerId =qrArray[2];
	param.siteId = localStorage.siteId;
	//////// ????????? ??????
	 if(tag =="tag"){
		$("#sensorCode").val(qrArray[2]);		
		onSave();
	}

}
  
function onSave() {
	var param = {};
	
	param.tag =null;
	param.nodeId =$("#sensorCode").val();
	param.siteId = localStorage.siteId;
	
	//////// ????????? ??????
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
