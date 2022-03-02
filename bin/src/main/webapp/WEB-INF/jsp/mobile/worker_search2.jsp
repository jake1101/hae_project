<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String loginUser = (String)request.getSession().getAttribute("mLoginUser"); %>
<% String userToken = (String)request.getSession().getAttribute("mUserToken"); %>
<% String siteId = (String)request.getSession().getAttribute("siteId"); %>
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
		$(document).ready(function(){
			// 자동 로그인 처리 	
			var base = btoa("absADMIN");
			//console.log(base);
			//YWJzQURNSU4=
			
			if('<%=request.getParameter("uid")%>'!='null'){
				try{
					window.IotApp.showToast("자동로그인 되었습니다. 해제를 원하실 경우 로그아웃 후 다시 로그인 하시기 바랍니다. ");
				}catch(e){
					
				}
				
				var uid = '<%=request.getParameter("uid")%>';
				uid = uid.split(" ").join("+");
				var userid =atob(uid);
				userid = userid.split(" ").join("");
				//console.log(userid);
				userid = userid.substring(3);
				
				
				var $afterLoginFrm = $("#loginSuccess");
	       	     $afterLoginFrm.attr('action', '/mobile/mLoginSuccess.do');
	       	     $afterLoginFrm.attr('method', 'post');
	       	     $("#mLoginUser").val(userid);
	       	     $afterLoginFrm.submit();
			}
			
			
			
			
			
			var userInputId = getCookie("userInputId");
		    $("#username").val(userInputId.toUpperCase()); 
		     
		    if(getCookie("userInputId")!=""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
		        $("#idSaveCheck").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
		    }
		     
		    $("#idSaveCheck").change(function(){ // 체크박스에 변화가 있다면,
		        if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7일 동안 쿠키 보관
		        }else{ // ID 저장하기 체크 해제 시,
		            deleteCookie("userInputId");
		        }
		    });
		     
		    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
		    $("#username").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
		        if($("#idSaveCheck").is(":checked")){ // ID 저장하기를 체크한 상태라면,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7일 동안 쿠키 보관
		        }
		    });
			
			
			$("#btn_sign").click(function(){
				var loginForm = document.loginForm;
				
				var id = "<%=loginUser%>";
				var userToken = "<%=userToken%>";
				try{
					console.log(id);
					console.log(userToken);
					window.LexaApp.setLogout(id, userToken);
				}catch(e){
					console.log(e);
				}
				
			})// end of click
			
		})
		
		function hexToBase64(str) {
		  return btoa(String.fromCharCode.apply(null,
		    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
		  );
		}
		
		function base64ToHex(str) {
		  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
		    var tmp = bin.charCodeAt(i).toString(16);
		    if (tmp.length === 1) tmp = "0" + tmp;
		    hex[hex.length] = tmp;
		  }
		  return hex.join(" ");
		}
		
		function setCookie(cookieName, value, exdays){
		    var exdate = new Date();
		    exdate.setDate(exdate.getDate() + exdays);
		    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
		    document.cookie = cookieName + "=" + cookieValue;
		}
		 
		function deleteCookie(cookieName){
		    var expireDate = new Date();
		    expireDate.setDate(expireDate.getDate() - 1);
		    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
		}
		 
		function getCookie(cookieName) {
		    cookieName = cookieName + '=';
		    var cookieData = document.cookie;
		    var start = cookieData.indexOf(cookieName);
		    var cookieValue = '';
		    if(start != -1){
		        start += cookieName.length;
		        var end = cookieData.indexOf(';', start);
		        if(end == -1)end = cookieData.length;
		        cookieValue = cookieData.substring(start, end);
		    }
		    return unescape(cookieValue);
		}
		
		
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
        	작업자 검색
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
         	<h2 class="tt_7">작업자 검색</h2>
        	<div  class="form-group">
        		
		      <!-- Attachment -->
              <div class="attachment-block clearfix" style="margin-bottom:0px">
				  
                <div class="input-group">
                  <div class="input_frame">
                  <div class="container-1">
                      <span class="icon"><i class="fa fa-search" onclick="start()"></i></span>
                      <input type="search" id="search" placeholder="작업자코드" />
                  </div>
                  </div>
                  <span id="batteryBtn" class="input-group-btn" style="padding-left : 10px;">
                      <button class="btn btn-5" onclick="openQrcode('worker')">
                          촬영
                      </button>
                  </span>
                </div>
				<div style="padding-top:10px;">  
                  <img class="attachment-img" src="../img/qrCode.png" alt="Attachment Image">
                  <div class="attachment-pushed">
                    <div class="attachment-text" style="padding : 10px;">
                          작업자 코드가 기억나지 않으면 촬영버튼을 눌러 휴대폰에 저장된 QRCode를 촬영하여 인식시켜 주세요.   
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
                      <input type="search" id="search" placeholder="스마트태그 코드" />
                  </div>
                  </div>
                  <span id="batteryBtn" class="input-group-btn" style="padding-left : 10px;">
                      <button class="btn btn-5" onclick="openQrcode('tag')">
                          촬영
                      </button>
                  </span>
                </div>
				
				<div style="padding-top:10px;">  
                  <img class="attachment-img" src="../img/qrCode.png" alt="Attachment Image">
                  <div class="attachment-pushed">
                    <div class="attachment-text" style="padding : 10px;">
                          촬영 버튼을 누르면, QRCode 촬영 화면으로 이동합니다.  <br>
                          관리자에게 받은 스마트태그 앞면의 QRCode를 인식시켜주세요.
                    </div>
                  </div>
				</div>		
              </div>
        	</div>
        	<div style="text-align:center;">
			  <button class="btn btn-back w150" id="back" onclick="onBack()">뒤로</button>
       	 	</div>
       	 	<br>
         
		</div>
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess" style="margin-bottom:0px">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
  <form name="targetDetail" id="targetDetail" style="margin-bottom:0px">
  	  <input type="hidden"  name="qrCode" id="qrCode">
  	  <input type="hidden"  name="targetType" id="targetType">
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
	if('<%=code%>' != 'null'){
		$("#workerCode").val('<%=code%>');
	}
});


function openQrcode(param){
	try{
		window.LexaApp.getQRCode(param, param)
	}catch(e){
		console.log(e);
	}
}


function setAppShootQRCode(qrcode, tag){
	var qrArray = qrcode.split(";");
	if(qrArray[0]!="RAYCOM"){
		window.LexaApp.showMessage("올바르지 않은 qrCode입니다.");
		return ;
	}
	
	var param = {};
	
	param.targetId =qrArray[2];
	//////// 데이터 처리
	if(tag == "worker"){
		// 디테일화면으로이동
		$("#qrCode").val(param.targetId);
		$("#targetType").val("worker");
		var $targetDetailFrm = $("#targetDetail");
	    $targetDetailFrm.attr('action', '/mobile/targetDetail.do');
	    $targetDetailFrm.attr('method', 'get');
	    $targetDetailFrm.submit();
	}else if(tag =="tag"){
		// 디테일화면으로이동
		$("#qrCode").val(param.targetId);
		$("#targetType").val("tag");
		var $targetDetailFrm = $("#targetDetail");
	    $targetDetailFrm.attr('action', '/mobile/targetDetail.do');
	    $targetDetailFrm.attr('method', 'get');
	    $targetDetailFrm.submit();
	}

}
  
  
function onBack(){
	history.back();
}

function nativeBack() {
	history.back();
}
  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=<%=siteId%>;
}


function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
