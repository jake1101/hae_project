<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="google" content="notranslate" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>Hi SmartConstruction! Login</title>

	<link rel="stylesheet" type="text/css" href="/css/popup/find_popup.css" />
</head>

<body>
	<div id="wrap">
	
	<div class="sel_box">
		<ul class="sel_list_3">
			<li class="active" data-item="1"><a class="menu_link">등록 정보로 찾기</a></li>
			<!-- <li class="" data-item="2"><a class="menu_link">휴대폰 정보로 찾기</a></li> -->
			<!-- <li class="" data-item="3"><a class="menu_link">아이핀 인증으로 찾기</a></li> -->
		</ul>
		<form name="userForm" >
		<div class="sel_content" data-item="1">
			<p class="help_txt">가입시 등록한 이메일주소로 임시 패스워드가 전송됩니다.<br>메일 주소를 입력하세요.</p>
			<ul>
				<li><span class="id_txt">아이디</span><input type="text" name="username" onchange="this.value=this.value.toUpperCase();" onkeypress="if(event.keyCode==13){ initPwByUserInfo(); return false;}"/></li>
				<li><span class="id_txt">이메일</span><input type="text" name="email" onkeypress="if(event.keyCode==13){ initPwByUserInfo(); return false;}"/></li>
			</ul>
			<div class="base_btn"><a href="javascript:initPwByUserInfo()">확인</a></div>
		</div>
		<sec:csrfInput/>
		</form>
		
		<form name="phoneForm" action="" method="post">
		<div class="sel_content" data-item="2" hidden="hidden">
			<p class="help_txt">휴대폰 정보로 찾기입니다.<br>가입할 때 등록하신 아이디를 입력하세요.</p>
			<ul>
				<li><span class="id_txt">이름</span><input type="text" onchange="this.value=this.value.toUpperCase();"/></li>
				<li><span class="id_txt">아이디</span><input type="text" onchange="this.value=this.value.toUpperCase();"/></li>
			</ul>
			<div class="base_btn"><a href="">휴대폰 인증</a></div>
		</div>
		<sec:csrfInput/>
		</form>
		
		<form name="ipinForm" action="" method="post">
		<div class="sel_content" data-item="3" hidden="hidden">
			<p class="help_txt">아이핀(I-PIN) 정보로 찾기입니다.<br>가입할 때 등록하신 아이디를 입력하세요.</p>
			<ul>
				<li><span class="id_txt">이름</span><input type="text" onchange="this.value=this.value.toUpperCase();"/></li>
				<li><span class="id_txt">아이디</span><input type="text" onchange="this.value=this.value.toUpperCase();"/></li>
			</ul>
			<div class="base_btn"><a href="">아이핀 인증</a></div>
		</div>
		<sec:csrfInput/>
		</form>
	</div>
	</div>

	<script src="/bower_components/jquery/dist/jquery.min.js"></script>
	<script>
		(function () {
			/* document.userForm.username.focus(); */  //Init Focus(JavaScript)
			$('.sel_content').first().find('input').first().focus(); //Init Focus
		})() ;
		
		function initPwByUserInfo() {
		    if(!document.userForm.username.value || !document.userForm.email.value) {
		    	alert("아이디와 이메일을 입력하십시오.");
		    	return;
		    }  
			
			document.userForm.action = "initPassword.do";
			document.userForm.method = "post"
			document.userForm.submit();
		}
		
		//Select MENU 제어하기
		$('.sel_box > ul > li').click(function(){
			var item = $(this).attr('data-item');
			
			//Content 제어
			$('.sel_content').hide();
			$('.sel_content[data-item='+item+']').show();
			$('.sel_content[data-item='+item+']').find('input').first().focus();
			
			//MENU 제어
			$('.sel_box > ul > li').removeClass('active');
			$(this).addClass('active');
		});
	</script>
</body>

</html>