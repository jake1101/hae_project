<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Cache-control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0"/>
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes">
    <title>Hi SmartConstruction!</title>
    <sec:csrfMetaTags />
    
    <link rel="stylesheet" type="text/css" href="bower_components/sc-component/sc-elements.std.css">
    <link rel="stylesheet" type="text/css" href="ui/assets/css/common.css"/>
        
    <style type="text/css">
        html,body {
            height: 100%;
        }
        
        body {
            margin : 0;
            padding: 0;
            border: 0 none;
            overflow: hidden;
            height: 100%;
            position: static;
        }
    </style>
    <script>
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
	    		//cc-module-behavior 모듈 로드 완료 이벤트 설정
	    		ccModuleBehaviorReady : true
	    	};
	    
	    var ccModuleBehaviorHandler = function(e){
			document.removeEventListener('ccModuleBehaviorReady', ccModuleBehaviorHandler);
			
			Polymer.Base.importLink('ui/sp/esourcing/vendorInfoMgt/ep-sp-vendor-profile-popup.html', function(moduleId) {
				var module = document.createElement(moduleId);
	            Polymer.dom(document.body).appendChild(module);
	            Polymer.dom.flush();
	            
			});
		}
		document.addEventListener('ccModuleBehaviorReady', ccModuleBehaviorHandler);
		
		// grid 2.1.7 이전 버전일 경우 grid 초기화 시 sc-session-manager참조가 필수 이기 때문에 임의 구현하였습니다.
		// 해당 이후 버전일 경우 하위 로직 삭제하여도 됩니다.
		SCSessionManager = new(function() {
			function SessionManagerImpl() {
		  		this.userDetails = {
					userInfo : {usr_id : "GUEST"}
		  		};
		  	}
		  	
		  	SessionManagerImpl.prototype.getCurrentUser = function() {
			  	return this.userDetails.userInfo;
		  	};
		  	
		  	return SessionManagerImpl;
		}());
		
	    document.addEventListener("close", function() {
	    	if(window.fire){
	    		window.fire("close");
	    	}else{
	    		window.close();
	    	}
	    });
    </script>
    <script src="/bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
</head>
<body>
	<div class="top_progress"></div>
	<script src="license.do"></script>
	<link rel="import" href="bower_components/sc-component/sc-elements.std.html">
	<link rel="import" href="ui/override.html">
	<link rel="import" href="ui/lib/preloader/sc-preloader.html" locale="${pageContext.response.locale}">
</body>
</html>