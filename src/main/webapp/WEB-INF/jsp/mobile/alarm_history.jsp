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
		.content {
			margin-top: 40px; 
			height: calc(100% - 91px);
		}
		.box-body{
			height:100%;
		}
			
		@media only screen and (max-width: 760px){
		   
        table, thead, tbody, th, td, tr {display: revert;}
		}

		</style>
	<script type="text/javascript">
 	</script>
</head>
						  
<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header" style="position:fixed; width:100%">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	 알림 현황
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
				<div>
					<div style="margin-bottom : 30px;">
						<div class="input-group date"  style="width: 100%; text-align: center;">
<!-- 						  <div class="input-group-addon"> -->
<!-- 							<i class="fa fa-calendar"></i> -->
<!-- 						  </div> -->
						
						  <input type="text" class="form-control pull-right" id="datepicker" readonly >
						  <input type="text" class="form-control pull-right" id="datepicker2" readonly >
						   
<!-- 						    <span class="input-group-addon" style="width : 42%;"> -->
				               <select id='state' class='form-control'></select>
<!-- 				            </span> -->
							
							<button style="margin-top: 10px;" type="submit" name="search" id="search-btn" class="btn btn-search w100" id="back" onclick="start()">검색</button>
							
							
					    </div>
		        	</div>
		        </div>
		        <div style="height:10px"></div>
               <div id="alarm_area" class="form-group" style="overflow:scroll; height: calc(100% - 68px);">
				</div>
		</div>
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

 
  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
   <form name="alarmDetail" id="alarmDetail">
  	  <input type="hidden"  name="alarmId" id="f_alarm_id">
	  <sec:csrfInput/>
  </form>	
</div>
								 

 <footer class="footer_wrap">
    Copyright &copy; (주)한라.All rights reserved.
  </footer>

<!-- ./wrapper -->

<div class="modal fade" id="modal-button">
   <div class="modal-dialog" style=" top:40%;">
     <div class="modal-content" style="box-shadow: none;background:none;">
<!--        <div class="modal-header" > -->
<!--          <button type="button" class="close" data-dismiss="modal" aria-label="Close"> -->
<!--            <span aria-hidden="true">&times;</span></button> -->
<!--          <h4 class="modal-title">버튼</h4> -->
<!--          <br> -->
<!--        </div> -->
       <div class="modal-body" >
      	<div id="buttonArea" style="text-align:center">
      	</div>
       </div>
     </div>
     <!-- /.modal-content -->
   </div>
   <!-- /.modal-dialog -->
 </div>
 <!-- /.modal -->  

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
	
	var settingDate = new Date();
	settingDate.setDate(settingDate.getDate()-3); //3일 전
	$('#datepicker').datepicker("update",settingDate);
	$('#datepicker2').datepicker("update",settingDate.toString());
	start();
	
	$('#state').append( $("<option>전체</option>"));
	$('#state').append( $("<option>조치 전</option>"));
    $('#state').append( $("<option>조치 중</option>"));
    $('#state').append( $("<option>조치 완료</option>"));
    $("#state option:eq(0)").attr("value","");
    $("#state option:eq(1)").attr("selected", "selected");
    $("#state option:eq(1)").attr("value",1);
    $("#state option:eq(2)").attr("value",3);
    $("#state option:eq(3)").attr("value",5);
});

  
function start(){
	findAlarmList();
}

