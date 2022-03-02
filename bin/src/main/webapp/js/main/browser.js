/**
 * 사용자 브라우저의 유효성을 검사  
 * 2016.09.06, Choi JongHyeok
 */
(function(window) {
	
var BROWSER = {},
	BROWSER_UTIL = {};

	window.BROWSER = BROWSER = {
		browserInfo		: {},  	/*-- Client Browser Info --*/
		OSInfo			: {},   /*-- Client OS Info 	 --*/
		browserValid	: new Boolean(), /*-- Browser Support Y/N --*/
		OSValid			: new Boolean(), /*-- OS Support Y/N 	 --*/
		valid			: new Boolean(), /*-- Browser + OS Support Y/N --*/
		supportBrowsers 	: [ /*-- Base Support Browser Object List--*/
		 	{ browser: "MSIE"  	, version: "11" },
		 	{ browser: "Chrome"	, version: "52" }, 
		 	{ browser: "Edge"	, version: "ALL"},
		 	{ browser: "Firefox", version: "48" },
		 	{ browser: "Opera"	, version: "39" }
	    ],
	    supportOSs 	: [  		/*-- Base Support OS Object List --*/
		 	{ platform: "WINDOWS"	, name: "7"  },
		 	{ platform: "LINUX"		, name: "ALL"}, 
		 	{ platform: "MACOSX"	, name: "10" }
	    ],
	    setSupportBrowsers : function (supportBrowsers) {  //setter, method chaining
	    	this.supportBrowsers = supportBrowsers;
	    	BROWSER_UTIL.syncValidation();
	    	return this;
	    },
	    setSupportOSs : function (supportOSs) {	//setter, method chaining
	    	this.supportOSs = supportOSs;
	    	BROWSER_UTIL.syncValidation();
	    	return this;
	    }
	};
	
	BROWSER_UTIL = {

		getOSInfo : function(){
			var
				tp = navigator.platform,
				ua = navigator.userAgent,
				tem;
	
			var result = {};
			
			// platform
			if (tp == "Win32" || tp == "Win64"){
				if(ua.indexOf("Windows Phone") >= 0){
					result.platform = "Windows Phone";
					result.name="Windows Phone";
				} else {
					result.platform = "WINDOWS";
				}
			} else if (tp == "MacIntel") {
				if((ua.indexOf("iPhone") >= 0) || (ua.indexOf("iPad") >= 0) || (ua.indexOf("iPod") >= 0)){
					result.platform = "iOS";
					result.name="iOS";
				} else {
					result.platform = "MACOSX";
				}
			} else if (tp.indexOf("Linux") >= 0) {
				if(ua.indexOf("Android") >= 0){
					result.platform = "Android";
					result.name="Android";
				} else {
					result.platform = "LINUX";
				}
			} else if (tp == "iPhone Simulator") {
				result.platform = "iOS";
				result.name="iPhone Simulator";
			} else if (tp == "iPhone") {
				result.platform = "iOS";
				result.name="iPhone";
			} else if (tp == "iPad") {
				result.platform = "iOS";
				result.name="iPad";
			} else if (tp == "iPod") {
				result.platform = "iOS";
				result.name="iPod";
			} else {
				result.platform = "UNKNOWN";
			}
			
			// version, bit
			if(result.platform == "WINDOWS"){
				if(ua.indexOf("Windows NT 5.1") != -1) {result.version="5.1"; result.name="XP";}
				else if(ua.indexOf("Windows NT 6.0") != -1) {result.version="6.0"; result.name="VISTA";}
				else if(ua.indexOf("Windows NT 6.1") != -1) {result.version="6.1"; result.name="7";}
				else if(ua.indexOf("Windows NT 6.2") != -1) {result.version="6.2"; result.name="8";}
				else if(ua.indexOf("Windows NT 6.3") != -1) {result.version="6.3"; result.name="8.1";}
				else if(ua.indexOf("Windows NT 6.4") != -1) {result.version="6.4"; result.name="10";}
				else if(ua.indexOf("Windows NT 10.0") != -1) {result.version="10.0"; result.name="10";}
				else if(ua.indexOf("Windows NT") != -1){
					result.version="UNKNOWN"; result.name="UNKNOWN";
				} else {
					result.version="UNKNOWN"; result.name="UNKNOWN";
				}
				
				if(ua.indexOf("WOW64") != -1 || ua.indexOf("Win64") != -1) result.bit="64";
				else result.bit="32";
				
			} else if(result.platform == "MACOSX"){
				if((ua.indexOf("Mac OS X 10_5") || ua.indexOf("Mac OS X 10.5")) != -1) {result.version="10.5"; result.name="Leopard";}
				else if((ua.indexOf("Mac OS X 10_6") || ua.indexOf("Mac OS X 10.6")) != -1) {result.version="10.6"; result.name="Snow Leopard";}
				else if((ua.indexOf("Mac OS X 10_7") || ua.indexOf("Mac OS X 10.7")) != -1) {result.version="10.7"; result.name="Lion";}
				else if((ua.indexOf("Mac OS X 10_8") || ua.indexOf("Mac OS X 10.8")) != -1) {result.version="10.8"; result.name="Mountain Lion";}
				else if((ua.indexOf("Mac OS X 10_9") || ua.indexOf("Mac OS X 10.9")) != -1) {result.version="10.9"; result.name="Mavericks";}
				else if((ua.indexOf("Mac OS X 10_10") || ua.indexOf("Mac OS X 10.10")) != -1) {result.version="10.10"; result.name="Yosemite";}
				else if((ua.indexOf("Mac OS X 10_11") || ua.indexOf("Mac OS X 10.11")) != -1) {result.version="10.11"; result.name="El Capitan";}
				else if(ua.indexOf("Mac OS X 10") != -1){
					result.version="10"; result.name="UNKNOWN";
				} else {
					result.version="UNKNOWN"; result.name="UNKNOWN";
				}
				result.bit = "64";
			} else if(result.platform == "LINUX"){
				result.version="UNKNOWN"; result.name="UNKNOWN";
			} else {
				result.version="UNKNOWN"; result.name="UNKNOWN";
			}
			
			return result;
		},
		getBrowserInfo : function(){
			var
				tp = navigator.platform,
				N= navigator.appName,
				ua= navigator.userAgent,
				tem;
			var result, M;
			
			// if Edge
			M = ua.match(/(edge)\/?\s*(\.?\d+(\.\d+)*)/i);
			M = M ? {"browser":"Edge", "version":M[2]} : M;
			
			// if opera
			if(!M){
				M = ua.match(/(opera|opr)\/?\s*(\.?\d+(\.\d+)*)/i);
				if(M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
				M = M ? {"browser":"Opera", "version":M[2]} : M;
			}
			
			// if IE7 under
			if(!M) {
				M = ua.match(/MSIE ([67].\d+)/);
				if(M) M = {"browser":"MSIE", "version":M[1]};
			}
			
			// others
			if(!M) {
				M = ua.match(/(msie|trident|chrome|safari|firefox)\/?\s*(\.?\d+(\.\d+)*)/i);
				if(M){
					if((tem = ua.match(/rv:([\d]+)/)) != null) {
						M[2] = tem[1];
					} else if((tem = ua.match(/version\/([\.\d]+)/i)) != null) {
						M[2] = tem[1];
					}
					if(M[1] == "Trident") M[1] = "MSIE";
					M = M? {"browser":M[1], "version":M[2]} : {"browser":N, "version1":navigator.appVersion,"other":'-?'};
				}
			}
			
			if(!M){
				return {"browser":"UNDEFINED", "version":""};
			}
			
			if(M.version){
				var verArr = (M.version).split(".");
				M.version = verArr[0];
			}
			
			if(M.browser == "MSIE" || M.browser == "Edge") {
				if(tp == "Win32"){
					M.bit = "32";
				} else if (tp == "Win64"){
					M.bit = "64";
				}
			}
			
			result = M;
			
			return result;
		},
		getBrowserVer : function() {
			var browserInfo = BROWSER.browserInfo;
			if(!browserInfo) browserInfo = BROWSER_UTIL.getBrowserInfo();
			return browserInfo.version;
		},
		browserValid : function(currBrowser, supportBrowsers){

			var browser = currBrowser.browser;
			var version = parseInt(currBrowser.version);
			var valid = false;
  
			for(var i=0; i<supportBrowsers.length; i++) {

				var item = supportBrowsers[i];

				if(browser.toUpperCase() === item.browser.toUpperCase()) {
				 
				  if(item.version.toUpperCase() === "ALL" 
								|| version >= parseInt(item.version)) {
					  valid = true;
				  }
				  
				  break;
				}
			}
      
			/*	
		    //ECMA5 Funcction not suppoerted in old browser(ie8-) 
		    supportBrowsers.some(function(item) {
				if(browser.toUpperCase() === item.browser.toUpperCase()) {
					
					if(item.version.toUpperCase() !== "ALL" 
						&& version < parseInt(item.version)) {
						valid = false;
					}
					
					return true;
				}
			});
			*/
			
			return valid;
		},
		OSValid : function(currOS, supportOs){
			var platform = currOS.platform;
			var name = parseInt(currOS.name);
			var valid = false;
  
			for(var i=0; i<supportOs.length; i++) {

				var item = supportOs[i];

				if(platform.toUpperCase() === item.platform.toUpperCase()) {
				 
				  if(item.name.toUpperCase() === "ALL" 
								|| name >= parseInt(item.name)) {
					  valid = true;
				  }
				  
				  break;
				}
			}
			
			return valid;
		},
		syncValidation : function() {
			BROWSER.browserInfo = BROWSER_UTIL.getBrowserInfo();
			BROWSER.OSInfo = BROWSER_UTIL.getOSInfo();
			BROWSER.browserValid = BROWSER_UTIL.browserValid(BROWSER.browserInfo, BROWSER.supportBrowsers);
			BROWSER.OSValid = BROWSER_UTIL.OSValid(BROWSER.OSInfo, BROWSER.supportOSs);
			
			if(BROWSER.browserValid && BROWSER.OSValid) {
				BROWSER.valid = true;
			} else {
				BROWSER.valid = false;
			}
			
			return BROWSER; 
		}
	};
	
	//Init Function 
	(function(){
		BROWSER_UTIL.syncValidation(); 
	})();

})(window);