<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<% String androidDt = (String)request.getAttribute("androidDt"); %>
<% String iosDt = (String)request.getAttribute("iosDt"); %>
<% String androidFile = (String)request.getAttribute("androidFile"); %>
<% String iosFile = (String)request.getAttribute("iosFile"); %>
<!DOCTYPE html>
<head>
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--   	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->
	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
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
		.bt {
		 cursor:pointer;
		 border-radius: 15px;
		 margin:10px;
		 display:block;
		 padding:4px 8px;
		 height:30px;
		 border:1px solid #d7d7d7;
		 text-align:center;
		 text-decoration: none;   
		 background-repeat:repeat-x;
		 background:#fcfcfc;
		 color:#9b9b9b;
		 font-size:20px;
		 font-family:"돋움,dotum,굴림,gulim,Vertical,Arial";
		}
		.bt_hov{
		 cursor:pointer;
		 border-radius: 15px;
		 margin:10px;
		 display:block;
		 padding:4px 8px;
		 height:30px;
		 border:1px solid #999999;
		 text-align:center;
		 text-decoration: none;
		 background:#e5e5e7;
		 color:#565656;
		 font-size:20px;
		}

	</style>
	<script type="text/javascript">
		     
		$(document).ready(function(){
			
			$("#android_btn").click(function(){
				location.href = "/repository/"+"<%=androidFile%>"
			})// end of click
			$("#ios_btn").click(function(){
				location.href = "/repository/"+"<%=iosFile%>"
				
			})// end of click
			
		})
		
		
		
	</script>
</head>
<body>
<page>
<div  style="height:100% ; overflow : hidden; " >
	  	<div  style="margin-top: 14%;margin-bottom:30px;;text-align:center ; font-weight: bold; font-size:40px;">
			App 다운로드
	  	</div>
	  	<div style="height:40%">
	  	 &nbsp
	  	</div>
	  <div  style="text-align: center; ">
	  	  <div style="text-align: left;">배포일 : <%=androidDt%></div>
		  <div class = "bt bt_hov" id ="android_btn"> Android download</div>
<%-- 		  <div style="text-align: left;">배포일 : <%=iosDt%></div> --%>
<!-- 		  <div class = "bt bt_hov" id ="ios_btn"> Ios download</div> -->
		  <form name="loginSuccess" id="loginSuccess">
		  	  <input type="hidden"  name="siteId" id="siteId">
		  	  <input type="hidden"  name="mLoginUser" id="mLoginUser">
		  	  <input type="hidden"  name="mUserToken" id="mUserToken">
			  <sec:csrfInput/>
		  </form>	
	  </div>
</div>
</page>
</body>
</html>
