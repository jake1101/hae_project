<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="google" content="notranslate" />
	<title>Hi SmartConstruction!</title>

	<link rel="stylesheet" type="text/css" href="/css/popup/find_popup.css" />
	
	<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
	<script src="/ui/lib/custom/js/serverConfig.js"></script>
	
	<script type="text/javascript">
		var userId = "${result_data}";
		
		if(userId){
			$.ajax({
				type:'post',
				url : conf.raycomApiUrl + "users/upsert/log",
		        dataType: "json",
		        data : JSON.stringify({operation: "update", id: userId}),
		        timeout: 3000,
		        beforeSend : function(xhr){
		            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		            xhr.setRequestHeader("userToken", "zzzZ");
		        },
		        success: function(data) {
		        	setTimeout(function(){
		    			redirectPage();
		    		}, 5000);
		    		function redirectPage(){
		    			location.href='/login.do';
		    		}
		        }
			});// end of ajax
		}else{
			setTimeout(function(){
    			redirectPage();
    		}, 5000);
    		function redirectPage(){
    			location.href='/login.do';
    		}
		}
		
	</script>
	
</head>

<body>
	<div id="wrap">
	
	<div class="mini_box">
		<div class="mini_table" data-item="1">
			<div class="mini_cell">
				<div class="medium_txt">이메일 주소로 아이디 또는 임시 패스워드를 발송 하였습니다.</div>
				<br/>
	    		<p class="medium_txt"><b>5초 후</b>에 로그인 페이지로 이동합니다.</p>
			</div>
		</div>
	</div>
	</div>
</body>

</html>