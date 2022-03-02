


var CCWEBInstall = function(customObj){
	// OS
	var OSTYPE_WIN32					= "Win32";
	var OSTYPE_WIN64					= "Win64";
	var OSTYPE_MAC						= "MAC";
	var OSTYPE_UNKNOWN                  = "Unknown";
	var Client_OS						= "Win32";
	
	// OS version
	var VestCert_MAC_Version 			= "2.5.5.0";
	var VestCert_WIN_Version 			= "2.5.5.0";
	
	// OS package
	var VestCert_MAC_PKG 				= 'VestCertSetup.dmg';
	var VestCert_WIN_PKG 				= 'VestCertSetup.exe';			
	
	// default는 windows. GetClientOS 이후 OS에 맞는 버전과 package명 설정
	var VestCert_PKG = VestCert_WIN_PKG;
	var lastestVersion = VestCert_WIN_Version;
	
	pluginConfig = '';
	if (Client_OS == OSTYPE_WIN32 || Client_OS == OSTYPE_WIN64)	{ // windows
		pluginConfig = {
				"using": customObj.options.pluginConfig,
				"name" : "Q0NYbWxOb3JtYWxpemVyLmRsbA==",  // CCXmlNormalizer.dll
				"version" : "1.0.1.0"
		};
	}
	else if (Client_OS == OSTYPE_MAC)	{  // mac
		pluginConfig = {
				"using": customObj.options.pluginConfig,
				"name" : "L0FwcGxpY2F0aW9ucy9WZXN0Q2VydC5hcHAvQ29udGVudHMvRnJhbWV3b3Jrcy9saWJDQ1htbE5vcm1hbGl6ZXIuZHlsaWI=",  // /Applications/VestCert.app/Contents/Frameworks/libCCXmlNormalizer.dylib
				"version" : "1.0.0.0"
		};		
	}	

	var mainPageUrl = "../unisignweb_document/index.html";
	var chkCount = 0;
	var versionCheck = false;
	var iframesrc = "https://127.0.0.1:15018";
	var isDownload = false;
	var cntAdd = 0;
	var messageId = 0;
	var sessionId = Math.random();
	
	function getMessageNumber(){
		messageId++;
		return messageId;
	}
	
	function parseInt(s){
		var ver = s.replace(/\./g, "");
		return ver * 1;
	}
	
	function reqGetVersion() {
		var text = {
				"messageNumber": getMessageNumber(),
				"sessionID": "" + sessionId,
				"operation":"GetVersion"
		};		
		var request = document.getElementById("hsmiframe").contentWindow;
		request.postMessage(JSON.stringify(text), iframesrc);
	};
	
	function statusMsg(txt, cnt){
		if(cnt) for(var i=0; i<cnt; i++) txt += ".";
		customObj.progress( txt );
	}
	
	function isUpdate(ver){
		var l = lastestVersion.split('.'), 
		c = ver.split('.'), len = Math.max(l.length, c.length);
		
		for(var i=0; i<len; i++){
			if ((l[i] && !c[i] && parseInt(l[i]) > 0) || (parseInt(l[i]) > parseInt(c[i]))) {
                return true;
            } else if ((c[i] && !l[i] && parseInt(c[i]) > 0) || (parseInt(l[i]) < parseInt(c[i]))) {
            	return false;
            }
		}
		return false;
	}
	
	var receivedData = function (event){
		if(event.origin == iframesrc){
			var obj = JSON.parse(event.data);
			if(obj.operation == 'GetVersion'){
				if( !obj || !obj.list || !obj.list[0]){
					//setTimeout(reqGetVersion, 2000);
					return;
				}
				var currentVersion = obj.list[0].version;
				var cv = currentVersion.split('.');
				currentVersion = cv[0] + '.' + cv[1] + '.' + cv[2] + '.0';
						
				//currentVersion = cv[0] + cv[1] + cv[2] + '.0';
				//currentVersion = parseInt(currentVersion);
				
				//if(obj.list == null || currentVersion < parseInt(lastestVersion)){
				if( isUpdate(currentVersion) ){
					customObj.fail(-80, "인증서 관리 프로그램이 최신버전이 아닙니다.<br>최신버전으로 설치해주시기바랍니다.<br><br>최신버전 : " + lastestVersion + "<br>설치버전 : " + currentVersion);
					// 설치 버전 체크.. 고객사에서 작성한 스크립트에서 처리해야함. (다운로드)
					versionCheck = true;
					setTimeout(reqGetVersion, 2000);
				}else{
					if( pluginConfig && pluginConfig.using ){
						var request = document.getElementById("hsmiframe").contentWindow;
						var sObj = {
								"messageNumber": getMessageNumber(),
								"sessionID": "" + sessionId,
								"operation":"3rdPartyLib.initialize",
								"manager": "Manager",			
								"path": pluginConfig.name,
								"version": pluginConfig.version
						};
						request.postMessage(JSON.stringify(sObj), iframesrc);
					}else{
						customObj.success();
						return;
					}
				}
			}else if(obj.operation == '3rdPartyLib.initialize'){
				if ( obj.resultCode == 0 || obj.resultCode == '0' || obj.resultMessage == "ok") {
					customObj.success();
				}else{
					var request = document.getElementById("hsmiframe").contentWindow;
					var sObj = {
							"messageNumber": getMessageNumber(),
							"sessionID": "" + sessionId,
							"operation":"3rdPartyLib.finalize",
							"manager": "Manager"
					};
					request.postMessage(JSON.stringify(sObj), iframesrc);
				}
			}else if(obj.operation == '3rdPartyLib.finalize'){
				customObj.fail(-81, "XML모듈 플러그인 로드에 실패하였습니다. 통합인스톨러로 재설치 후 다시 시도해주세요.");
			}
		}else return;
	}
	
	function removeEvent(){
		cntAdd--;
		if (typeof window.addEventListener === 'function') {
		    window.removeEventListener('message', receivedData, false);
		} else if (typeof window.attachEvent === 'function') {
		    window.detachEvent('onmessage', receivedData);
		} else {
			window.detachEvent('onmessage', receivedData);
		}
	}
	
	function addEvent(){
		if(cntAdd > 0) removeEvent();
		if (typeof window.addEventListener === 'function') {
		    window.addEventListener('message', receivedData, false);
		} else if (typeof window.attachEvent === 'function') {
		    window.attachEvent('onmessage', receivedData);
		} else {
			window.attachEvent('onmessage', receivedData);
		}
		cntAdd++;
	}

	function UniSignWeb_LoadObject(){
		document.writeln("<iframe src='"+iframesrc+"' name='hsmiframe' id='hsmiframe' style='visibility:hidden;position:absolute' onload='reqGetVersion();'></iframe>");
	}
	
	var iframeLoaded = false;
	var fnInstallCheck = function(rv){
		iframeLoaded = false;
		var isFirst = true;
		var fnResult = function(obj, r){
			iframeLoaded = r;
			if(isFirst){
				isFirst = false;
				if(obj && obj.parentNode) obj.parentNode.removeChild(obj);
				rv(r);
			}
		}
		
		var chkImg;
		if (navigator.userAgent.indexOf("MSIE 7.0") != -1) {
			chkImg = document.createElement("<img id='hsmImg' src='"+iframesrc + '/TIC?cd=' + Math.random() + "' onload='' onerror='' />");
			chkImg.onerror = function() {fnResult(chkImg, false);};
			chkImg.onload = function() {fnResult(chkImg, true);};
			chkImg.style.display = "none";
		} else {
			chkImg = document.createElement('img');
			chkImg.setAttribute('id', "hsmImg");
			chkImg.setAttribute('src', iframesrc + '/TIC?cd=' + Math.random());
			chkImg.onerror = function() {fnResult(chkImg, false);};
			chkImg.onload = function() {fnResult(chkImg, true);};
			chkImg.style.display = "none";
		}
		document.body.appendChild(chkImg);
		
		if (navigator.userAgent.indexOf("MSIE 8") != -1) {
			var ie8 = function(){
				if(iframeLoaded == false) setTimeout(ie8, 100);
				else fnResult(null, true);
			}
			setTimeout(ie8, 100);
		}
	};
	
	function fnVestCertCall(){
		document.getElementById("hsmiframe").src = "mangowire:///";
		setTimeout(function(){document.location.reload();}, 5000);
	}
	
	var fnChecker = function(r){
		if(r){
			chkCount = 0;
			if(versionCheck == false){
				document.getElementById("hsmiframe").src = iframesrc;
				statusMsg("설치된 인증서 관리프로그램 버전 확인중", chkCount);
				addEvent();
				setTimeout(reqGetVersion, 200);
				//setTimeout(function(){fnChecker(true);}, 1000);
			}
		}else{
			if(navigator.userAgent.indexOf("Firefox") > -1){
				customObj.fail(-99, "인증서 관리 프로그램이 설치되어있지 않거나 실행중이 아닙니다<br>FireFox 브라우져일 경우 설치후 브라우져를 재시작 하셔야 합니다.");
			}else if (navigator.userAgent.indexOf("MSIE 7.0") > -1 && navigator.userAgent.indexOf("compatible") < 0) {
				customObj.fail(-98, "사용중인 IE7 브라우져에서는 동작하지 않습니다. 타 브라우져 또는 IE버전을 업데이트 하시길 바랍니다.");
			} else {
				customObj.fail(-90, "인증서 관리 프로그램이 설치되어있지 않거나 실행중이 아닙니다");
				setTimeout(function(){ fnInstallCheck(fnChecker); }, 1000);
			}
		}
		chkCount++;
	};
	
	function GetClientOS() {
		if(navigator.platform == OSTYPE_WIN32) 	{
			Client_OS = OSTYPE_WIN32;
		} 
		else if(navigator.platform == OSTYPE_WIN64) 	{
			Client_OS = OSTYPE_WIN64;
		} 
		else if(navigator.platform == "MacIntel")	{
			Client_OS = OSTYPE_MAC;
		}
		else 	{
			Client_OS = OSTYPE_UNKNOWN;
		}
		
		if(Client_OS == OSTYPE_MAC){
			document.getElementById("mac_downloadBox").style.display = "block";
			document.getElementById("win_downloadBox").style.display = "none";
		}else{
			document.getElementById("win_downloadBox").style.display = "block";
			document.getElementById("mac_downloadBox").style.display = "none";
		}
	}
	
	function SetVestCertInfo() {
		if (Client_OS == OSTYPE_MAC) {
			VestCert_PKG = VestCert_MAC_PKG;
			lastestVersion = VestCert_MAC_Version;
		}
	}
	
	GetClientOS();
	SetVestCertInfo();
	
	addEvent();
	UniSignWeb_LoadObject();
	fnInstallCheck(fnChecker);
}