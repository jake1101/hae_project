<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String pictureParamTitle = (String)request.getParameter("pictureParamTitle"); %>
<% String pictureParamPicId = (String)request.getParameter("pictureParamPicId"); %>
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

	<!--  ?????? ???????????? ?????? ?????? ???????????????. -->
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
        	 ???????????? ??????
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
				<h2 class="tt_8" id="picTitle"></h2>
	        	<div  class="form-group">
	        		<div class="photo-div" style = "border-radius: 20px; background-color: #fbdfda; margin-bottom:10px;">
	        			<div id="picImgArea"  style="overflow:scroll; text-align: center; padding: 20px;" >
							<img id="faPic" src="../img/photo_icon.png" alt="???????????????">
	        			</div>
<!-- 	        			<img class="img-responsive" id="picImgArea"></img> -->
	        		</div>
				</div>
				
	        	<div  class="form-group">
					<div class="input-group">
			           	<span class="input-group-addon">??????</span>
			          	<select id="constCd" class="form-control"  style="width: 100%;">
						</select>
			        </div>
				</div>
				<div class="form-group">
					<div class="input-group">
			           	<span class="input-group-addon">??????</span>
		                <input type="text" class="form-control" id="location" maxlength="50" style="width:80%">
		                <i class="fa fa-microphone" id="micLocation" style="text-align:center; font-size:30px; display:block;"></i>
			        </div>
				</div>
				<div class="form-group">
					<div class="input-group">
			           	<span class="input-group-addon">??????</span>
		                <input type="text" class="form-control" id="description" maxlength="50" style="width:80%">
		                <i class="fa fa-microphone" id="micCmmt" style="text-align:center; font-size:30px; display:block;"></i>
			        </div>
				</div>
            </div>
            <label>
               <input type="checkbox" id="contentsYn" name ="contentsYn" class="minimal" >
             	???????????? ????????????
            </label>
            <div >
       			<i class="fa fa-camera" id="picCamera" style="text-align:center; font-size:30px; display:block;margin : 10px;"></i>
<!-- 	        			<i class="fa fa-folder-open" id="picGallery" style="text-align:center; font-size:30px; display:block;margin : 10px; float:right; width:40%;"></i> -->
       		</div>
        	<div style="text-align:center">
        	  <button type="submit" onclick = "onSave()" class="btn btn-send w150">??????</button>
       	 	</div>
       	 	<br>
         </div>
         
		<!-- /.box-body -->
	   </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <div class="control-sidebar-bg"></div>
  
  
   <form name="loginSuccess" id="loginSuccess" style="margin-bottom:0px;">
  	  <input type="hidden"  name="siteId" id="f_siteId">
  	  <input type="hidden"  name="grpCd" id="f_grpCd">
	  <sec:csrfInput/>
  </form>	
</div>

<footer class="footer_wrap">
  Copyright &copy; (???)??????.All rights reserved.
</footer>
<!-- ./wrapper -->

<script>

var pictureParamTitle ;
if('<%=pictureParamTitle%>' != 'null'){
	pictureParamTitle = '<%=pictureParamTitle%>';
}
var pictureParamPicId ;
if('<%=pictureParamPicId%>' != 'null'){
	pictureParamPicId = '<%=pictureParamPicId%>';
}
$(document).ready(function(){
	start();
	$("#picTitle").html("??????(?????????) : " + pictureParamTitle);
	$(".fa-camera").on('click', function(e){
        var targetId = e.currentTarget.id;
        
        // ??????????????????
//         var listIdx = targetId.split('-')[0];
//         var grpCd = gPtwDataList[listIdx].grpCd || "";
        
        var param = {
           grpCd: ""
           ,targetId: targetId
        };
        
        // native : ????????? or ?????? 
        getPhotoShoot(param);
        
     });
	
	$(".fa-microphone").on('click', function(e){
        var targetId = e.currentTarget.id;
                
        var param = {
           target: targetId
        };
        
        if(checkMobile()=="ios"){
// 			var message = {  message: "????????? ??????????????????." };
// 			window.webkit.messageHandlers.showToast.postMessage(message);
		}else{
			window.LexaApp.showToast("????????? ??????????????????.");      
		}
        // native : ????????????
        getMic(param);
        
     });
});


function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=localStorage.siteId;
	param.id=localStorage.siteId;
	findWorkTypeList(param);
}

function findWorkTypeList(param){
	var successCallback = function(data){
		var resultList = data.body;
		for(var i = 0 ; i < resultList.length ; i++){
			if(i==0){
	             $('#constCd').append( $("<option>?????? ??????</option>"));
	             $("#constCd option:eq(0)").attr("selected", "selected");
	             $("#constCd option:eq("+i+")").attr("constCd",null);
	             $("#constCd option:eq("+i+")").attr("value",null);
				
			}
             $('#constCd').append( $("<option>"+resultList[i].constNm+"</option>"));
             $("#constCd option:eq("+(i+1)+")").attr("constCd",resultList[i].constCd);
             $("#constCd option:eq("+(i+1)+")").attr("value",resultList[i].constCd);
		}
    }
	mobileUtil.callApi(conf.raycomApiUrl+"mobile/if/const/type/detail/list",param,'post', successCallback);
}

// Native ?????? ?????? ??????(????????? or ??????)
function getPhotoShoot(param){
   try{
      if(checkMobile()=="ios"){
         var message = {  grpCode : param.grpCd, tag:  param.targetId};
         window.webkit.messageHandlers.getPhotoShoot.postMessage(message);
      }else{
         window.LexaApp.getPhotoShoot(param.grpCd, param.targetId);
      }
   }catch(e){
      console.log(e);
   }
}

