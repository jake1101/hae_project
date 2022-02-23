<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String code = (String)request.getParameter("code"); %>
<% String workerName = (String)request.getParameter("worker_name"); %>

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
	<!-- <script src="../../dist/js/demo.js"></script> -->

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
<!--  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
	<script src="/resources/crypt/sha.js"></script>
	<link rel="stylesheet" href="../../css/tablet.css">

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
        	 스마트 태그 교부(기존 작업자용)
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
			<h2 class="tt_7">등록된 작업자 스마트태그 교부</h2>
        	<div  class="form-group">
        	  
			  <!-- Attachment -->
              <div class="attachment-block clearfix" style="margin-bottom:0px">
				  
                <div class="input-group">
                  <div class="input_frame">
                    <div class="container-1">
                        <input class="form-control" style="margin-right: 2%; float: left; width: 49%;" type="text" id="workerName" placeholder="이름" />
                        <input class="form-control" style="float: right; width: 49%;" type="text" id="workerId" placeholder="작업자ID" />
                    </div>
                  </div>
                  <span id="batteryBtn" class="input-group-btn va_bottom" style="padding-left : 10px;">
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
                        <input class="form-control" type="text" id="sensorCode" placeholder="스마트태그 QRCode 촬영" />
                    </div>
                  </div>
                  <span id="batteryBtn" class="input-group-btn va_bottom" style="padding-left : 10px;">
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
		     
			 
        	<div style="text-align:center">
        	  <button type="button" class="btn btn-back w130" style="margin-right:5px;" id="back" onclick="onBack()">뒤로</button>
			  <button type="submit" class="btn btn-ok w130" onclick="onSave()">확인</button>
       	 	</div>
       	 	<br>
         </div>
         
		
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
  
  <!-- /.content-wrapper -->

  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess">
  	  <input type="hidden"  name="siteId" id="f_siteId">
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
	if('<%=code%>' != 'null'){
		$("#workerCode").val('<%=code%>');
	}
	if('<%=workerName%>' != 'null'){
		$("#workerName").val('<%=workerName%>');
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
	
	var param = {};
	param.siteId=localStorage.siteId;
	var successCallback = function(data){
		var resultList = data.body;
		
		//이부분이 초성 검색이 가능하게 만들어 주는 부분
		let source = $.map(resultList, function(item) { //json[i] 번째 에 있는게 item 임.
			chosung = "";
			//Hangul.d(item, true) 을 하게 되면 item이 분해가 되어서 
			//["ㄱ", "ㅣ", "ㅁ"],["ㅊ", "ㅣ"],[" "],["ㅂ", "ㅗ", "ㄲ"],["ㅇ", "ㅡ", "ㅁ"],["ㅂ", "ㅏ", "ㅂ"]
			//으로 나오는데 이중 0번째 인덱스만 가지고 오면 초성이다.
			
			Hangul.d(item.name, true).forEach(function(strItem, index) {
				if(strItem[0] != " "){	//띄어 쓰기가 아니면
					chosung += strItem[0];//초성 추가
				}
			});
			return {
				label : chosung + "|" +item.name, //실제 검색어랑 비교 대상 ㄱㅊㅂㅇㅂ|김치 볶음밥 이 저장된다.
				chosung : chosung,	//ㄱㅊㅂㅇㅂ
				value : item.name, //김치 볶음밥
				id : item.id, 
				vendorName : item.vendorName,
				jobTypeName : item.jobTypeName
			}
		});
		
		
	    $("#workerName").autocomplete({
	        source: source,

	        select: function(event, ui) {
	        	$("#workerCode").val(ui.item.tag);	
	        	$("#workerId").val(ui.item.id);
	        },

	        focus: function(event, ui) {
	            return false;
	        }
	    })
	    .autocomplete( "instance" )._renderItem = function( ul, item ) {	
	      return $( "<li>" )	//기본 tag가 li로 되어 있음 
	        .append( "<div>" +item.vendorName + " [" + item.jobTypeName+ "] " + item.value + "</div>" )	//여기에다가 원하는 모양의 HTML을 만들면 UI가 원하는 모양으로 변함.
	        .appendTo( ul );	//웹 상으로 보이는 건 정상적인 "김치 볶음밥" 인데 내부에서는 ㄱㅊㅂㅇㅂ,김치 볶음밥 에서 검색을 함.
	    };
    }
	mobileUtil.callApi(conf.raycomApiUrl+"worker/list",param,'post', successCallback);
});

function namekeydown(){
	$("#workerId").val("");
}

function openQrcode(param){
	try{
		if(checkMobile()=="ios"){
			var message = {  type: param, tag: param};
			window.webkit.messageHandlers.getQRCode.postMessage(message);
		}else{
			window.LexaApp.getQRCode(param, param);
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
				var message = {  message: "올바르지 않은 qrCode입니다."};
				window.webkit.messageHandlers.showMessage.postMessage(message);
			}else{
				window.LexaApp.showMessage("올바르지 않은 qrCode입니다.");
			}
			
		}catch(e){
			console.log(e);
		}
		return ;
	}
	
	var param = {};
	
	
	
	param.siteId = localStorage.siteId;
	//////// 데이터 처리
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
					var message = {  message: "작업자 qrCode가 아닙니다." };
					window.webkit.messageHandlers.showMessage.postMessage(message);
				}else{
					window.LexaApp.showMessage("작업자 qrCode가 아닙니다."); 
				}
			}catch(e) {
				alert("작업자 qrCode가 아닙니다.");        			
			}
		}
		
	}else if(tag =="tag"){
		$("#sensorCode").val(qrArray[2]);		
	}

}
  
function onSave() {

	if(!$("#workerId").val()){
		if(checkMobile()=="ios"){
			var message = {  message: "검색한 작업자를 선택해주세요." };
			window.webkit.messageHandlers.showToast.postMessage(message);
		}else{
			window.LexaApp.showToast("검색한 작업자를 선택해주세요.");  
		}
		
		return;
	}

	try{
		if(checkMobile()=="ios"){
			var message = {  message: "저장하시겠습니까?", tag : "registMapping"};
			window.webkit.messageHandlers.confirmMessage.postMessage(message);
		}else{
			window.LexaApp.confirmMessage("저장하시겠습니까?","registMapping");
		}
		
	}catch(e){
		var result = confirm("저장하시겠습니까?");
		if(result){
			returnConfirm(true ,"registMapping");
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
	param.siteId =  localStorage.siteId;
	
	var successCallback = function(data){
		if(data.body.result){
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "맵핑에 성공하였습니다." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
					window.LexaApp.showToast("맵핑에 성공하였습니다.");  
				}
			}catch(e){
				console.log(e);
			}
			$("#workerName").val("");
			$("#workerCode").val("");
			$("#workerId").val("");
			$("#sensorCode").val("");
		}else{
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "맵핑에 실패하였습니다. 정보를 다시 확인해 주세요." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
					window.LexaApp.showToast("맵핑에 실패하였습니다. 정보를 다시 확인해 주세요.");
				}
			}catch(e){
				console.log(e);
			}
			$("#workerName").val("");
			$("#workerCode").val("");
			$("#workerId").val("");
			$("#sensorCode").val("");
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"sensor/mapping/target/mobile",param,'post', successCallback);
}
function onBack(){
	window.location.href="/mobile/smartTagSiteMapping.do";
}
function nativeBack() {
	window.location.href="/mobile/smartTagSiteMapping.do";
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
