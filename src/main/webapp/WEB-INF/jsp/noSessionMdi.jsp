<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Cache-control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0"/>
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes">
    <title>Hi SmartConstruction!</title>
    <sec:csrfMetaTags />    
    <link rel="stylesheet" type="text/css" href="bower_components/sc-component/sc-elements.build.css">
    <link rel="stylesheet" type="text/css" href="ui/lib/mdi/css/nosession-mdi.css"/>
    <link rel="stylesheet" type="text/css" href="ui/assets/css/common.css"/>
    <script type="text/javascript">
    	window.Polymer = {
   			//Polymer 엘리먼트 로드 완료 이벤트 설정
    		polymerReady : true,
    		//#다국어 처리 프로세서 비활성화
    		useI18nParser : false,
    		//캐시 버스트
    		cacheBust : ('${_cacheBust}' || Date.now()),
    		//lazy loader 활성화
    		useLazyLoader : true,
    		//lazy register 활성화
    		useLazyRegister : true,
    		//true 값이면 윈도우 숨김처리시 document.body 에서 윈도우 엘리먼트가 자동으로 제거
    		detachedOnSCWindowHided : false,
    		//소스 내 whitespace를 지워주는 기능 할성화
    		useStripWhiteSpace : true,
    		
    	};
  	</script>
  	<script src="bower_components/webcomponentsjs/webcomponents-standard.min.js"></script>
</head>
<body>
	<div class="top_progress"></div>
	<sc-nosession-mdi id="mdiMain"></sc-nosession-mdi>
	<link rel="import" href="bower_components/sc-component/sc-elements.std.html">
	<link rel="import" href="ui/override.html">
	<link rel="import" href="ui/lib/preloader/sc-preloader.html" locale="${pageContext.response.locale}">
	<link rel="import" href="ui/lib/mdi/sc-nosession-mdi.html">
	
	<script type="text/javascript">
	
		SCSessionManager = new(function() {
			function SessionManagerImpl() {
		  		this.userDetails = {
		  		};
		  	}
		  	
		  	SessionManagerImpl.prototype.getCurrentUser = function() {
			  	return this.userDetails.userInfo;
		  	};
		  	
		  	return SessionManagerImpl;
		}());
	
	</script>
</body>
</html>