function findAlarmList(){
	var param = {};
	param.siteId=localStorage.siteId;
	param.startDt=$("#datepicker").val();
	param.endDt=$("#datepicker2").val();
	param.state = $("#state").val();
	
	var successCallback = function(data){
		var resultList = data.body;
		$('.alarmInfo').remove();
		var html = '';
		if(resultList==null || resultList.length==0){
			var html = "<div style='background: #faebe8; padding: 20px; border-radius: 5px; text-align: center; margin-top: 15px; color: #9d726b;'  class='alarmInfo'>"
				+"해당 검색 기간에 조회된 알림이 없습니다.</div>";
			$('#alarm_area').append(html); 
		}
		for(var i = 0 ; i< resultList.length ; i++){
			var state;
			if(resultList[i].state == null ||  resultList[i].state == 1){
				state = "조치 전";
			}else if( resultList[i].state == 3){
				state = "조치 중";
			}else if( resultList[i].state == 5){
				state = "조치 완료";
			}
			var	answerer = resultList[i].property&&resultList[i].property.answerer ? resultList[i].property.answerer : ""; 
			var answer = resultList[i].answer? resultList[i].answer : ""; 
			var sendDt = resultList[i].sendDt; 
			var alarmType = resultList[i].alarmType; 
			var areaName = resultList[i].areaName ? resultList[i].areaName : "" ; 
			var dt = new Date(sendDt);
			var content = resultList[i].content; 
			if(content.length < 15){
				content = resultList[i].content; 
			}else{
				content = content.substring(0,15)+"...";
			}
			
			var html = "<div style='margin-bottom:0px ;  background:white; border-top:1px solid #f4f4f4;' id='alarmInfo"+resultList[i].seq+"' class='alarmInfo'>"
				+"<div onclick='openButton("+JSON.stringify(resultList[i])+")' style='width:100%; font-size:16px; padding:10px; font-weight:bold; color:black; text-align:left;'>"
				+"<table style='border-spacing: 3px; width : 100%;'>"
				+"<colgroup>"
				+"<col width='30%'/>"
				+"<col width='70%'/>"
				+"</colgroup>"
				+"<tr><th>알림번호</th><td>"+resultList[i].seq+"</td></tr>"
				+"<tr><th>발생시간</th><td>"+date_to_str(dt)+"</td></tr>"
				+"<tr><th>유형</th><td style='font-weight:bold ; color : red' >"+alarmType+"</td></tr>"
				+"<tr><th>내용</th><td>"+content+"</td></tr>"
				+"<tr><th>조치현황</th><td>"+state+"</td></tr>"
				+"<tr><th>조치자</th><td>"+answerer+"</td></tr>"
				+"</table></div></div>";
			$('#alarm_area').append(html);
		}       
    }
	mobileUtil.callApi(conf.raycomApiUrl+"alarm/list",param,'post', successCallback);
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



function openMap(param){
	param.siteId= localStorage.siteId;
	
	var successCallback = function(data){
		if(data.body.location){
			var object = data.body;
			var displayTitle = object.targetName;
			var type = object.targetType;
			var time = date_to_str(new Date(object.updatedDt));
			var lon = data.body.location.lon;
			var lat = data.body.location.lat;
			var latlon = {};
			try{
				latlon = JSON.parse(localStorage.sitePinPoint);
			}catch(e){
				console.log(e);
			}
			var siteCenterLat = latlon.lat;
			var siteCenterLon = latlon.lon;
			
			try{
				if(checkMobile()=="ios"){
					var message = {  displayTitle: displayTitle, type: type , time: time , lat: lat , lon: lon , siteCenterLat: siteCenterLat , siteCenterLon: siteCenterLon  };
					window.webkit.messageHandlers.showMap.postMessage(message);
				}else{
					window.LexaApp.showMap(displayTitle,  type,  time,  lat,  lon,  siteCenterLat,  siteCenterLon) ;
				}
			}catch(e) {
				console.log(e);        			
			}
		
		}else{
			try{
				if(checkMobile()=="ios"){
					var message = {  message: "위치정보가 없습니다." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
					window.LexaApp.showToast("위치정보가 없습니다.");		
				}
			}catch(e) {
				console.log(e);        			
			}
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"alarm/target/info",param,'post', successCallback);
}


function openDetail(param){
	 	$("#f_alarm_id").val(param);
		var $alarmDetailFrm = $("#alarmDetail");
	    $alarmDetailFrm.attr('action', '/mobile/alarmDetail.do');
	    $alarmDetailFrm.attr('method', 'get');
	    $alarmDetailFrm.submit();
} 

var selectedSeq;
function onDelete(seq){
	selectedSeq = seq;
	try{
		if(checkMobile()=="ios"){
			var message = {  message: "삭제하시겠습니까?" , tag : "alarmHistoryDelete"};
			window.webkit.messageHandlers.confirmMessage.postMessage(message);
		}else{
			window.LexaApp.confirmMessage("삭제하시겠습니까?","alarmHistoryDelete");
		}
	}catch(e){
		var result = confirm("삭제하시겠습니까?","alarmHistoryDelete");
		if(result){
			returnConfirm(true , "alarmHistoryDelete");
		}else{
			return;
		}
	}
	
}

function alarmHistoryDeleteConfirm(seq){
		var param={};
		param.siteId=localStorage.siteId;
		param.seq=seq;
		
		var successCallback = function(data){
			$('#modal-button').modal("hide");
        	if(data.header.code ==1){
	        	try{
	        		if(checkMobile()=="ios"){
	    				var message = {  message: "알림이 삭제 되었습니다." };
	    				window.webkit.messageHandlers.showToast.postMessage(message);
	    			}else{
		   				window.LexaApp.showToast("알림이 삭제 되었습니다.");
	    			}
	    		}catch(e) {
	    			alert("알림이 삭제 되었습니다.");
	    		}
	    			findAlarmList();
        	}else{
        		try{
        			if(checkMobile()=="ios"){
	    				var message = {  message: "알림이 삭제를 실패하였습니다." };
	    				window.webkit.messageHandlers.showToast.postMessage(message);
	    			}else{
		   				window.LexaApp.showToast("알림이 삭제를 실패하였습니다.");
	    			}
	    		}catch(e) {
	    			alert("알림이  삭제를 실패하였습니다.");
	    		}
        	}
	    }
		mobileUtil.callApi(conf.raycomApiUrl+"alarm/remove/array",[param],'post', successCallback);
}

function openButton(param){
	$('#buttonArea').html("");
	 $('#modal-button').modal();	
	 var htmlButton = "<button onclick='openMap("+JSON.stringify(param.targetInfo)
			 		 +")' class='btn btn-default'>지도</button> &nbsp <button  onclick='openDetail("
					 +param.seq+")' class='btn btn-default'>상세</button>  &nbsp"
					 + "<button  onclick='onDelete(" +param.seq+")' class='btn btn-danger'>삭제</button>"
	$('#buttonArea').append(htmlButton);
}



</script>
</body>
</html>
