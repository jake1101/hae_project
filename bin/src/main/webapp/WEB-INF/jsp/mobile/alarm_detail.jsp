<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String alarmId = (String)request.getParameter("alarmId"); %>

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
		
		@media only screen and (max-width: 760px){
		   
        	table, thead, tbody, th, td, tr {display: revert;}
        	
	   }
		th {padding-left: 0px !important;}
		td {padding-left: 5px !important;}
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
        	 알림 상세 정보
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
        <div class="box-body box box-default">
               <div id="alarm_detail_area" class="form-group">
				</div>   
			  <div style="text-align:center">
				<button type="button" class="btn btn-back w130 mr5" id="back" onclick="onBack()">뒤로</button>
                <button type="button" id="save" class="btn btn-ok w130" onclick="onSave()">저장</button>
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
   <form name="alarmDetail" id="alarmDetail" style="margin-bottom:0px;">
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
 <div class="modal fade" id="modal-picture">
  <div class="modal-dialog">
    <div class="modal-content" style="height:80%;">
      <div class="modal-body" style="height:100%; overflow: scroll;">
     	<div id="pictureArea" style="text-align: center;">
     		<img  id='picture' src='' style ='width:100%; height : 100%'></img>
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

var globalAlarmInfo = {};
$(document).ready(function(){
	//Date picker
	$('#datepicker').datepicker({
	  autoclose: true 
	})  
	$('#datepicker2').datepicker({
	  autoclose: true 
	})  
	
	start();
	
});

function start(){
	var site_id = null;
	var param = {};
	param.siteId=localStorage.siteId;
	param.alarmSeq=<%=alarmId%>;
	findAlarmDetail(param);
}

