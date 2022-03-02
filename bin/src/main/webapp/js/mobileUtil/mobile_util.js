/**
 * 
 */
var mobileUtilFunc = function(){
	var me = this;
	this.userToken = localStorage.userToken;
	this.checkMobile = function(){
	    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	    if ( varUA.indexOf('android') > -1) {
	        //안드로이드
	        return "android";
	    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
	        //IOS
	        return "ios";
	    } else {
	        //아이폰, 안드로이드 외
	        return "other";
	    }
	}
	
	this.callApi = function(url,param,method, successCallback ,failCallback){
		Pace.track( function(){
			$.ajax({
				type:method,
				url :url ,
		        data : JSON.stringify(param),
		        dataType: "json",
		        timeout: 15000,
		        beforeSend : function(xhr){
		            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		            xhr.setRequestHeader("userToken", localStorage.userToken);
		        },
		        success : function(data){
					if(data.header.code == 1){
						successCallback(data);
					}else if(data.header.code == 401){
						if(failCallback){
							failCallback();
						}else{
							// 로그인 페이지로
							window.location.href="/mobile/home.do";
							localStorage.clear();
						}
					}else{
						try{
							if(checkMobile()=="ios"){
								var message = {  message: data.header.message};
								window.webkit.messageHandlers.showToast.postMessage(message);
							}else{
		   						window.LexaApp.showToast(data.header.message);
							}
	   					}catch(e){
	   						alert(data.header.message);
	   					}
					}
				},
				fail : function(){
					var text = "api 서버가 시간 내에 응답하지 않습니다."
					try{
						if(checkMobile()=="ios"){
							var message = {  message:text};
							window.webkit.messageHandlers.showToast.postMessage(message);
						}else{
	   						window.LexaApp.showToast(text);
						}
					}catch(e){
						alert(text);
					}
					
				} 
			});// end of ajax
		});
	}
	return this;
};


var mobileUtil = new mobileUtilFunc();