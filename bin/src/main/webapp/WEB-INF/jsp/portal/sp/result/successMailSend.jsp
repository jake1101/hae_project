<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="google" content="notranslate" />
	<title>Hi SmartConstruction! Login</title>

	<link rel="stylesheet" type="text/css" href="/css/popup/find_popup.css" />
</head>

<body>
	<div id="wrap">
	
	<div class="sel_box">
		<ul class="sel_list_1">
			<li class="active" data-item="1"><a class="menu_link">메일 전송 완료</a></li>
		</ul>
		<div class="sel_table" data-item="1">
			<div class="sel_cell">
				<div class="medium_txt">이메일 주소로 임시 패스워드가 발급되었습니다.<br>로그인 후 비밀번호를 재설정하십시오.</div>
	 		
				<div class="base_btn"><a id="close_btn" href="javascript:popupClose(this)">닫기</a></div>
			</div>
		</div>
	</div>
	</div>
	
	<script type="text/javascript" src="/js/main/login.js"></script>
</body>

</html>