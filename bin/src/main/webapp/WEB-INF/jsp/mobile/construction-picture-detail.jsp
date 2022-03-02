<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String const_pic_id = (String)request.getParameter("const_pic_id"); %>
<% String const_pic_title = (String)request.getParameter("const_pic_title"); %>
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
        	 시공사진 상세
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
	        	<div id="formDiv">
<!-- 		        	<div  class="form-group"> -->
<!-- 		        		<div class="photo-div" style = "border:1px solid #eee ; margin-bottom:10px;"> -->
<!-- 		        			<i class="fa fa-image" id="faPic" style="text-align:center; font-size:160px; display:block;margin : 10px;"></i> -->
<!-- 		        			<div id="picImgArea"  style="overflow:scroll;" ></div> -->
<!-- 		        		</div> -->
<!-- 					</div> -->
<!-- 		        	<div  class="form-group"> -->
<!-- 						<div class="input-group"> -->
<!-- 				           	<span class="input-group-addon">공종</span> -->
<!-- 				           	 <input type="text" class="form-control" id="workType" maxlength="50" readonly> -->
<!-- 				        </div> -->
<!-- 					</div> -->
<!-- 					<div class="form-group"> -->
<!-- 						<div class="input-group"> -->
<!-- 				           	<span class="input-group-addon">위치</span> -->
<!-- 			                <input type="text" class="form-control" id="location" maxlength="50" readonly> -->
<!-- 				        </div> -->
<!-- 					</div> -->
<!-- 					<div class="form-group"> -->
<!-- 						<div class="input-group"> -->
<!-- 				           	<span class="input-group-addon">내용</span> -->
<!-- 			                <input type="text" class="form-control" id="description" maxlength="50" readonly> -->
<!-- 				        </div> -->
<!-- 					</div> -->
				</div>
            </div>
<!--             <div > -->
<!--        			<i class="fa fa-camera" id="picCamera" style="text-align:center; font-size:30px; display:block;margin : 10px;"></i> -->
<!-- 	        			<i class="fa fa-folder-open" id="picGallery" style="text-align:center; font-size:30px; display:block;margin : 10px; float:right; width:40%;"></i> -->
<!--        		</div> -->
<!--         	<div style="text-align:center"> -->
<!--         	  <button type="submit" onclick = "onNext()" class="btn btn-primary">전송</button> -->
<!--        	 	</div> -->
<!--        	 	<br> -->
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
</div>

<footer class="footer_wrap">
    Copyright &copy; (주)한라.All rights reserved.
</footer>
<!-- ./wrapper -->

<script>

var const_pic_title ;
var const_pic_id ;
if('<%=const_pic_title%>' != 'null'){
	const_pic_title = '<%=const_pic_title%>';
}
if('<%=const_pic_id%>' != 'null'){
	const_pic_id = '<%=const_pic_id%>';
}
$(document).ready(function(){
	start();
	$("#picTitle").html("제목(작업명) : " + const_pic_title);
});


function start(){
	var site_id = null;
	
	var param = {};
	param.siteId=localStorage.siteId;
	param.constPicId=const_pic_id;
	param.searchType="title";
	
	
// 	var formDiv1 = null;
// 	formDiv1 = document.createElement("div");	
// 	formDiv1.classList.add("form-group");
	
// 	var photoDiv = null;
// 	photoDiv = document.createElement("div");	
// 	photoDiv.classList.add("photo-div");
// 	photoDiv.style.border = '1px solid #eee';
// 	photoDiv.style.marginBottom = '10px';
	
// 	var imgEle = document.createElement("img");
//    	imgEle.classList.add("img-responsive");
// //     if(filePath){
// //        imgEle.setAttribute("src", "/repository/" + filePath);
// //     }
// //     imgEle.setAttribute("id", "img" + "-" + idx + "-" + i);
//     photoDiv.appendChild(imgEle);
     
//     formDiv1.appendChild(photoDiv);
    
	findPictureDetail(param);
}

