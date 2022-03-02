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
	<!-- bootstrap datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>

	<script src="/ui/lib/custom/js/serverConfig.js"></script>
<!--  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script> -->
	<script src="/resources/crypt/sha.js"></script>
	<script src="../ui/lib/echart/echarts.min.js"></script>
	<style>
		.container {
			background-color: white;
		}
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
	   }
					

/* RIGHT : TODAY */
.today-weather-box{min-width:562px; min-height:330px; background: #1E3155; border-radius: 15px; text-align: center; font-size: 15px; font-weight:400;}
.today-weather-title-box{min-width:51px; background: #1E3155;}
.today-weather-title-box div{justify-content: center;}
.today-weather-title-box div>p{color:#7F91C8;}
.today-weather-content-box1{min-width:72px; background: #223860;}
.today-weather-content-box1 div{justify-content: center;}
.today-weather-content-box2{min-width:72px; background: #1E3155;}
.today-weather-content-box2 div{justify-content: center;}

/* RIGHT : WEEK */
/* .week-weather-box{padding-bottom:39px;} */
.week-weather-content-box{min-width:70px; min-height:137px; background: #1E3155; border-radius: 10px;}
.week-weather-content-box div:not(:nth-child(2)){justify-content: center; align-self: center;}
.week-weather-line {height: 1px; width: 65%; border-bottom: solid 1px;}
.week-selected{background: #386BD4 !important;}

/* ICON */
.window-max {width:30px; height:30px; background: url(../icon/window_max.png) no-repeat; cursor: pointer;}
.window-return {width:30px; height:30px; background: url(../icon/window_return.png) no-repeat; cursor: pointer;}
.now-weather-icon1 {background: url(../../../ui/iot/dashboard/icon/site/weather/1.png) no-repeat; background-size: 100% 100%;}
.now-weather-icon3 {background: url(../../../ui/iot/dashboard/icon/site/weather/3.png) no-repeat; background-size: 100% 100%;}
.now-weather-icon4 {background: url(../../../ui/iot/dashboard/icon/site/weather/4.png) no-repeat; background-size: 100% 100%;}
.now-weather-icon5 {background: url(../../../ui/iot/dashboard/icon/site/weather/5.png) no-repeat; background-size: 100% 100%;}
.now-weather-icon7 {background: url(../../../ui/iot/dashboard/icon/site/weather/7.png) no-repeat; background-size: 100% 100%;}
.now-weather-icon9 {background: url(../../../ui/iot/dashboard/icon/site/weather/9.png) no-repeat; background-size: 100% 100%;}
.now-weather-icon12 {background: url(../../../ui/iot/dashboard/icon/site/weather/12.png) no-repeat; background-size: 100% 100%;}

/* Weather temperature icon */
.today-weather-icon1 {background: url(../../../ui/iot/dashboard/icon/site/weather_small/1.png) no-repeat; background-position: center; background-size: contain;}
.today-weather-icon3 {background: url(../../../ui/iot/dashboard/icon/site/weather_small/3.png) no-repeat; background-position: center; background-size: contain;}
.today-weather-icon4 {background: url(../../../ui/iot/dashboard/icon/site/weather_small/4.png) no-repeat; background-position: center; background-size: contain;}
.today-weather-icon5 {background: url(../../../ui/iot/dashboard/icon/site/weather_small/5.png) no-repeat; background-position: center; background-size: contain;}
.today-weather-icon7 {background: url(../../../ui/iot/dashboard/icon/site/weather_small/7.png) no-repeat; background-position: center; background-size: contain;}
.today-weather-icon9 {background: url(../../../ui/iot/dashboard/icon/site/weather_small/9.png) no-repeat; background-position: center; background-size: contain;}
.today-weather-icon12 {background: url(../../../ui/iot/dashboard/icon/site/weather_small/12.png) no-repeat; background-position: center; background-size: contain;}

/* Weather wind icon */
.today-weather-small-wind1 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/1.png) no-repeat;  background-position: center;}
.today-weather-small-wind2 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/2.png) no-repeat;  background-position: center;}
.today-weather-small-wind3 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/3.png) no-repeat;  background-position: center;}
.today-weather-small-wind4 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/4.png) no-repeat;  background-position: center;}
.today-weather-small-wind5 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/5.png) no-repeat;  background-position: center;}
.today-weather-small-wind6 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/6.png) no-repeat;  background-position: center;}
.today-weather-small-wind7 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/7.png) no-repeat;  background-position: center;}
.today-weather-small-wind8 {width:18px; height:18px; background: url(../../../ui/iot/dashboard/icon/site/wind/8.png) no-repeat;  background-position: center;}
.today-weather-small-wind12 {width:63px; height:45px; background: url(../../../ui/iot/dashboard/icon/site/wind/12.png) no-repeat;  background-position: center;}
		
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
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 15px;
   			 font-family: fontAwesome; color:white">
        	 기상 정보
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
    	<div class="row">
    		<button type="submit" name="search" id="search-btn" class="btn btn-flat" style="float:right;margin-right:15px;">
              	<i class="fa fa-refresh" style="color:white" onclick="start()" ></i>
              </button>
	    	 <div class="col-md-3 col-sm-6 col-xs-12">
	          <div class="info-box">
	            <span class="info-box-icon " style="float: right; background:white"><div style="width:100%;height:85% ; margin-top: 5%;" class="_nowWeatherIcon"></div></span>
				
	            <div class="info-box-content" style="margin-right:90px; margin-left:0px;">
	              <span class="info-box-text"><b>기상정보</b></span>
	              <span class="info-box-text"  id="nowDt"><b></b></span>
	              <span class="info-box-text" id="nowTemp"><small>온도</small></span>
	              <span class="info-box-text" id="nowHumi" style="float:left;"><small>습도</small></span>
	              <span id="nowWeatherText" style="float:right;"></span><br>
	            </div>
	            <!-- /.info-box-content -->
	          </div>
	          <!-- /.info-box -->
	        </div>
        </div>
       <div class="box-body box" style="padding: 0px;">
       
