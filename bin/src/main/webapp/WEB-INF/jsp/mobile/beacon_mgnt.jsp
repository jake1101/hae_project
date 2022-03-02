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

  <header class="main-header" style="position: fixed;   width: 100%;">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	 비콘 관리
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
    <section class="content" >
      <!-- Default box -->
        <div class="box-body">
			  <div class="input-group" style="width: 100%">
	           	<div class="input_frame">
                 <div class="container-1">
                    <span class="icon"><i class="fa fa-search" onclick="start()"></i></span>
                    <input type="search" id="search" placeholder="위치명" />
                 </div>
                </div>
	            <span id="batteryBtn" class="input-group-btn" style="padding-left : 10px;">
	                <button type="submit" name="search" id="search-btn" class="btn btn-5" onclick="checkBattery()">
	                	베터리 체크
	                </button>
	            </span>
	          </div>
	          <br>
              <div id="beacon_area" class="form-group" style="height: calc(100% - 34px); overflow:scroll;">
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
   <form name="beaconDetail" id="beaconDetail">
  	  <input type="hidden"  name="beaconParam" id="beaconParam">
	  <sec:csrfInput/>
  </form>	
</div>

<footer class="footer_wrap">
   Copyright &copy; (주)한라.All rights reserved.
</footer>

<!-- ./wrapper -->

<!-- <div class="modal fade" id="modal-button"> -->
<!--    <div class="modal-dialog" style="width:100%; height: 10%; position:fixed; bottom:0px;"> -->
<!--      <div class="modal-content" style="background:none;"> -->
<!--        <div class="modal-body" > -->
<!--       	<div id="buttonArea" style="text-align:right"> -->
<!--       	</div> -->
<!--        </div> -->
<!--      </div> -->
<!--    </div> -->
<!--  </div> -->


<script>
						 
var globalBeaconCode;

$(document).ready(function(){
	start();
	
	if(checkMobile()=="ios"){
		$("#batteryBtn").css("display","none");
	}
});
  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId = localStorage.siteId;
	findBeaconList(param);
	findBeaconCode(param);
}

function findBeaconCode(param){
	param.grpCd='IOT013';
	
    var successCallback = function(data){
    	globalBeaconCode = data.body;
    }
	mobileUtil.callApi(conf.raycomApiUrl+"common/code/list",param,'post', successCallback);
}


function findBeaconList(param){
	param.displayName=$('#displayName').val();
 	
	var successCallback = function(data){
		var resultList = data.body;
		$('.beaconInfo').remove();
		var html = '';
		for(var i = 0 ; i< resultList.length ; i++){
			var typeLabel;
			if( resultList[i].type != null){
				typeLabel =globalBeaconCode.filter(b=> b.data == resultList[i].type)[0].label;
			}else{
				typeLabel= "미지정";
			}
			if( resultList[i].displayName1 == undefined){
				resultList[i].displayName1 ="";
			}
			if( resultList[i].displayName2 == undefined){
				resultList[i].displayName2 ="";
			}
			if( resultList[i].displayName3 == undefined){
				resultList[i].displayName3 ="";
			}
			var location = "".concat(resultList[i].displayName1," ",resultList[i].displayName2," ",resultList[i].displayName3);
			
			var html = "<div  onclick='openDetail("+JSON.stringify(resultList[i])+")' style='margin-bottom:0px ; background:white; border-top:1px solid #f4f4f4;' id='beaconInfo"+resultList[i].id+"' class='beaconInfo'>"
				+"<div  style='width:100%; font-size:16px; padding:10px; font-weight:bold; color:black; text-align:left;'>"
				+"<table class=' deviceList' style='border-spacing: 3px; width : 100%;'>"
				+"<colgroup>"
				+"<col width='25%'/>"
				+"<col width='25%'/>"
				+"<col width='25%'/>"
				+"<col width='25%'/>"
				+"</colgroup>"
				+"<tr><th>major</th><td >"+ resultList[i].major+"</td>"
				+"<th>minor</th><td >"+ resultList[i].minor+"</td></tr>"
				+"<tr><th>타입</th><td colspan='3'>"+typeLabel+"</td></tr>"
				+"<tr><th>위치명</th><td colspan='3'>"+location+"</td></tr>"
				+"</table></div></div>";
			
			$('#beacon_area').append(html);
		}        		
    }
	
	mobileUtil.callApi(conf.raycomApiUrl+"beacon/list",param,'post', successCallback);
} 

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



function settingLocation(param){
	//위치설정 네이티브연결
	try{
		if(data.body.geoJson){
			var object = param;
			var displayTitle = object.targetName;
			var type = object.targetType;
			var time = date_to_str(new Date(object.updatedDt));
			var lon = data.body.geoJson.coordinates[0];
			var lat = data.body.geoJson.coordinates[1] ;
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

		
	}catch(e) {
		console.log(e);
	}
}

// function openButton(param){
// 	$('#buttonArea').html("");
// 	 $('#modal-button').modal();	
// 	 var htmlButton = "<button onclick='settingLocation("+JSON.stringify(param)+")' class='btn btn-default'>위치지정</button> &nbsp <button  onclick='openDetail("+JSON.stringify(param)+")' class='btn btn-default'>상세</button>"
// 		$('#buttonArea').append(htmlButton);
// }

function openDetail(param){
	$("#beaconParam").val(JSON.stringify(param));
	var $beaconDetailFrm = $("#beaconDetail");
    $beaconDetailFrm.attr('action', '/mobile/beaconDetail.do');
    $beaconDetailFrm.attr('method', 'get');
    $beaconDetailFrm.submit();
} 

function checkBattery(){
	var siteId = Number(localStorage.siteId);
	
	try{
		window.LexaApp.showBeaconBatteryChecker(siteId);
	}catch(e) {
		console.log(e);        			
	}
}

</script>
</body>
</html>
