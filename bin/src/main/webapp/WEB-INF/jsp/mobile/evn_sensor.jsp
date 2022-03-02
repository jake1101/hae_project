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
		.text-input {
			width : 250px;
			height : 30px;
			font-size : 20px !important;
		}
				   


	@media only screen and (max-width: 760px){
		 
		 .table-bordered>thead>tr>th, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>tbody>tr>td, .table-bordered>tfoot>tr>td {
	padding-left: 0;
		}
		   
        table, thead, tbody, th, td, tr {display: revert;}
		   
		tbody tr td {
            color: #000;
            background-color: #fff;
            font-size: 14px;
        }
		tbody tr th{
                padding-left: 10px;
                font-weight: normal;
                color: #f9836d;
			    font-size: 14px;
                background-color: #fdf0ed;
            }

	   }
	   
	   	
				
	</style>
	<script type="text/javascript">
 	</script>
</head>

<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header" >
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	 환경센서 정보
      </a>
      
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
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
		
		<div class="box-body">
            <div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 130px; align-self: center;">소음센서</label>
                <select id="noiseId" class="form-control" onchange="findNoiseList()"></select>
            </div>
			<div id="noise_list" class="form-group"></div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 130px; align-self: center;" onchange="findDustList()">미세먼지센서</label>
                <select id="dustId" class="form-control"></select>               	                  			
            </div>
			<div id="dust_list" class="form-group"></div>
			<div class="form-group" style="display:flex; margin-bottom:5px;">
                <label style="width: 130px; align-self: center;">풍향풍속센서</label>
				<select id="windId" class="form-control" onchange="findWindList()"></select>
            </div>
			<div id="wind_list" class="form-group"></div>
				
           
		</div>
			
		<div style="text-align:center">				
		  <button type="button" class="btn btn-resist w150" id="write" onclick="onWrite()">등록</button>
	    </div>
		
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess" style="margin-bottom:0px;">
  	  <input type="hidden"  name="siteId" id="f_siteId">
	  <sec:csrfInput/>
  </form>	
   <form name="alarmDetail" id="alarmDetail" style="margin-bottom:0px;">
  	  <input type="hidden"  name="alarmId" id="f_alarm_id">
	  <sec:csrfInput/>
  </form>	
  <form name="stopInfo" id="stopInfo" style="margin-bottom:0px;">
  	  <input type="hidden"  name="stopYn" id="f_stopYn">
	  <sec:csrfInput/>
  </form>	
</div>

<footer class="footer_wrap">
  Copyright &copy; (주)한라.All rights reserved.
</footer>
<!-- ./wrapper -->

<div class="modal fade" id="modal-button">
   <div class="modal-dialog" style="width:100%; height: 10%; position:fixed; bottom:0px;">
     <div class="modal-content" style="background:none;">
<!--        <div class="modal-header" > -->
<!--          <button type="button" class="close" data-dismiss="modal" aria-label="Close"> -->
<!--            <span aria-hidden="true">&times;</span></button> -->
<!--          <h4 class="modal-title">버튼</h4> -->
<!--          <br> -->
<!--        </div> -->
       <div class="modal-body" >
      	<div id="buttonArea" style="text-align:right">
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
	start();
});

  
function start(){
	findCommboList();
}

function findCommboList(){
	var param = {};
	param.siteId=localStorage.siteId;
	
	var successCallback = function(data){
		var resultInfo = data.body;
		console.log(resultInfo);
		var noiseList = resultInfo.noise;
		var dustList = resultInfo.dust;
		var windList = resultInfo.wind;
		
		$('.noiseInfo').remove();
		$('.dustInfo').remove();
		$('.windInfo').remove();
		
		for(var i = 0 ; i < noiseList.length ; i++){
             $('#noiseId').append( $("<option>"+noiseList[i].name+"</option>"));
             $("#noiseId option:eq("+(i)+")").attr("value",JSON.stringify(noiseList[i]));
		}
		for(var i = 0 ; i < dustList.length ; i++){
             $('#dustId').append( $("<option>"+dustList[i].name+"</option>"));
             $("#dustId option:eq("+(i)+")").attr("value",JSON.stringify(dustList[i]));
		}
		for(var i = 0 ; i < windList.length ; i++){
             $('#windId').append( $("<option>"+windList[i].name+"</option>"));
             $("#windId option:eq("+(i)+")").attr("value",JSON.stringify(windList[i]));
		}
		
		findNoiseList();   
		findDustList();   
		findWindList();   
    }
	mobileUtil.callApi(conf.raycomApiUrl+"mobile/env/list",param,'post', successCallback);
}

