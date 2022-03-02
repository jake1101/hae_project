<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<% String loginUser = (String)request.getSession().getAttribute("mLoginUser"); %>
<% String userToken = (String)request.getSession().getAttribute("mUserToken"); %>
<% String current_site = (String)request.getParameter("site_id"); %>

<html>
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
	</style>
	<script type="text/javascript">
		$(document).ready(function(){
			// 자동 로그인 처리 	
			var base = btoa("absADMIN");
			//console.log(base);
			//YWJzQURNSU4=
			
			if('<%=request.getParameter("uid")%>'!='null'){
				try{
					window.IotApp.showToast("자동로그인 되었습니다. 해제를 원하실 경우 로그아웃 후 다시 로그인 하시기 바랍니다. ");
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
		     
		    if(getCookie("userInputId")!=""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
		        $("#idSaveCheck").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
		    }
		     
		    $("#idSaveCheck").change(function(){ // 체크박스에 변화가 있다면,
		        if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7일 동안 쿠키 보관
		        }else{ // ID 저장하기 체크 해제 시,
		            deleteCookie("userInputId");
		        }
		    });
		     
		    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
		    $("#username").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
		        if($("#idSaveCheck").is(":checked")){ // ID 저장하기를 체크한 상태라면,
		            var userInputId = $("#username").val();
		            setCookie("userInputId", userInputId.toUpperCase(), 7); // 7일 동안 쿠키 보관
		        }
		    });
			
			
			$("#btn_sign").click(function(){
				var loginForm = document.loginForm;
				
				var id = "<%=loginUser%>";
				var userToken = "<%=userToken%>";
				try{
					window.LexaApp.setLogout(id, userToken);
				}catch(e){
					console.log(e);
				}
				
			})// end of click
			
		})
		
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
<body>
<page>
<div class="row container" style="height:100%" >
	  <div class="row container" style="height:100%" >
	  <div class="row">
	  	<div  style="margin-top : 20px;margin-bottom:30px;;text-align:center ; font-weight: bold; font-size:40px;">
<!-- 		  	<image style="resize:both; max-width:155px;" src="/resources/img/cjLogo.png"></image>	 -->
				  WORKER LOGOUT
	  	</div>
	  </div>
	  <div class="col-xs-12" style="text-align: center; ">
		  <form name="loginSuccess" id="loginSuccess">
		  	  <input type="hidden"  name="mLoginUser" id="mLoginUser">
		  	  <input type="hidden"  name="type" id="mLoginType">
			  <sec:csrfInput/>
		  </form>	
		  <p>
		    <button style="width : 120px;"id="btn_sign">LOG OUT</button>
		  </p>
	  </div>
	</div>
</div>
</page>
</body>
</html>
