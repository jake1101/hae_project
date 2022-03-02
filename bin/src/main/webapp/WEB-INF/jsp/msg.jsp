<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
	<script src="/resources/js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript">
		
		try{
			window.LexaApp.showToast("${msg}");			
		}catch(e){
			alert("${msg}")
		}
		location.href = "${loc}"; //자바 스크립트에서 페이지 이동
	</script>
</html>