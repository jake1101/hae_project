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
    
    <link rel="stylesheet" type="text/css" href="bower_components/sc-component/sc-elements.std.css">
    <link rel="stylesheet" type="text/css" href="ui/assets/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="css/custom.css"/>
    
    <style type="text/css">
		#notice_container{
			margin:10px;
			height:95%
		}
	</style>
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
    		//cc-module-behavior 모듈 로드 완료 이벤트 설정
    		ccModuleBehaviorReady : true
    		
    	};
    	
    	document.addEventListener('keydown',function(e){
			var ele = e.srcElement ? e.srcElement : e.target,
				rx = /INPUT|SELECT|TEXTAREA/i,
			    k = e.which || e.keyCode;
			if(!ele.type || !rx.test(e.target.tagName)|| (ele.readOnly || ele.disabled )) {
	 	    	if(k == 8){
	 	    		e.preventDefault();
	 	     	}
	 	     }
		},true);
    	
    	// 게시판 화면은 list, detail 화면이 lazy 동작으로 수행되므로 cc-module-behavior 가 필수 로딩 되어야 정상 동작합니다.
    	// 따라서 importLink 시점을 cc-module-behavior 가 로딩 된 시점 이후에 수행합니다.
    	// (ccModuleBehaviorReady 가 `true` 일 경우에만 `ccModuleBehaviorReady` 이벤트를 dispatch 합니다.)
    	var ccModuleBehaviorHandler = function(e){
			document.removeEventListener('ccModuleBehaviorReady', ccModuleBehaviorHandler);
			
			// 현장 아이디 세팅
			SCMdiManager.searchParam.site_id = "${siteId}";
// 			SCMdiManager.currentUser.usr_id = "${userId}";  // atob ? 뭐 이딴거 해야함!!!! 2020-10-06
			
			Polymer.Base.importLink('ui/iot/input/es-worker-list-link.html', function(moduleId) {
// 				console.log("########## " + SCMdiManager.searchParam.site_id);
				
				var module = document.createElement(moduleId);
				var params = {
						siteId : "${siteId}"
				};
				module.params = params;
	            Polymer.dom(document.querySelector('#notice_container')).appendChild(module);
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
    	
		SCMdiManager = new(function() {
			function MdiManagerImpl() {
				// RAYCOM 추가
				this.searchParam = {};
				this.currentUser = {};
			};
			
			MdiManagerImpl.prototype.getCurrentMenuId = function(element) {
				return "";
			};
			
			MdiManagerImpl.prototype.doSessionTimer = function() {
				return "";
			};
			
			return MdiManagerImpl;
		}());
		
		SCRoleManager = new(function() {
			function RoleManagerImpl() {
			};
			
			RoleManagerImpl.prototype.getUserFuncs = function(menuCd) {
				// userRole array 에서 menu_cd 별 func_cd 를 조회, array 에 담아서 리턴
				var funcs = [];
				
				return funcs;
			};	 
			
			return RoleManagerImpl;
		}());
  	</script>
  	<script src="bower_components/webcomponentsjs/webcomponents-standard.min.js"></script>
  	
</head>
<body>
	<div class="top_progress"></div>
	<script src="license.do"></script>
	<div id="notice_container"></div>
	<link rel="import" href="bower_components/sc-component/sc-elements.std.html">
    <link rel="import" href="ui/override.html">
    <link rel="import" href="ui/lib/preloader/sc-preloader.html" locale="${pageContext.response.locale}">
</body>
</html>