function findNoiseList(){
	
	var noiseList = JSON.parse($("#noiseId").val());
	$('.noiseInfo').remove();
	var html = '';
	var trs = '';
	for(var j = 0; j<noiseList.streamInfos.length ; j++){
		trs += "<tr><th>"+noiseList.streamInfos[j].streamNm +"</th><td style='text-align:center'>"+noiseList.streamInfos[j].data[0][1]+"</td></tr>";
	}
	var html = 
		"<table onclick='openButton("+JSON.stringify(noiseList)+")' class='table table-bordered noiseInfo' style='border-spacing: 3px; width : 100%;'>"
		+"<colgroup>"
		+"<col width='40%'/>"
		+"<col width='60%'/>"
		+"</colgroup>"
		+trs
		+"</table>";
	$('#noise_list').append(html);
}
function findDustList(){
	
	var dustList = JSON.parse($("#dustId").val());
	$('.dustInfo').remove();
	var html = '';
	var trs = '';
	for(var j = 0; j<dustList.streamInfos.length ; j++){
		trs += "<tr><th>"+dustList.streamInfos[j].streamNm +"</th><td style='text-align:center'>"+dustList.streamInfos[j].data[0][1]+"</td></tr>";
	}
	var html = 
		"<table onclick='openButton("+JSON.stringify(dustList)+")' class='table table-bordered dustInfo' style='border-spacing: 3px; width : 100%;'>"
		+"<colgroup>"
		+"<col width='40%'/>"
		+"<col width='60%'/>"
		+"</colgroup>"
		+trs
		+"</table>";
	$('#dust_list').append(html);
}
function findWindList(){
	
	var windList = JSON.parse($("#windId").val());
	$('.windInfo').remove();
	var html = '';
	var trs = '';
	for(var j = 0; j<windList.streamInfos.length ; j++){
		trs += "<tr><th>"+windList.streamInfos[j].streamNm +"</th><td style='text-align:center'>"+windList.streamInfos[j].data[0][1]+"</td></tr>";
	}
	var html = 
		"<table  onclick='openButton("+JSON.stringify(windList)+")' class='table table-bordered windInfo' style='border-spacing: 3px; width : 100%;'>"
		+"<colgroup>"
		+"<col width='40%'/>"
		+"<col width='60%'/>"
		+"</colgroup>"
		+trs
		+"</table>";
	$('#wind_list').append(html);
}




function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



function openMap(param){
	console.log(param);
	param.siteId= localStorage.siteId;
	
	if(param.latlon){
		var displayTitle = param.name;
		var type = "beacon";
		var time =  date_to_str(new Date());
		var lon = param.latlon.lon;
		var lat = param.latlon.lat;
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

function openButton(param){
	console.log(param);
	$('#buttonArea').html("");
	 $('#modal-button').modal();	
	 var htmlButton = "<button onclick='openMap("+JSON.stringify(param)
			 		 +")' class='btn btn-default'>지도</button>";
	$('#buttonArea').append(htmlButton);
}

function onWrite(){
	var $stopInfoFrm = $("#stopInfo");
    $stopInfoFrm.attr('action', '/mobile/workStop.do');
    $stopInfoFrm.attr('method', 'get');
    $("#f_stopYn").val("stopYn");
    $stopInfoFrm.submit();
}



</script>
</body>
</html>