function findPictureDetail(param){
	var successCallback = function(data){
		var result= data.body || [];
		
// 		var grpCd = result.grp_cd;

	    
	    for(var i = 0 ; i < result.length; i++){
			var formDiv1 = null;
			formDiv1 = document.createElement("div");	
			formDiv1.classList.add("form-group");
			
			var photoDiv = null;
			photoDiv = document.createElement("div");	
			photoDiv.classList.add("photo-div");
			photoDiv.style.borderRadius = '20px';
			photoDiv.style.backgroundColor = '#fbdfda';
			photoDiv.style.marginBottom = '10px';
			
			var picImgArea = null;
			picImgArea = document.createElement("div");	
			picImgArea.classList.add("photo-div");
			picImgArea.style.padding = '20px';
			picImgArea.style.textAlign = 'center';
			picImgArea.style.overflow = 'scroll';
			
			
			var filePath = result[i].attFilePath ? "/repository/"+result[i].attFilePath : "../../img/empty.png";
			var imgEle = document.createElement("img");
		   	imgEle.classList.add("img-responsive");
		     if(filePath){
		        imgEle.setAttribute("src", filePath);
		        imgEle.style.width = "150px";
		        imgEle.style.margin = "auto";
		        imgEle.setAttribute("object-fit", "contain");
		     }
// 		     imgEle.setAttribute("id", "img" + "-" + idx + "-" + i);
		    picImgArea.appendChild(imgEle);
		    photoDiv.appendChild(picImgArea);
		     
	    
		    formDiv1.appendChild(photoDiv);
		    
		    var formDiv2 = null;
		 	formDiv2 = document.createElement("div");	
		 	formDiv2.classList.add("form-group");
		 	
		 	var inputDiv1 = null;
		 	inputDiv1 = document.createElement("div");	
		 	inputDiv1.classList.add("input-group");
		 	
		 	var inputSpan1 = null;
		 	inputSpan1 = document.createElement("span");	
		 	inputSpan1.classList.add("input-group-addon");
		 	inputSpan1.innerHTML="공종";
		 	
		 	var inputTag1 = null;
		 	inputTag1 = document.createElement("input");	
		 	inputTag1.classList.add("form-control");
		 	inputTag1.id = "workTypeName";
		 	inputTag1.setAttribute("type","text");
		 	inputTag1.setAttribute("maxlength","50");
		 	inputTag1.setAttribute("readonly","true");
		 	inputTag1.setAttribute("value",result[i].result  ? result[i].result  : "");
		 	
		 	inputDiv1.appendChild(inputSpan1);
		 	inputDiv1.appendChild(inputTag1);
		 	
		 	formDiv2.appendChild(inputDiv1);
		 	
		    var formDiv3 = null;
		    formDiv3 = document.createElement("div");	
		    formDiv3.classList.add("form-group");
		 	
		 	var inputDiv2 = null;
		 	inputDiv2 = document.createElement("div");	
		 	inputDiv2.classList.add("input-group");
		 	
		 	var inputSpan2 = null;
		 	inputSpan2 = document.createElement("span");	
		 	inputSpan2.classList.add("input-group-addon");
		 	inputSpan2.innerHTML="위치";
		 	
		 	var inputTag2 = null;
		 	inputTag2 = document.createElement("input");	
		 	inputTag2.classList.add("form-control");
		 	inputTag2.id = "location";
		 	inputTag2.setAttribute("type","text");
		 	inputTag2.setAttribute("maxlength","50");
		 	inputTag2.setAttribute("readonly","true");
		 	inputTag2.setAttribute("value",result[i].location ? result[i].location  : "" );
		 	
		 	inputDiv2.appendChild(inputSpan2);
		 	inputDiv2.appendChild(inputTag2);
		 	
		 	formDiv3.appendChild(inputDiv2);
		 	
		    var formDiv4 = null;
		    formDiv4 = document.createElement("div");	
		    formDiv4.classList.add("form-group");
		 	
		 	var inputDiv3 = null;
		 	inputDiv3 = document.createElement("div");	
		 	inputDiv3.classList.add("input-group");
		 	
		 	var inputSpan3 = null;
		 	inputSpan3 = document.createElement("span");	
		 	inputSpan3.classList.add("input-group-addon");
		 	inputSpan3.innerHTML="내용";
		 	
		 	var inputTag3 = null;
		 	inputTag3 = document.createElement("input");	
		 	inputTag3.classList.add("form-control");
		 	inputTag3.id = "description";
		 	inputTag3.setAttribute("type","text");
		 	inputTag3.setAttribute("maxlength","50");
		 	inputTag3.setAttribute("readonly","true");
		 	inputTag3.setAttribute("value",result[i].description ? result[i].description  : "");
		 	
		 	inputDiv3.appendChild(inputSpan3);
		 	inputDiv3.appendChild(inputTag3);
		 	
		 	formDiv4.appendChild(inputDiv3);
		     
		 	
		 	document.getElementById("formDiv").appendChild(formDiv1);
		 	document.getElementById("formDiv").appendChild(formDiv2);
		 	document.getElementById("formDiv").appendChild(formDiv3);
		 	document.getElementById("formDiv").appendChild(formDiv4);
	 	
	    }
	 	
	   //picImgArea div 에 이미지가 있다면
// 	   $("#faPic").css("display","none");
		
		//for문돌면서  div에 순차적으로 추가 예정
		//img div에 img 태그 추가
// 		var imgArea = null;
// 		imgArea = document.createElement("img");
// 		imgArea.classList.add("img-responsive");
// 		imgArea.id  = "picImg";
// 		$("#picImg").attr("src", "/repository/"+resource);
// 		$("#picImgArea").css("height","160px");
// 		document.getElementById("#picImgArea").appendChild(imgArea);
		
    }
	mobileUtil.callApi(conf.raycomApiUrl+"/site/const/dtl/list",param,'post', successCallback);
}


function onBack(){
	window.location.href="/mobile/pictureList.do";
}
 
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}



</script>
</body>
</html>
