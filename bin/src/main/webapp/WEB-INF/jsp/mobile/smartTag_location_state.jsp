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
<!--    <script type="text/javascript" src="/js/main/mobile.js"></script> -->
   
   
   <title>Home</title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
<!--      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->


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
<!--     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
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
      .nav-tab-custom{
         height:100%;
      }
      .tab-content{
         height:calc(100% - 44px)
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
           태그 위치 정보
      </a>
      
<!--      <a class="sidebar-toggle"></a> -->
     
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
        <div class="box-body" >
        <div class="nav-tabs-custom">
           <ul class="nav nav-tabs">
              <li class="active"><a href="#worker" data-toggle="tab">작업자</a></li>
              <li><a href="#vehicle" data-toggle="tab">이동장비</a></li>
            </ul>
            <div class="tab-content" >
                <!-- 작업자 탭-->
              <div class="tab-pane active" id="worker"  style = "height:100%">
               <div class="input-group">
                       <span class="input-group-addon">검색</span>
                    <input type="text" class="form-control" id="workerParam">
                    <span class="input-group-btn" style="padding-left : 3px;">
                         <button type="submit" name="search" id="search-btn" class="btn btn-flat"  style="background-color:#3c8dbc">
                            <i class="fa fa-search" style="color:#292f47;" onclick="start()" ></i>
                         </button>
                     </span>
                 </div>
                  <div id="worker_area" class="form-group" style="height: 90%; overflow:scroll;">
               </div>
              </div>
              
              <!-- 이동장비 탭-->
              <div class="tab-pane" id="vehicle" style = "height:100%">
                <div class="input-group">				       
                       <span class="input-group-addon">검색</span>
                      <input type="text" class="form-control" id="vehicleParam" >
                      <span class="input-group-btn" style="padding-left : 3px;">
                         <button type="submit" name="search" id="search-btn" class="btn btn-flat"  style="background-color:#fff;">
                            <i class="fa fa-search" style="color:#292f47;" onclick="start()" ></i>
                         </button>
                     </span>
                 </div>
                     <div id="vehicle_area" class="form-group" style="height: 90%; overflow:scroll;">
               </div>
              </div>
              <!-- /.tab-pane -->
            </div>
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
   <form name="targetDetail" id="targetDetail">
       <input type="hidden"  name="targetId" id="targetId">
       <input type="hidden"  name="targetType" id="targetType">
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
   start();
});

  
function start(){
   var site_id = null;
   
   var param = {};
   param.siteId=localStorage.siteId;
   findSmartTagList(param);
   findVehicleList(param);
}