function findAlarmDetail(param){
	var successCallback = function(data){
		var resultInfo = data.body;
		globalAlarmInfo = resultInfo;
		$('.alarmInfo').remove();
		var html = '';
			
		var	answerer = resultInfo.answerer ? resultInfo.answerer : ""; 
		var answer = resultInfo.answer? resultInfo.answer : ""; 
		var answerDt = resultInfo.property&&resultInfo.property.answerDt ? resultInfo.property.answerDt : ""; 
		var sendDt = resultInfo.sendDt; 
		var alarmType = resultInfo.alarmType; 
		var areaName = resultInfo.areaName ? resultInfo.areaName : "" ; 
		var dt = new Date(sendDt);
		var content = resultInfo.content; 
		var beforeImage = resultInfo.property&&resultInfo.property.beforeImage ? "/repository/"+resultInfo.property.beforeImage[0].attFilePath+"-xxhdpi" : "../../img/imgPic.png";
		var nowImage = resultInfo.property&&resultInfo.property.nowImage ? "/repository/"+resultInfo.property.nowImage[0].attFilePath+"-xxhdpi" : "../../img/imgPic.png";
		var afterImage = resultInfo.property&&resultInfo.property.afterImage ? "/repository/"+resultInfo.property.afterImage[0].attFilePath+"-xxhdpi" : "../../img/imgPic.png";
		var beforeFileNm = resultInfo.property&&resultInfo.property.beforeImage ? resultInfo.property.beforeImage[0].attFilePath+"-xxhdpi" : "";
		var nowFileNm = resultInfo.property&&resultInfo.property.nowImage ? resultInfo.property.nowImage[0].attFilePath+"-xxhdpi" : "" ;
		var afterFileNm = resultInfo.property&&resultInfo.property.afterImage ? resultInfo.property.afterImage[0].attFilePath+"-xxhdpi" : "" ;
		
		var html = "<div id='alarmInfo"+resultInfo.seq+"' class=' alarmInfo'>"
			+"<div  style='width:100%; font-size:16px; padding:3px; font-weight:bold; color:black; text-align:left;'>"
			+"<table class='table table-bordered' style='border-spacing: 3px; width : 100%;'>"
			+"<colgroup>"
			+"<col width='30%'/>"
			+"<col width='70%'/>"
			+"</colgroup>"
			+"<tr><th style='text-align:center; vertical :middle;'>알림번호</th><td>"+resultInfo.seq+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>발생시간</th><td>"+date_to_str(dt)+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>내용</th><td style=' word-break:break-all;'>"+content+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>유형</th><td style='font-weight:bold ; color : red' >"+alarmType+"</td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>조치자</th><td> <input id='answerer' type='text' class='form-control' value='"+answerer+"'> </td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>조치시간</th><td> <input id='answerDt' readonly type='text' placeholder='저장 시 자동으로 입력 됩니다.' class='form-control' value='"+answerDt+"'> </td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>조치내용</th><td> <textarea onclick='openKeyboard(answer);' id='answer' class='form-control' rows='3'>"+answer+"</textarea></td></tr>"
			+"<tr><th style='text-align:center; vertical :middle;'>조치상태</th><td><select id='state' class='form-control'></select></td></tr>"
			+"</table>"
			+"<table class='table table-bordered' style='border-spacing: 3px; width : 100%;'>"
			+"<colgroup>"
			+"<col width='33%'/>" 
			+"<col width='33%'/>"
			+"<col width='33%'/>"
			+"</colgroup>"
			+"<tr><th style='text-align:center'>전</th><th style='text-align:center'>중</th><th style='text-align:center'>후</th></tr>"
			+"<tr><td style='text-align:center'><img  id='answerImg1' src='"+beforeImage+"' style ='width:80px; height : 80px'></img></td>"
			+"<td style='text-align:center'><img  id='answerImg2' src='"+nowImage+"' style ='width:80px; height : 80px'></img></td>"
			+"<td style='text-align:center'><img  id='answerImg3' src='"+afterImage+"' style ='width:80px; height : 80px'></img></td></tr></table></div></div>";
		
		$('#alarm_detail_area').append(html);
		
		
		if(resultInfo.state == 1 || resultInfo.state == null){
	        $('#state').append( $("<option>조치 전</option>"));
	        $('#state').append( $("<option>조치 중</option>"));
	        $('#state').append( $("<option>조치 완료</option>"));
            $("#state option:eq(0)").attr("selected", "selected");
            $("#state option:eq(0)").attr("value",1);
            $("#state option:eq(1)").attr("value",3);
            $("#state option:eq(2)").attr("value",5);
			
		}else if(resultInfo.state == 3 || resultInfo.state == null){
	        $('#state').append( $("<option>조치 중</option>"));
	        $('#state').append( $("<option>조치 완료</option>"));
            $("#state option:eq(0)").attr("selected", "selected");
            $("#state option:eq(0)").attr("value",3);
            $("#state option:eq(1)").attr("value",5);
			
		}else if(resultInfo.state == 5 || resultInfo.state == null){
	        $('#state').append( $("<option>조치 완료</option>"));
            $("#state option:eq(0)").attr("selected", "selected");
            $("#state option:eq(0)").attr("value",5);
			
		}
		
		
		var beforeImageGrpCode =resultInfo.property && resultInfo.property.beforeImageGrpCode ? resultInfo.property.beforeImageGrpCode : "" ;
		var nowImageGrpCode = resultInfo.property && resultInfo.property.nowImageGrpCode ? resultInfo.property.nowImageGrpCode : "" ;
		var afterImageGrpCode = resultInfo.property && resultInfo.property.afterImageGrpCode ? resultInfo.property.afterImageGrpCode : "" ;
		
		
		$("#answerImg1").attr("data",beforeImageGrpCode);
		$("#answerImg2").attr("data",nowImageGrpCode);
		$("#answerImg3").attr("data",afterImageGrpCode);  
		$("#answerImg1").attr("fileNm",beforeFileNm);
		$("#answerImg2").attr("fileNm",nowFileNm);
		$("#answerImg3").attr("fileNm",afterFileNm);  
		
		
		$("#answerImg1").click(function(){
			
			if(!$("#answerImg1").attr("data") || $("#answerImg1").attr("data")== ""){
				try{
					if(checkMobile()=="ios"){
						var message = {  grpCode : null, tag: "answerImg1"};
						window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
					}else{
						window.LexaApp.getPhotoShoot(null,"answerImg1");
					}
				}catch(e){
					console.log(e);
				}
			}else{
				openButton("answerImg1");
			}
			
		})// end of click
		$("#answerImg2").click(function(){
			
			if(!$("#answerImg2").attr("data") || $("#answerImg2").attr("data")== ""){
				try{
					if(checkMobile()=="ios"){
						var message = {  grpCode : null, tag: "answerImg2"};
						window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
					}else{
						window.LexaApp.getPhotoShoot(null,"answerImg2");
					}
				}catch(e){
					console.log(e);
				}
			}else{
				openButton("answerImg2");
			}
			
		})// end of click
		$("#answerImg3").click(function(){
			
			if(!$("#answerImg3").attr("data") || $("#answerImg3").attr("data")== ""){
				try{
					if(checkMobile()=="ios"){
						var message = {  grpCode : null, tag: "answerImg3"};
						window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
					}else{
						window.LexaApp.getPhotoShoot(null,"answerImg3");
					}
				}catch(e){
					console.log(e);
				}
			}else{
				openButton("answerImg3");
			}
			
		})// end of click
    }
	mobileUtil.callApi(conf.raycomApiUrl+"alarm/detail",param,'post', successCallback);
}

