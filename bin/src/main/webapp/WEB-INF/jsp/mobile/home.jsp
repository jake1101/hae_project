<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<head>
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
	
	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	<script src="/resources/crypt/sha.js"></script>
	
	<style>
	</style>
	
	<script type="text/javascript">
	
		function runningService(bool){
			if(bool=='Y'){
				$("#runningService").show();
			}
			else{
				$("#runningService").hide();
			}
		}
		function landingPage(targetPageAlias,siteId,userId,token,key) {
		   if(targetPageAlias == "alarmList"){
			   var $afterLoginFrm = $("#loginSuccess");
		 	     $afterLoginFrm.attr('action', '/mobile/alarmHistory.do');
		 	     $afterLoginFrm.attr('method', 'get');
		 	    localStorage.siteId=siteId;
		 	     $afterLoginFrm.submit();
		   }else if(targetPageAlias == "messageList"){
			   var $afterLoginFrm = $("#loginSuccess");
			     $afterLoginFrm.attr('action', '/mobile/alarmHistory.do');
			     $afterLoginFrm.attr('method', 'get');
			     $("#todo").val("openMessageList");
			     localStorage.siteId=siteId;
			     $afterLoginFrm.submit();
		   }else if(targetPageAlias == "ptwRequest"){
			   var $afterLoginFrm = $("#loginSuccess");
			     $afterLoginFrm.attr('action', '/mobile/movePtwDetail.do');
			     $afterLoginFrm.attr('method', 'POST');
 				 $("#side_bar_type").val("max");
			     $("#ptwReqId").val(key);
			     $("#ptwMode").val("approval");
			     localStorage.siteId=siteId;
			     $afterLoginFrm.submit();
			   //작업허가제 이동
		   }
			
		 }
		
		function checkMobile(){
			 
		    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
		 
		    if ( varUA.indexOf('android') > -1) {
		        //안드로이드
		        return "android";
		    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
		        //IOS
		        return "ios";
		    } else {
		        //아이폰, 안드로이드 외
		        return "other";
		    }
		    
		}

		     
		$(document).ready(function(){
			
			// 자동 로그인 처리 	
			var base = btoa("absADMIN");
			//console.log(base);
			//YWJzQURNSU4=
				
			var checkIos = checkMobile();
			var key = '<%=request.getParameter("key")%>';
			if(key && key !='null'){
				try{
					key=atob(key);
					console.log(key);
					var userToken = JSON.parse(key).token;
					var userId ;
					if( JSON.parse(key).userId  == null || JSON.parse(key).userId  == undefined || JSON.parse(key).userId  == ""){
						userId = "XX";					
					}else{
						userId = JSON.parse(key).userId ;
					}
					
					//api호출
					$.ajax({
						type:'get',
						url : conf.raycomApiUrl+"users/loginbytoken",
				        data : null,
				        dataType: "json",
				        timeout: 3000,
				        beforeSend : function(xhr){
				            xhr.setRequestHeader("userToken",userToken);
				            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
				        },
				        success: function(data) {  
				        	try{
				        		if(checkIos == "ios"){
			        				var message1 = { type: 'system', userId: userId , userToken: userToken ,autoLogin: true };

			        				window.webkit.messageHandlers.setLoginInfo.postMessage(message1);
			        				
			        				var message2 = { message: "자동로그인 되었습니다. 해제를 원하시면 로그아웃 해주세요" };

			        				window.webkit.messageHandlers.showToast.postMessage(message2);
			    				}else{
			        				window.LexaApp.setLoginInfo('system', userId , userToken, true);
// 			        			 window.LexaApp.showToast("자동로그인 되었습니다. 해제를 원하시면 로그아웃 해주세요");
			    				}
			        		}catch(e) {
			        			//console.log(e)
			        		}
				        	var $afterLoginFrm = $("#loginSuccess");
				       	     $afterLoginFrm.attr('action', '/mobile/mLoginSuccess.do');
				       	     $afterLoginFrm.attr('method', 'post');
// 				       	     $("#mLoginUser").val(userId);
// 				       	  	 $("#siteId").val(data.body.siteId);
// 				       	     $("#mUserToken").val(userToken);
							 if( !localStorage.siteId){
				       	 	 	localStorage.siteId=data.body.siteId;
							 }
			        	     localStorage.userToken=userToken;
			        	     localStorage.loginUser=userId;
				       	     $afterLoginFrm.submit();
				        }
					});// end of ajax
					
					
					//window.IotApp.showToast("자동로그인 되었습니다. 해제를 원하실 경우 로그아웃 후 다시 로그인 하시기 바랍니다. ");
				}catch(e){
					
				}
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
				var cryptPW = new jsSHA("SHA-512", "TEXT");
				cryptPW.update(loginForm.password.value);
				cryptPW = hexToBase64(cryptPW.getHash("HEX"));
				
				
				var param = {"userId" : loginForm.username.value , "password" : cryptPW};
				
				var checkIos = checkMobile();
				
				$.ajax({
					type:'post',
					url : conf.raycomApiUrl+"users/loginbyform",
			        data : JSON.stringify(param),
			        dataType: "json",
			        timeout: 3000,
			        beforeSend : function(xhr){
			            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
			        },
			        success: function(data) {  
			        	if(data.header.code == 1){
			        		var autoLogin = $("#autoLoginCheck").is(":checked");
			        		try{
			        			if(checkIos == "ios"){
			        				var message = { type: 'system', userId: loginForm.username.value, userToken: data.body.userToken ,autoLogin: autoLogin };

			        				window.webkit.messageHandlers.setLoginInfo.postMessage(message);
			        				
			        				var message2 ={message : "로그인 되었습니다."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message2);
			    				}else{
// 			        			window.IotApp.setLoginInfo(loginForm.username.value,  autoLogin);
			        			window.LexaApp.setLoginInfo('system', loginForm.username.value, data.body.userToken, autoLogin);
// 			        			window.IotApp.showToast("로그인 되었습니다.");
			        			 window.LexaApp.showToast("로그인 되었습니다.");
			    				}
			        		}catch(e) {
			        			//console.log(e)
			        		}
			        		
			        		var $afterLoginFrm = $("#loginSuccess");
			        	     $afterLoginFrm.attr('action', '/mobile/mLoginSuccess.do');
			        	     $afterLoginFrm.attr('method', 'post');
// 			        	     $("#mLoginUser").val(loginForm.username.value);
// 			        	     $("#siteId").val(data.body.siteId);
// 			        	     $("#mUserToken").val(data.body.userToken);
			        	     localStorage.siteId=data.body.siteId;
			        	     localStorage.userToken=data.body.userToken;
			        	     localStorage.loginUser=loginForm.username.value;
			        	     $afterLoginFrm.submit();
							
			        	}else{
			        		try{
			        			if(checkIos == "ios"){
									var message ={message : "로그인에 실패하였습니다."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message);
			        			}else{
				        			window.LexaApp.showToast("로그인에 실패하였습니다.");
			        			}
			        		}catch(e) {
				        		alert("로그인에 실패하였습니다.");
			        		}
			        	}
			        	
			        }
				});// end of ajax
				
				
				
			})// end of click
			
			$("#btn_worker").click(function(){
				window.location.href="/mobile/home.do?type=worker";
			})// end of click
			
			
			if(checkIos == "android"){
				var running = window.LexaApp.runningService();
				if(running){
					runningService('Y');
				}else{
					runningService('N');
				}
			}
			else if (checkIos == "ios"){
				// 2021-04-11 YSHONG
				// IOS 는 android 와 다르게 위처럼 return 받을 수 없다고 한다.
				// OS 14.2 버전 이후부터만 가능하며 따라서 아래 함수를 호출하면  native 소스안에서 javascript:runningService() 함수를 호출하는 방식을 택했다.  
				window.webkit.messageHandlers.runningService.postMessage();
			}
			
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

<body class="hold-transition login-page">
	<div class="login-box">
		<div class="login-logo">
			<h2 style="margin-top: 20%;margin-bottom: 30px;height: 200px; background: url(../img/logo_construction.png) no-repeat center;"></h2>
		</div>
		<!-- /.login-logo -->
		
		<div class="login-box-body">
			<form name="loginForm" action="mcheckUser.do" method="POST">
				<div class="form-group has-feedback">
					<input id="username" class="form-control-login" name="username" modifier="underbar" placeholder="ID"/>
				</div>
				
				<div class="form-group has-feedback">
					<input id="password" class="form-control-login" name="password" type="password" modifier="underbar" placeholder="Password" />
				</div>
				
				<div class="form-group has-feedback">
					<input type="checkbox" name="idSaveCheck" id="idSaveCheck" checked="checked"/>
					<label for="idSaveCheck">아이디 저장하기</label>
				</div>
				
				<div class="form-group has-feedback" hidden="true">
					<input type="checkbox" name="autoLoginCheck" id="autoLoginCheck" checked="checked"/> <label for="autoLoginCheck">다음부터 자동 로그인</label>
				</div>
			</form>
			
			<p></p>
			<button class="btn btn-primary btn-block btn-flat-login" id="btn_sign">로그인</button>
			<p></p>
			<button class="btn btn-login-w btn-block btn-flat-login" id="btn_worker">작업자 로그인</button>
			
			<form name="loginSuccess" id="loginSuccess">
	  			<input type="hidden"  name="siteId" id="siteId">
	  			<input type="hidden"  name="mLoginUser" id="mLoginUser">
	  			<input type="hidden"  name="mUserToken" id="mUserToken">
	  			<input type="hidden"  name="todo" id="todo">
	  			<input type="hidden"  name="ptwReqId" id="ptwReqId">
	  			<input type="hidden"  name="ptwMode" id="ptwMode">
	  			<input type="hidden"  name="side_bar_type" id="side_bar_type">
 				<sec:csrfInput/>
			</form>
				
  		</div>
  		<div id="runningService" style="display:none; margin:auto; margin-top:20px; text-align: center;">
  			<span style="color:red; width:100%;">Hi Smart에서 위치정보를 수집하는 중입니다.</span>
  		</div>
	</div>
</body>
</html>
