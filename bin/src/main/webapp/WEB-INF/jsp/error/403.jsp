<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="google" content="notranslate" />
<title>Hi SmartConstruction!</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/login.css" />
<%-- <spring:theme code="localization.javascript"/> --%>

    <style type="text/css">
        .msg {
            font-size: 15px;
            font-weight: bold;
            margin: 20px 0;
        }
    </style>
    
	<script type="text/javascript">
	
		setTimeout(function(){
			redirectPage();
		}, 3000);
		function redirectPage(){
			location.href='/login.do';
		}
		
	</script>

</head>
<body class="messageWrap">
	<div class="container2">
	    <div class="header">
	    	<span class="logo">Hi SmartConstruction!</span>
		</div>
	    <div class="section">
	    	<div class="subject" style="width:330px !important"><b>403</b><span>에러<br/>For Bidden</span></div>
	    	<p class="explan" style="width:350px !important">요청하신 페이지 접근이 거부 되었습니다. <br/>
	    		The server understood the request, but refuses to authorize it.</p>
	    	<p class="hr2"></p>
	    	<p class="commt"><b>3초 후</b>에 로그인 페이지로 이동합니다.</p>
	    	<p class="btn_cnt"><input class="btn_bg_msg" type="button" value="로그인 페이지 이동" onclick="redirectPage()"/></p>
	    </div>
	</div>
</body>
</html>