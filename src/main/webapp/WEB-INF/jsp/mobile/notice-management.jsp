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
        	 공지사항 목록
      </a>
      
	  
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
              <div id="notice_area" class="form-group"  style="height: calc(100% - 34px); overflow:scroll;">
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
   <form name="noticeDetail" id="noticeDetail">
      <input type="hidden"  name="notice_id" id="notice_id">
  	  <input type="hidden"  name="notice_title" id="notice_title">
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
	
	var param = {};
	param.siteId = localStorage.siteId;
	findNoticeList(param);
}

function date_to_str2(format){

    var year = format.getFullYear();

    var month = format.getMonth() + 1;

    if(month<10) month = '0' + month;

    var date = format.getDate();

    if(date<10) date = '0' + date;

    return year + "-" + month + "-" + date+ " ";
}

function findNoticeList(param){
 	
	var successCallback = function(data){
		var resultList = data.body;
		$('.noticeInfo').remove();
		var html = '';
		for(var i = 0 ; i< resultList.length ; i++){
			var html = "<div  onclick='openDetail("+JSON.stringify(resultList[i])+")' style='margin-bottom:0px ; background:white; border-top:1px solid #f4f4f4;' id='noticeInfo"+resultList[i].id+"' class='noticeInfo'>"
				+"<div  style='width:100%; font-size:16px; padding:10px; font-weight:bold; color:black; text-align:left;'>"
				+"<table class=' noticeList' style='border-spacing: 3px; width : 100%;'>"
				+"<colgroup>"
				+"<col width='30%'/>"
				+"<col width='70%'/>"
				+"</colgroup>"
				+"<tr><th>제목</th><td>"+resultList[i].title+"</td></tr>"
				+"<tr><th>작성자</th><td>"+resultList[i].writer+"</td></tr>"
				+"<tr><th>공지일자</th><td>"+date_to_str2(new Date(resultList[i].startDt))+"</td></tr>"
				+"</table></div></div>";
			
			$('#notice_area').append(html);
		}        		
    }
	
	mobileUtil.callApi(conf.raycomApiUrl+"notice/list",param,'post', successCallback);
} 

function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}

function openDetail(param){
	$("#notice_id").val(param.notiId);
	$("#notice_title").val(param.title);
	var $noticeDetailFrm = $("#noticeDetail");
    $noticeDetailFrm.attr('action', '/mobile/noticeDetail.do');
    $noticeDetailFrm.attr('method', 'get');
    $noticeDetailFrm.submit();
} 

</script>
</body>
</html>
