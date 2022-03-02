<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="google" content="notranslate" />
<title>Hi SmartConstruction!</title>
<link rel="stylesheet" type="text/css" href="css/login.css" />

    <style type="text/css">
        .msg {
            font-size: 15px;
            font-weight: bold;
            margin: 20px 0;
        }
    </style>
    
    <script src="../../js/mobileUtil/mobile_util.js"></script>
	<script type="text/javascript">
	
		setTimeout(function(){
			redirectPage();
		}, 3000);
		function redirectPage(){
			var mobile = mobileUtil.checkMobile();
			if(mobile=="ios" ||  mobile=="android"){
				top.location.href = "mobile/home.do";
			}
			else{
				top.location.href='login.do';
			}
		}
		
	</script>

</head>
<body class="messageWrap">
	<div class="container2" style="height: 450px">
	    <div class="header">
	    	<span class="logo">Hi SmartConstruction!</span>
		</div>
	    <div class="section">
	    	<div class="subject3"><b>세션이 종료되었습니다.</b></div>
	    	<p class="hr"></p>
	    	<p class="commt"><b>3초 후</b>에 로그인 페이지로 이동합니다.</p>
	    	<p class="btn_cnt"><input class="btn_bg_msg" type="button" value="로그인 페이지 이동" onclick="redirectPage()"/></p>
	    </div>
	</div>
</body>
</html>