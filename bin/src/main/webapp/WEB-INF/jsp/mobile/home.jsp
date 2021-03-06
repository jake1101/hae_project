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
			   //??????????????? ??????
		   }
			
		 }
		
		function checkMobile(){
			 
		    var varUA = navigator.userAgent.toLowerCase(); //userAgent ??? ??????
		 
		    if ( varUA.indexOf('android') > -1) {
		        //???????????????
		        return "android";
		    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
		        //IOS
		        return "ios";
		    } else {
		        //?????????, ??????????????? ???
		        return "other";
		    }
		    
		}

		     
		$(document).ready(function(){
			
			// ?????? ????????? ?????? 	
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
					
					//api??????
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
			        				
			        				var message2 = { message: "??????????????? ???????????????. ????????? ???????????? ???????????? ????????????" };

			        				window.webkit.messageHandlers.showToast.postMessage(message2);
			    				}else{
			        				window.LexaApp.setLoginInfo('system', userId , userToken, true);
// 			        			 window.LexaApp.showToast("??????????????? ???????????????. ????????? ???????????? ???????????? ????????????");
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
					
					
					//window.IotApp.showToast("??????????????? ???????????????. ????????? ????????? ?????? ???????????? ??? ?????? ????????? ????????? ????????????. ");
				}catch(e){
					
				}
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
			        				
			        				var message2 ={message : "????????? ???????????????."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message2);
			    				}else{
// 			        			window.IotApp.setLoginInfo(loginForm.username.value,  autoLogin);
			        			window.LexaApp.setLoginInfo('system', loginForm.username.value, data.body.userToken, autoLogin);
// 			        			window.IotApp.showToast("????????? ???????????????.");
			        			 window.LexaApp.showToast("????????? ???????????????.");
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
									var message ={message : "???????????? ?????????????????????."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message);
			        			}else{
				        			window.LexaApp.showToast("???????????? ?????????????????????.");
			        			}
			        		}catch(e) {
				        		alert("???????????? ?????????????????????.");
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
				// IOS ??? android ??? ????????? ????????? return ?????? ??? ????????? ??????.
				// OS 14.2 ?????? ??????????????? ???????????? ????????? ?????? ????????? ????????????  native ??????????????? javascript:runningService() ????????? ???????????? ????????? ?????????.  
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
					<label for="idSaveCheck">????????? ????????????</label>
				</div>
				
				<div class="form-group has-feedback" hidden="true">
					<input type="checkbox" name="autoLoginCheck" id="autoLoginCheck" checked="checked"/> <label for="autoLoginCheck">???????????? ?????? ?????????</label>
				</div>
			</form>
			
			<p></p>
			<button class="btn btn-primary btn-block btn-flat-login" id="btn_sign">?????????</button>
			<p></p>
			<button class="btn btn-login-w btn-block btn-flat-login" id="btn_worker">????????? ?????????</button>
			
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
  			<span style="color:red; width:100%;">Hi Smart?????? ??????????????? ???????????? ????????????.</span>
  		</div>
	</div>
</body>
</html>
