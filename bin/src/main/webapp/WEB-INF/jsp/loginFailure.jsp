<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="google" content="notranslate" />
<title>Hi SmartConstruction!</title> 
<link rel="stylesheet" type="text/css" href="css/login.css" />
<%-- <spring:theme code="localization.javascript"/> --%>
    <style type="text/css">
        .msg {
            font-size: 14px; font-wieght:bold;
            margin: 0; line-height:1.3em; color:#555;
        }
        .detail {
        	width : 310px;
        	word-break: break-all;
        }
    </style>
	<script type="text/javascript">
		setTimeout(function(){
			redirectPage();
		}, 3000);
		
		function redirectPage(){
			// document.referrer 이 존재하고, loginFailure.do 를 통한 호출이 되었을 경우에만 이전 요청 url 로 redirect 한다.
			if(document.referrer && (window.location.pathname.indexOf("loginFailure.do") > -1) ){
				top.location.href = document.referrer;
			} else {
    			top.location.href = 'login.do';
			}
		}
	</script>
</head>

<body class="messageWrap">
	<div class="container">
	    <div class="header">
	    	<span class="logo">Hi SmartConstruction!</span>
	    </div>
	    <div class="section">
	    	<div class="subject2"><b>로그인에 실패하였습니다.</b></div>
	    	<p class="explan2">${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}</p>
	    	<p class="hr"></p>
	    	<p class="commt"><b>3초 후</b>에 로그인 페이지로 이동합니다.</p>
	    	<p class="btn_cnt"><input class="btn_bg_msg" type="button" value="로그인 페이지 이동" onclick="redirectPage()"/></p>
	    </div>
	 </div>
</body>
</html>