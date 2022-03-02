<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="google" content="notranslate" />
	<meta name="${_passwordSaltSource.name}" salt="${_passwordSaltSource.salt}" iteration="${_passwordSaltSource.iterationCount}"/>
	
	<title>Hi SmartConstruction!</title>
	<link rel="stylesheet" type="text/css" href="css/login.css" />
	<link rel="shortcut icon" href="img/favicon_icon.png" type="image/x-icon" />
	
	<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/logo.js"></script>
    <script type="text/javascript" src="bower_components/crypto-js/crypto-js.js"></script>
    <script type="text/javascript" src="bower_components/password-encryptor/password-encryptor.min.js"></script>
    <script src="js/js-image-slider.js" type="text/javascript"></script>
    <style type="text/css">
        .bgLayer{
        	background-size: cover;
        }
    </style>
    
    <script type="text/javascript">
    	function login() {
    		// 아이디 저장을 체크 하였을때
			if (document.loginForm.id_save.checked == true) { 
	            setCookie("id", document.loginForm.loginid1.value, 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
	            
	        // 아이디 저장을 체크 하지 않았을때
	        } else { 
	            setCookie("id", document.loginForm.loginid1.value, 0); //날짜를 0으로 저장하여 쿠키삭제
	        }
    		
    		document.loginForm.password.value = PasswordEncryptor.encryptpw(document.loginForm.password.value);
    		document.loginForm.submit();	
    	}
    	function findPw() {
    		var option = "width=350, height=180, resizable=no, scrollbars=no, status=no;" 
    		window.open("portal/bp/login/findPassword.do", "findPassword" ,option);
    	}
    	function keyPress(){
    		if(event.keyCode == "13"){
    			login();
    		}
    	}
    	function initPwByUserInfo() {
		    if(!document.userForm.popname.value || !document.userForm.popemail.value) {
		    	alert("이름과 이메일을 입력하십시오.");
		    	return;
		    }
			
			document.userForm.action = "initPassword.do";
			document.userForm.method = "post"
			document.userForm.submit();
		}
    	function initPwByUserInfo2() {
		    if(!document.userForm2.popname.value || !document.userForm2.popemail.value) {
		    	alert("아이디와 이메일을 입력하십시오.");
		    	return;
		    }
			
			document.userForm2.action = "initPassword2.do";
			document.userForm2.method = "post"
			document.userForm2.submit();
		}
    	
    	//onload 함수
		if(window.addEventListener) {	//IE 9+
			window.addEventListener("load", init, false);
		} else if(window.attachEvent) {	//Low IE
			window.attachEvent("onload", init);
		} else {	//etc 
			window.onload = init;
		}
		
		function init() {
			var id = getCookie("id");
			
			// getCookie함수로 id라는 이름의 쿠키를 불러와서 있을경우
	        if(id) { 
	            document.loginForm.loginid1.value = id; //input 이름이 id인곳에 getCookie("id")값을 넣어줌
	            document.loginForm.id_save.checked = true; // 체크는 체크됨으로
	        }
	    }
		
		// 쿠키 불러오는 함수
		function getCookie(name) { 
	        var search = name + "=";
	        
	        if (document.cookie.length > 0) { // if there are any cookies
	            var offset = document.cookie.indexOf(search);
	        
	            if (offset != -1) { // if cookie exists
	                offset += search.length; // set index of beginning of value
	                end = document.cookie.indexOf(";", offset); // set index of end of cookie value
	                
	                if(end == -1){
	                	end = document.cookie.length;
	                }
	                
	                return unescape(document.cookie.substring(offset, end));
	            }
	        }
	    }
		
		// 쿠키 저장함수
		function setCookie(name, value, expiredays){
	        var todayDate = new Date();
	        todayDate.setDate(todayDate.getDate() + expiredays);
	        
	        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	    }
		
    	$(function(){
			$('.findPW').click(function(){
		        var $href = $(this).attr('href');
		        layer_popup($href);
			    });
		    	function layer_popup(el){
		        var $el = $(el);        //레이어의 id를 $el 변수에 저장
		        var $elWidth = ~~($el.outerWidth()),
		            $elHeight = ~~($el.outerHeight()),
		            docWidth = $(document).width(),
		            docHeight = $(document).height();
		            // 화면의 중앙에 레이어를 띄운다.
		        if ($elHeight < docHeight || $elWidth < docWidth) {
		            $el.css({
		                marginTop: -$elHeight /2,
		                marginLeft: -$elWidth/2
		            })
		        } else {
		            $el.css({top: 0, left: 0});
		        }
		        
		        $el.fadeIn()

		        $el.find('a.popClose').click(function(){
		            $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		            return false;
		        });
		    };
		});
    </script>
</head>
<body class="bg_login" onload="document.loginForm.username.focus();">
	<div class="loginWrap">
		<h2>Hi SmartConstruction!</h2>	
		<div class="content">
			<div class="visual">
				<p><b>Hi SmartConstruction!</b></p>
				<div id="sliderFrame">
			        <div id="slider">
			            <img src="img/bg_01.png";/>
			            <img src="img/bg_02.png";/>
						<img src="img/bg_03.png";/>
						<img src="img/bg_04.png";/>
			            <img src="img/bg_05.png";/>
			        </div>
			    </div>
			</div>
			<div class="loginbox">
				<h4>LOGIN</h4>
				<form name="loginForm" action="<c:url value="/loginProcess.do" />" method="POST">
					<p class="loginform">
						<input type="text" name="username" id="loginid1" placeholder="ID" onchange="this.value=this.value.toUpperCase();">
						<input type="password" name="password" id="password" placeholder="Password" onkeypress="keyPress();">
						<select id="locale" name="locale">
	<!-- 						<option value="Local">Locale</option> -->
				            <option value="ko_KR">Korean</option>
				            <option value="en_US">English</option>
<!-- 				            <option value="zh_CN">Chinese</option> -->
<!-- 				            <option value="ja_JP">Japaneses</option> -->
				        </select>
				        <select id="locale" name="timezone">
	<!-- 			          	<option value="Timezone">Timezone</option> -->
				            <option value="krtime">Korea(GMT+9:00)</option>
				        </select> 
				        <select id="tenant" name="tenant" hidden>
		                	<option value="EMRO">EMRO</option>
	                   	</select>
					</p>
					<p class="option">
						<span class="saveid"><input type="checkbox" id="id_save"><label for="saveid">아이디 저장</label></span>
						<a href="#layerPopup2" class="findPW" style="background: none; padding-left: 5px;">비밀번호 찾기</a>
						<a href="#layerPopup" class="findPW">아이디 / </a>
					</p>
					<a href="javascript:login();" class="loginbtn"><span>로그인</span></a>
	<!-- 				<input value="로그인" class="loginbtn" type="button" alt="Login" onclick="login();"/> -->
	                <sec:csrfInput/>
				</form>
				<pre class="commt"> 
				</pre>
			</div>
		</div>
		<p class="copyright">COPYRIGHT 2022 AutoEver Corporation. ALL RIGHT RESERVED.</p>
		<!-- 비밀번호 찾기 레이어 팝업 //-->
		<div id="layerPopup" class="popLayer">
		    <div class="popContainer">
		        <div class="popHeader">
		        	<h3>아이디 찾기</h3>
		        	<a href="" class="popClose"></a>
		        </div>
		         <div class="popConts">
			         <form name="userForm">
						<div class="mini_content popForm" data-item="1">
							<ul>
								<li><label for="popname"><span class="id_txt">이름</span></label><input type="text" name="username" id="popname" onchange="this.value=this.value.toUpperCase();" onkeypress="if(event.keyCode==13){ initPwByUserInfo(); return false;}"/></li>
								<li><label for="popemail"><span class="id_txt">E-Mail</span></label><input type="text" name="email" id="popemail" onkeypress="if(event.keyCode==13){ initPwByUserInfo(); return false;}"/></li>
							</ul>
						</div>
						<sec:csrfInput/>
					</form>
						         
		         	<a href="javascript:initPwByUserInfo()" class="popBtn">확인</a>
		        </div>
		    </div>
		</div>
		<!-- // 비밀번호 찾기 레이어 팝업 -->
		
		<!-- 아이디 찾기 레이어 팝업 -->
		<div id="layerPopup2" class="popLayer">
		    <div class="popContainer">
		        <div class="popHeader">
		        	<h3>비밀번호 찾기</h3>
		        	<a href="" class="popClose"></a>
		        </div>
		         <div class="popConts">
			         <form name="userForm2">
						<div class="mini_content popForm" data-item="1">
							<ul>
								<li><label for="popname"><span class="id_txt">아이디</span></label><input type="text" name="username" id="popname" onchange="this.value=this.value.toUpperCase();" onkeypress="if(event.keyCode==13){ initPwByUserInfo2(); return false;}"/></li>
								<li><label for="popemail"><span class="id_txt">E-Mail</span></label><input type="text" name="email" id="popemail" onkeypress="if(event.keyCode==13){ initPwByUserInfo2(); return false;}"/></li>
							</ul>
						</div>
						<sec:csrfInput/>
					</form>
						         
		         	<a href="javascript:initPwByUserInfo2()" class="popBtn">확인</a>
		        </div>
		    </div>
		</div>
		<!-- // 비밀번호 찾기 레이어 팝업 -->
	</div>
</body>
</html>