function openButton(param){
	var htmlButton ="";
	htmlButton = "<button onclick='showPic("+param+")' class='btn btn-default'>보기</button> &nbsp" 
	 + "<button  onclick='deletePic("+param+")' class='btn btn-danger'>삭제</button>";
	$('#buttonArea').html("");
	$('#modal-button').modal();	
	 
	$('#buttonArea').append(htmlButton);
}


function showPic(param){
	if(param.id == "answerImg1"){
		var resource = $("#answerImg1").attr("fileNm");
		$("#picture").attr("src","/repository/"+resource);
	}else if(param.id == "answerImg2"){
		var resource = $("#answerImg2").attr("fileNm");
		$("#picture").attr("src","/repository/"+resource);
	}else if(param.id == "answerImg3"){
		var resource = $("#answerImg3").attr("fileNm");
		$("#picture").attr("src","/repository/"+resource);
	}
	
	$('#modal-picture').modal();	
}

function deletePic(param){
	var apiParam={};
	apiParam.siteId=localStorage.siteId;
	if(param.id == "answerImg1"){
		apiParam.grpCd = $("#answerImg1").attr("data");
	}else if(param.id == "answerImg2"){
		apiParam.grpCd = $("#answerImg2").attr("data");
	}else if(param.id == "answerImg3"){
		apiParam.grpCd = $("#answerImg3").attr("data");
	}
	var successCallback = function(data){
		$('#modal-button').modal("hide");
		if(param.id == "answerImg1"){
			$("#answerImg1").attr("src","../../img/imgPic.png");
			$("#answerImg1").attr("data","");
		}else if(param.id == "answerImg2"){
			$("#answerImg2").attr("src","../../img/imgPic.png");
			$("#answerImg2").attr("data","");
		}else if(param.id == "answerImg3"){
			$("#answerImg3").attr("src","../../img/imgPic.png");
			$("#answerImg3").attr("data","");
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"file/remove",apiParam,'post', successCallback);
}




function openKeyboard(param){
	try{
		if(checkMobile()=="ios"){
			var message = { type: "MULTI_LINE", text: param.innerHTML ,  tag: param.id };
			window.webkit.messageHandlers.showInputForm.postMessage(message);
		}else{
			window.LexaApp.showInputForm("MULTI_LINE",param.innerHTML,param.id);
		}
	}catch(e){
		console.log(e);
	}
}

function setInputText(text, tag){
	if(tag == "answer"){
		$("#answer").html(text);
	}
}

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



function openDetail(param){
	 	$("#f_alarm_id").val(param);
		var $alarmDetailFrm = $("#alarmDetail");
	    $alarmDetailFrm.attr('action', '/mobile/alarmDetail.do');
	    $alarmDetailFrm.attr('method', 'get');
	    $alarmDetailFrm.submit();
} 


function  imgUpload(param){
	try{
		if(checkMobile()=="ios"){
			var message = {  grpCode : null, tag: "answerImg"+param};
			window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
		}else{
			window.LexaApp.getPhotoShoot(null,"answerImg"+param);
		}
	}catch(e){
		console.log(e);
	}
}

function setAppPhotoFile(callback,tag){
	var callbackData =JSON.parse(callback);
	var grpCd = callbackData.body.grp_cd;
	if(tag == "answerImg1"){
		$("#answerImg1").attr("data",grpCd);
		
		var resource =callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
		$("#answerImg1").attr("fileNm",resource);
//	 	var resource = callbackData.body.idSetArray[0].path_file_nm + "-thumb";
		resource = resource.split("\\").join("/");
		$("#answerImg1").attr("src", "/repository/"+resource);
		$("#answerImg1").css("width","80px");
	}else if(tag == "answerImg2"){
		$("#answerImg2").attr("data",grpCd);
		var resource =callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
		$("#answerImg2").attr("fileNm",resource);
//	 	var resource = callbackData.body.idSetArray[0].path_file_nm + "-thumb";
		resource = resource.split("\\").join("/");
		$("#answerImg2").attr("src", "/repository/"+resource);
		$("#answerImg2").css("width","80px");
	}else if(tag == "answerImg3"){
		$("#answerImg3").attr("data",grpCd);
		var resource =callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
		$("#answerImg3").attr("fileNm",resource);
		var resource = callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
//	 	var resource = callbackData.body.idSetArray[0].path_file_nm + "-thumb";
		resource = resource.split("\\").join("/");
		$("#answerImg3").attr("src", "/repository/"+resource);
		$("#answerImg3").css("width","80px");
	}
}


function onSave(){
	try{
		if(checkMobile()=="ios"){
			var message = {  message: "저장하시겠습니까?"  , tag :"alarmDetailSave"};
			window.webkit.messageHandlers.confirmMessage.postMessage(message);
		}else{
			window.LexaApp.confirmMessage("저장하시겠습니까?" , "alarmDetailSave");
		}
	}catch(e){
		var result = confirm("저장하시겠습니까?");
		if(result){
			returnConfirm(true , "alarmDetailSave");
		}else{
			return;
		}
	}
	
}


function alarmDetailSaveConfirm(){
		var param={};
		param.siteId = globalAlarmInfo.siteId;
		param.seq = globalAlarmInfo.seq;
		param.sendDt = globalAlarmInfo.sendDt;
		param.content = globalAlarmInfo.content; 
		param.alarmType = globalAlarmInfo.alarmType;
		param.legacyKey = globalAlarmInfo.legacyKey;
		param.property = {};
		param.property.answerer=  $('#answerer').val();
		param.property.answer= $('#answer').val();
		param.state =  $('#state').val();
		
		console.log(param);
		if(param.property.answerer == "" || param.property.answer ==""){
			try{
				if(checkMobile()=="ios"){
					var message = {  message:"조치자와 조치내용은 필수 값 입니다." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
					window.LexaApp.showToast("조치자와 조치내용은 필수 값 입니다.");
				}
			}catch(e){
				console.log(e);
			}
			return;
		}
		param.property.beforeImageGrpCode= $("#answerImg1").attr("data");
		param.property.nowImageGrpCode= $("#answerImg2").attr("data");
		param.property.afterImageGrpCode= $("#answerImg3").attr("data");
		
		param.property.answerDt = date_to_str(new Date());
		
		var successCallback = function(data){
			$("#f_alarm_id").val(globalAlarmInfo.seq);
			var $alarmDetailFrm = $("#alarmDetail");
		    $alarmDetailFrm.attr('action', '/mobile/alarmDetail.do');
		    $alarmDetailFrm.attr('method', 'get');
		    $alarmDetailFrm.submit();
		    try{
		    	if(checkMobile()=="ios"){
					var message = {  message: "저장되었습니다." };
					window.webkit.messageHandlers.showToast.postMessage(message);
				}else{
			    	window.LexaApp.showToast("저장되었습니다.");
				}
			}catch(e){
				console.log(e);
			}
	    }
		mobileUtil.callApi(conf.raycomApiUrl+"alarm/upsert/array",[param],'post', successCallback);
}



function onBack(){
	window.location.href="/mobile/alarmHistory.do";
}

function nativeBack() {
	window.location.href="/mobile/alarmHistory.do";
}


function finishDelete(){
	var param={};
	param.siteId = globalAlarmInfo.siteId;
	param.seq = globalAlarmInfo.seq;
	param.sendDt = globalAlarmInfo.sendDt;
	param.content = globalAlarmInfo.content; 
	param.alarmType = globalAlarmInfo.alarmType;
	param.property = {};
	param.property.answerer=  $('#answerer').val();
	param.property.answer= $('#answer').val();
	if(param.property.answerer == "" || param.property.answer ==""){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "조치자와 조치내용은 필수 값 입니다." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("조치자와 조치내용은 필수 값 입니다.");
			}
		}catch(e){
			console.log(e);
		}
		return;
	}
	param.property.beforeImageGrpCode= $("#answerImg1").attr("data");
	param.property.nowImageGrpCode= $("#answerImg2").attr("data");
	param.property.afterImageGrpCode= $("#answerImg3").attr("data");
	
	param.property.answerDt = date_to_str(new Date());
	
	var successCallback = function(data){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "삭제되었습니다." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("삭제되었습니다.");
			}
		}catch(e){
			alert("삭제되었습니다.");
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"alarm/upsert/array",[param],'post', successCallback);
}


</script>
</body>
</html>
