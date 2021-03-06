<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String loginUser = (String)request.getSession().getAttribute("mLoginUser"); %>
<% String userToken = (String)request.getSession().getAttribute("mUserToken"); %>
<% String siteId = (String)request.getSession().getAttribute("siteId"); %>

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
<!-- 	<script src="/resources/js/jquery-2.1.1.min.js"></script> -->
	
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
	<style>
		.container {
			background-color: white;
		}
		.text-input {
			width : 250px;
			height : 30px;
			font-size : 20px !important;
		}
	</style>
	<script type="text/javascript">
		$(document).ready(function(){
			// ?????? ????????? ?????? 	
			var base = btoa("absADMIN");
			//console.log(base);
			//YWJzQURNSU4=
			
			if('<%=request.getParameter("uid")%>'!='null'){
				try{
					window.IotApp.showToast("??????????????? ???????????????. ????????? ????????? ?????? ???????????? ??? ?????? ????????? ????????? ????????????. ");
				}catch(e){
					
				}
				
				var uid = '<%=request.getParameter("uid")%>';
				uid = uid.split(" ").join("+");
				var userid =atob(uid);
				userid = userid.split(" ").join("");
				//console.log(userid);
				userid = userid.substring(3);
				
				
				var $afterLoginFrm = $("#loginSuccess");
	       	     $afterLoginFrm.attr('action', '/mobile/mLoginSuccess.do');
	       	     $afterLoginFrm.attr('method', 'post');
	       	     $("#mLoginUser").val(userid);
	       	     $afterLoginFrm.submit();
			}
			
			
			
			
			
			var userInputId = getCookie("userInputId");
		    $("#username").val(userInputId.toUpperCase()); 
		     
		    if(getCookie("userInputId")!=""){ // ??? ?????? ID??? ???????????? ?????? ????????? ?????? ???, ?????? ?????? ????????? ID??? ????????? ????????????,
		        $("#idSaveCheck").attr("checked", true); // ID ??????????????? ?????? ????????? ??????.
		    }
		     
		    $("#idSaveCheck").change(function(){ // ??????????????? ????????? ?????????,
		        if($("#idSaveCheck").is(":checked")){ // ID ???????????? ???????????? ???,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7??? ?????? ?????? ??????
		        }else{ // ID ???????????? ?????? ?????? ???,
		            deleteCookie("userInputId");
		        }
		    });
		     
		    // ID ??????????????? ????????? ???????????? ID??? ???????????? ??????, ?????? ?????? ?????? ??????.
		    $("#username").keyup(function(){ // ID ?????? ?????? ID??? ????????? ???,
		        if($("#idSaveCheck").is(":checked")){ // ID ??????????????? ????????? ????????????,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7??? ?????? ?????? ??????
		        }
		    });
			
			
			$("#btn_sign").click(function(){
				var loginForm = document.loginForm;
				
				var id = "<%=loginUser%>";
				var userToken = "<%=userToken%>";
				$.ajax({
					type:'get',
					url : conf.raycomApiUrl+"users/logout",
			        dataType: "json",
			        timeout: 3000,
			        beforeSend : function(xhr){
			            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
			            xhr.setRequestHeader("userToken",userToken);
			        },
			        success: function(data) {  
			        	if(data.header.code == 1){
			        		try{
			        			window.LexaApp.setLogout(id, userToken);			        			 
			        			window.LexaApp.showToast("???????????? ???????????????.");
			        		}catch(e) {
			        			//console.log(e)
			        		}
							
			        	}else{
			        		try{
			        			window.LexaApp.showToast(data.body);
			        		}catch(e) {
				        		alert(data.body);
			        		}
			        	}
			        	
			        }
				});// end of ajax
				
			})// end of click
			
		})
		
		
		function setAppSignature(callback,tag){
				window.LexaApp.showToast(callback);
			}
		
		function hexToBase64(str) {
		  return btoa(String.fromCharCode.apply(null,
		    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
		  );
		}
		
		function base64ToHex(str) {
		  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
		    var tmp = bin.charCodeAt(i).toString(16);
		    if (tmp.length === 1) tmp = "0" + tmp;
		    hex[hex.length] = tmp;
		  }
		  return hex.join(" ");
		}
		
		function setCookie(cookieName, value, exdays){
		    var exdate = new Date();
		    exdate.setDate(exdate.getDate() + exdays);
		    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
		    document.cookie = cookieName + "=" + cookieValue;
		}
		 
		function deleteCookie(cookieName){
		    var expireDate = new Date();
		    expireDate.setDate(expireDate.getDate() - 1);
		    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
		}
		 
		function getCookie(cookieName) {
		    cookieName = cookieName + '=';
		    var cookieData = document.cookie;
		    var start = cookieData.indexOf(cookieName);
		    var cookieValue = '';
		    if(start != -1){
		        start += cookieName.length;
		        var end = cookieData.indexOf(';', start);
		        if(end == -1)end = cookieData.length;
		        cookieValue = cookieData.substring(start, end);
		    }
		    return unescape(cookieValue);
		}
		
		
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
        	 ?????? ??????
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
    <section class="content" style="padding:0px">
      <!-- Default box -->
      <style>
      	button {
      		width : 160px;
      	}
      </style>
        <div class="box box-body"  >
			  <div class="row">
			  	<div  style="text-align:center ; font-weight: bold; font-size:40px;">
						 ?????? HOME ??????
			  	</div>
			  </div>
			  <div class="col-xs-12" style="text-align: center; ">
				  <form name="loginSuccess" id="loginSuccess" style="margin:bottom:0px;">
				  	  <input type="hidden"  name="mLoginUser" id="mLoginUser">
				  	  <input type="hidden"  name="type" id="mLoginType">
					  <sec:csrfInput/>
				  </form>	
			  </div>
			  <table class='table table-border'>
				  <tr>	
				  <td style="text-align: center; "><button onclick="changeTo('smartTagLocationState.do')" class='btn btn-default'>??????????????? ?????? ??????</button></td>
				  <td style="text-align: center; "> <button onclick="changeTo('smartTagLocationState.do')" class='btn btn-default'>????????????</button></td>
				  </tr>
				  <tr>	
				  <td style="text-align: center; "><button onclick="changeTo('smartTagLocationState.do')" class='btn btn-default'>???????????? ??????</button></td>
				  <td style="text-align: center; ">  <button onclick="changeTo('alarmHistory.do')" class='btn btn-default'>?????? ??????</button></td>
				  </tr>
				  <tr>	
				  <td style="text-align: center; "><button onclick="changeTo('smartTagLocationState.do')" class='btn btn-default'>CCTV</button></td>
				  <td style="text-align: center; "> <button onclick="changeTo('smartTagLocationState.do')" class='btn btn-default'>?????????</button></td>
				  </tr>
				  <tr>	
				  <td style="text-align: center; "> <button onclick="changeTo('ptwReqList.do')" class='btn btn-default'>???????????? ?????? / ??????</button></td>
				  <td style="text-align: center; ">  <button onclick="changeTo('smartTagLocationState.do')" class='btn btn-default'>?????? ?????? ??????</button></td>
				  </tr>
				  <tr>	
				  <td style="text-align: center; "><button onclick="changeTo('registrationmax.do')" class='btn btn-default'>????????? ?????? ??????</button></td>
				  <td style="text-align: center; "><button onclick="changeTo('smartTagSiteMapping.do')" class='btn btn-default'>??????????????? ?????? ??????</button></td>
				  </tr>
				  <tr>
				  	<td colspan=2 style="text-align:center;">
			           <button onclick="logout()" class='btn btn-default'>????????????</button>
				  	</td>
				  </tr>
			  </table>
	          
		<!-- /.box-body -->
		</div>
        <!-- /.box-footer-->
      <!-- /.box -->
	
	   
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="pull-right hidden-xs">
    </div>
    <strong>Copyright &copy; (???)??????.</strong> All rights
    reserved.
  </footer>

  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<script>

  

// $(document).ajaxStart(function () {
//    Pace.restart()
//  })


</script>
</body>
</html>