<!--    			<div id="tempLineChart" 	style="position: absolute; top: 30px; width: 100%; height:140px;"></div> -->
			<table class="table table-bordered" style="width: 100%;font-size: 10px; text-align :center;">               
               <tr>
                 <td id="timeTitle1"></td>
                 <td id="timeTitle2"></td>
                 <td id="timeTitle3"></td>
                 <td id="timeTitle4"></td>
                 <td id="timeTitle5"></td>
                 <td id="timeTitle6"></td>
                 <td id="timeTitle7"></td>
               </tr>
               <tr>
                 <td id="weatherIcon1" class="_todayWeatherIcon" ></td>
                 <td id="weatherIcon2" class="_todayWeatherIcon"></td>
                 <td id="weatherIcon3" class="_todayWeatherIcon"></td>
                 <td id="weatherIcon4" class="_todayWeatherIcon"></td>
                 <td id="weatherIcon5" class="_todayWeatherIcon"></td>
                 <td id="weatherIcon6" class="_todayWeatherIcon"></td>
                 <td id="weatherIcon7" class="_todayWeatherIcon"></td>
               </tr>
               <tr>
                 <td id="weatherTemp1"></td>
                 <td id="weatherTemp2"></td>
                 <td id="weatherTemp3"></td>
                 <td id="weatherTemp4"></td>
                 <td id="weatherTemp5"></td>
                 <td id="weatherTemp6"></td>
                 <td id="weatherTemp7"></td>
               </tr>
               <tr>
                 <td id="precipitationProbability1"></td>
                 <td id="precipitationProbability2"></td>
                 <td id="precipitationProbability3"></td>
                 <td id="precipitationProbability4"></td>
                 <td id="precipitationProbability5"></td>
                 <td id="precipitationProbability6"></td>
                 <td id="precipitationProbability7"></td>
               </tr>
               <tr>
                 <td id="windIcon1" class="_todayWindIcon"></td>
                 <td id="windIcon2" class="_todayWindIcon"></td>
                 <td id="windIcon3" class="_todayWindIcon"></td>
                 <td id="windIcon4" class="_todayWindIcon"></td>
                 <td id="windIcon5" class="_todayWindIcon"></td>
                 <td id="windIcon6" class="_todayWindIcon"></td>
                 <td id="windIcon7" class="_todayWindIcon"></td>
               </tr>
               <tr>
                 <td id="windSpeed1"></td>
                 <td id="windSpeed2"></td>
                 <td id="windSpeed3"></td>
                 <td id="windSpeed4"></td>
                 <td id="windSpeed5"></td>
                 <td id="windSpeed6"></td>
                 <td id="windSpeed7"></td>
               </tr>
             </table>
             <br>
             <table class="table table-bordered" style="width: 100%;font-size: 10px; text-align :center;">
               <tr>
                 <td>월</td>
                 <td>화</td>
                 <td>수</td>
                 <td>목</td>
                 <td>금</td>
                 <td>토</td>
                 <td>일</td>
               </tr>
               <tr>
                 <td  class="_weekWeatherIcon" ></td>
                 <td  class="_weekWeatherIcon"></td>
                 <td  class="_weekWeatherIcon"></td>
                 <td  class="_weekWeatherIcon"></td>
                 <td  class="_weekWeatherIcon"></td>
                 <td  class="_weekWeatherIcon"></td>
                 <td  class="_weekWeatherIcon"></td>
               </tr>
               <tr>
                 <td id="highestTemperature1"></td>
                 <td id="highestTemperature2"></td>
                 <td id="highestTemperature3"></td>
                 <td id="highestTemperature4"></td>
                 <td id="highestTemperature5"></td>
                 <td id="highestTemperature6"></td>
                 <td id="highestTemperature7"></td>
               </tr>
               <tr>
                 <td id="lowestTemperature1"></td>
                 <td id="lowestTemperature2"></td>
                 <td id="lowestTemperature3"></td>
                 <td id="lowestTemperature4"></td>
                 <td id="lowestTemperature5"></td>
                 <td id="lowestTemperature6"></td>
                 <td id="lowestTemperature7"></td>
               </tr>
             </table>
             <br>
