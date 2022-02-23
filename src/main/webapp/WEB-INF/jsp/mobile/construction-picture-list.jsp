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
			height: calc(100% - 20px);
		}
		
		.box-body{
			height:100%;
		}


		@media only screen and (max-width: 760px){				
	#picture_table td:nth-of-type(1):before { content: "순번"; color:#f9836d; background-color: #fdf0ed; width: 90px;}
	#picture_table td:nth-of-type(2):before { content: "제목"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
	#picture_table td:nth-of-type(3):before { content: "일자"; color:#f9836d; background-color: #fdf0ed;width: 90px;}
			}

	</style>

	<script type="text/javascript">
	</script>
</head>

<body class="hold-transition skin-blue sidebar-collapse sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header" style="position: fixed;   width: 100%;">
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      </a>
      <a href="#" style="float: left; background-color: transparent; background-image: none; padding: 15px 3px;
   			 font-family: fontAwesome; color:white">
        	시공 사진 목록
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
              <div id="picture_list_area" class="form-group" style="height: calc(100%); overflow:scroll;">
          		<table id="picture_table" class='table table-bordered' style='border-spacing: 3px; width : 100%; display: block !important;'>
          			<colgroup>
						<col width='20%'/> 
						<col width='40%'/>
						<col width='40%'/>
					</colgroup>
					<thead>
						<tr>
							<th>순번</th>
							<th>제목</th>
							<th>일자</th>
						</tr>
					</thead>
					<tbody id = "picture_body">
					</tbody>
          		</table>
			  </div>
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
  <form name="pictureDetail" id="pictureDetail" style="margin-bottom:0px">
  	  <input type="hidden"  name="const_pic_id" id="const_pic_id">
  	  <input type="hidden"  name="const_pic_title" id="const_pic_title">
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
	
// 	var test = [{
// 			"const_pic_id" : 1,
// 			"const_pic_title" : "title1",
// 			"updated_dt" : "2021-09-13"
// 	},{
// 		"const_pic_id" : 2,
// 		"const_pic_title" : "title2",
// 		"updated_dt" : "2021-09-12"
// 	},{
// 		"const_pic_id" : 3,
// 		"const_pic_title" : "title3",
// 		"updated_dt" : "2021-09-01"
// 	}
// 	];
	
	
// 	for(var i = 0 ;  i < test.length ; i ++){
		
// 		var const_pic_id = test[i].const_pic_id;
// 		var const_pic_title = test[i].const_pic_title;
// 		var updated_dt = test[i].updated_dt;
// 		var html ="<tr onclick='pictureDetailOpen("+JSON.stringify(test[i])+")'><td>"+const_pic_id+"</td>"
// 				+"<td>"+const_pic_title+"</td>"
// 				+"<td>"+updated_dt+"</td>"
// 				+"</tr>"
				
// 		$("#picture_body").append(html);
		
// 	}
	
	var param = {};
	param.siteIds=[Number(localStorage.siteId)];
	param.searchType="title";
	param.user_id=localStorage.loginUser;
	findPictureList(param);
}

function date_to_str2(format)

{

    var year = format.getFullYear();

    var month = format.getMonth() + 1;

    if(month<10) month = '0' + month;

    var date = format.getDate();

    if(date<10) date = '0' + date;

    return year + "-" + month + "-" + date+ " ";

}

function findPictureList(param){
	
		var successCallback = function(data){
			console.log(data);
			var resultList = data.body;
			$('#picture_body').children().remove();
			
			//table에 목록 추가
			//tr 에 클릭이벤트 추가
			
		 	for(var i = 0 ;  i < resultList.length ; i ++){
		 		var const_pic_id = resultList[i].constPicId;
		 		var const_pic_title = resultList[i].constPicTitle;
		 		var updated_dt = resultList[i].updatedDt;
		 		var html ="<tr onclick='pictureDetailOpen("+JSON.stringify(resultList[i])+")'><td>"+const_pic_id+"</td>"
		 				+"<td>"+const_pic_title+"</td>"
		 				+"<td>"+date_to_str2(new Date(updated_dt))+"</td>"
		 				+"</tr>"
						
		 		$("#picture_body").append(html);
	 		}
			
	    }
		param.allSearch = $("#searchParam").val();
		mobileUtil.callApi(conf.raycomApiUrl+"site/const/list",param,'post', successCallback);
	
} 


function pictureDetailOpen(param){
	$("#const_pic_id").val(param.constPicId);
	$("#const_pic_title").val(param.constPicTitle);
	// 디테일화면으로이동
	var $pictureDetailFrm = $("#pictureDetail");
    $pictureDetailFrm.attr('action', '/mobile/pictureDetail.do');
    $pictureDetailFrm.attr('method', 'get');
    $pictureDetailFrm.submit();
}


function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}

</script>
</body>
</html>
