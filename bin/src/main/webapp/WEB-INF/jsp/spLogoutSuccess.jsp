<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="google" content="notranslate" />
<title>Hi SmartConstruction!</title>
<link rel="stylesheet" type="text/css" href="../css/login.css" />

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
			top.location.href='spLogin.do';
		}
		
	</script>

</head>
<body class="bg_login02">
	<div class="wrap">
        <div class="container02">
            <div class="contents" style="border:0;">
                <header title="Smartsuite 9.1 ｜ Purchase & Supply Management Solutions">
              </header>
                <section class="wrap_form">
                    <p>정상적으로 로그아웃 되었습니다.<br />
                    <b>3초 후</b>에 로그인 페이지로 이동합니다.
                    </p>
                </section>
                <input class="btn_login" type="button" value="로그인 페이지 이동" onclick="redirectPage()"/>
            </div>
            <footer>
                <div>&copy;&nbsp;emro All Rights Reserved</div>
            </footer>
        </div>
    </div>
</body>
</html>