/*
  yshong (2021-05-21)
 	http://alm.emro.co.kr/browse/SMARTNINE-4947?jql=text%20~%20%22adobe%22
 	위 내용을 참고함.
 	Adobe Flash Player 지원종료와 관련하여 메모리 체크로직을 제거한다.
 */
// 이 파일은 더이상 사용되지 않는다.


// http://alm.emro.co.kr/browse/NFCH-502
(function(){

	// 다국어처리 함수
	var translate = function(message){
		// 다국어 적용 모듈 존재 시 다국어 처리
		if(window.Polymer && window.Polymer.Base.translate){
			message = Polymer.Base.translate(message);
		}
		return message;
	};
	
	// IE인지 판별 함수
	// http://ooz.co.kr/67
	var isIE = (function(){
		var agent = navigator.userAgent.toLowerCase();
		
		if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
			return true;
		}
		
		return false;
	}());
	
	if(isIE === false){
		return;
	}
	
	// flash player가 설치되었는지 확인
	// http://zetawiki.com/wiki/JavaScript_%ED%94%8C%EB%9E%98%EC%8B%9C_%EC%84%A4%EC%B9%98_%EC%97%AC%EB%B6%80_%ED%99%95%EC%9D%B8
	var is_flash_installed = false;
	try {
	  if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) is_flash_installed=true;
	}catch(e){
	  if(navigator.mimeTypes['application/x-shockwave-flash'] != undefined) is_flash_installed=true;
	}
	
	if(is_flash_installed === false){
		document.addEventListener("WebComponentsReady", function() {
			alert(translate("Adobe Flash Player not installed!"));
		});
		return;
	}
	
	// 메모리 제한 로직 활성화 여부
	window.MEMORY_LIMIT_ACTIVATED = true;
	// 최대 허용 메모리(MB)
	window.MEMORY_LIMIT = 1000;
	
	/* 페이지 로드 이후 탭이 추가될 때 메모리를 체크하지 않는 탭 수
	 * 해당 로직 존재 이유는 기존창을 닫고 새창을 열었을 때 기존창에 대한 메모리가 바로 빠지지 않기때문에
	 * 해당 로직이 없으면 새창에서도 메모리 경고가 발생함
	 */ 
	window.MEMORY_PAGE_LIMIT_COUNT = 4;
	// 기존 창이 닫히고 새창이 열리는 시간까지의 지연 시간
	window.MEMORY_NEWWINDOW_DELAY_TIME = 1000;
	
	window.returnMemory =  function(_privateMemory) {
		var count = localStorage.getItem('memory_page_count') ? localStorage.getItem('memory_page_count') : 0;
		//window.MEMORY_LAST_CHECKED = _privateMemory;
		//console.log(_privateMemory);
    	//해당 브라우저 탭에서 점유하고 있는 메모리 반환 (MB 단위-소수점 포함)
    	if(_privateMemory >= window.MEMORY_LIMIT && window.MEMORY_PAGE_LIMIT_COUNT <= localStorage.getItem('memory_page_count')){
    		
    		SCAlert.confirm(translate('주의'), translate('메모리가 일정량이상 증가하여 안정적이지 않을 수 있습니다. 새탭으로 여시겠습니까?(현재 탭은 종료 됩니다.)'), function(btn) {
                if(btn == 'yes') {
                	var newWindow = window.open(location.href, '_blank','');
                	var oldWindow = window;
                	
                	// 팝업이 차단되었을 경우 newWindow가 null로 나옴
                	if(newWindow)
                	{
                		localStorage.removeItem('memory_page_count');
                		setTimeout(function(){
                			// 예전 window페이지를 빈페이지로 이동하지 않고 close 하면 페이지 닫기 시 확인 메세지가 뜬다.
                			oldWindow.open("about:black","_self").close();
                			oldWindow = null;
                			newWindow = null;
                		}, MEMORY_NEWWINDOW_DELAY_TIME);
                	}
                }
    		});
    	}else{
    		localStorage.setItem('memory_page_count', ++count);
    	}
	};
	
	var __privateMemoryCalled = false;
	
	document.addEventListener("WebComponentsReady", function() {
		var memoryDiv = document.createElement('div');
		memoryDiv.id = 'MemoryCheckSWF';
		document.body.appendChild(memoryDiv);
		memoryDiv.getPrivateMemory = function(){
			__privateMemoryCalled = true;
		};
		//callback 함수가 동작하지 않을 경우 swfobject 버전이 2.2 버전 이상인지 확인할 것(2.2 버전 이상부터 callback 지원)
		swfobject.embedSWF("ui/lib/memory/MemoryCheck.swf", "MemoryCheckSWF", "0", "0", "10.0.0", "expressInstall.swf", null,{wmode:"transparent"},null,
			function(e){
				if(e.success != true){
					console.log('"ui/lib/memory/MemoryCheck.swf" initialize failed');
				}else{
					var memoryEl = document.getElementById("MemoryCheckSWF");
					var completeCallback = function(){
						document.getElementById("MemoryCheckSWF").getPrivateMemory();
						window.MEMORY_memoryCheckCalled = false;
					};
					
					if(memoryEl || !memoryEl.getPrivateMemory){
						// swf 파일이 embed 됐음에도 getPrivateMemory 함수가 세팅되지 않아 세팅되는 시점에 함수를 호출 하도록 함
						Object.defineProperty(memoryEl, 'getPrivateMemory', {
							set : function(fn) {
								delete this.getPrivateMemory;
								this.getPrivateMemory = fn;
								if(__privateMemoryCalled){
									completeCallback();
									completeCallback = null;
								}
							},
							get : function(){
								return function(){
									__privateMemoryCalled = true;
								};
							},
							configurable: true
						});
					}else{
						completeCallback();
					}
						
					
				}
			}
		);
		
    });
}());