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
	
	<div class="mini_box">
		<form name="userForm" >
			<div class="mini_content" data-item="1">
				<ul>
					<li><span class="id_txt">아이디</span><input type="text" name="username" onchange="this.value=this.value.toUpperCase();" onkeypress="if(event.keyCode==13){ initPwByUserInfo(); return false;}"/></li>
					<li><span class="id_txt">이메일</span><input type="text" name="email" onkeypress="if(event.keyCode==13){ initPwByUserInfo(); return false;}"/></li>
				</ul>
				<div class="base_btn"><a href="javascript:initPwByUserInfo()">확인</a></div>
			</div>
			<sec:csrfInput/>
		</form>
	</div>
	</div>

	<script>
		(function () {
			document.userForm.username.focus();  //Init Focus
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
	</script>
</body>

</html>