<!--               <textarea id='message' class='form-control' placeholder="특이 기상 정보가 없습니다." readonly></textarea> -->
<!--               <br> -->
		      <div class="bottom_layout">
				<button type="button" class="btn btn_stop_write" id="write" onclick="onWrite()">작업중지 알림 작성</button>
			  </div>
		   
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
   <form name="stopInfo" id="stopInfo" style="margin-bottom:0px;">
  	  <input type="hidden"  name="stopYn" id="f_stopYn">
	  <sec:csrfInput/>
  </form>	
   <form name="enterSuccess" id="enterSuccess" style="margin-bottom:0px;">
  	  <input type="hidden"  name="api_body" id="f_api_body">
  	  <input type="hidden"  value="max" name="side_bar_type" id="side_bar_type">
	  <sec:csrfInput/>
  </form>	
</div>

<footer class="footer_wrap">
   Copyright &copy; (주)한라.All rights reserved.
 </footer>

<!-- ./wrapper -->

<script>



$(document).ready(function(){
	start();
});

  
function start(){
	var site_id = null;
	
	var param = {};
	param.siteId= localStorage.siteId;
	findWeatherInfo(param);
}

function findWeatherInfo(param){
	var successCallback = function(data){
		var weatherInfo = data.body || {};
		setWeatherInfo(weatherInfo);
    }
	mobileUtil.callApi(conf.raycomApiUrl+"location/weather",param,'post', successCallback);
}
/**
 * 기존 날씨 아이콘 초기화
 */
function initWeatherIcon(){
	var me = this;
	
	// 현재 : 기존 등록된 아이콘 삭제
   	var nowWeatherIconDom = $('._nowWeatherIcon')[0];
   	var classList = $('._nowWeatherIcon')[0].classList;
   	
   	for(var idx in classList){
   		var item = classList[idx] + "";
   		
   		if(item.indexOf("now-weather") >= 0){
   			nowWeatherIconDom.classList.remove(item);
   		}
   	}
   	
 	// 오늘 : 기존 등록된 아이콘 삭제
   	var todayWeatherIconDomList = $('._todayWeatherIcon');
		
		for(var idx in todayWeatherIconDomList){
			var todayDom = todayWeatherIconDomList[idx];
			
			var classList = todayDom.classList;
			
			for(var idx in classList){
       		var item = classList[idx] + "";
       		
       		if(item.indexOf("today-weather") >= 0){
       			todayDom.classList.remove(item);
       		}
       	}
		}
		
		// 오늘 : 기존 등록된 풍향 아이콘 삭제
		var todayWindIconDomList = $('._todayWindIcon');
		
		for(var idx in todayWindIconDomList){
			var todayDom = todayWindIconDomList[idx];
			
			var classList = todayDom.classList;
			
			for(var idx in classList){
       		var item = classList[idx] + "";
       		
       		if(item.indexOf("today-weather") >= 0){
       			todayDom.classList.remove(item);
       		}
       	}
		}
		
		// 주간 : 기존 등록된 아이콘 삭제
		var weekIconDomList = $('._weekWeatherIcon');
		
		for(var idx in weekIconDomList){
			var weekDom = weekIconDomList[idx];
			
			var classList = weekDom.classList;
			
			for(var idx in classList){
       		var item = classList[idx] + "";
       		
       		if(item.indexOf("today-weather") >= 0){
       			weekDom.classList.remove(item);
       		}
       	}
		}
		
}
function getTodayLabel(dayLabel) {
    
    var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    
    var todayLabel = week[dayLabel];
    
    return todayLabel;
}