// ?????? ????????? ??????
function setAppPhotoFile(callback, tag){
   
   var callbackData = JSON.parse(callback);
   var grpCd = callbackData.body.grp_cd;
	$("#f_grpCd").attr("value", grpCd);
   
   // ?????? ????????????
   var picFilePath = callbackData.body.idSetArray[0].path_file_nm + "-xxhdpi";
   var resource = picFilePath;
   resource = resource.split("\\").join("/");
	
	$("#faPic").attr("data",grpCd);
	$("#faPic").attr("src", "/repository/"+resource);
	$("#faPic").css("width","150px");
	$("#faPic").attr("object-fit", "contain");
	
}

//native : ????????????
function getMic(param){
   try{
      if(checkMobile()=="ios"){
         var message;
		if($(".fa-stop").length != 0 && $(".fa-stop").attr('id') != param.target){
			alert("?????? ???????????? ??????????????????.");
			return;
		}
		if($("#" + param.target).hasClass("fa-stop")){			
			$("#" + param.target).removeClass("fa-stop");
			$("#" + param.target).addClass("fa-microphone");
			message = {tag:  param.target, isStart: false}
		}
		else{
			$("#" + param.target).removeClass("fa-microphone");
			$("#" + param.target).addClass("fa-stop");			
			message = {tag:  param.target, isStart: true}
		}
         window.webkit.messageHandlers.getMic.postMessage(message);
      }else{
         window.LexaApp.getMic(param.target);
      }
   }catch(e){
      console.log(e);
   }
}
function setMic(tag,value){
  if(tag == "micLocation"){
	  $("#location").val(value);
  }else if ( tag = "micCmmt"){
	  $("#description").val(value);
  }
}

function onSave() {
	
	var constCd = $('#constCd').val();
	var location = $('#location').val();
	var description = $('#description').val();
// 	var grpCd ="test";
	var grpCd = $("#f_grpCd").val();
	
	if($('#constCd').val() == "?????? ??????"){
		constCd = null;
	}
	
	if(grpCd == null || grpCd == ""){
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "????????? ???????????? ???????????????.." };
				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("????????? ???????????? ???????????????.");      
			}
		}catch(e) {
			alert("????????? ???????????? ???????????????..");        			
		}
		return;
	}
	
	var constPicDtlArray = new Array();
	var jsonObj		= new Object();
	
	jsonObj.constCd = constCd;
	jsonObj.description = description;
	jsonObj.imgGrpCd = grpCd;
	jsonObj.location = location;
	
	jsonObj = JSON.stringify(jsonObj);
	//String ????????? ????????? ????????? ?????? json?????? ??????
	constPicDtlArray.push(JSON.parse(jsonObj));
	
	var param = {
		"constPicId" : pictureParamPicId ?  pictureParamPicId : null, 
		"constPicTitle" : pictureParamTitle,
		"constPicDtlArray" : constPicDtlArray
	}
	
		//api???????????? db??? ??????
		param.siteId=localStorage.siteId;
	var successCallback = function(data){
		
		pictureParamPicId = data.body;	//constPicId??? ????????????????????? ??????
		
		/////////// ???????????? ???????????? 
	   try{
	      if(checkMobile()=="ios"){
	         var message = {id:  pictureParamPicId , title: pictureParamTitle};
	         window.webkit.messageHandlers.saveTitle.postMessage(message);
	      }else{
	    		window.LexaApp.saveTitle(pictureParamPicId, pictureParamTitle);  	//native??? ?????? ??????
	      }
	   }catch(e){
	      console.log(e);
	   }
		
		try{
			if(checkMobile()=="ios"){
//				var message = {  message: "?????? ?????? ????????? ?????? ???????????????." };
//				window.webkit.messageHandlers.showToast.postMessage(message);
			}else{
				window.LexaApp.showToast("?????? ?????? ????????? ?????? ???????????????.");      
			}
		}catch(e) {
			alert("?????? ?????? ????????? ?????? ???????????????.");        			
		}
		
		try{
			if(checkMobile()=="ios"){
				var message = {  message: "????????? ?????? ???????????????????" , tag : "pictureResgistReset" };
				window.webkit.messageHandlers.confirmMessage.postMessage(message);
			}else{
				window.LexaApp.confirmMessage("????????? ?????? ???????????????????","pictureResgistReset");
			}
		}catch(e){
			var result = confirm("????????? ?????? ???????????????????");
			if(result){
				returnConfirm(true , "pictureResgistReset");
			}else{
				return;
			}
		}
		
    }
	mobileUtil.callApi(conf.raycomApiUrl+"/site/const/pic/upsert",[param],'post', successCallback);

}

function resetContent(){
     
       if($("#contentsYn").is(":checked")){
       	$("#f_grpCd").val(null);
      		$("#faPic").attr("data",null);
      		$("#faPic").attr("src", "../img/photo_icon.png");
      		$("#faPic").attr("alt", "???????????????");
       }else{
       	$("#constCd option:eq(0)").prop("selected", true);
       		
      		$('#location').val(null);
      		$('#description').val(null);
      		$("#f_grpCd").val(null);
      		$("#faPic").attr("data",null);
      		$("#faPic").attr("src", "../img/photo_icon.png");
      		$("#faPic").attr("alt", "???????????????");
       }
}
function onBack(){
	
	try{
		if(checkMobile()=="ios"){
			var message = {  message: "????????? ????????? ?????? ???????????????." , tag : "pictureResgist" };
			window.webkit.messageHandlers.confirmMessage.postMessage(message);
		}else{
			window.LexaApp.confirmMessage("????????? ????????? ?????? ???????????????.","pictureResgist");
		}
	}catch(e){
		var result = confirm("????????? ????????? ?????? ???????????????.");
		if(result){
			returnConfirm(true , "pictureResgist");
		}else{
			return;
		}
	}
	
}
 
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>