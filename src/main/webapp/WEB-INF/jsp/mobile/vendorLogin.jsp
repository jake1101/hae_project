<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
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
				
				var autoLogin = $("#autoLoginCheck").is(":checked");
				 
        		
        		var $afterLoginFrm = $("#loginSuccess");
	       	    
				var param = {"tag" : loginForm.tag.value , "serialNumber" : loginForm.serialNumber.value};
				var checkIos = checkMobile();
				$.ajax({
					type:'post',
					url : conf.raycomApiUrl+"users/vendor/login",
			        data : JSON.stringify(param),
			        dataType: "json",
			        
			        beforeSend : function(xhr){
			            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
			        },
			        success: function(data) {  
			        	if(data.header.code == 1){
			        		var autoLogin = $("#autoLoginCheck").is(":checked");
		        			 $afterLoginFrm.attr('action', '/mobile/registration.do');
		    	       	     $afterLoginFrm.attr('method', 'get');
		    	       	     $("#mLoginUser").val(data.body.id);
		    	       	     var key = {"siteId" : data.body.siteId, "vendorId":data.body.id};
		    	       	     $("#key").val(btoa(JSON.stringify(key)));
		    	       	     $("#type").val("worker_regist");
		    	       	     $afterLoginFrm.submit();
							
			        	}else{
			        		try{
			        			if(checkIos == "ios"){
									var message ={message :"로그인 실패하였습니다. 인증번호는 관리자에게 문의 하세요."};
			        				
	        						window.webkit.messageHandlers.showToast.postMessage(message);
			        			}else{
			        				window.LexaApp.showToast("로그인 실패하였습니다. 인증번호는 관리자에게 문의 하세요.");
			        			}
			        		}catch(e) {
				        		alert("로그인 실패하였습니다. 인증번호는 관리자에게 문의 하세요.");
			        		}
			        	}
			        	
			        }
				});
				
				
				
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


<body class="hold-transition login-page">
	    	
	<div class="login-box">
		<div class="login-vendor">
			<img src="../img/logo_vendor.png" alt="로고">
			<div class="work-login-title">Vendor 로그인</div>
		</div>
		<!-- /.login-logo -->
		
		<div class="login-box-body">
			<form name="loginForm" action="mcheckUser.do" method="POST">
				<div class="form-group has-feedback">
					<input id="tag" class="form-control-login" name="tag"  modifier="underbar" placeholder="인증번호"></input>
				</div>
			    <div class="form-group has-feedback">
					<input id="serialNumber" class="form-control-login" name="serialNumber"  modifier="underbar" placeholder="사업자등록번호"></input>
				</div>
<!-- 				<div class="form-group has-feedback"> -->
<!-- 					<input type="checkbox" name="autoLoginCheck" id="autoLoginCheck" checked="checked"/> <label for="autoLoginCheck">다음부터 자동 로그인</label> -->
<!-- 				</div> -->
			</form>
			
			<p></p>
	        <button class="btn btn-primary-blue btn-block btn-flat-login" id="btn_sign">로그인</button>
			
			<form name="loginSuccess" id="loginSuccess">
				<input type="hidden"  name="mLoginUser" id="mLoginUser">
				<input type="hidden"  name="type" id="type">
				<input type="hidden"  name="key" id="key">
				<sec:csrfInput/>
		  	</form>
		</div>
		
	</div>
	
</body>

</html>