function setWeatherInfo(param){
	// 기존 날씨 아이콘 초기화
	//initWeatherIcon();
	
	// 현재기상정보
	var weatherInfoNow = param.now || {};
	var weatherListToday = param.short || {};
	var weatherListLong = param.long || {};
	
   	// 기상정보 아이콘 정보 획득
   	var iconInfo = getWeatherIconInfo(weatherInfoNow, "now");
	
   	var today = new Date();
    
   	var year = today.getFullYear();
   	var month = today.getMonth()+1;
   	var date = today.getDate();
   	var dayLabel = today.getDay();
   	
	// 현재 기상정보 아이콘 등록
   	var nowWeatherIconDom = $('._nowWeatherIcon')[0];
   	nowWeatherIconDom.classList.add(iconInfo.icon);
	$("#nowWeatherText").html(iconInfo.text);
	$("#nowDt").html( year+"년 "+month+"월 "+date + "일 " +getTodayLabel(dayLabel));
	$("#nowTemp").html( "온도 : "+weatherInfoNow.temperature + " ℃");
	$("#nowHumi").html( "습도 : "+weatherInfoNow.humidity +" %");
   	
   	for(var i = 0 ; i < weatherListToday.length ; i++ ){
   		$("#timeTitle"+(i+1)).html(weatherListToday[i].title);
   		$("#weatherTemp"+(i+1)).html(weatherListToday[i].temperature);
   		$("#precipitationProbability"+(i+1)).html(weatherListToday[i].precipitationProbability+"%");
   		$("#windSpeed"+(i+1)).html(weatherListToday[i].windSpeed +"m/s");
   	}
   	for(var i = 0 ; i < weatherListLong.length ; i++ ){
   		$("#highestTemperature"+(i+1)).html(weatherListLong[i].highestTemperature + " ℃");
   		$("#lowestTemperature"+(i+1)).html(weatherListLong[i].lowestTemperature + " ℃");
   	}
   	
   	var todayWeatherIconDomList = $('._todayWeatherIcon');
		
	var todayWindIconDomList = $('._todayWindIcon');
   	
	for(var idx in weatherListToday){
		var item = weatherListToday[idx];
		
		var index = Number(idx) + 1;
		
		
		// 날씨 아이콘 정보 획득
     	var iconInfo = getWeatherIconInfo(item, "today");
	  	
		var todayDom = todayWeatherIconDomList[idx];
		
		// 오늘 날씨 아이콘 등록
	     	todayDom.classList.add(iconInfo.icon);
		
	   	// 기상정보 풍향 아이콘 정보 획득
	     	var windIconInfo = getWindIconInfo(item);
	  	
		var windDom = todayWindIconDomList[idx];
		
		// 오늘 풍향 아이콘 등록
	     	windDom.classList.add(windIconInfo.icon);
	}
	
	/* 기온 차트 */
// 	createLineChart(weatherListToday);
	
	// 주간 기상정보
   	
	var weekIconDomList = $('._weekWeatherIcon');
	
	for(var idx in weatherListLong){
		var item = weatherListLong[idx];
		
		var index = Number(idx) + 1;
		
		// 날씨 아이콘 정보 획득
       	var iconInfo = getWeatherIconInfo(item, "today");
   	
		var weekDom = weekIconDomList[idx];
		
		// 오늘 날씨 아이콘 등록
      	weekDom.classList.add(iconInfo.icon);
	}
	
   	
}


