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
    <link rel="stylesheet" type="text/css" href="bower_components/sc-component/sc-elements.std.css">
    <link rel="stylesheet" type="text/css" href="ui/lib/mdi/css/mdi.css"/>
    <link rel="stylesheet" type="text/css" href="ui/assets/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="ui/assets/css/search.css"/>
    <!-- <link rel="Stylesheet" type="text/css" href="ui/lib/colorPicker/css/light.min.css" /> -->
    <!-- customization:20191119 ch.byeon -->
    <link rel="stylesheet" type="text/css" href="css/custom.css"/>
    <!-- icon -->
    <link href="../css/remixicon.css" rel="stylesheet">
    <link rel="shortcut icon" href="ui/lib/mdi/img/favicon_icon.png" type="image/x-icon" />

    <style type="text/css">
    	/* 
	  		yshong (2021-05-21)
	 		 http://alm.emro.co.kr/browse/SMARTNINE-4947?jql=text%20~%20%22adobe%22
	 		  위 내용을 참고함.
	 	 	 Adobe Flash Player 지원종료와 관련하여 메모리 체크로직을 제거한다.
        #MemoryCheckSWF {
			position: absolute !important;
			height : 0px !important;
			width : 0px !important;
		}
		*/
    </style>
<%--     <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${_kakaoMapAppkey}&libraries=services,clusterer,drawing"></script> --%>


	<!-- 
	  yshong (2021-05-21)
	 	http://alm.emro.co.kr/browse/SMARTNINE-4947?jql=text%20~%20%22adobe%22
	 	위 내용을 참고함.
	 	Adobe Flash Player 지원종료와 관련하여 메모리 체크로직을 제거한다.
    <script src="ui/lib/memory/swfobject.js"></script>
    <script src="ui/lib/memory/polymer-memorycheck.js"></script>
    -->
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
    	window.isSso = ('${isSso}' === "true") ? true: false; 
		window.useErrorUserMessage = ('${useErrorUserMessage}' === "true") ? true: false; //에러 발생 시 사용자가 에러 정보를 입력하도록 할 것인지
		
		
		/*
		  yshong (2021-05-21)
		 	http://alm.emro.co.kr/browse/SMARTNINE-4947?jql=text%20~%20%22adobe%22
		 	위 내용을 참고함.
		 	Adobe Flash Player 지원종료와 관련하여 메모리 체크로직을 제거한다.
		 */
		/*
		document.addEventListener('mdi-initialized', function(e) {
			var mdi = document.querySelector('sc-mdi');
			//메모리 체크 로직 추가부분 시작
			//http://alm.emro.co.kr/browse/NFCH-502
			if(window.MEMORY_LIMIT_ACTIVATED === true){
				// 메뉴 클릭 시, 발생하는 이벤트(메뉴 클릭 시 메모리 체크)
				mdi.addEventListener('window-created', function(){
					setTimeout(function(){
						try{
							document.getElementById("MemoryCheckSWF").getPrivateMemory();	
						}catch(e){console.log(e)};	
					},1000);
				});
				
				mdi = null;
			}
			//메모리 체크 로직 추가부분 끝
			document.removeEventListener('mdi-initialized', arguments.callee);
		});
		*/
  	</script>
  	<script src="bower_components/webcomponentsjs/webcomponents-standard.min.js"></script>
	<script>
		if(HTMLImports.isIE) {
	  		CollectGarbage();
		}
  	</script>
  	<script src="license.do"></script>
  	
  	
</head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9BTXTWWWPG"></script>
<script>
	if("https://sc.hismart.co.kr"==window.location.origin){
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-9BTXTWWWPG');
	}
</script>


<body>
	<div class="top_progress"></div>
	<!-- logout form -->
	<form id="logoutForm" action="<c:url value="/logoutProcess.do" />" method="POST" hidden>
		<sec:csrfInput/>
	</form>
	<script type="text/javascript">
		document.addEventListener('keydown',function(e){
			var ele = e.srcElement ? e.srcElement : e.target,
				rx = /INPUT|SELECT|TEXTAREA/i,
			    k = e.which || e.keyCode;
			if((!ele.type || !rx.test(e.target.tagName)|| (ele.readOnly || ele.disabled )) && ["true", ""].indexOf(ele.getAttribute("contenteditable")) === -1 ) {
	 	    	if(k == 8){
	 	    		e.preventDefault();
	 	     	}
	 	     }
		},true);
	</script>
	
	<!-- mdi 태그 선언 -->
	<sc-mdi id="mdiMain"></sc-mdi>
	<link rel="import" href="bower_components/sc-component/sc-elements.std.html">
	<link rel="import" href="ui/override.html">
  	<link rel="import" href="ui/lib/preloader/sc-preloader.html" locale="${pageContext.response.locale.language}_${pageContext.response.locale.country}" portal-type="${_portalType}">
	<link rel="import" href="ui/lib/mdi/sc-mdi.html">
	<link rel="import" href="ui/lib/browser/browser-error.html">
</body>
</html>