function findSmartTagList(param){
   
   var successCallback = function(data){
      var resultList = data.body;
      $('.workerDetail').remove();
      var html = '';
      for(var i = 0 ; i< resultList.length ; i++){
         
         var   workerName = resultList[i].targetName ? resultList[i].targetName : ""; 
         var vendorName = resultList[i].vendorName ? resultList[i].vendorName : ""; 
         var jobTypeName = resultList[i].targetJobName ? resultList[i].targetJobName : ""; 
         var areaName = resultList[i].areaName ?  resultList[i].areaName : "현장 외 지역"; 
         var updatedDt = resultList[i].updatedDt; 

         var dt = new Date(updatedDt);
         var signalDt = date_to_str(dt);
         if(updatedDt == undefined){
            signalDt = "수신 지연";
         }
         
         var html = "<div  onclick='openButton("+JSON.stringify(resultList[i])+")' style='margin-bottom:0px ; background:white;' id='workerDetail"+resultList[i].id+"' class='workerDetail'>"
            +"<div  style='width:100%;  padding:10px; text-align:left;'>"
            +"<table class=' deviceList' style='border-spacing: 3px; width : 100%;'>"
            +"<colgroup>"
            +"<col width='30%'/>"
            +"<col width='70%'/>"
            +"</colgroup>"
            +"<tr><th>이름</th><td>"+ workerName+"</td></tr>"
            +"<tr><th>협력사</th><td>"+vendorName+"</td></tr>"
            +"<tr><th>직종</th><td>"+jobTypeName+"</td></tr>"
            +"<tr><th>수신시간</th><td>"+signalDt+"</td></tr>"
            +"<tr><th>위치</th><td style='color : ##f9836d;'>"+ areaName+"</td></tr>"
            +"</table></div></div>";
         
         $('#worker_area').append(html);
         
      }               
   }
   
   param.targetType='worker';
   param.allSearch=$('#workerParam').val();
   mobileUtil.callApi(conf.raycomApiUrl+"location/target/now",param,'post', successCallback);
}
function findVehicleList(param){
   var successCallback = function(data){
      var resultList = data.body;
      $('.vehicleDetail').remove();
      var html = '';
      for(var i = 0 ; i< resultList.length ; i++){
         
         var   workerName = resultList[i].targetName; 
         var vendorName = resultList[i].vendorName; 
         var jobTypeName = resultList[i].targetJobName; 
         var areaName = resultList[i].areaName ?  resultList[i].areaName : "현장 외 지역";  
         var updatedDt = resultList[i].updatedDt; 
         
         var dt = new Date(updatedDt);
         var signalDt = date_to_str(dt);
         if(updatedDt == undefined){
            signalDt = "수신 지연";
         }
         
         var html = "<div  onclick='openButton("+JSON.stringify(resultList[i])+")' style='margin-bottom:0px ; background:white;' id='vehicleDetail"+resultList[i].id+"' class='vehicleDetail'>"
            +"<div  style='width:100%; padding:10px; text-align:left;'>"
            +"<table class='deviceList' style='border-spacing: 3px; width : 100%;'>"
            +"<colgroup>"
            +"<col width='30%'/>"
            +"<col width='70%'/>"
            +"</colgroup>"
            +"<tr><th>장비명</th><td>"+ workerName+"</td></tr>"
            +"<tr><th>협력사</th><td>"+vendorName+"</td></tr>"
            +"<tr><th>유형</th><td>"+jobTypeName+"</td></tr>"
            +"<tr><th>수신시간</th><td>"+signalDt+"</td></tr>"
            +"<tr><th>위치</th><td style='color : ##f9836d;'>"+ areaName+"</td></tr>"
            +"</table></div></div>";
         
         $('#vehicle_area').append(html);
      }              
   }
   param.targetType='vehicle';
   param.allSearch=$('#vehicleParam').val();
   mobileUtil.callApi(conf.raycomApiUrl+"location/target/now",param,'post', successCallback);
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



function openMap(param){
   var successCallback = function(data){
         var object = param;
         var displayTitle = object.targetName;
         var type = object.targetType;
         var time = date_to_str(new Date(object.updatedDt));
         
         try{
            latlon = JSON.parse(localStorage.sitePinPoint);
         }catch(e){
            console.log(e);
         }
         var siteCenterLat = latlon.lat;
         var siteCenterLon = latlon.lon;
         
         
         var lon, lat;
         if(data.body.geoJson){
            lon = data.body.geoJson.coordinates[0];
            lat = data.body.geoJson.coordinates[1] ;
         }
         else{
             try{
               if(checkMobile()=="ios"){
                  var message = {  message: "위치정보가 없습니다. 현장 중심으로 표시합니다." };
                  //window.webkit.messageHandlers.showToast.postMessage(message);
               }else{
                  window.LexaApp.showToast("위치정보가 없습니다. 현장 중심으로 표시합니다.");      
               }
            }catch(e) {
               console.log(e);                 
            }
            lon = siteCenterLon;
            lat = siteCenterLat;
            
         }
         var latlon = {};
         
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
   }
   var apiParam = {};
   apiParam.targetType=param.targetType;
   apiParam.siteId=localStorage.siteId;
   apiParam.targetId = param.targetId;
   mobileUtil.callApi(conf.raycomApiUrl+"location/target/openmap",apiParam,'post', successCallback);
}

function openButton(param){
   $('#buttonArea').html("");
    $('#modal-button').modal();   
    var htmlButton;
    if(param.targetType == "worker"){
       htmlButton = "<button onclick='openMap("+JSON.stringify(param)+")' class='btn btn-default'>지도</button> &nbsp <button  onclick='openDetail("+JSON.stringify(param)+")' class='btn btn-default'>상세</button>";
    }else{
       htmlButton = "<button onclick='openMap("+JSON.stringify(param)+")' class='btn btn-default'>지도</button> &nbsp <button  onclick='openDetail("+JSON.stringify(param)+")' class='btn btn-default'>상세</button>";
    }
   $('#buttonArea').append(htmlButton);
}

function openDetail(param){
    $("#targetId").val(param.targetId);
    $("#targetType").val(param.targetType);
   var $targetDetailFrm = $("#targetDetail");
    $targetDetailFrm.attr('action', '/mobile/targetDetail.do');
    $targetDetailFrm.attr('method', 'get');
    $targetDetailFrm.submit();
} 

</script>
</body>
</html>