function getWeatherIconInfo(param, prefix){
	var pty = param.ptyCode; // 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 여기서 비/눈은 비와 눈이 섞여 오는 것을 의미 (진눈개비)
   	var sky = param.skyCode; // 맑음 0 ～ 5 , 구름많음 6 ～ 8 ,  흐림  9 ～ 10
   	
   	/**
   	 * icon
   	 * 05_비, 09_눈비, 07_눈, 05_비
   	 * 01_낮_맑음, 10_밤_맑음, 04_구름많음, 03_흐림 
   	 * 12_정보없음
   	 */ 
   	 
   	var icon = prefix + "-weather-icon12";
   	var text = "정보없음";
   	
   	if(pty == 0){ // 없음
   		if(sky <= 5){ // 맑음
   			// 낮 or 밤(1or10)
   			icon = prefix + '-weather-icon1';
   			text = "맑음";
   			
   		}else if(sky >= 9){ // 흐림
   			icon = prefix + '-weather-icon3';
   			text = "흐림";
   			
   		}else{ // 구름많음
   			icon = prefix + '-weather-icon4';
   			text = "구름많음";
   		}
   	
   	}else{
   		if(pty == 1){ // 비
   			icon = prefix + '-weather-icon5';
   			text = "비";
   			
   		}else if(pty == 2){ // 비/눈
   			icon = prefix + '-weather-icon9';
   			text = "비/눈";
   			
   		}else if(pty == 3){ // 눈
   			icon = prefix + '-weather-icon7';
   			text = "눈";
   			
   		}else if(pty == 4){ // 소나기
   			icon = prefix + '-weather-icon5';
   			text = "소나기";
   			
   		}
   	}
   	
   	return {
   		icon: icon
   		,text: text
   	};
}


function getWindIconInfo(param){
	var icon = "today-weather-small-wind";
	
	/** 풍향 값 
	  0 – 45 N-NE
	  45 – 90 NE-E
	  90 – 135 E-SE
	  135 – 180 SE-S
	  180 – 225 S-SW
	  225 – 270 SW-W
	  270 – 315 W-NW
	  315 – 360 NW-N
	 */ 
	var windDirectionName = param.windDirectionName;
	
	if(windDirectionName == "N-NE"){
		icon = icon + "1";
	}else if(windDirectionName == "NE-E"){
		icon = icon + "2";
	}else if(windDirectionName == "E-SE"){
		icon = icon + "3";
	}else if(windDirectionName == "SE-S"){
		icon = icon + "4";
	}else if(windDirectionName == "S-SW"){
		icon = icon + "5";
	}else if(windDirectionName == "SW-W"){
		icon = icon + "6";
	}else if(windDirectionName == "W-NW"){
		icon = icon + "7";
	}else if(windDirectionName == "NW-N"){
		icon = icon + "8";
	}
	
	return {
   		icon: icon
   	};
}


function createLineChart(param){
	var me = this;
	
	var chart = null;
	var tempLineChart = document.getElementById('tempLineChart');
	chart = echarts.init(tempLineChart);
	
	var dataList = [];
	
	var weatherListToday = param || [];
	for(var idx in weatherListToday){
		var item = weatherListToday[idx];
		dataList.push(item.temperature);            		
	}
	
	// 차트 옵션
	var option = {
		xAxis: {
			type: 'category',
		        data: dataList,
		        show: false
		    },
		    yAxis: {
		        type: 'value',
		        show: false
		    },
		    series: [{
		        data: dataList,
		        type: 'line',
		        label: {
		        	normal: {
		        		show: true,
		        		position: 'top',
		                color: 'green',
		             	fontFamily: 'Noto Sans KR',
		        	fontWeight: '400',
		        	fontSize: 15
		        	}
		    	},
		    	lineStyle: {
		            color: "#44884F",
		            width: 3
		        },
		        symbol: 'circle',
		        symbolSize : 10,
		        itemStyle: {
		        	color: "#44884F"
		        }
		    }]
		};
	
	chart.setOption(option);
	
// 	me.set("lineChart", chart);
	
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
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
