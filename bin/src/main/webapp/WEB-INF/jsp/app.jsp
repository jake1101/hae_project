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
    <meta name="${_passwordSaltSource.name}" salt="${_passwordSaltSource.salt}" iteration="${_passwordSaltSource.iterationCount}"/>
    <meta name="${_aesCipherKey.name}" passphrase="${_aesCipherKey.passPhrase}" key="${_aesCipherKey.key}" iteration="${_aesCipherKey.iterationCount}" iv="${_aesCipherKey.iv}">
    <title>Hi SmartConstruction!</title>
    <sec:csrfMetaTags />    
    <link rel="stylesheet" type="text/css" href="bower_components/sc-component/sc-elements.build.css">
    <link rel="stylesheet" type="text/css" href="ui/lib/mdi/css/mdi.css"/>
    <link rel="stylesheet" type="text/css" href="ui/assets/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="ui/assets/css/external-common.css"/>
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
    		useStripWhiteSpace : true
    	};
    	window.SESSIONTIMEOUT = Number('${pageContext.session.maxInactiveInterval}') * 1000;
  	</script>
  	<script src="bower_components/webcomponentsjs/webcomponents-standard.min.js"></script>
</head>
<body>
	<div class="top_progress"></div>
	<script src="license.do"></script>
	
	<!-- mdi 태그 선언 -->
	<sc-mdi id="mdiMain" use-single-page="true" use-storage-menu="false"></sc-mdi>
	
	<script type="text/javascript">
		var mdiMain = document.getElementById('mdiMain'),
			start = function() {
	        	var menuId = "${menuId}";
	        	
	        	if(mdiMain.mdiMainCompleted) {
        			var menuList = SCMdiManager.getMenuList();
		        	var windowUrl = "";
		        	var menuName = "";
		        	for (idx in menuList) {
	                    if (menuId == menuList[idx].menu_id) {
	                    	windowUrl = menuList[idx].menu_url;
	                   	 	menuName = menuList[idx].menu_nm;
	                    }
	                }	        	
        			if(windowUrl.indexOf('?') > -1){
        				importUrl = windowUrl.slice(0, windowUrl.indexOf('?'));	
        			}else{
        				importUrl = windowUrl;
        			}
       				mdiMain.$.mdiContent.createWindow(menuId, menuName, importUrl, false);	
	        		
	        	}
	        	
				if(window.CollectGarbage) {
					setInterval(function() {
						CollectGarbage();
				   	}, 60000);
		    	}
			};
		
		mdiMainCompletedHandler = function(e) {
			mdiMain.removeEventListener('mdi-manager-initialized', mdiMainCompletedHandler);
			mdiMain.mdiMainCompleted = true;
			start();
		};
		mdiMain.addEventListener('mdi-manager-initialized', mdiMainCompletedHandler);
		
		document.addEventListener('keydown',function(e){
			var ele = e.srcElement ? e.srcElement : e.target,
				rx = /INPUT|SELECT|TEXTAREA/i,
			    k = e.which || e.keyCode;
			if((!ele.type || !rx.test(e.target.tagName)|| (ele.readOnly || ele.disabled )) ["true", ""].indexOf(ele.getAttribute("contenteditable")) === -1 ) {
	 	    	if(k == 8){
	 	    		e.preventDefault();
	 	     	}
	 	     }
		},true);
	    
	</script>
	<link rel="import" href="bower_components/sc-component/sc-elements.std.html">
	<link rel="import" href="ui/override.html">
	<link rel="import" href="ui/lib/mdi/sc-mdi.html">
	<link rel="import" href="ui/lib/preloader/sc-preloader.html" locale="${pageContext.response.locale}">
</body>
</html>